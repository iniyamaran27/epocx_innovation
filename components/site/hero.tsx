import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { PillButton } from './primitives'
import { GoldDust, HeroButtons, HeroHeading, HeroVisual } from './hero-motion'

const HEADING_WORDS = [
  { text: 'EPOCX', className: 'text-ink' },
  {
    text: 'INNOVATION',
    className: 'bg-[linear-gradient(100deg,#9A9A9A_0%,#C9A24B_55%,#E6C779_100%)] bg-clip-text text-transparent',
  },
]

const GRAIN_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#EDEDEC_0%,#F6F6F5_45%,#FFFFFF_100%)] pt-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: GRAIN_TEXTURE, backgroundSize: '160px 160px' }}
      />
      <GoldDust />
      <div className="container-x relative grid items-center gap-8 pb-12 pt-8 md:grid-cols-[1fr_1.1fr] md:pb-0 md:pt-6 lg:min-h-[314px]">
        <div className="relative z-10 py-4 md:py-8">
          <p className="eyebrow flex flex-wrap items-center gap-2">
            <span>Ideas</span>
            <ArrowRight className="size-2.5" strokeWidth={1.5} aria-hidden="true" />
            <span>AI</span>
            <ArrowRight className="size-2.5" strokeWidth={1.5} aria-hidden="true" />
            <span>Automation</span>
            <ArrowRight className="size-2.5" strokeWidth={1.5} aria-hidden="true" />
            <span>Impact</span>
          </p>

          <HeroHeading
            className="mt-4 font-display text-[38px] font-medium leading-[1.02] tracking-[0.01em] sm:text-[46px]"
            words={HEADING_WORDS}
          />

          <h2 className="mt-5 max-w-[360px] text-[18px] font-normal leading-[1.3] text-ink">
            We develop AI, ML, and automation solutions and software applications.
          </h2>
          <p className="mt-3 max-w-[250px] text-[12px] leading-relaxed text-ink-2">
            Turning ideas into intelligent, scalable and real-world solutions.
          </p>

          <HeroButtons className="mt-6 flex flex-wrap items-center gap-5" wordCount={HEADING_WORDS.length}>
            <PillButton href="/contact" className="text-[11px]">
              Get Started
            </PillButton>
            <PillButton href="#projects" variant="outline" arrow={false} className="text-[11px]">
              Explore Our Work
            </PillButton>
          </HeroButtons>
        </div>

        <div className="relative -mx-6 md:mx-0 md:-mr-[120px] lg:-mr-[160px]">
          <HeroVisual>
            <Image
              src="/hero-3d.webp"
              alt="Abstract 3D sculpture of interlocking glass and steel bands with a floating chrome sphere"
              width={1408}
              height={768}
              priority
              className="h-auto w-full max-w-[560px] mix-blend-multiply [mask-image:radial-gradient(closest-side,#000_60%,transparent_100%)] md:ml-auto"
            />
          </HeroVisual>
        </div>

        <div className="absolute right-6 top-[72px] hidden text-ink lg:block xl:right-0">
          <p className="text-[8px] font-medium uppercase leading-[1.9] tracking-[0.25em]">
            Smarter
            <br />
            Technology.
            <br />
            Real impact.
          </p>
          <span aria-hidden="true" className="mt-3 block h-px w-6 bg-ink" />
        </div>
      </div>
    </section>
  )
}
