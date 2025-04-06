import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'

import { GlobalContext } from '@/context/GlobalContext'

export default function CartButton() {
  const { cartItems } = useContext(GlobalContext)

  const totalItems = cartItems.reduce((total, { quantity }) => total + quantity, 0)

  return (
    <section className="hidden h-full w-auto items-center justify-center min-[300px]:flex">
      <Link to="/cart" className="flex_center w-auto pr-3">
        <div className="relative flex h-full w-auto items-center justify-center">
          <FiShoppingCart className="h-6 w-6 text-white" />

          <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
            {totalItems}
          </span>
        </div>
      </Link>
    </section>
  )
}
