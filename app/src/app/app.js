import React from "react";
import { Widget } from '../components/widget';

const style = {
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0, 0.3)',
    position: 'fixed',
    justifyContent: 'center',
    top: 0,
    left: 0,
    display: 'flex'
}

export const App = () => {

    return <div style={style}>
        <Widget />
    </div>
}