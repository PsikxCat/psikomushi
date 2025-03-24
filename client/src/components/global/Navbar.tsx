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

          {/* Menu */}
          <Menu />
        </nav>
      </div>
    </section>
  )
}
