import { CheckCircle } from '@phosphor-icons/react'
import { twMerge } from 'tailwind-merge'

import { highlightGradient } from '@/lib/brand-styles'

const highlights = [
  'Equipe especializada e certificada',
  'Soluções personalizadas para cada negócio',
  'Suporte contínuo e acompanhamento',
  'Tecnologias modernas e atualizadas',
] as const

export function AboutHighlights({ className }: { className?: string }) {
  return (
    <ul
      data-slot="about-highlights"
      className={twMerge('flex flex-col gap-4', className)}
    >
      {highlights.map((item) => (
        <li
          key={item}
          data-slot="about-highlight-item"
          className={twMerge(
            'flex items-start gap-3 text-sm font-medium md:text-base',
            highlightGradient,
          )}
        >
          <CheckCircle
            className="mt-0.5 size-5 shrink-0 text-[#ededed]"
            weight="duotone"
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  )
}
