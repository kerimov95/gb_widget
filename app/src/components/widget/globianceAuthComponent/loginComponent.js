import React, { useEffect, useState } from "react";
import { useAuth } from "../../../lib/hooks/useAuth";
import { SpinnerCenter } from '../../spinnerCenter';

export const LoginComponent = ({ EventAuth }) => {

    const [user, loading, error, setLoginAndPassword] = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        EventAuth(user);
    }, [user])

    const handleButtonCLick = () => {
        if (email && password) {
            setLoginAndPassword({
                email,
                password
            })
        }
    }

    return <>
        <div className="mt-3">
            <h5 className="text-center">Sign in to Globiance</h5>
        </div>
        <div className="mt-3 w-100">
            <input value={email} onChange={e => setEmail(e.target.value)} id="login" placeholder="Email address" className="form-control" />
        </div>
        <div className="mt-3 w-100">
            <input value={password} onChange={e => setPassword(e.target.value)} id="password" type="password" placeholder="Password" className="form-control" />
        </div>
        {
            error ? <div className="text-danger mt-1 w-100">
                <p className="p-0">{error}</p>
            </div> : null
        }
        <div className="mt-3 w-100">
            {!loading ? <button disabled={!email || !password}
                type="button"
                className="btn btn-secondary w-100 p-3"
                onClick={handleButtonCLick}
            >
                Login
            </button> : <SpinnerCenter />}
        </div>
    </>
}