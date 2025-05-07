"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  duration?: number
  threshold?: number
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.5,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation(threshold)

  const getInitialDirection = () => {
    switch (direction) {
      case "up":
        return { y: 50 }
      case "down":
        return { y: -50 }
      case "left":
        return { x: 50 }
      case "right":
        return { x: -50 }
      default:
        return { y: 50 }
    }
  }

  const variants = {
    hidden: {
      opacity: 0,
      ...getInitialDirection(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  }

  return (
    <div ref={ref} className={className}>
      <motion.div initial="hidden" animate={isVisible ? "visible" : "hidden"} variants={variants}>
        {children}
      </motion.div>
    </div>
  )
}
