import { useEffect, useState } from 'react'

type UseCountUpOptions = {
  target: number
  enabled: boolean
  duration?: number
}

export function useCountUp({
  target,
  enabled,
  duration = 2000,
}: UseCountUpOptions) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!enabled) return

    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - progress) ** 3

      setValue(Math.round(eased * target))

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [target, enabled, duration])

  return value
}
