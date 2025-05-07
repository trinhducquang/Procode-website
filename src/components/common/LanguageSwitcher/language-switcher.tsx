"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n/i18n-context"
import { motion, AnimatePresence } from "framer-motion"

export default function LanguageSwitcher({ position = "bottom" }: { position?: "top" | "bottom" }) {
    const { locale, setLocale, t } = useI18n()
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => setIsOpen(!isOpen)

    const languages = [
        { code: "en", name: t.languageSwitcher.en, flag: "🇬🇧" },
        { code: "ja", name: t.languageSwitcher.ja, flag: "🇯🇵" },
        { code: "vi", name: t.languageSwitcher.vi, flag: "🇻🇳" },
    ]

    const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0]

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Change language"
            >
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="hidden md:inline text-sm font-medium text-theme">{locale.toUpperCase()}</span>
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
                            className={`absolute ${
                                position === "top" ? "bottom-full mb-2" : "top-full mt-2"
                            } right-0 w-48 rounded-md shadow-lg bg-card-theme ring-1 ring-black ring-opacity-5 z-50`}
                            initial={{ opacity: 0, y: position === "top" ? 10 : -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: position === "top" ? 10 : -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="py-1" role="menu" aria-orientation="vertical">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 ${
                                            locale === lang.code
                                                ? "bg-gray-100 dark:bg-gray-700 text-theme"
                                                : "text-muted-theme hover:bg-gray-100 dark:hover:bg-gray-700"
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
