const express = require('express');
const router = express.Router();
const { getProducts, createProduct } = require('../controllers/productController');
const { protect } = require('../middleware/auth');

router.route('/').get(getProducts).post(protect, createProduct);

module.exports = router;
