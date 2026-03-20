import { useEffect, useRef } from 'react'
import { Sprout }            from 'lucide-react'
import { useLang }           from '../../context/LangContext.jsx'
import { useChat }           from '../../hooks/useChat.js'
import ChatBubble, { TypingBubble } from './ChatBubble.jsx'
import ChatInput             from './ChatInput.jsx'

// Context pills shown above the chat window — remind the user what soil data
// the AI has access to, and give quick visual status of key nutrients.
function ContextPills({ pills }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {Object.entries(pills).map(([key, label]) => {
        const isWarn    = label.startsWith('⬇')
        const isNeutral = label.startsWith('🌱')
        const cls = isNeutral
          ? 'bg-earth-50 border-earth-200 text-earth-600'
          : isWarn
          ? 'bg-clay-50 border-clay-200 text-clay-700'
          : 'bg-moss-50 border-moss-200 text-moss-700'
        return (
          <span
            key={key}
            className={`text-[11px] px-2.5 py-1 rounded-full border font-bold ${cls}`}
          >
            {label}
          </span>
        )
      })}
    </div>
  )
}

// Quick-suggestion chips shown only on an empty conversation.
function SuggestionChips({ chips, onSelect }) {
  return (
    <div className="px-4 pb-3 pt-3 border-t border-earth-50 flex flex-wrap gap-2">
      {chips.map((chip, i) => (
        <button
          key={i}
          onClick={() => onSelect(chip)}
          className="text-[11px] bg-earth-50 hover:bg-earth-100 border border-earth-200
            text-earth-700 px-3 py-1.5 rounded-full font-semibold transition-colors"
        >
          {chip}
        </button>
      ))}
    </div>
  )
}

export default function AIAssistant() {
  const { t, lang }               = useLang()
  const { messages, loading, send, reset } = useChat()
  const ai                        = t.assistant
  const endRef                    = useRef(null)

  // Scroll to latest message whenever messages or loading state changes
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Show greeting bubble for empty conversations
  const greeting = { role: 'assistant', content: ai.greeting }
  const displayMessages = messages.length === 0 ? [greeting] : messages
  const showChips       = messages.length === 0

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">

      {/* Page header */}
      <div className="mb-4">
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-earth-900">
          {ai.title}
        </h1>
        <p className="text-earth-500 text-sm mt-1">{ai.subtitle}</p>
      </div>

      {/* Soil context pills */}
      <ContextPills pills={ai.contextPills} />

      {/* Chat window */}
      <div
        className="bg-white rounded-2xl border border-earth-100 shadow-sm flex flex-col overflow-hidden"
        style={{ minHeight: 420, maxHeight: '58vh' }}
      >
        {/* Message list */}
        <div className="flex-1 overflow-y-auto p-5">
          {displayMessages.map((msg, i) => (
            <ChatBubble key={`${lang}-${i}`} message={msg} />
          ))}
          {loading && <TypingBubble />}
          <div ref={endRef} />
        </div>

        {/* Suggestion chips — only visible on fresh conversation */}
        {showChips && (
          <SuggestionChips
            chips={ai.chips}
            onSelect={text => send(text)}
          />
        )}

        {/* Input bar */}
        <ChatInput
          onSend={send}
          onReset={reset}
          loading={loading}
          placeholder={ai.placeholder}
        />
      </div>

      {/* Powered-by footnote */}
      <p className="text-[11px] text-earth-300 text-center mt-3 flex items-center justify-center gap-1">
        <Sprout size={11} className="text-earth-300" />
        {ai.poweredBy}
      </p>
    </div>
  )
}
