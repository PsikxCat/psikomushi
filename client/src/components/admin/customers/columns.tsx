import { type ColumnDef } from '@tanstack/react-table'
import { HiArrowsUpDown } from 'react-icons/hi2'

import { UserType } from '@/types'
import { Button } from '@/components/ui/button'

const styledHeader = (label: string) => <h4 className="font-bold uppercase">{label}</h4>

export const columns: ColumnDef<UserType>[] = [
  // Nombre
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
          {styledHeader('nombre')}
          <HiArrowsUpDown
            className={`ml-2 h-3 w-3 group-hover:text-earth-oliveGreen ${
              column.getIsSorted() === 'asc' ? 'rotate-180' : ''
            }`}
          />
        </Button>
      )
    },
    accessorKey: 'name',
    id: 'nombre',
    cell: ({ row }) => {
      const name = row.original.name
      const lastName = row.original.last_name

      return (
        <span className="capitalize">
          {lastName}, {name}
        </span>
      )
    },
    sortingFn: (rowA, rowB) => {
      const lastNameA = rowA.original.last_name?.toLowerCase() || ''
      const lastNameB = rowB.original.last_name?.toLowerCase() || ''

      // Comparar por apellido
      if (lastNameA < lastNameB) return -1
      if (lastNameA > lastNameB) return 1

      // Si los apellidos son iguales, comparar por nombre
      const nameA = rowA.original.name?.toLowerCase() || ''
      const nameB = rowB.original.name?.toLowerCase() || ''
      if (nameA < nameB) return -1
      if (nameA > nameB) return 1

      return 0
    },
  },
  // E-mail
  {
    header: () => styledHeader('e-mail'),
    accessorKey: 'email',
    id: 'email',
    cell: ({ row }) => row.original.email,
  },
  // Telefono
  {
    header: () => styledHeader('telefono'),
    accessorKey: 'phone_number',
    id: 'telefono',
    cell: ({ row }) => {
      const phoneNumber = row.original.phone_number
      return phoneNumber ? phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3') : ''
    },
  },
  // Direccion
  {
    header: () => styledHeader('direccion'),
    accessorKey: 'address',
    id: 'direccion',
    cell: ({ row }) => row.original.address,
  },
]
