import { useState } from 'react'
import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  // flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table'

import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

interface AdminTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export default function AdminTable<TData, TValue>({ columns, data }: AdminTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    columns,
    data,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="relative border border-red-700 p-2">
      {/* Busqueda por nombre y referncia & Visibilidad de columnas */}
      <section className="flex items-center py-4">
        {/* Busqueda */}
        <Input
          placeholder="Buscar nombre o ref"
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(e) => table.getColumn('name')?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />

        {/* Visibilidad */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto text-earth-darkBrown">
              Ver columnas
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label htmlFor="col1">Columna 1</label>
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="col2">Columna 2</label>
              </div>
              {/* Add more columns as needed */}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </div>
  )
}
