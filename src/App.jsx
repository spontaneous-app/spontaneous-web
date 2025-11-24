import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Hero from './components/Hero'
import PhoneMockup from './components/PhoneMockup'
import FeaturesGrid from './components/FeaturesGrid'
import ImageFan from './components/ImageFan'

function App() {
  const containerRef = useRef(null)
  
  // 1. Global Scroll for Background Color
  const { scrollYProgress: globalScroll } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Background Transition
  const backgroundColor = useTransform(
    globalScroll,
    [0, 0.10, 0.7, 0.80], 
    ["#FFEFE0", "#182140", "#0f172a", "#FFEFE0"]
  )
  
  // Text Color Transition
  const textColor = useTransform(
    globalScroll,
    [0, 0.15, 0.7, 0.75], 
    ["#0f172a", "#f8fafc", "#f8fafc", "#0f172a"]
  )

  // --- PHONE SECTION SCROLL LOGIC ---
  const phoneSectionRef = useRef(null)
  const { scrollYProgress: phoneScroll } = useScroll({
    target: phoneSectionRef,
    offset: ["start start", "end end"]
  })

  // 1. Phone Entrance (0% - 10%)
  const phoneOpacity = useTransform(phoneScroll, [0, 0.1], [0, 1])
  const phoneScale = useTransform(phoneScroll, [0, 0.1], [0.9, 1])
  
  // 2. Phone Move Left (10% - 30%)
  // Moves left quickly to make room for text
  const phoneX = useTransform(phoneScroll, [0.1, 0.3], ["0%", "-25vw"]) 

  // 3. TEXT REVEAL LOGIC (Apple Style - Staggered)
  
  // Line 1: Headline (Appears 30% - 40%)
  const t1Opacity = useTransform(phoneScroll, [0.3, 0.4], [0, 1])
  const t1Y = useTransform(phoneScroll, [0.3, 0.4], [20, 0])

  // Line 2: The Punchline (Appears 40% - 50%)
  const t2Opacity = useTransform(phoneScroll, [0.4, 0.5], [0, 1])
  const t2Y = useTransform(phoneScroll, [0.4, 0.5], [20, 0])

  // Line 3: Description (Appears 50% - 60%)
  const t3Opacity = useTransform(phoneScroll, [0.5, 0.6], [0, 1])
  const t3Y = useTransform(phoneScroll, [0.5, 0.6], [20, 0])

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
        <section 
          ref={phoneSectionRef}
          className="relative h-[400vh]"
        >
          <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
            <div className="relative w-full max-w-7xl mx-auto h-full flex items-center justify-center">
              
              {/* PHONE */}
              <motion.div
                style={{ opacity: phoneOpacity, x: phoneX, scale: phoneScale }}
                className="relative z-20 flex-shrink-0"
              >
                <div className="scale-100 sm:scale-110 md:scale-125 shadow-2xl shadow-orange-500/20 rounded-[3rem]">
                   <PhoneMockup imageSrc="/iphone_screenshot.png" />
                </div>
              </motion.div>

              {/* RIGHT TEXT BLOCK */}
              {/* ALIGNMENT FIX: Changed top-1/2 to top-[25vh] to align with top of phone */}
              <div
                className="absolute w-full md:w-1/2 right-0 top-[25vh] px-8 md:pl-16 z-10 pointer-events-none"
              >
                <div className="max-w-lg ml-auto md:ml-0 text-center md:text-left md:p-0 flex flex-col gap-6">
                  
                  {/* Line 1: The Header */}
                  <motion.h2 
                    style={{ opacity: t1Opacity, y: t1Y, color: textColor }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                  >
                    Daily Prompts.
                  </motion.h2>

                  {/* Line 2: The Accent/Punchline */}
                  <motion.h3 
                    style={{ opacity: t2Opacity, y: t2Y }}
                    className="text-2xl sm:text-4xl font-semibold text-[#F18E48]"
                  >
                    Unfiltered Connections.
                  </motion.h3>
                  
                  {/* Line 3: The Description */}
                  <motion.p 
                    style={{ opacity: t3Opacity, y: t3Y, color: textColor }}
                    className="text-lg sm:text-xl opacity-80 leading-relaxed"
                  >
                    Reveal one of three daily photo prompts. No algorithms, no influencers—just you and your friends capturing life as it happens.
                  </motion.p>
                  
                </div>
              </div>

            </div>
          </div>
        </section>

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

        {/* FEATURES */}
        <section className="py-20 container mx-auto px-4">
           <FeaturesGrid />
        </section>

      </main>
    </motion.div>
  )
}

export default App