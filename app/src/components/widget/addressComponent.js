import React, { useEffect } from "react";
import QRCode from "react-qr-code";
import { TimerComponent } from "./timerComponent";
import { SpinnerCenter } from './../spinnerCenter';
import { useAddrress } from '../../lib/hooks/useAddress';
import { PayWithWalletComponent } from './payWithWalletComponent';

export const AddressComponent = ({ uniqueId, currentCurrency, duration, setCurrentTab }) => {

    const [orderAddress, loading, isPaid, isExpired] = useAddrress(uniqueId, currentCurrency.symbol);

    useEffect(() => {
        let isMounted = true;

        if (isPaid) {
            if (isMounted) {
                setCurrentTab('paid')
            }
        }

        if (isExpired) {
            if (isMounted) {
                //setCurrentTab('expired')
            }
        }

        return () => {
            isMounted = false
        }
    }, [isPaid, isExpired])

    return <div className="address-component">
        {
            !loading ? <div className="w-100 p-3 d-flex justify-content-center align-items-center flex-column">
                <div className="border p-2 rounded-3 w-100">
                    {orderAddress?.coinName}
                </div>
                {
                    orderAddress ?
                        <QRCode className="m-3" size={150} value={orderAddress?.address || ""} />
                        : null
                }
                <div className="mt-3  w-100">
                    <label className="form-label">Amount</label>
                    <div className="border p-2 rounded-3 w-100">
                        {orderAddress?.amountInCoin}
                    </div>
                </div>
                <div className="mt-3  w-100">
                    <label className="form-label">Conversion rate</label>
                    <div className="border p-2 rounded-3 w-100">
                        {orderAddress?.amountInCoin}
                    </div>
                </div>
                <div className="mt-3  w-100">
                    <label className="form-label">BTC Adress</label>
                    <div className="border p-2 rounded-3 w-100">
                        {orderAddress?.address}
                    </div>
                </div>
                <div className="w-100 mt-3 text-secondary">
                    <h6>Payment request is valid for
                        <span className="text-danger">
                            {` ${duration} minutes`}
                        </span>
                    </h6>
                </div>
                {
                    (currentCurrency?.wallet && orderAddress) ?
                        <PayWithWalletComponent
                            amount={orderAddress?.amountInCoin}
                            address={orderAddress?.address}
                            currency={currentCurrency}
                        /> : null
                }
                {
                    orderAddress ? <TimerComponent duration={duration} /> : null
                }
                <div className="mt-2 text-secondary w-100 text-center">
                    <h6> Please pay as soon as possible to avoid rate expiry.</h6>
                </div>
            </div > : <SpinnerCenter />
        }
    </div >
}