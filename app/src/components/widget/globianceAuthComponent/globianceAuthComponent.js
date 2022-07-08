import React, { useState } from "react";
import { LoginComponent } from "./loginComponent";
import { OtpComponent } from './OtpComponent';

export const GlobianceAuthComponent = () => {

    const [login, setLogin] = useState();

    return <div className="d-flex justify-content-center flex-column align-items-center p-3">
        {!login ? <>
            <LoginComponent
                EventAuth={setLogin}
            />
        </> : <OtpComponent
            login={login}
        />
        }
        <div className="mt-1">
            <h6 className="text-secondary mt-3">Please pay as soon as possible to avoid rate expiry.</h6>
        </div>
    </div >
}