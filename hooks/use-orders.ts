import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/services/api-client"
import { CACHE_KEYS } from "@/lib/constants"
import type { Order, PaginatedResponse, CreateOrderFormData } from "@/types"

export function useOrders(page = 1, limit = 10) {
  return useQuery({
    queryKey: [CACHE_KEYS.ORDERS, page, limit],
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<Order>>(`/api/orders?page=${page}&limit=${limit}`)
      return response
    },
  })
}

export function useOrder(orderId: string) {
  return useQuery({
    queryKey: [CACHE_KEYS.ORDER, orderId],
    queryFn: async () => {
      const response = await apiClient.get<Order>(`/api/orders/${orderId}`)
      return response
    },
    enabled: !!orderId,
  })
}

export function useCreateOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (orderData: CreateOrderFormData) => {
      return await apiClient.post<Order>("/api/orders", orderData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.ORDERS] })
      queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.CART] })
    },
  })
}

export function useCancelOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (orderId: string) => {
      return await apiClient.post(`/api/orders/${orderId}/cancel`)
    },
    onSuccess: (_, orderId) => {
      queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.ORDERS] })
      queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.ORDER, orderId] })
    },
  })
}

export function useOrderTracking(orderId: string) {
  return useQuery({
    queryKey: ["order-tracking", orderId],
    queryFn: async () => {
      const response = await apiClient.get(`/api/orders/${orderId}/tracking`)
      return response
    },
    enabled: !!orderId,
    refetchInterval: 30000, // Refetch every 30 seconds
  })
}
