import type { Icon } from '@phosphor-icons/react'
import {
  ChartLineUp,
  Code,
  Lightning,
  ShareNetwork,
  VideoCamera,
  Wrench,
} from '@phosphor-icons/react'
import { headingGradient, subtitleGradient } from '@/lib/brand-styles'
import { SECTION_IDS } from '@/lib/sections'
import { twMerge } from 'tailwind-merge'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

type Service = {
  icon: Icon
  title: string
  subtitle: string
  features: string[]
}

const services: Service[] = [
  {
    icon: Lightning,
    title: 'Automações com IA',
    subtitle:
      'Automatize processos repetitivos e aumente a eficiência da sua empresa.',
    features: [
      'Automação de tarefas',
      'Integração de sistemas',
      'Workflows inteligentes',
    ],
  },
  {
    icon: Wrench,
    title: 'Suporte de TI',
    subtitle:
      'Suporte técnico completo, manutenção de sistemas e resolução de problemas tecnológicos.',
    features: [
      'Suporte remoto e presencial',
      'Consultoria em infraestrutura de TI',
      'Monitoramento e segurança de redes',
    ],
  },
  {
    icon: Code,
    title: 'Desenvolvimento Web',
    subtitle:
      'Sites profissionais, sistemas web e soluções personalizadas para otimizar processos e expandir sua presença digital.',
    features: [
      'Desenvolvimento customizado',
      'Sites profissionais e responsivos',
      'Integração com APIs e automação',
    ],
  },
  {
    icon: ChartLineUp,
    title: 'Consultoria Logística',
    subtitle:
      'Otimização de processos logísticos, redução de custos e melhoria na gestão da cadeia de suprimentos.',
    features: [
      'Planejamento logístico',
      'Otimização de processos',
      'Redução de custos operacionais',
    ],
  },
  {
    icon: VideoCamera,
    title: 'Criação de Conteúdo',
    subtitle:
      'Produção de conteúdo digital, edição de vídeos e criação de materiais visuais.',
    features: [
      'Design gráfico',
      'Edição de vídeos',
      'Produção de conteúdo digital',
    ],
  },
  {
    icon: ShareNetwork,
    title: 'Social Media',
    subtitle:
      'Gestão completa de redes sociais e estratégias de marketing digital.',
    features: [
      'Criação de campanhas',
      'Análise de resultados',
      'Gestão de redes sociais',
    ],
  },
]

function ServiceCard({ service }: { service: Service }) {
  const IconComponent = service.icon

  return (
    <Card
      data-slot="service-card"
      className={twMerge(
        'glass-effect h-full gap-6 rounded-2xl p-6',
        'border-transparent! bg-transparent! shadow-none!',
        'md:p-8',
      )}
    >
      <div
        data-slot="service-card-icon"
        className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/90"
      >
        <IconComponent className="size-5" weight="regular" aria-hidden="true" />
      </div>

      <CardHeader className="gap-3">
        <CardTitle className="text-xl font-semibold text-white md:text-2xl">
          {service.title}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed text-white/65 md:text-base">
          {service.subtitle}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ul
          data-slot="service-card-features"
          className="flex flex-col gap-2.5 text-sm text-white/55 md:text-base"
        >
          {service.features.map((feature) => (
            <li key={feature} className="flex gap-3">
              <span
                className="mt-2 size-1 shrink-0 rounded-full bg-white/40"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export function ServicesSection() {
  return (
    <section
      id={SECTION_IDS.servicos}
      data-slot="services-section"
      className="bg-void py-16 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <header
            data-slot="services-section-header"
            className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
          >
            <h2
              className={twMerge(
                'font-heading text-3xl font-bold md:text-4xl',
                headingGradient,
              )}
            >
              Nossos Serviços
            </h2>
            <p className={twMerge('mt-4 text-base md:text-lg', subtitleGradient)}>
              Oferecemos soluções completas em tecnologia para impulsionar seu
              negócio
            </p>
          </header>
        </ScrollReveal>

        <div
          data-slot="services-section-grid"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.08}>
              <ServiceCard service={service} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
