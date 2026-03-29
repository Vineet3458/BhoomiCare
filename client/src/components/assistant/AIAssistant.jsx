import { useEffect, useRef, useState, useCallback } from 'react'
import { Sprout, Volume2, VolumeX }  from 'lucide-react'
import { useLang }                   from '../../context/LangContext.jsx'
import { useChat }                   from '../../hooks/useChat.js'
import ChatBubble, { TypingBubble }  from './ChatBubble.jsx'
import ChatInput, { LANG_CODES }     from './ChatInput.jsx'

// Context pills shown above the chat window
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
          <span key={key} className={`text-[11px] px-2.5 py-1 rounded-full border font-bold ${cls}`}>
            {label}
          </span>
        )
      })}
    </div>
  )
}

// Quick-suggestion chips
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
  const { t, lang }                = useLang()
  const { messages, loading, send, reset } = useChat()
  const ai                         = t.assistant
  const endRef                     = useRef(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speakingIdx, setSpeakingIdx] = useState(null)

  // Scroll to latest message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const greeting = { role: 'assistant', content: ai.greeting }
  const displayMessages = messages.length === 0 ? [greeting] : messages
  const showChips       = messages.length === 0

  // Text-to-speech for any AI message
  const speakMessage = useCallback((text, idx) => {
    if (isSpeaking && speakingIdx === idx) {
      window.speechSynthesis?.cancel()
      setIsSpeaking(false)
      setSpeakingIdx(null)
      return
    }
    window.speechSynthesis?.cancel()
    const u = new SpeechSynthesisUtterance(text.replace(/\*\*/g, '').replace(/•/g, ','))
    u.lang = LANG_CODES[lang] ?? 'hi-IN'
    u.rate = 0.9
    u.pitch = 1
    u.onend = () => { setIsSpeaking(false); setSpeakingIdx(null) }
    u.onerror = () => { setIsSpeaking(false); setSpeakingIdx(null) }
    setIsSpeaking(true)
    setSpeakingIdx(idx)
    window.speechSynthesis?.speak(u)
  }, [lang, isSpeaking, speakingIdx])

  const ttsSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">

      {/* Page header */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-earth-500 rounded-2xl flex items-center justify-center shadow">
            <Sprout size={18} className="text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-earth-900">{ai.title}</h1>
            <p className="text-earth-500 text-sm">{ai.subtitle}</p>
          </div>
        </div>

        {/* Gemini badge */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl px-3 py-2 w-fit mt-2">
          <span className="text-lg">✨</span>
          <span className="text-[11px] font-bold text-blue-700">Powered by Google Gemini AI</span>
          <span className="text-blue-300">·</span>
          <span className="text-[10px] text-blue-500">Farmer Support · 10 Languages · Voice Enabled</span>
        </div>
      </div>

      {/* Soil context pills */}
      <ContextPills pills={ai.contextPills} />

      {/* Chat window */}
      <div
        className="bg-white rounded-2xl border border-earth-100 shadow-sm flex flex-col overflow-hidden"
        style={{ minHeight: 420, maxHeight: '60vh' }}
      >
        {/* Message list */}
        <div className="flex-1 overflow-y-auto p-5">
          {displayMessages.map((msg, i) => (
            <div key={`${lang}-${i}`} className="group relative">
              <ChatBubble message={msg} />
              {/* TTS button for AI messages */}
              {ttsSupported && msg.role === 'assistant' && (
                <button
                  onClick={() => speakMessage(msg.content, i)}
                  title={speakingIdx === i ? 'Stop speaking' : 'Read aloud'}
                  className={`absolute top-0 right-0 w-6 h-6 rounded-full flex items-center justify-center
                    opacity-0 group-hover:opacity-100 transition-opacity
                    ${speakingIdx === i
                      ? 'bg-earth-500 text-white'
                      : 'bg-earth-100 text-earth-500 hover:bg-earth-200'}`}
                >
                  {speakingIdx === i
                    ? <VolumeX size={10} />
                    : <Volume2 size={10} />}
                </button>
              )}
            </div>
          ))}
          {loading && <TypingBubble />}
          <div ref={endRef} />
        </div>

        {/* Suggestion chips */}
        {showChips && (
          <SuggestionChips
            chips={ai.chips}
            onSelect={text => send(text)}
          />
        )}

        {/* Input bar with voice */}
        <ChatInput
          onSend={send}
          onReset={reset}
          loading={loading}
          placeholder={ai.placeholder}
          lang={lang}
        />
      </div>

      {/* Footer note */}
      <p className="text-[11px] text-earth-300 text-center mt-3 flex items-center justify-center gap-1">
        <Sprout size={11} className="text-earth-300" />
        {ai.poweredBy} · Rabi 2025–26 · Advisory only — consult your local KVK for critical decisions
      </p>
    </div>
  )
}
