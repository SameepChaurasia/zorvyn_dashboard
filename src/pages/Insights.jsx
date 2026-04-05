import { Home, TrendingUp, Calendar, Lightbulb } from 'lucide-react'
import Layout from '../components/layout/Layout'
import Topbar from '../components/layout/Topbar'
import MiniBarChart from '../components/charts/MiniBarChart'
import { useApp } from '../context/AppContext'
import {
  getHighestCategory,
  getSavingsRate,
  getCategoryData,
} from '../utils/calculations'
import { MONTHLY_TREND, CATEGORY_META } from '../data/mockData'
import { formatCurrency, formatPercent } from '../utils/formatters'

function InsightCard({ icon: Icon, label, value, description, iconColor = 'text-accent-muted', iconBg = 'bg-accent/10' }) {
  return (
    <div className="bg-surface border border-border-subtle rounded-card p-5">
      <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center mb-4 ${iconBg}`}>
        <Icon size={18} className={iconColor} />
      </div>
      <p className="text-[11px] uppercase tracking-widest text-ink-secondary mb-2">{label}</p>
      <p className="font-serif text-xl text-ink-primary mb-2">{value}</p>
      <p className="text-xs text-ink-secondary leading-relaxed">{description}</p>
    </div>
  )
}

export default function Insights() {
  const { transactions } = useApp()
  const highestCategory = getHighestCategory(transactions)
  const savingsRate = getSavingsRate(transactions)
  const categoryData = getCategoryData(transactions)
  const maxExpense = Math.max(...MONTHLY_TREND.map(m => m.expenses))

  const monthlyBars = MONTHLY_TREND.map(m => ({
    label: m.month,
    value: m.expenses,
    displayValue: formatCurrency(m.expenses),
    color: m.month === 'Apr' ? '#34d399' : '#6c63ff',
  }))

  const categoryBars = categoryData.map(c => ({
    label: c.name,
    value: c.percent,
    displayValue: `${c.percent}%`,
    color: CATEGORY_META[c.name]?.color || '#6c63ff',
  }))

  const bestMonth = [...MONTHLY_TREND].sort((a, b) => a.expenses - b.expenses)[0]

  return (
    <Layout>
      <Topbar title="Insights & Analytics" subtitle="April 2026 · Spending analysis" />

      <main className="flex-1 px-8 py-7 space-y-6">
        {/* Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InsightCard
            icon={Home}
            label="Highest Spending"
            value={highestCategory ? highestCategory[0] : '—'}
            description={highestCategory ? `${formatCurrency(highestCategory[1])} total — review if this aligns with your budget goals.` : 'No expense data yet.'}
            iconColor="text-info"
            iconBg="bg-info/10"
          />
          <InsightCard
            icon={TrendingUp}
            label="Savings Rate"
            value={formatPercent(savingsRate)}
            description={savingsRate >= 0.2 ? 'Above the recommended 20% target. Excellent discipline!' : 'Below 20% target. Consider reducing discretionary spend.'}
            iconColor="text-positive"
            iconBg="bg-positive/10"
          />
          <InsightCard
            icon={Calendar}
            label="Best Month"
            value={bestMonth.month}
            description={`Lowest expenses at ${formatCurrency(bestMonth.expenses)}. Replicate those habits going forward.`}
            iconColor="text-warning"
            iconBg="bg-warning/10"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-surface border border-border-subtle rounded-card p-6">
            <p className="text-sm font-medium text-ink-primary mb-1">Month-on-month expenses</p>
            <p className="text-xs text-ink-secondary mb-5">Compared vs prior months</p>
            <MiniBarChart data={monthlyBars} maxValue={maxExpense} />
          </div>

          <div className="bg-surface border border-border-subtle rounded-card p-6">
            <p className="text-sm font-medium text-ink-primary mb-1">Category share</p>
            <p className="text-xs text-ink-secondary mb-5">% of total monthly spend</p>
            <MiniBarChart data={categoryBars} maxValue={100} />
          </div>
        </div>

        {/* Smart Observation */}
        <div className="bg-surface border border-accent/25 rounded-card p-6">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-[10px] bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Lightbulb size={18} className="text-accent-muted" />
            </div>
            <div>
              <p className="text-sm font-medium text-ink-primary mb-2">Smart Observation</p>
              <p className="text-sm text-ink-secondary leading-relaxed">
                Your food & dining spend has increased by{' '}
                <span className="text-warning font-medium">14%</span> compared to last month, while
                your income grew by{' '}
                <span className="text-positive font-medium">12%</span>. At your current savings rate
                of <span className="text-accent-muted font-medium">{formatPercent(savingsRate)}</span>,
                you're on track to build{' '}
                <span className="text-accent-muted font-medium">
                  {formatCurrency(getHighestCategory(transactions) ? 45360 : 0)}
                </span>{' '}
                in annual savings. Consider automating transfers to a high-yield account to lock in
                this momentum.
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
