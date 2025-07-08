"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Package, Heart, CreditCard, Star, MapPin } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { CustomerLayout } from "@/components/layout/customer-layout"

export default function CustomerDashboard() {
  const { user } = useAuth()

  const stats = [
    {
      title: "Total Orders",
      value: "12",
      icon: ShoppingBag,
      href: "/customer/orders",
      color: "text-blue-600",
    },
    {
      title: "Active Orders",
      value: "3",
      icon: Package,
      href: "/customer/orders?status=active",
      color: "text-green-600",
    },
    {
      title: "Wishlist Items",
      value: "8",
      icon: Heart,
      href: "/customer/wishlist",
      color: "text-red-600",
    },
    {
      title: "Reviews Written",
      value: "15",
      icon: Star,
      href: "/customer/reviews",
      color: "text-yellow-600",
    },
  ]

  const recentOrders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "delivered",
      total: 89.99,
      items: 3,
      vendor: "TechStore",
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      status: "shipped",
      total: 156.5,
      items: 2,
      vendor: "FashionHub",
    },
    {
      id: "ORD-003",
      date: "2024-01-08",
      status: "processing",
      total: 45.0,
      items: 1,
      vendor: "BookWorld",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <CustomerLayout showSidebar>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your account</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <Link href={stat.href}>
                    <Button variant="ghost" size="sm" className="mt-4 p-0 h-auto">
                      View details →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your latest purchases and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.vendor} • {order.date} • {order.items} items
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${order.total}</p>
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/customer/orders">
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  View All Orders
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your account and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="/customer/profile">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Package className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </Link>
                <Link href="/customer/addresses">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <MapPin className="mr-2 h-4 w-4" />
                    Manage Addresses
                  </Button>
                </Link>
                <Link href="/customer/payment-methods">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Payment Methods
                  </Button>
                </Link>
                <Link href="/customer/wishlist">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Heart className="mr-2 h-4 w-4" />
                    View Wishlist
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CustomerLayout>
  )
}
