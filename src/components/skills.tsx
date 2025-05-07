"use client"

import { useCountUp } from "@/hooks/use-count-up"
import { AnimatedSection } from "@/components/common/AnimatedSection/animated-section"

const skills = [
  { name: "HTML5", percentage: 96 },
  { name: "PHP", percentage: 87 },
  { name: "JavaScript", percentage: 52 },
  { name: "Photoshop", percentage: 77 },
]

// Component con để sử dụng hook cho từng skill
function SkillItem({ skill, delay }: { skill: { name: string; percentage: number }; delay: number }) {
  const { ref, count } = useCountUp({
    end: skill.percentage,
    duration: 2,
    delay,
    suffix: "%"
  })
  
  return (
    <div className="mb-6" ref={ref}>
      <div className="flex justify-between mb-2">
        <span className="font-medium text-theme">{skill.name}</span>
        <span className="text-theme font-medium">
          {count}
        </span>
      </div>
      <div className="h-2 bg-muted dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary dark:bg-blue-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: count.replace("%", "") + "%" }}
        ></div>
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section className="py-20 bg-card-theme transition-colors duration-300">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-4xl font-bold text-center mb-16 text-theme">My Skills</h2>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {skills.map((skill, index) => (
              <AnimatedSection key={skill.name} delay={index * 0.1}>
                <SkillItem skill={skill} delay={index * 0.1} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
