"use client"

import { Facebook, Twitter, Instagram, Dribbble } from "lucide-react"
import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n/i18n-context"
import Link from "next/link"

export default function Footer() {
  const { t } = useI18n()

  return (
      <footer className="py-10 bg-card-theme border-t border-theme/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center">
              <Link href="/" className="text-xl font-bold text-theme mb-6">
                Procode
              </Link>

              <div className="flex space-x-6 mb-6">
                <motion.a
                    href="#"
                    className="text-muted-theme hover:text-theme"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                >
                  <Facebook className="w-5 h-5" />
                  <span className="sr-only">Facebook</span>
                </motion.a>
                <motion.a
                    href="#"
                    className="text-muted-theme hover:text-theme"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                >
                  <Twitter className="w-5 h-5" />
                  <span className="sr-only">Twitter</span>
                </motion.a>
                <motion.a
                    href="#"
                    className="text-muted-theme hover:text-theme"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                >
                  <Instagram className="w-5 h-5" />
                  <span className="sr-only">Instagram</span>
                </motion.a>
                <motion.a
                    href="#"
                    className="text-muted-theme hover:text-theme"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                >
                  <Dribbble className="w-5 h-5" />
                  <span className="sr-only">Dribbble</span>
                </motion.a>
              </div>

              <motion.p
                  className="text-muted-theme text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
              >
                {t.footer.copyright}
              </motion.p>
            </div>
          </div>
        </div>
      </footer>
  )
}
