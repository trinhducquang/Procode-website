"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n/i18n-context"
import { motion, AnimatePresence } from "framer-motion"
import { Globe } from "lucide-react"

export default function LanguageSwitcher() {
    const { locale, setLocale, t } = useI18n()
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => setIsOpen(!isOpen)

    const languages = [
        { code: "en", name: t.languageSwitcher.en, flag: "🇬🇧" },
        { code: "ja", name: t.languageSwitcher.ja, flag: "🇯🇵" },
        { code: "vi", name: t.languageSwitcher.vi, flag: "🇻🇳" },
    ]

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Change language"
            >
                <Globe className="w-5 h-5" />
                <span className="hidden md:inline text-sm font-medium">{locale.toUpperCase()}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="py-1" role="menu" aria-orientation="vertical">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 ${
                                            locale === lang.code
                                                ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                                                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                        onClick={() => {
                                            setLocale(lang.code as "en" | "ja" | "vi")
                                            setIsOpen(false)
                                        }}
                                        role="menuitem"
                                    >
                                        <span className="text-lg">{lang.flag}</span>
                                        <span>{lang.name}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
