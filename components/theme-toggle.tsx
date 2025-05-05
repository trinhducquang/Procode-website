"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Đảm bảo component chỉ render ở client side
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark"
    setTheme(newTheme)

    // Đảm bảo theme được áp dụng ngay lập tức
    document.documentElement.classList.toggle("dark", newTheme === "dark")
    document.body.classList.toggle("dark", newTheme === "dark")
  }

  const isDark = resolvedTheme === "dark"

  return (
      <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full w-9 h-9"
          aria-label="Chuyển đổi chế độ tối/sáng"
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
  )
}
