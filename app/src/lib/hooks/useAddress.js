import { useEffect, useState } from "react";
import { getAddress } from "../getAddress";
import { checkPayment } from "../../lib/checkPayment";

export const useAddrress = (uniqueId, symbol) => {

    const [address, setAddress] = useState();
    const [loading, setLoading] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [isExpired, setIsExpired] = useState();
    const [duration, setDuration] = useState();

    useEffect(() => {
        let isMounted = true;

        if (duration && isMounted) {
            setTimeout(() => {
                if (isMounted) {
                    setIsExpired(true);
                }
            }, duration * 60 * 1000)
        }

        return () => { isMounted = false }
    }, [duration])

    useEffect(() => {
        let intervalId;
        let isMounted = true;
        if (address) {
            intervalId = setInterval(() => {
                checkPayment(address.uniqueId)
                    .then(res => res.json())
                    .then(res => {
                        if (res?.orderStatus && isMounted) {
                            setIsPaid(true);
                        }
                    })
            }, 5000)
        }
        return () => {
            if (intervalId) {
                isMounted = false
                clearInterval(intervalId);
            }
        }
    }, [address])

    useEffect(() => {

        let isMounted = true;

        if (uniqueId && symbol) {
            setLoading(true);
            getAddress(uniqueId, symbol).then(res => res.json())
                .then(checkOutAdress => {
                    if (isMounted) {
                        setAddress(checkOutAdress);
                        setDuration(checkOutAdress.duration);
                    }
                }).catch((error) => {
                    if (isMounted) {
                        console.error(error);
                    }
                }).finally(() => {
                    if (isMounted) {
                        setLoading(false);
                    }
                })
        }
        return () => { isMounted = false }
    }, [uniqueId, symbol]);

    return [address, loading, isPaid, isExpired];
}