import React from 'react';
import BlockView from './BlockView';
import TransactionView from './TransactionView';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Home(props) {
  // console.log('initialization', props.initialization);
  return (
    <React.Fragment>
      <div className="container">
        <br />
        <h3>Son Bloklar</h3>
        {props.initialization ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) : (
          <BlockView blockList={props.blockList} />
        )}
        <hr />
        <h3>Son Transferler</h3>
        {props.initialization ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) : (
          <TransactionView
            transactions={props.transactions}
            BN={props.BN}
            fromWei={props.fromWei}
          />
        )}
        {/* {props.transactions.length && (
          <TransactionView
            transactions={props.transactions}
            BN={props.BN}
            fromWei={props.fromWei}
          />
        )} */}
      </div>
    </React.Fragment>
  );
}

export default Home;
