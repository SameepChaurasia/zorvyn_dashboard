import { useState } from 'react'
import { Wallet, TrendingUp, TrendingDown, PiggyBank, Plus } from 'lucide-react'
import Layout from '../components/layout/Layout'
import Topbar from '../components/layout/Topbar'
import StatCard from '../components/ui/StatCard'
import Modal from '../components/ui/Modal'
import AddTransactionForm from '../components/ui/AddTransactionForm'
import BalanceTrendChart from '../components/charts/BalanceTrendChart'
import SpendingDonutChart from '../components/charts/SpendingDonutChart'
import IncomeExpenseBar from '../components/charts/IncomeExpenseBar'
import { useApp } from '../context/AppContext'
import {
  getTotalBalance,
  getTotalIncome,
  getTotalExpenses,
  getNetSavings,
} from '../utils/calculations'

export default function Overview() {
  const { transactions } = useApp()
  const [addOpen, setAddOpen] = useState(false)

  const balance  = getTotalBalance(transactions)
  const income   = getTotalIncome(transactions)
  const expenses = getTotalExpenses(transactions)
  const savings  = getNetSavings(transactions)

  return (
    <Layout>
      <Topbar
        title="Dashboard Overview"
        subtitle={`April 2026 · ${transactions.length} transactions`}
        onAdd={() => setAddOpen(true)}
      />

      <main className="flex-1 px-8 py-7 space-y-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="Total Balance"   value={balance}  change={8.2}  changeLabel="this month" icon={Wallet}       accent="accent" />
          <StatCard label="Monthly Income"  value={income}   change={12}   changeLabel="vs last mo" icon={TrendingUp}   accent="green"  />
          <StatCard label="Monthly Expenses" value={expenses} change={3.1}  changeLabel="vs last mo" icon={TrendingDown} accent="red"    />
          <StatCard label="Net Savings"     value={savings}  change={18.4} changeLabel="this month" icon={PiggyBank}    accent="amber"  />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
          <div className="bg-surface border border-border-subtle rounded-card p-6">
            <BalanceTrendChart />
          </div>
          <div className="bg-surface border border-border-subtle rounded-card p-6">
            <SpendingDonutChart />
          </div>
        </div>

        {/* Income vs Expense */}
        <div className="bg-surface border border-border-subtle rounded-card p-6">
          <IncomeExpenseBar />
        </div>
      </main>

      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Add Transaction">
        <AddTransactionForm onSuccess={() => setAddOpen(false)} />
      </Modal>
    </Layout>
  )
}
