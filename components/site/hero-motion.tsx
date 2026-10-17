'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

const WORD_STAGGER = 0.08
const WORD_DURATION = 0.6

type HeadingWord = { text: string; className?: string }

export function HeroHeading({ words, className }: { words: HeadingWord[]; className?: string }) {
  const reduce = useReducedMotion()

  return (
    <h1 className={className}>
      {words.map((word, index) => (
        <span key={word.text} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className={`inline-block ${word.className ?? ''}`}
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: WORD_DURATION, ease: 'easeOut', delay: index * WORD_STAGGER }
            }
          >
            {word.text}
          </motion.span>
        </span>
      ))}
    </h1>
  )
}

export function HeroButtons({
  children,
  className,
  wordCount,
}: {
  children: React.ReactNode
  className?: string
  wordCount: number
}) {
  const reduce = useReducedMotion()
  const headingEnd = (wordCount - 1) * WORD_STAGGER + WORD_DURATION

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? { duration: 0 } : { duration: 0.5, ease: 'easeOut', delay: headingEnd + 0.3 }}
    >
      {children}
    </motion.div>
  )
}

const MAX_TILT = 6

export function HeroVisual({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 80, damping: 18, mass: 0.6 })
  const springY = useSpring(rotateY, { stiffness: 80, damping: 18, mass: 0.6 })

  useEffect(() => {
    if (reduce) return

    const handlePointerMove = (event: PointerEvent) => {
      const node = ref.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const dx = (event.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2)
      const dy = (event.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2)
      const clamp = (value: number) => Math.max(-1, Math.min(1, value))
      rotateY.set(clamp(dx) * MAX_TILT)
      rotateX.set(clamp(-dy) * MAX_TILT)
    }

    const reset = () => {
      rotateX.set(0)
      rotateY.set(0)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', reset)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      document.documentElement.removeEventListener('pointerleave', reset)
    }
  }, [reduce, rotateX, rotateY])

  return (
    <div ref={ref} className="relative [perspective:1000px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[520px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,75,0.18),transparent_65%)] blur-[40px] md:left-auto md:right-0 md:translate-x-[4%]"
      />
      <motion.div
        className="relative"
        animate={reduce ? { y: 0 } : { y: [0, -14, 0] }}
        transition={reduce ? { duration: 0 } : { duration: 7, ease: 'easeInOut', repeat: Infinity }}
      >
        <motion.div style={reduce ? undefined : { rotateX: springX, rotateY: springY }}>{children}</motion.div>
      </motion.div>
    </div>
  )
}

const PARTICLES = [
  { left: 6, top: 82, size: 2, duration: 14, delay: 0 },
  { left: 14, top: 64, size: 3, duration: 18, delay: 3.2 },
  { left: 22, top: 90, size: 2, duration: 16, delay: 6.5 },
  { left: 31, top: 72, size: 2.5, duration: 20, delay: 1.4 },
  { left: 39, top: 95, size: 2, duration: 15, delay: 8.1 },
  { left: 47, top: 68, size: 3, duration: 22, delay: 4.6 },
  { left: 54, top: 88, size: 2, duration: 17, delay: 10.2 },
  { left: 61, top: 76, size: 2.5, duration: 19, delay: 2.3 },
  { left: 68, top: 92, size: 2, duration: 13, delay: 7.4 },
  { left: 74, top: 60, size: 3, duration: 21, delay: 5.5 },
  { left: 80, top: 84, size: 2, duration: 16, delay: 9.3 },
  { left: 86, top: 70, size: 2.5, duration: 18, delay: 0.8 },
  { left: 92, top: 94, size: 2, duration: 15, delay: 11.6 },
  { left: 97, top: 66, size: 3, duration: 23, delay: 3.9 },
]

export function GoldDust() {
  const reduce = useReducedMotion()
  if (reduce) return null

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {PARTICLES.map((particle) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          className="absolute rounded-full bg-gold"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.4, 0.4, 0], y: -220 }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: 'linear',
            repeat: Infinity,
            times: [0, 0.15, 0.8, 1],
          }}
        />
      ))}
    </div>
  )
}
