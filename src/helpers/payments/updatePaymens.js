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
                            where: {
                                uniqueId: payments[i].MerchantCheckout.uniqueId
                            }
                        })
                        order.status = 'Paid';
                        await order.save();
                        await payments[i].save();
                        const balances = await db.MerchantBalance.findOne({
                            where: {
                                merchantUserId: payments[i].userId,
                                currencyName: payments[i].label
                            }
                        })
                        if (balances) {
                            balances.amount += payments[i].amount;
                            await balances.save();
                        }
                        else {
                            const newBalance = await db.MerchantBalance.create({
                                merchantUserId: payments[i].userId,
                                currencyName: payments[i].label,
                                amount: payments[i].amount,
                                typeOfRecord: 'merchant',
                                isActive: true,
                                emailId: payments[i].User.email
                            });
                            await newBalance.save();
                        }
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
                            order.status = 'expired';
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