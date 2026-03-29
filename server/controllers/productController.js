const Product = require('../models/Product');

// Fetch all products
const getProducts = async (req, res) => {
  const products = await Product.find({}).populate('seller', 'name region');
  res.json(products);
};

// Create a new product (mock seller creation if they don't exist logic should be handled correctly, but we assume logged in user)
const createProduct = async (req, res) => {
  const { name, category, price, mrp, description, stock, image, weight, brand, tags } = req.body;

  const product = new Product({
    seller: req.user._id, // Set from auth middleware
    name, category, price, mrp, description, stock,
    image, weight, brand, tags
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

module.exports = { getProducts, createProduct };
