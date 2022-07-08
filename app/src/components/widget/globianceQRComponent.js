import React from "react";
import { Context } from '../../app/app';

export const GlobianceQRComponent = () => {
    return <Context.Consumer>
        {({ apikey, amountInUSD, order, tab: [, setCurrentTab] }) => <div className="d-flex justify-content-center flex-column align-items-center m-3">
            <h5>Scan with Mobile Wallet</h5>
            <img src={`https://chart.googleapis.com/chart?cht=qr&chl="orderId":"${order.id}","merchantId":"${apikey}","amountInUSD":"${amountInUSD}"&chs=160x160&chld=L|0`} />
            <button
                type="button"
                className="btn btn-secondary w-100 mt-3 p-3"
                onClick={() => setCurrentTab("globianceAuth")}
            >
                Use Globiance account
            </button>
            <h6 className="text-secondary mt-3">Please pay as soon as possible to avoid rate expiry.</h6>
        </div>}
    </Context.Consumer>
}