import { type ColumnDef } from '@tanstack/react-table'

import { ProductType } from '@/types'
import { Checkbox } from '@/components/ui/checkbox'

const styledHeader = (label: string) => <h4 className="font-bold uppercase">{label}</h4>

export const columns: ColumnDef<ProductType>[] = [
  // Checkbox para seleccionar filas
  {
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected() || (table.getIsSomeRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Seleccionar todos"
      />
    ),
    id: 'select',
    cell: ({ row }) => (
      <Checkbox
        className="m-auto"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // Imagen del producto
  // {
  //   header: () => styledHeader('imagen'),
  //   id: 'image',
  //   cell: ({ row }) => {
  //     const image = row.getValue('image_urls')?.[0]
  //     return (
  //       <div className="flex items-center justify-center">
  //         <img src={image} alt="Imagen del producto" className="h-12 w-12 rounded-full" />
  //       </div>
  //     )
  //   },
  // },
  // Referencia
  {
    header: () => styledHeader('ref'),
    accessorKey: 'ref',
    cell: ({ row }) => row.getValue('ref'),
  },
]
