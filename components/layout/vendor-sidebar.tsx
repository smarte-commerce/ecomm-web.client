"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Users,
  Settings,
  Store,
  Megaphone,
  FileText,
  CreditCard,
  Star,
  Truck,
} from "lucide-react"

const vendorNavItems = [
  {
    title: "Dashboard",
    href: "/vendor/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/vendor/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/vendor/orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    href: "/vendor/customers",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/vendor/analytics",
    icon: BarChart3,
  },
  {
    title: "Reviews",
    href: "/vendor/reviews",
    icon: Star,
  },
  {
    title: "Promotions",
    href: "/vendor/promotions",
    icon: Megaphone,
  },
  {
    title: "Shipping",
    href: "/vendor/shipping",
    icon: Truck,
  },
  {
    title: "Payouts",
    href: "/vendor/payouts",
    icon: CreditCard,
  },
  {
    title: "Store Settings",
    href: "/vendor/store",
    icon: Store,
  },
  {
    title: "Reports",
    href: "/vendor/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/vendor/settings",
    icon: Settings,
  },
]

export function VendorSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-card border-r">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-primary">Vendor Panel</h2>
        <p className="text-sm text-muted-foreground">Manage your store</p>
      </div>
      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-1">
          {vendorNavItems.map((item) => {
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
