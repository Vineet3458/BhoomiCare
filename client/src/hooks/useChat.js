import { useState, useCallback } from 'react'

// Gemini AI chat hook — replaces Claude.
// Components just call { messages, loading, send, reset } — no fetch logic in JSX.

export function useChat() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading]   = useState(false)

  const send = useCallback(async (text) => {
    if (!text?.trim() || loading) return

    const userMsg = { role: 'user', content: text.trim() }
    const history = [...messages, userMsg]
    setMessages(history)
    setLoading(true)

    // Call backend API instead of direct Google API
    try {
      const res = await fetch('/api/ai/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: messages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
          })),
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        // Surface specific quota/key errors to the user
        if (res.status === 429) {
          throw new Error('QUOTA_EXCEEDED')
        }
        if (res.status === 400 && err?.error === 'INVALID_API_KEY') {
          throw new Error('INVALID_API_KEY')
        }
        throw new Error(err?.error || `HTTP ${res.status}`)
      }

      const data  = await res.json()
      const reply = data.reply
                 ?? 'मुझे माफ करें, मैं आपका जवाब नहीं दे पाया। कृपया दोबारा कोशिश करें। / Sorry, I could not process that. Please try again.'

      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      console.error('Chat Error:', err)
      
      let errorMessage = '🌿 **AI Connection issue** — please check your internet and try again.\n\n*Meanwhile: Is there a specific soil or crop question I can help with?*';
      
      if (err.message === 'QUOTA_EXCEEDED') {
        errorMessage = '🌿 **Gemini API Error: Quota Exceeded** — The AI has reached its request limit for exactly your model or API key. Please check your billing or use a different API key.';
      } else if (err.message === 'INVALID_API_KEY') {
        errorMessage = '🌿 **Gemini API Error: Invalid Key** — The provided API key is invalid or not configured properly.';
      } else if (err.message !== 'Failed to fetch' && err.message !== 'Load failed') {
         // other specific backend errors
         // errorMessage = `🌿 **API Error:** ${err.message}` // Optional: enable to show other messages
      }

      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: errorMessage,
        }
      ])
    } finally {
      setLoading(false)
    }
  }, [messages, loading])

  const reset = useCallback(() => setMessages([]), [])

  return { messages, loading, send, reset }
}
