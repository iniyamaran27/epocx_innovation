import Link from 'next/link'
import { ArrowRight, Brain, ChartColumn, CodeXml, Settings } from 'lucide-react'
import { Eyebrow, IconCircle } from './primitives'
import { HoverCard, StaggerList } from './motion'

const SERVICES = [
  {
    icon: Brain,
    title: 'AI Solutions',
    text: 'Custom AI solutions including computer vision, NLP, and generative AI.',
  },
  {
    icon: ChartColumn,
    title: 'ML Models',
    text: 'Build and deploy ML models for better predictions and smarter decisions.',
  },
  {
    icon: Settings,
    title: 'Automation',
    text: 'Automate repetitive tasks and optimize business processes.',
  },
  {
    icon: CodeXml,
    title: 'Software Applications',
    text: 'Web and mobile applications built for performance, scalability and growth.',
  },
]

export function Services() {
  return (
    <section id="services" className="bg-alt py-6 md:pb-5 md:pt-6">
      <div className="container-x">
        <Eyebrow line>Services</Eyebrow>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-[24px] font-medium leading-tight text-ink">What We Do</h2>
          <Link
            href="#services"
            className="inline-flex items-center gap-2 text-[9px] font-medium text-ink hover:opacity-70"
          >
            <span className="link-underline">View All Services</span>
            <ArrowRight className="btn-arrow size-3" strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
        <p className="mt-3 text-[10px] text-ink-2">End-to-end solutions to help you build, automate and scale.</p>

        <StaggerList className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, text }) => (
            <HoverCard key={title} className="card-soft p-5">
              <IconCircle className="size-9">
                <Icon className="size-[18px]" strokeWidth={1.5} />
              </IconCircle>
              <h3 className="mt-5 text-[13px] font-medium text-ink">{title}</h3>
              <p className="mt-2 max-w-[150px] text-[10px] leading-[1.6] text-ink-2">{text}</p>
            </HoverCard>
          ))}
        </StaggerList>
      </div>
    </section>
  )
}
