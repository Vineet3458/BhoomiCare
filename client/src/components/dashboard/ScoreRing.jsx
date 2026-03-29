// Animated circular progress ring showing the overall soil health score.
// Score thresholds: ≥75 = moss green, ≥50 = earth amber, <50 = clay red.

import { useEffect, useRef } from 'react'

const RADIUS  = 54
const CIRC    = 2 * Math.PI * RADIUS
const SIZE    = 148

function scoreColor(score) {
  if (score >= 75) return '#3a8f25'
  if (score >= 50) return '#c47318'
  return '#c84e32'
}

export default function ScoreRing({ score }) {
  const fillRef = useRef(null)

  useEffect(() => {
    const el = fillRef.current
    if (!el) return
    // Trigger transition after mount
    requestAnimationFrame(() => {
      el.style.strokeDasharray = `${(score / 100) * CIRC} ${CIRC}`
    })
  }, [score])

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <circle
          className="ring-track"
          cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
        />
        <circle
          ref={fillRef}
          className="ring-fill"
          cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
          stroke={scoreColor(score)}
          strokeDasharray="0 339.3"
          style={{ transformOrigin: `${SIZE / 2}px ${SIZE / 2}px` }}
        />
      </svg>

      {/* Centre label */}
      <div className="absolute text-center pointer-events-none">
        <div className="font-display font-bold text-3xl text-earth-900 leading-none">
          {score}
        </div>
        <div className="text-[11px] text-earth-400 font-semibold mt-0.5">/100</div>
      </div>
    </div>
  )
}
