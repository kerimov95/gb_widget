import React, { useEffect, useState } from "react";
import { ModalComponent } from '../components/widget';
import { useOrder } from '../lib/hooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'

export const Context = React.createContext();

export const App = ({ apikey, amountInUSD, note, root }) => {

    const [order, orderLoading, error] = useOrder(apikey, amountInUSD, note);
    const [currentTab, setCurrentTab] = useState('order');
    const [symbol, setSymbol] = useState();

    return <Context.Provider value={{
        apikey,
        amountInUSD,
        note,
        root,
        order,
        orderLoading,
        error,
        tab: [currentTab, setCurrentTab],
        symbol: [symbol, setSymbol]
    }}>
        <ModalComponent />
    </Context.Provider >
}