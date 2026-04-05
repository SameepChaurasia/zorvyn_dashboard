export function downloadCSV(transactions, filename = 'zorvyn_transactions.csv') {
  if (!transactions || transactions.length === 0) return

  const headers = ['ID', 'Merchant', 'Date', 'Category', 'Type', 'Amount']

  const rows = transactions.map(t => [
    `#TX-${String(t.id).padStart(4, '0')}`,
    `"${t.merchant}"`,
    t.date,
    t.category,
    t.type.charAt(0).toUpperCase() + t.type.slice(1),
    t.type === 'income' ? `+${t.amount}` : `-${t.amount}`,
  ])

  const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
