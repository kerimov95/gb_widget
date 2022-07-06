import { useEffect, useState } from "react";
import { API_URL } from '../const';

export const useMerchant = (keyAPI) => {

    const [merchant, setMerchant] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {

        let isMounted = true;

        if (keyAPI) {
            setLoading(true);
            fetch(`${API_URL}/merchant?key=${keyAPI}`)
                .then(res => res.json())
                .then(data => {
                    if (isMounted) {
                        setMerchant(data);
                    }
                })
                .catch((error) => {
                    if (isMounted) {
                        console.error(error);
                        setError('Failed to get merchant')
                    }
                })
                .finally(() => {
                    if (isMounted) {
                        setLoading(false);
                    }
                })
        }
    }, [keyAPI])

    return [merchant, loading, error];
}