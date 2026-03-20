import { useState, useRef, useEffect } from 'react'
import { useLang }        from '../../context/LangContext.jsx'
import { useCommunity }   from '../../hooks/useCommunity.js'
import { REGIONS }        from '../../data/i18n.js'
import { Send, Bot, MapPin, Users, ChevronDown } from 'lucide-react'
import Card from '../ui/Card.jsx'

// ── Message bubble ─────────────────────────────────────────
function MsgBubble({ msg, isOwn, aiReply, aiLoading, onAskAI, t }) {
  const cm = t.community
  const [showAI, setShowAI] = useState(false)

  function formatAI(text) {
    return text.split('\n').map((line, i) => {
      if (!line.trim()) return <div key={i} className="h-1" />
      const parts = line.split(/\*\*(.*?)\*\*/g)
      return <p key={i} className="mb-0.5 leading-relaxed">{parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}</p>
    })
  }

  if (msg.isAI) {
    return (
      <div className="flex justify-center mb-4">
        <div className="bg-earth-50 border border-earth-200 rounded-2xl px-5 py-3 max-w-lg text-center animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-6 h-6 bg-earth-500 rounded-full flex items-center justify-center">
              <Bot size={12} className="text-white" />
            </div>
            <span className="text-xs font-bold text-earth-700">MittiAI</span>
          </div>
          <p className="text-xs text-earth-600 leading-relaxed">{msg.text}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex items-end gap-2 mb-4 animate-slide-up ${isOwn ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-earth-100 flex items-center justify-center text-base flex-shrink-0 shadow-sm">
        {msg.avatar}
      </div>

      <div className={`max-w-[75%] flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
        {/* Author row */}
        {!isOwn && (
          <div className="flex items-center gap-1.5 mb-1 ml-1">
            <span className="text-[11px] font-bold text-earth-700">{msg.author}</span>
            <span className="text-[10px] text-earth-400">{msg.time}</span>
          </div>
        )}

        {/* Bubble */}
        <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
          isOwn
            ? 'bg-earth-500 text-white rounded-br-sm'
            : 'bg-white border border-earth-100 text-earth-800 rounded-bl-sm'
        }`}>
          {msg.text}
        </div>

        {/* AI answer section */}
        {!isOwn && (
          <div className="mt-1.5 ml-1">
            {!aiReply && !aiLoading && (
              <button
                onClick={() => { setShowAI(true); onAskAI(msg.id, msg.text) }}
                className="flex items-center gap-1 text-[10px] font-bold text-earth-400 hover:text-earth-600 transition-colors"
              >
                <Bot size={11} /> {cm.aiReplyBtn}
              </button>
            )}
            {aiLoading && (
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-4 h-4 bg-earth-100 rounded-full flex items-center justify-center">
                  <Bot size={9} className="text-earth-500" />
                </div>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-earth-400 rounded-full dot1" />
                  <div className="w-1.5 h-1.5 bg-earth-400 rounded-full dot2" />
                  <div className="w-1.5 h-1.5 bg-earth-400 rounded-full dot3" />
                </div>
                <span className="text-[10px] text-earth-400">{cm.aiReplying}</span>
              </div>
            )}
            {aiReply && (
              <div className="mt-2 bg-earth-50 border border-earth-100 rounded-xl p-2.5 max-w-xs animate-fade-in">
                <div className="flex items-center gap-1 mb-1.5">
                  <div className="w-4 h-4 bg-earth-500 rounded-full flex items-center justify-center"><Bot size={9} className="text-white" /></div>
                  <span className="text-[10px] font-bold text-earth-700">MittiAI</span>
                </div>
                <div className="text-[11px] text-earth-700 leading-relaxed">{formatAI(aiReply)}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Region selector ────────────────────────────────────────
function RegionSelector({ selected, onSelect, t }) {
  const cm = t.community
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-earth-200 rounded-xl text-sm font-bold text-earth-700 hover:border-earth-400 transition-all"
      >
        <MapPin size={14} className="text-earth-500" />
        {selected ?? cm.selectRegion}
        <ChevronDown size={13} className="text-earth-400" />
      </button>
      {open && (
        <div className="absolute top-full mt-1 left-0 bg-white border border-earth-200 rounded-2xl shadow-xl z-30 overflow-hidden w-72 animate-fade-in">
          <div className="max-h-72 overflow-y-auto p-2">
            {REGIONS.map(r => (
              <button
                key={r}
                onClick={() => { onSelect(r); setOpen(false) }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selected === r ? 'bg-earth-500 text-white font-bold' : 'text-earth-700 hover:bg-earth-50'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────
export default function CommunityPage() {
  const { t, lang } = useLang()
  const cm          = t.community
  const {
    selectedRegion, setSelectedRegion,
    messagesForRegion, postMessage,
    askAI, aiReplies, aiLoading,
  } = useCommunity()

  const [input, setInput]   = useState('')
  const [myName, setMyName] = useState('')
  const [showNamePrompt, setShowNamePrompt] = useState(false)
  const endRef              = useRef(null)
  const messages            = messagesForRegion(selectedRegion)

  // Scroll to bottom on new message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, aiReplies])

  function handleSend() {
    if (!input.trim() || !selectedRegion) return
    const name = myName.trim() || cm.youLabel
    postMessage({ region: selectedRegion, author: name, avatar: '🧑‍🌾', lang, text: input.trim() })
    setInput('')
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const onlineCount = selectedRegion ? (12 + selectedRegion.length % 30) : 0

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-earth-900">{cm.title}</h1>
          <p className="text-earth-500 text-sm mt-1">{cm.subtitle}</p>
        </div>
        {/* Region picker + online count */}
        <div className="flex items-center gap-3 flex-wrap">
          {selectedRegion && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-moss-700 bg-moss-100 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-moss-500 rounded-full animate-pulse" />
              {onlineCount} {cm.membersOnline}
            </div>
          )}
          <RegionSelector selected={selectedRegion} onSelect={setSelectedRegion} t={t} />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { v:'28', l:'States covered',      c:'text-earth-800' },
          { v:'10', l:'Languages supported', c:'text-moss-700'  },
          { v:'2k+',l:'Farmers chatting',    c:'text-sky-600'   },
        ].map(s => (
          <div key={s.l} className="bg-white rounded-2xl border border-earth-100 p-3 text-center shadow-sm">
            <div className={`font-display font-bold text-xl ${s.c}`}>{s.v}</div>
            <div className="text-[11px] text-earth-400 mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Chat window */}
      <Card className="overflow-hidden flex flex-col" style={{ minHeight: 460 }}>
        {/* Room header */}
        <div className="px-4 py-3 border-b border-earth-100 bg-earth-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={14} className="text-earth-500" />
            <span className="text-sm font-bold text-earth-800">
              {selectedRegion ? `${selectedRegion} — ${cm.roomTitle}` : cm.roomTitle}
            </span>
          </div>
          {!selectedRegion && (
            <span className="text-[11px] text-earth-400 italic">{cm.selectRegion}</span>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: 420 }}>
          {messages.map((msg, i) => (
            <MsgBubble
              key={msg.id ?? i}
              msg={msg}
              isOwn={msg.author === (myName.trim() || cm.youLabel) && !msg.isSeed}
              aiReply={aiReplies[msg.id]}
              aiLoading={!!aiLoading[msg.id]}
              onAskAI={askAI}
              t={t}
            />
          ))}
          <div ref={endRef} />
        </div>

        {/* Name input (first time) */}
        {!myName && selectedRegion && (
          <div className="px-4 pb-2 pt-2 border-t border-earth-100 bg-earth-50/50 flex items-center gap-2">
            <span className="text-[11px] text-earth-500 flex-shrink-0">Your name:</span>
            <input
              className="flex-1 border border-earth-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-earth-400"
              placeholder="Ramesh Kumar (optional)"
              onKeyDown={e => { if (e.key === 'Enter') setMyName(e.target.value || cm.youLabel) }}
              onBlur={e => { if (e.target.value) setMyName(e.target.value) }}
            />
          </div>
        )}

        {/* Input bar */}
        <div className="p-3 border-t border-earth-100 flex gap-2 items-end bg-earth-50/30">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={selectedRegion ? cm.chatPlaceholder : cm.selectRegion}
            disabled={!selectedRegion}
            rows={1}
            className="flex-1 resize-none bg-white border border-earth-200 rounded-2xl px-4 py-2.5 text-sm text-earth-800 placeholder-earth-300 focus:outline-none focus:border-earth-400 focus:ring-2 focus:ring-earth-200 transition-all disabled:opacity-50"
            style={{ maxHeight: 100 }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || !selectedRegion}
            className="w-10 h-10 bg-earth-500 hover:bg-earth-600 disabled:bg-earth-200 text-white rounded-2xl flex items-center justify-center transition-all active:scale-95 shadow-sm flex-shrink-0"
          >
            <Send size={14} />
          </button>
        </div>
      </Card>

      <p className="text-[11px] text-earth-300 text-center mt-4">
        MittiAI Community · 10 Indian languages supported · Messages are local to your session
      </p>
    </div>
  )
}
