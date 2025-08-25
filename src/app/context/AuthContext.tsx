"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const AuthContext = createContext(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const savedSession = localStorage.getItem("session")
    if (savedSession) {
      setSession(JSON.parse(savedSession))
    } else {
      router.push("/login")
    }
  }, [])

  return (
    <AuthContext.Provider value={session}>
      {session ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
