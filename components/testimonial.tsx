"use client"

import { useState } from "react"
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
]

export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonial" className="relative py-20 text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/developer.jpg"
          alt="Rừng sương mù"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-4 text-lg">
                {testimonials[activeIndex].name}, {testimonials[activeIndex].role}
              </p>

              <blockquote className="text-2xl italic mb-8">"{testimonials[activeIndex].quote}"</blockquote>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full ${index === activeIndex ? "bg-white" : "bg-white/50"}`}
                aria-label={`Chuyển đến đánh giá ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
