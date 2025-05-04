"use client"

import { Facebook, Twitter, Instagram, Dribbble } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="py-10 bg-gray-50 dark:bg-[#111827] border-t dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="flex space-x-6 mb-6">
              <motion.a
                href="#"
                className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Dribbble className="w-5 h-5" />
                <span className="sr-only">Dribbble</span>
              </motion.a>
            </div>

            <motion.p
              className="text-gray-600 text-sm dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              © 2025 Quang. made by Procode
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  )
}
