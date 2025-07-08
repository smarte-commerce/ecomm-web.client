"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { toast } from "sonner"

interface CartItem {
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

interface CartContextType {
  items: CartItem[]
  itemCount: number
  totalAmount: number
  addItem: (item: Omit<CartItem, "id">) => void
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error)
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items, mounted])

  const addItem = (newItem: Omit<CartItem, "id">) => {
    setIsLoading(true)
    try {
      setItems((prevItems) => {
        const existingItem = prevItems.find(
          (item) =>
            item.productId === newItem.productId && JSON.stringify(item.variant) === JSON.stringify(newItem.variant),
        )

        if (existingItem) {
          toast.success("Item quantity updated in cart")
          return prevItems.map((item) =>
            item.id === existingItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item,
          )
        } else {
          const cartItem: CartItem = {
            ...newItem,
            id: `${newItem.productId}-${Date.now()}-${Math.random()}`,
          }
          toast.success("Item added to cart")
          return [...prevItems, cartItem]
        }
      })
    } catch (error) {
      toast.error("Failed to add item to cart")
    } finally {
      setIsLoading(false)
    }
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
    toast.success("Cart updated")
  }

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
    toast.success("Item removed from cart")
  }

  const clearCart = () => {
    setItems([])
    toast.success("Cart cleared")
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        totalAmount,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
