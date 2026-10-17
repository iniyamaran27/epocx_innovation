'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Eyebrow } from './primitives'
import { CONTACT } from './contact-info'
import { cn } from '@/lib/utils'

const linkClass = 'link-underline font-medium text-gold-deep'

const FAQS: { question: string; answer: React.ReactNode }[] = [
  {
    question: 'How long does a typical project take?',
    answer:
      'Most projects run between 4 and 12 weeks depending on scope. A focused MVP or automation can ship in a few weeks, while larger AI systems are delivered in phased milestones.',
  },
  {
    question: 'Do you work with startups and small businesses?',
    answer:
      'Yes. We partner with early-stage startups and growing businesses alike, shaping engagements around your budget, timeline and stage of growth.',
  },
  {
    question: 'What technologies do you use?',
    answer:
      'Our core stack includes Python, PyTorch, TensorFlow, Scikit-learn, Flask, SQL, Power BI and React. We always choose tools based on what fits your product best.',
  },
  {
    question: 'Do you offer support after delivery?',
    answer:
      'Every project includes a post-launch support period, and we offer ongoing maintenance, model monitoring and feature updates as your needs evolve.',
  },
  {
    question: 'How do we get started?',
    answer: (
      <>
        Share your idea through our{' '}
        <Link href="/contact" className={linkClass}>
          contact page
        </Link>{' '}
        or email us at{' '}
        <a href={`mailto:${CONTACT.email}`} className={linkClass}>
          {CONTACT.email}
        </a>
        . We&apos;ll schedule a free consultation to understand your goals and propose next steps.
      </>
    ),
  },
]

function FaqItem({ question, answer }: { question: string; answer: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const id = useId()

  return (
    <li className="card-soft">
      <h3>
        <button
          type="button"
          id={`${id}-trigger`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[13px] font-medium text-ink"
        >
          {question}
          <span
            aria-hidden="true"
            className="flex size-6 shrink-0 items-center justify-center rounded-full border border-[rgba(201,162,75,0.5)] bg-chip text-gold-deep"
          >
            <span className="relative size-3">
              <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 rounded-full bg-current" />
              <span
                className={cn(
                  'absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 rounded-full bg-current transition-transform duration-300',
                  open && 'scale-y-0',
                )}
              />
            </span>
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-trigger`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="max-w-[560px] px-5 pb-4 text-[11px] leading-[1.7] text-ink-2">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-alt py-10">
      <div className="container-x">
        <Eyebrow line>FAQ</Eyebrow>
        <h2 id="faq-title" className="mt-3 text-[24px] font-medium leading-tight text-ink">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-[10px] text-ink-2">Answers to common questions about working with us.</p>

        <ul className="mt-5 flex flex-col gap-3">
          {FAQS.map((faq) => (
            <FaqItem key={faq.question} {...faq} />
          ))}
        </ul>
      </div>
    </section>
  )
}
