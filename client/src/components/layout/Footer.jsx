import { useLang } from '../../context/LangContext.jsx'
import { Sprout } from 'lucide-react'

export default function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-earth-100 bg-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-earth-500 flex items-center justify-center">
              <Sprout size={14} className="text-white" />
            </div>
            <span className="font-display font-bold text-earth-700 text-sm">{t.brand}</span>
            <span className="text-earth-300 text-xs hidden sm:inline">·</span>
            <span className="text-earth-400 text-xs hidden sm:inline">{t.tagline}</span>
          </div>
          {/* Links */}
          <div className="flex items-center gap-4 text-[11px] text-earth-400 font-medium">
            <span>Smart Soil Intelligence for Indian Farmers</span>
          </div>
          {/* Copyright */}
          <p className="text-[11px] text-earth-300">
            © {year} Bhoomi Care · Demo only · Consult your KVK for critical decisions
          </p>
        </div>
      </div>
    </footer>
  )
}
