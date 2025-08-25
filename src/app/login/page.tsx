// app/login/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { ModeToggle } from "@/components/ui/ModeToggle"
import LoadingForm from "@/app/loading"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    setLoading(false)
    
    if (res.ok) {
    const expiresAt = Date.now() + 2 * 60 * 60 * 1000; // 2 hours
    const sessionData = {
      ...data.session,
      expiresAt,
    };
    localStorage.setItem("session", JSON.stringify(sessionData));
    router.push("/home");
  }

  }
/*
  return (
    <form onSubmit={handleLogin}>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>

  )
    */

  // if (loading) {
  //   return (
  //     <LoadingForm />
  //   )
  // }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[rgb(204,175,244)]   bg-[var(--color-chart-2)]  px-4">
      {/* </div><div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"> */}
      <div className="bg-card text-card-foreground p-8 rounded-lg shadow-md w-full max-w-md">
        
       
        <h1 className="text-2xl font-bold text-center mb-2">Login Form</h1> 
          {/* Welcome to SMS</h1> */}
        <p className="text-sm text-center text-muted-foreground mb-6">BMB Toddlers School V-2</p>
            <ModeToggle />
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-secondary-foreground">Email</label>
            
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-1 text-secondary-foreground">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* {loading ? <LoadingForm /> :<Button
            type="submit"
            className=" w-full bg-[var(--color-chart-2)] text-white hover:bg-[color-mix(in oklch, var(--color-chart-2) 80%, black)]  rounded-md shadow transition-colors">Login</Button>
          } */}
            <Button
            type="submit"
            className=" w-full bg-[var(--color-chart-2)] text-white hover:bg-[color-mix(in oklch, var(--color-chart-2) 80%, black)]  rounded-md shadow transition-colors">
              {loading ? "Loading..." : "Login"} 
              </Button>
          
        
        </form>

       
      </div>

    </div>
  )

}
