import React from "react";
import { Context } from '../../app/app';

export const SuccessfulComponent = () => {
    return <Context.Consumer>
        {({ order, root, currency: [_currency,] }) => <div className="d-flex p-3 flex-column">
            <div className="successful-component"></div>
            <div className="w-100 text-center m-1">
                <h3>Payment Successful</h3>
            </div>
            <div className="w-100 text-center m-1">
                <h5>Order #{order?.id}</h5>
            </div>
            <div className="d-flex justify-content-between align-items-center border p-2 rounded-3 mt-1 w-100 m-1">
                <div>Total</div>
                <div>{_currency?.amount}{_currency?.symbol}</div>
            </div>
            <div className="d-flex justify-content-between align-items-center border p-2 rounded-3 mt-1 w-100 m-1">
                <div>Paid with</div>
                <div>{_currency?.amount}{_currency?.symbol}</div>
            </div>
            <button
                onClick={() => { root.unmount() }}
                type="button"
                className="btn btn-secondary w-100 mt-3 p-3"
            >
                Go back to Merchant
            </button>
        </div>
        }
    </Context.Consumer>
}