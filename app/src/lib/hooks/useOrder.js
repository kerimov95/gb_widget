import { useEffect, useState } from "react";
import { API_URL } from '../const';

export const useOrder = (keyAPI, amountInUSD, note) => {

    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (keyAPI && amountInUSD) {
            setLoading(true);
            fetch(`${API_URL}/merchant/createOrder?key=${keyAPI}&amountInUSD=${amountInUSD}&note=${note}`)
                .then(res => res.json())
                .then(data => {
                    setOrder(data);
                })
                .catch()
                .finally(() => {
                    setLoading(false);
                })
        }
    }, [keyAPI, amountInUSD, note])

    return [order, loading];
}