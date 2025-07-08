export const locales = ["en", "es", "fr", "de", "zh"] as const
export type Locale = (typeof locales)[number]

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  zh: "中文",
}

export const defaultLocale: Locale = "en"

export function getLocaleFromUrl(pathname: string): Locale {
  const segments = pathname.split("/")
  const locale = segments[1] as Locale
  return locales.includes(locale) ? locale : defaultLocale
}
