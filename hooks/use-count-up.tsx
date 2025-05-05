"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

interface CountUpProps {
    end: number
    duration?: number
    delay?: number
    decimals?: number
    prefix?: string
    suffix?: string
}

export function useCountUp({ end, duration = 2, delay = 0, decimals = 0, prefix = "", suffix = "" }: CountUpProps) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })
    const startTime = useRef<number | null>(null)
    const animationFrameId = useRef<number | null>(null)

    useEffect(() => {
        if (!isInView) return

        const delayTimeout = setTimeout(() => {
            startTime.current = Date.now()
            animationFrameId.current = requestAnimationFrame(updateCount)
        }, delay * 1000)

        const updateCount = () => {
            if (startTime.current === null) return

            const elapsedTime = (Date.now() - startTime.current) / 1000
            const progress = Math.min(elapsedTime / duration, 1)
            const easedProgress = easeOutCubic(progress)
            const currentCount = Math.min(easedProgress * end, end)

            setCount(currentCount)

            if (progress < 1) {
                animationFrameId.current = requestAnimationFrame(updateCount)
            }
        }

        return () => {
            clearTimeout(delayTimeout)
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current)
            }
        }
    }, [isInView, end, duration, delay])

    const easeOutCubic = (x: number): number => {
        return 1 - Math.pow(1 - x, 3)
    }

    const formattedCount = () => {
        const value = Math.round(count).toString()
        return `${prefix}${value}${suffix}`
    }

    return { ref, count: formattedCount() }
}
