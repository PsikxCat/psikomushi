import { Input } from '@/components/ui/input'

interface FilterTableProps {
  value: string
  onChange: (value: string) => void
  placeholderColumns: string[]
}

export default function FilterTable({ value, onChange, placeholderColumns }: FilterTableProps) {
  const placeholder =
    placeholderColumns.length === 1
      ? `Filtrar por ${placeholderColumns[0]}`
      : `Filtrar por ${placeholderColumns.slice(0, -1).join(', ')}${placeholderColumns.length > 1 ? ' o ' + placeholderColumns[placeholderColumns.length - 1] : ''}...`

  return (
    <div className="flex w-full items-center">
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="max-w-[350px] bg-earth-mauve placeholder:text-earth-lightBrown"
      />
    </div>
  )
}
