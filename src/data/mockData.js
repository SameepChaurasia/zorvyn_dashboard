export const CATEGORIES = [
  'Food',
  'Housing',
  'Transport',
  'Entertainment',
  'Health',
  'Utilities',
  'Income',
]

export const CATEGORY_META = {
  Food:          { color: '#fbbf24', bg: 'rgba(251,191,36,0.12)',  emoji: '🍔' },
  Housing:       { color: '#60a5fa', bg: 'rgba(96,165,250,0.12)',  emoji: '🏠' },
  Transport:     { color: '#34d399', bg: 'rgba(52,211,153,0.12)',  emoji: '🚗' },
  Entertainment: { color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', emoji: '🎬' },
  Health:        { color: '#f87171', bg: 'rgba(248,113,113,0.12)', emoji: '💊' },
  Utilities:     { color: '#2dd4bf', bg: 'rgba(45,212,191,0.12)',  emoji: '⚡' },
  Income:        { color: '#34d399', bg: 'rgba(52,211,153,0.12)',  emoji: '💵' },
}

export const INITIAL_TRANSACTIONS = [
  { id: 1,  merchant: 'Salary Deposit',    date: '2026-04-01', amount: 5200, category: 'Income',        type: 'income'  },
  { id: 2,  merchant: 'Freelance Payment', date: '2026-04-03', amount: 2800, category: 'Income',        type: 'income'  },
  { id: 3,  merchant: 'Dividend Income',   date: '2026-04-05', amount: 1400, category: 'Income',        type: 'income'  },
  { id: 4,  merchant: 'Rent Payment',      date: '2026-04-02', amount: 1800, category: 'Housing',       type: 'expense' },
  { id: 5,  merchant: 'Swiggy Order',      date: '2026-04-04', amount: 320,  category: 'Food',          type: 'expense' },
  { id: 6,  merchant: 'Zomato Premium',    date: '2026-04-06', amount: 180,  category: 'Food',          type: 'expense' },
  { id: 7,  merchant: 'Netflix',           date: '2026-04-07', amount: 149,  category: 'Entertainment', type: 'expense' },
  { id: 8,  merchant: 'Uber Cab',          date: '2026-04-08', amount: 420,  category: 'Transport',     type: 'expense' },
  { id: 9,  merchant: 'Apollo Pharmacy',   date: '2026-04-09', amount: 380,  category: 'Health',        type: 'expense' },
  { id: 10, merchant: 'Electricity Bill',  date: '2026-04-10', amount: 540,  category: 'Utilities',     type: 'expense' },
  { id: 11, merchant: 'Spotify',           date: '2026-04-11', amount: 119,  category: 'Entertainment', type: 'expense' },
  { id: 12, merchant: 'Grocery Store',     date: '2026-04-12', amount: 740,  category: 'Food',          type: 'expense' },
  { id: 13, merchant: 'Petrol Station',    date: '2026-04-13', amount: 200,  category: 'Transport',     type: 'expense' },
  { id: 14, merchant: 'Internet Bill',     date: '2026-04-14', amount: 360,  category: 'Utilities',     type: 'expense' },
  { id: 15, merchant: 'Restaurant Dinner', date: '2026-04-16', amount: 480,  category: 'Food',          type: 'expense' },
  { id: 16, merchant: 'Amazon Purchase',   date: '2026-04-17', amount: 890,  category: 'Entertainment', type: 'expense' },
  { id: 17, merchant: 'Gym Membership',    date: '2026-04-18', amount: 999,  category: 'Health',        type: 'expense' },
  { id: 18, merchant: 'Bus Pass',          date: '2026-04-20', amount: 200,  category: 'Transport',     type: 'expense' },
  { id: 19, merchant: 'Coffee Shop',       date: '2026-04-21', amount: 180,  category: 'Food',          type: 'expense' },
  { id: 20, merchant: 'Water Bill',        date: '2026-04-22', amount: 120,  category: 'Utilities',     type: 'expense' },
  { id: 21, merchant: 'Cinema Tickets',    date: '2026-04-23', amount: 212,  category: 'Entertainment', type: 'expense' },
  { id: 22, merchant: 'Lunch Out',         date: '2026-04-24', amount: 320,  category: 'Food',          type: 'expense' },
  { id: 23, merchant: 'Car Service',       date: '2026-04-25', amount: 800,  category: 'Transport',     type: 'expense' },
  { id: 24, merchant: 'Bonus Received',    date: '2026-04-28', amount: 2000, category: 'Income',        type: 'income'  },
]

export const MONTHLY_TREND = [
  { month: 'Nov', balance: 18200, income: 7800, expenses: 5100 },
  { month: 'Dec', balance: 19800, income: 8100, expenses: 6200 },
  { month: 'Jan', balance: 21000, income: 8200, expenses: 5180 },
  { month: 'Feb', balance: 20400, income: 8400, expenses: 4820 },
  { month: 'Mar', balance: 22800, income: 8800, expenses: 5450 },
  { month: 'Apr', balance: 24830, income: 9400, expenses: 5620 },
]
