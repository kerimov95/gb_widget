import React, { useEffect } from "react";
import QRCode from "react-qr-code";
import { Timer } from "./timerComponent";
import { checkPayment } from "../../lib/checkPayment";
import { hookPayment } from '../../lib/hookPayment';
import web3 from 'web3/dist/web3.min.js';
import abi from '../../lib/tokenABI.json';

export const AddressComponent = ({ uniqueId, currency }) => {

    const orderAddress = useAddrress(uniqueId, currency.symbol);
    const [expire, setExpire] = useState();

    useEffect(() => {
        let intervalId;

        if (!expire && !isPaid) {

            if (currency) {
                intervalId = setInterval(function () {
                    if (orderAddress) {
                        checkPayment(orderAddress.uniqueId)
                            .then(res => res.json())
                            .then(res => {
                                if (res?.orderStatus) {
                                    setIsPaid(true);
                                }
                            })
                    }
                }, 5000)
            }
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        }
    }, [currency, expire, orderAddress, isPaid])

    const handlePayWithWallet = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (currency.type === 'coin') {

            const amount = parseInt(web3.utils.toWei(currency?.amount.toString(), "ether")).toString(16);

            window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: accounts[0],
                        to: orderAddress?.address,
                        value: amount
                    },
                ],
            }).then((txHash) => {
                setTimeout(() => {
                    hookPayment(txHash, currency.symbol);
                }, 10000)

            }).catch((error) => console.error);
        }

        if (currency.type === 'token') {

            const amount = web3.utils.toWei(currency?.amount.toString(), "ether");

            const _web3 = new web3(window.ethereum);
            const tokenContract = new _web3.eth.Contract(abi, currency.contractAddress, {
                from: accounts[0]
            });

            tokenContract.methods.transfer(orderAddress?.address, amount).send({
                from: accounts[0],
            }, (error, transactionHash) => {
                if (error) {
                    return;
                }
                setTimeout(() => {
                    hookPayment(transactionHash, currency.symbol);
                }, 15000)
            });
        }

    }


    return <div style={{ padding: '10px' }}>
        <div className="row coinRow CoinList bg-coinlist">
            <div style={{
                padding: '5px'
            }}>{currency.symbol}</div>
        </div>
        {
            orderAddress ? <QRCode
                style={{
                    margin: '10px'
                }}
                size={150} value={orderAddress?.address} /> : null
        }
        <div className="coin__row">
            <p>Amount</p>
            <div className="row coinRow CoinList bg-coinlist">{currency.amount}</div>
        </div>
        <div className="coin__row">
            <p>Conversion rate</p>
            <div style={{ color: '#557949' }} className="row coinRow CoinList bg-coinlist">{currency.amount}</div>
        </div>
        {
            orderAddress ? <div className="coin__row">
                <p>{currency.symbol} Address</p>
                <div className="row coinRow CoinList bg-coinlist">{orderAddress?.address}</div>
            </div> : null
        }
        {
            currency.wallet ? <div>
                <button
                    onClick={handlePayWithWallet}
                    className="btn btn-primary"
                >
                    Pay with wallet
                </button>
            </div> : null
        }
        {
            order?.order?.duration ? <>
                <div className="coin__row">
                    <p style={{ color: 'silver' }}>Payment request is valid for
                        <span style={{ marginLeft: '3px', color: '#E57C7C' }}>
                            {order.order.duration} minutes
                        </span>
                    </p>
                </div>
                <div style={{
                    marginTop: '10px'
                }}>
                    <Timer
                        onExpire={() => {
                            setExpire(true);
                        }}
                        duration={order?.order?.duration}
                    />
                </div>
            </> : null
        }
        <div className="coin__row">
            <p style={{
                color: 'silver'
            }}>Please pay as soon as possible to avoid rate expiry.</p>
        </div>
    </div>
}