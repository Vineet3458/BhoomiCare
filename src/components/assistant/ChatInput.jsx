// Chat input bar with send + reset buttons.
// Enter sends, Shift+Enter inserts newline.

import { useRef }     from 'react'
import { Send, RotateCcw } from 'lucide-react'

export default function ChatInput({ onSend, onReset, loading, placeholder }) {
  const ref = useRef(null)

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  function submit() {
    const val = ref.current?.value.trim()
    if (!val || loading) return
    ref.current.value = ''
    onSend(val)
  }

  return (
    <div className="p-4 border-t border-earth-100 flex gap-2 items-end bg-earth-50/40">
      <textarea
        ref={ref}
        rows={1}
        placeholder={placeholder}
        onKeyDown={handleKey}
        disabled={loading}
        className="flex-1 resize-none bg-white border border-earth-200 rounded-2xl px-4 py-2.5
          text-sm text-earth-800 placeholder-earth-300 font-body
          focus:outline-none focus:border-earth-400 focus:ring-2 focus:ring-earth-200
          transition-all disabled:opacity-50"
        style={{ maxHeight: 120, fontFamily: 'var(--font-body)' }}
      />

      <button
        onClick={onReset}
        title="Reset chat"
        className="w-10 h-10 border border-earth-200 rounded-2xl flex items-center justify-center
          text-earth-400 hover:bg-earth-100 transition-all flex-shrink-0"
      >
        <RotateCcw size={14} />
      </button>

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
  )
}
