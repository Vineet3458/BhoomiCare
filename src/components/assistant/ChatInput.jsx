// Chat input bar with voice input, send and reset buttons.
// Enter sends, Shift+Enter inserts newline.
// Uses Web Speech API for regional language voice recognition.

import { useRef, useState, useCallback } from 'react'
import { Send, RotateCcw, Mic, MicOff, Volume2 } from 'lucide-react'

// Language code map for Web Speech API
const LANG_CODES = {
  en: 'en-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  bn: 'bn-IN',
  mr: 'mr-IN',
  pa: 'pa-IN',
  gu: 'gu-IN',
  kn: 'kn-IN',
  od: 'or-IN',
}

export default function ChatInput({ onSend, onReset, loading, placeholder, lang = 'en' }) {
  const ref           = useRef(null)
  const recognRef     = useRef(null)
  const [listening, setListening]   = useState(false)
  const [micError,  setMicError]    = useState(null)
  const [voiceLabel, setVoiceLabel] = useState(null)
  const [isSpeaking, setIsSpeaking] = useState(false)

  /* ── Voice recognition ─────────────────────────────────── */
  const startListening = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setMicError('Voice not supported in this browser. Try Chrome or Edge.')
      return
    }

    setMicError(null)
    const r = new SpeechRecognition()
    r.lang        = LANG_CODES[lang] ?? 'hi-IN'
    r.interimResults = true
    r.maxAlternatives = 1
    recognRef.current = r

    r.onstart = () => setListening(true)
    r.onend   = () => { setListening(false); setVoiceLabel(null) }
    r.onerror = (e) => {
      setListening(false)
      if (e.error !== 'aborted') setMicError(`Mic error: ${e.error}`)
    }

    r.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(r => r[0].transcript)
        .join('')
      setVoiceLabel(transcript)
      if (ref.current) ref.current.value = transcript
      if (event.results[0].isFinal) {
        setListening(false)
        setVoiceLabel(null)
      }
    }

    try { r.start() } catch { setMicError('Could not start microphone.') }
  }, [lang])

  const stopListening = useCallback(() => {
    recognRef.current?.stop()
    setListening(false)
  }, [])

  const toggleVoice = () => listening ? stopListening() : startListening()

  /* ── Text-to-speech for last  AI reply ─────────────────── */
  const lastAIReplyRef = useRef(null)
  const speakLastReply = useCallback(() => {
    const utterance = lastAIReplyRef.current
    if (!utterance || isSpeaking) { window.speechSynthesis?.cancel(); setIsSpeaking(false); return }
    const u = new SpeechSynthesisUtterance(utterance)
    u.lang = LANG_CODES[lang] ?? 'hi-IN'
    u.rate = 0.92
    u.onend = () => setIsSpeaking(false)
    u.onerror = () => setIsSpeaking(false)
    setIsSpeaking(true)
    window.speechSynthesis?.speak(u)
  }, [lang, isSpeaking])

  /* ── Send ───────────────────────────────────────────────── */
  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() }
  }

  function submit() {
    const val = ref.current?.value.trim()
    if (!val || loading) return
    ref.current.value = ''
    setVoiceLabel(null)
    onSend(val)
  }

  const voiceSupported = !!(window.SpeechRecognition || window.webkitSpeechRecognition)

  return (
    <div className="border-t border-earth-100 bg-earth-50/40">
      {/* Voice label / error strip */}
      {(voiceLabel || micError) && (
        <div className={`px-4 py-1.5 text-[11px] font-semibold flex items-center gap-2
          ${micError ? 'bg-clay-50 text-clay-600' : 'bg-moss-50 text-moss-700 border-b border-moss-100'}`}>
          {micError
            ? <span>⚠ {micError}</span>
            : <><span className="w-1.5 h-1.5 bg-moss-500 rounded-full animate-pulse" /> {voiceLabel}</>
          }
        </div>
      )}

      {/* Input row */}
      <div className="p-4 flex gap-2 items-end">
        {/* Mic button */}
        {voiceSupported && (
          <button
            onClick={toggleVoice}
            title={listening ? 'Stop recording' : `Voice input (${LANG_CODES[lang] ?? 'hi-IN'})`}
            className={`w-10 h-10 border rounded-2xl flex items-center justify-center flex-shrink-0 transition-all
              ${listening
                ? 'bg-red-100 border-red-300 text-red-600 animate-pulse'
                : 'border-earth-200 text-earth-500 hover:bg-earth-100'}`}
          >
            {listening ? <MicOff size={14} /> : <Mic size={14} />}
          </button>
        )}

        {/* Textarea */}
        <textarea
          ref={ref}
          rows={1}
          placeholder={listening ? '🎙 Listening…' : placeholder}
          onKeyDown={handleKey}
          disabled={loading}
          className="flex-1 resize-none bg-white border border-earth-200 rounded-2xl px-4 py-2.5
            text-sm text-earth-800 placeholder-earth-300 font-body
            focus:outline-none focus:border-earth-400 focus:ring-2 focus:ring-earth-200
            transition-all disabled:opacity-50"
          style={{ maxHeight: 120, fontFamily: 'var(--font-body)' }}
        />

        {/* Reset button */}
        <button
          onClick={onReset}
          title="Reset chat"
          className="w-10 h-10 border border-earth-200 rounded-2xl flex items-center justify-center
            text-earth-400 hover:bg-earth-100 transition-all flex-shrink-0"
        >
          <RotateCcw size={14} />
        </button>

        {/* Send button */}
        <button
          onClick={submit}
          disabled={loading}
          className="w-10 h-10 bg-earth-500 hover:bg-earth-600 disabled:bg-earth-200
            text-white rounded-2xl flex items-center justify-center
            transition-all active:scale-95 shadow-sm flex-shrink-0"
        >
          <Send size={14} />
        </button>
      </div>

      {/* Voice language indicator */}
      {voiceSupported && (
        <div className="px-4 pb-2 flex items-center gap-2">
          <span className="text-[10px] text-earth-400">
            🎙 Voice: <strong className="text-earth-600">{LANG_CODES[lang] ?? 'hi-IN'}</strong>
          </span>
          <span className="text-earth-200 text-[10px]">·</span>
          <span className="text-[10px] text-earth-400">
            Tap the mic icon to speak in your language
          </span>
        </div>
      )}
    </div>
  )
}

// Export helper so AIAssistant can set last AI reply for TTS
export { LANG_CODES }
