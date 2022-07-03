const express = require('express');
const router = express.Router();
const getPrices = require('../controllers/invoicingController');

router.get('/getprices', getPrices);

module.exports = { url: 'invoicing', router };