import { CheckCircle, XCircle, Info } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { cn } from '../../utils/cn'

const variantConfig = {
  success: { icon: CheckCircle, color: 'text-positive', border: 'border-positive/30', bg: 'bg-positive/5' },
  error:   { icon: XCircle,     color: 'text-negative', border: 'border-negative/30', bg: 'bg-negative/5' },
  info:    { icon: Info,        color: 'text-info',     border: 'border-info/30',     bg: 'bg-info/5' },
}

export default function Toast() {
  const { toast } = useApp()

  if (!toast) return null

  const config = variantConfig[toast.variant] || variantConfig.info
  const Icon = config.icon

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-4 py-3',
        'rounded-[10px] border shadow-lg max-w-xs',
        'animate-in slide-in-from-bottom-4 fade-in duration-200',
        config.bg, config.border
      )}
    >
      <Icon size={15} className={config.color} />
      <span className="text-sm text-ink-primary">{toast.message}</span>
    </div>
  )
}
