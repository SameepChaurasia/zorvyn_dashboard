import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, ArrowLeftRight, Lightbulb, Settings, ChevronDown,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { cn } from '../../utils/cn'

const NAV_ITEMS = [
  { path: '/',             label: 'Overview',     icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight,  badge: true },
  { path: '/insights',     label: 'Insights',     icon: Lightbulb },
  { path: '/settings',     label: 'Settings',     icon: Settings },
]

export default function Sidebar() {
  const { role, setRole, transactions } = useApp()
  const txCount = transactions.length

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-[220px] flex flex-col bg-bg-secondary border-r border-border-subtle z-40">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-border-subtle">
        <p className="font-serif text-[22px] text-ink-primary leading-none">Zorvyn</p>
        <p className="text-[10px] uppercase tracking-[2px] text-accent-muted mt-1">Finance Suite</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto scrollbar-hide">
        <p className="text-[10px] uppercase tracking-[1.5px] text-ink-tertiary px-2.5 py-1.5 mb-1">
          Main
        </p>

        {NAV_ITEMS.map(({ path, label, icon: Icon, badge }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-2.5 px-3 py-2.5 rounded-[9px] text-[13.5px] font-medium transition-all duration-150',
                isActive
                  ? 'bg-surface-hover text-ink-primary'
                  : 'text-ink-secondary hover:bg-surface hover:text-ink-primary'
              )
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={cn(
                    'w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors',
                    isActive ? 'bg-accent' : 'bg-border-base group-hover:bg-ink-tertiary'
                  )}
                />
                <Icon size={15} className="flex-shrink-0" />
                <span>{label}</span>
                {badge && (
                  <span className="ml-auto bg-accent text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-pill">
                    {txCount}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Role Switcher */}
      <div className="px-3 py-4 border-t border-border-subtle">
        <p className="text-[10px] uppercase tracking-[1.5px] text-ink-tertiary px-1 mb-2">Active Role</p>
        <div className="relative">
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full appearance-none bg-surface border border-border-base text-ink-primary text-xs rounded-[9px] px-3 py-2 pr-7 cursor-pointer transition-colors hover:border-accent/50 focus:border-accent focus:ring-1 focus:ring-accent/20"
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
          <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-tertiary pointer-events-none" />
        </div>

        <div className={cn(
          'mt-2 text-center text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-lg',
          role === 'admin'
            ? 'bg-accent/15 text-accent-muted'
            : 'bg-warning/10 text-warning'
        )}>
          {role === 'admin' ? 'Full Access' : 'View Only'}
        </div>
      </div>
    </aside>
  )
}
