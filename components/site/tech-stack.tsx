import {
  SiFlask,
  SiPython,
  SiPytorch,
  SiReact,
  SiScikitlearn,
  SiTensorflow,
} from '@icons-pack/react-simple-icons'
import { ChartColumn, Database } from 'lucide-react'

const STACK = [
  { label: 'Python', Icon: SiPython },
  { label: 'PyTorch', Icon: SiPytorch },
  { label: 'TensorFlow', Icon: SiTensorflow },
  { label: 'Scikit-learn', Icon: SiScikitlearn },
  { label: 'Flask', Icon: SiFlask },
  { label: 'SQL', Icon: Database },
  { label: 'Power BI', Icon: ChartColumn },
  { label: 'React', Icon: SiReact },
]

function StackRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-14 pr-14">
      {STACK.map(({ label, Icon }) => (
        <li
          key={label}
          className="flex items-center gap-2 text-[12px] font-medium tracking-[0.04em] whitespace-nowrap text-ink-2 transition-colors duration-200 hover:text-gold-deep"
        >
          <Icon size={14} className="size-3.5" aria-hidden="true" />
          {label}
        </li>
      ))}
    </ul>
  )
}

export function TechStack() {
  return (
    <section aria-label="Technologies we work with" className="border-y border-[rgba(0,0,0,0.04)] py-5">
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track flex w-max">
          <StackRow />
          <StackRow hidden />
        </div>
      </div>
    </section>
  )
}
