import { ContactForm } from '@/components/contact/contact-form'
import { ContactInfo } from '@/components/contact/contact-info'
import { Card } from '@/components/ui/card'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { headingGradient, subtitleGradient } from '@/lib/brand-styles'
import { SECTION_IDS } from '@/lib/sections'
import { twMerge } from 'tailwind-merge'

export function ContactSection() {
  return (
    <section
      id={SECTION_IDS.contato}
      data-slot="contact-section"
      className="bg-void py-16 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card
          data-slot="contact-card"
          className={twMerge(
            'glass-effect glass-effect-static gap-10 rounded-2xl p-6',
            'border-transparent! bg-transparent! shadow-none!',
            'md:gap-12 md:p-10 lg:p-12',
          )}
        >
          <ScrollReveal direction="none">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-16">
              <div data-slot="contact-content" className="flex flex-col gap-10">
                <header data-slot="contact-header" className="flex flex-col gap-5">
                  <h2
                    className={twMerge(
                      'font-heading text-3xl font-bold md:text-4xl',
                      headingGradient,
                    )}
                  >
                    Entre em Contato
                  </h2>
                  <p className={twMerge('max-w-lg text-base md:text-lg', subtitleGradient)}>
                    Vamos conversar sobre o seu projeto.
                  </p>
                </header>

                <ContactInfo />
              </div>

              <ContactForm />
            </div>
          </ScrollReveal>
        </Card>
      </div>
    </section>
  )
}
