"use client"

import { useEffect } from "react"

export function useSmoothScroll() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null

      if (!anchor) return

      const targetId = anchor.getAttribute("href")
      if (!targetId) return

      e.preventDefault()

      if (targetId === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" })
        return
      }

      const targetElement = document.querySelector(targetId)
      if (!targetElement) return

      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      })
    }

    document.addEventListener("click", handleAnchorClick)

    return () => {
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [])
}
