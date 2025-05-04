import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Portfolio from "@/components/portfolio"
import Services from "@/components/services"
import HireMe from "@/components/hire-me"
import Testimonial from "@/components/testimonial"
import BlogSection from "@/components/blog-section"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      <Services />
      <HireMe />
      <Testimonial />
      <BlogSection />
      <Contact />
      <Footer />
    </main>
  )
}
