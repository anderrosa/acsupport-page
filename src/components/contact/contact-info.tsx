import type { Icon } from '@phosphor-icons/react'
import { EnvelopeSimple, MapPin } from '@phosphor-icons/react'
import { twMerge } from 'tailwind-merge'

import { CONTACT_EMAIL } from '@/lib/site'

type ContactItem = {
  icon: Icon
  label: string
  value: string
  href?: string
}

const contactItems: ContactItem[] = [
  ...(CONTACT_EMAIL
    ? [
        {
          icon: EnvelopeSimple,
          label: 'E-mail',
          value: CONTACT_EMAIL,
          href: `mailto:${CONTACT_EMAIL}`,
        },
      ]
    : []),
  {
    icon: MapPin,
    label: 'Localização',
    value: 'Rio de Janeiro, Brasil',
  },
]

function ContactInfoItem({ icon: IconComponent, label, value, href }: ContactItem) {
  const content = (
    <>
      <div
        data-slot="contact-info-icon"
        className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition-colors group-hover:text-white"
      >
        <IconComponent className="size-5" weight="regular" aria-hidden="true" />
      </div>

      <div data-slot="contact-info-text" className="flex flex-col gap-1">
        <span className="text-sm text-white/55">{label}</span>
        <span className="text-base font-medium text-white md:text-lg">{value}</span>
      </div>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        data-slot="contact-info-item"
        className={twMerge(
          'group flex items-center gap-4 rounded-xl transition-colors',
          'hover:text-white focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:outline-none',
        )}
      >
        {content}
      </a>
    )
  }

  return (
    <div data-slot="contact-info-item" className="group flex items-center gap-4">
      {content}
    </div>
  )
}

export function ContactInfo({ className }: { className?: string }) {
  return (
    <div data-slot="contact-info" className={twMerge('flex flex-col gap-8', className)}>
      <p className="text-base leading-relaxed text-white/70 md:text-lg">
        Entre em contato pelo formulário ou pelos canais abaixo. Respondemos o
        mais rápido possível.
      </p>

      <ul data-slot="contact-info-list" className="flex flex-col gap-6">
        {contactItems.map((item) => (
          <li key={item.label}>
            <ContactInfoItem {...item} />
          </li>
        ))}
      </ul>
    </div>
  )
}
