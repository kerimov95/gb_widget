const Node = require('./index');
const Web3 = require('web3');

const networkAddress = "https://apothemxdcpayrpc.blocksscan.io/";

async function getAddress() {
    const web3 = new Web3(networkAddress);
    web3.eth.accounts.wallet.create(1);
    const newWallet = web3.eth.accounts.wallet[0]
    return newWallet.address;
}

async function getPrice() {
    return 1;
}

async function getTransctions(transactionID) {

    const web3 = new Web3(this.url);
    const tx = await web3.eth.getTransaction(transactionID);
    const block = await web3.eth.getBlock(tx?.blockNumber);
    const amount = Web3.utils.fromWei(tx.value, 'ether');
    return {
        txid: transactionID,
        amount: amount,
        confirmations: 100,
        address: tx.to,
        time: block?.timestamp,
        timereceived: block?.timestamp,
        blockhash: tx?.blockHash,
        blocktime: block?.timestamp,
        blockindex: tx?.blockNumber,
        type: 'receive'
    }
}

const XDC = new Node(
    2,
    'XDC',
    'XinFin',
    networkAddress,
    getAddress,
    getPrice,
    getTransctions,
    true,
    true,
    'coin'
)

module.exports = XDC;