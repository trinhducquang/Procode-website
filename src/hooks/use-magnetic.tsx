"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion } from "framer-motion"

interface MagneticProps {
  children: React.ReactNode
  className?: string
}

export function Magnetic({ children, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const element = ref.current
    if (!element) return

    const { width, height, left, top } = element.getBoundingClientRect()
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)

    setPosition({ x, y })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const { x, y } = position

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: x * 0.3, y: y * 0.3 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      <motion.div
        animate={{ x: x * 0.4, y: y * 0.4 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
