import { motion } from 'framer-motion'
import Hero from './components/Hero'
import PhoneScrollytelling from './components/PhoneScrollytelling'
import ImageFan from './components/ImageFan'
import ScrollIndicator from './components/ScrollIndicator'
import { useScrollAnimations } from './hooks/useScrollAnimations'

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
        <section className="h-[80vh] flex flex-col items-center justify-center relative">
          <Hero />
          <ScrollIndicator
            className="absolute left-1/2 -translate-x-1/2"
            style={{ bottom: 'clamp(0.5rem, 1vh, 1.25rem)' }}
            color={textColor}
          />
        </section>

        {/* PHONE SCROLLYTELLING */}
        <PhoneScrollytelling textColor={textColor} />

        {/* IMAGE FAN */}
        <ImageFan
          images={['/sc1.jpg', '/sc6.jpg', '/sc2.jpg', '/sc4.jpg', '/sc5.jpg']}
          title="Captured on Spontaneous"
        />

      </main>
    </motion.div>
  )
}

export default App