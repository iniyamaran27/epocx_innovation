import Image from 'next/image'
import { CalendarCheck, Headset, Infinity as InfinityIcon, Timer, Users } from 'lucide-react'
import { CountUp, ParallaxLayer } from './motion'

const REASONS = [
  { icon: Users, title: 'Experienced Team', text: 'Skilled engineers & problem solvers' },
  { icon: CalendarCheck, title: 'Flexible Engagement', text: 'From MVPs to full-scale products' },
  { icon: Timer, title: 'On-Time Delivery', text: 'Because your goals matter' },
  { icon: Headset, title: 'Long-Term Support', text: 'We grow with you' },
]

const STATS = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '10+', label: 'Happy Clients' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: 'infinity', label: 'Possibilities Ahead' },
]

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="grid lg:grid-cols-[58%_42%]">
      <div className="relative overflow-hidden bg-navy text-white">
        <ParallaxLayer className="absolute inset-x-0 -inset-y-[10%]">
          <Image src="/mountains.webp" alt="" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
        </ParallaxLayer>
        <div aria-hidden="true" className="absolute inset-0 bg-navy/75" />
        <div className="relative px-6 py-6 md:px-12 lg:pl-[100px] lg:pr-10">
          <p className="eyebrow text-gold-light">Why choose us</p>
          <h2 id="why-title" className="mt-3 max-w-[220px] text-[22px] font-medium leading-[1.15]">
            Technology with Purpose
          </h2>
          <p className="mt-3 max-w-[260px] text-[10px] leading-[1.6] text-white/80">
            We combine innovation, expertise and a client-first approach to deliver solutions that make a real
            difference.
          </p>

          <ul className="mt-6 grid gap-x-0 gap-y-5 sm:grid-cols-2">
            {REASONS.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                className={i % 2 === 1 ? 'flex items-center gap-3 sm:border-l sm:border-white/15 sm:pl-4' : 'flex items-center gap-3'}
              >
                <span
                  aria-hidden="true"
                  className="flex size-7 shrink-0 items-center justify-center rounded-full border border-[rgba(201,162,75,0.5)] text-gold-light"
                >
                  <Icon className="size-3.5" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="text-[9px] font-medium">{title}</h3>
                  <p className="mt-0.5 text-[8px] text-white/60">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-page px-6 py-8 md:px-12 lg:px-10 lg:py-10">
        <p className="eyebrow">Our impact</p>
        <dl className="mt-3 grid grid-cols-2">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={[
                'flex flex-col-reverse py-5',
                i % 2 === 0 ? 'pr-6' : 'border-l border-[#e3e4e6] pl-6',
                i < 2 ? 'border-b border-[#e3e4e6]' : '',
              ].join(' ')}
            >
              <dt className="mt-2 text-[10px] text-ink-2">{stat.label}</dt>
              <dd className="text-[24px] font-medium leading-none text-ink">
                {stat.value === 'infinity' ? (
                  <>
                    <InfinityIcon className="size-7" strokeWidth={1.75} aria-hidden="true" />
                    <span className="sr-only">Infinite</span>
                  </>
                ) : (
                  <span className="text-gold-gradient">
                    <CountUp value={stat.value} />
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
