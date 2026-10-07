import { cancelFrame, frame, useReducedMotion } from 'framer-motion'
import { ReactLenis } from 'lenis/react'
import type { LenisRef } from 'lenis/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

import 'lenis/dist/lenis.css'

const lenisEasing = (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t))

const ANCHOR_OFFSET_MOBILE = -36
const ANCHOR_OFFSET_DESKTOP = -60

type SmoothScrollProps = {
  children: ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null)
  const reduceMotion = useReducedMotion()
  const [anchorOffset, setAnchorOffset] = useState(ANCHOR_OFFSET_MOBILE)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 48rem)')
    const updateOffset = () => {
      setAnchorOffset(mq.matches ? ANCHOR_OFFSET_DESKTOP : ANCHOR_OFFSET_MOBILE)
    }

    updateOffset()
    mq.addEventListener('change', updateOffset)
    return () => mq.removeEventListener('change', updateOffset)
  }, [])

  useEffect(() => {
    if (reduceMotion) return

    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp)
    }

    frame.update(update, true)
    return () => cancelFrame(update)
  }, [reduceMotion])

  if (reduceMotion) {
    return children
  }

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        autoToggle: true,
        lerp: 0.08,
        duration: 1.35,
        easing: lenisEasing,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.1,
        anchors: {
          offset: anchorOffset,
        },
        stopInertiaOnNavigate: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
