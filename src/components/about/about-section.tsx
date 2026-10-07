import { AboutHighlights } from '@/components/about/about-highlights'
import { AboutStats } from '@/components/about/about-stats'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { headingGradient, subtitleGradient } from '@/lib/brand-styles'
import { SECTION_IDS } from '@/lib/sections'
import { twMerge } from 'tailwind-merge'

export function AboutSection() {
  return (
    <section
      id={SECTION_IDS.sobre}
      data-slot="about-section"
      className="bg-void-muted py-16 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="none">
          <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
            <div data-slot="about-content" className="flex flex-col gap-8">
              <header data-slot="about-header" className="flex flex-col gap-6">
                <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
                  Sobre a{' '}
                  <span className={headingGradient}>ACSUPPORT</span>
                </h2>

                <p className={twMerge('text-base leading-relaxed md:text-lg', subtitleGradient)}>
                  Somos uma empresa especializada em soluções tecnológicas
                  completas, oferecendo desde suporte técnico até desenvolvimento de
                  sistemas e estratégias de marketing digital.
                  <br />
                  <br />
                  Nossa missão é transformar desafios tecnológicos em oportunidades
                  de crescimento, fornecendo soluções inovadoras e personalizadas
                  para cada cliente.
                </p>
              </header>

              <AboutHighlights />
            </div>

            <AboutStats />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
