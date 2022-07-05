import React, { useEffect, useState } from "react";
import { usePrices, useOrder } from '../lib/hooks';
import { Context } from '../index';
import QRCode from "react-qr-code";
import { IoCloseSharp } from "react-icons/io5";
import { getAddress } from "../lib/getAddress";
import { checkPayment } from "../lib/checkPayment";
import { hookPayment } from '../lib/hookPayment';
import web3 from 'web3/dist/web3.min.js'

import abi from '../lib/tokenABI.json';

export const Timer = ({ duration, onExpire = () => { } }) => {

    const [time, setTime] = useState([duration - 1, 59]);

    useEffect(() => {
        if (time[0] === 0 && time[1] === 0) {
            onExpire(true);
        }
    }, [time])

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(time => {
                const newSeconds = time[1] - 1;
                if (newSeconds > 0) {
                    return [time[0], newSeconds];
                }
                else {
                    const newMinutes = time[0] - 1;
                    if (newMinutes > 0) {
                        return [newMinutes, 59];
                    }
                    else {
                        clearInterval(interval);
                        return [0, 0]
                    }
                }
            })

        }, 1000);

        return () => {
            clearInterval(interval)
        }
    }, [])

    return <>
        {
            time[0] > 0 || time[1] > 0 ? <p>
                <span >This payment will expire in </span>
                <span style={{ color: '#E57C7C' }} >{`${time[0]}:${time[1]}`}</span>
            </p> : <div style={{
                color: '#E57C7C'
            }}>
                Payment is overdue
            </div>

        }
    </>

}

export const Card = ({ amountInUSD, apikey, note, root }) => {

    const [expire, setExpire] = useState();
    const [prices, loading] = usePrices(amountInUSD);
    const [order] = useOrder(apikey, amountInUSD, note);
    const [currency, setCurrency] = useState();
    const [orderAddress, setOrderAddress] = useState();
    const [isPaid, setIsPaid] = useState();

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

    useEffect(() => {
        if (currency && currency.address && order?.order?.uniqueId) {
            getAddress(order?.order?.uniqueId, currency.symbol)
                .then(res => res.json())
                .then(checkOutAdress => {
                    setOrderAddress(checkOutAdress)
                })
                .catch(console.log);
        }
    }, [currency]);

    return <div>
        <div className="card">
            <div className="card__title">
                <div className="globiance_payment_modal_icon_wrapper">
                    <span className="globiance_payment_modal_icon_span">
                        <IoCloseSharp onClick={() => root.unmount()} />
                    </span>
                </div>
            </div>
            <div className="card__header">
                <div className="card__header__row">
                    <div>ORDER: #{order?.order?.id}</div>
                    <div>
                        AMOUNT TO PAY
                    </div>
                </div>
                <div className="card__header__row">
                    <div>{order?.merchant?.labelName}</div>
                    <div>
                        <span>{amountInUSD}</span> USD
                    </div>
                </div>
            </div>
            {
                isPaid ? <div>
                    Order has been paid
                </div> : <>
                    {!currency ? <>
                        <div className="container">
                            <div className="image_outer_container">
                                <div className="image_inner_container">
                                    <img width={120} height={120} src={order?.merchant?.logo} />
                                </div>
                            </div>
                            <div style={{ marginTop: '5px' }}>{order?.merchant?.labelName}</div>
                        </div>
                        <div className="waiting__confirm">
                            {
                                prices.map((price) => (<div
                                    key={price.symbol}
                                    className="coinRow CoinList clickable"
                                    onClick={() => setCurrency(price)}
                                >
                                    <div className="col-md-5"> {price?.symbol} </div>
                                    <div className="col-md-5">  {price?.amount}  </div>
                                </div>))
                            }
                        </div>
                    </> : <div style={{ padding: '10px' }}>
                        <div className="row coinRow CoinList bg-coinlist">
                            <div style={{
                                padding: '5px'
                            }}>{currency?.symbol}</div>
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
                            <div className="row coinRow CoinList bg-coinlist">{currency?.amount}</div>
                        </div>
                        <div className="coin__row">
                            <p>Conversion rate</p>
                            <div style={{ color: '#557949' }} className="row coinRow CoinList bg-coinlist">{currency?.amount}</div>
                        </div>
                        {
                            orderAddress ? <div className="coin__row">
                                <p>{currency?.symbol} Address</p>
                                <div className="row coinRow CoinList bg-coinlist">{orderAddress?.address}</div>
                            </div> : null
                        }
                        {
                            currency?.wallet ? <div>
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
                </>
            }
        </div>
    </div>
}

export const Widget = () => {

    return <Context.Consumer>
        {({ root, payload }) => <Card
            root={root}
            amountInUSD={payload?.amountInUSD}
            apikey={payload?.apikey}
            note={payload?.note}
        />}
    </Context.Consumer>
}