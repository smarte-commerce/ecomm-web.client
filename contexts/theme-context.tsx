"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useAuth } from "@/contexts/auth-context"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system")
  const [mounted, setMounted] = useState(false)

  // Only access auth after component is mounted to avoid SSR issues
  const auth = useAuth()
  const user = mounted ? auth?.user : null
  const updateProfile = mounted ? auth?.updateProfile : null

  useEffect(() => {
    setMounted(true)
  }, [])

  // Load theme from user preferences or localStorage
  useEffect(() => {
    if (!mounted) return

    if (user?.preferences?.theme) {
      setThemeState(user.preferences.theme as Theme)
    } else {
      const savedTheme = localStorage.getItem("theme") as Theme
      if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
        setThemeState(savedTheme)
      }
    }
  }, [user, mounted])

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme, mounted])

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)

    // Update user preferences if logged in and updateProfile is available
    if (user && updateProfile) {
      try {
        await updateProfile({
          preferences: {
            ...user.preferences,
            theme: newTheme,
          },
        })
      } catch (error) {
        console.error("Failed to update theme preference:", error)
      }
    }
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return <>{children}</>
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
