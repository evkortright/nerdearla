import React, { useEffect, useState } from 'react';
import { withTransaction } from '@elastic/apm-rum-react'
import './App.css';
import List from './components/List';
import withListLoading from './components/withListLoading';
import { init as initApm } from '@elastic/apm-rum'

var apmRUM = initApm({

  // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
  serviceName: 'busqueda-react',
  distributedTracingOrigins: ['http://ec2-18-192-63-235.eu-central-1.compute.amazonaws.com:8200'],
  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: 'https://555553a8492e4fe2a7f58be2dc390c79.apm.us-central1.gcp.cloud.es.io:443',
  //serverUrl: 'http://ec2-18-192-63-235.eu-central-1.compute.amazonaws.com:8200',
  // Set service version (required for source map feature)
  serviceVersion: '1.0'
})

function App() {
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: false,
    clientes: null
  });
  const [terminos, setTerminos] = useState("*");

  function handleChange(e) {
    console.log(e)
    if (e.target.value === '') setTerminos('*')
    else setTerminos(e.target.value)
  }

  useEffect(() => {
    setAppState({ loading: true });
    //const apiUrl = `http://localhost:9200/clientes/_search?q=nombre:${terminos}&filter_path=hits.hits`;
    const apiUrl = `http://ec2-18-192-63-235.eu-central-1.compute.amazonaws.com:8200/busca?terminos=${terminos}`;
    console.log('apiUrl: ' + apiUrl);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((clientes) => {
        setAppState({ loading: false, clientes: clientes.hits.hits });
      });
  }, [terminos]);

  console.log(appState, terminos);

  return (
    <div className="App">
      <div className="container">
        <h3>Mis Clientes</h3>
      </div>
      <div class="input-group input-group-sm mb-3">
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={handleChange} placeholder="Busca..."></input>
      </div>
      <div class="container">
        <List clientes={appState.clientes} />
      </div>
    </div>
  )
}

export default withTransaction('busqueda-react', 'component')(App);
