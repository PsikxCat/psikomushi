import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiShoppingCart, FiArrowLeft } from 'react-icons/fi'
import { LuCheckCircle } from 'react-icons/lu'

import { GlobalContext } from '@/context/GlobalContext'
import CartItem from '@/components/cart/CartItem'

export default function CartPage() {
  const { cartItems, handleRemoveFromCart, handleClearCart } = useContext(GlobalContext)
  const navigate = useNavigate()

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})
  const [subtotal, setSubtotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(0)

  // Inicializar cantidades cuando cambian los items del carrito
  useEffect(() => {
    const newQuantities: { [key: string]: number } = {}
    cartItems.forEach((item) => {
      newQuantities[item.id] = quantities[item.id] || 1
    })
    setQuantities(newQuantities)
  }, [cartItems])

  // Calcular totales cuando cambian las cantidades o los items
  useEffect(() => {
    const calculatedSubtotal = cartItems.reduce(
      (sum, item) => sum + item.unit_price * (quantities[item.id] || 1),
      0,
    )
    const calculatedTax = calculatedSubtotal * 0.19 // IVA del 19%

    setSubtotal(calculatedSubtotal)
    setTax(calculatedTax)
    setTotal(calculatedSubtotal + calculatedTax)
  }, [cartItems, quantities])

  const handleQuantityChange = (itemId: string, amount: number) => {
    setQuantities((prev) => {
      const currentQty = prev[itemId] || 1
      const newQty = Math.max(1, currentQty + amount) // Mínimo 1 unidad
      return { ...prev, [itemId]: newQty }
    })
  }

  const handleCheckout = () => {
    // >>>>>>>>>>>> Lógica para proceder al pago <<<<<<<<<<<<
    alert('Funcionalidad de checkout en desarrollo')
  }

  if (cartItems.length === 0) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center rounded-lg bg-earth-cream p-8 shadow-md">
        <FiShoppingCart className="h-16 w-16 text-earth-lightBrown" />

        <h2 className="mt-6 text-2xl font-semibold text-earth-darkBrown">Tu carrito está vacío</h2>
        <p className="mt-2 text-earth-darkText">Añade algunos productos para empezar a comprar.</p>

        <button
          className="mt-8 rounded-md bg-earth-terracotta px-6 py-3 font-medium text-white transition-colors hover:bg-earth-darkBrown"
          onClick={() => navigate('/store')}
        >
          Ir a la tienda
        </button>
      </section>
    )
  }

  return (
    <section className="px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold text-earth-terracotta">Tu carrito de compras</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Lista de productos */}
        <section className="col-span-1 space-y-4 lg:col-span-2">
          {/* Encabezado de la tabla */}
          <div className="hidden rounded-t-lg bg-earth-sand p-4 md:grid md:grid-cols-[1fr_3fr_1fr_1fr_auto]">
            <div className="font-medium text-earth-darkBrown">Producto</div>
            <div className="max-w-[350px] font-medium text-earth-darkBrown">Descripción</div>
            <div className="font-medium text-earth-darkBrown">Precio</div>
            <div className="flex justify-center pr-4 font-medium text-earth-darkBrown">Cantidad</div>
            <div className="pl-2 pr-7 font-medium text-earth-darkBrown">Total</div>
          </div>

          {/* Productos en el carrito */}
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              quantity={quantities[item.id] || 1}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemoveFromCart}
            />
          ))}

          {/* Botones de acción */}
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => navigate('/store')}
              className="flex items-center rounded-md border border-earth-sand px-4 py-2 text-earth-sand transition-colors hover:bg-earth-sand hover:text-earth-darkText"
            >
              <FiArrowLeft className="mr-2" />
              Seguir comprando
            </button>

            <button
              onClick={handleClearCart}
              className="rounded-md border border-red-500 px-4 py-2 text-red-500 transition-colors hover:bg-red-500 hover:text-white"
            >
              Vaciar carrito
            </button>
          </div>
        </section>

        {/* Resumen de la compra */}
        <section className="col-span-1 w-full md:mx-auto md:min-w-[600px] md:max-w-[800px] lg:mx-0 lg:min-w-0 lg:max-w-none">
          <div className="rounded-lg bg-earth-sand p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-earth-darkBrown">Resumen de la orden</h2>

            <div className="space-y-3 border-b border-earth-lightBrown pb-4">
              <div className="flex justify-between">
                <span className="text-earth-darkText">Subtotal</span>
                <span className="font-medium text-earth-darkBrown">${subtotal.toLocaleString('es-CO')}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-earth-darkText">IVA (19%)</span>
                <span className="font-medium text-earth-darkBrown">${tax.toLocaleString('es-CO')}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-earth-darkText">Envío</span>
                <span className="font-medium text-green-600">Gratis</span>
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <span className="text-lg font-semibold text-earth-darkBrown">Total</span>
              <span className="text-lg font-bold text-earth-terracotta">
                ${total.toLocaleString('es-CO')}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-6 w-full rounded-md bg-earth-terracotta py-3 font-medium text-white transition-colors hover:bg-earth-darkBrown"
            >
              Proceder al pago
            </button>

            {/* Información adicional */}
            <div className="mt-6 border-t border-earth-lightBrown pt-4 text-sm text-earth-darkText">
              <p className="flex items-center">
                <LuCheckCircle className="mr-2 text-green-600" size={18} />
                Envío gratuito en todos los pedidos
              </p>
              <p className="mt-2 flex items-center">
                <LuCheckCircle className="mr-2 text-green-600" size={18} />
                Métodos de pago seguros
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
