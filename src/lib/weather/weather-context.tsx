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
    const [soundEnabled, setSoundEnabled] = useState<boolean>(false)
    const [hasUserInteracted, setHasUserInteracted] = useState<boolean>(false)

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
        
        // Đánh dấu tương tác người dùng khi có sự kiện
        const markUserInteraction = () => {
            console.log("User interaction detected")
            setHasUserInteracted(true)
            
            // Gỡ bỏ các sự kiện lắng nghe sau lần đầu tương tác
            window.removeEventListener('click', markUserInteraction)
            window.removeEventListener('keydown', markUserInteraction)
            window.removeEventListener('touchstart', markUserInteraction)
            // Giữ lại mousemove một thời gian để đảm bảo nó được xử lý
            setTimeout(() => {
                window.removeEventListener('mousemove', handleMouseMove)
            }, 1000)
        }
        
        // Xử lý riêng cho sự kiện di chuột để tránh gọi quá nhiều lần
        let mouseMoveTimer: NodeJS.Timeout | null = null
        const handleMouseMove = () => {
            if (mouseMoveTimer) return; // Đã có timer đang chạy, bỏ qua
            
            // Đặt timer để chỉ xử lý sau một khoảng thời gian
            mouseMoveTimer = setTimeout(() => {
                console.log("Mouse move triggered interaction")
                setHasUserInteracted(true)
                
                // Gỡ bỏ các sự kiện khác vì đã có tương tác
                window.removeEventListener('click', markUserInteraction)
                window.removeEventListener('keydown', markUserInteraction)
                window.removeEventListener('touchstart', markUserInteraction)
                
                // Xóa timer
                mouseMoveTimer = null
            }, 200)
        }
        
        // Thêm sự kiện lắng nghe tương tác người dùng
        window.addEventListener('click', markUserInteraction)
        window.addEventListener('keydown', markUserInteraction)
        window.addEventListener('touchstart', markUserInteraction)
        window.addEventListener('mousemove', handleMouseMove)
        
        return () => {
            window.removeEventListener('click', markUserInteraction)
            window.removeEventListener('keydown', markUserInteraction)
            window.removeEventListener('touchstart', markUserInteraction)
            window.removeEventListener('mousemove', handleMouseMove)
            if (mouseMoveTimer) clearTimeout(mouseMoveTimer)
        }
    }, [])

    const handleSetWeather = (newWeather: WeatherType) => {
        setWeather(newWeather)
        localStorage.setItem("weather", newWeather)
    }

    const handleSetSoundEnabled = (enabled: boolean) => {
        setSoundEnabled(enabled)
        setHasUserInteracted(true) // Khi người dùng điều chỉnh âm thanh, coi như đã tương tác
        localStorage.setItem("soundEnabled", enabled.toString())
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
