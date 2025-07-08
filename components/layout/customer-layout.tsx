"use client"

import type { ReactNode } from "react"
import { Header } from "./header"
import { Footer } from "./footer"
import { CustomerSidebar } from "./customer-sidebar"
import { useAuth } from "@/contexts/auth-context"
import { redirect } from "next/navigation"

interface CustomerLayoutProps {
  children: ReactNode
  showSidebar?: boolean
}

export function CustomerLayout({ children, showSidebar = false }: CustomerLayoutProps) {
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

  if (user.role !== "customer") {
    redirect(`/${user.role}/dashboard`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        {showSidebar && (
          <div className="hidden md:flex md:w-64 md:flex-col">
            <CustomerSidebar />
          </div>
        )}
        <main className={`flex-1 ${showSidebar ? "md:ml-0" : ""}`}>{children}</main>
      </div>
      <Footer />
    </div>
  )
}
