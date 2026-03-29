// Reusable status badge / pill.
// variant: 'optimal' | 'deficient' | 'excess' | 'eligible' | 'neutral'

const VARIANTS = {
  optimal:   'bg-moss-100 text-moss-700 border border-moss-200',
  deficient: 'bg-clay-100 text-clay-700 border border-clay-200',
  excess:    'bg-amber-100 text-amber-700 border border-amber-200',
  eligible:  'bg-moss-100 text-moss-700 border border-moss-200',
  neutral:   'bg-earth-100 text-earth-700 border border-earth-200',
}

export default function Badge({ children, variant = 'neutral', className = '' }) {
  return (
    <span
      className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
