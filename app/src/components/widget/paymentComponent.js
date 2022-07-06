import React from 'react';
import { usePrices } from '../../lib/hooks/usePrices';

export const PaymentComponent = () => {

    const [prices, loading] = usePrices(amountInUSD);

    return <div className="waiting__confirm">
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
}