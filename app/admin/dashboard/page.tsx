"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Store, Users, Package, TrendingUp, Settings, Shield, BarChart3, Megaphone, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { AdminLayout } from "@/components/layout/admin-layout"

export default function AdminDashboard() {
  const { user } = useAuth()

  const stats = [
    {
      title: "Total Vendors",
      value: "1,234",
      change: "+12%",
      icon: Store,
      href: "/admin/vendors",
      color: "text-blue-600",
    },
    {
      title: "Total Customers",
      value: "45,678",
      change: "+8%",
      icon: Users,
      href: "/admin/customers",
      color: "text-green-600",
    },
    {
      title: "Total Products",
      value: "12,456",
      change: "+15%",
      icon: Package,
      href: "/admin/products",
      color: "text-purple-600",
    },
    {
      title: "Platform Revenue",
      value: "$1,234,567",
      change: "+22%",
      icon: TrendingUp,
      href: "/admin/analytics",
      color: "text-orange-600",
    },
  ]

  const recentActivities = [
    {
      id: "1",
      type: "vendor_registration",
      message: "New vendor 'TechStore' registered and pending approval",
      time: "2 hours ago",
      status: "pending",
      priority: "medium",
    },
    {
      id: "2",
      type: "promotion_request",
      message: "Promotion request from 'FashionHub' for 25% off sale",
      time: "4 hours ago",
      status: "review",
      priority: "low",
    },
    {
      id: "3",
      type: "dispute",
      message: "Customer dispute for order #ORD-123 requires attention",
      time: "6 hours ago",
      status: "urgent",
      priority: "high",
    },
    {
      id: "4",
      type: "payment_issue",
      message: "Payment processing issue detected for vendor payouts",
      time: "8 hours ago",
      status: "resolved",
      priority: "high",
    },
  ]

  const systemHealth = [
    {
      service: "API Gateway",
      status: "healthy",
      uptime: "99.9%",
      responseTime: "120ms",
    },
    {
      service: "Database",
      status: "healthy",
      uptime: "99.8%",
      responseTime: "45ms",
    },
    {
      service: "Payment Service",
      status: "warning",
      uptime: "98.5%",
      responseTime: "250ms",
    },
    {
      service: "Email Service",
      status: "healthy",
      uptime: "99.7%",
      responseTime: "80ms",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "pending":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "review":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "medium":
        return <div className="h-4 w-4 rounded-full bg-yellow-500" />
      case "low":
        return <div className="h-4 w-4 rounded-full bg-green-500" />
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-500" />
    }
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform overview and management center</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/promotions/new">
            <Button>
              <Megaphone className="mr-2 h-4 w-4" />
              Create Promotion
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
        </div>
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
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest platform activities requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex items-start space-x-3">
                    {getPriorityIcon(activity.priority)}
                    <div>
                      <p className="font-medium text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                </div>
              ))}
            </div>
            <Link href="/admin/activities">
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                View All Activities
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Real-time platform service status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((service) => (
                <div key={service.service} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{service.service}</p>
                    <p className="text-sm text-muted-foreground">
                      Uptime: {service.uptime} • Response: {service.responseTime}
                    </p>
                  </div>
                  <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                </div>
              ))}
            </div>
            <Link href="/admin/system">
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                View System Details
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Platform Management */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Management</CardTitle>
          <CardDescription>Quick access to key administrative functions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/admin/vendors">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Store className="mr-2 h-4 w-4" />
                Manage Vendors
              </Button>
            </Link>
            <Link href="/admin/customers">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Users className="mr-2 h-4 w-4" />
                Manage Customers
              </Button>
            </Link>
            <Link href="/admin/promotions">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Megaphone className="mr-2 h-4 w-4" />
                Promotions
              </Button>
            </Link>
            <Link href="/admin/reports">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <BarChart3 className="mr-2 h-4 w-4" />
                Reports
              </Button>
            </Link>
            <Link href="/admin/security">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Shield className="mr-2 h-4 w-4" />
                Security Center
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Settings className="mr-2 h-4 w-4" />
                Platform Settings
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}
