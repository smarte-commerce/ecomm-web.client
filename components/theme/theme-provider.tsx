"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useAuth } from "@/contexts/auth-context"

type Theme = "dark" | "light" | "system"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: string | undefined
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { user, updateProfile } = useAuth()
  const [theme, setThemeState] = useState<Theme>("system")
  const [resolvedTheme, setResolvedTheme] = useState<string | undefined>()

  // Load theme from user preferences or localStorage
  useEffect(() => {
    if (user?.preferences?.theme) {
      setThemeState(user.preferences.theme as Theme)
    } else {
      const savedTheme = localStorage.getItem("theme") as Theme
      if (savedTheme) {
        setThemeState(savedTheme)
      }
    }
  }, [user])

  // Update resolved theme based on system preference
  useEffect(() => {
    const updateResolvedTheme = () => {
      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        setResolvedTheme(systemTheme)
        document.documentElement.classList.toggle("dark", systemTheme === "dark")
      } else {
        setResolvedTheme(theme)
        document.documentElement.classList.toggle("dark", theme === "dark")
      }
    }

    updateResolvedTheme()

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      mediaQuery.addEventListener("change", updateResolvedTheme)
      return () => mediaQuery.removeEventListener("change", updateResolvedTheme)
    }
  }, [theme])

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)

    // Update user preferences if logged in
    if (user) {
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

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </NextThemesProvider>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
