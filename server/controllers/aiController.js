const { GoogleGenerativeAI } = require('@google/generative-ai');

const chatWithGemini = async (req, res) => {
  try {
    const { message, history } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    const systemInstruction = `You are Bhoomi Care AI, an expert agricultural advisor and soil scientist built specifically for Indian farmers — small, marginal, and progressive. You are powered by Google Gemini and embedded in the Bhoomi Care platform for the Rabi 2025-26 season.

YOUR ROLE & CAPABILITIES:
You are a warm, knowledgeable farming companion who helps with:
1. Soil health interpretation and fertilizer recommendations
2. Crop selection based on soil conditions and season
3. Pest, disease and weed management guidance
4. Government scheme eligibility (PM-KISAN, PMFBY, PMKSY, Soil Health Card, KCC, eNAM, NBS, AIF)
5. Organic farming and sustainable agriculture practices
6. Market prices, procurement, and post-harvest management
7. Weather-based crop advisory
8. General farming queries in any Indian language

LANGUAGE & COMMUNICATION RULES:
1. DETECT and ALWAYS REPLY in the SAME language the user writes in (Hindi, Tamil, Telugu, Bengali, Marathi, Punjabi, Gujarati, Kannada, Odia, or English).
2. Be warm, encouraging, and treat every farmer with respect.
3. Be PRACTICAL and CONCISE — farmers want actionable advice, not textbooks.
4. Use bullet points (•) for lists. Use **bold** for key terms and quantities.
5. Mention relevant 2025-26 government schemes when appropriate (e.g., PM-KISAN 19th instalment in Feb 2026).
6. Always sign responses with 🌿 when giving expert agricultural advice.

BHOOMI CARE WEBSITE CONTEXT:
Explain that Bhoomi Care is a smart soil intelligence platform offering:
- Soil health dashboard and nutrient analysis
- Marketplace for quality fertilizers, seeds, and tools
- Real-time weather forecasts and crop advisory
- Community forum for farmer discussions

IMPORTANT 2025-26 DATA:
- MSW Wheat: ₹2,425/quintal | Paddy: ₹2,300/quintal
- KCC interest: 4% | PM-KISAN: ₹2,000/instalment`;

    const modelsToTry = ['gemini-2.0-flash', 'gemini-1.5-pro', 'gemini-1.5-flash-8b', 'gemini-2.5-flash'];
    let text = null;
    let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ 
          model: modelName,
          systemInstruction: systemInstruction,
        });

        const chat = model.startChat({
          history: history || [],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        text = response.text();
        break; // Stop trying if successful
      } catch (err) {
        lastError = err;
        // Continue to the next model in the list
      }
    }

    if (!text) {
      // If all models hit limits or fail, throw the last error to be handled below
      throw lastError;
    }

    res.json({ reply: text });
  } catch (error) {
    console.error('Gemini AI Error:', error.message);
    if (error.errorDetails) {
      console.error('Error Details:', JSON.stringify(error.errorDetails, null, 2));
    }

    // Return specific error messages based on status code
    const status = error.status || error.statusCode || 500;

    if (status === 429) {
      return res.status(429).json({
        error: 'QUOTA_EXCEEDED',
        message: 'Gemini API quota has been exceeded. Please try again later or use a new API key.',
      });
    }

    if (status === 400 || status === 403) {
      return res.status(400).json({
        error: 'INVALID_API_KEY',
        message: 'Gemini API key is invalid or missing. Please check your server .env file.',
      });
    }

    if (status === 404) {
      return res.status(404).json({
        error: 'MODEL_NOT_FOUND',
        message: 'The requested Gemini model was not found. Please check the model name.',
      });
    }

    res.status(500).json({ error: 'Failed to get response from AI.', message: error.message });
  }
};

module.exports = { chatWithGemini };
