import { useLang } from '../../context/LangContext.jsx'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="border-t border-earth-100 bg-white py-5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm text-earth-400 font-medium">
          <span className="font-display font-bold text-earth-600">{t.brand}</span>
          {' '}· Soil Intelligence Platform for Indian Farmers
        </p>
        <p className="text-xs text-earth-300 mt-1">
          Data shown is for demonstration · Consult your Krishi Vigyan Kendra for critical decisions
        </p>
      </div>
    </footer>
  )
}
