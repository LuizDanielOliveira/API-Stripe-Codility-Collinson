const express = require('express');
const router = express.Router();
const payments = require('./payments');

router.use('/create-checkout-session', payments);

module.exports = router;
