"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { useParallax } from "@/hooks/use-parallax"
import { useTextReveal } from "@/hooks/use-text-reveal"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { useI18n } from "@/lib/i18n/i18n-context"

export default function Hero() {
  const { t } = useI18n()
  const parallaxBg = useParallax(0.2)
  const parallaxContent = useParallax(-0.1)
  const titleRef = useTextReveal()
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!subtitleRef.current) return

    const chars = t.hero.subtitle.split("")
    subtitleRef.current.innerHTML = ""

    chars.forEach((char, index) => {
      const span = document.createElement("span")
      span.textContent = char === " " ? "\u00A0" : char
      span.style.opacity = "0"
      span.style.transform = "translateY(20px)"
      subtitleRef.current?.appendChild(span)

      gsap.to(span, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.8 + index * 0.05,
        ease: "power2.out",
      })
    })

    return () => {
      if (subtitleRef.current) {
        subtitleRef.current.innerHTML = ""
      }
    }
  }, [t])

  return (
      <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0" ref={parallaxBg}>
          <Image
              src="/developer.jpg"
              alt="Rừng sương mù"
              fill
              priority
              className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
        </div>

        <div className="container mx-auto px-4 z-10 flex flex-col items-center" ref={parallaxContent}>
          <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative w-32 h-32 mb-8 rounded-full overflow-hidden border-4 border-white"
          >
            <Image src="/placeholder.jpg?height=128&width=128" alt="Ảnh hồ sơ" fill className="object-cover" />
          </motion.div>

          <div ref={titleRef} className="mb-4">
            <h1 className="text-5xl md:text-6xl font-bold">{t.hero.title}</h1>
          </div>

          <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-200 mb-8">
            {t.hero.subtitle}
          </p>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
          <motion.a
              href="#about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="inline-block animate-bounce cursor-pointer"
              aria-label="Cuộn xuống"
          >
            <ChevronDown className="w-10 h-10" />
          </motion.a>
        </div>
      </section>
  )
}
