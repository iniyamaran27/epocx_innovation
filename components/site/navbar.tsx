'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Logo, PillButton } from './primitives'
import { NAV_LINKS } from './nav-links'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out',
        scrolled
          ? 'border-[rgba(0,0,0,0.06)] bg-[rgba(250,250,250,0.75)] shadow-[0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-[12px]'
          : 'border-transparent bg-transparent shadow-none backdrop-blur-none',
      )}
    >
      <div className="container-x flex h-14 items-center justify-between">
        <Logo animated />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-[60px]">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={link.href === pathname ? 'page' : undefined}
                  className={cn(
                    'relative block py-2 text-[11px] font-medium text-ink transition-opacity hover:opacity-70',
                    link.href === pathname &&
                      'after:absolute after:inset-x-0 after:-bottom-1.5 after:h-[2px] after:bg-[image:var(--gold-gradient)] after:content-[""]',
                  )}
                >
                  <span className={cn(link.href !== pathname && 'link-underline')}>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <PillButton href="/contact" className="hidden px-4 py-2 text-[11px] md:inline-flex">
          Get Started
        </PillButton>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex size-9 items-center justify-center rounded-full text-ink md:hidden"
        >
          {open ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="container-x pb-3 md:hidden">
          <ul className="card-soft flex flex-col gap-1 p-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-ink hover:bg-alt"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <PillButton href="/contact" className="w-full">
                Get Started
              </PillButton>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
