import { Link } from 'react-router-dom'

import { Menu } from '@/components'

export default function Navbar() {
  return (
    <section className="sticky top-0 z-50 h-[max(70px,calc(50px+3vw))] w-full bg-black/80">
      <div className="h-full w-full">
        <nav className="ali flex h-full w-full items-center justify-between px-4">
          {/* Logo Psikoware */}
          <Link to="/" className="h-full w-auto">
            <img
              className="h-full w-auto cursor-pointer object-contain p-2"
              src="/logo-psikomushi.webp"
              alt="psikoware logo"
              loading="eager"
            />
          </Link>

          {/* Botón de carrito & Menu */}
          <div className="flex h-full w-auto items-center gap-4">
            <Link to="/cart" className="flex_center h-full w-auto">
              <div className="relative flex h-full w-auto items-center justify-center">carrito</div>
            </Link>

            <Menu />
          </div>
        </nav>
      </div>
    </section>
  )
}
