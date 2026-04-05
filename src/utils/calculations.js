export function getTotalIncome(transactions) {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
}

export function getTotalExpenses(transactions) {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
}

export function getNetSavings(transactions) {
  return getTotalIncome(transactions) - getTotalExpenses(transactions)
}

export function getSavingsRate(transactions) {
  const income = getTotalIncome(transactions)
  if (income === 0) return 0
  return getNetSavings(transactions) / income
}

export function getCategoryBreakdown(transactions) {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})
}

export function getHighestCategory(transactions) {
  const breakdown = getCategoryBreakdown(transactions)
  const entries = Object.entries(breakdown)
  if (entries.length === 0) return null
  return entries.reduce((max, cur) => (cur[1] > max[1] ? cur : max))
}

export function getCategoryData(transactions) {
  const breakdown = getCategoryBreakdown(transactions)
  const total = Object.values(breakdown).reduce((s, v) => s + v, 0)
  if (total === 0) return []

  return Object.entries(breakdown)
    .map(([name, value]) => ({
      name,
      value,
      percent: Math.round((value / total) * 100),
    }))
    .sort((a, b) => b.value - a.value)
}

export function getTotalBalance(transactions, startingBalance = 15450) {
  return startingBalance + getNetSavings(transactions)
}
