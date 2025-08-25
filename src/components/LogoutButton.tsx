// components/LogoutButton.tsx
"use client"

import { logoutUser } from "@/lib/logout"
import { Button } from "./ui/Button"

export default function LogoutButton() {
  return (
    <Button
      onClick={logoutUser}
      className=" w-full bg-[var(--color-chart-2)] text-white hover:bg-[color-mix(in oklch, var(--color-chart-2) 80%, black)]  rounded-md shadow transition-colors"
            
     // className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Logout
    </Button>
  )
}
