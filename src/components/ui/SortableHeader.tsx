import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Column } from "@tanstack/react-table"

interface SortableHeaderProps<TData> {
  column: Column<TData, unknown>
  title: string
}

export function SortableHeader<TData>({ column, title }: SortableHeaderProps<TData>) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="px-2"
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  )
}
