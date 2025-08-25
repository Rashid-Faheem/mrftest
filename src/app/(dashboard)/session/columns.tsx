"use client"

import { ColumnDef } from "@tanstack/react-table"
// import ActionButtons from "./ActionButton"
import ActionButtons from "@/components/action-buttons/ActionButtons"
import { format } from 'date-fns'

import clsx from "clsx"
import { boolean } from "zod"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/Button"
import { ArrowUpDown } from "lucide-react"
import { SortableHeader } from "@/components/ui/SortableHeader"

export const columns = (onDeleteSuccess: () => void): ColumnDef<sessionMaster>[] => [
  {
    accessorKey: "sessionName",
     header: ({ column }) => <SortableHeader column={column} title="Session Name" />,
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => <SortableHeader column={column} title="Start Date" />,

    cell: ({ row }) => {
      const date = new Date(row.getValue("startDate"))
      return format(date, 'dd-MMM-yyyy')
    },
  },
  {
    accessorKey: "endDate",
        header: ({ column }) => <SortableHeader column={column} title="End Date" />,

     cell: ({ row }) => {
      const date = new Date(row.getValue("endDate"))
      return format(date, 'dd-MMM-yyyy')
    },
  },
  
  // {
  //   accessorKey: "active",
  //   header: "Active",
  //   // cell: ({row}) => <div> {row} </div>// checked={row.original.active}
     
            
  // },

  {
  accessorKey: "active",
  header: "Active",
  cell: ({ row }) => {
    const isActive = row.getValue("active") as boolean;

    return (
      <Switch
        checked={isActive}
        className={clsx(
                  "data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300",
                  "cursor-not-allowed"
                )}
      />
    );
  }
},
    
 {
     id: "actions", // no accessorKey since it's not bound to data
     header: "Actions",
     cell: ({row}) => <ActionButtons
     id={row.original.id}
     model="sessionMaster" // specify the model name for Prisma
     editLabel="Edit Session"
     // resource="users"
     editUrl="/session/add-session?id="
     deleteConfirmMessage="Are you sure you want to delete?"
     onDeleteSuccess={() => onDeleteSuccess()}
   />
 
   }

]
