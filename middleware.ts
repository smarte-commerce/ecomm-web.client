import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Add region detection
  const region = detectRegion(request)
  const response = NextResponse.next()

  response.headers.set("x-region", region)

  // Handle role-based routing
  const pathname = request.nextUrl.pathname

  // Protected routes for different user types
  const customerPaths = ["/customer"]
  const vendorPaths = ["/vendor"]
  const adminPaths = ["/admin"]

  const isCustomerPath = customerPaths.some((path) => pathname.startsWith(path))
  const isVendorPath = vendorPaths.some((path) => pathname.startsWith(path))
  const isAdminPath = adminPaths.some((path) => pathname.startsWith(path))

  // Check authentication for protected routes
  if (isCustomerPath || isVendorPath || isAdminPath) {
    const token = request.cookies.get("token")
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    // In a real app, you would decode the JWT token to get user role
    // For now, we'll simulate role checking
    const userRole = request.cookies.get("user_role")?.value

    // Role-based access control
    if (isCustomerPath && userRole !== "customer") {
      return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url))
    }
    if (isVendorPath && userRole !== "vendor") {
      return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url))
    }
    if (isAdminPath && userRole !== "admin") {
      return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url))
    }
  }

  return response
}

function detectRegion(request: NextRequest): string {
  // Simple region detection based on headers
  const country = request.headers.get("cf-ipcountry") || request.headers.get("x-vercel-ip-country") || "US"

  if (["US", "CA", "MX"].includes(country)) return "US"
  if (["GB", "DE", "FR", "IT", "ES"].includes(country)) return "EU"
  return "ASIA"
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
