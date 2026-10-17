import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award, Settings, Target } from 'lucide-react'
import { Eyebrow, IconCircle } from './primitives'

const VALUES = [
  { icon: Award, title: 'Innovation', text: 'Driven by curiosity and purpose.' },
  { icon: Settings, title: 'Quality', text: 'We build with precision and care.' },
  { icon: Target, title: 'Impact', text: 'Solutions that create real value.' },
]

export function About() {
  return (
    <section id="about" className="bg-white py-8 md:py-8">
      <div className="container-x grid items-center gap-6 md:grid-cols-[1fr_1.3fr_0.75fr] md:gap-5">
        <div className="py-2">
          <Eyebrow line>About us</Eyebrow>
          <h2 className="mt-4 text-[22px] font-medium leading-[1.15] text-ink text-balance">
            Building Intelligent Solutions for a Smarter Tomorrow
          </h2>
          <p className="mt-4 max-w-[270px] text-[11px] leading-[1.6] text-ink-2">
            At Epocx Innovation, we bring together deep technical expertise and a product mindset to build AI, ML, and
            automation solutions that solve real problems and create lasting impact.
          </p>
          <span aria-hidden="true" className="mt-4 block h-px w-6 bg-ink-3" />
          <Link
            href="#about"
            className="mt-4 inline-flex items-center gap-2 text-[10px] font-medium text-ink hover:opacity-70"
          >
            <span className="link-underline">Our Story</span>
            <ArrowRight className="btn-arrow size-3" strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>

        <div className="relative aspect-[336/210] overflow-hidden rounded-[12px]">
          <Image
            src="/about.webp"
            alt="Laptop on a wooden desk with an Epocx Innovation coffee mug and a city skyline in the background"
            fill
            sizes="(min-width: 1024px) 336px, 100vw"
            className="object-cover"
          />
        </div>

        <ul className="flex flex-col gap-6 rounded-[12px] bg-panel p-5">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-start gap-3">
              <IconCircle className="size-8 bg-[#e8e8e6]">
                <Icon className="size-4" strokeWidth={1.5} />
              </IconCircle>
              <div>
                <h3 className="text-[10px] font-medium text-ink">{title}</h3>
                <p className="mt-1 max-w-[100px] text-[10px] leading-[1.5] text-ink-2">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
