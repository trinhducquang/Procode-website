"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

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
  const slideInterval = useRef<NodeJS.Timeout | null>(null)
  const slideDelay = 5000 // 5 seconds
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

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

  // Xử lý sự kiện cảm ứng để thực hiện vuốt
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const diff = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50 // Khoảng cách tối thiểu để nhận diện vuốt

    if (Math.abs(diff) >= minSwipeDistance) {
      if (diff > 0) {
        // Vuốt từ phải sang trái -> Slide tiếp theo
        nextSlide()
      } else {
        // Vuốt từ trái sang phải -> Slide trước đó
        prevSlide()
      }
    }

    // Reset giá trị
    touchStartX.current = null
    touchEndX.current = null
    startSlideTimer()
  }

  // Xử lý sự kiện chuột để thực hiện vuốt (cho desktop)
  const mouseStartX = useRef<number | null>(null)
  const mouseEndX = useRef<number | null>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mouseStartX.current !== null) {
      mouseEndX.current = e.clientX
    }
  }

  const handleMouseUp = () => {
    if (!mouseStartX.current || !mouseEndX.current) return

    const diff = mouseStartX.current - mouseEndX.current
    const minSwipeDistance = 50 // Khoảng cách tối thiểu để nhận diện vuốt

    if (Math.abs(diff) >= minSwipeDistance) {
      if (diff > 0) {
        // Vuốt từ phải sang trái -> Slide tiếp theo
        nextSlide()
      } else {
        // Vuốt từ trái sang phải -> Slide trước đó
        prevSlide()
      }
    }

    // Reset giá trị
    mouseStartX.current = null
    mouseEndX.current = null
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
            <div 
              className="relative overflow-hidden cursor-grab active:cursor-grabbing"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="py-8"
                >
                  <p className="mb-4 text-lg">
                    {testimonials[activeIndex].name}, {testimonials[activeIndex].role}
                  </p>

                  <blockquote className="text-2xl italic mb-8">"{testimonials[activeIndex].quote}"</blockquote>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center space-x-2 mt-4">
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
