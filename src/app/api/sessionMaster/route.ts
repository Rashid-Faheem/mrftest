import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function GetSessionList(req: Request) {
  const session = await prisma.sessionMaster.findMany()
  return NextResponse.json({message: "Session List", session})
}