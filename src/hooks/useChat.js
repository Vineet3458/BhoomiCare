import { useState, useCallback } from 'react'
import { buildSystemPrompt } from '../data/systemPrompt.js'
import { SOIL_SAMPLE } from '../data/soilData.js'

// All Claude API chat logic lives here.
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

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: buildSystemPrompt(SOIL_SAMPLE),
          messages: history.map(m => ({ role: m.role, content: m.content })),
          ...(apiKey ? { 'x-api-key': apiKey } : {}),
        }),
      })

      const data = await res.json()
      const reply =
        data.content?.map(b => b.text ?? '').join('') ||
        'Sorry, I could not process that. Please try again.'

      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Connection issue — please check your internet and try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }, [messages, loading])

  const reset = useCallback(() => setMessages([]), [])

  return { messages, loading, send, reset }
}
