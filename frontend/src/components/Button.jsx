import { Link } from 'react-router-dom'

/**
 * variant: 'primary' | 'outline' | 'ghost'
 * as: 'link' (internal route) | 'a' (external/anchor) | 'button'
 */
export default function Button({
  children,
  variant = 'primary',
  as = 'link',
  to = '/',
  href,
  onClick,
  className = '',
  type = 'button',
}) {
  const base =
    'inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-body font-semibold text-sm tracking-wide transition-all duration-300 focus-visible:outline-2'

  const variants = {
    primary: 'bg-tea-gold text-tea-dark hover:bg-tea-goldLight hover:shadow-soft hover:-translate-y-0.5',
    outline: 'border-2 border-tea-cream text-tea-cream hover:bg-tea-cream hover:text-tea-dark',
    ghost: 'text-tea-dark hover:text-tea-gold',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (as === 'link') {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (as === 'a') {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
