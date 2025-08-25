'use client'

import { useRouter } from 'next/navigation'
import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'

interface EditButtonProps {
  id: string | number
  editUrl?: string
  label?: string
}

export default function EditButton({
  id,
  editUrl = '/edit?id=',
  label = 'Edit',
}: EditButtonProps) {
  const router = useRouter()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className="bg-[var(--color-chart-2)] text-white hover:bg-[color-mix(in oklch, var(--color-chart-2) 80%, black)] px-3 py-2 rounded-md shadow transition-colors"
          size="sm"
          onClick={() => router.push(`${editUrl}${id}`)}
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}
