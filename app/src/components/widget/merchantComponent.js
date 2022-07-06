import React from "react";
import { useMerchant } from '../../lib/hooks';
import { SpinnerCenter } from '../spinnerCenter';

export const MerchantComponent = ({ keyAPI }) => {

    const [merchant, loading] = useMerchant(keyAPI);

    return <div className="order-component_logo p-3 mt-3">
        {
            !loading ? <>
                <img className="order-component_img mt-1"
                    src={merchant?.logo}
                />
                <h4 className="mt-1">{merchant?.labelName || ''}</h4>
            </> : <SpinnerCenter />
        }
    </div>
}