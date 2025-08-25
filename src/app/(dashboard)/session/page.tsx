'use client'

import { columns as getColumns } from "./columns"
import { DataTable } from "../../../components/ui/data-table"
import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import LoadingForm from '@/app/loading'
import { fetchSessions } from "@/app/actions/fetch"

export default function DemoPage() {
  const [session, setsession] = useState<sessionMaster[]>([])
  const [loading, setLoading] = useState(true)

 const fetchsession = useCallback(async () => {
   
    setLoading(true)
    try {
      const data = await fetchSessions()
      setsession(data)
    } catch (err) {
      console.error("Error loading sessions:", err)
    } finally {
      setLoading(false)
    }
    
/*
    setLoading(true)
    const res = await fetch("/api/sessionMaster", {
      method: "GetSessionList",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json()
    setLoading(false)
    console.log(data);
    setsession(data);
    setLoading(false);
    */
  }, [])

  useEffect(() => {
    fetchsession()
  }, [fetchsession])

  // const fetchsession = useCallback(async () => {
  //   setLoading(true)
  //   try {
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions/`)
  //     if (!res.ok) throw new Error("Failed to fetch session")
  //     const data = await res.json()
  //     setsession(data)
  //   } catch (err) {
  //     console.error("Error fetching session:", err)
  //   } finally {
  //     setLoading(false)
  //   }
  // }, [])

  // useEffect(() => {
  //   fetchsession()
  // }, [fetchsession])

  // if (loading) return <p className="text-center mt-10">Loading...</p>
  if (loading) return (
    <LoadingForm />
  )
  return (
    <div className="container mx-auto">
      <div className="bg-card text-card-foreground m-4 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Session List</h1>
        <Link 
          className="bg-[var(--color-chart-2)] text-white hover:bg-[color-mix(in oklch, var(--color-chart-2) 80%, black)] px-3 py-2 rounded-md shadow transition-colors"
          href="session/add-session">
          Add New
        </Link>

        <DataTable
          columns={getColumns(fetchsession)} // <-- inject the callback
          data={session}
          loading={loading}
        />
      </div>
    </div>
  )
}
