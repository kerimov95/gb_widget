const currencies = require('../helpers/currencies');

const getPrices = async (req, res) => {
    try {
        const { amountInUSD } = req.query;

        const prices = await Promise.all(
            Object.keys(currencies).map(async (item) => {

                const price = await currencies[item].getPrice();

                return {
                    symbol: currencies[item].symbol,
                    address: currencies[item].paymentWithAddress,
                    wallet: currencies[item].paymentWithWallet,
                    amount: Math.round((amountInUSD / price) * 100000000) / 100000000,
                    price,
                    type: currencies[item].type,
                    contractAddress: currencies[item]?.contractAddress
                }

            })
        );

        res.json(prices)
    }
    catch {
        res.status(500).json({
            status: 500,
            message: "Can't get the pieces"
        })
    }
}

module.exports = getPrices;