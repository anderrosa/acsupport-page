import { AboutSection } from '@/components/about/about-section'
import { ContactSection } from '@/components/contact/contact-section'
import { Footer } from '@/components/footer/footer'
import { Hero } from '@/components/hero/hero'
import { NavMenu } from '@/components/layout/nav-menu'
import { ServicesSection } from '@/components/services/services-section'

export function App() {
  return (
    <main className="relative overflow-x-clip bg-void">
      <NavMenu />
      <Hero />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
