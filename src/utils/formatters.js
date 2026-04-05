export function formatCurrency(amount, showSign = false) {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(amount))

  if (showSign) {
    return amount >= 0 ? `+${formatted}` : `-${formatted}`
  }

  return formatted
}

export function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatPercent(value, decimals = 1) {
  return `${(value * 100).toFixed(decimals)}%`
}

export function truncate(str, maxLength = 24) {
  if (!str) return ''
  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str
}

export function formatTxId(id) {
  return `#TX-${String(id).padStart(4, '0')}`
}
