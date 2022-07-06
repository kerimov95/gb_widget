import { useEffect, useState } from "react";
import { API_URL } from '../const';

export const useOrder = (keyAPI, amountInUSD, note) => {

    const [order, setOrder] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        let isMounted = true;

        if (keyAPI && amountInUSD) {

            setLoading(true);

            fetch(`${API_URL}/merchant/createOrder?key=${keyAPI}&amountInUSD=${amountInUSD}&note=${note}`)
                .then(res => res.json())
                .then(data => {
                    if (isMounted) {
                        setOrder(data);
                    }
                })
                .catch((error) => {
                    if (isMounted) {
                        console.error(error);
                        setError('Failed to create new order')
                    }
                })
                .finally(() => {
                    if (isMounted) {
                        setLoading(false);
                    }
                })
        }
        else {
            if (isMounted) {
                setError('Failed to create new order')
            }
        }

        return () => { isMounted = false }

    }, [keyAPI, amountInUSD, note])

    return [order, loading, error];
}