import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import PhoneMockup from './PhoneMockup'
import LetterReveal from './LetterReveal'

const PhoneScrollytelling = ({ textColor }) => {
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

  // 3. TEXT REVEAL LOGIC (Apple Style - Staggered with letter-by-letter animation)
  
  // Line 1: Headline (Appears 30% - 40%)
  const t1Y = useTransform(phoneScroll, [0.3, 0.4], [20, 0])

  // Line 2: The Punchline (Appears 40% - 50%)
  const t2Y = useTransform(phoneScroll, [0.4, 0.5], [20, 0])
  const glowOpacity = useTransform(phoneScroll, [0.4, 0.45], [0, 1])

  // Line 3: Description (Appears 50% - 60%)
  const t3Y = useTransform(phoneScroll, [0.5, 0.6], [20, 0])

  return (
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
               <PhoneMockup 
                 imageSrc="/long_screenshot.png" 
                 scrollProgress={phoneScroll}
                 scrollStart={0.3}
                 scrollEnd={0.85}
               />
            </div>
          </motion.div>

          {/* RIGHT TEXT BLOCK */}
          {/* ALIGNMENT FIX: Changed top-1/2 to top-[25vh] to align with top of phone */}
          <div
            className="absolute w-full md:w-1/2 right-0 top-[18vh] px-8 md:pl-16 z-10 pointer-events-none"
          >
            <div className="max-w-lg ml-auto md:ml-0 text-center md:text-left md:p-0 flex flex-col gap-6">
              
              {/* Line 1: The Header */}
              <motion.div
                style={{ y: t1Y }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
              >
                <LetterReveal
                  text="Daily Prompts."
                  scrollProgress={phoneScroll}
                  startProgress={0.3}
                  endProgress={0.4}
                  style={{ color: textColor }}
                />
              </motion.div>

              {/* Line 2: The Accent/Punchline */}
              <motion.div
                style={{ y: t2Y }}
                className="relative text-2xl sm:text-4xl font-semibold inline-block"
              >
                {/* Backlight/Glow Effect - Blurred blob behind text */}
                <motion.div 
                  className="absolute -inset-12 -z-10 pointer-events-none"
                  style={{
                    opacity: glowOpacity,
                    background: 'linear-gradient(90deg, rgba(241, 142, 72, 0.5) 0%, rgba(255, 77, 77, 0.5) 50%, rgba(192, 38, 211, 0.5) 100%)',
                    filter: 'blur(80px)',
                    width: '120%',
                    height: '200%',
                    top: '-50%',
                    left: '-10%',
                  }}
                />
                
                {/* Gradient Text */}
                <div
                  className="relative z-0"
                  style={{
                    background: 'linear-gradient(90deg, #F18E48 0%, #ff4d4d 50%, #c026d3 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  <LetterReveal
                    text="Unfiltered Connections."
                    scrollProgress={phoneScroll}
                    startProgress={0.4}
                    endProgress={0.5}
                  />
                </div>
              </motion.div>
              
              {/* Line 3: The Description */}
              <motion.div
                style={{ y: t3Y }}
                className="text-lg sm:text-xl opacity-80 leading-relaxed"
              >
                <LetterReveal
                  text="Reveal one of three daily photo prompts. No algorithms, no influencers—just you and your friends capturing life as it happens."
                  scrollProgress={phoneScroll}
                  startProgress={0.5}
                  endProgress={0.6}
                  style={{ color: textColor }}
                />
              </motion.div>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default PhoneScrollytelling

