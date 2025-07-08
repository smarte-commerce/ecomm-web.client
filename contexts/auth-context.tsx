"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "customer" | "vendor" | "admin"
  avatar?: string
  preferences?: {
    region: string
    currency: string
    language: string
    theme: "light" | "dark" | "system"
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
      orderUpdates: boolean
      promotions: boolean
      newsletter: boolean
    }
  }
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
  socialLogin: (provider: "google" | "facebook", token: string) => Promise<void>
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  role?: "customer" | "vendor"
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setIsLoading(false)
        return
      }

      // Mock user data for development
      const mockUser: User = {
        id: "1",
        email: "user@example.com",
        firstName: "John",
        lastName: "Doe",
        role: "customer",
        preferences: {
          region: "US",
          currency: "USD",
          language: "en",
          theme: "system",
          notifications: {
            email: true,
            push: true,
            sms: false,
            orderUpdates: true,
            promotions: false,
            newsletter: true,
          },
        },
      }

      setUser(mockUser)
    } catch (error) {
      localStorage.removeItem("token")
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Mock login - in real app, make API call
      const mockUser: User = {
        id: "1",
        email,
        firstName: "John",
        lastName: "Doe",
        role: "customer",
        preferences: {
          region: "US",
          currency: "USD",
          language: "en",
          theme: "system",
          notifications: {
            email: true,
            push: true,
            sms: false,
            orderUpdates: true,
            promotions: false,
            newsletter: true,
          },
        },
      }

      localStorage.setItem("token", "mock-token")
      setUser(mockUser)
      router.push("/")
    } catch (error) {
      throw new Error("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data: RegisterData) => {
    setIsLoading(true)
    try {
      // Mock registration - in real app, make API call
      const mockUser: User = {
        id: "1",
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role || "customer",
        preferences: {
          region: "US",
          currency: "USD",
          language: "en",
          theme: "system",
          notifications: {
            email: true,
            push: true,
            sms: false,
            orderUpdates: true,
            promotions: false,
            newsletter: true,
          },
        },
      }

      localStorage.setItem("token", "mock-token")
      setUser(mockUser)
      router.push("/")
    } catch (error) {
      throw new Error("Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  const socialLogin = async (provider: "google" | "facebook", token: string) => {
    setIsLoading(true)
    try {
      // Mock social login - in real app, make API call
      const mockUser: User = {
        id: "1",
        email: "user@example.com",
        firstName: "John",
        lastName: "Doe",
        role: "customer",
        preferences: {
          region: "US",
          currency: "USD",
          language: "en",
          theme: "system",
          notifications: {
            email: true,
            push: true,
            sms: false,
            orderUpdates: true,
            promotions: false,
            newsletter: true,
          },
        },
      }

      localStorage.setItem("token", "mock-token")
      setUser(mockUser)
      router.push("/")
    } catch (error) {
      throw new Error("Social login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    router.push("/")
  }

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true)
    try {
      // Mock profile update - in real app, make API call
      setUser((prev) => (prev ? { ...prev, ...data } : null))
    } catch (error) {
      throw new Error("Profile update failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        socialLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
