import { CATEGORY_META } from '../../data/mockData'

const typeStyles = {
  income:  { bg: 'rgba(52,211,153,0.12)', color: '#34d399' },
  expense: { bg: 'rgba(248,113,113,0.12)', color: '#f87171' },
}

export function CategoryBadge({ category }) {
  const meta = CATEGORY_META[category]
  if (!meta) return <span className="text-ink-secondary text-xs">{category}</span>

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill text-xs font-medium"
      style={{ background: meta.bg, color: meta.color }}
    >
      {category}
    </span>
  )
}

export function TypeBadge({ type }) {
  const style = typeStyles[type] || typeStyles.expense
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-pill text-xs font-medium capitalize"
      style={{ background: style.bg, color: style.color }}
    >
      {type}
    </span>
  )
}
