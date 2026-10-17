'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)'
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], summary, select, label[for]'
const RING_SPRING = { stiffness: 380, damping: 32, mass: 0.6 }

function subscribe(callback: () => void) {
  const query = window.matchMedia(FINE_POINTER_QUERY)
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}

const getSnapshot = () => window.matchMedia(FINE_POINTER_QUERY).matches
const getServerSnapshot = () => false

export function CustomCursor() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, RING_SPRING)
  const ringY = useSpring(y, RING_SPRING)

  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement
    root.classList.add('custom-cursor')

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
    }
    const handleOver = (event: PointerEvent) => {
      const target = event.target as Element | null
      setHovering(!!target?.closest?.(INTERACTIVE_SELECTOR))
    }
    const handleLeave = () => setVisible(false)

    window.addEventListener('pointermove', handleMove, { passive: true })
    document.addEventListener('pointerover', handleOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleLeave)

    return () => {
      root.classList.remove('custom-cursor')
      window.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerover', handleOver)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[110]">
      <motion.span
        className="absolute top-0 left-0 rounded-full border-[1.5px] border-solid"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        initial={false}
        animate={{
          width: hovering ? 52 : 36,
          height: hovering ? 52 : 36,
          borderColor: hovering ? 'rgba(201, 162, 75, 1)' : 'rgba(17, 26, 34, 0.35)',
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
      <motion.span
        className="absolute top-0 left-0 size-[10px] rounded-full bg-navy"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        initial={false}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  )
}
