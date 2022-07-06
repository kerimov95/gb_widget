import React from "react";
import * as ReactDOM from 'react-dom/client';
import { App } from './app/app';

export const start = (payload) => {
    const root = ReactDOM.createRoot(document.getElementById('widget'));
    root.render(<App {...{ ...payload, root }} />);
}

start({ amountInUSD: 100, note: 'Test payment', apikey: '612960f9-0f37-43c6-b9a0-d8b706ed0de5' })

window.Start = start;

