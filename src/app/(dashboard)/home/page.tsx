// app/dashboard/page.tsx
"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import LoadingForm from "@/app/loading"

export default function Dashboard() {
  const [session, setSession] = useState<any>(null)
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const savedSession = localStorage.getItem("session")
    if (!savedSession) router.push("/login")
    else setSession(JSON.parse(savedSession))
    setLoading(false)
  }, [router])

  if (loading) return <LoadingForm /> //<div>Loading...</div>
if (!session) return <div>Loading...</div>

  return (
    // <div>
    //   <h1>Welcome, {session.name}</h1>
    //   <p>Your role: {session.role}</p>
    //   {session.role === "ADMIN" && (
    //     <a href="/admin" className="text-blue-600 underline">Go to Admin Page</a>
    //   )}
    // </div>
    <>
    </>
  )
}
