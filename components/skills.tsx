"use client"

import { AnimatedSection } from "./animated-section"

const skills = [
  { name: "HTML5", percentage: 96 },
  { name: "PHP", percentage: 87 },
  { name: "JavaScript", percentage: 52 },
  { name: "Photoshop", percentage: 77 },
]

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
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-theme">{skill.name}</span>
                        <span className="text-muted-theme">{skill.percentage}%</span>
                      </div>
                      <div className="h-2 bg-progress-theme rounded-full overflow-hidden">
                        <div
                            className="h-full bg-progress-fill-theme rounded-full"
                            style={{ width: `${skill.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>
  )
}
