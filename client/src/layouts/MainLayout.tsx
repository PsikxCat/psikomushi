import { Outlet } from 'react-router-dom'
import { Navbar, Footer } from '@/components'

const MainLayout = () => {
  return (
    <section className="flex_center_column mx-auto min-h-[100svh] w-full max-w-[2200px]">
      <Navbar />
      <div className="flex_center w-full flex-1">
        <Outlet />
      </div>
      <Footer />
    </section>
  )
}

export default MainLayout
