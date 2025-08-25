'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import LoadingForm from '@/app/loading'
import { Button } from '@/components/ui/Button'
import { getPaymentMonthsBySession, getSessionById, upsertSession } from '@/app/actions/fetch'

const sessionSchema = z.object({
  sessionName: z.string().min(1, 'Session Name is required'),
  startDate: z.string().refine((val) => !isNaN(new Date(val).getTime()), 'Invalid date format'),
  endDate: z.string().refine((val) => !isNaN(new Date(val).getTime()), 'Invalid date format'),
  active: z.boolean(),
})

type SessionFormData = z.output<typeof sessionSchema>

export default function SessionFormPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id') // If null → Create mode

  const [formLoading, setFormLoading] = useState(!!id) // Load only in edit mode
  const [submitLoading, setSubmitLoading] = useState(false)
  const [lockDates, setLockDates] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SessionFormData>({
    resolver: zodResolver(sessionSchema),
    defaultValues: { active: true },
  })

  // useEffect(() => {
  //   if (!id) return

  //   const fetchSession = async () => {
  //     setFormLoading(true)
  //     try {
  //       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions/${id}`)
  //       if (res.ok) {
  //         const data = await res.json()
  //         reset(data)

  //         const res1 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/paymentMonth/by-session/${id}`)
  //         if (res1.ok) {
  //           const data1 = await res1.json()
  //           if (data1.length > 0) {
  //             setLockDates(true)
  //           }
  //         }
  //       } else {
  //         alert('Session not found')
  //         router.push('/session')
  //       }
  //     } catch (err) {
  //       console.error('Fetch error:', err)
  //       alert('Failed to load Session')
  //     } finally {
  //       setFormLoading(false)
  //     }
  //   }

  //   fetchSession()
  // }, [id, reset, router])

  useEffect(() => {
  if (!id) return

  const fetchData = async () => {
    setFormLoading(true)

    const session = await getSessionById(id)
    if (!session) {
      alert('Session not found')
      router.push('/session')
      return
    }

    reset({
      sessionName: session.sessionName,
      startDate: session.startDate.toISOString().split('T')[0],
      endDate: session.endDate.toISOString().split('T')[0],
      active: session.active,
    })

    const months = await getPaymentMonthsBySession(id)
    if (months.length > 0) setLockDates(true)

    setFormLoading(false)
  }

  fetchData()
}, [id, reset, router])


  // const onSubmit = async (formData: SessionFormData) => {
  //   setSubmitLoading(true)

  //   const transformedData: SessionFormData = {
  //     ...formData,
  //     sessionName: formData.sessionName.toUpperCase(),
  //   }

  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/sessions/${id ?? ''}`,
  //       {
  //         method: id ? 'PUT' : 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(transformedData),
  //       }
  //     )

  //     if (!res.ok) {
  //       const error = await res.json()
  //       console.error('Server error:', error)
  //       alert('Error: ' + JSON.stringify(error.detail))
  //       return
  //     }

  //     alert(id ? 'Session updated successfully!' : 'Session created successfully!')
  //     router.push('/session')
  //   } catch (error) {
  //     console.error('Network error:', error)
  //     alert('Request failed.')
  //   } finally {
  //     setSubmitLoading(false)
  //   }
  // }
const onSubmit = async (formData: SessionFormData) => {
  setSubmitLoading(true)

  try {
    await upsertSession(id, {
      sessionName: formData.sessionName.toUpperCase(),
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      active: formData.active,
    })

    alert(id ? 'Session updated!' : 'Session created!')
    router.push('/session')
  } catch (err) {
    console.error(err)
    alert('Something went wrong.')
  } finally {
    setSubmitLoading(false)
  }
}

  if (formLoading) {
    return <LoadingForm />
  }

  return (
    <div className="bg-card text-card-foreground w-120 m-4 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {id ? 'Edit Session' : 'Add New Session'}
      </h1>
      <p className="text-muted-foreground mb-6">
        {id ? 'Update the Session details below.' : 'Fill in the details below to add a new Session.'}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Session Name</label>
          <input
            type="text"
            {...register('sessionName')}
            className="border p-2 w-full rounded bg-secondary text-secondary-foreground"
          />
          {errors.sessionName && (
            <p className="text-red-500 text-sm">{errors.sessionName.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Start Date</label>
          <input
            type="date"
            {...register('startDate')}
            className="border p-2 w-full rounded bg-secondary text-secondary-foreground"
            disabled={lockDates}
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm">{errors.startDate.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">End Date</label>
          <input
            type="date"
            {...register('endDate')}
            className="border p-2 w-full rounded bg-secondary text-secondary-foreground"
            disabled={lockDates}
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm">{errors.endDate.message}</p>
          )}
        </div>

        {lockDates && (
          <p className="text-yellow-600 text-sm">
            Dates are locked because Payment Months have already been generated for this session.
          </p>
        )}

        <div className="flex items-center gap-4">
          <div>
            <label className="block mb-1 font-medium">Active</label>
            <input
              type="checkbox"
              {...register('active')}
              className="border p-2 rounded bg-secondary text-secondary-foreground"
            />
            {errors.active && (
              <p className="text-red-500 text-sm">{errors.active.message}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <Button
            type="submit"
            className="bg-[var(--color-chart-2)] text-white hover:bg-[color-mix(in oklch, var(--color-chart-2) 80%, black)] px-3 py-2 rounded-md shadow transition-colors"
            size="lg"
            disabled={submitLoading}
          >
            {submitLoading ? (id ? 'Updating...' : 'Submitting...') : id ? 'Update' : 'Submit'}
          </Button>
          {/* <button
            type="button"
            onClick={() => router.push('/session')}
            className="flex items-center justify-center gap-2 bg-red-700 text-white px-4 py-2 rounded transition hover:bg-red-500"
          >
            Cancel
          </button> */}
          
          <Button
            type="button"
            variant="destructive"
            size="lg"
            onClick={() => router.push('/session')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
