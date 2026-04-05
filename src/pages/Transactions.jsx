import { useState } from 'react'
import { Search, SlidersHorizontal, Trash2, RefreshCw } from 'lucide-react'
import Layout from '../components/layout/Layout'
import Topbar from '../components/layout/Topbar'
import Modal from '../components/ui/Modal'
import AddTransactionForm from '../components/ui/AddTransactionForm'
import { CategoryBadge, TypeBadge } from '../components/ui/Badge'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'
import { useApp } from '../context/AppContext'
import { useTransactions } from '../hooks/useTransactions'
import { CATEGORIES } from '../data/mockData'
import { formatCurrency, formatDate, formatTxId } from '../utils/formatters'
import { CATEGORY_META } from '../data/mockData'

const SELECT_CLS =
  'bg-surface border border-border-base text-ink-secondary text-sm rounded-[9px] px-3 py-2 cursor-pointer transition-colors hover:border-border-base focus:border-accent focus:text-ink-primary'

export default function Transactions() {
  const { role, filters, setFilter, resetFilters, deleteTransaction } = useApp()
  const filtered = useTransactions()
  const [addOpen, setAddOpen] = useState(false)
  const isAdmin = role === 'admin'

  const hasActiveFilters = filters.search || filters.category || filters.type

  return (
    <Layout>
      <Topbar
        title="Transactions"
        subtitle={`${filtered.length} records · April 2026`}
        onAdd={isAdmin ? () => setAddOpen(true) : undefined}
      />

      <main className="flex-1 px-8 py-7">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-tertiary" />
            <input
              className="w-full bg-surface border border-border-base text-ink-primary text-sm rounded-[9px] pl-9 pr-3 py-2 placeholder-ink-tertiary transition-colors focus:border-accent focus:ring-1 focus:ring-accent/20"
              placeholder="Search merchant or category..."
              value={filters.search}
              onChange={e => setFilter('search', e.target.value)}
            />
          </div>

          {/* Category */}
          <select className={SELECT_CLS} value={filters.category} onChange={e => setFilter('category', e.target.value)}>
            <option value="">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* Type */}
          <select className={SELECT_CLS} value={filters.type} onChange={e => setFilter('type', e.target.value)}>
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* Sort */}
          <select className={SELECT_CLS} value={filters.sortBy} onChange={e => setFilter('sortBy', e.target.value)}>
            <option value="date-desc">Date (newest)</option>
            <option value="date-asc">Date (oldest)</option>
            <option value="amount-desc">Amount (high → low)</option>
            <option value="amount-asc">Amount (low → high)</option>
          </select>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-1.5 text-ink-secondary">
              <RefreshCw size={12} /> Clear
            </Button>
          )}
        </div>

        {/* Table */}
        <div className="bg-surface border border-border-subtle rounded-card overflow-hidden">
          {filtered.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No transactions found"
              description="Try adjusting your search or filter criteria"
              action={
                hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={resetFilters}>Clear all filters</Button>
                )
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-subtle">
                    {['Merchant', 'Date', 'Category', 'Type', 'Amount', isAdmin ? 'Actions' : ''].map((h, i) => (
                      <th
                        key={i}
                        className="text-left text-[10px] uppercase tracking-widest text-ink-tertiary font-medium px-5 py-3.5"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(tx => {
                    const meta = CATEGORY_META[tx.category]
                    return (
                      <tr
                        key={tx.id}
                        className="border-b border-border-subtle last:border-0 hover:bg-bg-tertiary transition-colors group"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-[9px] flex items-center justify-center text-sm flex-shrink-0"
                              style={{ background: meta?.bg }}
                            >
                              {meta?.emoji}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-ink-primary leading-tight">{tx.merchant}</p>
                              <p className="text-[11px] text-ink-tertiary font-mono mt-0.5">{formatTxId(tx.id)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-sm text-ink-secondary whitespace-nowrap">{formatDate(tx.date)}</td>
                        <td className="px-5 py-4"><CategoryBadge category={tx.category} /></td>
                        <td className="px-5 py-4"><TypeBadge type={tx.type} /></td>
                        <td className="px-5 py-4">
                          <span className={`text-sm font-medium tabular-nums ${tx.type === 'income' ? 'text-positive' : 'text-ink-primary'}`}>
                            {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          {isAdmin ? (
                            <button
                              onClick={() => deleteTransaction(tx.id)}
                              className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg flex items-center justify-center text-ink-tertiary hover:text-negative hover:bg-negative/10 transition-all duration-150"
                            >
                              <Trash2 size={13} />
                            </button>
                          ) : (
                            <span className="text-xs text-ink-tertiary">—</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Add Transaction">
        <AddTransactionForm onSuccess={() => setAddOpen(false)} />
      </Modal>
    </Layout>
  )
}
