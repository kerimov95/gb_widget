const Node = require('./index');
const axios = require('axios');

const node_user = 'username';
const node_password = 'password';
const node_host = '127.0.0.1';
const node_port = 9555;
const node_wallet = 'wallet2';

async function getAddress() {
    try {
        const body = { "jsonrpc": "1.0", "id": "curltest", "method": "getnewaddress", "params": [] }
        const responce = await axios.post(this.url, body);
        if (responce.status === 200) {
            return responce?.data?.result || "";
        }
        else {
            throw new Error('Can not get address');
        }
    }
    catch (error) {
        throw error;
    }
}

async function getTransctions(transactionID) {
    try {
        const body = { "jsonrpc": "1.0", "id": "curltest", "method": "gettransaction", "params": [transactionID] }
        const responce = await axios.post(this.url, body);

        if (responce.status === 200) {
            const { result } = responce.data;
            return {
                txid: result?.txid,
                amount: result?.amount,
                confirmations: result?.confirmations,
                address: result?.details[0].address,
                time: result?.time,
                timereceived: result?.timereceived,
                blockhash: result?.blockhash,
                blocktime: result?.blocktime,
                blockindex: result?.blockindex,
                type: result?.details[0].category
            } || {};
        }
        else {
            throw new Error('Can not get transaction');
        }
    }
    catch (error) {
        throw error;
    }
}

async function getPrice() {
    return 19000;
}

const BTC = new Node(
    1,
    'BTC',
    'Bitcoin',
    `http://${node_user}:${node_password}@${node_host}:${node_port}/wallet/${node_wallet}`,
    getAddress,
    getPrice,
    getTransctions,
    true,
    false,
    'coin'
)

module.exports = BTC;