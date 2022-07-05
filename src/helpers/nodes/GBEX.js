const Node = require('./index');
const Web3 = require('web3');

const networkAddress = "https://apothemxdcpayrpc.blocksscan.io/";
const tokenAddress = "0x0aF4b6635E68BbBc28E606403b1Ef2d120065c01";

async function getAddress() {
    const web3 = new Web3(networkAddress);
    web3.eth.accounts.wallet.create(1);
    const newWallet = web3.eth.accounts.wallet[0]
    return newWallet.address;
}

async function getPrice() {
    return 0.1;
}

async function getTransctions(transactionID) {
    const web3 = new Web3(this.url);
    const tx = await web3.eth.getTransactionReceipt(transactionID);
    const { logs } = tx;
    const block = await web3.eth.getBlock(tx?.blockNumber);

    const transaction = web3.eth.abi.decodeLog([{
        type: 'address',
        name: 'from',
        indexed: true
    }, {
        type: 'address',
        name: 'to',
        indexed: true
    }, {
        type: 'uint256',
        name: 'value',
        indexed: true
    }], '', [logs[0].topics[1], logs[0].topics[2], logs[0].data]);

    const amount = Web3.utils.fromWei(transaction['value'], 'ether');

    return {
        txid: transactionID,
        amount: amount,
        confirmations: 100,
        address: transaction['to'],
        time: block?.timestamp,
        timereceived: block?.timestamp,
        blockhash: tx?.blockHash,
        blocktime: block?.timestamp,
        blockindex: tx?.blockNumber,
        type: 'receive'
    }
}

const GBEX = new Node(
    3,
    'GBEX',
    'GBEX',
    networkAddress,
    getAddress,
    getPrice,
    getTransctions,
    true,
    true,
    'token',
    tokenAddress
)

module.exports = GBEX;