'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const
export const CARD_STAGGER = 0.12

export function FadeInSection({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={reduce ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export function PageFadeIn({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={reduce ? { duration: 0 } : { duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export function LogoLetters({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion()

  return (
    <span className={className} aria-label={text}>
      {text.split('').map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          aria-hidden="true"
          className="inline-block"
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.4, ease: 'easeOut', delay: 0.1 + index * 0.07 }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  )
}

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: CARD_STAGGER } },
}

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export function StaggerList({
  children,
  className,
  as = 'ul',
}: {
  children: React.ReactNode
  className?: string
  as?: 'ul' | 'ol'
}) {
  const reduce = useReducedMotion()
  const Component = as === 'ol' ? motion.ol : motion.ul

  return (
    <Component
      className={className}
      variants={listVariants}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </Component>
  )
}

const REST_SHADOW = '0 0 0 1px rgba(201, 162, 75, 0), 0 2px 12px rgba(0, 0, 0, 0.04)'
const HOVER_SHADOW = '0 0 0 1px rgba(201, 162, 75, 0.55), 0 16px 32px rgba(0, 0, 0, 0.1)'

export function HoverCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion()

  return (
    <motion.li
      className={className}
      variants={reduce ? undefined : cardVariants}
      style={{ boxShadow: REST_SHADOW }}
      whileHover={
        reduce ? undefined : { y: -6, boxShadow: HOVER_SHADOW, transition: { duration: 0.25, ease: 'easeOut' } }
      }
    >
      {children}
    </motion.li>
  )
}

const MAGNET_RANGE = 8
const MotionLink = motion.create(Link)

export function MagneticLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: React.ReactNode
}) {
  const reduce = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 18, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 18, mass: 0.4 })

  function handleMove(event: React.MouseEvent<HTMLAnchorElement>) {
    if (reduce) return
    const rect = event.currentTarget.getBoundingClientRect()
    const relX = (event.clientX - rect.left) / rect.width - 0.5
    const relY = (event.clientY - rect.top) / rect.height - 0.5
    x.set(relX * 2 * MAGNET_RANGE)
    y.set(relY * 2 * MAGNET_RANGE)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <MotionLink
      href={href}
      className={className}
      style={reduce ? undefined : { x, y }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </MotionLink>
  )
}

export function ParallaxLayer({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Over the scroll range (viewport + section height ≈ 2.3× layer travel), ±7.5% keeps the layer at ~0.85× scroll speed.
  const y = useTransform(scrollYProgress, [0, 1], ['-7.5%', '7.5%'])

  return (
    <div ref={ref} aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <motion.div className={className} style={reduce ? undefined : { y }}>
        {children}
      </motion.div>
    </div>
  )
}

export function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? Number(match[1]) : 0
  const suffix = match ? match[2] : ''

  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || !inView) return
    if (reduce) {
      node.textContent = `${target}${suffix}`
      return
    }
    const controls = animate(0, target, {
      duration: 1.8,
      ease: EASE_OUT_EXPO,
      onUpdate: (latest) => {
        node.textContent = `${Math.round(latest)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, reduce, target, suffix])

  if (!match) return <>{value}</>

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {reduce ? value : `0${suffix}`}
      </span>
      <span className="sr-only">{value}</span>
    </>
  )
}

export function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })

  if (reduce) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2px] origin-left bg-[linear-gradient(90deg,#f3d98b,#c9a24b,#9a7420)]"
      style={{ scaleX }}
    />
  )
}
