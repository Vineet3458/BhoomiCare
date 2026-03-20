import { useState, useCallback, useRef } from 'react'

// Seed messages per region to simulate a live community
const SEED = {
  Maharashtra: [
    { id:1, author:'Ramesh K.', avatar:'👨‍🌾', lang:'hi', text:'इस बार गेहूं में पीला रतुआ रोग दिख रहा है। क्या उपाय करें?', time:'2h ago', isSeed:true },
    { id:2, author:'Priya D.',  avatar:'👩‍🌾', lang:'mr', text:'माझ्या शेतात कापसावर बोंडअळी आली आहे. कोणते कीटकनाशक वापरावे?', time:'4h ago', isSeed:true },
    { id:3, author:'Suresh P.', avatar:'🧑‍🌾', lang:'en', text:'PM-KISAN instalment not received yet for October. Anyone else facing this?', time:'6h ago', isSeed:true },
  ],
  'Tamil Nadu': [
    { id:4, author:'Kavitha S.', avatar:'👩‍🌾', lang:'ta', text:'தக்காளி விலை குறைந்துவிட்டது. eNAM போர்ட்டலில் பதிவு எப்படி?', time:'1h ago', isSeed:true },
    { id:5, author:'Murugan R.', avatar:'👨‍🌾', lang:'ta', text:'நெல் சாகுபடிக்கு நீர் பாசன மானியம் எப்படி பெறுவது?', time:'5h ago', isSeed:true },
  ],
  'Andhra Pradesh': [
    { id:6, author:'Venkata R.', avatar:'👨‍🌾', lang:'te', text:'మా పొలంలో నీటి వసతి తక్కువ. డ్రిప్ సబ్సిడీ ఎలా?', time:'3h ago', isSeed:true },
    { id:7, author:'Lakshmi T.', avatar:'👩‍🌾', lang:'te', text:'వేరుశనగ పంటకు ఏ ఎరువు వేయాలి?', time:'7h ago', isSeed:true },
  ],
  Punjab: [
    { id:8, author:'Gurjeet S.', avatar:'👨‍🌾', lang:'pa', text:'ਇਸ ਵਾਰ ਕਣਕ ਦੀ ਫ਼ਸਲ ਵਿੱਚ ਪੀਲਾ ਜੰਗ ਲੱਗਿਆ ਹੈ। ਕੀ ਕਰੀਏ?', time:'1h ago', isSeed:true },
    { id:9, author:'Harpreet K.', avatar:'👩‍🌾', lang:'pa', text:'MSP ਤੇ ਧਾਨ ਵੇਚਣ ਲਈ ਕਿੱਥੇ ਰਜਿਸਟਰ ਕਰੀਏ?', time:'3h ago', isSeed:true },
  ],
  Gujarat: [
    { id:10, author:'Bhavesh P.', avatar:'👨‍🌾', lang:'gu', text:'કપાસ ઉપર ગુલાબી ઈયળ આવી ગઈ છે. ઉપાય?', time:'2h ago', isSeed:true },
  ],
  'West Bengal': [
    { id:11, author:'Pradip M.', avatar:'👨‍🌾', lang:'bn', text:'আমার মাটিতে নাইট্রোজেন কম। কোন সার ভালো হবে?', time:'4h ago', isSeed:true },
  ],
  Karnataka: [
    { id:12, author:'Ravi K.', avatar:'👨‍🌾', lang:'kn', text:'ರಾಗಿ ಬೆಳೆಗೆ ಯಾವ ಗೊಬ್ಬರ ಹಾಕಬೇಕು?', time:'2h ago', isSeed:true },
  ],
  Odisha: [
    { id:13, author:'Sushant M.', avatar:'👨‍🌾', lang:'od', text:'ଧାନ ଫସଲରେ ବ୍ଲାଷ୍ଟ ରୋଗ ଦେଖାଯାଉଛି। ଉପଚାର?', time:'5h ago', isSeed:true },
  ],
}

const DEFAULT_SEED = [
  { id:99, author:'Bhoomi Care', avatar:'🤖', lang:'en', isAI:true, text:'Welcome to the Bhoomi Care Farmer Community! Select your state/region above to join farmers near you. You can ask questions in any Indian language and Bhoomi Care will help answer them.', time:'', isSeed:true },
]

export function useCommunity() {
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [roomMessages,  setRoomMessages  ] = useState({})   // { region: [msg, ...] }
  const [aiReplies,     setAiReplies    ] = useState({})   // { msgId: text }
  const [aiLoading,     setAiLoading    ] = useState({})   // { msgId: bool }
  const [typingId,      setTypingId     ] = useState(null)  // msgId currently being answered
  const nextId = useRef(1000)

  const messagesForRegion = useCallback((region) => {
    if (!region) return DEFAULT_SEED
    const seeded = SEED[region] ?? []
    const posted = roomMessages[region] ?? []
    return [...seeded, ...posted]
  }, [roomMessages])

  const postMessage = useCallback(({ region, author, avatar, lang, text }) => {
    const msg = {
      id: nextId.current++,
      author, avatar, lang, text,
      time: 'just now',
      isSeed: false,
    }
    setRoomMessages(prev => ({
      ...prev,
      [region]: [...(prev[region] ?? []), msg],
    }))
    return msg.id
  }, [])

  const askAI = useCallback(async (msgId, msgText) => {
    setAiLoading(prev => ({ ...prev, [msgId]: true }))
    setTypingId(msgId)

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      await new Promise(r => setTimeout(r, 800))
      setAiReplies(prev => ({ ...prev, [msgId]: '🌿 <b>Bhoomi Care AI (Demo Mode):</b> Please add your Gemini API key in <code>.env.local</code> to get real-time answers. For now, consult your local KVK or apply 45kg/ha Urea for nitrogen concerns.' }))
      setAiLoading(prev => ({ ...prev, [msgId]: false }))
      setTypingId(null)
      return
    }

    try {
      const systemMsg = `You are Bhoomi Care, an expert AI agricultural advisor for Indian farmers in a community chat.
A farmer posted a message. Reply helpfully and practically in the SAME language as the message.
Hindi → Hindi, Tamil → Tamil, Telugu → Telugu, Bengali → Bengali, Marathi → Marathi,
Punjabi → Punjabi, Gujarati → Gujarati, Kannada → Kannada, Odia → Odia, English → English.
Keep reply under 80 words. Use • for lists. Use **bold** for key points. Sign off as "— Bhoomi Care 🌱"`

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemMsg }] },
          contents: [{ role: 'user', parts: [{ text: msgText }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 250 },
        }),
      })

      if (!res.ok) throw new Error('API Error')
      const data = await res.json()
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to respond right now. Please try again.'
      setAiReplies(prev => ({ ...prev, [msgId]: reply }))
    } catch {
      setAiReplies(prev => ({ ...prev, [msgId]: 'Connection issue — please try again.' }))
    } finally {
      setAiLoading(prev => ({ ...prev, [msgId]: false }))
      setTypingId(null)
    }
  }, [])

  return {
    selectedRegion, setSelectedRegion,
    messagesForRegion,
    postMessage, askAI,
    aiReplies, aiLoading, typingId,
  }
}
