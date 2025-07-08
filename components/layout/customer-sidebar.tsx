"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { User, Package, Heart, CreditCard, MapPin, Bell, Settings, Star } from "lucide-react"

const customerNavItems = [
  {
    title: "Dashboard",
    href: "/customer/dashboard",
    icon: User,
  },
  {
    title: "Orders",
    href: "/customer/orders",
    icon: Package,
  },
  {
    title: "Wishlist",
    href: "/customer/wishlist",
    icon: Heart,
  },
  {
    title: "Reviews",
    href: "/customer/reviews",
    icon: Star,
  },
  {
    title: "Addresses",
    href: "/customer/addresses",
    icon: MapPin,
  },
  {
    title: "Payment Methods",
    href: "/customer/payment-methods",
    icon: CreditCard,
  },
  {
    title: "Notifications",
    href: "/customer/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "/customer/settings",
    icon: Settings,
  },
]

export function CustomerSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-card border-r">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Customer Panel</h2>
      </div>
      <nav className="flex-1 px-4 pb-4">
        <ul className="space-y-2">
          {customerNavItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
