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
        throw new Error(err?.error || `HTTP ${res.status}`)
      }

      const data  = await res.json()
      const reply = data.reply
                 ?? 'मुझे माफ करें, मैं आपका जवाब नहीं दे पाया। कृपया दोबारा कोशिश करें। / Sorry, I could not process that. Please try again.'

      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      console.error('Chat Error:', err)
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: '🌿 **AI Connection issue** — please check your internet and try again.\n\n*Meanwhile: Is there a specific soil or crop question I can help with?*',
        }
      ])
    } finally {
      setLoading(false)
    }
  }, [messages, loading])

  const reset = useCallback(() => setMessages([]), [])

  return { messages, loading, send, reset }
}
