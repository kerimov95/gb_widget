import React from "react";
import { hookPayment } from '../../lib/hookPayment';
import web3 from 'web3/dist/web3.min.js';
import abi from '../../lib/tokenABI.json';

export const PayWithWalletComponent = ({ amount, address, currency }) => {

    const handlePayWithWallet = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (currency.type === 'coin') {
            const _amount = parseInt(web3.utils.toWei(amount.toString(), "ether")).toString(16);
            window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: accounts[0],
                    to: address,
                    value: _amount
                }]
            }).then((txHash) => {
                setTimeout(() => {
                    hookPayment(txHash, currency.symbol);
                }, 15000);
            }).catch((error) => console.error(error));
            return;
        }

        if (currency.type === 'token') {
            const _amount = web3.utils.toWei(amount.toString(), "ether");
            const _web3 = new web3(window.ethereum);
            const tokenContract = new _web3.eth.Contract(abi, currency.contractAddress, {
                from: accounts[0]
            });
            tokenContract.methods.transfer(address, _amount).send({
                from: accounts[0],
            }, (error, transactionHash) => {
                if (error) {
                    return;
                }
                setTimeout(() => {
                    hookPayment(transactionHash, currency.symbol);
                }, 15000)
            });
            return;
        }
    }


    return <button
        onClick={handlePayWithWallet}
        type="button"
        className="btn btn-secondary w-100 mt-3 p-3"
    >
        Pay with wallet
    </button>
}