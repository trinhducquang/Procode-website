"use client"

import { Volume2, VolumeX } from 'lucide-react'
import { motion } from "framer-motion"
import { useWeather } from "@/lib/weather/weather-context"

export default function SoundToggle() {
    const { soundEnabled, setSoundEnabled } = useWeather()

    return (
        <motion.button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`fixed bottom-4 left-4 z-[1001] flex items-center gap-1.5 px-3 py-2 rounded-full shadow-lg transition-colors ${
                soundEnabled
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-300/80 backdrop-blur-sm text-gray-700 dark:bg-gray-800/80 dark:text-gray-300 hover:bg-gray-400/80 dark:hover:bg-gray-700/80"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            aria-label={soundEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
        >
            {soundEnabled ? (
                <>
                    <Volume2 size={18} />
                    <span className="text-sm font-medium">Âm thanh: Bật</span>
                </>
            ) : (
                <>
                    <VolumeX size={18} />
                    <span className="text-sm font-medium">Âm thanh: Tắt</span>
                </>
            )}
        </motion.button>
    )
}
