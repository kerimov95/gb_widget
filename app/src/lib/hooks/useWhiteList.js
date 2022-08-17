import { useState, useEffect, useContext } from "react";
import { useIsMounted } from './useIsMounted';
import { getWhiteList } from '../getWhiteList';
import { Context } from '../../app/app';

export const useWhiteList = () => {

    const isMounted = useIsMounted();
    const { apikey, auth: [auth] } = useContext(Context)

    const [whiteList, setWhiteList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {

        if (apikey && auth && auth.token) {
            setLoading(true);
            getWhiteList(apikey, auth.token)
                .then((res) => res.json())
                .then(list => {
                    if (isMounted) {
                        const newList = list.reduce((pr, cr) => {
                            pr[cr.currencyName] = cr;
                            return pr;
                        }, {})
                        setWhiteList(newList);
                    }
                })
                .catch(() => {
                    if (isMounted) {
                        setError("Failed get whitelist");
                    }
                })
                .finally(() => {
                    if (isMounted) {
                        setLoading(false);
                    }
                })
        }

    }, [])

    return [whiteList, loading, error];
}