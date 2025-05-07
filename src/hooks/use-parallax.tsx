"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function useParallax(speed = 0.5) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Đăng ký plugin
    if (!gsap.registerPlugin) {
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    const element = ref.current
    if (!element) return

    gsap.to(element, {
      y: () => {
        return ScrollTrigger.maxScroll(window) * speed * -1
      },
      ease: "none",
      scrollTrigger: {
        start: "top top",
        end: "max",
        invalidateOnRefresh: true,
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [speed])

  return ref
}
