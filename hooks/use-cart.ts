"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/services/api-client"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { STORAGE_KEYS } from "@/lib/constants"

// Mock cart data for development
const mockCartData = {
  id: "cart123",
  items: [
    {
      id: "item1",
      productId: "1",
      name: "Premium Wireless Noise-Cancelling Headphones",
      price: 249.99,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "item2",
      productId: "3",
      name: "Portable Bluetooth Speaker",
      price: 59.99,
      quantity: 2,
      image: "/placeholder.svg?height=80&width=80",
    },
  ],
  totalAmount: 369.97,
}

export function useCart() {
  const queryClient = useQueryClient()
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()

  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      if (isAuthenticated) {
        try {
          return await apiClient.get("/api/cart")
        } catch (error) {
          console.error("Error fetching cart:", error)
          return getGuestCart()
        }
      } else {
        return getGuestCart()
      }
    },
  })

  const addToCart = useMutation({
    mutationFn: async ({ productId, quantity, variant }: { productId: string; quantity: number; variant?: any }) => {
      if (isAuthenticated) {
        return await apiClient.post("/api/cart/items", { productId, quantity, variant })
      } else {
        const guestCart = getGuestCart()
        const existingItemIndex = guestCart.items.findIndex(
          (item) =>
            item.productId === productId && JSON.stringify(item.variant || {}) === JSON.stringify(variant || {}),
        )

        if (existingItemIndex >= 0) {
          guestCart.items[existingItemIndex].quantity += quantity
        } else {
          // Fetch product details to add to cart
          try {
            const product = await apiClient.get(`/api/products/${productId}`)
            guestCart.items.push({
              id: `guest-${Date.now()}`,
              productId,
              name: product.name,
              price: product.price,
              quantity,
              image: product.images?.[0] || "/placeholder.svg?height=80&width=80",
              variant,
            })
          } catch (error) {
            console.error("Error fetching product details:", error)
            // Fallback with minimal info
            guestCart.items.push({
              id: `guest-${Date.now()}`,
              productId,
              name: "Product",
              price: 0,
              quantity,
              variant,
            })
          }
        }

        // Recalculate total
        guestCart.totalAmount = guestCart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

        saveGuestCart(guestCart)
        return guestCart
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      })
    },
  })

  const updateCartItem = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      if (isAuthenticated) {
        return await apiClient.put(`/api/cart/items/${itemId}`, { quantity })
      } else {
        const guestCart = getGuestCart()
        const itemIndex = guestCart.items.findIndex((item) => item.id === itemId)

        if (itemIndex >= 0) {
          if (quantity <= 0) {
            guestCart.items.splice(itemIndex, 1)
          } else {
            guestCart.items[itemIndex].quantity = quantity
          }

          // Recalculate total
          guestCart.totalAmount = guestCart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

          saveGuestCart(guestCart)
          return guestCart
        }
        throw new Error("Item not found in cart")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update cart item",
        variant: "destructive",
      })
    },
  })

  const removeCartItem = useMutation({
    mutationFn: async (itemId: string) => {
      if (isAuthenticated) {
        return await apiClient.delete(`/api/cart/items/${itemId}`)
      } else {
        const guestCart = getGuestCart()
        const itemIndex = guestCart.items.findIndex((item) => item.id === itemId)

        if (itemIndex >= 0) {
          guestCart.items.splice(itemIndex, 1)

          // Recalculate total
          guestCart.totalAmount = guestCart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

          saveGuestCart(guestCart)
          return guestCart
        }
        throw new Error("Item not found in cart")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      })
    },
  })

  const clearCart = useMutation({
    mutationFn: async () => {
      if (isAuthenticated) {
        return await apiClient.delete("/api/cart")
      } else {
        const emptyCart = {
          id: `guest-${Date.now()}`,
          items: [],
          totalAmount: 0,
        }
        saveGuestCart(emptyCart)
        return emptyCart
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      })
    },
  })

  // Helper functions for guest cart
  function getGuestCart() {
    if (typeof window === "undefined") return mockCartData

    const storedCart = localStorage.getItem(STORAGE_KEYS.CART)
    if (storedCart) {
      try {
        return JSON.parse(storedCart)
      } catch (e) {
        console.error("Error parsing cart from localStorage:", e)
      }
    }

    // Return empty cart if nothing in localStorage
    return {
      id: `guest-${Date.now()}`,
      items: [],
      totalAmount: 0,
    }
  }

  function saveGuestCart(cart: any) {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart))
  }

  return {
    cart: cart || mockCartData,
    isLoading,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
  }
}

export function useAddToCart() {
  const { addToCart } = useCart()
  return addToCart
}
