const db = require('../../models');

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
        res.json({
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
            merchantPrice: amountInUSD
        })

        res.json({
            order: newOrder,
            merchant: {
                labelName: merchant.labelName,
                logo: merchant.logo
            }
        } || {});
    }
    catch (ex) {
        res.json({
            status: 500,
            message: ex.message
        })
    }
}

module.exports = { getMerchant, createOrder };