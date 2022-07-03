const getPrcesHelper = require('../helpers/getPrices');

const getPrices = async (req, res) => {
    try {
        const { amountInUSD } = req.query;

        const prices = await getPrcesHelper();

        res.json(prices?.map((item => ({
            ...item,
            amount: Math.round(amountInUSD / item?.price * 100000000) / 100000000 || 0
        }))) || [])
    }
    catch {
        res.json({
            status: 500,
            message: "Can't get the pieces"
        })
    }
}

module.exports = getPrices;