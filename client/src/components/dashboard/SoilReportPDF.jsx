import { useRef, useCallback } from 'react'
import { X, Download, Leaf, FlaskConical, ShoppingBag, Sprout, FileCheck } from 'lucide-react'

// ── Crop suitability logic (matches CropRecommendations) ─────────────────────
const CROP_DB = [
  { name: 'Wheat',     icon: '🌾', reqPh: [6.0, 7.5], nReq: 'High',   pReq: 'Medium', kReq: 'Medium', desc: 'Needs adequate Nitrogen for tillering.' },
  { name: 'Rice',      icon: '🍚', reqPh: [5.5, 6.5], nReq: 'High',   pReq: 'Medium', kReq: 'Medium', desc: 'Thrives in slightly acidic soil.' },
  { name: 'Cotton',    icon: '🧶', reqPh: [5.8, 8.0], nReq: 'High',   pReq: 'Medium', kReq: 'High',   desc: 'Requires good Potassium for boll development.' },
  { name: 'Sugarcane', icon: '🎋', reqPh: [6.5, 7.5], nReq: 'High',   pReq: 'High',   kReq: 'High',   desc: 'Heavy nutrient feeder.' },
  { name: 'Chickpea',  icon: '🧆', reqPh: [6.0, 7.0], nReq: 'Low',    pReq: 'High',   kReq: 'Low',    desc: 'Legume — requires less Nitrogen.' },
  { name: 'Soybean',   icon: '🫘', reqPh: [6.0, 6.8], nReq: 'Low',    pReq: 'Medium', kReq: 'Medium', desc: 'Good for moderate soils.' },
  { name: 'Potato',    icon: '🥔', reqPh: [5.0, 6.5], nReq: 'High',   pReq: 'High',   kReq: 'High',   desc: 'Requires well-drained, fertile soil.' },
]

function getSuitableCrops(data) {
  const ph = data.pH || 6.5
  const n  = data.macro.find(m => m.sym === 'N')?.val || 0
  const p  = data.macro.find(m => m.sym === 'P')?.val || 0
  const k  = data.macro.find(m => m.sym === 'K')?.val || 0

  return CROP_DB.map(crop => {
    let score = 100
    if (ph < crop.reqPh[0]) score -= (crop.reqPh[0] - ph) * 20
    if (ph > crop.reqPh[1]) score -= (ph - crop.reqPh[1]) * 20
    if (crop.nReq === 'High'   && n < 40)  score -= 15
    if (crop.pReq === 'High'   && p < 20)  score -= 15
    if (crop.kReq === 'High'   && k < 150) score -= 15
    return { ...crop, matchScore: Math.max(0, Math.round(score)) }
  }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 4)
}

// ── Fertilizer schedule builder ───────────────────────────────────────────────
function buildFertilizerSchedule(data) {
  const deficients = [...data.macro, ...data.micro].filter(n => n.status === 'deficient' || n.status === 'excess')
  const schedule = []

  deficients.forEach(n => {
    if (n.status === 'deficient') {
      if (n.sym === 'N') schedule.push({ stage: 'At Sowing (Basal)', input: `Urea — ${Math.ceil((n.min - n.val) * 1.5)} kg/ha`, note: 'Split: ½ basal + ½ top dress' , color: '#4ade80' })
      if (n.sym === 'P') schedule.push({ stage: 'At Sowing (Basal)', input: `DAP — ${Math.ceil((n.min - n.val) * 2)} kg/ha`, note: 'Apply in furrows below seed' , color: '#60a5fa' })
      if (n.sym === 'K') schedule.push({ stage: 'At Sowing (Basal)', input: `MOP — ${Math.ceil((n.min - n.val) * 1.2)} kg/ha`, note: 'Mix into soil before sowing', color: '#f59e0b' })
      if (n.sym === 'S') schedule.push({ stage: 'Pre-Sowing', input: 'Gypsum — 200 kg/ha', note: 'Incorporate into soil', color: '#a78bfa' })
      if (n.sym === 'Zn') schedule.push({ stage: 'Pre-Sowing', input: 'Zinc Sulphate — 25 kg/ha', note: 'Or ZnSO₄ foliar @0.5%', color: '#f472b6' })
      if (n.sym === 'Fe') schedule.push({ stage: 'Foliar Spray', input: 'FeSO₄ — 0.5% solution', note: 'Spray at vegetative stage', color: '#fb923c' })
      if (n.sym === 'B')  schedule.push({ stage: 'Foliar Spray', input: 'Boron 20% — 1 kg/ha', note: 'At flowering stage', color: '#34d399' })
    } else if (n.status === 'excess') {
      schedule.push({ stage: 'Caution', input: `${n.name} — Excess detected`, note: `Restrict ${n.name} fertilizers this season`, color: '#fbbf24' })
    }
  })

  if (schedule.length === 0) {
    schedule.push({ stage: 'Maintenance', input: 'Balanced NPK (12:32:16) — 100 kg/ha', note: 'Standard maintenance dose', color: '#6ee7b7' })
  }
  return schedule
}

