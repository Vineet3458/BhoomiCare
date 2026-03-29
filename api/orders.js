const Razorpay = require('razorpay');

// Allow cors for all origins (needed for Vercel deployment)
function setCors(res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

module.exports = async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency } = req.body;

    const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_dummykey';
    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'dummysecret';

    const options = {
      amount: amount * 100, // convert to paise
      currency: currency || 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    // Use mock response if dummy key is used (no real Razorpay auth)
    if (keyId === 'rzp_test_dummykey') {
      return res.status(200).json({
        id: `order_mock_${Date.now()}`,
        amount: options.amount,
        currency: options.currency,
        receipt: options.receipt,
        status: 'created',
      });
    }

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await razorpay.orders.create(options);
    return res.status(200).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ error: error.message || 'Something went wrong' });
  }
};
