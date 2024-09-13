import { Navbar, Footer } from '@/components'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex_center_column min-h-[100svh] w-full">
      <Navbar />
      <div className="flex_center container w-full flex-1">{children}</div>
      <Footer />
    </div>
  )
}

export default MainLayout
