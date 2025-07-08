// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",
    REFRESH: "/api/auth/refresh",
    ME: "/api/auth/me",
    FORGOT_PASSWORD: "/api/auth/forgot-password",
    RESET_PASSWORD: "/api/auth/reset-password",
  },
  PRODUCTS: {
    LIST: "/api/products",
    DETAIL: (id: string) => `/api/products/${id}`,
    SEARCH: "/api/products/search",
    CATEGORIES: "/api/products/categories",
    FEATURED: "/api/products/featured",
    RECOMMENDATIONS: (id: string) => `/api/products/${id}/recommendations`,
  },
  CART: {
    GET: "/api/cart",
    ADD_ITEM: "/api/cart/items",
    UPDATE_ITEM: (id: string) => `/api/cart/items/${id}`,
    REMOVE_ITEM: (id: string) => `/api/cart/items/${id}`,
    CLEAR: "/api/cart",
    APPLY_COUPON: "/api/cart/coupon",
  },
  ORDERS: {
    LIST: "/api/orders",
    DETAIL: (id: string) => `/api/orders/${id}`,
    CREATE: "/api/orders",
    CANCEL: (id: string) => `/api/orders/${id}/cancel`,
    TRACKING: (id: string) => `/api/orders/${id}/tracking`,
  },
  VENDORS: {
    LIST: "/api/vendors",
    DETAIL: (id: string) => `/api/vendors/${id}`,
    PRODUCTS: (id: string) => `/api/vendors/${id}/products`,
    REVIEWS: (id: string) => `/api/vendors/${id}/reviews`,
  },
  PAYMENTS: {
    METHODS: "/api/payments/methods",
    PROCESS: "/api/payments/process",
    WEBHOOKS: "/api/payments/webhooks",
  },
  REVIEWS: {
    LIST: "/api/reviews",
    CREATE: "/api/reviews",
    UPDATE: (id: string) => `/api/reviews/${id}`,
    DELETE: (id: string) => `/api/reviews/${id}`,
  },
  NOTIFICATIONS: {
    LIST: "/api/notifications",
    MARK_READ: (id: string) => `/api/notifications/${id}/read`,
    MARK_ALL_READ: "/api/notifications/read-all",
  },
} as const

// Application Constants
export const APP_CONFIG = {
  NAME: "MarketPlace",
  DESCRIPTION: "Multi-vendor ecommerce platform",
  VERSION: "1.0.0",
  SUPPORT_EMAIL: "support@marketplace.com",
  CONTACT_EMAIL: "contact@marketplace.com",
} as const

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  PRODUCTS_PER_PAGE: 24,
  ORDERS_PER_PAGE: 10,
  REVIEWS_PER_PAGE: 10,
} as const

// Validation Rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 255,
  PHONE_REGEX: /^\+?[\d\s\-$$$$]+$/,
  POSTAL_CODE_REGEX: /^[\d\w\s-]+$/,
} as const

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
  ALLOWED_DOCUMENT_TYPES: ["application/pdf", "application/msword"],
  MAX_IMAGES_PER_PRODUCT: 10,
} as const

// Currency
export const CURRENCY = {
  DEFAULT: "USD",
  SYMBOL: "$",
  SUPPORTED: ["USD", "EUR", "GBP", "CAD", "AUD"],
} as const

// Regions
export const REGIONS = {
  US: {
    name: "United States",
    currency: "USD",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
  },
  EU: {
    name: "Europe",
    currency: "EUR",
    timezone: "Europe/London",
    dateFormat: "DD/MM/YYYY",
  },
  ASIA: {
    name: "Asia Pacific",
    currency: "USD",
    timezone: "Asia/Singapore",
    dateFormat: "DD/MM/YYYY",
  },
} as const

// Order Status Colors
export const ORDER_STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  refunded: "bg-gray-100 text-gray-800",
} as const

// Payment Status Colors
export const PAYMENT_STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  cancelled: "bg-gray-100 text-gray-800",
  refunded: "bg-orange-100 text-orange-800",
} as const

// Social Media Links
export const SOCIAL_LINKS = {
  FACEBOOK: "https://facebook.com/marketplace",
  TWITTER: "https://twitter.com/marketplace",
  INSTAGRAM: "https://instagram.com/marketplace",
  LINKEDIN: "https://linkedin.com/company/marketplace",
} as const

// Feature Flags
export const FEATURES = {
  ENABLE_REVIEWS: true,
  ENABLE_WISHLIST: true,
  ENABLE_COMPARE: true,
  ENABLE_CHAT: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_PWA: true,
  ENABLE_DARK_MODE: true,
  ENABLE_MULTI_LANGUAGE: false,
  ENABLE_MULTI_CURRENCY: false,
} as const

// Cache Keys
export const CACHE_KEYS = {
  PRODUCTS: "products",
  PRODUCT: "product",
  CATEGORIES: "categories",
  VENDORS: "vendors",
  VENDOR: "vendor",
  CART: "cart",
  ORDERS: "orders",
  ORDER: "order",
  USER: "user",
  NOTIFICATIONS: "notifications",
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: "token",
  REFRESH_TOKEN: "refresh_token",
  USER: "user",
  CART: "guestCart",
  THEME: "theme",
  LANGUAGE: "language",
  CURRENCY: "currency",
  REGION: "region",
  RECENTLY_VIEWED: "recentlyViewed",
  SEARCH_HISTORY: "searchHistory",
} as const

// WebSocket Events
export const WS_EVENTS = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  ERROR: "error",
  NOTIFICATION: "notification",
  ORDER_UPDATE: "order_status_update",
  INVENTORY_UPDATE: "inventory_update",
  PRICE_UPDATE: "price_update",
  CHAT_MESSAGE: "chat_message",
} as const

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  FORBIDDEN: "Access denied.",
  NOT_FOUND: "The requested resource was not found.",
  SERVER_ERROR: "Internal server error. Please try again later.",
  VALIDATION_ERROR: "Please check your input and try again.",
  PAYMENT_FAILED: "Payment failed. Please try again.",
  OUT_OF_STOCK: "This product is currently out of stock.",
  CART_EMPTY: "Your cart is empty.",
  LOGIN_REQUIRED: "Please log in to continue.",
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Successfully logged in!",
  REGISTER_SUCCESS: "Account created successfully!",
  LOGOUT_SUCCESS: "Successfully logged out!",
  PROFILE_UPDATED: "Profile updated successfully!",
  PASSWORD_CHANGED: "Password changed successfully!",
  PRODUCT_ADDED_TO_CART: "Product added to cart!",
  ORDER_PLACED: "Order placed successfully!",
  REVIEW_SUBMITTED: "Review submitted successfully!",
  NEWSLETTER_SUBSCRIBED: "Successfully subscribed to newsletter!",
} as const

// Animation Durations
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000,
} as const

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
} as const
