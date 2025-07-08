import { STORAGE_KEYS } from "@/lib/constants"

export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue

  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error("Failed to save to localStorage:", error)
  }
}

export function removeStorageItem(key: string): void {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error("Failed to remove from localStorage:", error)
  }
}

export function clearStorage(): void {
  if (typeof window === "undefined") return

  try {
    localStorage.clear()
  } catch (error) {
    console.error("Failed to clear localStorage:", error)
  }
}

// Specific storage utilities
export function getRecentlyViewed(): string[] {
  return getStorageItem(STORAGE_KEYS.RECENTLY_VIEWED, [])
}

export function addToRecentlyViewed(productId: string): void {
  const recent = getRecentlyViewed()
  const filtered = recent.filter((id) => id !== productId)
  const updated = [productId, ...filtered].slice(0, 10) // Keep only 10 items
  setStorageItem(STORAGE_KEYS.RECENTLY_VIEWED, updated)
}

export function getSearchHistory(): string[] {
  return getStorageItem(STORAGE_KEYS.SEARCH_HISTORY, [])
}

export function addToSearchHistory(query: string): void {
  if (!query.trim()) return

  const history = getSearchHistory()
  const filtered = history.filter((q) => q !== query)
  const updated = [query, ...filtered].slice(0, 5) // Keep only 5 items
  setStorageItem(STORAGE_KEYS.SEARCH_HISTORY, updated)
}

export function clearSearchHistory(): void {
  removeStorageItem(STORAGE_KEYS.SEARCH_HISTORY)
}

export function getTheme(): string {
  return getStorageItem(STORAGE_KEYS.THEME, "system")
}

export function setTheme(theme: string): void {
  setStorageItem(STORAGE_KEYS.THEME, theme)
}

export function getLanguage(): string {
  return getStorageItem(STORAGE_KEYS.LANGUAGE, "en")
}

export function setLanguage(language: string): void {
  setStorageItem(STORAGE_KEYS.LANGUAGE, language)
}

export function getCurrency(): string {
  return getStorageItem(STORAGE_KEYS.CURRENCY, "USD")
}

export function setCurrency(currency: string): void {
  setStorageItem(STORAGE_KEYS.CURRENCY, currency)
}

export function getRegion(): string {
  return getStorageItem(STORAGE_KEYS.REGION, "US")
}

export function setRegion(region: string): void {
  setStorageItem(STORAGE_KEYS.REGION, region)
}
