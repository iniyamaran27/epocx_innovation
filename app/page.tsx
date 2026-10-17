import { Navbar } from '@/components/site/navbar'
import { Hero } from '@/components/site/hero'
import { About } from '@/components/site/about'
import { Services } from '@/components/site/services'
import { WhyChooseUs } from '@/components/site/why-choose-us'
import { Process } from '@/components/site/process'
import { Testimonials } from '@/components/site/testimonials'
import { CtaBanner } from '@/components/site/cta-banner'
import { Footer } from '@/components/site/footer'
import { WhatsAppButton } from '@/components/site/whatsapp-button'
import { FadeInSection } from '@/components/site/motion'
import { TechStack } from '@/components/site/tech-stack'
import { Faq } from '@/components/site/faq'
import { BackToTop } from '@/components/site/back-to-top'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <FadeInSection>
          <Hero />
        </FadeInSection>
        <TechStack />
        <FadeInSection>
          <About />
        </FadeInSection>
        <FadeInSection>
          <Services />
        </FadeInSection>
        <FadeInSection>
          <WhyChooseUs />
        </FadeInSection>
        <FadeInSection>
          <Process />
        </FadeInSection>
        <FadeInSection>
          <Testimonials />
        </FadeInSection>
        <FadeInSection>
          <Faq />
        </FadeInSection>
        <FadeInSection>
          <CtaBanner />
        </FadeInSection>
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  )
}
