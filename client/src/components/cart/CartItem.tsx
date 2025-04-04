import { LuTrash2 } from 'react-icons/lu'
import { ProductType } from '@/types'
import { AspectRatio } from '@/components/ui/aspect-ratio'

interface CartItemProps {
  item: ProductType
  quantity: number
  onQuantityChange: (itemId: string, amount: number) => void
  onRemove: (itemId: string) => void
}

export default function CartItem({ item, quantity, onQuantityChange, onRemove }: CartItemProps) {
  return (
    <section className="grid grid-cols-1 gap-4 rounded-lg bg-earth-cream p-4 shadow-sm md:grid-cols-[1fr_3fr_1fr_1fr_auto]">
      {/* Imagen del producto */}
      <div className="h-32 overflow-hidden rounded-md md:h-full md:w-full">
        <div className="hidden md:block">
          <AspectRatio ratio={1 / 1}>
            <img src={item.image_urls[0]} alt={item.name} className="h-full w-full object-cover" />
          </AspectRatio>
        </div>

        <div className="block md:hidden">
          <AspectRatio ratio={16 / 9}>
            <img src={item.image_urls[0]} alt={item.name} className="object-cover" />
          </AspectRatio>
        </div>
      </div>

      {/* Información del producto */}
      <div className="flex max-w-[350px] flex-col md:pr-4">
        <h3 className="font-semibold text-earth-darkBrown">{item.name}</h3>
        <p className="text-sm text-earth-darkText">{item.short_description}</p>
        <p className="text-xs text-earth-mustard">{item.weight}</p>
      </div>

      {/* Precio unitario */}
      <div className="hidden items-center text-earth-darkText md:flex">
        <span>${item.unit_price.toLocaleString('es-CO')}</span>
      </div>

      {/* Control de cantidad */}
      <div className="flex items-center justify-center">
        <div className="flex items-center">
          <button
            onClick={() => onQuantityChange(item.id, -1)}
            className="h-6 w-6 rounded-md bg-earth-sand text-earth-darkBrown transition-colors hover:bg-earth-terracotta hover:text-white"
            disabled={quantity <= 1}
          >
            <span aria-hidden="true">-</span>
          </button>

          <span className="mx-2 w-8 text-center text-earth-darkBrown">{quantity}</span>

          <button
            onClick={() => onQuantityChange(item.id, 1)}
            className="h-6 w-6 rounded-md bg-earth-sand text-earth-darkBrown transition-colors hover:bg-earth-terracotta hover:text-white"
            disabled={quantity >= item.stock}
          >
            <span aria-hidden="true">+</span>
          </button>
        </div>
      </div>

      {/* Precio total por producto y botón eliminar */}
      <div className="relative flex items-center justify-center md:justify-between">
        <span className="font-medium text-earth-darkBrown">
          ${(quantity * item.unit_price).toLocaleString('es-CO')}
        </span>

        <button
          onClick={() => onRemove(item.id)}
          className="absolute right-0 top-1/2 ml-4 -translate-y-1/2 text-red-500 hover:text-red-700 md:top-0 md:translate-y-0"
        >
          <LuTrash2 size={16} />
        </button>
      </div>
    </section>
  )
}
