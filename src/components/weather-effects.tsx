"use client"

import { useEffect, useRef, useState } from "react"
import { useWeather, type WeatherType } from "@/lib/weather/weather-context"

export default function WeatherEffects() {
    const { weather, soundEnabled, hasUserInteracted, setHasUserInteracted } = useWeather()
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [audioLoaded, setAudioLoaded] = useState<boolean>(false)
    const userInteractionRef = useRef<boolean>(false)

    // Theo dõi hasUserInteracted bằng ref để dễ truy cập trong event listeners
    useEffect(() => {
        userInteractionRef.current = hasUserInteracted
    }, [hasUserInteracted])

    // Xóa canvas ngay khi weather thay đổi
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current
            const ctx = canvas.getContext("2d")
            if (ctx) {
                canvas.width = window.innerWidth
                canvas.height = window.innerHeight
                ctx.clearRect(0, 0, canvas.width, canvas.height)
            }
        }
    }, [weather])

    // Thêm sự kiện di chuột trên canvas để xác định tương tác
    useEffect(() => {
        if (!canvasRef.current) return;
        
        const handleCanvasInteraction = () => {
            if (!userInteractionRef.current) {
                console.log("Canvas interaction detected");
                setHasUserInteracted();
            }
        };
        
        const canvas = canvasRef.current;
        canvas.addEventListener('mousemove', handleCanvasInteraction);
        
        return () => {
            canvas.removeEventListener('mousemove', handleCanvasInteraction);
        };
    }, [setHasUserInteracted]);

    // Xử lý âm thanh
    useEffect(() => {
        // Xử lý khi tắt âm thanh
        if (!soundEnabled) {
            if (audioRef.current) {
                audioRef.current.pause()
                if (audioRef.current.onended) {
                    audioRef.current.onended = null
                }
                if (audioRef.current.onerror) {
                    audioRef.current.onerror = null
                }
                audioRef.current = null
            }
            setAudioLoaded(false)
            return
        }

        // Nếu người dùng chưa tương tác với trang, chỉ tải âm thanh nhưng chưa phát
        if (!hasUserInteracted) {
            console.log("User has not interacted yet - preparing audio but not playing");
            // Vẫn tạo audio nhưng không tự động phát
            let audioSrc = getAudioSource(weather);
            if (audioSrc && !audioRef.current) {
                audioRef.current = new Audio(audioSrc);
                audioRef.current.loop = true;
                audioRef.current.volume = 0.3;
                audioRef.current.preload = "auto";
                audioRef.current.load();
                setAudioLoaded(true);
            }
            return;
        }

        function getAudioSource(currentWeather: WeatherType): string {
            switch (currentWeather) {
                case "rain":
                    return "/sounds/rain.mp3"
                case "snow":
                    return "/sounds/snow.mp3"
                case "leaves":
                    return "/sounds/wind.mp3"
                case "fog":
                    return "/sounds/fog.mp3"
                case "stars":
                    return "/sounds/night.mp3"
                case "fireworks":
                    return "/sounds/fireworks.mp3"
                default:
                    return ""
            }
        }

        let audioSrc = getAudioSource(weather);
        console.log(`Audio processing for ${weather}, source: ${audioSrc}, enabled: ${soundEnabled}, user interacted: ${hasUserInteracted}`);

        // Nếu không có file âm thanh, không làm gì cả
        if (!audioSrc) {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current = null
                setAudioLoaded(false)
            }
            return;
        }

        try {
            const currentSrc = audioRef.current ? audioRef.current.src : "";
            const newSrc = new URL(audioSrc, window.location.href).href;
            
            // Nếu âm thanh đã tải và người dùng mới tương tác, phát ngay
            if (audioLoaded && hasUserInteracted && audioRef.current && audioRef.current.paused) {
                console.log("User has interacted, playing previously loaded audio");
                // Thêm xử lý để đảm bảo âm thanh phát khi di chuột
                const playAudio = () => {
                    if (audioRef.current) {
                        audioRef.current.play().catch(err => {
                            console.log("Error playing audio after interaction:", err);
                            // Thử lại sau một khoảng thời gian ngắn
                            if (hasUserInteracted && soundEnabled) {
                                setTimeout(playAudio, 500);
                            }
                        });
                    }
                };
                playAudio();
                return;
            }

            // Nếu đang phát cùng một file âm thanh, không làm gì cả
            if (currentSrc === newSrc && audioRef.current && !audioRef.current.paused) {
                console.log("Already playing the correct audio file");
                return;
            }
            
            // Nếu đang phát một file âm thanh khác, dừng nó
            if (audioRef.current) {
                console.log("Stopping current audio to play a new one");
                audioRef.current.pause();
                if (audioRef.current.onended) {
                    audioRef.current.onended = null;
                }
                if (audioRef.current.onerror) {
                    audioRef.current.onerror = null;
                }
            }
            
            // Tạo và phát file âm thanh mới
            console.log("Creating new audio:", audioSrc);
            
            const audio = new Audio(audioSrc);
            audioRef.current = audio;
            
            // Đặt thuộc tính trước khi phát
            audio.loop = true;
            audio.volume = 0.3;
            audio.preload = "auto";
            
            // Thêm event listener để theo dõi trạng thái
            audio.addEventListener('canplaythrough', () => {
                console.log(`Audio ${audioSrc} ready to play through`);
                setAudioLoaded(true);
                
                // Chỉ phát nếu người dùng đã tương tác
                if (hasUserInteracted && soundEnabled) {
                    console.log("User has interacted, playing audio immediately after load");
                    const playAudio = () => {
                        audio.play().catch(err => {
                            console.log("Error playing audio:", err);
                            // Thử phát lại nếu gặp lỗi
                            if (hasUserInteracted && soundEnabled) {
                                setTimeout(playAudio, 500);
                            }
                        });
                    };
                    playAudio();
                }
            });
            
            audio.addEventListener('play', () => {
                console.log(`Audio ${audioSrc} started playing`);
            });
            
            // Ngăn chặn sự kiện ended gây refresh trang
            audio.onended = () => {
                console.log(`Audio ${audioSrc} ended, attempting to replay`);
                if (audio.loop && soundEnabled && hasUserInteracted) {
                    audio.currentTime = 0;
                    audio.play().catch(err => console.log("Error replaying audio:", err));
                }
            };
            
            // Xử lý lỗi khi phát âm thanh
            audio.onerror = () => {
                console.log(`Audio error occurred with ${audioSrc}, code:`, audio.error?.code);
            };
            
            // Tải âm thanh
            audio.load();
            
            // Chỉ phát nếu người dùng đã tương tác
            if (hasUserInteracted) {
                setTimeout(() => {
                    if (audioRef.current && soundEnabled) {
                        console.log("User has interacted, attempting to play after delay");
                        const playAudio = () => {
                            if (audioRef.current) {
                                audioRef.current.play().catch(err => {
                                    console.log("Error playing audio:", err);
                                    if (hasUserInteracted && soundEnabled) {
                                        setTimeout(playAudio, 500);
                                    }
                                });
                            }
                        };
                        playAudio();
                    }
                }, 200);
            } else {
                console.log("Audio loaded but waiting for user interaction before playing");
            }
            
        } catch (err) {
            console.log("Error in audio setup:", err);
        }

        // Cleanup khi component unmount hoặc deps thay đổi
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                if (audioRef.current.onended) {
                    audioRef.current.onended = null;
                }
                if (audioRef.current.onerror) {
                    audioRef.current.onerror = null;
                }
                audioRef.current = null;
            }
            setAudioLoaded(false);
        };
    }, [weather, soundEnabled, hasUserInteracted, setHasUserInteracted]);

    // Hiệu ứng mưa (đã loại bỏ sấm chớp)
    useEffect(() => {
        if (weather !== "rain" || !canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const drops: { x: number; y: number; length: number; speed: number; opacity: number }[] = []
        const dropCount = Math.floor(window.innerWidth / 5) // Số lượng giọt mưa dựa trên chiều rộng màn hình

        // Tạo các giọt mưa
        for (let i = 0; i < dropCount; i++) {
            drops.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                length: Math.random() * 20 + 10,
                speed: Math.random() * 10 + 5,
                opacity: Math.random() * 0.5 + 0.3,
            })
        }

        // Vẽ mưa
        const animate = () => {
            if (!ctx || !canvas) return

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.strokeStyle = "rgba(174, 194, 224, 0.7)"
            ctx.lineWidth = 1

            drops.forEach((drop) => {
                ctx.beginPath()
                ctx.moveTo(drop.x, drop.y)
                ctx.lineTo(drop.x, drop.y + drop.length)
                ctx.globalAlpha = drop.opacity
                ctx.stroke()

                drop.y += drop.speed

                // Nếu giọt mưa rơi ra khỏi màn hình, đặt lại vị trí
                if (drop.y > canvas.height) {
                    drop.y = 0 - drop.length
                    drop.x = Math.random() * canvas.width
                }
            })

            requestAnimationFrame(animate)
        }

        const animationId = requestAnimationFrame(animate)

        // Xử lý thay đổi kích thước màn hình
        const handleResize = () => {
            if (!canvas) return
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            cancelAnimationFrame(animationId)
        }
    }, [weather])

    // Hiệu ứng tuyết rơi
    useEffect(() => {
        if (weather !== "snow" || !canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const snowflakes: {
            x: number
            y: number
            size: number
            speed: number
            opacity: number
            swing: number
            swingSpeed: number
        }[] = []
        const snowflakeCount = Math.floor(window.innerWidth / 10) // Số lượng bông tuyết dựa trên chiều rộng màn hình

        // Tạo các bông tuyết
        for (let i = 0; i < snowflakeCount; i++) {
            snowflakes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 5 + 1,
                speed: Math.random() * 1 + 0.5,
                opacity: Math.random() * 0.5 + 0.3,
                swing: 0,
                swingSpeed: Math.random() * 0.02 + 0.01,
            })
        }

        // Vẽ tuyết
        const animate = () => {
            if (!ctx || !canvas) return

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)"

            snowflakes.forEach((flake) => {
                ctx.beginPath()
                ctx.globalAlpha = flake.opacity
                ctx.arc(flake.x + Math.sin(flake.swing) * 10, flake.y, flake.size, 0, Math.PI * 2)
                ctx.fill()

                flake.y += flake.speed
                flake.swing += flake.swingSpeed

                // Nếu bông tuyết rơi ra khỏi màn hình, đặt lại vị trí
                if (flake.y > canvas.height) {
                    flake.y = 0 - flake.size
                    flake.x = Math.random() * canvas.width
                }
            })

            requestAnimationFrame(animate)
        }

        const animationId = requestAnimationFrame(animate)

        // Xử lý thay đổi kích thước màn hình
        const handleResize = () => {
            if (!canvas) return
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            cancelAnimationFrame(animationId)
        }
    }, [weather])

    // Hiệu ứng lá rơi
    useEffect(() => {
        if (weather !== "leaves" || !canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const leaves: {
            x: number
            y: number
            size: number
            speed: number
            rotation: number
            rotationSpeed: number
            color: string
            swing: number
            swingSpeed: number
        }[] = []
        const leafCount = Math.floor(window.innerWidth / 20) // Số lượng lá dựa trên chiều rộng màn hình
        const leafColors = ["#8B4513", "#A0522D", "#CD853F", "#D2691E", "#B8860B", "#DAA520", "#FF8C00"]

        // Tạo các lá
        for (let i = 0; i < leafCount; i++) {
            leaves.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 10 + 5,
                speed: Math.random() * 2 + 1,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 2 - 1,
                color: leafColors[Math.floor(Math.random() * leafColors.length)],
                swing: 0,
                swingSpeed: Math.random() * 0.03 + 0.01,
            })
        }

        // Vẽ lá
        const animate = () => {
            if (!ctx || !canvas) return

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            leaves.forEach((leaf) => {
                ctx.save()
                ctx.translate(leaf.x + Math.sin(leaf.swing) * 20, leaf.y)
                ctx.rotate((leaf.rotation * Math.PI) / 180)

                // Vẽ hình lá đơn giản
                ctx.beginPath()
                ctx.fillStyle = leaf.color
                ctx.moveTo(0, -leaf.size / 2)
                ctx.bezierCurveTo(leaf.size / 2, -leaf.size / 4, leaf.size / 2, leaf.size / 4, 0, leaf.size / 2)
                ctx.bezierCurveTo(-leaf.size / 2, leaf.size / 4, -leaf.size / 2, -leaf.size / 4, 0, -leaf.size / 2)
                ctx.fill()

                // Vẽ gân lá
                ctx.beginPath()
                ctx.strokeStyle = "rgba(0, 0, 0, 0.3)"
                ctx.lineWidth = 1
                ctx.moveTo(0, -leaf.size / 2)
                ctx.lineTo(0, leaf.size / 2)
                ctx.stroke()

                ctx.restore()

                leaf.y += leaf.speed
                leaf.rotation += leaf.rotationSpeed
                leaf.swing += leaf.swingSpeed

                // Nếu lá rơi ra khỏi màn hình, đặt lại vị trí
                if (leaf.y > canvas.height) {
                    leaf.y = -leaf.size
                    leaf.x = Math.random() * canvas.width
                }
            })

            requestAnimationFrame(animate)
        }

        const animationId = requestAnimationFrame(animate)

        // Xử lý thay đổi kích thước màn hình
        const handleResize = () => {
            if (!canvas) return
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            cancelAnimationFrame(animationId)
        }
    }, [weather])

    // Hiệu ứng sương mù
    useEffect(() => {
        if (weather !== "fog" || !canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const fogParticles: { x: number; y: number; radius: number; opacity: number; speed: number }[] = []
        const particleCount = 50

        // Tạo các hạt sương mù
        for (let i = 0; i < particleCount; i++) {
            fogParticles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 100 + 50,
                opacity: Math.random() * 0.3 + 0.1,
                speed: Math.random() * 0.5 + 0.1,
            })
        }

        // Vẽ sương mù
        const animate = () => {
            if (!ctx || !canvas) return

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Các hạt sương mù di chuyển
            fogParticles.forEach((particle) => {
                const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radius)
                gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity})`)
                gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

                ctx.beginPath()
                ctx.fillStyle = gradient
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
                ctx.fill()

                particle.x += particle.speed
                if (particle.x > canvas.width + particle.radius) {
                    particle.x = -particle.radius
                    particle.y = Math.random() * canvas.height
                }
            })

            requestAnimationFrame(animate)
        }

        const animationId = requestAnimationFrame(animate)

        // Xử lý thay đổi kích thước màn hình
        const handleResize = () => {
            if (!canvas) return
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            cancelAnimationFrame(animationId)
        }
    }, [weather])

    // Hiệu ứng Starfield Reverse - các ngôi sao chuyển động từ viền vào tâm
    useEffect(() => {
        if (weather !== "stars" || !canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d", { alpha: true })
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        let centerX = canvas.width / 2
        let centerY = canvas.height / 2
        
        interface Star {
            x: number
            y: number
            z: number
            prevZ: number
            size: number
            brightness: number
            color: string
        }
        
        // Xác định số lượng sao dựa trên độ rộng màn hình và hiệu suất thiết bị
        const isMobile = window.innerWidth <= 768
        const isLowPerfDevice = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : true
        
        // Điều chỉnh số lượng sao dựa trên hiệu suất thiết bị
        const getStarCount = () => {
            if (isMobile && isLowPerfDevice) return 300
            if (isMobile) return 500
            if (isLowPerfDevice) return 600
            return 1000
        }
        
        const stars: Star[] = []
        const starCount = getStarCount()
        const speed = isMobile ? 3 : 5
        
        // Các màu sắc khác nhau cho ngôi sao - thêm màu đậm hơn
        const starColors = [
            'rgba(255, 255, 255, 1)', // Trắng
            'rgba(173, 216, 230, 1)', // Xanh nhạt
            'rgba(240, 248, 255, 1)', // Xanh rất nhạt
            'rgba(255, 255, 224, 1)', // Vàng nhạt
            'rgba(135, 206, 250, 1)', // Xanh da trời nhạt
            'rgba(30, 144, 255, 1)',  // Xanh dương đậm
            'rgba(0, 191, 255, 1)',   // Xanh da trời đậm
            'rgba(70, 130, 180, 1)',  // Xanh steel
            'rgba(100, 149, 237, 1)', // Xanh cornflower
            'rgba(176, 224, 230, 1)'  // Xanh powder
        ]
        
        // Khởi tạo các ngôi sao
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width * 2 - canvas.width,
                y: Math.random() * canvas.height * 2 - canvas.height,
                z: Math.random() * 1000,
                prevZ: 0,
                size: Math.random() * 3 + 1,
                brightness: Math.random() * 0.5 + 0.5,
                color: starColors[Math.floor(Math.random() * starColors.length)]
            })
        }

        // Biến theo dõi thời gian
        let lastTime = 0
        const targetFPS = 60
        const targetFrameTime = 1000 / targetFPS

        // Hàm vẽ và cập nhật trường sao
        const animate = (timestamp: number) => {
            if (!ctx || !canvas) return
            
            // Kiểm soát tốc độ FPS
            const deltaTime = timestamp - lastTime
            if (deltaTime < targetFrameTime) {
                requestAnimationFrame(animate)
                return
            }
            lastTime = timestamp - (deltaTime % targetFrameTime)
            
            // Xóa canvas hoàn toàn trước khi vẽ
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            
            // Sử dụng batch rendering để tối ưu hiệu suất
            const hasShadowSupport = !isMobile && !isLowPerfDevice
            let shadowsEnabled = false
            let currentBatch: Star[] = []
            
            // Cập nhật vị trí tất cả các sao trước khi vẽ
            for (const star of stars) {
                // Lưu giá trị z trước đó để tính vết sao
                star.prevZ = star.z
                
                // Di chuyển sao về phía màn hình (giảm giá trị z)
                star.z -= speed
                
                // Nếu sao đã đi qua màn hình, tạo sao mới ở xa
                if (star.z <= 0) {
                    star.x = Math.random() * canvas.width * 2 - canvas.width
                    star.y = Math.random() * canvas.height * 2 - canvas.height
                    star.z = 1000
                    star.prevZ = star.z
                }
            }
            
            // Vẽ tất cả các sao thường
            for (const star of stars) {
                // Chuyển đổi từ tọa độ 3D sang 2D
                const sx = (star.x / star.z) * 500 + centerX
                const sy = (star.y / star.z) * 500 + centerY
                
                // Kiểm tra xem sao có nằm trong khung nhìn không
                if (sx < 0 || sx > canvas.width || sy < 0 || sy > canvas.height) {
                    continue
                }
                
                // Kích thước sao phụ thuộc vào khoảng cách
                const scaledSize = star.size * (1000 - star.z) / 1000
                
                // Độ sáng tăng khi sao tiến gần
                const opacity = star.brightness * (1000 - star.z) / 1000
                
                // Vẽ sao với độ sáng và kích thước thay đổi
                ctx.beginPath()
                
                // Chỉ áp dụng shadow cho thiết bị có hiệu suất cao
                if (hasShadowSupport && star.z < 300) {
                    if (!shadowsEnabled) {
                        ctx.shadowColor = star.color
                        ctx.shadowBlur = scaledSize * 3
                        ctx.shadowOffsetX = 0
                        ctx.shadowOffsetY = 0
                        shadowsEnabled = true
                    }
                } else if (shadowsEnabled) {
                    ctx.shadowBlur = 0
                    shadowsEnabled = false
                }
                
                // Vẽ ngôi sao với hiệu ứng phát sáng để nổi bật trong chế độ sáng
                ctx.fillStyle = star.color.replace('1)', `${opacity})`)
                
                // Vẽ ngôi sao 
                const visibleSize = scaledSize * 1.1 // Giảm kích thước so với phiên bản trước
                ctx.arc(sx, sy, visibleSize, 0, Math.PI * 2)
                ctx.fill()
                
                // Chỉ tạo border cho ngôi sao lớn
                if (scaledSize > 1.5) {
                    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)'
                    ctx.lineWidth = 0.5
                    ctx.stroke()
                }
                
                // Tạo hiệu ứng chuyển động với vết sao (chỉ cho các sao lớn)
                if (star.z < 500 && scaledSize > 1) {
                    const prevSX = (star.x / star.prevZ) * 500 + centerX
                    const prevSY = (star.y / star.prevZ) * 500 + centerY
                    
                    // Vẽ vết sao đơn giản hơn
                    ctx.beginPath()
                    ctx.strokeStyle = star.color.replace('1)', `${opacity * 0.6})`)
                    ctx.lineWidth = scaledSize * 0.7
                    ctx.moveTo(prevSX, prevSY)
                    ctx.lineTo(sx, sy)
                    ctx.stroke()
                }
                
                // Tối ưu: chỉ thêm hiệu ứng lấp lánh cho số lượng nhỏ sao gần
                if (!isMobile && star.z < 150 && scaledSize > 2) {
                    const glowSize = scaledSize * 3 // Giảm kích thước hào quang
                    const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowSize)
                    glow.addColorStop(0, star.color.replace('1)', `${opacity * 0.9})`))
                    glow.addColorStop(1, 'rgba(255, 255, 255, 0)')
                    
                    ctx.beginPath()
                    ctx.fillStyle = glow
                    ctx.arc(sx, sy, glowSize, 0, Math.PI * 2)
                    ctx.fill()
                }
            }
            
            // Tắt shadow sau khi vẽ xong
            if (shadowsEnabled) {
                ctx.shadowBlur = 0
            }

            requestAnimationFrame(animate)
        }

        const animationId = requestAnimationFrame(animate)

        // Xử lý thay đổi kích thước màn hình
        const handleResize = () => {
            if (!canvas) return
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            centerX = canvas.width / 2
            centerY = canvas.height / 2
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            cancelAnimationFrame(animationId)
        }
    }, [weather])

    // Hiệu ứng pháo hoa - đã cải tiến để không che phủ nền
    useEffect(() => {
        if (weather !== "fireworks" || !canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        interface Particle {
            x: number
            y: number
            vx: number
            vy: number
            alpha: number
            color: string
            size: number
        }

        interface Firework {
            x: number
            y: number
            targetY: number
            speed: number
            particles: Particle[]
            color: string
            exploded: boolean
        }

        const fireworks: Firework[] = []
        const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FFFFFF"]

        // Tạo pháo hoa mới
        const createFirework = () => {
            const x = Math.random() * canvas.width
            const color = colors[Math.floor(Math.random() * colors.length)]

            fireworks.push({
                x,
                y: canvas.height,
                targetY: Math.random() * (canvas.height * 0.5) + canvas.height * 0.1,
                speed: Math.random() * 2 + 1,
                particles: [],
                color,
                exploded: false,
            })

            // Tạo pháo hoa tiếp theo sau một khoảng thời gian ngẫu nhiên
            setTimeout(createFirework, Math.random() * 2000 + 500)
        }

        // Tạo vụ nổ pháo hoa
        const explodeFirework = (firework: Firework) => {
            const particleCount = Math.floor(Math.random() * 50) + 30

            for (let i = 0; i < particleCount; i++) {
                const angle = Math.random() * Math.PI * 2
                const speed = Math.random() * 5 + 2

                firework.particles.push({
                    x: firework.x,
                    y: firework.y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    alpha: 1,
                    color: firework.color,
                    size: Math.random() * 2 + 1,
                })
            }

            firework.exploded = true
        }

        // Bắt đầu với một vài pháo hoa
        for (let i = 0; i < 3; i++) {
            setTimeout(createFirework, Math.random() * 1000)
        }

        // Vẽ pháo hoa
        const animate = () => {
            if (!ctx || !canvas) return

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Cập nhật và vẽ pháo hoa
            for (let i = 0; i < fireworks.length; i++) {
                const firework = fireworks[i]

                if (!firework.exploded) {
                    // Vẽ pháo hoa đang bay lên
                    ctx.beginPath()
                    ctx.fillStyle = firework.color
                    ctx.arc(firework.x, firework.y, 2, 0, Math.PI * 2)
                    ctx.fill()

                    // Di chuyển pháo hoa lên
                    firework.y -= firework.speed

                    // Kiểm tra nếu pháo hoa đạt đến độ cao mục tiêu
                    if (firework.y <= firework.targetY) {
                        explodeFirework(firework)
                    }
                } else {
                    // Cập nhật và vẽ các hạt pháo hoa
                    for (let j = 0; j < firework.particles.length; j++) {
                        const particle = firework.particles[j]

                        // Vẽ hạt
                        ctx.beginPath()
                        ctx.globalAlpha = particle.alpha
                        ctx.fillStyle = particle.color
                        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
                        ctx.fill()
                        ctx.globalAlpha = 1

                        // Cập nhật vị trí
                        particle.x += particle.vx
                        particle.y += particle.vy

                        // Thêm trọng lực
                        particle.vy += 0.1

                        // Giảm dần độ trong suốt
                        particle.alpha -= 0.01
                    }

                    // Loại bỏ các hạt đã mờ hoàn toàn
                    firework.particles = firework.particles.filter((p) => p.alpha > 0)

                    // Loại bỏ pháo hoa nếu không còn hạt nào
                    if (firework.particles.length === 0) {
                        fireworks.splice(i, 1)
                        i--
                    }
                }
            }

            requestAnimationFrame(animate)
        }

        const animationId = requestAnimationFrame(animate)

        // Xử lý thay đổi kích thước màn hình
        const handleResize = () => {
            if (!canvas) return
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            cancelAnimationFrame(animationId)
        }
    }, [weather, soundEnabled])

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 pointer-events-none z-[1000] ${weather === "none" ? "hidden" : ""}`}
            style={{ opacity: weather === "stars" ? 0.95 : 0.8 }} // Giảm độ đậm cho hiệu ứng sao đêm
        />
    )
}
