import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

interface MenuProps {
  isLoggedIn: boolean
  isAdmin: boolean
}

export default function Menu({ isLoggedIn, isAdmin }: MenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { pathname } = useLocation()
  const isAdminPath = pathname.includes('/admin')

  const toogleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <section className="absolute right-[50px]">
      <div
        className="flex_center cursor-pointer gap-1 text-[12px] text-accent transition"
        onClick={toogleOpen}
      >
        <div className="w-[30px] overflow-hidden rounded-full sm:w-[45px]">
          <img src="https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Jasper" />
        </div>

        {isOpen ? <FaAngleUp /> : <FaAngleDown />}
      </div>

      {/*  menu */}
      {isOpen && (
        <div className="absolute right-0 top-[50px] z-50 flex w-[120px] flex-col gap-2 rounded-md border bg-background px-4 py-3">
          {!isLoggedIn && (
            <Link to="/auth/login" onClick={toogleOpen}>
              Ingresa
            </Link>
          )}

          {isLoggedIn && isAdmin && !isAdminPath ? (
            <Link to="/admin/dashboard" onClick={toogleOpen}>
              Dashboard
            </Link>
          ) : (
            <Link to="/" onClick={toogleOpen}>
              Ir a Home
            </Link>
          )}

          {isLoggedIn && (
            <Link to="/logout" onClick={toogleOpen}>
              Salir
            </Link>
          )}
        </div>
      )}

      {/* backdrop */}
      {isOpen && <div className="fixed left-0 top-0 z-30 h-full w-full" onClick={toogleOpen} />}
    </section>
  )
}
