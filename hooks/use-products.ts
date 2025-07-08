import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/services/api-client"
import { grpcClient } from "@/lib/services/grpc-client"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  vendorId: string
  vendorName?: string
  categoryId: string
  inventory: number
  rating: number
  reviews: number
  discount?: number
  originalPrice?: number
  featured?: boolean
}

export interface ProductFilters {
  category?: string
  vendor?: string
  minPrice?: number
  maxPrice?: number
  rating?: number
  inStock?: boolean
  featured?: boolean
  tags?: string[]
  search?: string
  sortBy?: "price" | "rating" | "newest" | "popularity"
  sortOrder?: "asc" | "desc"
  limit?: number
  page?: number
}

export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      // Try gRPC first, fallback to REST API
      if (grpcClient.isAvailable()) {
        try {
          return await grpcClient.searchProducts(filters?.search || "", filters || {})
        } catch (error) {
          console.warn("gRPC call failed, falling back to REST API:", error)
        }
      }

      // Fallback to REST API
      const params = new URLSearchParams()
      if (filters?.category) params.append("category", filters.category)
      if (filters?.vendor) params.append("vendor", filters.vendor)
      if (filters?.minPrice) params.append("minPrice", filters.minPrice.toString())
      if (filters?.maxPrice) params.append("maxPrice", filters.maxPrice.toString())
      if (filters?.rating) params.append("rating", filters.rating.toString())
      if (filters?.inStock) params.append("inStock", filters.inStock.toString())
      if (filters?.featured) params.append("featured", filters.featured.toString())
      if (filters?.search) params.append("search", filters.search)
      if (filters?.sortBy) params.append("sortBy", filters.sortBy)
      if (filters?.sortOrder) params.append("sortOrder", filters.sortOrder)
      if (filters?.limit) params.append("limit", filters.limit.toString())
      if (filters?.page) params.append("page", filters.page.toString())

      const response = await apiClient.get<{ products: Product[] }>(`/api/products?${params.toString()}`)
      return response.products || []
    },
  })
}

export function useProduct(productId: string) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      // Try gRPC first, fallback to REST API
      if (grpcClient.isAvailable()) {
        try {
          return await grpcClient.getProduct(productId)
        } catch (error) {
          console.warn("gRPC call failed, falling back to REST API:", error)
        }
      }

      // Fallback to REST API
      return await apiClient.get<Product>(`/api/products/${productId}`)
    },
    enabled: !!productId,
  })
}

export function useAddToCart() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      return await apiClient.post("/api/cart/items", { productId, quantity })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
  })
}
