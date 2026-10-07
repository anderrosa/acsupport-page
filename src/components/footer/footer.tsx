import type { Icon } from '@phosphor-icons/react'
import { EnvelopeSimple, InstagramLogo, LinkedinLogo, MapPin } from '@phosphor-icons/react'
import { twMerge } from 'tailwind-merge'

import { BrandLogo } from '@/components/shared/brand-logo'
import { navLinks, SECTION_HASHES } from '@/lib/sections'
import { CONTACT_EMAIL, INSTAGRAM_URL, LINKEDIN_URL } from '@/lib/site'

const socialLinks = [
  {
    label: 'LinkedIn',
    href: LINKEDIN_URL,
    icon: LinkedinLogo,
  },
  {
    label: 'Instagram',
    href: INSTAGRAM_URL,
    icon: InstagramLogo,
  },
].filter((link) => link.href)

type FooterContactItem = {
  icon: Icon
  label: string
  value: string
  href?: string
}

const contactItems: FooterContactItem[] = [
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

function FooterSectionTitle({ children }: { children: string }) {
  return (
    <span className="text-sm font-medium tracking-wide text-white/80 uppercase">
      {children}
    </span>
  )
}

function FooterContactItem({ icon: IconComponent, label, value, href }: FooterContactItem) {
  const content = (
    <div className="flex items-center gap-3">
      <div
        data-slot="footer-contact-icon"
        className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition-colors group-hover:text-white"
      >
        <IconComponent className="size-5" weight="regular" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-white/50">{label}</span>
        <span className="text-sm text-white/80 md:text-base">{value}</span>
      </div>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        data-slot="footer-contact-item"
        className={twMerge(
          'group rounded-xl transition-colors hover:text-white',
          'focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:outline-none',
        )}
      >
        {content}
      </a>
    )
  }

  return <div data-slot="footer-contact-item" className="group">{content}</div>
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer data-slot="footer" className="border-t border-white/10 bg-void">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div
          data-slot="footer-columns"
          className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-x-12 sm:gap-y-14 lg:grid-cols-[1.35fr_1fr_1fr_1fr] lg:gap-20"
        >
          <div
            data-slot="footer-brand"
            className="flex max-w-sm flex-col gap-5 sm:col-span-3 sm:mx-auto sm:items-center lg:col-span-1 lg:mx-0 lg:items-start"
          >
            <a
              href={SECTION_HASHES.home}
              data-slot="footer-logo-link"
              className="self-center focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:outline-none"
            >
              <BrandLogo />
            </a>
            <p className="text-center text-sm leading-relaxed text-white/60 sm:max-w-sm md:text-base lg:text-left">
              Soluções tecnológicas completas para impulsionar o seu negócio.
            </p>
          </div>

          <nav
            data-slot="footer-nav"
            aria-label="Rodapé"
            className="flex flex-col gap-5"
          >
            <FooterSectionTitle>Navegação</FooterSectionTitle>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-slot="footer-link"
                    className={twMerge(
                      'text-sm text-white/60 transition-colors hover:text-white md:text-base',
                      'focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:outline-none',
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div data-slot="footer-contact" className="flex flex-col gap-5">
            <FooterSectionTitle>Contato</FooterSectionTitle>
            <ul className="flex w-full flex-col gap-4">
              {contactItems.map((item) => (
                <li key={item.label}>
                  <FooterContactItem {...item} />
                </li>
              ))}
            </ul>
          </div>

          {socialLinks.length > 0 && (
            <div data-slot="footer-social" className="flex flex-col gap-5 sm:items-center lg:items-start">
              <FooterSectionTitle>Redes sociais</FooterSectionTitle>
              <ul className="flex gap-3 sm:justify-center lg:justify-start">
                {socialLinks.map(({ label, href, icon: SocialIcon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      data-slot="footer-social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={twMerge(
                        'flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80',
                        'transition-colors hover:text-white',
                        'focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:outline-none',
                      )}
                    >
                      <SocialIcon className="size-5" weight="regular" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div data-slot="footer-bottom" className="mt-12 lg:mt-14">
          <div
            data-slot="footer-divider"
            aria-hidden="true"
            className="mb-8 h-px w-full bg-linear-to-r from-void from-0% via-white/12 via-50% to-void to-100%"
          />
          <p className="text-center text-sm text-white/45">
            © {year} ACSUPPORT. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
