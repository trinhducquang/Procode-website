"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useAnimation, type PanInfo } from "framer-motion"

const testimonials = [
  {
    id: 1,
    name: "John Pagiyal SH",
    role: "Product Designer",
    quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis ipsum et ante tempor imperdiet. Sed eleifend metus et nisl scelerisque, ut convallis sapien facilisis.",
  },
  {
    id: 2,
    name: "Bung Fefe",
    role: "Actor",
    quote:
        "Cras blandit rutrum justo tincidunt iaculis. Ut purus sem, facilisis eget urna quis, commodo tempus ligula. Morbi sagittis, erat sed imperdiet mattis, libero libero sodales.",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Web Developer",
    quote:
        "Nullam placerat justo vitae vulputate dignissim. Nunc nec ante augue. Nulla mattis lacus a posuere sollicitudin. Nam dictum euismod velit non interdum.",
  },
]

export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0)
  const controls = useAnimation()
  const slideInterval = useRef<NodeJS.Timeout | null>(null)
  const slideDelay = 5000 // 5 seconds

  // Tự động chuyển slide
  useEffect(() => {
    startSlideTimer()

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current)
      }
    }
  }, [activeIndex])

  const startSlideTimer = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current)
    }

    slideInterval.current = setInterval(() => {
      nextSlide()
    }, slideDelay)
  }

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      prevSlide()
    } else if (info.offset.x < -100) {
      nextSlide()
    }
    startSlideTimer()
  }

  return (
      <section id="testimonial" className="relative py-20 text-white">
        <div className="absolute inset-0 z-0">
          <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2T5RWQRAADuGXqVDqpt4lfs1r3K8bs.png"
              alt="Rừng sương mù"
              fill
              className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                className="cursor-grab active:cursor-grabbing"
            >
              <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="py-8"
                >
                  <p className="mb-4 text-lg">
                    {testimonials[activeIndex].name}, {testimonials[activeIndex].role}
                  </p>

                  <blockquote className="text-2xl italic mb-8">"{testimonials[activeIndex].quote}"</blockquote>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <div className="flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                  <button
                      key={index}
                      onClick={() => {
                        setActiveIndex(index)
                        startSlideTimer() // Khởi động lại timer khi nhấn nút
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === activeIndex ? "bg-white w-6" : "bg-white/50"
                      }`}
                      aria-label={`Chuyển đến đánh giá ${index + 1}`}
                  />
              ))}
            </div>
          </div>
        </div>
      </section>
  )
}
