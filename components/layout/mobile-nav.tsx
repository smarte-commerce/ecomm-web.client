"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Home, Package, Store, Grid3X3, ShoppingCart, User, LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const { itemCount } = useCart()
  const { t } = useLanguage()

  const navItems = [
    {
      title: t("nav.home"),
      href: "/",
      icon: Home,
    },
    {
      title: t("nav.products"),
      href: "/products",
      icon: Package,
    },
    {
      title: t("nav.vendors"),
      href: "/vendors",
      icon: Store,
    },
    {
      title: t("nav.categories"),
      href: "/categories",
      icon: Grid3X3,
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b">
            <Link href="/" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
              <span className="font-bold text-lg">EcommerceHub</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Cart */}
            <div className="mt-6 pt-6 border-t">
              <Link
                href="/cart"
                className="flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors"
                onClick={() => setOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Cart</span>
                </div>
                {itemCount > 0 && (
                  <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 text-xs">
                    {itemCount}
                  </Badge>
                )}
              </Link>
            </div>
          </nav>

          {/* User Section */}
          <div className="border-t pt-4">
            {user ? (
              <div className="space-y-2">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Link
                  href={`/${user.role}/dashboard`}
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <User className="h-4 w-4" />
                  <span>{t("nav.dashboard")}</span>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3"
                  onClick={() => {
                    logout()
                    setOpen(false)
                  }}
                >
                  <span>{t("nav.logout")}</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link href="/auth/login" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start px-3">
                    <LogIn className="mr-2 h-4 w-4" />
                    {t("nav.login")}
                  </Button>
                </Link>
                <Link href="/auth/register" onClick={() => setOpen(false)}>
                  <Button className="w-full justify-start px-3">
                    <UserPlus className="mr-2 h-4 w-4" />
                    {t("nav.register")}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
