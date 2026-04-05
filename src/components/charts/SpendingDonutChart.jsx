import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { useApp } from '../../context/AppContext'
import { getCategoryData } from '../../utils/calculations'
import { CATEGORY_META } from '../../data/mockData'
import { formatCurrency } from '../../utils/formatters'
import EmptyState from '../ui/EmptyState'
import { PieChart as PieIcon } from 'lucide-react'

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0]
  return (
    <div className="bg-bg-secondary border border-border-base rounded-[9px] px-3 py-2.5 text-xs">
      <p className="text-ink-secondary mb-0.5">{d.name}</p>
      <p className="text-ink-primary font-medium">{formatCurrency(d.value)}</p>
      <p className="text-ink-tertiary">{d.payload.percent}% of spend</p>
    </div>
  )
}

export default function SpendingDonutChart() {
  const { transactions } = useApp()
  const data = getCategoryData(transactions)

  if (data.length === 0) {
    return <EmptyState icon={PieIcon} title="No expense data" description="Add expense transactions to see breakdown" />
  }

  const totalExpenses = data.reduce((s, d) => s + d.value, 0)

  return (
    <div>
      <div className="mb-5">
        <p className="text-sm font-medium text-ink-primary">Spending Breakdown</p>
        <p className="text-xs text-ink-secondary mt-0.5">By category this month</p>
      </div>

      <div className="relative">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={CATEGORY_META[entry.name]?.color || '#6c63ff'}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="font-serif text-xl text-ink-primary">{formatCurrency(totalExpenses)}</p>
          <p className="text-[10px] text-ink-secondary mt-0.5">Total Spend</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {data.slice(0, 5).map((item) => {
          const meta = CATEGORY_META[item.name]
          return (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-[2px] flex-shrink-0" style={{ background: meta?.color }} />
                <span className="text-ink-secondary">{item.name}</span>
              </div>
              <span className="text-ink-primary font-medium">{formatCurrency(item.value)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
