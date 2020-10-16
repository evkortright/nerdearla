import React from 'react';

const List = (props) => {
  const { clientes } = props;
  if (!clientes || clientes.length === 0) return <p></p>;

  return (
    <div className="container">
      {
        clientes.map((cliente) => {
          return (
<div class="card" style={{width: "18rem"}} key={cliente._id}>
  <div class="card-body">
    <h5 class="card-title">{cliente._source.nombre}</h5>
    <p class="card-text">{cliente._source.score}</p>
    <a href="#" class="btn btn-primary">Evalua</a>
  </div>
</div>
          );
        })
      }
    </div>
  );
};

export default List;
