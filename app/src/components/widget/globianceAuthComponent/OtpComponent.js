import React, { useContext, useEffect, useRef, useState } from "react";
import { useCheckOtp } from '../../../lib/hooks/useCheckOtp';
import { SpinnerCenter } from '../../spinnerCenter';
import { Context } from '../../../app/app';

export const OtpComponent = ({ login }) => {

    const {
        auth: [token, setToken],
        tab: [, setCurrentTab]
    } = useContext(Context);

    const [user, loading, error, setLoginAndPasswordAndOtp] = useCheckOtp();
    const [Otp, setOtp] = useState("");

    useEffect(() => {
        if (token) {
            setCurrentTab('whitelist')
        }
    }, [token])

    useEffect(() => {
        if (user) {
            setToken(user);
        }
    }, [user])

    useEffect(() => {
        if (Otp.length === 6) {
            setLoginAndPasswordAndOtp({ ...login, otp: Otp })
        }
    }, [Otp])

    const inputRef = useRef();

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef])


    return <div className="mt-3 w-100">
        {!loading ? <>
            <div>
                <h5>Please Enter Google Auth Code</h5>
                <input
                    ref={inputRef}
                    value={Otp}
                    onChange={e => setOtp(e.target.value)}
                    id="login"
                    placeholder="Enter Google Auth Code"
                    className="form-control"
                />
            </div>

            {
                error ? <div className="text-danger mt-1 w-100">
                    <p className="p-0">{error}</p>
                </div> : null
            }      </>
            : <SpinnerCenter />
        }
    </div>
}