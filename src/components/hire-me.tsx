"use client"

import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/common/AnimatedSection/animated-section"
import { useTextReveal } from "@/hooks/use-text-reveal"
import { Magnetic } from "@/hooks/use-magnetic"
import { useI18n } from "@/lib/i18n/i18n-context"

export default function HireMe() {
  const { t } = useI18n()
  const titleRef = useTextReveal()

  return (
      <section className="py-20 bg-theme transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div ref={titleRef} className="mb-8">
              <h2 className="text-4xl font-bold text-theme text-center md:text-left">{t.hireMe.title}</h2>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center">
              <AnimatedSection delay={0.2} direction="left">
                <div className="max-w-2xl mb-8 md:mb-0">
                  <p className="text-muted-theme">{t.hireMe.description}</p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3} direction="right">
                <Magnetic>
                  <a href="#contact">
                    <Button className="bg-primary-theme text-primary-theme hover:opacity-90 px-8 py-6 text-lg h-auto cursor-hover">
                      {t.hireMe.button}
                    </Button>
                  </a>
                </Magnetic>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
  )
}
