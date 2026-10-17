import { Clock, Mail, Phone } from 'lucide-react'
import { Eyebrow, IconCircle } from './primitives'
import { CONTACT } from './contact-info'

const ROWS = [
  { icon: Mail, title: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: Phone, title: 'Phone', value: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
  { icon: Clock, title: 'Hours', value: 'Mon to Sat, 10:00 AM to 7:00 PM IST' },
]

export function ContactDetails() {
  return (
    <div>
      <Eyebrow line>Get in touch</Eyebrow>
      <h1 className="mt-4 max-w-[380px] text-[30px] font-medium leading-[1.12] text-ink text-balance md:text-[34px]">
        Let&apos;s build something intelligent
      </h1>
      <p className="mt-4 max-w-[320px] text-[12px] leading-[1.6] text-ink-2">
        Tell us about your idea and we&apos;ll get back to you within 24 hours.
      </p>

      <ul className="mt-8 flex max-w-[340px] flex-col gap-6 rounded-[12px] bg-panel p-5">
        {ROWS.map(({ icon: Icon, title, value, href }) => (
          <li key={title} className="flex items-start gap-3">
            <IconCircle className="size-8 bg-[#e8e8e6]">
              <Icon className="size-4" strokeWidth={1.5} />
            </IconCircle>
            <div>
              <h2 className="text-[10px] font-medium text-ink">{title}</h2>
              {href ? (
                <a href={href} className="link-underline mt-1 inline-block text-[11px] leading-[1.5] text-ink-2 transition-[color,background-size] hover:text-ink">
                  {value}
                </a>
              ) : (
                <p className="mt-1 text-[11px] leading-[1.5] text-ink-2">{value}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
