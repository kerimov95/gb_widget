const express = require('express');
const router = express.Router();
const {getMerchant, createOrder}  = require('../controllers/merchantCotroller');

router.get('/', getMerchant);
router.get('/createOrder', createOrder);

module.exports = { url: 'merchant', router };