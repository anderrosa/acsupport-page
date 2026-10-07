import { twMerge } from 'tailwind-merge'

import { SECTION_HASHES } from '@/lib/sections'

export type ScrollIndicatorProps = {
  className?: string
}

export function ScrollIndicator({ className }: ScrollIndicatorProps) {
  return (
    <a
      href={SECTION_HASHES.servicos}
      data-slot="scroll-indicator"
      aria-label="Ir para serviços"
      className={twMerge(
        'absolute right-0 bottom-6 left-0 flex flex-col items-center gap-1.5 transition-opacity hover:opacity-100 md:bottom-10',
        'opacity-80 focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:outline-none',
        className,
      )}
    >
      <svg
        data-slot="scroll-indicator-mouse"
        width="22"
        height="34"
        viewBox="0 0 26 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hidden opacity-80 lg:block"
      >
        <rect
          x="1"
          y="1"
          width="24"
          height="38"
          rx="12"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-white/70"
        />
        <rect
          x="11.5"
          y="7"
          width="3"
          height="6"
          rx="1.5"
          fill="currentColor"
          className="text-white"
        >
          <animate
            attributeName="y"
            values="7;18;7"
            dur="1.8s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
          />
          <animate
            attributeName="opacity"
            values="1;0;1"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>

      <svg
        data-slot="scroll-indicator-phone"
        width="20"
        height="34"
        viewBox="0 0 24 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block opacity-80 lg:hidden"
      >
        <rect
          x="1"
          y="1"
          width="22"
          height="38"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-white/70"
        />
        <circle
          cx="12"
          cy="4.5"
          r="1"
          fill="currentColor"
          className="text-white/50"
        />
        <rect
          x="3.5"
          y="7"
          width="17"
          height="26"
          rx="2"
          fill="currentColor"
          className="text-white/10"
        />
        <line
          x1="12"
          y1="28"
          x2="12"
          y2="22"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-white"
        >
          <animate
            attributeName="y1"
            values="28;22;28"
            dur="1.8s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
          />
          <animate
            attributeName="y2"
            values="22;16;22"
            dur="1.8s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
          />
          <animate
            attributeName="opacity"
            values="1;0;1"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </line>
        <polyline
          points="9,19 12,16 15,19"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <animate
            attributeName="points"
            values="9,19 12,16 15,19; 9,13 12,10 15,13; 9,19 12,16 15,19"
            dur="1.8s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
          />
          <animate
            attributeName="opacity"
            values="1;0;1"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </polyline>
      </svg>

      <span className="text-xs tracking-[0.3em] text-white/70 uppercase">
        scroll
      </span>
    </a>
  )
}
