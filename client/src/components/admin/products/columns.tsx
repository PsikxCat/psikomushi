import { type ColumnDef } from '@tanstack/react-table'
import { HiArrowDown } from 'react-icons/hi2'

import { ProductType } from '@/types'
import { Button } from '@/components/ui/button'

const styledHeader = (label: string) => <h4 className="font-bold uppercase">{label}</h4>

export const columns: ColumnDef<ProductType>[] = [
  //Imagen del producto
  {
    header: () => styledHeader('imagen'),
    id: 'Imagen',
    accessorKey: 'image_urls',
    cell: ({ row }) => {
      const image: string = row.original.image_urls[0]
      return (
        <div className="m-0 flex items-center justify-center p-0">
          <img src={image} alt="Imagen del producto" className="m-0 h-12 w-12 rounded-xl p-0" />
        </div>
      )
    },
  },
  // Referencia
  {
    header: () => styledHeader('referencia'),
    accessorKey: 'ref',
    cell: ({ row }) => row.getValue('ref'),
  },
  // Nombre
  {
    header: () => styledHeader('nombre'),
    accessorKey: 'name',
    id: 'nombre',
    cell: ({ row }) => row.original.name,
  },
  // Presentacion
  {
    header: () => styledHeader('presentación'),
    accessorKey: 'weight',
    id: 'presentación',
    cell: ({ row }) => row.original.weight,
  },
  // Precio
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="group hover:cursor-pointer"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}
        >
          {styledHeader('precio')}
          <HiArrowDown
            className={`ml-2 h-3 w-3 group-hover:text-earth-oliveGreen ${
              column.getIsSorted() === 'asc' ? 'rotate-180' : ''
            }`}
          />
        </Button>
      )
    },
    accessorKey: 'unit_price',
    id: 'precio',
    cell: ({ row }) => {
      const price: number = row.original.unit_price
      return <div>$ {price?.toLocaleString('es-CO')}</div>
    },
    sortingFn: 'auto',
  },
  // Stock
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="group hover:cursor-pointer"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}
        >
          {styledHeader('stock')}
          <HiArrowDown
            className={`ml-2 h-3 w-3 group-hover:text-earth-oliveGreen ${
              column.getIsSorted() === 'asc' ? 'rotate-180' : ''
            }`}
          />
        </Button>
      )
    },
    accessorKey: 'stock',
    cell: ({ row }) => row.getValue('stock'),
    sortingFn: 'auto',
  },
]
