import { STORAGE_KEYS } from "./constants"

export function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(STORAGE_KEYS.TOKEN)
}

export function setToken(token: string): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.TOKEN, token)
}

export function removeToken(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEYS.TOKEN)
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
  localStorage.removeItem(STORAGE_KEYS.USER)
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
}

export function setRefreshToken(token: string): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token)
}

export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    const currentTime = Date.now() / 1000
    return payload.exp < currentTime
  } catch {
    return true
  }
}

export function getUserFromToken(token: string): any {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    return payload.user || payload
  } catch {
    return null
  }
}

export function hasPermission(userRole: string, requiredRole: string): boolean {
  const roleHierarchy = {
    customer: 1,
    vendor: 2,
    admin: 3,
  }

  const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0
  const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0

  return userLevel >= requiredLevel
}
