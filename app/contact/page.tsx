import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { WhatsAppButton } from '@/components/site/whatsapp-button'
import { BackToTop } from '@/components/site/back-to-top'
import { ContactDetails } from '@/components/site/contact-details'
import { ContactForm } from '@/components/site/contact-form'

export const metadata: Metadata = {
  title: 'Contact | Epocx Innovation',
  description:
    "Tell Epocx Innovation about your AI, ML, automation or software project and we'll get back to you within 24 hours.",
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[radial-gradient(120%_70%_at_80%_0%,#ffffff_0%,#f3f3f2_55%,#ececea_100%)]">
        <section className="container-x grid items-start gap-10 pt-28 pb-16 md:grid-cols-[1fr_1.15fr] md:gap-12 md:pt-32 md:pb-20">
          <ContactDetails />
          <ContactForm />
        </section>
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  )
}
