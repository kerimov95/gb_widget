import React from "react";
import { Spinner } from 'react-bootstrap';

export const SpinnerCenter = () => {
    return <div className="d-flex justify-content-center align-items-center h-100 w-100">
        <Spinner animation="border" />
    </div>
}