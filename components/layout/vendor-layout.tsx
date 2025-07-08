"use client"

import type { ReactNode } from "react"
import { VendorHeader } from "./vendor-header"
import { VendorSidebar } from "./vendor-sidebar"
import { useAuth } from "@/contexts/auth-context"
import { redirect } from "next/navigation"

interface VendorLayoutProps {
  children: ReactNode
}

export function VendorLayout({ children }: VendorLayoutProps) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    redirect("/auth/login")
  }

  if (user.role !== "vendor") {
    redirect(`/${user.role}/dashboard`)
  }

  return (
    <div className="min-h-screen bg-background">
      <VendorHeader />
      <div className="flex">
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:pt-16">
          <VendorSidebar />
        </div>
        <main className="flex-1 md:ml-64 pt-4">
          <div className="container mx-auto px-4 py-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
