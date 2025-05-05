"use client"

import { Facebook, Twitter, Instagram, Dribbble } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "./animated-section"
import { StaggeredChildren } from "./staggered-children"
import { StaggeredItem } from "./staggered-item"
import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"
import { useI18n } from "@/lib/i18n/i18n-context"

export default function About() {
  const { t } = useI18n()
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
      <section id="about" className="py-20 bg-theme">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <AnimatedSection>
                  <h2 className="text-4xl font-bold mb-4 text-theme">{t.about.title}</h2>
                </AnimatedSection>

                <AnimatedSection delay={0.1}>
                  <p className="text-xl text-muted-theme mb-6">{t.about.subtitle}</p>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                  <p className="text-muted-theme mb-8">{t.about.description}</p>
                </AnimatedSection>

                <AnimatedSection delay={0.3}>
                  <div className="flex space-x-4 mb-8">
                    <a href="#" className="text-muted-theme hover:text-theme transition-colors duration-300">
                      <Facebook className="w-5 h-5" />
                      <span className="sr-only">Facebook</span>
                    </a>
                    <a href="#" className="text-muted-theme hover:text-theme transition-colors duration-300">
                      <Twitter className="w-5 h-5" />
                      <span className="sr-only">Twitter</span>
                    </a>
                    <a href="#" className="text-muted-theme hover:text-theme transition-colors duration-300">
                      <Instagram className="w-5 h-5" />
                      <span className="sr-only">Instagram</span>
                    </a>
                    <a href="#" className="text-muted-theme hover:text-theme transition-colors duration-300">
                      <Dribbble className="w-5 h-5" />
                      <span className="sr-only">Dribbble</span>
                    </a>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.4}>
                  <Button variant="default" className="bg-primary-theme text-primary-theme hover:opacity-90">
                    {t.about.resume}
                  </Button>
                </AnimatedSection>
              </div>

              <div ref={statsRef}>
                <StaggeredChildren>
                  <div className="grid grid-cols-2 gap-8">
                    <StaggeredItem>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-theme">{projectCount}</p>
                        <p className="text-muted-theme">{t.about.stats.projects}</p>
                      </div>
                    </StaggeredItem>
                    <StaggeredItem>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-theme">{coffeeCount}</p>
                        <p className="text-muted-theme">{t.about.stats.coffee}</p>
                      </div>
                    </StaggeredItem>
                    <StaggeredItem>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-theme">{clientCount}</p>
                        <p className="text-muted-theme">{t.about.stats.clients}</p>
                      </div>
                    </StaggeredItem>
                    <StaggeredItem>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-theme">{awardCount}</p>
                        <p className="text-muted-theme">{t.about.stats.awards}</p>
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
