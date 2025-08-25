'use client'

import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { useState } from 'react'
// import { deleteItem } from '@/app/actions/common/deleteItem'

// import {deleteItem} from '@/app/actions/fetch'
import { deleteCategoryMaster, deleteClassMaster, deleteFeeDetail, deleteSession,deleteStudent } from '@/app/actions/fetch'

interface DeleteButtonProps {
  id: string | number
  model: 'sessionMaster' | 'student' | 'user' | 'classMaster' | 'CategoryMaster' | 'feeDetail' // 👈 extend as needed
  confirmMessage?: string
  label?: string
  onDeleteSuccess?: () => void
}

export default function DeleteButton({
  id,
  model,
  confirmMessage = 'Are you sure you want to delete this item?',
  label = 'Delete',
  onDeleteSuccess,
}: DeleteButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm(confirmMessage)) return

    setLoading(true)

    try {
      let result: any;
      if(model == 'sessionMaster' ) {
        result = await deleteSession(String(id))
      }
      else if(model == 'classMaster')
      {
        result = await deleteClassMaster(String(id))
      }
      else if(model == 'student')
      {
        result = await deleteStudent(String(id))
      }
      else if(model == 'CategoryMaster')
      {
        result = await deleteCategoryMaster(String(id))
      }
      else if(model ==  'feeDetail')
      {
        // Implement feeMaster deletion logic here  
        result = await deleteFeeDetail(Number(id))
      }

      if (!result?.success) {
        alert(result?.message || 'Failed to delete.')
        return
      }

      alert('Deleted successfully!')
      onDeleteSuccess ? onDeleteSuccess() : router.refresh()
    } catch (err) {
      console.error('DeleteButton error:', err)
      alert('Unexpected error.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="destructive"
          className="bg-red-500 text-white hover:bg-red-700 px-3 py-2 rounded-md shadow"
          size="sm"
          onClick={handleDelete}
          disabled={loading}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{loading ? 'Deleting…' : label}</TooltipContent>
    </Tooltip>
  )
}
