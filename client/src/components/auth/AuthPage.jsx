import { useState } from 'react'
import { useAuth }  from '../../context/AuthContext.jsx'
import { useLang }  from '../../context/LangContext.jsx'
import { AUTH_I18N } from '../../data/i18n.js'
import { REGIONS, LANGUAGES } from '../../data/i18n.js'
import { Eye, EyeOff, Sprout, CheckCircle2, ShieldCheck, Leaf, Users, BarChart2 } from 'lucide-react'

function Field({ label, type = 'text', value, onChange, placeholder, error, icon }) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  return (
    <div className="mb-4">
      <label className="block text-xs font-bold text-earth-600 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-400 text-base">{icon}</span>
        )}
        <input
          type={isPassword && show ? 'text' : type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full border rounded-xl px-4 py-2.5 text-sm text-earth-800 bg-white
            focus:outline-none focus:ring-2 transition-all
            ${icon ? 'pl-9' : ''}
            ${error
              ? 'border-clay-400 focus:ring-clay-200 bg-clay-50'
              : 'border-earth-200 focus:border-earth-400 focus:ring-earth-200'}`}
        />
        {isPassword && (
          <button type="button" onClick={() => setShow(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-400 hover:text-earth-600">
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
      {error && <p className="text-[11px] text-clay-600 mt-1 flex items-center gap-1">⚠ {error}</p>}
    </div>
  )
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-bold text-earth-600 uppercase tracking-wider mb-1.5">{label}</label>
      <select
        value={value} onChange={e => onChange(e.target.value)}
        className="w-full border border-earth-200 rounded-xl px-4 py-2.5 text-sm text-earth-800 bg-white focus:outline-none focus:border-earth-400 focus:ring-2 focus:ring-earth-200 transition-all">
        {options.map(o => (
          <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
        ))}
      </select>
    </div>
  )
}

// Feature side panel content
const FEATURES = [
  { icon: <BarChart2 size={18} />, title: 'Smart Soil Analysis', desc: 'AI-powered NPK reports and action plans for your fields' },
  { icon: <Leaf size={18} />, title: 'Marketplace', desc: 'Buy fertilizers, seeds & soil items. Sell surplus stock directly to farmers' },
  { icon: <ShieldCheck size={18} />, title: 'Govt Schemes', desc: 'Find PM-KISAN, subsidy programs you qualify for — in your language' },
  { icon: <Users size={18} />, title: 'Farmer Community', desc: 'Chat with 50,000+ farmers across India in your language' },
]

export default function AuthPage({ onSuccess }) {
  const { login, register, loading, error } = useAuth()
  const { lang } = useLang()
  const at = AUTH_I18N[lang] ?? AUTH_I18N.en

  const [mode, setMode]   = useState('login')
  const [form, setForm]   = useState({ email: '', password: '', name: '', phone: '', region: 'Maharashtra', lang: 'en' })
  const [errs, setErrs]   = useState({})
  const [done, setDone]   = useState(false)

  function set(field, val) { setForm(f => ({ ...f, [field]: val })) }

  function validate() {
    const e = {}
    if (!form.email.trim())                          e.email    = at.errors.required
    else if (!/\S+@\S+\.\S+/.test(form.email))       e.email    = at.errors.emailInvalid
    if (!form.password)                              e.password = at.errors.required
    else if (form.password.length < 6)               e.password = at.errors.pwShort
    if (mode === 'register') {
      if (!form.name.trim())                         e.name     = at.errors.required
      if (!form.phone.trim())                        e.phone    = at.errors.required
      else if (!/^\d{10}$/.test(form.phone.trim()))  e.phone    = at.errors.phoneInvalid
    }
    setErrs(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    const result = mode === 'login'
      ? await login({ email: form.email, password: form.password })
      : await register(form)
    if (result.ok) { setDone(true); setTimeout(onSuccess, 1400) }
  }

  // Success screen
  if (done) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 animate-fade-in">
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-moss-50 border-4 border-moss-200 rounded-full flex items-center justify-center">
            <CheckCircle2 size={36} className="text-moss-600" />
          </div>
          <span className="absolute -bottom-1 -right-1 text-3xl">🌾</span>
        </div>
        <p className="font-display font-bold text-earth-900 text-2xl mb-2">{at.greeting(form.name || 'Farmer')}</p>
        <p className="text-earth-400 text-sm">Taking you to your dashboard…</p>
        <div className="mt-4 flex gap-1">
          {[0,1,2].map(i => (
            <span key={i} className={`w-2 h-2 rounded-full bg-earth-300 dot${i+1}`} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-stretch animate-fade-in">

      {/* LEFT — Feature panel (hidden on mobile) */}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-earth-800 via-earth-700 to-earth-900 w-[42%] p-10 relative overflow-hidden">
        {/* decorative pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 24px,rgba(196,115,24,.3) 24px,rgba(196,115,24,.3) 25px)' }}
        />
        <div className="relative z-10">
          {/* Brand */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
              <Sprout size={20} className="text-white" />
            </div>
            <div>
              <div className="font-display font-bold text-white text-lg leading-none">Bhoomi Care</div>
              <div className="text-[10px] text-earth-300 uppercase tracking-wider mt-0.5">Apni Mitti, Apna Adhikar</div>
            </div>
          </div>

          <h2 className="font-display font-bold text-3xl text-white mb-3 leading-snug">
            India's Smartest Platform for Farmers
          </h2>
          <p className="text-earth-300 text-sm leading-relaxed mb-8">
            Join 50,000+ farmers who use Bhoomi Care to get soil insights, buy inputs at the best price, and connect with government schemes.
          </p>

          {/* Feature list */}
          <div className="space-y-4">
            {FEATURES.map(f => (
              <div key={f.title} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="w-9 h-9 bg-earth-500/40 border border-earth-400/30 rounded-xl flex items-center justify-center text-earth-200 flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{f.title}</p>
                  <p className="text-earth-400 text-xs mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="relative z-10 flex gap-6 mt-8">
          {[
            { val: '50K+', label: 'Farmers' },
            { val: '500+', label: 'Products' },
            { val: '10', label: 'Languages' },
          ].map(s => (
            <div key={s.label}>
              <div className="font-display font-bold text-white text-2xl">{s.val}</div>
              <div className="text-earth-400 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — Auth form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-10 bg-[#f9f4ec]">
        <div className="w-full max-w-sm">

          {/* Mobile brand */}
          <div className="text-center mb-7 lg:hidden">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-earth-500 flex items-center justify-center shadow">
                <Sprout size={18} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-display font-bold text-earth-900 text-lg leading-none">Bhoomi Care</div>
                <div className="text-[10px] text-earth-400 uppercase tracking-wider mt-0.5">Apni Mitti, Apna Adhikar</div>
              </div>
            </div>
          </div>

          <h1 className="font-display font-bold text-2xl text-earth-900 mb-1">
            {mode === 'login' ? at.loginTitle : at.registerTitle}
          </h1>
          <p className="text-earth-500 text-sm mb-7">
            {mode === 'login' ? at.loginSub : at.registerSub}
          </p>

          {/* Card */}
          <div className="bg-white rounded-3xl border border-earth-100 shadow-sm p-6">
            {/* Mode toggle */}
            <div className="flex gap-1 bg-earth-50 rounded-xl p-1 mb-6">
              {['login', 'register'].map(m => (
                <button key={m} onClick={() => { setMode(m); setErrs({}) }}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all
                    ${mode === m ? 'bg-white text-earth-800 shadow-sm' : 'text-earth-400 hover:text-earth-700'}`}>
                  {m === 'login' ? `🔐 ${at.login}` : `🌾 ${at.register}`}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {mode === 'register' && (
                <Field label={at.name} value={form.name} onChange={v => set('name', v)}
                  placeholder="Ramesh Kumar" error={errs.name} icon="👤" />
              )}
              <Field label={at.email} value={form.email} onChange={v => set('email', v)}
                placeholder="you@example.com" error={errs.email} icon="📧" />
              <Field label={at.password} value={form.password} onChange={v => set('password', v)}
                placeholder="Min. 6 characters" error={errs.password} type="password" icon="🔒" />

              {mode === 'register' && (
                <>
                  <Field label={at.phone} value={form.phone} onChange={v => set('phone', v)}
                    placeholder="9876543210" error={errs.phone} icon="📱" />
                  <SelectField
                    label={at.region}
                    value={form.region}
                    onChange={v => set('region', v)}
                    options={['', ...REGIONS].map(r => ({ value: r, label: r || '— Select State —' }))}
                  />
                  <SelectField
                    label={at.lang}
                    value={form.lang}
                    onChange={v => set('lang', v)}
                    options={LANGUAGES.map(l => ({ value: l.code, label: l.label }))}
                  />
                </>
              )}

              {/* API error */}
              {error && (
                <div className="bg-clay-50 border border-clay-200 text-clay-700 text-xs rounded-xl px-3 py-2.5 mb-4 flex items-center gap-2">
                  ⚠️ {error}
                </div>
              )}

              {/* Demo hint */}
              {mode === 'login' && (
                <div className="bg-sky-50 border border-sky-200 rounded-xl px-3 py-2.5 mb-4 text-center">
                  <p className="text-[11px] text-sky-700 font-semibold">🔑 {at.demoHint}</p>
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full bg-earth-500 hover:bg-earth-600 disabled:bg-earth-300 text-white font-bold py-3.5 rounded-2xl text-sm transition-all active:scale-98 shadow-sm flex items-center justify-center gap-2">
                {loading
                  ? <><span className="dot1">●</span><span className="dot2">●</span><span className="dot3">●</span></>
                  : mode === 'login' ? `🔐 ${at.loginBtn}` : `🌾 ${at.registerBtn}`}
              </button>
            </form>

            <div className="text-center mt-5 pt-4 border-t border-earth-100">
              <span className="text-xs text-earth-400">
                {mode === 'login' ? at.noAccount : at.hasAccount}{' '}
              </span>
              <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setErrs({}) }}
                className="text-xs font-bold text-earth-600 hover:text-earth-800 underline underline-offset-2">
                {mode === 'login' ? at.register : at.login}
              </button>
            </div>
          </div>

          {/* Security note */}
          <p className="text-[10px] text-earth-400 text-center mt-4 flex items-center justify-center gap-1">
            <ShieldCheck size={11} /> Your data is secure and never shared
          </p>
        </div>
      </div>
    </div>
  )
}
