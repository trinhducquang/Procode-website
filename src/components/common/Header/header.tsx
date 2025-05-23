"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useEffect, useState, useCallback } from "react"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
import { ThemeToggle } from "@/components/theme-toggle"
import MobileMenu from "../MobileMenu/mobile-menu"
import LanguageSwitcher from "../LanguageSwitcher/language-switcher"
import { useI18n } from "@/lib/i18n/i18n-context"

export default function Header() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  const navItems = [
    { name: t.nav.home, href: "#", active: true },
    { name: t.nav.about, href: "#about", active: false },
    { name: t.nav.portfolio, href: "#portfolio", active: false },
    { name: t.nav.services, href: "#services", active: false },
    { name: t.nav.testimonial, href: "#testimonial", active: false },
    { name: t.nav.blog, href: "#blog", active: false },
    { name: t.nav.contact, href: "#contact", active: false },
  ]

  useSmoothScroll()

  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 10
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled)
    }

    const sections = navItems.map((item) => item.href.replace("#", "")).filter(Boolean)

    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section)
          break
        }
      }
    }
  }, [scrolled])

  useEffect(() => {
    // Sử dụng passive: true để tối ưu hiệu suất
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Gọi ngay lập tức để xác định section ban đầu

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  // Xử lý sự kiện click cho navigation item
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
      <motion.header
          className={cn(
              "fixed top-0 left-0 right-0 z-50 transition-all duration-300 gpu-accelerated",
              scrolled ? "bg-theme/90 backdrop-blur-md shadow-sm" : "bg-transparent",
          )}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
          <Link href="/" className={cn("text-xl font-bold transition-colors", scrolled ? "text-theme" : "text-white")}>
            Procode
          </Link>

          <div className="flex items-center space-x-2">
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item, index) => {
                const isActive = item.href === "#" ? activeSection === "" : activeSection === item.href.replace("#", "")

                return (
                    <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                      <Link
                          href={item.href}
                          className={cn(
                              "text-sm font-medium transition-colors",
                              scrolled
                                  ? isActive
                                      ? "text-theme font-bold"
                                      : "text-muted-theme hover:text-theme"
                                  : isActive
                                      ? "text-white font-bold"
                                      : "text-white/80 hover:text-white",
                          )}
                          onClick={(e) => handleNavClick(e, item.href)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                )
              })}
            </nav>
            <LanguageSwitcher />
            <ThemeToggle />
            <MobileMenu
                navItems={navItems}
                activeSection={activeSection}
                scrolled={scrolled}
                onNavClick={handleNavClick}
            />
          </div>
        </div>
      </motion.header>
  )
}