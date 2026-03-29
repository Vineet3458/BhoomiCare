// Renders a single AI or user chat message.
// Parses **bold** markdown and bullet points from Claude's responses.

import { Bot, User } from 'lucide-react'

function parseContent(text) {
  return text.split('\n').map((line, i) => {
    if (!line.trim()) return <div key={i} className="h-1.5" />

    // Replace **bold** spans
    const parts = line.split(/\*\*(.*?)\*\*/g)
    const formatted = parts.map((p, j) =>
      j % 2 === 1 ? <strong key={j}>{p}</strong> : p
    )

    const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-')
    return (
      <p key={i} className={`leading-relaxed mb-0.5 ${isBullet ? 'ml-2' : ''}`}>
        {formatted}
      </p>
    )
  })
}

export default function ChatBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex items-end gap-2 mb-4 animate-slide-up ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow
          ${isUser ? 'bg-earth-200' : 'bg-earth-500'}`}
      >
        {isUser
          ? <User size={14} className="text-earth-700" />
          : <Bot  size={14} className="text-white"     />}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[78%] px-4 py-3 rounded-2xl shadow-sm text-sm
          ${isUser
            ? 'bg-earth-500 text-white rounded-br-sm'
            : 'bg-white border border-earth-100 text-earth-800 rounded-bl-sm'}`}
      >
        {parseContent(message.content)}
      </div>
    </div>
  )
}

// Animated typing indicator shown while Claude is responding
export function TypingBubble() {
  return (
    <div className="flex items-end gap-2 mb-4">
      <div className="w-8 h-8 rounded-full bg-earth-500 flex items-center justify-center flex-shrink-0 shadow">
        <Bot size={14} className="text-white" />
      </div>
      <div className="bg-white border border-earth-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex gap-1.5 items-center h-4">
          <div className="w-2 h-2 bg-earth-300 rounded-full dot1" />
          <div className="w-2 h-2 bg-earth-300 rounded-full dot2" />
          <div className="w-2 h-2 bg-earth-300 rounded-full dot3" />
        </div>
      </div>
    </div>
  )
}
