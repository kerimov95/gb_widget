import { useState, useEffect, useContext } from "react";
import { useIsMounted } from './useIsMounted';
import { getPrices } from '../getPrices';
import { Context } from '../../app/app';

export const useCurrenciesUsdPrices = () => {

    const isMounted = useIsMounted();

    const { amountInUSD } = useContext(Context);
    const [prices, setPrices] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {

        setLoading(true);
        getPrices()
            .then((res) => res.json())
            .then(responce => {
                if (responce && responce.statusCode === 200) {
                    if (isMounted) {
                        const _prices = responce.data.reduce((pr, cr) => {
                            pr[cr.currencyName] = Math.round(amountInUSD / cr.usdPrice * 100000000) / 100000000;
                            return pr;
                        }, {})
                        setPrices(_prices);
                    }
                }
                else {
                    throw new Error("Failed get prices");
                }
            })
            .catch(() => {
                if (isMounted) {
                    setError("Failed get prices");
                }
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                }
            })

    }, [])

    return [prices, loading, error];
}