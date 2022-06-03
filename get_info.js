const Web3 = require('web3');
// const Math = require('Math');

const web3 = new Web3(
  new Web3.providers.WebsocketProvider(
    'wss://mainnet.infura.io/ws/v3/4347ed809c3a4c26b72baa09c847310d'
  )
);

let txn_list = [];
let blocks = [];

const init = async () => {
  let blocks = [];

  const latest = await web3.eth.getBlockNumber();
  console.log('latest', latest);
  let block_req = [];
  for (let i = 0; i < 3; i++) {
    block_req.push(web3.eth.getBlock(latest - i));
  }

  const initial_blocks = await Promise.all(block_req);

  console.log('initial_blocks', initial_blocks);

  web3.eth
    .subscribe('newBlockHeaders')
    .on('data', async (block) => {
      //   console.log('block', block);
      if (blocks.length >= 5) {
        blocks.pop();
      }
      blocks.unshift(block);

      console.log('blocks', blocks.length);

      let txn_number = await web3.eth.getBlockTransactionCount(block.number);
      //   console.log('txn_number', txn_number);

      min_txn_number = Math.min(txn_number, 10);

      let txn_promises = [];

      for (let i = 0; i < min_txn_number; i++) {
        txn_promises.push(web3.eth.getTransactionFromBlock(block.number, i));
      }

      const res = await Promise.all(txn_promises);
      //   console.log('res', res);
    })
    .on('error', (error) => {
      console.log(error);
    });
};

init();
