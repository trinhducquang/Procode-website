import { Facebook, Twitter, Instagram, Dribbble } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "./animated-section"
import { StaggeredChildren } from "./staggered-children"
import { StaggeredItem } from "./staggered-item"

export default function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-[#111827]">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <AnimatedSection>
                <h2 className="text-4xl font-bold mb-4 dark:text-white">Hello, I am Quang</h2>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">FullStack Developer from VietNam</p>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p className="text-gray-700 dark:text-gray-400 mb-8">
                Tôi là một Developer toàn diện và đầy bản lĩnh, chuyên về phát triển game, web, ứng dụng desktop và mobile. 
                Với tư duy hệ thống sắc bén, khả năng làm chủ công nghệ hiện đại cùng kinh nghiệm thực chiến dày dạn, 
                tôi không chỉ tạo ra sản phẩm – tôi kiến tạo trải nghiệm. Mỗi dòng code tôi viết đều hướng đến hiệu năng tối ưu, 
                thiết kế tinh gọn và giá trị thực tiễn. Từ thế giới game tương tác đến hệ thống web phức tạp hay ứng dụng di động 
                thân thiện, tôi luôn là người đứng sau những giải pháp mạnh mẽ, mượt mà và khác biệt.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="flex space-x-4 mb-8">
                  <a
                    href="#"
                    className="text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
                  >
                    <Facebook className="w-5 h-5" />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
                  >
                    <Twitter className="w-5 h-5" />
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
                  >
                    <Instagram className="w-5 h-5" />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
                  >
                    <Dribbble className="w-5 h-5" />
                    <span className="sr-only">Dribbble</span>
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <Button
                  variant="default"
                  className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  My Resume
                </Button>
              </AnimatedSection>
            </div>

            <StaggeredChildren>
              <div className="grid grid-cols-2 gap-8">
                <StaggeredItem>
                  <div className="text-center">
                    <p className="text-4xl font-bold dark:text-white">300</p>
                    <p className="text-gray-600 dark:text-gray-300">Project done</p>
                  </div>
                </StaggeredItem>
                <StaggeredItem>
                  <div className="text-center">
                    <p className="text-4xl font-bold dark:text-white">500</p>
                    <p className="text-gray-600 dark:text-gray-300">Cups of coffe</p>
                  </div>
                </StaggeredItem>
                <StaggeredItem>
                  <div className="text-center">
                    <p className="text-4xl font-bold dark:text-white">120</p>
                    <p className="text-gray-600 dark:text-gray-300">Clients</p>
                  </div>
                </StaggeredItem>
                <StaggeredItem>
                  <div className="text-center">
                    <p className="text-4xl font-bold dark:text-white">10</p>
                    <p className="text-gray-600 dark:text-gray-300">Awards</p>
                  </div>
                </StaggeredItem>
              </div>
            </StaggeredChildren>
          </div>
        </div>
      </div>
    </section>
  )
}
