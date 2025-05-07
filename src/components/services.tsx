"use client"

import { Layers, FlaskRoundIcon as Flask, Heart, Diamond, Workflow, Zap } from "lucide-react"
import { StaggeredChildren } from "@/components/common/StaggeredChildren/staggered-children"
import { StaggeredItem } from "@/components/common/StaggeredItem/staggered-item"
import { useTextReveal } from "@/hooks/use-text-reveal"
import Card3D from "@/components/common/Card3D/card-3d"
import { useI18n } from "@/lib/i18n/i18n-context"

export default function Services() {
  const { t } = useI18n()
  const titleRef = useTextReveal()

  const services = [
    {
      icon: <Layers className="w-8 h-8" />,
      title: t.services.items.webDesign.title,
      description: t.services.items.webDesign.description,
    },
    {
      icon: <Flask className="w-8 h-8" />,
      title: t.services.items.ui.title,
      description: t.services.items.ui.description,
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: t.services.items.frontEnd.title,
      description: t.services.items.frontEnd.description,
    },
    {
      icon: <Diamond className="w-8 h-8" />,
      title: t.services.items.uxDesign.title,
      description: t.services.items.uxDesign.description,
    },
    {
      icon: <Workflow className="w-8 h-8" />,
      title: t.services.items.wordpress.title,
      description: t.services.items.wordpress.description,
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t.services.items.seo.title,
      description: t.services.items.seo.description,
    },
  ]

  return (
      <section id="services" className="py-20 bg-card-theme transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div ref={titleRef} className="mb-16">
              <h2 className="text-4xl font-bold text-theme text-center">{t.services.title}</h2>
            </div>

            <StaggeredChildren staggerChildren={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {services.map((service, index) => (
                    <StaggeredItem key={index}>
                      <Card3D className="p-4 rounded-lg bg-theme shadow-sm hover:shadow-md transition-shadow duration-300 h-full card">
                        <div className="flex flex-col h-full">
                          <div className="mb-4 text-theme">{service.icon}</div>
                          <h3 className="text-xl font-bold mb-4 text-theme">{service.title}</h3>
                          <p className="text-muted-theme">{service.description}</p>
                        </div>
                      </Card3D>
                    </StaggeredItem>
                ))}
              </div>
            </StaggeredChildren>
          </div>
        </div>
      </section>
  )
}
