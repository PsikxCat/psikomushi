import { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

import { GlobalContext } from '@/context/GlobalContext'
import LogoutButton from './LogoutButton'

export default function Menu() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { pathname } = useLocation()
  const isAdminPath = pathname.includes('/admin')

  const { session, setSession } = useContext(GlobalContext)

  const toogleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  // ################ ACA HAY BASTANTE POR CORREGIR 🔽🔽🔽🔽🔽🔽🔽🔽🔽 ###################################################################

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
          {!session && (
            <Link to="/auth/login" onClick={toogleOpen}>
              Ingresa
            </Link>
          )}

          {session && !isAdminPath ? (
            <Link to="/admin/dashboard" onClick={toogleOpen}>
              Dashboard
            </Link>
          ) : (
            <Link to="/" onClick={toogleOpen}>
              Ir a Home
            </Link>
          )}

          {session && <LogoutButton setSession={setSession} />}
        </div>
      )}

      {/* backdrop */}
      {isOpen && <div className="fixed left-0 top-0 z-30 h-full w-full" onClick={toogleOpen} />}
    </section>
  )
}
