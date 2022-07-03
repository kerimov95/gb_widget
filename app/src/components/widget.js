import React, { useEffect, useState } from "react";
import { usePrices, useOrder } from '../lib/hooks';
import { Context } from '../index';
import QRCode from "react-qr-code";

export const Card = ({ amountInUSD, apikey, note, root }) => {

    const [prices, loading] = usePrices(amountInUSD);
    const [order] = useOrder(apikey, amountInUSD, note);
    const [currency, setCurrency] = useState();
    const [address, setAddress] = useState();

    useEffect(() => {
        if (currency && currency.address) {
            setAddress("bcrt1quk94vnuqclqtu5vyff0j7tf8dyep45ecju9z4h");
        }
    }, [currency])

    return <div>
        <div className="card">
            <div className="card__title">
                <div className="globiance_payment_modal_icon_wrapper">
                    <span className="globiance_payment_modal_icon_span">
                        <a onClick={() => {
                            root.unmount()
                        }}>close</a>
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
                !currency ? <>
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
                        address ? <QRCode
                            style={{
                                margin: '10px'
                            }}
                            size={150} value={address} /> : null
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
                        address ? <div className="coin__row">
                            <p>{currency?.symbol} Address</p>
                            <div className="row coinRow CoinList bg-coinlist">{address}</div>
                        </div> : null
                    }

                </div>
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