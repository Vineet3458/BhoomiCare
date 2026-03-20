// Individual government scheme card with expandable details.
import { ExternalLink, Clock, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react'
import Card   from '../ui/Card.jsx'
import Button from '../ui/Button.jsx'

const COLOR_MAP = {
  moss:  { accent: '#3a8f25', badge: 'bg-moss-100 text-moss-800',  btn: 'moss' },
  earth: { accent: '#c47318', badge: 'bg-earth-100 text-earth-800', btn: 'primary' },
  clay:  { accent: '#c84e32', badge: 'bg-clay-100 text-clay-800',   btn: 'clay' },
  sky:   { accent: '#0284c7', badge: 'bg-blue-100 text-blue-800',   btn: 'sky' },
}

export default function SchemeCard({ scheme, expanded, onToggle, t }) {
  const c = COLOR_MAP[scheme.color] ?? COLOR_MAP.earth
  const sc = t.schemes

  return (
    <Card accent={c.accent} className="flex flex-col">
      <div className="p-5 flex-1 flex flex-col">

        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-1">
            <div className="flex items-center flex-wrap gap-1.5 mb-0.5">
              <h3 className="font-display font-bold text-earth-900">{scheme.name}</h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.badge}`}>
                {scheme.badge}
              </span>
            </div>
            <p className="text-xs text-earth-500">{scheme.fullName}</p>
            <p className="text-[11px] text-earth-400">{scheme.ministry}</p>
          </div>
          {scheme.eligible && (
            <div className="w-8 h-8 bg-moss-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={16} className="text-moss-600" />
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-[11px] bg-earth-50 border border-earth-100 text-earth-600 px-2 py-1 rounded-lg">
            {scheme.category}
          </span>
          <span className="text-[11px] font-bold text-earth-700 flex items-center gap-1">
            💰 {scheme.benefit}
          </span>
        </div>

        {/* Deadline */}
        <div className="flex items-center gap-1.5 text-[11px] text-earth-400 mb-4">
          <Clock size={11} />
          {sc.deadline}: {scheme.deadline}
        </div>

        {/* Expandable detail */}
        {expanded && (
          <div className="mb-4 animate-fade-in space-y-3">
            <p className="text-sm text-earth-600 leading-relaxed">{scheme.description}</p>
            <div>
              <p className="text-[11px] font-bold text-earth-600 uppercase tracking-wider mb-1.5">
                {sc.docsLabel}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {scheme.documents.map(doc => (
                  <span
                    key={doc}
                    className="text-[11px] bg-earth-50 border border-earth-100 text-earth-600 px-2 py-1 rounded-lg"
                  >
                    📄 {doc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Button
            as="a"
            variant={c.btn}
            href={scheme.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-xs"
          >
            <ExternalLink size={12} />
            {scheme.eligible ? sc.applyBtn : sc.checkBtn}
          </Button>
          <button
            onClick={onToggle}
            className="px-3 py-2 border border-earth-200 rounded-xl text-earth-600 hover:bg-earth-50 transition-all text-[11px] font-bold flex items-center gap-1"
          >
            {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            {sc.moreBtn}
          </button>
        </div>
      </div>
    </Card>
  )
}
