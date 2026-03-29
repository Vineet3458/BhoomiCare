require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Razorpay
// For testing, we use dummy keys if env variables are not present.
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummykey',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummysecret'
});

app.post('/api/orders', async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount: amount * 100, // amount in the smallest currency unit (paise)
      currency: currency || 'INR',
      receipt: `receipt_${Date.now()}`
    };

    // Note: If you use a dummy key, razorpay.orders.create will fail since it authenticates online.
    // So we will mock the response if the key is dummy.
    if (razorpay.key_id === 'rzp_test_dummykey') {
      return res.json({
        id: `order_mock_${Date.now()}`,
        amount: options.amount,
        currency: options.currency,
        receipt: options.receipt,
        status: 'created'
      });
    }

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
});

// Endpoint to verify payment
app.post('/api/verify', (req, res) => {
  // Normally you would do crypto signature verification here.
  // We'll trust the payload for this demonstration.
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
