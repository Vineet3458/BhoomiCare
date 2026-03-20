import { useState, useRef, useCallback } from 'react'
import { Upload, X, FileText, CheckCircle2, AlertCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react'

// ── Upload Soil Report Modal ──────────────────────────────────
export function UploadModal({ onClose, onUpload }) {
  const [file, setFile]         = useState(null)
  const [preview, setPreview]   = useState(null)
  const [uploading, setUploading] = useState(false)
  const [done, setDone]         = useState(false)
  const [error, setError]       = useState(null)
  const [dragging, setDragging] = useState(false)
  const inputRef                = useRef(null)

  const processFile = useCallback((f) => {
    if (!f) return
    const allowed = ['application/json', 'text/csv', 'application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
    if (!allowed.some(t => f.type.startsWith(t.split('/')[0]) || f.type === t)) {
      setError('Please upload a JSON, CSV, PDF, or image file (JPG/PNG).')
      return
    }
    if (f.size > 5 * 1024 * 1024) {
      setError('File size must be under 5 MB.')
      return
    }
    setError(null)
    setFile(f)

    // Try to parse JSON/CSV soil data
    if (f.type === 'application/json' || f.name.endsWith('.json') || f.name.endsWith('.csv')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const raw = e.target.result
          if (f.name.endsWith('.csv')) {
            const lines = raw.split('\n').filter(Boolean)
            const headers = lines[0].split(',')
            const values  = lines[1]?.split(',') ?? []
            const obj = {}
            headers.forEach((h, i) => { 
              const key = h.trim().replace(/^"|"$/g, '')
              const val = (values[i] || '').trim().replace(/^"|"$/g, '')
              obj[key] = val 
            })
            setPreview(obj)
          } else {
            const obj = JSON.parse(raw)
            setPreview(obj)
          }
        } catch {
          setPreview(null)
        }
      }
      reader.readAsText(f)
    } else {
      setPreview({ fileName: f.name, fileType: f.type, note: 'Visual report uploaded — AI will analyze on processing.' })
    }
  }, [])

  function handleDrop(e) {
    e.preventDefault(); setDragging(false)
    processFile(e.dataTransfer.files?.[0])
  }

  async function handleUpload() {
    if (!file) return
    setUploading(true)
    // Simulate processing delay (in production, this would POST to your API)
    await new Promise(r => setTimeout(r, 1800))
    setUploading(false)
    setDone(true)
    onUpload?.(preview)
    setTimeout(onClose, 2500)
  }

  if (done) {
    return (
      <ModalShell onClose={onClose}>
        <div className="flex flex-col items-center py-10 animate-fade-in">
          <div className="w-16 h-16 bg-moss-50 border-2 border-moss-200 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 size={28} className="text-moss-600" />
          </div>
          <h3 className="font-display font-bold text-xl text-earth-900 mb-2">Report Uploaded! 🌿</h3>
          <p className="text-earth-500 text-sm text-center max-w-xs">
            Your soil report has been received. Dashboard will refresh with new data shortly.
          </p>
        </div>
      </ModalShell>
    )
  }

  return (
    <ModalShell onClose={onClose} title="Upload Soil Report">
      {/* Supported formats note */}
      <p className="text-xs text-earth-500 mb-4 bg-sky-50 border border-sky-200 rounded-xl px-3 py-2">
        📄 Supported: <strong>JSON, CSV</strong> (from Soil Health Card portal) or <strong>PDF / Photo</strong> of your lab report · Max 5 MB
      </p>

      {/* Sample JSON hint */}
      <div className="bg-earth-50 border border-earth-100 rounded-xl px-3 py-2 mb-4 text-[11px] text-earth-600">
        <p className="font-bold mb-1">📋 Expected JSON format (from soil lab):</p>
        <code className="font-mono text-[10px] text-earth-700">
          {'{"pH":6.8,"N":38,"P":22,"K":185,"Zn":0.45,"OC":0.68}'}
        </code>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center py-10 cursor-pointer transition-all mb-4
          ${dragging ? 'border-earth-500 bg-earth-50' : file ? 'border-moss-400 bg-moss-50' : 'border-earth-200 hover:border-earth-400 hover:bg-earth-50'}`}
      >
        <input ref={inputRef} type="file" accept=".json,.csv,.pdf,.jpg,.jpeg,.png" className="hidden"
          onChange={e => processFile(e.target.files?.[0])} />
        {file ? (
          <>
            <FileText size={32} className="text-moss-600 mb-2" />
            <p className="font-bold text-moss-800 text-sm">{file.name}</p>
            <p className="text-xs text-moss-600">{(file.size / 1024).toFixed(1)} KB · Click to change</p>
          </>
        ) : (
          <>
            <Upload size={32} className="text-earth-400 mb-2" />
            <p className="font-bold text-earth-700 text-sm">Drop your report here</p>
            <p className="text-xs text-earth-400 mt-1">or click to browse files</p>
          </>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-clay-700 bg-clay-50 border border-clay-200 rounded-xl px-3 py-2 mb-4 text-xs">
          <AlertCircle size={13} /> {error}
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="bg-earth-50 border border-earth-200 rounded-xl p-3 mb-4 text-xs text-earth-700 max-h-32 overflow-y-auto">
          <p className="font-bold text-earth-600 mb-1.5">📊 Detected soil parameters:</p>
          {Object.entries(preview).slice(0, 10).map(([k, v]) => (
            <div key={k} className="flex justify-between py-0.5 border-b border-earth-100 last:border-0">
              <span className="text-earth-500 font-semibold">{k}</span>
              <span className="text-earth-800 font-bold">{String(v)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full bg-earth-500 hover:bg-earth-600 disabled:bg-earth-200 text-white font-bold py-3 rounded-2xl text-sm transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2"
      >
        {uploading
          ? <><Loader2 size={14} className="animate-spin" /> Processing Report…</>
          : <><Upload size={14} /> Upload & Analyse Report</>}
      </button>
    </ModalShell>
  )
}

function ModalShell({ children, onClose, title }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up">
        <div className="flex items-center justify-between px-6 py-4 border-b border-earth-100">
          <h2 className="font-display font-bold text-earth-900">{title || 'Upload'}</h2>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-earth-50 text-earth-400">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

// ── Farmer FAQ / Queries Section ──────────────────────────────
const FAQS = [
  {
    q: 'My soil report shows low nitrogen. What fertilizer should I apply?',
    a: 'For Nitrogen deficiency, apply **45 kg/ha Urea** (split dose) before sowing and **20 kg/ha** as top dress at tillering stage. For organic approach, use **Vermicompost 3–4 t/ha** or **Green Manure** (Dhaincha/Sunhemp). Always apply in the morning or evening to reduce volatilization.'
  },
  {
    q: 'How do I apply for PM-KISAN 2025–26?',
    a: 'Visit **pmkisan.gov.in** or your nearest CSC (Common Service Centre). You need: Aadhaar linked to bank account, land records (7/12 or Khasra), and mobile number. The 19th instalment (₹2,000) is expected in **February 2026**. Check your status using the "Beneficiary Status" section on the portal.'
  },
  {
    q: 'When should I apply fertilizer for Rabi 2025–26?',
    a: 'For Rabi crops:\n• **Basal dose (at sowing):** DAP (18:46:0) + MOP — apply in furrows below the seed\n• **Top dress 1 (3–4 weeks):** 1/2 of Urea dose at the stage of first irrigation\n• **Top dress 2 (6–7 weeks):** remaining Urea at heading/flag leaf stage\nAlways apply after irrigation, never on dry soil.'
  },
  {
    q: 'What is the Soil Health Card scheme and how to get one?',
    a: 'Soil Health Card (SHC 2.0) provides **free soil testing** every 3 years. Visit your nearest **Krishi Vigyan Kendra (KVK)** or state agriculture department office with a soil sample (200g from 3–4 spots at 15–20 cm depth). You\'ll get nutrient status for N, P, K, S, Zn, Fe, Mn, B, Cu, and pH/EC with crop-specific recommendations.'
  },
  {
    q: 'How to get subsidy on drip irrigation (PMKSY)?',
    a: '**PM Krishi Sinchayee Yojana** provides 55–90% subsidy on drip/sprinkler systems.\n• **SC/ST farmers:** Up to 90% subsidy\n• **Others:** 55–70% subsidy\nContact your **District Agriculture Officer** or visit **pmksy.gov.in**. You need: land records, Aadhaar, bank details and supplier quote. Pre-installation approval is mandatory.'
  },
  {
    q: 'My crops have yellow leaves. What is the issue?',
    a: 'Yellow leaves can indicate:\n• **Nitrogen deficiency** — yellowing starts from older leaves, moves upward\n• **Zinc deficiency** — yellowish-brown spots on young leaves, striped pattern\n• **Iron deficiency** — interveinal chlorosis (yellow between veins on young leaves)\n• **Magnesium deficiency** — yellow between veins on older leaves\n\nFor your soil, most likely **Nitrogen (38 kg/ha) + Zinc (0.45 ppm)** — both deficient. Apply Urea + ZnSO₄ 25 kg/ha immediately.'
  },
  {
    q: 'What is the MSP for wheat and paddy in 2025–26?',
    a: '**Minimum Support Price (MSP) 2025–26:**\n• **Wheat:** ₹2,425 per quintal (₹150 increase from 2024–25)\n• **Paddy (Common grade):** ₹2,300 per quintal\n• **Maize:** ₹2,225 per quintal\n• **Gram/Chickpea:** ₹5,650 per quintal\n\nProcurement begins at the nearest Mandi. Register on **eNAM portal (enam.gov.in)** for transparent online bidding and better price discovery.'
  },
  {
    q: 'How can I sell my surplus fertilizer or seeds on Bhoomi Care?',
    a: 'You can list your surplus inputs on the **Bhoomi Care Marketplace** for free!\n\n1. Go to **Marketplace → Sell tab** in the top navigation\n2. Login/Register (free)\n3. Fill the form: product name, category, price, quantity, and contact number\n4. Your listing goes live immediately — buyers will contact you directly\n\nBhoomi Care does not charge any commission. Transactions happen directly between buyer and seller.'
  },
]

export function FarmerQueriesSection() {
  const [open, setOpen] = useState(null)

  return (
    <div className="mt-10 mb-6">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-earth-100" />
        <div className="flex items-center gap-2 bg-earth-50 border border-earth-200 px-4 py-2 rounded-full">
          <span className="text-lg">🌾</span>
          <span className="font-display font-bold text-earth-800 text-sm">Common Farmer Queries</span>
        </div>
        <div className="flex-1 h-px bg-earth-100" />
      </div>
      <p className="text-earth-500 text-xs text-center mb-5">Frequently asked questions by farmers like you</p>

      {/* FAQ Accordion */}
      <div className="space-y-2.5">
        {FAQS.map((faq, i) => (
          <div key={i}
            className={`bg-white border rounded-2xl overflow-hidden transition-all shadow-sm
              ${open === i ? 'border-earth-300' : 'border-earth-100'}`}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-3 px-5 py-3.5 text-left hover:bg-earth-50 transition-colors"
            >
              <span className="font-semibold text-sm text-earth-800">{faq.q}</span>
              <span className="flex-shrink-0 text-earth-400">
                {open === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            </button>
            {open === i && (
              <div className="px-5 pb-4 pt-1 border-t border-earth-100 animate-fade-in">
                <div className="text-sm text-earth-600 leading-relaxed whitespace-pre-line">
                  {faq.a.split(/\*\*(.*?)\*\*/g).map((part, j) =>
                    j % 2 === 1
                      ? <strong key={j} className="text-earth-800 font-bold">{part}</strong>
                      : <span key={j}>{part}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-5 text-center">
        <p className="text-xs text-earth-400">Can't find your answer?</p>
        <p className="text-sm font-bold text-earth-600 mt-1">
          🤖 Ask our AI Assistant — it answers in your language!
        </p>
      </div>
    </div>
  )
}
