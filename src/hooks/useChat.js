import { useState, useCallback } from 'react'
import { buildSystemPrompt }    from '../data/systemPrompt.js'
import { SOIL_SAMPLE }          from '../data/soilData.js'

// Gemini AI chat hook — replaces Claude.
// Components just call { messages, loading, send, reset } — no fetch logic in JSX.

const GEMINI_MODEL = 'gemini-2.0-flash'
const GEMINI_URL   = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`
const systemPrompt = buildSystemPrompt(SOIL_SAMPLE)

export function useChat() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading]   = useState(false)

  const send = useCallback(async (text) => {
    if (!text?.trim() || loading) return

    const userMsg = { role: 'user', content: text.trim() }
    const history = [...messages, userMsg]
    setMessages(history)
    setLoading(true)

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY

    // Demo/offline mode if no API key
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      await new Promise(r => setTimeout(r, 800))
      const demo = getDemoReply(text)
      setMessages(prev => [...prev, { role: 'assistant', content: demo }])
      setLoading(false)
      return
    }

    try {
      // Build Gemini conversation history
      const geminiHistory = history.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }))

      const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: geminiHistory,
          generationConfig: {
            temperature:     0.7,
            maxOutputTokens: 600,
            topP:            0.9,
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_ONLY_HIGH' },
          ],
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error?.message || `HTTP ${res.status}`)
      }

      const data  = await res.json()
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
                 ?? 'मुझे माफ करें, मैं आपका जवाब नहीं दे पाया। कृपया दोबारा कोशिश करें। / Sorry, I could not process that. Please try again.'

      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      const msg = err.message?.toLowerCase() || ''
      const isKeyOrQuota = msg.includes('api key') || msg.includes('403') || msg.includes('400') || msg.includes('429') || msg.includes('quota')

      if (isKeyOrQuota) {
        // Automatically fallback to demo mode if API key is invalid or quota is exceeded
        const demo = getDemoReply(text)
        setMessages(prev => [...prev, { role: 'assistant', content: demo }])
      } else {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: '🌿 **Connection issue** — please check your internet and try again.\n\n*Meanwhile: Is there a specific soil or crop question I can help with?*',
          },
        ])
      }
    } finally {
      setLoading(false)
    }
  }, [messages, loading])

  const reset = useCallback(() => setMessages([]), [])

  return { messages, loading, send, reset }
}

// ── Demo replies (shown when no API key is configured) ───────────────────────
function getDemoReply(text) {
  const q = text.toLowerCase()

  if (q.includes('nitrogen') || q.includes('urea') || q.includes('नाइट्रोजन') || q.includes('यूरिया')) {
    return `🌿 **Nitrogen Deficiency — Action Plan**

Your soil shows **Nitrogen: 38 kg/ha** (deficient, need 40–80 kg/ha).

**Recommended actions:**
• Apply **45 kg/ha Urea** (split dose) before sowing — rake it into the top 5 cm
• Top dress with **20 kg/ha Urea** at tillering stage
• Consider **Biofertilizer (Azotobacter)** to reduce chemical N by 20%
• Add **2–3 t/ha FYM** to improve N retention long-term

💡 **Tip:** Apply urea in the morning or evening — avoid midday application to reduce volatilization losses.

Ask me for more details about any point above. 🌾`
  }

  if (q.includes('zinc') || q.includes('जिंक') || q.includes('zn')) {
    return `🌿 **Zinc Deficiency — Correction**

Your soil shows **Zinc: 0.45 ppm** (need 0.6–2.0 ppm).

**Recommended actions:**
• Soil application: **Zinc Sulphate 21% — 25 kg/ha** mixed in top soil
• Foliar spray: **0.5% ZnSO₄** solution at 2–3 leaf stage (3 sprays)
• For paddy: Apply with last ploughing for best uptake

💡 **Products:** Aries Agro Zinc Sulphate available on Bhoomi Care Marketplace at ₹980/25kg bag.

Ask me for crop-specific application timing!`
  }

  if (q.includes('pm-kisan') || q.includes('kisan') || q.includes('scheme') || q.includes('योजना')) {
    return `🌿 **PM-KISAN 2025–26 Update**

You are eligible for **PM-KISAN** based on your land records!

**Key details:**
• **Benefit:** ₹6,000/year in 3 instalments of ₹2,000
• **19th Instalment:** Expected **February 2026**
• **Status check:** pmkisan.gov.in → Beneficiary Status

**Other schemes you may qualify for:**
• **KCC** (Kisan Credit Card) — crop loans at 4% interest
• **PMFBY** crop insurance — enrol before Kharif 2026 deadline
• **Soil Health Card** — free soil testing at your nearest KVK

Would you like to know how to apply for any of these? 📋`
  }

  if (q.includes('crop') || q.includes('फसल') || q.includes('what to grow')) {
    return `🌿 **Best Crops for Your Soil (Rabi 2025–26)**

Based on your soil data (pH 6.8, good P & K):

**Highly Recommended:**
• **Wheat** — ideal pH, good Potassium. Use HD-2967 or HD-3086 variety
• **Chickpea (Gram)** — fixes N naturally, good for your deficient nitrogen soil
• **Mustard** — tolerates sulphur deficiency, short duration crop

**Avoid this season:**
• Paddy (requires more water & better Nitrogen)
• Groundnut (needs higher Sulphur)

💡 Fix your Nitrogen deficiency with **45 kg/ha Urea** before sowing for best results!`
  }

  return `🌿 **Bhoomi Care AI — Demo Mode**

I'm running in demo mode as no Gemini API key is configured yet.

**To activate full AI capabilities:**
1. Get your FREE key at: [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Add it to \`.env.local\`: \`VITE_GEMINI_API_KEY=your_key_here\`
3. Restart the dev server

**Your soil summary for Rabi 2025–26:**
• ⬇ **Nitrogen** (38 kg/ha) — apply Urea 45 kg/ha
• ✓ **Phosphorus** (22 kg/ha) — optimal
• ✓ **Potassium** (185 kg/ha) — optimal
• ⬇ **Zinc** (0.45 ppm) — apply ZnSO₄ 25 kg/ha

Ask me about: nitrogen deficiency, zinc, PM-KISAN, crops, or pest management!`
}
