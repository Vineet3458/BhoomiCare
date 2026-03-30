const express = require('express');
const { chatWithGemini } = require('../controllers/aiController');
const router = express.Router();

// No auth required for chat initially (or add middleware if needed)
router.post('/chat', chatWithGemini);

module.exports = router;
