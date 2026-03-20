import { useState }   from 'react'
import { Upload, MapPin, CalendarDays } from 'lucide-react'
import { useLang }      from '../../context/LangContext.jsx'
import { useSoilData }  from '../../hooks/useSoilData.js'
import ScoreRing        from './ScoreRing.jsx'
import RadarChart       from './RadarChart.jsx'
import ActionPlan       from './ActionPlan.jsx'
import Card             from '../ui/Card.jsx'
import Button           from '../ui/Button.jsx'
import Badge            from '../ui/Badge.jsx'
import { UploadModal, FarmerQueriesSection } from './DashboardExtras.jsx'

function StatChip({ label, value }) {
  return (
    <div className="bg-earth-50 rounded-xl px-3 py-2 text-center">
      <div className="font-display font-bold text-earth-800 text-lg leading-none">{value}</div>
      <div className="text-[10px] text-earth-400 font-semibold mt-0.5 uppercase tracking-wide">{label}</div>
    </div>
  )
}

function MacroMiniCard({ n, t }) {
  const pct = Math.min((n.val / n.max) * 100, 100)
  return (
    <div className="bg-white rounded-2xl border border-earth-100 p-3.5 shadow-sm lift">
      <div className="flex items-center justify-between mb-2">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold font-display"
          style={{ background: n.color }}
        >
          {n.sym}
        </div>
        <Badge variant={n.status === 'optimal' ? 'optimal' : 'deficient'}>
          {n.status === 'optimal' ? '✓' : '↓'}
        </Badge>
      </div>
      <div className="font-display font-bold text-xl text-earth-900 leading-none">{n.val}</div>
      <div className="text-[10px] text-earth-400 mt-0.5">{n.unit}</div>
      <div className="mt-2 h-1.5 bg-earth-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bar-grow"
          style={{ '--w': `${pct}%`, background: n.color }}
        />
      </div>
    </div>
  )
}

export default function Dashboard({ setTab }) {
  const { t }             = useLang()
  const { data, loading } = useSoilData()
  const [showUpload, setShowUpload] = useState(false)
  const [uploadedData, setUploadedData] = useState(null)

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-64 text-earth-400 font-semibold">
        Loading soil data…
      </div>
    )
  }

  const db = t.dashboard

  function handleUploadDone(parsedData) {
    setUploadedData(parsedData)
    setShowUpload(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">

      {/* Upload Modal */}
      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onUpload={handleUploadDone}
        />
      )}

      {/* Upload success notice */}
      {uploadedData && (
        <div className="mb-4 bg-moss-50 border border-moss-200 text-moss-800 rounded-2xl px-5 py-3 flex items-center gap-3 animate-slide-up">
          <span className="text-xl">✅</span>
          <div>
            <p className="font-bold text-sm">Soil report uploaded successfully!</p>
            <p className="text-xs text-moss-600">Dashboard updated · Visit AI Chat for personalized recommendations</p>
          </div>
          <button onClick={() => setUploadedData(null)} className="ml-auto text-moss-400 hover:text-moss-600 text-lg">×</button>
        </div>
      )}

      {/* Hero */}
      <div className="hero-pattern bg-earth-800 rounded-3xl p-6 mb-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-earth-300 text-sm font-semibold mb-1">🌾 {t.hero.greeting}</p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
              {db.scoreLabel}
            </h1>
            <p className="text-earth-400 text-xs mt-1.5 flex items-center gap-1.5">
              <MapPin size={11} /> {t.hero.location}
            </p>
            <p className="text-earth-500 text-[10px] mt-1 flex items-center gap-1.5">
              <CalendarDays size={10} /> Rabi 2025–26 · Test date: 10 Nov 2025
            </p>
          </div>
          <Button
            variant="primary"
            className="bg-earth-500 hover:bg-earth-400 self-start sm:self-auto"
            onClick={() => setShowUpload(true)}
          >
            <Upload size={14} /> {t.hero.upload}
          </Button>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">

        {/* LEFT — score + radar */}
        <div className="flex flex-col gap-5">
          <Card className="p-5 text-center">
            <ScoreRing score={data.score} />

            <div className="grid grid-cols-3 gap-2 mt-4">
              <StatChip label={db.phLabel} value={data.pH} />
              <StatChip label={db.ecLabel} value={data.ec} />
              <StatChip label={db.ocLabel} value={`${data.oc}%`} />
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-3 mt-4 flex-wrap">
              {[
                { dot: 'bg-moss-500',  lbl: db.good,  range: '75+' },
                { dot: 'bg-earth-400', lbl: db.avg,   range: '50–74' },
                { dot: 'bg-clay-500',  lbl: db.poor,  range: '<50' },
              ].map(l => (
                <div key={l.lbl} className="flex items-center gap-1 text-[11px] text-earth-500">
                  <span className={`w-2 h-2 rounded-full ${l.dot}`} />
                  {l.lbl} <span className="text-earth-300">{l.range}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <p className="text-[11px] font-bold text-earth-500 uppercase tracking-wider mb-2">
              Nutrient Radar
            </p>
            <RadarChart data={data.radar} />
          </Card>
        </div>

        {/* RIGHT — macro cards + action plan + CTAs */}
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {data.macro.map(n => (
              <MacroMiniCard key={n.sym} n={n} t={t} />
            ))}
          </div>

          <ActionPlan title={db.actionPlanTitle} items={db.actionItems} />

          {/* CTA row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => setTab('nutrients')}
              className="bg-moss-600 hover:bg-moss-700 text-white rounded-2xl py-3 px-4 text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
            >
              🧪 {t.nav.nutrients} →
            </button>
            <button
              onClick={() => setTab('schemes')}
              className="bg-sky-600 hover:bg-sky-700 text-white rounded-2xl py-3 px-4 text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
            >
              📋 {t.nav.schemes} →
            </button>
            <button
              onClick={() => setTab('market')}
              className="bg-earth-600 hover:bg-earth-700 text-white rounded-2xl py-3 px-4 text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
            >
              🛒 Marketplace →
            </button>
            <button
              onClick={() => setTab('ai')}
              className="bg-amber-600 hover:bg-amber-700 text-white rounded-2xl py-3 px-4 text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
            >
              🤖 {t.nav.ai} →
            </button>
          </div>
        </div>
      </div>

      {/* ── Farmer Queries FAQ Section (footer of dashboard) ── */}
      <FarmerQueriesSection />

    </div>
  )
}
