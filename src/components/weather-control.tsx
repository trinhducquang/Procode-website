"use client"

import {JSX, useState} from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cloud, Snowflake, Wind, Moon, Sparkles, CloudRain, Volume2, VolumeX, X } from "lucide-react"
import { useWeather, type WeatherType } from "@/lib/weather/weather-context"

export default function WeatherControl() {
    const { weather, setWeather, soundEnabled, setSoundEnabled } = useWeather()
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = () => setIsOpen(!isOpen)

    const weatherOptions: { id: WeatherType; name: string; icon: JSX.Element; emoji: string }[] = [
        { id: "none", name: "Không có hiệu ứng", icon: <X size={18} />, emoji: "❌" },
        { id: "rain", name: "Mưa", icon: <CloudRain size={18} />, emoji: "🌧️" },
        { id: "snow", name: "Tuyết rơi", icon: <Snowflake size={18} />, emoji: "❄️" },
        { id: "leaves", name: "Lá rơi", icon: <Wind size={18} />, emoji: "🍂" },
        { id: "fog", name: "Sương mù", icon: <Cloud size={18} />, emoji: "🌫️" },
        { id: "stars", name: "Sao đêm", icon: <Moon size={18} />, emoji: "✨" },
        { id: "fireworks", name: "Pháo hoa", icon: <Sparkles size={18} />, emoji: "🎆" },
        // Đã loại bỏ hiệu ứng mây trôi và nắng
    ]

    const currentWeather = weatherOptions.find((option) => option.id === weather) || weatherOptions[0]

    return (
        <div className="fixed bottom-4 right-4 z-[10001]">
            <motion.button
                onClick={toggleOpen}
                className="bg-primary-theme text-primary-theme p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Điều khiển thời tiết"
            >
                {isOpen ? <X size={24} /> : <span className="text-xl">{currentWeather.emoji}</span>}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-16 right-0 bg-card-theme rounded-lg shadow-xl p-4 w-64"
                    >
                        <div className="flex justify-between items-center mb-3 border-b pb-2">
                            <h3 className="text-theme font-medium">Hiệu ứng thời tiết</h3>
                            <button
                                onClick={() => setSoundEnabled(!soundEnabled)}
                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
                                aria-label={soundEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
                            >
                                {soundEnabled ? (
                                    <>
                                        <Volume2 size={16} className="text-theme" />
                                        <span className="text-xs text-theme">Bật</span>
                                    </>
                                ) : (
                                    <>
                                        <VolumeX size={16} className="text-theme" />
                                        <span className="text-xs text-theme">Tắt</span>
                                    </>
                                )}
                            </button>
                        </div>
                        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                            {weatherOptions.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => {
                                        setWeather(option.id)
                                        setIsOpen(false)
                                    }}
                                    className={`w-full p-2 rounded-md flex items-center justify-between transition-colors ${
                                        weather === option.id
                                            ? "bg-primary-theme text-primary-theme"
                                            : "bg-card-theme text-theme hover:bg-gray-200 dark:hover:bg-gray-700"
                                    }`}
                                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{option.emoji}</span>
                      {option.name}
                  </span>
                                    {weather === option.id && <span className="text-xs">✓</span>}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
