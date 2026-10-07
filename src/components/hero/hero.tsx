import { ArrowUpRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { ScrollIndicator } from "@/components/hero/scroll-indication";
import { Button } from "@/components/ui/button";
import { headingGradient } from "@/lib/brand-styles";
import { SECTION_HASHES } from "@/lib/sections";
import { whatsappSaibaMaisUrl } from "@/lib/whatsapp";

import heroImage from "@/assets/hero-image.webp";
import heroVideo from "@/assets/video-hero.mp4";

const heroEase = [0.33, 1, 0.68, 1] as const;

const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: heroEase },
  },
};

function HeroPrimaryCta({ className }: { className?: string }) {
  const [hovered, setHovered] = useState(false);
  const arrowTransition = { duration: 0.4, ease: [0.33, 1, 0.68, 1] as const };

  return (
    <Button
      variant="hero"
      size="xl"
      href={whatsappSaibaMaisUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-slot="hero-cta-primary"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={twMerge(
        "w-full overflow-hidden transition-transform active:scale-[0.98] focus-visible:ring-white/80",
        className,
      )}
    >
      Saiba mais
      <span
        className="relative -mr-1 inline-flex size-5 shrink-0 overflow-hidden"
        aria-hidden="true"
      >
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          animate={
            hovered ? { x: 18, y: -18, opacity: 0 } : { x: 0, y: 0, opacity: 1 }
          }
          transition={arrowTransition}
        >
          <ArrowUpRight className="size-5" weight="bold" />
        </motion.span>
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          animate={
            hovered ? { x: 0, y: 0, opacity: 1 } : { x: -18, y: 18, opacity: 0 }
          }
          transition={arrowTransition}
        >
          <ArrowUpRight className="size-5" weight="bold" />
        </motion.span>
      </span>
    </Button>
  );
}

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleLoop = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    void video.play();
  };

  return (
    <section
      id="home"
      data-slot="hero"
      className="relative h-svh w-full overflow-hidden"
    >
      <div data-slot="hero-media" className="absolute inset-0">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={heroImage}
          alt=""
        />
        <video
          ref={videoRef}
          className={twMerge(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
            videoReady ? "opacity-100" : "opacity-0",
          )}
          src={heroVideo}
          poster={heroImage}
          width={1920}
          height={1080}
          autoPlay
          muted
          playsInline
          onPlaying={() => setVideoReady(true)}
          onEnded={handleLoop}
        />
      </div>

      <div
        data-slot="hero-overlay"
        className="absolute inset-0 bg-black/70"
        aria-hidden="true"
      />

      <div
        data-slot="hero-bottom-fade"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48 bg-linear-to-b from-transparent via-black/70 to-void md:h-64 lg:h-72"
        aria-hidden="true"
      />

      <div
        data-slot="hero-content"
        className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8"
      >
        <motion.div
          className="flex w-full max-w-6xl flex-col items-center"
          variants={heroContainerVariants}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
        >
          <motion.h1
            variants={heroItemVariants}
            className={twMerge(
              "mb-6 w-full text-balance font-heading text-[2rem] leading-[1.22] font-bold tracking-tighter sm:text-[3.5rem] sm:leading-[1.12] md:text-[4.25rem] md:leading-[1.1] lg:text-7xl xl:text-8xl",
              headingGradient,
            )}
          >
            Suporte de TI e Soluções Tecnológicas
          </motion.h1>

          <motion.p
            variants={heroItemVariants}
            className="mb-12 max-w-4xl text-sm leading-relaxed text-white/90 md:text-lg lg:text-xl"
          >
            Desenvolvemos soluções completas sob o rigor técnico que o seu
            mercado exige.
            <br />
            Da infraestrutura de TI e inteligência artificial ao posicionamento
            digital da sua marca.
          </motion.p>

          <motion.div
            variants={heroItemVariants}
            className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-2xl"
          >
            <HeroPrimaryCta />

            <Button
              variant="hero-outline"
              size="xl"
              href={SECTION_HASHES.servicos}
              data-slot="hero-cta-secondary"
              className="w-full focus-visible:ring-white/80"
            >
              Nossos serviços
            </Button>
          </motion.div>
        </motion.div>

        <ScrollIndicator />
      </div>
    </section>
  );
}
