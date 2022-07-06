import React from 'react';
import { SpinnerCenter } from '../spinnerCenter';
import { usePrices } from '../../lib/hooks/usePrices';
import { Context } from '../../app/app';

const PricesComponent = ({ amountInUSD, order }) => {

    const [prices, loading, error] = usePrices(amountInUSD);

    return <Context.Consumer>
        {({ tab: [, setCurrentTab], symbol: [, setSymbol] }) => <div className='w-100 m-0'>
            {
                !loading ? prices.map((price) => (<div
                    onClick={() => {
                        setCurrentTab('payment');
                        setSymbol(price.symbol);
                    }}
                    role='button'
                    key={price.symbol}
                    style={{ cursor: 'pointer' }}
                    className="d-flex justify-content-between align-items-center border p-2 rounded-3 mt-1 "
                >
                    <div> {price?.symbol} </div>
                    <div>  {price?.amount}  </div>
                </div>)) : <SpinnerCenter />
            }
        </div>}
    </Context.Consumer>
}

export default React.memo(PricesComponent);