import { motion } from 'framer-motion'
import Hero from './components/Hero'
import PhoneScrollytelling from './components/PhoneScrollytelling'
import ImageFan from './components/ImageFan'
import ScrollIndicator from './components/ScrollIndicator'
import { useScrollAnimations } from './hooks/useScrollAnimations'
import Footer from './components/Footer'

function App() {
  const { containerRef, backgroundColor, textColor } = useScrollAnimations()

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
            className="absolute left-1/2 -translate-x-1/2"
            style={{ bottom: 'clamp(1rem, 2vh, 2rem)' }}
            color={textColor}
          />
        </section>

        {/* PHONE SCROLLYTELLING */}
        <PhoneScrollytelling textColor={textColor} />

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