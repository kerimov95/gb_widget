const db = require('../../models');
const currencies = require('../helpers/currencies');
const updatePaymens = require('../helpers/payments/updatePaymens');

const getMerchant = async (req, res) => {
    try {
        const { key } = req.query;

        const merchant = await db.MerchantKey.findOne({
            where: {
                apiKey: key
            }
        })

        res.json(merchant || {});
    }
    catch {
        res.status(500).json({
            status: 500,
            message: "Can't get the Merchant"
        })
    }
}

const createOrder = async (req, res) => {
    try {
        const { key, amountInUSD, note } = req.query;

        const merchant = await db.MerchantKey.findOne({
            where: {
                apiKey: key
            }
        });

        const newOrder = await db.MerchantCheckout.create({
            userId: merchant.userId,
            amountInUSD: amountInUSD,
            callbackUrl: merchant.callbackUrl,
            merchantKeys: merchant.uniqueId,
            note: note,
            tolerance: merchant.tolerance,
            duration: merchant.duration,
            confirmation: merchant.confirmation,
            merchantPrice: amountInUSD,
            status: 'pending'
        })

        res.json({ ...newOrder.dataValues, labelName: merchant.labelName } || {});
    }
    catch (ex) {
        res.status(500).json({
            status: 500,
            message: ex.message
        })
    }
}

const createAddress = async (req, res) => {
    try {
        const { symbol, orderId } = req.query;

        const merchantCheckout = await db.MerchantCheckout.findOne({
            where: {
                uniqueId: orderId
            }
        })

        if (!merchantCheckout && !symbol) {
            res.status(404).json({
                message: 'Order or symbol not found'
            });
            return;
        }

        const coin = await currencies[symbol.toUpperCase()];

        if (!coin) {
            res.status(404).json({
                message: 'Symbol not found'
            });
            return;
        }

        const address = await coin.getAddress();
        const price = await coin.getPrice();

        const newMerchantAddress = await db.MerchantCheckoutAddress.create({
            checkoutId: merchantCheckout.uniqueId,
            coinId: coin.id,
            coinName: coin.symbol,
            address: address,
            amountInCoin: Math.round(merchantCheckout.amountInUSD / price * 100000000) / 100000000,
            amountInUSD: merchantCheckout.amountInUSD,
            isActive: true
        })

        res.json({ ...newMerchantAddress.dataValues, duration: merchantCheckout.duration });
    }
    catch (ex) {
        res.status(500).json({
            status: 500,
            message: ex.message
        })
    }
}

const webHook = async (req, res) => {
    try {

        const result = currencies[req.params.symbol.toUpperCase()];

        if (result) {

            const trx = await result.getTransctions(req.params.transactionID);

            if (trx) {

                const merchantAddress = await db.MerchantCheckoutAddress.findOne({
                    where: {
                        address: trx.address
                    }
                })

                const merchantOrder = await db.MerchantCheckout.findOne({
                    where: {
                        uniqueId: merchantAddress.checkoutId
                    }
                })

                const merchantPayment = await db.MerchantPayments.findOne({
                    where: {
                        txid: req.params.transactionID
                    }
                })

                if (merchantPayment) {
                    merchantPayment.confirmations = trx.confirmations;
                    await merchantPayment.save();
                    res.json(merchantPayment);
                    return;
                }

                const newPaymend = await db.MerchantPayments.create({
                    userId: merchantOrder.userId,
                    checkoutId: merchantOrder.uniqueId,
                    coinId: merchantAddress.coinId,
                    address: merchantAddress.address,
                    txid: req.params.transactionID,
                    category: trx.type,
                    amount: trx.amount,
                    confirmations: trx.confirmations,
                    blockindex: trx.blockindex,
                    blocktime: trx.blocktime,
                    blockhash: trx.blockhash,
                    time: trx.time,
                    timereceived: trx.timereceived,
                    fromAddress: '',
                    label: merchantAddress.coinName
                })

                updatePaymens();

                res.json(newPaymend)
            }
            else {
                res.status(404).json({
                    message: "transactionID not found"
                })
            }
            return;
        }

        res.status(404).json({
            message: "symbol not found"
        })
    }
    catch (ex) {
        console.log(ex)
        res.status(500).json({
            status: 500,
            message: ex.message
        })
    }
}

const checkPayment = async (req, res) => {
    try {
        const { uniqueId } = req.query;

        const merchantAddress = await db.MerchantCheckoutAddress.findOne({
            include: ['MerchantCheckout'],
            where: {
                uniqueId: uniqueId
            }
        })

        if (merchantAddress) {
            res.json({
                orderStatus: merchantAddress?.MerchantCheckout?.status === 'Paid' ? true : false || false
            });
            return;
        }

        res.json({
            orderStatus: false
        });
    }
    catch (ex) {
        res.status(500).json({
            status: 500,
            message: ex.message
        })
    }
}

module.exports = { getMerchant, createOrder, createAddress, webHook, checkPayment };