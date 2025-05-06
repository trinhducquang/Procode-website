"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Update the WeatherType definition
export type WeatherType = "none" | "rain" | "snow" | "leaves" | "fog" | "stars" | "fireworks"

interface WeatherContextType {
    weather: WeatherType
    setWeather: (weather: WeatherType) => void
    soundEnabled: boolean
    setSoundEnabled: (enabled: boolean) => void
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

export function WeatherProvider({ children }: { children: ReactNode }) {
    const [weather, setWeather] = useState<WeatherType>("none")
    const [soundEnabled, setSoundEnabled] = useState<boolean>(false)

    // Update the validation in the useEffect
    useEffect(() => {
        // Lấy trạng thái thời tiết từ localStorage nếu có
        const savedWeather = localStorage.getItem("weather") as WeatherType | null
        if (savedWeather && ["none", "rain", "snow", "leaves", "fog", "stars", "fireworks"].includes(savedWeather)) {
            setWeather(savedWeather)
        }

        // Lấy trạng thái âm thanh từ localStorage
        const savedSoundEnabled = localStorage.getItem("soundEnabled")
        if (savedSoundEnabled) {
            setSoundEnabled(savedSoundEnabled === "true")
        }
    }, [])

    const handleSetWeather = (newWeather: WeatherType) => {
        setWeather(newWeather)
        localStorage.setItem("weather", newWeather)
    }

    const handleSetSoundEnabled = (enabled: boolean) => {
        setSoundEnabled(enabled)
        localStorage.setItem("soundEnabled", enabled.toString())
    }

    return (
        <WeatherContext.Provider
            value={{ weather, setWeather: handleSetWeather, soundEnabled, setSoundEnabled: handleSetSoundEnabled }}
        >
            {children}
        </WeatherContext.Provider>
    )
}

export function useWeather() {
    const context = useContext(WeatherContext)
    if (context === undefined) {
        throw new Error("useWeather must be used within a WeatherProvider")
    }
    return context
}
