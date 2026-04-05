import { Plus, Download } from 'lucide-react'
import Button from '../ui/Button'
import { downloadCSV } from '../../utils/exportCSV'
import { useApp } from '../../context/AppContext'

export default function Topbar({ title, subtitle, onAdd }) {
  const { role, transactions, showToast } = useApp()
  const isAdmin = role === 'admin'

  function handleExport() {
    if (transactions.length === 0) {
      showToast('No transactions to export', 'error')
      return
    }
    downloadCSV(transactions)
    showToast('CSV exported successfully', 'success')
  }

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 bg-bg-primary/90 backdrop-blur-md border-b border-border-subtle">
      <div>
        <h1 className="font-serif text-[20px] text-ink-primary leading-tight">{title}</h1>
        <p className="text-xs text-ink-secondary mt-0.5">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={handleExport} className="gap-2">
          <Download size={14} />
          Export CSV
        </Button>

        {isAdmin && onAdd && (
          <Button variant="primary" size="sm" onClick={onAdd} className="gap-2">
            <Plus size={14} />
            Add Transaction
          </Button>
        )}

        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-teal flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
          AK
        </div>
      </div>
    </header>
  )
}
