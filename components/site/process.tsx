'use client'

import { Fragment, useLayoutEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Lightbulb, Map, Hammer, Rocket } from 'lucide-react'
import { Eyebrow, IconCircle } from './primitives'
import { CARD_STAGGER, cardVariants } from './motion'

const STEPS = [
  { icon: Lightbulb, num: '01', title: 'Discover', text: 'Understand your goals and challenges.' },
  { icon: Map, num: '02', title: 'Plan', text: 'Design the right strategy and technology stack.' },
  { icon: Hammer, num: '03', title: 'Build', text: 'Develop, test and ensure quality.' },
  { icon: Rocket, num: '04', title: 'Deliver', text: 'Deploy and support your solution.' },
]

const LINE_DURATION = 1.4
const LINE_DELAY = 0.2

type LineGeometry = { horizontal: boolean; start: number; length: number; cross: number }

export function Process() {
  const reduce = useReducedMotion()
  const listRef = useRef<HTMLOListElement>(null)
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([])
  const inView = useInView(listRef, { once: true, amount: 0.35 })
  const [line, setLine] = useState<LineGeometry | null>(null)
  const [stepOffsets, setStepOffsets] = useState<number[]>([])

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return

    const measure = () => {
      const base = list.getBoundingClientRect()
      const centers = iconRefs.current.map((node) => {
        const rect = node?.getBoundingClientRect()
        return rect
          ? { x: rect.left - base.left + rect.width / 2, y: rect.top - base.top + rect.height / 2 }
          : { x: 0, y: 0 }
      })
      const first = centers[0]
      const last = centers[centers.length - 1]
      const horizontal = Math.abs(last.x - first.x) > Math.abs(last.y - first.y)
      const length = horizontal ? last.x - first.x : last.y - first.y
      setLine({
        horizontal,
        start: horizontal ? first.x : first.y,
        length,
        cross: horizontal ? -10 : first.x,
      })
      setStepOffsets(
        centers.map((c) => (length > 0 ? ((horizontal ? c.x - first.x : c.y - first.y) / length) : 0)),
      )
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    return () => observer.disconnect()
  }, [])

  const play = reduce || inView

  return (
    <section id="projects" className="bg-white py-6">
      <div className="container-x">
        <Eyebrow>Our process</Eyebrow>
        <h2 className="mt-2 text-[18px] font-medium leading-tight text-ink">From Idea to Impact</h2>
        <p className="mt-2 text-[9px] text-ink-2">A simple, focused process to turn your vision into reality.</p>

        <motion.ol
          ref={listRef}
          className="relative mt-5 flex flex-col gap-5 md:flex-row md:items-start md:gap-0"
          initial={reduce ? false : 'hidden'}
          animate={play ? 'show' : 'hidden'}
          variants={{ hidden: {}, show: { transition: { staggerChildren: CARD_STAGGER } } }}
        >
          {line && line.length > 0 && (
            <motion.li
              aria-hidden="true"
              className="pointer-events-none absolute bg-gold-gradient"
              style={
                line.horizontal
                  ? { left: line.start, top: line.cross, width: line.length, height: 1, originX: 0 }
                  : { top: line.start, left: line.cross, height: line.length, width: 1, originY: 0 }
              }
              initial={reduce ? false : line.horizontal ? { scaleX: 0 } : { scaleY: 0 }}
              animate={play ? (line.horizontal ? { scaleX: 1 } : { scaleY: 1 }) : undefined}
              transition={reduce ? { duration: 0 } : { duration: LINE_DURATION, ease: 'easeInOut', delay: LINE_DELAY }}
            />
          )}

          {STEPS.map(({ icon: Icon, num, title, text }, i) => (
            <Fragment key={num}>
              <motion.li
                className="relative flex items-start gap-3 md:flex-1"
                variants={reduce ? undefined : cardVariants}
              >
                <motion.span
                  ref={(node) => {
                    iconRefs.current[i] = node
                  }}
                  className="shrink-0"
                  initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                  animate={play ? { scale: 1, opacity: 1 } : undefined}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : {
                          type: 'spring',
                          stiffness: 320,
                          damping: 18,
                          delay: LINE_DELAY + (stepOffsets[i] ?? i / (STEPS.length - 1)) * LINE_DURATION,
                        }
                  }
                >
                  <IconCircle className="size-7">
                    <Icon className="size-3.5" strokeWidth={1.5} />
                  </IconCircle>
                </motion.span>
                <div>
                  <span className="block text-[8px] text-ink">{num}</span>
                  <h3 className="mt-0.5 text-[8px] font-medium text-ink">{title}</h3>
                  <p className="mt-0.5 max-w-[90px] text-[7px] leading-[1.5] text-ink-2">{text}</p>
                </div>
              </motion.li>
              {i < STEPS.length - 1 && (
                <li aria-hidden="true" className="hidden pt-2.5 md:block md:w-10 md:shrink-0">
                  <ArrowRight className="size-3 text-ink-3" strokeWidth={1.25} />
                </li>
              )}
            </Fragment>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
