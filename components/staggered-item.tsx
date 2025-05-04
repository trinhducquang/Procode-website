"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface StaggeredItemProps {
  children: ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
}

export function StaggeredItem({ children, className, direction = "up" }: StaggeredItemProps) {
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

  const itemVariants = {
    hidden: {
      opacity: 0,
      ...getInitialDirection(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  )
}
