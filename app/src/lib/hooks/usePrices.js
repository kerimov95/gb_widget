import { useEffect, useState } from "react";
import { API_URL } from '../const';

export const usePrices = (amountInUSD) => {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (amountInUSD) {
            setLoading(true);
            fetch(`${API_URL}/invoicing/getprices?amountInUSD=${amountInUSD}`)
                .then(res => res.json())
                .then(data => {
                    setPrices(data);
                })
                .catch()
                .finally(() => {
                    setLoading(false);
                })
        }
    }, [amountInUSD])

    return [prices, loading];
}