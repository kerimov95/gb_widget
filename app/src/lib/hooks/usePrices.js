import { useEffect, useState } from "react";
import { API_URL } from '../const';

export const usePrices = (amountInUSD) => {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {

        let isMounted = true;

        if (amountInUSD) {
            setLoading(true);
            fetch(`${API_URL}/invoicing/getprices?amountInUSD=${amountInUSD}`)
                .then(res => res.json())
                .then(data => {
                    if (isMounted) {
                        setPrices(data);
                    }
                })
                .catch((error) => {
                    if (isMounted) {
                        console.error(error);
                        setError('Failed to get prices')
                    }
                })
                .finally(() => {
                    if (isMounted) {
                        setLoading(false);
                    }
                })
        } else {
            setError('Failed to create new order')
        }

        return () => { isMounted = false }

    }, [amountInUSD])

    return [prices, loading, error];
}