import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import React, { useState } from 'react';

const Web3 = require('web3');

const web3 = new Web3(
  new Web3.providers.WebsocketProvider(
    'wss://mainnet.infura.io/ws/v3/4347ed809c3a4c26b72baa09c847310d'
  )
);

const init = async (setBlockInfo, setInitialization) => {
  let blocks;

  const latest = await web3.eth.getBlockNumber();
  console.log('latest', latest);
  let block_req = [];
  for (let i = 0; i < 4; i++) {
    block_req.push(web3.eth.getBlock(latest - i));
  }

  const initial_blocks = await Promise.all(block_req);

  blocks = [...initial_blocks];
  let txn_promises = [];
  for (let i = 0; i < 10; i++) {
    txn_promises.push(web3.eth.getTransactionFromBlock(latest, i));
  }

  const res = await Promise.all(txn_promises);
  setBlockInfo(blocks, res);
  setInitialization(false);

  web3.eth
    .subscribe('newBlockHeaders')
    .on('data', async (block) => {
      //   console.log('block', block);
      if (blocks.length >= 4) {
        blocks = blocks.slice(0, 3);
      }
      blocks.unshift(block);
      // setBlockList(blocks);

      // console.log('blocks', blocks.length);

      let txn_number = await web3.eth.getBlockTransactionCount(block.number);
      // console.log('txn_number', txn_number);

      let min_txn_number = Math.min(txn_number, 5);

      let txn_promises = [];

      for (let i = 0; i < min_txn_number; i++) {
        txn_promises.push(web3.eth.getTransactionFromBlock(block.number, i));
      }

      const res = await Promise.all(txn_promises);
      // const res = await Promise.all([
      //   web3.eth.getTransactionFromBlock(block.number, 0),
      //   web3.eth.getTransactionFromBlock(block.number, 1),
      //   web3.eth.getTransactionFromBlock(block.number, 2),
      //   web3.eth.getTransactionFromBlock(block.number, 3),
      //   web3.eth.getTransactionFromBlock(block.number, 4),
      //   web3.eth.getTransactionFromBlock(block.number, 5),
      //   web3.eth.getTransactionFromBlock(block.number, 6),
      //   web3.eth.getTransactionFromBlock(block.number, 7),
      //   web3.eth.getTransactionFromBlock(block.number, 8),
      //   web3.eth.getTransactionFromBlock(block.number, 9),
      // ]);
      const blockList = [...blocks];
      setBlockInfo(blockList, res);
      //   console.log('res', res);
    })
    .on('error', (error) => {
      console.log(error);
    });
};

const getSearchResult = (searchStr) => {
  if (web3.utils.isAddress(searchStr)) {
    return `https://etherscan.io/address/${searchStr}`;
  } else {
    return `https://etherscan.io/search?f=0&q=${searchStr}`;
  }
  // if (searchStr.length === 66) {

  // } else if (searchStr.length === 42) {

  // }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blockList: [],
      transactions: [],
      searchStr: '',
      initialization: true,
    };
  }

  componentDidMount() {
    init(this.setBlockInfo, this.setInitialization);
  }

  setBlockInfo = (blockList, transactions) => {
    this.setState({
      blockList: blockList,
      transactions: transactions,
    });
  };

  setSearchStr = (searchStr) => {
    this.setState({
      searchStr: searchStr,
    });
  };

  setInitialization = (initialization) => {
    this.setState({
      initialization: initialization,
    });
  };

  render() {
    return (
      <div className="App">
        <NavBar getSearchResult={getSearchResult} />
        <Home
          initialization={this.state.initialization}
          blockList={this.state.blockList}
          transactions={this.state.transactions}
          BN={web3.utils.BN}
          fromWei={web3.utils.fromWei}
        />
      </div>
    );
  }
}

export default App;
