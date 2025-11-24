import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Hero from './components/Hero'
import PhoneMockup from './components/PhoneMockup'
import FeaturesGrid from './components/FeaturesGrid'
import ImageFan from './components/ImageFan'

function App() {
  const containerRef = useRef(null)
  
  const phoneSectionRef = useRef(null)
  const { scrollYProgress: phoneScroll } = useScroll({
    target: phoneSectionRef,
    // "start start": Start animation when section top hits viewport top
    // "end end": End animation when section bottom hits viewport bottom
    offset: ["start start", "end end"]
  })

  // --- TIMING TUNING ---
  // 1. Phone Entrance (0% - 15%):
  const phoneOpacity = useTransform(phoneScroll, [0, 0.15], [0, 1])
  const phoneY = useTransform(phoneScroll, [0, 0.15], [100, 0]) 
  const phoneScale = useTransform(phoneScroll, [0, 0.15], [0.9, 1])

  // 2. Move Left (15% - 35%): 
  // Starts moving left immediately after fading in
  const phoneX = useTransform(phoneScroll, [0.15, 0.35], ["0%", "-25vw"]) 

  // 3. Text Entrance (20% - 40%): 
  const textOpacity = useTransform(phoneScroll, [0.2, 0.4], [0, 1])
  const textX = useTransform(phoneScroll, [0.2, 0.4], [50, 0])

  return (
    // FIXED: Removed 'overflow-x-hidden' from here. It is now in index.css
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#FFFBF7]"
    >
      <main className="pb-32">
        
        {/* SECTION 1: HERO */}
        <section className="h-[80vh] flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 hero-glow pointer-events-none" />
          <Hero />
        </section>

        {/* SECTION 2: PHONE SCROLLYTELLING */}
        {/* Keep this tall (350vh-400vh) so the "stick" lasts a long time */}
        <section 
          ref={phoneSectionRef}
          className="relative h-[400vh]"
        >
          {/* THE STICKY CONTAINER */}
          {/* 'sticky top-0' only works if NO parent has overflow: hidden/auto */}
          <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
            
            <div className="relative w-full max-w-7xl mx-auto h-full flex items-center justify-center">
              
              {/* PHONE WRAPPER */}
              <motion.div
                style={{
                  opacity: phoneOpacity,
                  y: phoneY,
                  x: phoneX, 
                  scale: phoneScale
                }}
                className="relative z-20 flex-shrink-0"
              >
                <div className="scale-100 sm:scale-110 md:scale-125">
                   <PhoneMockup imageSrc="/iphone_screenshot.png" />
                </div>
              </motion.div>

              {/* RIGHT TEXT BLOCK */}
              <motion.div
                style={{
                  opacity: textOpacity,
                  x: textX,
                }}
                className="absolute w-full md:w-1/2 right-0 top-1/2 -translate-y-1/2 px-8 md:pl-16 z-10 pointer-events-none"
              >
                <div className="max-w-lg ml-auto md:ml-0 text-center md:text-left bg-white/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-6 rounded-2xl md:p-0">
                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                    Reveal daily prompts. <br />
                    <span className="text-[#F18E48]">Spark fun.</span>
                  </h2>
                  <p className="text-lg sm:text-2xl text-slate-600 leading-relaxed">
                    Post your prompt to share and compare with friends. Compete to post the best photos with leaderboards coming soon.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* SECTION 3: IMAGE FAN */}
        <section className="py-20 sm:py-32 flex flex-col items-center relative z-30">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-slate-900">
                Captured on <span className="text-[#F18E48]">Spontaneous</span>
              </h2>
            </div>
            <ImageFan 
              images={[
                '/sc1.jpg', '/sc6.jpg', '/sc2.jpg', '/sc4.jpg', '/sc5.jpg'
              ]}
            />
          </motion.div>
        </section>

        {/* SECTION 4: FEATURES */}
        <section className="py-20 container mx-auto px-4">
           <FeaturesGrid />
        </section>

      </main>
    </div>
  )
}

export default App