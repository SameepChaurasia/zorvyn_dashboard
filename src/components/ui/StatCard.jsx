import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'
import { cn } from '../../utils/cn'

const accentMap = {
  accent:  { ring: 'border-accent/20', iconBg: 'bg-accent/10', iconColor: 'text-accent-muted' },
  green:   { ring: 'border-positive/20', iconBg: 'bg-positive/10', iconColor: 'text-positive' },
  red:     { ring: 'border-negative/20', iconBg: 'bg-negative/10', iconColor: 'text-negative' },
  amber:   { ring: 'border-warning/20', iconBg: 'bg-warning/10', iconColor: 'text-warning' },
}

export default function StatCard({ label, value, change, changeLabel, icon: Icon, accent = 'accent' }) {
  const colors = accentMap[accent] || accentMap.accent
  const isPositive = change > 0
  const isNeutral = change === 0
  const TrendIcon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-card border bg-surface p-5',
        'transition-colors duration-200 hover:border-border-base',
        colors.ring
      )}
    >
      <div className={cn('mb-4 w-9 h-9 rounded-lg flex items-center justify-center', colors.iconBg)}>
        <Icon size={17} className={colors.iconColor} />
      </div>

      <p className="text-[11px] uppercase tracking-widest text-ink-secondary mb-1.5">{label}</p>
      <p className="font-serif text-2xl text-ink-primary leading-none mb-2.5">
        {formatCurrency(value)}
      </p>

      <div className="flex items-center gap-1.5">
        <TrendIcon
          size={12}
          className={cn(
            isPositive ? 'text-positive' : isNeutral ? 'text-ink-tertiary' : 'text-negative'
          )}
        />
        <span
          className={cn(
            'text-xs',
            isPositive ? 'text-positive' : isNeutral ? 'text-ink-tertiary' : 'text-negative'
          )}
        >
          {isPositive ? '+' : ''}{change}% {changeLabel}
        </span>
      </div>
    </div>
  )
}
