import { ReactLenis } from 'lenis/react'
import { MotionConfig } from 'motion/react'
import Header from '@/components/Header'
import Projects from '@/components/Projects'
import Spotlight from '@/components/Spotlight'
import Team from '@/components/Team'
import ContactSection from '@/components/ui/contact-section'
import CTAWithVerticalMarquee from '@/components/ui/cta-with-text-marquee'
import ImpactSection from '@/components/ui/impact-section'

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={{ duration: 1.2, smoothWheel: !prefersReducedMotion }}>
        <Header />
        <main id="inicio" className="relative overflow-hidden bg-background">
          <CTAWithVerticalMarquee className="pt-28" />
          <ImpactSection />
          <Projects />
          <Team />
          <ContactSection />
          {/* Va después del CTA y en modo multiply: así tiñe por igual el fondo
              y las viñetas del marquee, sin dejar costuras. */}
          <Spotlight className="z-20 mix-blend-multiply" />
        </main>
      </ReactLenis>
    </MotionConfig>
  )
}

export default App
