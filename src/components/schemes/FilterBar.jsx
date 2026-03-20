// Horizontal scrollable category filter strip for schemes page.
import { SlidersHorizontal } from 'lucide-react'
import { SCHEME_CATEGORIES }  from '../../data/schemes.js'

export default function FilterBar({ active, onSelect, allLabel }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
      <SlidersHorizontal size={13} className="text-earth-400 flex-shrink-0" />
      <div className="flex gap-1.5 flex-nowrap">
        {SCHEME_CATEGORIES.map(cat => {
          const label = cat === 'All' ? allLabel : cat
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all
                ${active === cat
                  ? 'bg-earth-500 text-white'
                  : 'bg-white border border-earth-200 text-earth-600 hover:bg-earth-50'}`}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
