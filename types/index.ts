export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "customer" | "vendor" | "admin"
  avatar?: string
  createdAt: Date
  updatedAt: Date
  preferences?: UserPreferences
}

export interface UserPreferences {
  region: string
  currency: string
  language: string
  theme: "light" | "dark" | "system"
  notifications: NotificationSettings
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
  orderUpdates: boolean
  promotions: boolean
  newsletter: boolean
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  vendor: User
  stock: number
  rating: number
  reviewCount: number
  tags: string[]
  variants?: ProductVariant[]
  createdAt: Date
  updatedAt: Date
}

export interface ProductVariant {
  id: string
  name: string
  value: string
  price?: number
  stock?: number
}

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
  variant?: {
    size?: string
    color?: string
  }
}

export interface Cart {
  id: string
  userId?: string
  items: CartItem[]
  totalAmount: number
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  totalAmount: number
  status: OrderStatus
  shippingAddress: Address
  billingAddress: Address
  paymentMethod: PaymentMethod
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
}

export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"

export interface Address {
  id: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault?: boolean
}

export interface PaymentMethod {
  id: string
  type: "credit_card" | "debit_card" | "paypal" | "stripe"
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault?: boolean
}

export interface Category {
  id: string
  name: string
  description?: string
  image?: string
  parentId?: string
  children?: Category[]
  productCount: number
}

export interface Review {
  id: string
  userId: string
  productId: string
  rating: number
  comment: string
  images?: string[]
  createdAt: Date
  updatedAt: Date
  user: Pick<User, "id" | "firstName" | "lastName" | "avatar">
}

export interface Promotion {
  id: string
  name: string
  description: string
  type: "percentage" | "fixed_amount" | "free_shipping"
  value: number
  code?: string
  startDate: Date
  endDate: Date
  isActive: boolean
  usageLimit?: number
  usageCount: number
  applicableProducts?: string[]
  applicableCategories?: string[]
  minimumOrderAmount?: number
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface SearchFilters {
  query?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  rating?: number
  inStock?: boolean
  sortBy?: "price" | "rating" | "newest" | "popularity"
  sortOrder?: "asc" | "desc"
}

export interface WebSocketMessage {
  type: string
  payload: any
  timestamp: Date
}

export interface Notification {
  id: string
  userId: string
  type: "order_update" | "promotion" | "system" | "message"
  title: string
  message: string
  isRead: boolean
  createdAt: Date
}
