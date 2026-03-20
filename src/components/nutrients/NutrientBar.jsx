// Single nutrient row with animated fill bar and optimal zone overlay.
// Used for both macro and micro nutrients.

import { useEffect, useRef } from 'react'
import Badge from '../ui/Badge.jsx'

function statusVariant(status) {
  if (status === 'optimal')   return 'optimal'
  if (status === 'deficient') return 'deficient'
  return 'excess'
}

export default function NutrientBar({ nutrient, t, maxOverride }) {
  const barRef = useRef(null)
  const top    = maxOverride ?? nutrient.max * 1.35
  const pct    = Math.min((nutrient.val / top) * 100, 100)
  const optLo  = (nutrient.min / top) * 100
  const optHi  = (nutrient.max / top) * 100

  const statusLabel = {
    optimal:   t.nutrients.optimal,
    deficient: t.nutrients.deficient,
    excess:    t.nutrients.excess,
  }[nutrient.status]

  // Animate bar on mount
  useEffect(() => {
    const el = barRef.current
    if (!el) return
    requestAnimationFrame(() => {
      el.style.width = `${pct}%`
    })
  }, [pct])

  return (
    <div className="bg-white rounded-2xl border border-earth-100 p-4 shadow-sm lift">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold font-display text-sm flex-shrink-0"
            style={{ background: nutrient.color }}
          >
            {nutrient.sym}
          </div>
          <div>
            <p className="font-semibold text-earth-900 text-sm">{nutrient.name}</p>
            <p className="text-[11px] text-earth-400">
              Optimal: {nutrient.min}–{nutrient.max} {nutrient.unit}
            </p>
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <p className="font-display font-bold text-earth-900 text-lg leading-none">
            {nutrient.val}
            <span className="text-xs text-earth-400 ml-1">{nutrient.unit}</span>
          </p>
          <Badge variant={statusVariant(nutrient.status)} className="mt-1">
            {statusLabel}
          </Badge>
        </div>
      </div>

      {/* Track */}
      <div className="relative h-5 bg-earth-50 rounded-full overflow-hidden">
        {/* Optimal zone highlight */}
        <div
          className="absolute top-0 h-full bg-moss-100 opacity-70 rounded"
          style={{ left: `${optLo}%`, width: `${optHi - optLo}%` }}
        />
        {/* Animated fill */}
        <div
          ref={barRef}
          className="absolute top-1 bottom-1 left-1 rounded-full"
          style={{
            width: 0,
            background: nutrient.color,
            transition: 'width 1.1s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
        {/* Range label */}
        <div className="absolute inset-0 flex items-center pl-2.5 pointer-events-none">
          <span className="text-[10px] text-earth-400">
            {nutrient.min}–{nutrient.max} {nutrient.unit}
          </span>
        </div>
      </div>
    </div>
  )
}
