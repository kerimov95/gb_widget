import { useEffect, useState } from "react";
import { exchange_id, globianceAPI } from '../../lib/const';

export const useCheckOtp = () => {

    const [user, setUser] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [login, setLoginAndPasswordAndOtp] = useState();

    useEffect(() => {
        let isMounted = true;
        if (login && login.email && login.password && login.otp) {
            setLoading(true);
            setError(null);
            fetch(`${globianceAPI}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': globianceAPI
                },
                body: JSON.stringify({
                    email: login.email,
                    password: login.password,
                    otp: login.otp,
                    exchange_id: exchange_id,
                })
            }).then(res => res.json())
                .then((responce) => {
                    if (isMounted) {
                        if (responce?.statusCode !== 200) {
                            throw new Error(responce.message);
                        }
                        setUser({
                            email: login.email,
                            password: login.password,
                            token: responce.data.token
                        })
                    }
                })
                .catch((ex) => {
                    if (isMounted) {
                        setError(ex.message)
                    }
                })
                .finally(() => {
                    if (isMounted) {
                        setLoading(false);
                    }
                })
        }

        return () => { isMounted = false }
    }, [login])


    return [user, loading, error, setLoginAndPasswordAndOtp];

}