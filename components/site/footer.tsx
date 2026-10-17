import Link from 'next/link'
import { Logo } from './primitives'
import { NAV_LINKS } from './nav-links'
import { CONTACT } from './contact-info'

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden="true">
      <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57v-2.03c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.83.57A12 12 0 0 0 12 .3" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden="true">
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.49l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41z" />
    </svg>
  )
}

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: LinkedInIcon },
  { label: 'GitHub', href: 'https://github.com', icon: GitHubIcon },
  { label: 'X', href: 'https://x.com', icon: XIcon },
]

export function Footer() {
  return (
    <footer className="relative bg-navy-deep text-white">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gold-gradient" />
      <div className="container-x flex flex-col gap-6 py-6 max-md:pr-20 md:flex-row md:items-center md:gap-0 md:py-4">
        <Logo tone="light" className="md:w-[175px]" />
        <div className="flex flex-col gap-2">
          <p className="max-w-[160px] text-[9px] leading-[1.5] text-white/60 md:max-w-[130px]">
            We develop AI, ML, and automation solutions and software applications.
          </p>
          <address className="max-w-[160px] text-[9px] leading-[1.5] text-white/80 not-italic md:max-w-[130px]">
            <a href={`mailto:${CONTACT.email}`} className="link-underline transition-[color,background-size] hover:text-white">
              {CONTACT.email}
            </a>
            <span aria-hidden="true" className="mx-1.5">
              ·
            </span>
            <a href={CONTACT.phoneHref} className="link-underline whitespace-nowrap transition-[color,background-size] hover:text-white">
              {CONTACT.phoneDisplay}
            </a>
          </address>
        </div>

        <nav aria-label="Footer" className="md:ml-auto md:mr-auto">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-underline text-[9px] text-white/80 transition-[color,background-size] hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 md:items-end">
          <ul className="flex gap-4">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white transition-opacity hover:opacity-70"
                >
                  <Icon />
                  <span className="sr-only">{label}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="text-[7px] text-white/50">{'© 2025 Epocx Innovation. All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  )
}
