const db = require('../../../models');

const updatePauments = async () => {
    try {
        const payments = await db.MerchantPayments.findAll({
            include: ['MerchantCheckout', 'User'],
            where: {
                action: true,
                category: 'receive'
            }
        })

        if (payments.length > 0) {
            for (let i = 0; i < payments.length; i++) {
                try {
                    const merchantAddress = await db.MerchantCheckoutAddress.findOne({
                        where: {
                            checkoutId: payments[i]?.MerchantCheckout?.uniqueId
                        }
                    })
                    const confirmation = payments[i].confirmations >= payments[i]?.MerchantCheckout?.confirmation;
                    const checkAmount = payments[i].amount >= merchantAddress?.amountInCoin;

                    if (confirmation && checkAmount) {
                        payments[i].statusConfirmation = true;
                        payments[i].action = false
                        const order = await db.MerchantCheckout.findOne({
                            include: ['MerchantKey'],
                            where: {
                                uniqueId: payments[i].MerchantCheckout.uniqueId
                            }
                        })
                        order.status = 'Paid';
                        order.isActive = false;
                        await order.save();
                        await payments[i].save();

                        const free = Math.round((payments[i].amount * order.MerchantKey.officialFee / 100) * 10000000) / 10000000;
                        const amount = Math.round((payments[i].amount - free) * 10000000) / 10000000;

                        const balances = await db.MerchantBalance.findOne({
                            where: {
                                merchantUserId: payments[i].userId,
                                currencyName: payments[i].label
                            }
                        })
                        if (balances) {
                            balances.amount += amount;
                            await balances.save();
                        }
                        else {
                            const newBalance = await db.MerchantBalance.create({
                                merchantUserId: payments[i].userId,
                                currencyName: payments[i].label,
                                amount: amount,
                                typeOfRecord: 'merchant',
                                isActive: true,
                                emailId: payments[i].User.email
                            });
                            await newBalance.save();
                        }

                        db.MerchantFeeDistribution.create({
                            merchantUserId: payments[i].userId,
                            checkoutId: payments[i].MerchantCheckout.uniqueId,
                            amount: free,
                            transactionID: payments[i].txid,
                            currencyName: payments[i].label,
                            isMerchant: true
                        })

                        continue;
                    }
                    else {
                        const orderTime = Math.floor(new Date(payments[i]?.MerchantCheckout.createdAt).getTime() / 1000.0);
                        const currentTime = Math.floor(new Date().getTime() / 1000.0);
                        const duration = Math.round((currentTime - orderTime) / 60);

                        if (duration >= payments[i]?.MerchantCheckout?.duration) {
                            const order = await db.MerchantCheckout.findOne({
                                where: {
                                    uniqueId: payments[i].MerchantCheckout.uniqueId
                                }
                            })
                            order.status = 'Expired';
                            payments[i].action = false;
                            payments[i].isActive = false;
                            await payments[i].save();
                            await order.save();
                        }
                    }
                }
                catch (ex) {
                    console.error(ex);
                    continue;
                }
            }
        }
    }
    catch (ex) {
        console.error(ex);
    }
}

module.exports = updatePauments;