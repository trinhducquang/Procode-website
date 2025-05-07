"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { useEffect } from "react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Đảm bảo theme được áp dụng ngay khi component được mount
  useEffect(() => {
    // Thêm class vào document để đảm bảo theme được áp dụng toàn cục
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark")
      document.body.classList.toggle("dark", isDark)

      // Thêm class cho tất cả các section
      document.querySelectorAll("section").forEach((section) => {
        section.classList.toggle("dark", isDark)
      })
    }

    // Theo dõi thay đổi của theme
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          updateTheme()
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })
    updateTheme()

    return () => observer.disconnect()
  }, [])

  return (
      <NextThemesProvider
          {...props}
          enableSystem={false} // Tắt chế độ lấy theme từ thiết bị
          defaultTheme="light" // Mặc định là chế độ sáng
      >
        {children}
      </NextThemesProvider>
  )
}
