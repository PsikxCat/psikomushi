import { useState } from 'react'
import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  FilterFn,
  FilterFnOption,
} from '@tanstack/react-table'

import { Spinner, FilterTable } from '@/components'
// import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface FilterConfig<TData> {
  multiColumnFilter: FilterFn<TData>
  placeholderColumns: string[]
}

interface AdminTableProps<TData> {
  columns: ColumnDef<TData, TData[keyof TData]>[]
  data: TData[]
  isLoading?: boolean
  filterConfig: FilterConfig<TData>
}

export default function AdminTable<TData>({
  columns,
  data,
  isLoading,
  filterConfig,
}: AdminTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    Imagen: false,
  })
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

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

    filterFns: {
      multiColumn: filterConfig.multiColumnFilter,
    },

    globalFilterFn: 'multiColumn' as FilterFnOption<TData>,
    onGlobalFilterChange: setGlobalFilter,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  })

  return (
    <div className="relative p-2">
      {/* Busqueda por nombre y referncia & Visibilidad de columnas */}
      <section className="flex items-center space-x-2 py-4">
        {/* Busqueda */}
        <FilterTable
          value={globalFilter}
          onChange={setGlobalFilter}
          placeholderColumns={filterConfig.placeholderColumns}
        />

        {/* Visibilidad */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="hover:bg-earth-terracotta">
            <Button variant="outline" className="ml-auto text-earth-darkBrown">
              Ver columnas
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="bg-earth-lightBrown font-medium text-earth-darkBrown">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize hover:bg-earth-terracotta"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {/* Tabla */}
      <section className="mt-4">
        {isLoading ? (
          <div className="flex h-[50vh] w-full items-center justify-center">
            <Spinner visible={isLoading} />
          </div>
        ) : (
          <div className="rounded-md border">
            <Table className="text-earth-darkBrown">
              {/* Headers */}
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="h-10 bg-earth-terracotta">
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className="h-10 text-center text-earth-sand">
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>

              {/* Body */}
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row, index) => (
                    <TableRow
                      className={`h-10 text-center font-bold hover:bg-earth-darkBrown hover:text-earth-cream ${
                        index % 2 === 1 ? 'bg-earth-mauve' : 'bg-earth-lightBrown'
                      }`}
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No se encontraron resultados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </section>

      {/* Paginacion */}
      <section className="flex items-center justify-end space-x-3 px-2 py-4">
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value))
            // table.setPageIndex(0)
          }}
        >
          <SelectTrigger className="h-8 w-[60px] hover:bg-earth-terracotta hover:text-earth-cream">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>

          <SelectContent side="top" className="w-[60px] bg-earth-lightBrown text-earth-darkBrown">
            {[5, 10].map((pageSize) => (
              <SelectItem className="focus:bg-earth-terracotta" key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex space-x-1">
          <Button
            className="hover:bg-earth-terracotta hover:text-earth-cream"
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>

          <Button
            className="hover:bg-earth-terracotta hover:text-earth-cream"
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </section>
    </div>
  )
}
