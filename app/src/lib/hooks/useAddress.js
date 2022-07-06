import { useEffect, useState } from "react";
import { getAddress } from "../getAddress";

export const useAddrress = (uniqueId, symbol) => {

    const [address, setAddress] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        let isMounted = true;

        if (uniqueId && symbol) {

            setLoading(true);

            getAddress(uniqueId, symbol)
                .then(res => res.json())
                .then(checkOutAdress => {
                    if (isMounted) {
                        setAddress(checkOutAdress)
                    }
                })
                .catch((error) => {
                    if (isMounted) {
                        console.error(error)
                    }
                })
                .finally(() => {
                    if (isMounted) {
                        setLoading(false);
                    }
                })
        }

        return () => { isMounted = false }

    }, [uniqueId, symbol]);


    return [address, loading];

}