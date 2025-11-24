import { useRef } from 'react'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import PhoneScrollytelling from './components/PhoneScrollytelling'
import ImageFan from './components/ImageFan'
import ScrollIndicator from './components/ScrollIndicator'
import { useScrollAnimations } from './hooks/useScrollAnimations'
import Footer from './components/Footer'
import { useMobile } from './hooks/useMobile'

function App() {
  const { containerRef, backgroundColor, textColor } = useScrollAnimations()
  const phoneSectionRef = useRef(null)
  const isMobile = useMobile()

  const handleScrollToPhone = () => {
    if (!phoneSectionRef.current) return

    const heroHeight = window.innerHeight * 0.8 // 80vh
    const phoneSection = phoneSectionRef.current
    
    if (isMobile) {
      // On mobile, scroll to the phone section with a small offset
      const rect = phoneSection.getBoundingClientRect()
      const scrollY = window.scrollY + rect.top - 50 // 50px offset from top
      window.scrollTo({
        top: scrollY,
        behavior: 'smooth'
      })
    } else {
      // On desktop, scroll to 10% through the phone section (when phone is fully faded in)
      // Phone section is 400vh, so 10% = 40vh
      const phoneFadeInPosition = heroHeight + (window.innerHeight * 0.4) // 80vh + 40vh
      window.scrollTo({
        top: phoneFadeInPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor }}
      className="min-h-screen"
    >
      <main className="pb-32">

        {/* HERO */}
        <section className="h-[80vh] sm:h-[80vh] flex flex-col items-center justify-center relative overflow-hidden">
          <Hero />
          <ScrollIndicator
            className="absolute left-1/2 -translate-x-1/2 cursor-pointer"
            style={{ bottom: 'clamp(1rem, 2vh, 2rem)' }}
            color={textColor}
            onClick={handleScrollToPhone}
          />
        </section>

        {/* PHONE SCROLLYTELLING */}
        <PhoneScrollytelling ref={phoneSectionRef} textColor={textColor} />

        {/* IMAGE FAN */}
        <div className="relative z-30 -mt-[20vh]">
          <ImageFan
            images={['/sc1.jpg', '/sc6.jpg', '/sc2.jpg', '/sc4.jpg', '/sc5.jpg']}
            title="Captured on Spontaneous"
          />
        </div>

        <Footer />
      </main>
    </motion.div>
  )
}

export default App