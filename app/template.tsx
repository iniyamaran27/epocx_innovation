import { PageFadeIn } from '@/components/site/motion'

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageFadeIn>{children}</PageFadeIn>
}
