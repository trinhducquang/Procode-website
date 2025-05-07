"use client"

import { useState, useEffect, useRef } from "react"
import { useI18n } from "@/lib/i18n/i18n-context"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function LanguageSwitcher({ position = "bottom" }: { position?: "top" | "bottom" }) {
    const { locale, setLocale, t } = useI18n()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const toggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsOpen(!isOpen)
    }

    // Xử lý click bên ngoài dropdown
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick)
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [isOpen])

    const languages = [
        { code: "en", name: t.languageSwitcher.en, flag: "/flags/gb.svg" },
        { code: "ja", name: t.languageSwitcher.ja, flag: "/flags/jp.svg" },
        { code: "vi", name: t.languageSwitcher.vi, flag: "/flags/vn.svg" },
    ]

    const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0]

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Change language"
            >
                <span className="flex items-center justify-center w-6 h-6 relative overflow-hidden">
                    <Image 
                        src={currentLanguage.flag} 
                        alt={currentLanguage.name}
                        width={24}
                        height={24}
                        className="object-cover rounded-sm"
                    />
                </span>
                <span className="hidden md:inline text-sm font-medium text-theme">{locale.toUpperCase()}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={`absolute ${
                            position === "top" ? "bottom-full mb-2" : "top-full mt-2"
                        } right-0 w-48 rounded-md shadow-lg bg-card-theme ring-1 ring-black ring-opacity-5 z-[20000]`}
                        initial={{ opacity: 0, y: position === "top" ? 10 : -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: position === "top" ? 10 : -10 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
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
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setLocale(lang.code as "en" | "ja" | "vi")
                                        setIsOpen(false)
                                    }}
                                    role="menuitem"
                                >
                                    <span className="relative w-5 h-5 flex-shrink-0">
                                        <Image
                                            src={lang.flag}
                                            alt={lang.name}
                                            width={20}
                                            height={20}
                                            className="object-cover rounded-sm"
                                        />
                                    </span>
                                    <span>{lang.name}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
