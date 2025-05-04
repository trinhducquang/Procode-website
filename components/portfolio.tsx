"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { AnimatedSection } from "./animated-section"
import { StaggeredChildren } from "./staggered-children"
import { StaggeredItem } from "./staggered-item"
import { motion } from "framer-motion"
import Card3D from "./card-3d"
import { useTextReveal } from "@/hooks/use-text-reveal"
import { Magnetic } from "@/hooks/use-magnetic"

const categories = [
  { id: "all", name: "All" },
  { id: "website", name: "Website" },
  { id: "app", name: "App" },
  { id: "design", name: "Design" },
]

const projects = [
  {
    id: 1,
    title: "Project 1",
    category: "website",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "DienTu99",
    category: "app",
    image: "/DienTu99.jpg?height=400&width=600",
  },
  {
    id: 3,
    title: "Project 3",
    category: "design",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "Project 4",
    category: "website",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    title: "Project 5",
    category: "app",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 6,
    title: "Project 6",
    category: "design",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all")
  const titleRef = useTextReveal()

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <section id="portfolio" className="py-20 bg-white dark:bg-[#111827]">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="mb-12 text-center">
          <h2 className="text-4xl font-bold dark:text-white">Selected Project</h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <AnimatedSection delay={0.2}>
            <div className="flex justify-center mb-12">
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <Magnetic key={category.id}>
                    <motion.button
                      onClick={() => setActiveCategory(category.id)}
                      className={cn(
                        "px-6 py-2 rounded-md transition-colors cursor-hover",
                        activeCategory === category.id
                          ? "bg-black text-white dark:bg-white dark:text-black"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category.name}
                    </motion.button>
                  </Magnetic>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <StaggeredChildren staggerChildren={0.1} delayChildren={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <StaggeredItem key={project.id}>
                  <Card3D className="rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 h-64">
                    <div className="relative h-full w-full overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <h3 className="text-white text-xl font-bold">{project.title}</h3>
                      </div>
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
