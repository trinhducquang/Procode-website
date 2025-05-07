"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"

interface LanguageOption {
    code: string
    name: string
    flag?: string
}

interface LanguageDropdownProps {
    currentLanguage: string
    onLanguageChange: (code: string) => void
    isMobile?: boolean
}

const languages: LanguageOption[] = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "ja", name: "Japanese", flag: "🇯🇵" },
    { code: "vi", name: "Vietnamese", flag: "🇻🇳" },
]

export default function LanguageDropdown({
                                             currentLanguage,
                                             onLanguageChange,
                                             isMobile = false,
                                         }: LanguageDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const currentLang = languages.find((lang) => lang.code === currentLanguage) || languages[0]

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between px-3 py-2 rounded-md ${
                    isMobile
                        ? "w-full bg-gray-700 text-white"
                        : "bg-card-theme text-theme hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
            >
                {currentLang.flag && <span className="mr-2">{currentLang.flag}</span>}
                <span>{currentLang.name}</span>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {isOpen && (
                <div
                    className={`absolute z-50 w-full bg-card-theme rounded-md shadow-lg ${
                        isMobile ? "bottom-full mb-1" : "top-full mt-1"
                    }`}
                >
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                onLanguageChange(lang.code)
                                setIsOpen(false)
                            }}
                            className={`block w-full text-left px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${
                                currentLanguage === lang.code ? "bg-primary-theme text-primary-theme" : "text-theme"
                            }`}
                        >
                            {lang.flag && <span className="mr-2">{lang.flag}</span>}
                            {lang.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
