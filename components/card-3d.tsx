"use client"

import type React from "react"
import { useState, useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface Card3DProps {
  children: ReactNode
  className?: string
}

export default function Card3D({ children, className = "" }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  // Motion values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring physics
  const springConfig = { damping: 20, stiffness: 300 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  // Rotation transforms
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ["-15deg", "15deg"])

  // Glare effect - FIXED: Using the correct useTransform overloads
  // Option 1: Use useTransform with each motion value separately and combine in a regular function
  const angleCalc = () => {
    const x = smoothMouseX.get()
    const y = smoothMouseY.get()
    return Math.atan2(y, x) * (180 / Math.PI)
  }
  const glareAngle = useTransform([smoothMouseX, smoothMouseY], () => angleCalc())

  // Option 2: Alternative implementation that also works
  const glareOpacity = useTransform([smoothMouseX, smoothMouseY], () => {
    const maxOpacity = 0.2
    const x = smoothMouseX.get()
    const y = smoothMouseY.get()
    const distance = Math.sqrt(x * x + y * y)
    return Math.min(distance * 2, maxOpacity)
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const centerX = rect.left + width / 2
    const centerY = rect.top + height / 2

    const percentX = (e.clientX - centerX) / (width / 2)
    const percentY = (e.clientY - centerY) / (height / 2)

    mouseX.set(percentX)
    mouseY.set(percentY)
  }

  return (
      <motion.div
          ref={ref}
          className={`relative overflow-hidden ${className}`}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setHovered(false)
            mouseX.set(0)
            mouseY.set(0)
          }}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            transformPerspective: "1000px",
          }}
      >
        {children}

        {/* Glare effect */}
        {hovered && (
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(${glareAngle}deg, rgba(255, 255, 255, ${glareOpacity}) 0%, rgba(255, 255, 255, 0) 80%)`,
                  opacity: glareOpacity,
                }}
            />
        )}
      </motion.div>
  )
}