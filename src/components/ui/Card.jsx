// Base card wrapper used across all feature sections.
// Pass `lift` for hover-lift effect, `accent` (css color) for a top color bar.

export default function Card({ children, className = '', lift = false, accent = null }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-earth-100 shadow-sm overflow-hidden ${lift ? 'lift' : ''} ${className}`}
    >
      {accent && <div className="h-1" style={{ background: accent }} />}
      {children}
    </div>
  )
}
