import { useEffect, useState } from "react";
import { exchange_id, globianceAPI } from '../../lib/const';

export const useAuth = () => {

    const [user, setUser] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [login, setLoginAndPassword] = useState();

    useEffect(() => {
        let isMounted = true;
        if (login && login.email && login.password) {
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
                    exchange_id: exchange_id,
                })
            }).then(res => res.json())
                .then((responce) => {
                    if (isMounted) {
                        if (responce?.statusCode !== 200) {
                            throw new Error("Email or Password is wrong");
                        }
                        setUser({
                            email: login.email,
                            password: login.password
                        })
                    }
                })
                .catch(() => {
                    if (isMounted) {
                        setError('Wrong login or password')
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


    return [user, loading, error, setLoginAndPassword];

}