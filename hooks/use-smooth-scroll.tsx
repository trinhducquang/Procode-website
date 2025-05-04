"use client"

import { useEffect } from "react"

export function useSmoothScroll() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')

      if (!anchor) return

      e.preventDefault()

      const targetId = anchor.getAttribute("href")
      if (!targetId) return

      const targetElement = document.querySelector(targetId)
      if (!targetElement) return

      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY - 80, // Trừ đi chiều cao của header
        behavior: "smooth",
      })
    }

    document.addEventListener("click", handleAnchorClick)

    return () => {
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [])
}
