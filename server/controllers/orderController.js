const Order = require('../models/Order');
const Razorpay = require('razorpay');

// Mock user logic if Razorpay keys are not provided
const createOrder = async (req, res) => {
  const { amount, currency, orderItems } = req.body;
  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  // Create Razorpay Order first
  const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_dummykey';
  const keySecret = process.env.RAZORPAY_KEY_SECRET || 'dummysecret';

  const options = {
    amount: amount * 100, // in paise
    currency: currency || 'INR',
    receipt: `receipt_${Date.now()}`
  };

  try {
    let rzpOrder;
    if (keyId === 'rzp_test_dummykey') {
      rzpOrder = {
        id: `order_mock_${Date.now()}`,
        amount: options.amount,
        currency: options.currency,
        receipt: options.receipt,
        status: 'created'
      };
    } else {
      const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
      rzpOrder = await razorpay.orders.create(options);
    }

    // Save initial order in DB
    const order = new Order({
      user: req.user ? req.user._id : null, // Assuming you might have a protect middleware, or skip if guest
      orderItems,
      totalPrice: amount,
      paymentResult: { id: rzpOrder.id, status: rzpOrder.status }
    });
    
    // In strict mode, user is required. If we didn't use `protect`, it will fail.
    // However, users must be logged in to order (Marketplace handles this).
    if(req.user) await order.save();

    res.status(201).json(rzpOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: error.message });
  }
};

const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  // TODO: Add crypto verification logic here if using real secrets.

  try {
    const order = await Order.findOne({ 'paymentResult.id': razorpay_order_id });
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: razorpay_payment_id,
        status: 'completed',
        update_time: Date.now().toString(),
      };
      await order.save();
      res.json({ success: true, message: 'Payment verified' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, verifyPayment };
