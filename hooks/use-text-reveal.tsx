"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitType from "split-type"

export function useTextReveal() {
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

    // Tạo split text
    const splitText = new SplitType(element, { types: "chars, words" })
    const chars = splitText.chars

    if (!chars) return

    gsap.fromTo(
      chars,
      {
        opacity: 0.1,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.02,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      splitText.revert()
    }
  }, [])

  return ref
}
