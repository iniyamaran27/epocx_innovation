'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Eyebrow } from './primitives'
import { cn } from '@/lib/utils'

const AUTO_ADVANCE_MS = 6000

const TESTIMONIALS = [
  {
    quote:
      'Epocx Innovation delivered an outstanding AI solution for our business. Their team is skilled, responsive and truly understands our needs.',
    name: 'Client Name',
    role: 'Founder, Tech Startup',
  },
  {
    quote:
      'The automation pipeline they built saved our operations team hours every week. Clear communication from start to finish.',
    name: 'Client Name',
    role: 'COO, Logistics Company',
  },
  {
    quote:
      'From MVP to production, Epocx guided us with the right technology choices and delivered on time.',
    name: 'Client Name',
    role: 'CTO, SaaS Platform',
  },
]

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const go = (dir: number) => setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length)

  useEffect(() => {
    if (paused) return
    const timer = window.setTimeout(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length)
    }, AUTO_ADVANCE_MS)
    return () => window.clearTimeout(timer)
  }, [index, paused])

  return (
    <section
      aria-labelledby="testimonials-title"
      aria-roledescription="carousel"
      className="bg-alt pb-14 pt-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false)
      }}
    >
      <div className="container-x flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Eyebrow>What clients say</Eyebrow>
          <h2 id="testimonials-title" className="mt-2 text-[16px] font-medium leading-tight text-ink">
            Trusted by Innovators
          </h2>
          <div className="mt-2 grid" aria-live={paused ? 'polite' : 'off'}>
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={t.role}
                aria-hidden={i !== index}
                className={cn(
                  'col-start-1 row-start-1 transition-opacity duration-700 ease-in-out motion-reduce:transition-none',
                  i === index ? 'opacity-100' : 'pointer-events-none opacity-0',
                )}
              >
                <blockquote className="max-w-[300px] text-[8px] leading-[1.6] text-ink">
                  {'“'}
                  {t.quote}
                  {'”'}
                </blockquote>
                <figcaption className="mt-2 flex items-center gap-2">
                  <Image
                    src="/avatar.webp"
                    alt=""
                    width={24}
                    height={24}
                    className="size-6 rounded-full object-cover"
                  />
                  <span>
                    <span className="block text-[7px] font-semibold text-ink">{t.name}</span>
                    <span className="block text-[6px] text-ink-2">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start gap-10 sm:items-end">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex size-6 items-center justify-center rounded-full border border-[#d9dbde] bg-white text-ink transition-colors hover:bg-[#e9eaec]"
            >
              <ChevronLeft className="size-3" strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex size-6 items-center justify-center rounded-full border border-[#d9dbde] bg-white text-ink transition-colors hover:bg-[#e9eaec]"
            >
              <ChevronRight className="size-3" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
          <div className="flex gap-1.5 pr-4">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  'h-1 rounded-full transition-all duration-300',
                  i === index ? 'w-3 bg-gold' : 'w-1 bg-[#d4d6d9] hover:bg-ink-3',
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
