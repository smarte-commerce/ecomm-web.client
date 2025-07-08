"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Package, Truck, CheckCircle, XCircle, Eye, RotateCcw } from "lucide-react"
import Link from "next/link"
import { formatPrice, formatDate } from "@/utils/format"
import { useTranslations } from "@/lib/i18n/use-translations"

export default function CustomerOrdersPage() {
  const { t } = useTranslations()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock data
  const orders = [
    {
      id: "ORD-001",
      orderNumber: "ORD-2024-001",
      date: "2024-01-15",
      status: "delivered",
      total: 89.99,
      items: [
        { name: "Wireless Headphones", quantity: 1, price: 79.99 },
        { name: "Phone Case", quantity: 1, price: 10.0 },
      ],
      tracking: "1Z999AA1234567890",
      estimatedDelivery: "2024-01-18",
    },
    {
      id: "ORD-002",
      orderNumber: "ORD-2024-002",
      date: "2024-01-10",
      status: "shipped",
      total: 156.5,
      items: [
        { name: "Smart Watch", quantity: 1, price: 149.99 },
        { name: "Watch Band", quantity: 1, price: 6.51 },
      ],
      tracking: "1Z999AA1234567891",
      estimatedDelivery: "2024-01-16",
    },
    {
      id: "ORD-003",
      orderNumber: "ORD-2024-003",
      date: "2024-01-08",
      status: "processing",
      total: 45.0,
      items: [{ name: "Book: JavaScript Guide", quantity: 1, price: 45.0 }],
      estimatedDelivery: "2024-01-20",
    },
    {
      id: "ORD-004",
      orderNumber: "ORD-2024-004",
      date: "2024-01-05",
      status: "cancelled",
      total: 25.99,
      items: [{ name: "USB Cable", quantity: 2, price: 12.99 }],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "shipped":
        return <Truck className="h-4 w-4 text-blue-600" />
      case "processing":
        return <Package className="h-4 w-4 text-yellow-600" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Package className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const ordersByStatus = {
    all: orders,
    processing: orders.filter((o) => o.status === "processing"),
    shipped: orders.filter((o) => o.status === "shipped"),
    delivered: orders.filter((o) => o.status === "delivered"),
    cancelled: orders.filter((o) => o.status === "cancelled"),
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("order.orderHistory")}</h1>
        <p className="text-muted-foreground">Track and manage your orders</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({ordersByStatus.all.length})</TabsTrigger>
          <TabsTrigger value="processing">Processing ({ordersByStatus.processing.length})</TabsTrigger>
          <TabsTrigger value="shipped">Shipped ({ordersByStatus.shipped.length})</TabsTrigger>
          <TabsTrigger value="delivered">Delivered ({ordersByStatus.delivered.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({ordersByStatus.cancelled.length})</TabsTrigger>
        </TabsList>

        {Object.entries(ordersByStatus).map(([status, statusOrders]) => (
          <TabsContent key={status} value={status} className="space-y-4">
            {statusOrders.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No orders found</p>
                </CardContent>
              </Card>
            ) : (
              statusOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div className="flex items-center gap-3 mb-2 md:mb-0">
                        {getStatusIcon(order.status)}
                        <div>
                          <h3 className="font-semibold">{order.orderNumber}</h3>
                          <p className="text-sm text-muted-foreground">Placed on {formatDate(order.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        <span className="font-semibold">{formatPrice(order.total)}</span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-2 mb-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tracking Info */}
                    {order.tracking && (
                      <div className="bg-muted p-3 rounded-lg mb-4">
                        <p className="text-sm">
                          <strong>Tracking:</strong> {order.tracking}
                        </p>
                        {order.estimatedDelivery && (
                          <p className="text-sm text-muted-foreground">
                            Estimated delivery: {formatDate(order.estimatedDelivery)}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/customer/orders/${order.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </Link>
                      {order.status === "delivered" && (
                        <Button variant="outline" size="sm">
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Reorder
                        </Button>
                      )}
                      {order.tracking && (
                        <Button variant="outline" size="sm">
                          <Truck className="mr-2 h-4 w-4" />
                          Track Package
                        </Button>
                      )}
                      {order.status === "processing" && (
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                          <XCircle className="mr-2 h-4 w-4" />
                          Cancel Order
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
