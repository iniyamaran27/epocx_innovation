import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LogoLetters, MagneticLink } from './motion'

export function Logo({
  tone = 'dark',
  animated = false,
  className,
}: {
  tone?: 'dark' | 'light'
  animated?: boolean
  className?: string
}) {
  const wordmarkClass = 'font-display text-[22px] font-semibold leading-none tracking-[0.04em]'

  return (
    <Link
      href="/"
      aria-label="Epocx Innovation home"
      className={cn('inline-flex flex-col leading-none', tone === 'dark' ? 'text-ink' : 'text-white', className)}
    >
      {animated ? (
        <LogoLetters text="EPOCX" className={wordmarkClass} />
      ) : (
        <span className={wordmarkClass}>EPOCX</span>
      )}
      <span className="mt-[3px] text-[7px] font-medium tracking-[0.58em]">INNOVATION</span>
    </Link>
  )
}

export function Eyebrow({
  children,
  line = false,
  className,
}: {
  children: React.ReactNode
  line?: boolean
  className?: string
}) {
  return (
    <p className={cn('eyebrow flex items-center gap-2', className)}>
      {line && <span aria-hidden="true" className="h-px w-6 bg-gold" />}
      {children}
    </p>
  )
}

export function IconCircle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('flex size-10 shrink-0 items-center justify-center rounded-full border border-[rgba(201,162,75,0.5)] bg-chip text-gold-deep', className)}
    >
      {children}
    </span>
  )
}

export function PillButton({
  href,
  children,
  variant = 'dark',
  arrow = true,
  className,
}: {
  href: string
  children: React.ReactNode
  variant?: 'dark' | 'outline' | 'light'
  arrow?: boolean
  className?: string
}) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium transition-[color,background-color,box-shadow] duration-200',
    variant === 'dark' && 'hover-gold-glow bg-navy text-white',
    variant === 'outline' && 'border border-[#cfd2d6] bg-white text-ink hover:bg-[#f2f2f2]',
    variant === 'light' && 'bg-white text-ink hover:bg-[#e9e9e9]',
    className,
  )
  const content = (
    <>
      {children}
      {arrow && <ArrowRight className="btn-arrow size-3.5" strokeWidth={1.5} aria-hidden="true" />}
    </>
  )

  if (variant === 'dark') {
    return (
      <MagneticLink href={href} className={classes}>
        {content}
      </MagneticLink>
    )
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  )
}
