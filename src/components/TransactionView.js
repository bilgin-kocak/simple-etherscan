import React from 'react';
import Transaction from './Transaction';

function TransactionView(props) {
  // console.log('txn', props.transactions[0]);
  return (
    <React.Fragment>
      {props.transactions
        .filter((txn) => txn !== null)
        .map((txn) => (
          <Transaction
            key={txn.hash}
            txn={txn}
            BN={props.BN}
            fromWei={props.fromWei}
          />
        ))}
    </React.Fragment>
  );
}

export default TransactionView;
