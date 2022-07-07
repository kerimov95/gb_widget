import React from 'react';
import { Modal } from 'react-bootstrap';
import { OrderComponent } from "./orderComponent";
import PricesComponent from './pricesComponent';
import { MerchantComponent } from './merchantComponent';
import { AddressComponent } from './addressComponent';
import { Context } from '../../app/app';
import { SuccessfulComponent } from './successfulComponent';

const Switch = ({ tabName, children }) => {
    return <Context.Consumer>
        {({ tab: [currentTab], root }) => <>
            {
                currentTab === tabName ? children : null
            }
        </>
        }
    </Context.Consumer>
}

export const ModalComponent = () => {

    return <Context.Consumer>
        {({ root }) => <Modal
            show={true} onHide={() => { root.unmount() }}
        >
            <Modal.Header
                className="redius-rounded-top border-0"
                closeButton
            >
                <Modal.Title className="w-100 d-flex justify-content-center">
                    <img src='./images/logo.png' />
                    <span className="ms-3">Globiance</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="redius-rounded-bottom p-0">
                <OrderComponent />
                <Switch tabName="order">
                    <MainTab />
                </Switch>
                <Switch tabName="payment">
                    <PaymentTab />
                </Switch>
                <Switch tabName="paid">
                    <PaidTab />
                </Switch>
            </Modal.Body>
        </Modal >}
    </Context.Consumer>
}

const PaidTab = () => {
    return <SuccessfulComponent />
}

const PaymentTab = () => {
    return <Context.Consumer>
        {({
            order: { uniqueId, duration },
            currency: [currentCurrency],
            tab: [, setCurrentTab]
        }) => <>
                <AddressComponent {...{
                    uniqueId,
                    currentCurrency,
                    duration,
                    setCurrentTab
                }} />
            </>
        }
    </Context.Consumer>
}

const MainTab = () => {
    return <Context.Consumer>
        {({ apikey, amountInUSD, order }) => <>
            <MerchantComponent
                keyAPI={apikey}
            />
            {
                order ? <div
                    className="d-flex justify-content-center mb-3 p-3"
                >
                    <PricesComponent {...{ amountInUSD, order }} />
                </div> : null
            }
        </>}
    </Context.Consumer>
}