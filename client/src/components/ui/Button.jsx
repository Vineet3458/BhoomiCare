// Reusable button with variants.
// variant: 'primary' | 'secondary' | 'ghost'

const VARIANTS = {
  primary:   'bg-earth-500 hover:bg-earth-600 text-white shadow-sm',
  secondary: 'border border-earth-200 hover:bg-earth-50 text-earth-700',
  ghost:     'hover:bg-earth-50 text-earth-600',
  moss:      'bg-moss-600 hover:bg-moss-700 text-white shadow-sm',
  clay:      'bg-clay-500 hover:bg-clay-600 text-white shadow-sm',
  sky:       'bg-sky-600 hover:bg-sky-700 text-white shadow-sm',
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  onClick,
  as: Tag = 'button',
  href,
  target,
  rel,
}) {
  const base = 'inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed'

  if (Tag === 'a') {
    return (
      <a href={href} target={target} rel={rel}
        className={`${base} ${VARIANTS[variant]} ${className}`}>
        {children}
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
