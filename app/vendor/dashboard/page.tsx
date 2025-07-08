"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, ShoppingCart, TrendingUp, Users, Plus, Eye, Edit, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { VendorLayout } from "@/components/layout/vendor-layout"

export default function VendorDashboard() {
  const { user } = useAuth()

  const stats = [
    {
      title: "Total Products",
      value: "156",
      change: "+12%",
      icon: Package,
      href: "/vendor/products",
      color: "text-blue-600",
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+8%",
      icon: ShoppingCart,
      href: "/vendor/orders",
      color: "text-green-600",
    },
    {
      title: "Revenue",
      value: "$12,456",
      change: "+15%",
      icon: TrendingUp,
      href: "/vendor/analytics",
      color: "text-purple-600",
    },
    {
      title: "Customers",
      value: "892",
      change: "+5%",
      icon: Users,
      href: "/vendor/customers",
      color: "text-orange-600",
    },
  ]

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      date: "2024-01-15",
      status: "pending",
      total: 89.99,
      items: 2,
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      date: "2024-01-14",
      status: "shipped",
      total: 156.5,
      items: 1,
    },
    {
      id: "ORD-003",
      customer: "Bob Johnson",
      date: "2024-01-13",
      status: "delivered",
      total: 45.0,
      items: 3,
    },
  ]

  const topProducts = [
    {
      id: "1",
      name: "Wireless Headphones",
      sales: 45,
      revenue: "$2,250",
      stock: 12,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Smart Watch",
      sales: 32,
      revenue: "$6,400",
      stock: 8,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Bluetooth Speaker",
      sales: 28,
      revenue: "$1,400",
      stock: 15,
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <VendorLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Vendor Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.firstName}! Here's your store overview.</p>
        </div>
        <Link href="/vendor/products/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
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
                    <p className="text-sm text-green-600">{stat.change} from last month</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.customer} • {order.date} • {order.items} items
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.total}</p>
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/vendor/orders">
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                View All Orders
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Your best-selling products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {product.sales} sales • Stock: {product.stock}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{product.revenue}</p>
                    <div className="flex gap-1 mt-1">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/vendor/products">
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                Manage Products
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your store and business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/vendor/products/new">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </Link>
            <Link href="/vendor/orders">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Manage Orders
              </Button>
            </Link>
            <Link href="/vendor/promotions">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <TrendingUp className="mr-2 h-4 w-4" />
                Promotions
              </Button>
            </Link>
            <Link href="/vendor/analytics">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </VendorLayout>
  )
}
