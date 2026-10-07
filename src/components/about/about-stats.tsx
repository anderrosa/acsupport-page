import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { Card } from '@/components/ui/card'
import { useCountUp } from '@/hooks/use-count-up'

type Stat = {
  value: number
  suffix: string
  label: string
}

const stats: Stat[] = [
  { value: 735, suffix: '+', label: 'Clientes Atendidos' },
  { value: 10, suffix: '+', label: 'Anos de Experiência' },
  { value: 50, suffix: '+', label: 'Projetos Concluídos' },
  { value: 24, suffix: '/7', label: 'Suporte Disponível' },
]

function StatItem({ value, suffix, label }: Stat) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const count = useCountUp({ target: value, enabled: inView })

  return (
    <div ref={ref} className="h-full min-h-36 md:min-h-44">
      <Card
        data-slot="about-stat-item"
        className={twMerge(
          'glass-effect h-full justify-center gap-4 rounded-2xl p-6 text-center',
          'border-transparent! bg-transparent! shadow-none!',
          'md:gap-5 md:p-8 lg:p-10',
        )}
      >
        <p
          data-slot="about-stat-value"
          className="font-sans text-4xl font-bold tracking-tight text-white tabular-nums sm:text-5xl md:text-6xl"
          aria-label={`${value}${suffix}`}
        >
          {count}
          {suffix}
        </p>
        <p
          data-slot="about-stat-label"
          className="text-sm text-white/65 md:text-base lg:text-lg"
        >
          {label}
        </p>
      </Card>
    </div>
  )
}

export function AboutStats({ className }: { className?: string }) {
  return (
    <div
      data-slot="about-stats"
      className={twMerge(
        'grid h-full min-h-full grid-cols-2 grid-rows-2 gap-4 md:gap-6',
        className,
      )}
    >
      {stats.map((stat) => (
        <StatItem key={stat.label} {...stat} />
      ))}
    </div>
  )
}
