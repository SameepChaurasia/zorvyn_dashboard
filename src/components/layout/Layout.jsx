import Sidebar from './Sidebar'
import Toast from '../ui/Toast'

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-bg-primary">
      <Sidebar />
      <div className="flex-1 ml-[220px] flex flex-col min-h-screen">
        {children}
      </div>
      <Toast />
    </div>
  )
}
