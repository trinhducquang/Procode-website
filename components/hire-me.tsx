"use client"

import { Button } from "@/components/ui/button"
import { AnimatedSection } from "./animated-section"
import { useTextReveal } from "@/hooks/use-text-reveal"
import { Magnetic } from "@/hooks/use-magnetic"

export default function HireMe() {
  const titleRef = useTextReveal()

  return (
    <section className="py-20 bg-white dark:bg-[#111827]">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div ref={titleRef} className="mb-8">
            <h2 className="text-4xl font-bold dark:text-white text-center md:text-left">Hire Me</h2>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <AnimatedSection delay={0.2} direction="left">
              <div className="max-w-2xl mb-8 md:mb-0">
                <p className="text-gray-700 dark:text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh felis, rutrum id eleifend nec,
                  viverra ac nunc. Fusce sit amet interdum metus, a interdum massa.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3} direction="right">
              <Magnetic>
                <a href="#contact">
                  <Button className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 px-8 py-6 text-lg h-auto cursor-hover">
                    Get In Touch
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