// ── Score color ───────────────────────────────────────────────────────────────
function scoreColor(s) {
  if (s >= 75) return '#22c55e'
  if (s >= 50) return '#f59e0b'
  return '#ef4444'
}
function scoreLabel(s) {
  if (s >= 75) return 'Good'
  if (s >= 50) return 'Average'
  return 'Poor'
}
function statusColor(st) {
  if (st === 'optimal')   return '#22c55e'
  if (st === 'deficient') return '#ef4444'
  return '#f59e0b'
}

// ── Main PDF Modal ────────────────────────────────────────────────────────────
export default function SoilReportPDF({ data, marketRecs, onClose }) {
  const printRef = useRef(null)
  const crops      = getSuitableCrops(data)
  const fertilizers = buildFertilizerSchedule(data)
  const today      = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })

  const handlePrint = useCallback(() => {
    const el = printRef.current
    if (!el) return

    const printWindow = window.open('', '_blank', 'width=900,height=700')
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Bhoomi Care — Soil Report</title>
        <meta charset="UTF-8" />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Inter', sans-serif; background: #fff; color: #3d2b0f; font-size: 13px; }
          .page { max-width: 800px; margin: 0 auto; padding: 32px 36px; }
          
          /* Header */
          .header { background: linear-gradient(135deg, #3d2b0f 0%, #6b3a10 100%); color: white; border-radius: 16px; padding: 24px 28px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-start; }
          .header-title { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
          .header-sub { font-size: 12px; opacity: 0.7; margin-top: 4px; }
          .header-badge { background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; text-align: right; }
          
          /* Score + basics */
          .score-row { display: flex; gap: 12px; margin-bottom: 20px; }
          .score-card { flex: 1; border: 1.5px solid #f2d9b0; border-radius: 14px; padding: 16px; }
          .score-big { font-size: 44px; font-weight: 800; line-height: 1; }
          .score-lbl { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; opacity: 0.6; margin-top: 2px; }
          .basics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; flex: 2; }
          .basic-item { border: 1.5px solid #f2d9b0; border-radius: 12px; padding: 12px; text-align: center; }
          .basic-val { font-size: 24px; font-weight: 800; }
          .basic-lbl { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; opacity: 0.5; margin-top: 2px; }
          
          /* Section title */
          .section-title { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #9e6a2d; border-left: 3px solid #c47318; padding-left: 10px; margin-bottom: 14px; margin-top: 22px; }
          
          /* Nutrients */
          .nutrient-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
          .nutrient-item { display: flex; align-items: center; gap: 10px; border: 1.5px solid #f2d9b0; border-radius: 12px; padding: 10px 14px; }
          .nutrient-dot { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 800; color: white; flex-shrink: 0; }
          .nutrient-name { font-size: 12px; font-weight: 700; }
          .nutrient-val { font-size: 18px; font-weight: 800; }
          .nutrient-status { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 20px; margin-top: 2px; display: inline-block; }
          .bar-bg { height: 5px; background: #f2d9b0; border-radius: 3px; margin-top: 6px; }
          .bar-fill { height: 5px; border-radius: 3px; }
          
          /* Crops */
          .crop-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .crop-card { border: 1.5px solid #f2d9b0; border-radius: 12px; padding: 12px 14px; display: flex; gap: 10px; align-items: flex-start; }
          .crop-icon { font-size: 28px; line-height: 1; }
          .crop-name { font-size: 14px; font-weight: 800; }
          .crop-desc { font-size: 11px; opacity: 0.65; margin-top: 3px; }
          .crop-badge { display: inline-block; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 20px; margin-top: 5px; }
          
          /* Fertilizer */
          .fert-table { width: 100%; border-collapse: collapse; }
          .fert-table th { background: #fdf3e1; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 8px 12px; text-align: left; border-bottom: 2px solid #f2d9b0; }
          .fert-table td { padding: 9px 12px; border-bottom: 1px solid #f9ecd4; font-size: 12px; vertical-align: top; }
          .fert-table tr:last-child td { border-bottom: none; }
          .fert-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; margin-right: 6px; vertical-align: middle; }
          
          /* Market recs */
          .market-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
          .market-card { border: 1.5px solid #f2d9b0; border-radius: 12px; padding: 12px; }
          .market-icon { font-size: 24px; }
          .market-name { font-size: 12px; font-weight: 800; margin-top: 6px; }
          .market-brand { font-size: 10px; opacity: 0.55; }
          .market-price { font-size: 16px; font-weight: 800; color: #3a7d2c; margin-top: 4px; }
          
          /* Footer */
          .footer { margin-top: 28px; border-top: 1px solid #f2d9b0; padding-top: 16px; display: flex; justify-content: space-between; align-items: center; font-size: 10px; opacity: 0.5; }
          .disclaimer { background: #fdf3e1; border: 1px solid #f2d9b0; border-radius: 10px; padding: 10px 14px; font-size: 10px; margin-top: 16px; color: #8a5c25; line-height: 1.6; }
          
          @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
        </style>
      </head>
      <body>
        <div class="page">
          ${el.innerHTML}
        </div>
        <script>setTimeout(() => { window.print(); window.close(); }, 600);<\/script>
      </body>
      </html>
    `)
    printWindow.document.close()
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 animate-fade-in overflow-y-auto">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden animate-slide-up">
        
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-earth-100 bg-earth-800 text-white">
          <div>
            <h2 className="font-display font-bold text-lg flex items-center gap-2">
              <FileCheck size={20} /> Soil Analysis Report — PDF Preview
            </h2>
            <p className="text-earth-300 text-xs mt-0.5">Preview your report before downloading</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-moss-500 hover:bg-moss-400 text-white font-bold px-5 py-2 rounded-xl text-sm transition-all active:scale-95 shadow"
            >
              <Download size={15} /> Download PDF
            </button>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-earth-700 text-earth-300 hover:text-white">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── Printable content ─────────────────────────────────────── */}
        <div ref={printRef} className="p-0">

          {/* Header banner */}
          <div className="header" style={{ background: 'linear-gradient(135deg, #3d2b0f 0%, #6b3a10 100%)', color: 'white', borderRadius: '0', padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="header-title" style={{ fontSize: '22px', fontWeight: 800 }}>🌱 Bhoomi Care — Soil Analysis Report</div>
              <div className="header-sub" style={{ fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
                Field: {data.field} · Test Date: {data.testDate || 'N/A'} · Season: {data.season || 'Rabi 2025–26'}
              </div>
            </div>
            <div className="header-badge" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, textAlign: 'right', color: 'white' }}>
              <div>Generated: {today}</div>
              <div style={{ opacity: 0.7, marginTop: '2px' }}>bhoomicare.app</div>
            </div>
          </div>

          <div style={{ padding: '24px 28px' }}>

            {/* ── Score + pH/EC/OC row ── */}
            <div className="score-row" style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              {/* Score */}
              <div className="score-card" style={{ border: '1.5px solid #f2d9b0', borderRadius: '14px', padding: '16px', minWidth: '140px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#9e6a2d', marginBottom: '8px' }}>Soil Health Score</div>
                <div className="score-big" style={{ fontSize: '52px', fontWeight: 800, color: scoreColor(data.score), lineHeight: 1 }}>{data.score}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: scoreColor(data.score), marginTop: '4px' }}>{scoreLabel(data.score)}</div>
                <div style={{ background: '#f2d9b0', height: '6px', borderRadius: '3px', marginTop: '10px', overflow: 'hidden' }}>
                  <div style={{ width: `${data.score}%`, height: '6px', background: scoreColor(data.score), borderRadius: '3px' }} />
                </div>
              </div>
              {/* Basics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', flex: 1 }}>
                {[
                  { lbl: 'pH Level', val: data.pH, note: data.pH < 6 ? 'Acidic' : data.pH > 7.5 ? 'Alkaline' : 'Neutral' },
                  { lbl: 'EC (dS/m)', val: data.ec, note: data.ec < 2 ? 'Normal' : 'High Salinity' },
                  { lbl: 'Organic Carbon', val: `${data.oc}%`, note: data.oc < 0.5 ? 'Low' : 'Adequate' },
                ].map(item => (
                  <div key={item.lbl} style={{ border: '1.5px solid #f2d9b0', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#9e6a2d', marginBottom: '6px' }}>{item.lbl}</div>
                    <div style={{ fontSize: '26px', fontWeight: 800, color: '#3d2b0f' }}>{item.val}</div>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#9e6a2d', marginTop: '4px', opacity: 0.7 }}>{item.note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Macronutrients ── */}
            <div className="section-title" style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#9e6a2d', borderLeft: '3px solid #c47318', paddingLeft: '10px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Leaf size={13} style={{ display: 'inline' }} /> Macronutrients
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '4px' }}>
              {data.macro.map(n => {
                const pct = Math.min((n.val / (n.max * 1.5)) * 100, 100)
                return (
                  <div key={n.sym} style={{ display: 'flex', alignItems: 'center', gap: '10px', border: '1.5px solid #f2d9b0', borderRadius: '12px', padding: '10px 14px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: n.color || '#6b3a10', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 800, color: 'white', flexShrink: 0 }}>
                      {n.sym}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#3d2b0f' }}>{n.name}</span>
                        <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px', background: statusColor(n.status) + '20', color: statusColor(n.status) }}>
                          {n.status.toUpperCase()}
                        </span>
                      </div>
                      <div style={{ fontSize: '20px', fontWeight: 800, color: '#3d2b0f', lineHeight: 1.2 }}>{n.val} <span style={{ fontSize: '11px', fontWeight: 600, opacity: 0.5 }}>{n.unit}</span></div>
                      <div style={{ height: '5px', background: '#f2d9b0', borderRadius: '3px', marginTop: '5px' }}>
                        <div style={{ width: `${pct}%`, height: '5px', background: n.color || '#6b3a10', borderRadius: '3px' }} />
                      </div>
                      <div style={{ fontSize: '10px', color: '#9e6a2d', marginTop: '3px', opacity: 0.7 }}>Range: {n.min}–{n.max} {n.unit}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ── Micronutrients ── */}
            <div className="section-title" style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#9e6a2d', borderLeft: '3px solid #c47318', paddingLeft: '10px', marginBottom: '12px', marginTop: '18px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FlaskConical size={13} style={{ display: 'inline' }} /> Micronutrients
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '4px' }}>
              {data.micro.map(n => (
                <div key={n.sym} style={{ border: '1.5px solid #f2d9b0', borderRadius: '12px', padding: '10px 12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: n.color || '#9e6a2d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, color: 'white', flexShrink: 0 }}>
                    {n.sym}
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#3d2b0f' }}>{n.name}</div>
                    <div style={{ fontSize: '16px', fontWeight: 800 }}>{n.val} <span style={{ fontSize: '10px', opacity: 0.5 }}>{n.unit}</span></div>
                    <span style={{ fontSize: '9px', fontWeight: 700, padding: '1px 6px', borderRadius: '20px', background: statusColor(n.status) + '22', color: statusColor(n.status) }}>
                      {n.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Fertilizer Schedule ── */}
            <div className="section-title" style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#9e6a2d', borderLeft: '3px solid #c47318', paddingLeft: '10px', marginBottom: '12px', marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShoppingBag size={13} style={{ display: 'inline' }} /> Required Fertilizers & Resources
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: '#fdf3e1' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#9e6a2d', borderBottom: '2px solid #f2d9b0' }}>Application Stage</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#9e6a2d', borderBottom: '2px solid #f2d9b0' }}>Input / Fertilizer</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#9e6a2d', borderBottom: '2px solid #f2d9b0' }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {buildFertilizerSchedule(data).map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f9ecd4' }}>
                    <td style={{ padding: '9px 12px', fontWeight: 700, color: '#3d2b0f' }}>
                      <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: row.color, marginRight: '8px', verticalAlign: 'middle' }} />
                      {row.stage}
                    </td>
                    <td style={{ padding: '9px 12px', fontWeight: 700, color: '#3d2b0f' }}>{row.input}</td>
                    <td style={{ padding: '9px 12px', color: '#9e6a2d' }}>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ── Suitable Crops ── */}
            <div className="section-title" style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#9e6a2d', borderLeft: '3px solid #c47318', paddingLeft: '10px', marginBottom: '12px', marginTop: '22px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sprout size={13} style={{ display: 'inline' }} /> Suitable Crops for Your Soil
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {crops.map(crop => (
                <div key={crop.name} style={{ border: '1.5px solid #f2d9b0', borderRadius: '12px', padding: '12px 14px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '30px', lineHeight: 1 }}>{crop.icon}</div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#3d2b0f' }}>{crop.name}</div>
                    <div style={{ fontSize: '11px', color: '#9e6a2d', margin: '3px 0' }}>Ideal pH: {crop.reqPh[0]}–{crop.reqPh[1]}</div>
                    <div style={{ fontSize: '11px', color: '#6b5239' }}>{crop.desc}</div>
                    <span style={{ display: 'inline-block', marginTop: '6px', fontSize: '10px', fontWeight: 700, padding: '2px 10px', borderRadius: '20px', background: crop.matchScore >= 80 ? '#dcfce7' : '#fef9c3', color: crop.matchScore >= 80 ? '#166534' : '#854d0e' }}>
                      {crop.matchScore}% Match
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Marketplace Recommendations ── */}
            {marketRecs && marketRecs.length > 0 && (
              <>
                <div className="section-title" style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#9e6a2d', borderLeft: '3px solid #c47318', paddingLeft: '10px', marginBottom: '12px', marginTop: '22px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  🛒 Recommended Products from Marketplace
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {marketRecs.map(prod => (
                    <div key={prod.id} style={{ border: '1.5px solid #f2d9b0', borderRadius: '12px', padding: '12px' }}>
                      <div style={{ fontSize: '28px' }}>{prod.image}</div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#3d2b0f', marginTop: '8px' }}>{prod.name}</div>
                      <div style={{ fontSize: '10px', color: '#9e6a2d', marginTop: '2px' }}>{prod.brand} · {prod.weight}</div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#15803d', marginTop: '6px' }}>₹{prod.price?.toLocaleString()}</div>
                      <div style={{ fontSize: '10px', color: '#6b5239', marginTop: '4px' }}>Available on Bhoomi Care Marketplace</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Disclaimer */}
            <div style={{ background: '#fdf3e1', border: '1px solid #f2d9b0', borderRadius: '10px', padding: '10px 14px', fontSize: '10px', marginTop: '20px', color: '#8a5c25', lineHeight: 1.6 }}>
              ⚠️ <strong>Disclaimer:</strong> This report is generated based on the soil data available in the Bhoomi Care system. Fertilizer recommendations are indicative and should be verified with a certified agronomist or your local Krishi Vigyan Kendra (KVK) before application. Crop suitability scores are approximate and depend on local climate, water availability, and market conditions.
            </div>

            {/* Footer */}
            <div style={{ marginTop: '20px', borderTop: '1px solid #f2d9b0', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', opacity: 0.5, color: '#3d2b0f' }}>
              <span>🌱 Bhoomi Care — Empowering Indian Farmers with Technology</span>
              <span>Generated on {today} · bhoomicare.app</span>
            </div>

          </div>
        </div>
        {/* End printable content */}

        {/* Bottom bar */}
        <div className="border-t border-earth-100 px-6 py-4 bg-earth-50 flex justify-between items-center">
          <p className="text-xs text-earth-500">📄 Click <strong>Download PDF</strong> to save this report to your device</p>
          <button onClick={handlePrint} className="flex items-center gap-2 bg-earth-700 hover:bg-earth-800 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all active:scale-95 shadow">
            <Download size={14} /> Download PDF
          </button>
        </div>
      </div>
    </div>
  )
}
