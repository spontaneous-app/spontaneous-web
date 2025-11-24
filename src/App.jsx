import { motion } from 'framer-motion'
import Hero from './components/Hero'
import PhoneScrollytelling from './components/PhoneScrollytelling'
import ImageFan from './components/ImageFan'
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
        </section>

        {/* PHONE SCROLLYTELLING */}
        <PhoneScrollytelling textColor={textColor} />

        {/* IMAGE FAN */}
        <section className="py-20 sm:py-32 flex flex-col items-center relative z-30">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            <div className="text-center mb-12">
              <motion.h2 
                 style={{ color: textColor }}
                 className="text-3xl sm:text-5xl font-bold mb-6"
              >
                Captured on <span className="text-[#F18E48]">Spontaneous</span>
              </motion.h2>
            </div>
            <ImageFan 
              images={[ '/sc1.jpg', '/sc6.jpg', '/sc2.jpg', '/sc4.jpg', '/sc5.jpg' ]}
            />
          </motion.div>
        </section>

      </main>
    </motion.div>
  )
}

export default App