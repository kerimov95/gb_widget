import React, { useEffect, useState } from "react";
import { useWhiteList } from '../../lib/hooks';
import { useCurrenciesUsdPrices } from '../../lib/hooks';
import { SpinnerCenter } from './../spinnerCenter';

export const WhitelistComponent = () => {

    const [whiteList, setList] = useState([]);

    const [list, loading, error] = useWhiteList();
    const [prices, priceLoading, priceError] = useCurrenciesUsdPrices();

    useEffect(() => {

        if (list && prices) {
            const keys = [
                ...Object.keys(list),
                ...Object.keys(prices)
            ].reduce((pr, cr) => {
                if (pr[cr]) {
                    pr[cr] += 1;
                } else {
                    pr[cr] = 1;
                }
                return pr;
            }, {})

            const newList = Object.entries(keys)
                .filter(f => f[1] === 2 && prices[f[0]] >= 0.00000001)
                .map((key) => ({
                    ...list[key[0]],
                    currencyName: key[0],
                    price: prices[key[0]]
                }))

            setList(newList)
        }

    }, [list, prices])



    return <div className="p-2">
        <h5>Choose coin:</h5>
        <div className="whitelist-component">
            {
                !(loading && priceLoading) ? whiteList.map(row => (<div
                    style={{ cursor: 'pointer' }}
                    key={row.currencyName}
                    className="border p-2 mt-1 rounded"
                >
                    <div className="d-flex justify-content-between">
                        <div>{row.currencyName}</div>
                        <div>{row.price}</div>
                    </div>
                    <div className="d-flex justify-content-between mt-1">
                        <div>Balance</div>
                        <div>{row.balance}</div>
                    </div>
                </div>)) : <SpinnerCenter />
            }
            {
                [error, priceError]
                    .filter(item => item)
                    .map(error => <div className="text-danger mt-1 w-100">
                        <p className="p-0">{error}</p>
                    </div>)
            }
        </div>
    </div >


}