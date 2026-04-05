import { useState } from 'react'
import {
  ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts'
import { MONTHLY_TREND } from '../../data/mockData'
import { formatCurrency } from '../../utils/formatters'
import { cn } from '../../utils/cn'

const RANGES = [
  { label: '3M', slice: 3 },
  { label: '6M', slice: 6 },
  { label: '1Y', slice: 6 },
]

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-bg-secondary border border-border-base rounded-[9px] px-3 py-2.5 text-xs">
      <p className="text-ink-secondary mb-1">{label}</p>
      <p className="text-accent-muted font-medium">{formatCurrency(payload[0]?.value)}</p>
    </div>
  )
}

export default function BalanceTrendChart() {
  const [range, setRange] = useState('6M')
  const slice = RANGES.find(r => r.label === range)?.slice ?? 6
  const data = MONTHLY_TREND.slice(-slice)

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm font-medium text-ink-primary">Balance Trend</p>
          <p className="text-xs text-ink-secondary mt-0.5">Rolling account balance</p>
        </div>
        <div className="flex gap-1 bg-bg-tertiary rounded-[9px] p-0.5">
          {RANGES.map(({ label }) => (
            <button
              key={label}
              onClick={() => setRange(label)}
              className={cn(
                'px-3 py-1.5 text-xs rounded-lg font-medium transition-all duration-150',
                range === label
                  ? 'bg-surface text-ink-primary'
                  : 'text-ink-secondary hover:text-ink-primary'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#6c63ff" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#6c63ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="month" tick={{ fill: '#8b90a8', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} tick={{ fill: '#8b90a8', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(108,99,255,0.3)', strokeWidth: 1 }} />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#6c63ff"
            strokeWidth={2}
            fill="url(#balanceGrad)"
            dot={{ fill: '#6c63ff', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#6c63ff', stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
