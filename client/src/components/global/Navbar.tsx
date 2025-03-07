import { Link } from 'react-router-dom'

import { Menu } from '@/components'

export default function Navbar() {
  const isLoggedIn = false // Valor de ejemplo
  const isAdmin = true // Valor de ejemplo

  return (
    <section className="flex_center sticky top-0 h-[calc(50px+5vw)] w-full border-b bg-black/80">
      <div className="h-full w-full">
        <nav className="flex_center h-full w-full">
          {/* Logo Psikoware */}
          <Link to="/" className="h-full w-auto">
            <img
              className="h-full w-auto cursor-pointer object-contain p-2"
              src="/logo-psikomushi.webp"
              alt="psikoware logo"
              loading="eager"
            />
          </Link>

          {/* Menu */}
          <Menu isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
        </nav>
      </div>
    </section>
  )
}
