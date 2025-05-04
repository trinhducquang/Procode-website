"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "./animated-section"
import { StaggeredChildren } from "./staggered-children"
import { StaggeredItem } from "./staggered-item"
import { motion } from "framer-motion"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Xử lý gửi form ở đây
    alert("Tin nhắn đã được gửi!")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-[#111827]">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-4xl font-bold text-center mb-16 dark:text-white">Contact Me</h2>
        </AnimatedSection>

        <div className="max-w-5xl mx-auto">
          <StaggeredChildren staggerChildren={0.1}>
            <div className="flex justify-center mb-16">
              <div className="grid grid-cols-1 gap-8 w-full">
                <StaggeredItem>
                  <div className="flex flex-col items-center text-center">
                    <Mail className="w-8 h-8 mb-4 dark:text-white" />
                    <p className="text-gray-700 dark:text-gray-300">quang.td.2430@aptechlearning.edu.vn</p>
                  </div>
                </StaggeredItem>

                <StaggeredItem>
                  <div className="flex flex-col items-center text-center">
                    <MapPin className="w-8 h-8 mb-4 dark:text-white" />
                    <p className="text-gray-700 dark:text-gray-300">
                      Hà Nội,
                      <br />
                      194 Đội Cấn, ID 55198
                    </p>
                  </div>
                </StaggeredItem>

                <StaggeredItem>
                  <div className="flex flex-col items-center text-center">
                    <Phone className="w-8 h-8 mb-4 dark:text-white" />
                    <p className="text-gray-700 dark:text-gray-300">+62 9344 3131 6</p>
                  </div>
                </StaggeredItem>
              </div>
            </div>
          </StaggeredChildren>

          <AnimatedSection delay={0.3}>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <motion.input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-gray-500"
                  whileFocus={{ scale: 1.01, borderColor: "#000" }}
                  transition={{ duration: 0.2 }}
                />

                <motion.input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-gray-500"
                  whileFocus={{ scale: 1.01, borderColor: "#000" }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              <motion.textarea
                name="message"
                placeholder="Message..."
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 mb-6 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-gray-500"
                whileFocus={{ scale: 1.01, borderColor: "#000" }}
                transition={{ duration: 0.2 }}
              />

              <div className="flex justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="submit"
                    className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 px-8 py-3"
                  >
                    Send Message
                  </Button>
                </motion.div>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
