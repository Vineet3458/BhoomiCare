import { useLang }      from '../../context/LangContext.jsx'
import { useSchemes }   from '../../hooks/useSchemes.js'
import { SCHEMES }      from '../../data/schemes.js'
import SchemeCard       from './SchemeCard.jsx'
import FilterBar        from './FilterBar.jsx'
import { CheckCircle2 } from 'lucide-react'

function SumStat({ value, label, color }) {
  return (
    <div className="bg-white rounded-2xl border border-earth-100 p-3 text-center shadow-sm">
      <div className={`font-display font-bold text-2xl ${color}`}>{value}</div>
      <div className="text-[11px] text-earth-400 mt-0.5">{label}</div>
    </div>
  )
}

export default function GovtSchemes() {
  const { t } = useLang()
  const sc    = t.schemes

  const {
    schemes, category, setCategory,
    eligOnly, toggleEligOnly,
    expanded, toggleExpand,
  } = useSchemes()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-earth-900">
            {sc.title}
          </h1>
          <p className="text-earth-500 text-sm mt-1">{sc.subtitle}</p>
        </div>
        <button
          onClick={toggleEligOnly}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold transition-all
            ${eligOnly
              ? 'bg-moss-600 text-white border-moss-600'
              : 'border-earth-200 text-earth-700 hover:bg-earth-50'}`}
        >
          <CheckCircle2 size={14} />
          {sc.eligLabel}
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <SumStat
          value={SCHEMES.length}
          label="Total Schemes"
          color="text-earth-800"
        />
        <SumStat
          value={SCHEMES.filter(s => s.eligible).length}
          label={sc.eligStat}
          color="text-moss-700"
        />
        <SumStat
          value="₹12k+"
          label="Est. Annual Benefit"
          color="text-sky-600"
        />
      </div>

      {/* Filter bar */}
      <div className="mb-6">
        <FilterBar
          active={category}
          onSelect={setCategory}
          allLabel={sc.all}
        />
      </div>

      {/* Scheme grid */}
      {schemes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {schemes.map(s => (
            <SchemeCard
              key={s.id}
              scheme={s}
              expanded={!!expanded[s.id]}
              onToggle={() => toggleExpand(s.id)}
              t={t}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-earth-400">
          <div className="text-5xl mb-3">🌾</div>
          <p className="font-bold">No schemes match this filter.</p>
        </div>
      )}
    </div>
  )
}
