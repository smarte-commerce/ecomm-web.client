"use client"

import Link from "next/link"
import { ShoppingCart, User, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { LanguageSelector } from "@/components/i18n/language-selector"
import { MobileNav } from "./mobile-nav"

export function Header() {
  const { user, logout } = useAuth()
  const { itemCount } = useCart()
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="md:hidden">
          <MobileNav />
        </div>

        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">EcommerceHub</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
            {t("nav.home")}
          </Link>
          <Link href="/products" className="transition-colors hover:text-foreground/80 text-foreground/60">
            {t("nav.products")}
          </Link>
          <Link href="/vendors" className="transition-colors hover:text-foreground/80 text-foreground/60">
            {t("nav.vendors")}
          </Link>
          <Link href="/categories" className="transition-colors hover:text-foreground/80 text-foreground/60">
            {t("nav.categories")}
          </Link>
        </nav>

        <div className="flex flex-1 items-center justify-center px-4">
          <div className="w-full max-w-sm">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder={t("common.search")} className="pl-8" />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <LanguageSelector />

          <Button variant="outline" size="icon" asChild>
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-4 w-4" />
              {itemCount > 0 && (
                <Badge variant="destructive" className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs">
                  {itemCount}
                </Badge>
              )}
            </Link>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/${user.role}/dashboard`}>{t("nav.dashboard")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">{t("nav.profile")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">{t("nav.orders")}</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>{t("nav.logout")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/auth/login">{t("nav.login")}</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">{t("nav.register")}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
