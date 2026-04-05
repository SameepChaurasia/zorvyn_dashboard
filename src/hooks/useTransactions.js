import { useMemo } from 'react'
import { useApp } from '../context/AppContext'

export function useTransactions() {
  const { transactions, filters } = useApp()
  const { search, category, type, sortBy } = filters

  const filtered = useMemo(() => {
    let result = [...transactions]

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(
        t =>
          t.merchant.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      )
    }

    if (category) {
      result = result.filter(t => t.category === category)
    }

    if (type) {
      result = result.filter(t => t.type === type)
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':  return b.date.localeCompare(a.date)
        case 'date-asc':   return a.date.localeCompare(b.date)
        case 'amount-desc': return b.amount - a.amount
        case 'amount-asc':  return a.amount - b.amount
        default:           return 0
      }
    })

    return result
  }, [transactions, search, category, type, sortBy])

  return filtered
}
