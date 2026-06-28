import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const MainLayout = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background elements */}
      <div className="fixed inset-0 z-[-1] bg-dark-bg">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-secondary/10 rounded-full blur-[120px]" />
      </div>
      
      <Navbar />
      
      <main className="flex-grow pt-24">
        <Outlet />
      </main>
      
      <footer className="py-8 text-center text-text-muted text-sm border-t border-white/5 mt-auto">
        <p>&copy; {new Date().getFullYear()} Mohd Faizan. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

export default MainLayout
