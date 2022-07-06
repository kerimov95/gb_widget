import React from "react";
import { SpinnerCenter } from '../spinnerCenter';
import { Context } from '../../app/app';

export const OrderComponent = () => {
    return <Context.Consumer>
        {({ order, orderLoading }) => <div className="fw-bold">
            <div className="order-component_header p-3">
                {!orderLoading ?
                    <>
                        <div className="d-flex justify-content-between">
                            <div>
                                OrderID <span className="text-white"> {`#${order?.id || ''}`}</span>
                            </div>
                            <div>
                                AMOUNT TO PAY
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div>
                                {order?.labelName || ''}
                            </div>
                            <div>
                                <span className="text-white">{order?.amountInUSD || ''} </span> USD
                            </div>
                        </div>
                    </> : <SpinnerCenter />}
            </div>
        </div >}
    </Context.Consumer>
}