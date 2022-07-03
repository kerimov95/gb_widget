import { useEffect, useState } from "react";
import { API_URL } from '../const';

export const useMerchant = (keyAPI) => {

    const [merchant, setMerchant] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (keyAPI) {
            setLoading(true);
            fetch(`${API_URL}/merchant?key=${keyAPI}`)
                .then(res => res.json())
                .then(data => {
                    setMerchant(data);
                })
                .catch()
                .finally(() => {
                    setLoading(false);
                })
        }
    }, [keyAPI])

    return [merchant, loading];
}