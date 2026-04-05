import { Routes, Route, Navigate } from 'react-router-dom'
import Overview     from './pages/Overview'
import Transactions from './pages/Transactions'
import Insights     from './pages/Insights'
import Settings     from './pages/Settings'

export default function App() {
  return (
    <Routes>
      <Route path="/"             element={<Overview />}     />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/insights"     element={<Insights />}     />
      <Route path="/settings"     element={<Settings />}     />
      <Route path="*"             element={<Navigate to="/" replace />} />
    </Routes>
  )
}
