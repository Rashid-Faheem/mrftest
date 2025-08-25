// app/api/login/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { comparePasswords } from "@/lib/hash"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return NextResponse.json({ error: "Invalid email" }, { status: 401 })

  const isValid = await comparePasswords(password, user.password)
  if (!isValid) return NextResponse.json({ error: "Invalid password" }, { status: 401 })

  const session = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }

  return NextResponse.json({ message: "Login success", session })
}
