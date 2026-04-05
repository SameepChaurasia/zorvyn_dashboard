import { useState } from 'react'
import { Download, Trash2, User, DollarSign, Shield } from 'lucide-react'
import Layout from '../components/layout/Layout'
import Topbar from '../components/layout/Topbar'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import { useApp } from '../context/AppContext'
import { downloadCSV } from '../utils/exportCSV'

function SettingsSection({ title, description, children }) {
  return (
    <div className="bg-surface border border-border-subtle rounded-card p-6">
      <div className="mb-5">
        <p className="text-sm font-medium text-ink-primary">{title}</p>
        {description && <p className="text-xs text-ink-secondary mt-1">{description}</p>}
      </div>
      <div className="border-t border-border-subtle pt-5">{children}</div>
    </div>
  )
}

const INPUT_CLS = 'w-full bg-bg-tertiary border border-border-base text-ink-primary text-sm rounded-[9px] px-3 py-2.5 transition-colors focus:border-accent focus:ring-1 focus:ring-accent/20'

export default function Settings() {
  const { transactions, role, setRole, clearData, showToast } = useApp()
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false)
  const [displayName, setDisplayName] = useState('Sameep Chaurasia')
  const [currency, setCurrency] = useState('USD')

  function handleExport() {
    if (transactions.length === 0) { showToast('No data to export', 'error'); return }
    downloadCSV(transactions)
    showToast('CSV downloaded', 'success')
  }

  function handleClear() {
    clearData()
    setClearConfirmOpen(false)
  }

  function handleSave() {
    showToast('Preferences saved', 'success')
  }

  return (
    <Layout>
      <Topbar title="Settings" subtitle="Manage your preferences" />

      <main className="flex-1 px-8 py-7">
        <div className="max-w-xl space-y-5">

          {/* Profile */}
          <SettingsSection
            title="Profile"
            description="Your display name and preferences"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-ink-secondary mb-1.5">Display Name</label>
                <input className={INPUT_CLS} value={displayName} onChange={e => setDisplayName(e.target.value)} />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-ink-secondary mb-1.5">Currency</label>
                <select className={INPUT_CLS} value={currency} onChange={e => setCurrency(e.target.value)}>
                  <option value="USD">USD — US Dollar</option>
                  <option value="INR">INR — Indian Rupee</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="GBP">GBP — British Pound</option>
                </select>
              </div>
              <Button variant="primary" size="sm" onClick={handleSave}>Save Changes</Button>
            </div>
          </SettingsSection>

          {/* Role */}
          <SettingsSection
            title="Access Role"
            description="Switch between Admin and Viewer mode to simulate role-based access"
          >
            <div className="flex items-center gap-3">
              <select
                className={INPUT_CLS}
                value={role}
                onChange={e => setRole(e.target.value)}
                style={{ maxWidth: 200 }}
              >
                <option value="admin">Admin — Full Access</option>
                <option value="viewer">Viewer — Read Only</option>
              </select>
              <span className={`text-xs px-3 py-1.5 rounded-pill font-medium ${role === 'admin' ? 'bg-accent/15 text-accent-muted' : 'bg-warning/10 text-warning'}`}>
                {role === 'admin' ? 'Admin Active' : 'Viewer Active'}
              </span>
            </div>
            <p className="text-xs text-ink-tertiary mt-3">
              Admin can add, edit, and delete transactions. Viewer has read-only access.
            </p>
          </SettingsSection>

          {/* Data */}
          <SettingsSection
            title="Data Management"
            description="Export or reset your transaction data"
          >
            <div className="flex flex-wrap gap-3">
              <Button variant="ghost" size="md" onClick={handleExport} className="gap-2">
                <Download size={14} /> Export as CSV
              </Button>
              <Button variant="danger" size="md" onClick={() => setClearConfirmOpen(true)} className="gap-2">
                <Trash2 size={14} /> Clear All Data
              </Button>
            </div>
            <p className="text-xs text-ink-tertiary mt-3">
              {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} currently stored in localStorage.
            </p>
          </SettingsSection>

        </div>
      </main>

      {/* Confirm Clear Modal */}
      <Modal isOpen={clearConfirmOpen} onClose={() => setClearConfirmOpen(false)} title="Clear All Data">
        <div className="space-y-4">
          <p className="text-sm text-ink-secondary leading-relaxed">
            This will permanently delete all <strong className="text-ink-primary">{transactions.length} transactions</strong> from your local storage. This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" size="md" onClick={() => setClearConfirmOpen(false)}>Cancel</Button>
            <Button variant="danger" size="md" onClick={handleClear}>Yes, Clear All</Button>
          </div>
        </div>
      </Modal>
    </Layout>
  )
}
