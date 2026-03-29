const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createOrder);
router.post('/verify', protect, verifyPayment);

module.exports = router;
