import { Navbar, Footer } from '@/components'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <section className="flex_center_column min-h-[100svh] w-full border border-green-500">
      <Navbar />
      <div className="flex_center w-full flex-1">{children}</div>
      <Footer />
    </section>
  )
}

export default MainLayout
