import React from "react";
import * as ReactDOM from 'react-dom/client';
import { App } from './app/app';

export const Context = React.createContext();

export const start = (payload) => {
    const root = ReactDOM.createRoot(document.getElementById('widget'));
    root.render(
        <Context.Provider value={{ root, payload }}>
            <App />
        </Context.Provider>
    );
}

window.Start = start;

