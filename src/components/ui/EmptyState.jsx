import { cn } from '../../utils/cn'

export default function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      {Icon && (
        <div className="mb-4 w-14 h-14 rounded-full bg-surface flex items-center justify-center">
          <Icon size={24} className="text-ink-tertiary" />
        </div>
      )}
      <p className="text-sm font-medium text-ink-secondary mb-1">{title}</p>
      {description && <p className="text-xs text-ink-tertiary max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
