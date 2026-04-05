import { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { INITIAL_TRANSACTIONS } from '../data/mockData'

const AppContext = createContext(null)

const STORAGE_KEY = 'zorvyn_state'

const initialState = {
  transactions: INITIAL_TRANSACTIONS,
  role: 'admin',
  filters: {
    search: '',
    category: '',
    type: '',
    sortBy: 'date-desc',
  },
  toast: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      }

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      }

    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
      }

    case 'SET_ROLE':
      return { ...state, role: action.payload }

    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, [action.key]: action.value },
      }

    case 'RESET_FILTERS':
      return { ...state, filters: initialState.filters }

    case 'SHOW_TOAST':
      return { ...state, toast: action.payload }

    case 'HIDE_TOAST':
      return { ...state, toast: null }

    case 'CLEAR_DATA':
      return { ...state, transactions: [] }

    case 'HYDRATE':
      return { ...state, ...action.payload }

    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        dispatch({ type: 'HYDRATE', payload: parsed })
      }
    } catch {
      // If parsing fails, just use initial state
    }
  }, [])

  // Persist transactions and role to localStorage on every change
  useEffect(() => {
    try {
      const toSave = {
        transactions: state.transactions,
        role: state.role,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
    } catch {
      // localStorage might be full or blocked
    }
  }, [state.transactions, state.role])

  // Auto-dismiss toast after 3 seconds
  useEffect(() => {
    if (!state.toast) return
    const timer = setTimeout(() => dispatch({ type: 'HIDE_TOAST' }), 3000)
    return () => clearTimeout(timer)
  }, [state.toast])

  const addTransaction = useCallback((tx) => {
    const newTx = { ...tx, id: Date.now() }
    dispatch({ type: 'ADD_TRANSACTION', payload: newTx })
    dispatch({ type: 'SHOW_TOAST', payload: { message: 'Transaction added', variant: 'success' } })
  }, [])

  const deleteTransaction = useCallback((id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id })
    dispatch({ type: 'SHOW_TOAST', payload: { message: 'Transaction deleted', variant: 'error' } })
  }, [])

  const setRole = useCallback((role) => {
    dispatch({ type: 'SET_ROLE', payload: role })
    dispatch({ type: 'SHOW_TOAST', payload: { message: `Role switched to ${role}`, variant: 'info' } })
  }, [])

  const setFilter = useCallback((key, value) => {
    dispatch({ type: 'SET_FILTER', key, value })
  }, [])

  const resetFilters = useCallback(() => {
    dispatch({ type: 'RESET_FILTERS' })
  }, [])

  const showToast = useCallback((message, variant = 'info') => {
    dispatch({ type: 'SHOW_TOAST', payload: { message, variant } })
  }, [])

  const clearData = useCallback(() => {
    dispatch({ type: 'CLEAR_DATA' })
    dispatch({ type: 'SHOW_TOAST', payload: { message: 'All data cleared', variant: 'error' } })
  }, [])

  const value = {
    ...state,
    addTransaction,
    deleteTransaction,
    setRole,
    setFilter,
    resetFilters,
    showToast,
    clearData,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
