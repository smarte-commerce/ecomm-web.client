import { type NextRequest, NextResponse } from "next/server"
import { authService } from "@/lib/services/auth-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = await authService.login(body)

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
  }
}
