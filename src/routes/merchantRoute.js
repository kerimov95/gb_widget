const express = require('express');
const router = express.Router();
const { getMerchant, createOrder, createAddress, webHook, checkPayment } = require('../controllers/merchantCotroller');

router.get('/', getMerchant);
router.get('/createOrder', createOrder);
router.get('/createAddress', createAddress);
router.get('/checkPayment', checkPayment);
router.get('/hook/:symbol/:transactionID', webHook);

module.exports = { url: 'merchant', router };