"use client"

import { Layers, FlaskRoundIcon as Flask, Heart, Diamond, Workflow, Zap } from "lucide-react"
import { StaggeredChildren } from "./staggered-children"
import { StaggeredItem } from "./staggered-item"
import { useTextReveal } from "@/hooks/use-text-reveal"
import Card3D from "./card-3d"

const services = [
  {
    icon: <Layers className="w-8 h-8" />,
    title: "Web Design",
    description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh felis, rutrum id eleifend nec, viverra ac nunc.",
  },
  {
    icon: <Flask className="w-8 h-8" />,
    title: "UI",
    description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh felis, rutrum id eleifend nec, viverra ac nunc.",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Front End",
    description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh felis, rutrum id eleifend nec, viverra ac nunc.",
  },
  {
    icon: <Diamond className="w-8 h-8" />,
    title: "UX Design",
    description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh felis, rutrum id eleifend nec, viverra ac nunc.",
  },
  {
    icon: <Workflow className="w-8 h-8" />,
    title: "Wordpress",
    description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh felis, rutrum id eleifend nec, viverra ac nunc.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "SEO",
    description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh felis, rutrum id eleifend nec, viverra ac nunc.",
  },
]

export default function Services() {
  const titleRef = useTextReveal()

  return (
      <section id="services" className="py-20 bg-card-theme transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div ref={titleRef} className="mb-16">
              <h2 className="text-4xl font-bold text-theme text-center">Services</h2>
            </div>

            <StaggeredChildren staggerChildren={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {services.map((service, index) => (
                    <StaggeredItem key={index}>
                      <Card3D className="p-4 rounded-lg bg-theme shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
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
