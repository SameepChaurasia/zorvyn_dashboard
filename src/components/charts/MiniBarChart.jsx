export default function MiniBarChart({ data, maxValue }) {
  const max = maxValue ?? Math.max(...data.map(d => d.value), 1)

  return (
    <div className="space-y-3">
      {data.map((item) => {
        const pct = Math.round((item.value / max) * 100)
        return (
          <div key={item.label} className="flex items-center gap-3">
            <span className="text-xs text-ink-secondary w-24 flex-shrink-0 truncate">{item.label}</span>
            <div className="flex-1 h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${pct}%`, background: item.color || '#6c63ff' }}
              />
            </div>
            <span className="text-xs text-ink-primary font-medium w-14 text-right flex-shrink-0">
              {item.displayValue}
            </span>
          </div>
        )
      })}
    </div>
  )
}
