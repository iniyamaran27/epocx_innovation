import { PillButton } from './primitives'
import { CONTACT } from './contact-info'

export function CtaBanner() {
  return (
    <section id="contact" aria-labelledby="cta-title" className="relative z-10 -mt-10 bg-[linear-gradient(to_bottom,transparent_50%,#0f1720_50%)]">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12 lg:px-[98px]">
        <div className="relative flex flex-col gap-4 overflow-hidden rounded-[10px] bg-navy px-6 py-4 sm:flex-row sm:items-center sm:justify-between md:px-11">
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gold-gradient" />
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 800 70"
            preserveAspectRatio="none"
            fill="none"
          >
            <path d="M380 70 C 460 10, 560 -10, 700 30 S 800 60, 820 40" stroke="white" strokeOpacity="0.06" />
            <path d="M420 70 C 500 20, 590 0, 720 40 S 800 70, 820 55" stroke="white" strokeOpacity="0.05" />
            <path d="M460 70 C 540 30, 620 15, 740 50" stroke="white" strokeOpacity="0.04" />
          </svg>
          <div className="relative">
            <p className="eyebrow text-[7px] text-gold-light">{"Let's build together"}</p>
            <h2 id="cta-title" className="mt-1 text-[16px] font-medium text-white">
              Have a project in mind?
            </h2>
            <p className="mt-1 max-w-[190px] text-[7px] leading-[1.5] text-white/70">
              {"We'd love to hear from you. Let's turn your ideas into intelligent solutions."}
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="link-underline mt-1 inline-block text-[7px] text-white/70 transition-[color,background-size] hover:text-white"
            >
              {CONTACT.email}
            </a>
          </div>
          <PillButton href="/contact" variant="light" className="relative self-start px-4 py-2 text-[8px] sm:self-auto">
            Get Started
          </PillButton>
        </div>
      </div>
    </section>
  )
}
