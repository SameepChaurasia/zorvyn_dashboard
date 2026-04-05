import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

const variants = {
  primary:  'bg-accent text-white border-accent hover:bg-[#5a52e0] active:scale-[0.98]',
  ghost:    'bg-transparent text-ink-secondary border-border-base hover:bg-surface hover:text-ink-primary',
  danger:   'bg-transparent text-negative border-negative/30 hover:bg-negative/10',
  success:  'bg-transparent text-positive border-positive/30 hover:bg-positive/10',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2 text-sm rounded-[10px]',
  lg: 'px-5 py-2.5 text-sm rounded-[10px]',
}

const Button = forwardRef(function Button(
  { children, variant = 'ghost', size = 'md', className, disabled, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium border transition-all duration-150',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})

export default Button
