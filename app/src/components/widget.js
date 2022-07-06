import React from "react";
import { useOrder } from '../lib/hooks';
import { Context } from '../index';
import { IoCloseSharp } from 'react-icons/io5';
import { Spinner, Modal, Button } from 'react-bootstrap';


export const Card = ({ amountInUSD, apikey, note, root }) => {

    const [order, loading] = useOrder(apikey, amountInUSD, note);

    return <Modal show={true} onHide={() => { root.unmount() }}>
        <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Woohoo, you're reading this text in a modal!
        </Modal.Body>
    </Modal >
}

export const Widget = () => {

    return <Context.Consumer>
        {({ root, payload }) => <Card
            root={root}
            amountInUSD={payload?.amountInUSD}
            apikey={payload?.apikey}
            note={payload?.note}
        />}
    </Context.Consumer>
}