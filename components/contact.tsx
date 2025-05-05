"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "./animated-section"
import { StaggeredChildren } from "./staggered-children"
import { StaggeredItem } from "./staggered-item"
import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n/i18n-context"

export default function Contact() {
  const { t } = useI18n()
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
    alert(t.contact.success)
    setFormData({ name: "", email: "", message: "" })
  }

  return (
      <section id="contact" className="py-20 bg-card-theme transition-colors duration-300">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-16 text-theme">{t.contact.title}</h2>
          </AnimatedSection>

          <div className="max-w-5xl mx-auto">
            <StaggeredChildren staggerChildren={0.1}>
              <div className="flex justify-center mb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  <StaggeredItem>
                    <div className="flex flex-col items-center text-center">
                      <Mail className="w-8 h-8 mb-4 text-theme" />
                      <p className="text-muted-theme">dew@email.com</p>
                    </div>
                  </StaggeredItem>

                  <StaggeredItem>
                    <div className="flex flex-col items-center text-center">
                      <MapPin className="w-8 h-8 mb-4 text-theme" />
                      <p className="text-muted-theme">
                        Banguntapan,
                        <br />
                        Yogyakarta, ID 55198
                      </p>
                    </div>
                  </StaggeredItem>

                  <StaggeredItem>
                    <div className="flex flex-col items-center text-center">
                      <Phone className="w-8 h-8 mb-4 text-theme" />
                      <p className="text-muted-theme">+62 123 456 7890</p>
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
                      placeholder={t.contact.form.name}
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-input-theme rounded-md focus:outline-none focus:ring-2 ring-theme bg-input-theme text-input-theme"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                  />

                  <motion.input
                      type="email"
                      name="email"
                      placeholder={t.contact.form.email}
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-input-theme rounded-md focus:outline-none focus:ring-2 ring-theme bg-input-theme text-input-theme"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                  />
                </div>

                <motion.textarea
                    name="message"
                    placeholder={t.contact.form.message}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-input-theme rounded-md focus:outline-none focus:ring-2 ring-theme mb-6 bg-input-theme text-input-theme"
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                />

                <div className="flex justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button type="submit" className="bg-primary-theme text-primary-theme hover:opacity-90 px-8 py-3">
                      {t.contact.form.send}
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
