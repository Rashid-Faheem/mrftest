'use client'

import EditButton from './EditButton'
import DeleteButton from './DeleteButton'
import { TooltipProvider } from '@/components/ui/tooltip'

interface ActionButtonsProps {
  id: string | number
  model: 'sessionMaster' | 'student' | 'user' | 'classMaster' | 'CategoryMaster' | 'feeDetail' // ✅ pass model name for Prisma
  editUrl?: string
  onDeleteSuccess?: () => void
  deleteConfirmMessage?: string
  editLabel?: string
  deleteLabel?: string
}

export default function ActionButtons({
  id,
  model,
  editUrl,
  onDeleteSuccess,
  deleteConfirmMessage,
  editLabel = 'Edit',
  deleteLabel = 'Delete',
}: ActionButtonsProps) {
  return (
    <TooltipProvider>
      <div className="flex space-x-2">
        <EditButton
          id={id}
          editUrl={editUrl}
          label={editLabel}
        />
        <DeleteButton
          id={id}
          model={model}
          confirmMessage={deleteConfirmMessage}
          label={deleteLabel}
          onDeleteSuccess={onDeleteSuccess}
        />
      </div>
    </TooltipProvider>
  )
}
