import React from 'react';

function Block(props) {
  let date = new Date(props.block.timestamp * 1000);

  let dateTime = date.toLocaleString();
  return (
    <div className="card d-flex">
      <div className="card-header">{props.block.number}</div>
      <div className="card-body">
        {/* <h5 className="card-title">Special title treatment</h5> */}
        <p className="card-text">Created at: {dateTime}</p>
        <p className="card-text">Miner: {props.block.miner}</p>
        {/* <a href="#" className="btn btn-primary">
          Go somewhere
        </a> */}
      </div>
      <div className="card-footer text-muted">{props.block.hash}</div>
    </div>
  );
}

export default Block;
