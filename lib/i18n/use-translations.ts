"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { type Locale, defaultLocale } from "./config"

type TranslationKey = string
type Translations = Record<string, any>

export function useTranslations() {
  const { user, updateProfile } = useAuth()
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [translations, setTranslations] = useState<Translations>({})
  const [isLoading, setIsLoading] = useState(true)

  // Load locale from user preferences or localStorage
  useEffect(() => {
    const loadLocale = () => {
      if (user?.preferences?.language) {
        setLocaleState(user.preferences.language as Locale)
      } else {
        const savedLocale = localStorage.getItem("locale") as Locale
        if (savedLocale) {
          setLocaleState(savedLocale)
        }
      }
    }

    loadLocale()
  }, [user])

  // Load translations when locale changes
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true)
      try {
        const response = await import(`./translations/${locale}.json`)
        setTranslations(response.default)
      } catch (error) {
        console.error(`Failed to load translations for ${locale}:`, error)
        // Fallback to default locale
        if (locale !== defaultLocale) {
          const fallbackResponse = await import(`./translations/${defaultLocale}.json`)
          setTranslations(fallbackResponse.default)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadTranslations()
  }, [locale])

  const setLocale = async (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("locale", newLocale)

    // Update user preferences if logged in
    if (user) {
      try {
        await updateProfile({
          preferences: {
            ...user.preferences,
            language: newLocale,
          },
        })
      } catch (error) {
        console.error("Failed to update language preference:", error)
      }
    }
  }

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    const keys = key.split(".")
    let value = translations

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }

    if (typeof value !== "string") {
      return key
    }

    // Replace parameters in translation
    if (params) {
      return Object.entries(params).reduce(
        (str, [paramKey, paramValue]) => str.replace(`{{${paramKey}}}`, String(paramValue)),
        value,
      )
    }

    return value
  }

  return {
    locale,
    setLocale,
    t,
    isLoading,
  }
}
