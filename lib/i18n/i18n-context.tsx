"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { en } from "./locales/en"
import { ja } from "./locales/ja"
import { vi } from "./locales/vi"

type Locale = "en" | "ja" | "vi"
type Translations = typeof en

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translations
}

const locales: Record<Locale, Translations> = {
  en,
  ja,
  vi,
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")
  const [translations, setTranslations] = useState<Translations>(locales.en)

  useEffect(() => {
    // Lấy ngôn ngữ từ localStorage nếu có
    const savedLocale = localStorage.getItem("locale") as Locale | null
    if (savedLocale && locales[savedLocale]) {
      setLocale(savedLocale)
      setTranslations(locales[savedLocale])
    } else {
      // Hoặc sử dụng ngôn ngữ của trình duyệt
      const browserLocale = navigator.language.split("-")[0] as Locale
      if (locales[browserLocale]) {
        setLocale(browserLocale)
        setTranslations(locales[browserLocale])
      }
    }
  }, [])

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    setTranslations(locales[newLocale])
    localStorage.setItem("locale", newLocale)
    document.documentElement.lang = newLocale
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale: handleSetLocale, t: translations }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
