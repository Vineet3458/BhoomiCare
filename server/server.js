require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Database connection (do not crash if no MONGODB_URI is provided in dev yet, just warn)
if (process.env.MONGODB_URI) {
  connectDB();
} else {
  console.warn('⚠️ No MONGODB_URI provided. Database operations will fail.');
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Fallback error handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// We only listen if this module is run directly via node
// For serverless (Vercel), we just export the app
if (require.main === module) {
  app.listen(PORT, () => console.log(`🚀 Backend server running on port ${PORT}`));
}

module.exports = app;
