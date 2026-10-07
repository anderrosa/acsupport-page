import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

const revealEase = [0.33, 1, 0.68, 1] as const

type ScrollRevealDirection = 'up' | 'down' | 'left' | 'right' | 'none'

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  direction?: ScrollRevealDirection
  once?: boolean
  amount?: number
}

const directionOffset: Record<ScrollRevealDirection, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  once = true,
  amount = 0.2,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, amount, margin: '-64px' })
  const reduceMotion = useReducedMotion()
  const offset = directionOffset[direction]
  const isVisible = reduceMotion || inView

  return (
    <motion.div
      ref={ref}
      data-slot="scroll-reveal"
      initial={reduceMotion ? false : { opacity: 0, ...offset }}
      animate={isVisible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{ duration: 0.55, delay, ease: revealEase }}
      className={twMerge(className)}
    >
      {children}
    </motion.div>
  )
}
