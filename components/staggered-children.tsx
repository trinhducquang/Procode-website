"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface StaggeredChildrenProps {
  children: ReactNode
  className?: string
  delayChildren?: number
  staggerChildren?: number
  threshold?: number
}

export function StaggeredChildren({
  children,
  className,
  delayChildren = 0.1,
  staggerChildren = 0.1,
  threshold = 0.1,
}: StaggeredChildrenProps) {
  const { ref, isVisible } = useScrollAnimation(threshold)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren,
        staggerChildren,
      },
    },
  }

  return (
    <div ref={ref} className={className}>
      <motion.div initial="hidden" animate={isVisible ? "visible" : "hidden"} variants={containerVariants}>
        {children}
      </motion.div>
    </div>
  )
}
