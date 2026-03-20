import React, { useState } from 'react'
import { useLang } from '../../context/LangContext.jsx'
import { LANGUAGES } from '../../data/i18n.js'
import { Sprout, Menu, X } from 'lucide-react'

export default function Navbar({ activeTab, setTab }) {
  const { lang, setLang, t } = useLang()
  const [mobileOpen, setMobileOpen] = useState(false)

  const tabs = [
    { key: 'home',      icon: '🌱', label: t.nav.home },
    { key: 'nutrients', icon: '🧪', label: t.nav.nutrients },
    { key: 'schemes',   icon: '📋', label: t.nav.schemes },
    { key: 'ai',        icon: '🤖', label: t.nav.ai },
  ]

  function handleTab(key) {
    setTab(key)
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-earth-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-[60px] flex items-center justify-between gap-3">

        {/* Brand */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 rounded-2xl bg-earth-500 flex items-center justify-center shadow">
            <Sprout size={18} className="text-white" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-earth-900 text-[1.15rem] leading-none">
              {t.brand}
            </div>
            <div className="text-[10px] text-earth-400 tracking-wider uppercase font-semibold mt-0.5">
              {t.tagline}
            </div>
          </div>
        </div>

        {/* Desktop tabs */}
        <nav className="hidden md:flex items-center gap-1">
          {tabs.map(tb => (
            <button
              key={tb.key}
              onClick={() => handleTab(tb.key)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold transition-all duration-150
                ${activeTab === tb.key
                  ? 'bg-earth-500 text-white shadow-sm'
                  : 'text-earth-600 hover:bg-earth-50 hover:text-earth-900'}`}
            >
              <span className="text-[15px] leading-none">{tb.icon}</span>
              {tb.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <div className="flex items-center gap-0.5 bg-earth-50 rounded-xl p-1 border border-earth-100">
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`w-8 h-7 rounded-lg text-[11px] font-extrabold transition-all
                  ${lang === l.code
                    ? 'bg-earth-500 text-white shadow-sm'
                    : 'text-earth-500 hover:bg-earth-100'}`}
              >
                {l.native}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden p-2 rounded-xl hover:bg-earth-50 text-earth-700"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-earth-100 px-4 pb-4 pt-2 space-y-1 animate-fade-in">
          {tabs.map(tb => (
            <button
              key={tb.key}
              onClick={() => handleTab(tb.key)}
              className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-left transition-colors
                ${activeTab === tb.key
                  ? 'bg-earth-500 text-white'
                  : 'text-earth-700 hover:bg-earth-50'}`}
            >
              <span>{tb.icon}</span>
              {tb.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
