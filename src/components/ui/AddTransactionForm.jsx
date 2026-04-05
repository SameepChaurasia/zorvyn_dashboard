import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { CATEGORIES } from '../../data/mockData'
import Button from './Button'

const today = new Date().toISOString().split('T')[0]

const empty = {
  merchant: '',
  amount: '',
  date: today,
  category: 'Food',
  type: 'expense',
}

export default function AddTransactionForm({ onSuccess }) {
  const { addTransaction } = useApp()
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  function validate() {
    const e = {}
    if (!form.merchant.trim())     e.merchant = 'Merchant is required'
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
                                   e.amount = 'Enter a valid amount'
    if (!form.date)                e.date = 'Date is required'
    return e
  }

  function handleSubmit() {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    addTransaction({ ...form, amount: Number(form.amount) })
    setForm(empty)
    onSuccess?.()
  }

  const inputCls =
    'w-full bg-bg-tertiary border border-border-base text-ink-primary text-sm rounded-[9px] px-3 py-2.5 placeholder-ink-tertiary transition-colors focus:border-accent focus:ring-1 focus:ring-accent/20'

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[11px] uppercase tracking-widest text-ink-secondary mb-1.5">Merchant</label>
        <input
          className={inputCls}
          placeholder="e.g. Starbucks"
          value={form.merchant}
          onChange={e => set('merchant', e.target.value)}
        />
        {errors.merchant && <p className="text-negative text-xs mt-1">{errors.merchant}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] uppercase tracking-widest text-ink-secondary mb-1.5">Amount ($)</label>
          <input
            className={inputCls}
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={form.amount}
            onChange={e => set('amount', e.target.value)}
          />
          {errors.amount && <p className="text-negative text-xs mt-1">{errors.amount}</p>}
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-widest text-ink-secondary mb-1.5">Date</label>
          <input
            className={inputCls}
            type="date"
            value={form.date}
            onChange={e => set('date', e.target.value)}
          />
          {errors.date && <p className="text-negative text-xs mt-1">{errors.date}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] uppercase tracking-widest text-ink-secondary mb-1.5">Category</label>
          <select
            className={inputCls}
            value={form.category}
            onChange={e => set('category', e.target.value)}
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-widest text-ink-secondary mb-1.5">Type</label>
          <select
            className={inputCls}
            value={form.type}
            onChange={e => set('type', e.target.value)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 justify-end pt-2">
        <Button variant="ghost" size="md" type="button" onClick={() => setForm(empty)}>
          Reset
        </Button>
        <Button variant="primary" size="md" type="button" onClick={handleSubmit}>
          Add Transaction
        </Button>
      </div>
    </div>
  )
}
