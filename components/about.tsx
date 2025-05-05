"use client"

import { Facebook, Twitter, Instagram, Dribbble } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "./animated-section"
import { StaggeredChildren } from "./staggered-children"
import { StaggeredItem } from "./staggered-item"
import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

export default function About() {
  const statsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(statsRef, { once: true, amount: 0.3 })

  const [projectCount, setProjectCount] = useState(0)
  const [coffeeCount, setCoffeeCount] = useState(0)
  const [clientCount, setClientCount] = useState(0)
  const [awardCount, setAwardCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = 2000 // 2 seconds
    const projectTarget = 300
    const coffeeTarget = 500
    const clientTarget = 120
    const awardTarget = 10

    let startTime: number | null = null
    let animationFrameId: number | null = null

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      setProjectCount(Math.floor(progress * projectTarget))
      setCoffeeCount(Math.floor(progress * coffeeTarget))
      setClientCount(Math.floor(progress * clientTarget))
      setAwardCount(Math.floor(progress * awardTarget))

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount)
      }
    }

    animationFrameId = requestAnimationFrame(updateCount)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isInView])

  return (
      <section id="about" className="py-20 bg-white dark:bg-[#111827]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <AnimatedSection>
                  <h2 className="text-4xl font-bold mb-4 dark:text-white">Hello, I am James</h2>
                </AnimatedSection>

                <AnimatedSection delay={0.1}>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">Web Developer from Ireland</p>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                  <p className="text-gray-700 dark:text-gray-400 mb-8">
                    Tôi là một Developer toàn diện và đầy bản lĩnh, chuyên về phát triển game, web, ứng dụng desktop và mobile.
                    Với tư duy hệ thống sắc bén, khả năng làm chủ công nghệ hiện đại cùng kinh nghiệm thực chiến dày dạn,
                    tôi không chỉ tạo ra sản phẩm – tôi kiến tạo trải nghiệm. Mỗi dòng code tôi viết đều hướng đến hiệu năng tối ưu,
                    thiết kế tinh gọn và giá trị thực tiễn. Từ thế giới game tương tác đến hệ thống web phức tạp hay ứng dụng di động
                    thân thiện, tôi luôn là người đứng sau những giải pháp mạnh mẽ, mượt mà và khác biệt.
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.3}>
                  <div className="flex space-x-4 mb-8">
                    <a
                        href="#"
                        className="text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
                    >
                      <Facebook className="w-5 h-5" />
                      <span className="sr-only">Facebook</span>
                    </a>
                    <a
                        href="#"
                        className="text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
                    >
                      <Twitter className="w-5 h-5" />
                      <span className="sr-only">Twitter</span>
                    </a>
                    <a
                        href="#"
                        className="text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
                    >
                      <Instagram className="w-5 h-5" />
                      <span className="sr-only">Instagram</span>
                    </a>
                    <a
                        href="#"
                        className="text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
                    >
                      <Dribbble className="w-5 h-5" />
                      <span className="sr-only">Dribbble</span>
                    </a>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.4}>
                  <Button
                      variant="default"
                      className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  >
                    My Resume
                  </Button>
                </AnimatedSection>
              </div>

              <div ref={statsRef}>
                <StaggeredChildren>
                  <div className="grid grid-cols-2 gap-8">
                    <StaggeredItem>
                      <div className="text-center">
                        <p className="text-4xl font-bold dark:text-white">{projectCount}</p>
                        <p className="text-gray-600 dark:text-gray-300">Project done</p>
                      </div>
                    </StaggeredItem>
                    <StaggeredItem>
                      <div className="text-center">
                        <p className="text-4xl font-bold dark:text-white">{coffeeCount}</p>
                        <p className="text-gray-600 dark:text-gray-300">Cups of coffe</p>
                      </div>
                    </StaggeredItem>
                    <StaggeredItem>
                      <div className="text-center">
                        <p className="text-4xl font-bold dark:text-white">{clientCount}</p>
                        <p className="text-gray-600 dark:text-gray-300">Clients</p>
                      </div>
                    </StaggeredItem>
                    <StaggeredItem>
                      <div className="text-center">
                        <p className="text-4xl font-bold dark:text-white">{awardCount}</p>
                        <p className="text-gray-600 dark:text-gray-300">Awards</p>
                      </div>
                    </StaggeredItem>
                  </div>
                </StaggeredChildren>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}
