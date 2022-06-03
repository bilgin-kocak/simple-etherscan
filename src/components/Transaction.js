import React from 'react';
const Web3 = require('web3');

function Transaction(props) {
  const txnFeeWei = new props.BN(props.txn.gas).mul(
    new props.BN(props.txn.gasPrice)
  );
  const txnFeeEth = props.fromWei(txnFeeWei, 'ether');
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          {/* <img src="..." className="img-fluid rounded-start" alt="..." /> */}
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{props.txn.hash}</h5>
            <p className="card-text">Block Number: {props.txn.blockNumber}</p>
            <p className="card-text">From: {props.txn.from}</p>
            <p className="card-text">
              <small className="text-muted">
                TXN FEE: {txnFeeEth.toString()} ETH
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
