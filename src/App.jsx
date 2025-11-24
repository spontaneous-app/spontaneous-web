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

  // Background Transition: Cream -> Dark Slate (at 15%) -> Cream (at 80%)
  // This creates a "Dark Mode" section for the phone reveal
  const backgroundColor = useTransform(
    globalScroll,
    [0, 0.15, 0.7, 0.85], 
    ["#FFFBF7", "#0f172a", "#0f172a", "#FFFBF7"]
  )
  
  // Text Color Transition: Black -> White -> Black
  const textColor = useTransform(
    globalScroll,
    [0, 0.15, 0.7, 0.85], 
    ["#0f172a", "#f8fafc", "#f8fafc", "#0f172a"]
  )

  // --- PHONE SECTION LOGIC ---
  const phoneSectionRef = useRef(null)
  const { scrollYProgress: phoneScroll } = useScroll({
    target: phoneSectionRef,
    offset: ["start start", "end end"]
  })

  // 1. Entrance: Faster fade in (0-10%)
  const phoneOpacity = useTransform(phoneScroll, [0, 0.1], [0, 1])
  const phoneScale = useTransform(phoneScroll, [0, 0.1], [0.9, 1])
  
  // 2. Move Left: Starts immediately
  const phoneX = useTransform(phoneScroll, [0.1, 0.35], ["0%", "-25vw"]) 

  // 3. Text Entrance (Apple Style Reveal)
  // We split these to stagger them slightly
  const textOpacity = useTransform(phoneScroll, [0.15, 0.35], [0, 1])
  const textY = useTransform(phoneScroll, [0.15, 0.35], [20, 0])

  return (
    // Apply the dynamic background color here
    <motion.div 
      ref={containerRef}
      style={{ backgroundColor }}
      className="min-h-screen"
    >
      <main className="pb-32">
        
        {/* HERO (Cream Background) */}
        <section className="h-[80vh] flex flex-col items-center justify-center relative">
          <Hero />
        </section>

        {/* PHONE SCROLLYTELLING (Transitions to Dark) */}
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

              {/* RIGHT TEXT BLOCK (Dynamic Color) */}
              <motion.div
                style={{ opacity: textOpacity, y: textY, color: textColor }}
                className="absolute w-full md:w-1/2 right-0 top-1/2 -translate-y-1/2 px-8 md:pl-16 z-10 pointer-events-none"
              >
                <div className="max-w-lg ml-auto md:ml-0 text-center md:text-left md:p-0">
                  
                  {/* Staggered Reveal Text */}
                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                    Reveal daily prompts. <br />
                    <span className="text-[#F18E48]">Spark fun.</span>
                  </h2>
                  <p className="text-lg sm:text-2xl opacity-80 leading-relaxed">
                    Post your prompt to share and compare with friends. Compete to post the best photos with leaderboards coming soon.
                  </p>
                  
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* IMAGE FAN (Still Dark Background) */}
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

        {/* FEATURES (Transitions back to Cream) */}
        <section className="py-20 container mx-auto px-4">
           <FeaturesGrid />
        </section>

      </main>
    </motion.div>
  )
}

export default App