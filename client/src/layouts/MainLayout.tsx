import { Outlet } from 'react-router-dom'
import { Navbar, Footer } from '@/components'

const MainLayout = () => {
  return (
    <section className="flex_center_column min-h-[100svh] w-full border border-green-500">
      <Navbar />
      <div className="flex_center w-full flex-1">
        <Outlet />
      </div>
      <Footer />
    </section>
  )
}

export default MainLayout
