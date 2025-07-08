"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Edit, Eye, Trash2, Megaphone, Users, TrendingUp, Calendar } from "lucide-react"
import Link from "next/link"
import { formatPrice, formatDate } from "@/utils/format"

export default function AdminPromotionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Mock data
  const promotions = [
    {
      id: "1",
      name: "Summer Sale 2024",
      description: "Get up to 50% off on summer essentials",
      type: "percentage",
      value: 25,
      code: "SUMMER25",
      status: "active",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      participants: 45,
      applicants: 12,
      totalSales: 125000,
      ordersCount: 1250,
      createdAt: "2024-05-15",
    },
    {
      id: "2",
      name: "New Vendor Boost",
      description: "Special promotion for new vendors",
      type: "percentage",
      value: 15,
      code: "NEWVENDOR15",
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      participants: 12,
      applicants: 5,
      totalSales: 45000,
      ordersCount: 450,
      createdAt: "2023-12-15",
    },
    {
      id: "3",
      name: "Flash Weekend Deal",
      description: "Limited time weekend flash sale",
      type: "percentage",
      value: 40,
      code: "FLASH40",
      status: "scheduled",
      startDate: "2024-06-29",
      endDate: "2024-06-30",
      participants: 8,
      applicants: 15,
      totalSales: 0,
      ordersCount: 0,
      createdAt: "2024-06-20",
    },
    {
      id: "4",
      name: "Free Shipping Promo",
      description: "Free shipping on orders over $50",
      type: "free_shipping",
      value: 0,
      code: "FREESHIP",
      status: "expired",
      startDate: "2024-03-01",
      endDate: "2024-05-31",
      participants: 78,
      applicants: 0,
      totalSales: 89000,
      ordersCount: 890,
      createdAt: "2024-02-15",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "expired":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      case "paused":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "percentage":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "fixed":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "free_shipping":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300"
      case "buy_x_get_y":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const filteredPromotions = promotions.filter((promotion) => {
    const matchesSearch =
      promotion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promotion.code.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || promotion.status === statusFilter
    const matchesType = typeFilter === "all" || promotion.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const stats = {
    total: promotions.length,
    active: promotions.filter((p) => p.status === "active").length,
    scheduled: promotions.filter((p) => p.status === "scheduled").length,
    totalParticipants: promotions.reduce((sum, p) => sum + p.participants, 0),
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Promotions</h1>
          <p className="text-muted-foreground">Manage platform-wide promotional campaigns</p>
        </div>
        <Link href="/admin/promotions/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Promotion
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Promotions</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Megaphone className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Participants</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalParticipants}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search promotions..."
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
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="fixed">Fixed Amount</SelectItem>
                <SelectItem value="free_shipping">Free Shipping</SelectItem>
                <SelectItem value="buy_x_get_y">Buy X Get Y</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Promotions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Promotions ({filteredPromotions.length})</CardTitle>
          <CardDescription>Manage promotional campaigns and vendor participation</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Promotion</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPromotions.map((promotion) => (
                <TableRow key={promotion.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{promotion.name}</p>
                      <p className="text-sm text-muted-foreground">{promotion.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(promotion.type)}>
                      {promotion.type === "percentage" && `${promotion.value}% off`}
                      {promotion.type === "fixed" && `$${promotion.value} off`}
                      {promotion.type === "free_shipping" && "Free Shipping"}
                      {promotion.type === "buy_x_get_y" && "Buy X Get Y"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{promotion.code}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(promotion.status)}>{promotion.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{formatDate(promotion.startDate)}</p>
                      <p className="text-muted-foreground">to {formatDate(promotion.endDate)}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium">{promotion.participants} active</p>
                      <p className="text-muted-foreground">{promotion.applicants} pending</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium">{formatPrice(promotion.totalSales)}</p>
                      <p className="text-muted-foreground">{promotion.ordersCount} orders</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/promotions/${promotion.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/promotions/${promotion.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/promotions/${promotion.id}/participants`}>
                            <Users className="mr-2 h-4 w-4" />
                            Manage Participants
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
