"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StaggeredChildren } from "./staggered-children"
import { StaggeredItem } from "./staggered-item"
import { useTextReveal } from "@/hooks/use-text-reveal"
import Card3D from "./card-3d"
import { Magnetic } from "@/hooks/use-magnetic"

const blogPosts = [
  {
    id: 1,
    slug: "class-aptent-taciti",
    title: "Class aptent taciti",
    excerpt: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 2,
    slug: "lorem-ipsum-dolor",
    title: "Lorem ipsum dolor sit amet",
    excerpt: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 3,
    slug: "suspendisse-potenti",
    title: "Suspendisse potenti",
    excerpt: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    image: "/placeholder.svg?height=300&width=500",
  },
]

export default function BlogSection() {
  const titleRef = useTextReveal()

  return (
      <section id="blog" className="py-20 bg-theme transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div ref={titleRef} className="mb-16">
            <h2 className="text-4xl font-bold text-center text-theme">Blog Post</h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <StaggeredChildren staggerChildren={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                    <StaggeredItem key={post.id}>
                      <Card3D className="h-full rounded-lg overflow-hidden">
                        <div className="flex flex-col h-full bg-card-theme overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                          <div className="relative h-64 mb-6 overflow-hidden">
                            <Image
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-105"
                            />
                          </div>

                          <div className="px-6 pb-6 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold mb-3 text-center text-theme">{post.title}</h3>
                            <p className="text-muted-theme mb-6 text-center">{post.excerpt}</p>

                            <div className="mt-auto flex justify-center">
                              <Magnetic>
                                <Link href={`/blog/${post.slug}`}>
                                  <Button
                                      variant="default"
                                      className="bg-primary-theme text-primary-theme hover:opacity-90 cursor-hover"
                                  >
                                    Read More
                                  </Button>
                                </Link>
                              </Magnetic>
                            </div>
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
