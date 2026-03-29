import React, { useState } from 'react'
import { useLang }    from '../../context/LangContext.jsx'
import { useAuth }    from '../../context/AuthContext.jsx'
import { LANGUAGES, MARKET_NAV } from '../../data/i18n.js'
import { Sprout, Menu, X, LogOut, User, Printer } from 'lucide-react'
export default function Navbar({ activeTab, setTab }) {
  const { lang, setLang, t } = useLang()
  const { user, logout }     = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [profOpen, setProfOpen] = useState(false)

  const tabs = [
    { key:'home',      icon:'🌱', label: t.nav.home      },
    { key:'nutrients', icon:'🧪', label: t.nav.nutrients  },
    { key:'schemes',   icon:'📋', label: t.nav.schemes    },
    { key:'weather',   icon:'🌤️', label: t.nav.weather    },
    { key:'community', icon:'👨‍🌾', label: t.nav.community  },
    { key:'market',    icon:'🛒', label: MARKET_NAV[lang] ?? 'Marketplace' },
    { key:'ai',        icon:'🤖', label: t.nav.ai         },
  ]

  function go(key) { setTab(key); setMenuOpen(false); setProfOpen(false) }
  const row1 = LANGUAGES.slice(0, 5)
  const row2 = LANGUAGES.slice(5)

  return (
    <header className="sticky top-0 z-50 bg-white/92 backdrop-blur border-b border-earth-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-[60px] flex items-center justify-between gap-2">

        {/* Brand */}
        <div className="flex items-center gap-2.5 flex-shrink-0 cursor-pointer" onClick={() => go('home')}>
          <div className="w-9 h-9 rounded-2xl bg-earth-500 flex items-center justify-center shadow">
            <Sprout size={18} className="text-white" />
          </div>
          <div className="leading-tight hidden sm:block">
            <div className="font-display font-bold text-earth-900 text-[1.1rem] leading-none">Bhoomi Care</div>
            <div className="text-[10px] text-earth-400 tracking-wider uppercase font-semibold mt-0.5">Apni Mitti, Apna Adhikar</div>
          </div>
        </div>

        {/* Desktop tabs */}
        <nav className="hidden xl:flex items-center gap-0.5 flex-1 justify-center">
          {tabs.map(tb => (
            <button key={tb.key} onClick={() => go(tb.key)}
              className={`flex items-center gap-1 px-2.5 py-2 rounded-xl text-[11px] font-bold transition-all
                ${activeTab === tb.key ? 'bg-earth-500 text-white shadow-sm' : 'text-earth-600 hover:bg-earth-50 hover:text-earth-900'}`}>
              <span className="text-sm leading-none">{tb.icon}</span>
              {tb.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          {/* PDF Download Button */}
          <button onClick={() => window.print()} title="Download as PDF"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-sky-50 border border-sky-200 rounded-xl text-[11px] font-bold text-sky-700 hover:border-sky-400 hover:bg-sky-100 transition-all">
            <Printer size={16} /> PDF
          </button>

          {/* Lang dropdown */}
          <div className="relative">
            <button onClick={() => { setLangOpen(o => !o); setProfOpen(false) }}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-earth-50 border border-earth-200 rounded-xl text-[11px] font-bold text-earth-700 hover:border-earth-400 transition-all">
              🌐 {LANGUAGES.find(l => l.code === lang)?.native}
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-1 bg-white border border-earth-100 rounded-2xl shadow-xl z-50 p-2 w-52 animate-fade-in">
                {[row1, row2].map((row, ri) => (
                  <div key={ri} className="flex gap-1 mb-1 last:mb-0">
                    {row.map(l => (
                      <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false) }}
                        title={l.label}
                        className={`flex-1 py-1.5 rounded-lg text-[11px] font-extrabold transition-all
                          ${lang === l.code ? 'bg-earth-500 text-white' : 'text-earth-500 hover:bg-earth-100'}`}>
                        {l.native}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Auth button / avatar */}
          {user ? (
            <div className="relative">
              <button onClick={() => { setProfOpen(o => !o); setLangOpen(false) }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-earth-50 border border-earth-200 rounded-xl text-[11px] font-bold text-earth-700 hover:border-earth-400 transition-all">
                <span className="text-base leading-none">{user.avatar}</span>
                <span className="hidden sm:block max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
              </button>
              {profOpen && (
                <div className="absolute right-0 mt-1 bg-white border border-earth-100 rounded-2xl shadow-xl z-50 p-1.5 w-44 animate-fade-in">
                  <div className="px-3 py-2 border-b border-earth-100 mb-1">
                    <p className="font-bold text-earth-900 text-sm">{user.name}</p>
                    <p className="text-[10px] text-earth-400 truncate">{user.email}</p>
                  </div>
                  <button onClick={() => { setProfOpen(false); go('market') }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-earth-700 hover:bg-earth-50 transition-colors">
                    🛒 My Listings
                  </button>
                  <button onClick={() => { logout(); setProfOpen(false) }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-clay-600 hover:bg-clay-50 transition-colors">
                    <LogOut size={13} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => go('auth')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-earth-500 hover:bg-earth-600 text-white rounded-xl text-[11px] font-bold transition-all shadow-sm">
              <User size={13} /> Login
            </button>
          )}

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(o => !o)}
            className="xl:hidden p-2 rounded-xl hover:bg-earth-50 text-earth-700">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="xl:hidden bg-white border-t border-earth-100 px-4 pb-4 pt-2 space-y-1 animate-fade-in">
          {tabs.map(tb => (
            <button key={tb.key} onClick={() => go(tb.key)}
              className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-left transition-colors
                ${activeTab === tb.key ? 'bg-earth-500 text-white' : 'text-earth-700 hover:bg-earth-50'}`}>
              <span>{tb.icon}</span>{tb.label}
            </button>
          ))}
          {!user && (
            <button onClick={() => go('auth')}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white bg-earth-500 hover:bg-earth-600 transition-colors">
              <User size={15} /> Login / Register
            </button>
          )}
        </div>
      )}
    </header>
  )
}
