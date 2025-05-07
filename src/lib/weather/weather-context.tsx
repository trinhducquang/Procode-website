"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Update the WeatherType definition
export type WeatherType = "none" | "rain" | "snow" | "leaves" | "fog" | "stars" | "fireworks"

interface WeatherContextType {
    weather: WeatherType
    setWeather: (weather: WeatherType) => void
    soundEnabled: boolean
    setSoundEnabled: (enabled: boolean) => void
    hasUserInteracted: boolean
    setHasUserInteracted: () => void
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

export function WeatherProvider({ children }: { children: ReactNode }) {
    const [weather, setWeather] = useState<WeatherType>("none")
    const [soundEnabled, setSoundEnabled] = useState<boolean>(false) // Luôn mặc định là tắt
    const [hasUserInteracted, setHasUserInteracted] = useState<boolean>(false)

    // Update the validation in the useEffect
    useEffect(() => {
        // Lấy trạng thái thời tiết từ localStorage nếu có
        const savedWeather = localStorage.getItem("weather") as WeatherType | null
        if (savedWeather && ["none", "rain", "snow", "leaves", "fog", "stars", "fireworks"].includes(savedWeather)) {
            setWeather(savedWeather)
        }

        // Tự động đặt hasUserInteracted thành true để tránh lỗi autoplay
        // Người dùng vẫn phải click vào nút bật âm thanh, nhưng không cần tương tác thêm để phát
        setHasUserInteracted(true);
        
        // Không cần theo dõi các sự kiện tương tác người dùng nữa
    }, [])

    const handleSetWeather = (newWeather: WeatherType) => {
        setWeather(newWeather)
        localStorage.setItem("weather", newWeather)
    }

    const handleSetSoundEnabled = (enabled: boolean) => {
        setSoundEnabled(enabled)
        // Không lưu trạng thái âm thanh vào localStorage nữa
    }
    
    // Đánh dấu đã có tương tác từ người dùng
    const handleSetHasUserInteracted = () => {
        console.log("Manual setting of user interaction")
        setHasUserInteracted(true)
    }

    return (
        <WeatherContext.Provider
            value={{ 
                weather, 
                setWeather: handleSetWeather, 
                soundEnabled, 
                setSoundEnabled: handleSetSoundEnabled,
                hasUserInteracted,
                setHasUserInteracted: handleSetHasUserInteracted
            }}
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
