import { AnimatePresence, motion } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from '@/components/ui/button'
import { HamburgerToggle } from '@/components/ui/hamburger-toggle'
import { BrandLogo } from '@/components/shared/brand-logo'
import { navLinks, SECTION_HASHES } from '@/lib/sections'
import { whatsappOrcamentoUrl } from '@/lib/whatsapp'

const menuEase = [0.33, 1, 0.68, 1] as const

const menuItemVariants = {
  closed: { opacity: 0, y: 16 },
  open: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 + index * 0.06, duration: 0.35, ease: menuEase },
  }),
}

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            data-slot="nav-mobile-overlay"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.nav
            id="nav-mobile-panel"
            data-slot="nav-mobile-panel"
            className="fixed inset-0 z-45 flex flex-col bg-navy px-4 pt-28 pb-10 pointer-events-none sm:px-6 md:hidden"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: menuEase }}
            aria-label="Menu mobile"
          >
            <ul
              data-slot="nav-mobile-links"
              className="pointer-events-auto flex flex-1 flex-col justify-center gap-2"
            >
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  custom={index}
                  variants={menuItemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <a
                    href={link.href}
                    data-slot="nav-mobile-link"
                    onClick={onClose}
                    className={twMerge(
                      'block py-3 font-heading text-3xl font-semibold text-white/90 transition-colors hover:text-white',
                      'focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:outline-none',
                    )}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              custom={navLinks.length}
              variants={menuItemVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="pointer-events-auto pt-6"
            >
              <Button
                variant="cta"
                size="lg"
                href={whatsappOrcamentoUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-slot="nav-mobile-cta"
                onClick={onClose}
                className="w-full focus-visible:ring-white/80"
              >
                Solicitar orçamento
              </Button>
            </motion.div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}

export function NavMenu() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) {
      document.body.style.overflow = menuOpen ? 'hidden' : ''
      return () => {
        document.body.style.overflow = ''
      }
    }

    if (menuOpen) {
      lenis.stop()
    } else {
      lenis.start()
    }
  }, [menuOpen, lenis])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 48rem)')

    const handleChange = () => {
      if (mq.matches) setMenuOpen(false)
    }

    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const toggleMenu = () => setMenuOpen((prev) => !prev)

  return (
    <header
      data-slot="nav-menu"
      className={twMerge(
        'fixed top-0 right-0 left-0 z-50 w-full transition-colors duration-300',
        menuOpen
          ? 'bg-navy'
          : isScrolled
            ? 'bg-black/70 backdrop-blur-xl backdrop-saturate-150'
            : 'bg-transparent',
      )}
    >
      <nav
        data-slot="nav-menu-inner"
        className="relative z-50 mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 pt-6 pb-4 sm:px-6 sm:pt-7 md:gap-4 lg:gap-6 lg:pt-8 lg:pb-5"
        aria-label="Principal"
      >
        <a
          href={SECTION_HASHES.home}
          data-slot="nav-logo-link"
          className="col-start-1 ml-5 block w-fit shrink-0 justify-self-start sm:ml-6 md:ml-6 focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:outline-none"
        >
          <BrandLogo />
        </a>

        <ul
          data-slot="nav-links"
          className="col-start-2 hidden items-center justify-self-center gap-4 md:flex lg:gap-8"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-slot="nav-link"
                className={twMerge(
                  'text-sm font-medium text-white/90 transition-colors hover:text-white lg:text-base',
                  'focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:outline-none',
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div
          data-slot="nav-actions"
          className="col-start-3 flex items-center justify-self-end"
        >
          <Button
            variant="cta"
            size="lg"
            href={whatsappOrcamentoUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-slot="nav-cta"
            className="hidden shrink-0 md:inline-flex focus-visible:ring-white/80"
          >
            Solicitar orçamento
          </Button>

          <HamburgerToggle
            open={menuOpen}
            onClick={toggleMenu}
            aria-controls="nav-mobile-panel"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            data-slot="nav-menu-toggle"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-white/10 md:hidden"
          />
        </div>
      </nav>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </header>
  )
}
