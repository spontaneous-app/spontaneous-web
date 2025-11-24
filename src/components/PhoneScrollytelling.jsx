import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import PhoneMockup from './PhoneMockup'
import LetterReveal from './LetterReveal'
import BubbleReveal from './BubbleReveal'

const FEATURE_CARD_HEIGHT = 'min-h-[330px]'

// ... featureCards array ...
const featureCards = [
  {
    title: 'Daily Prompts',
    description: 'Pick one of three whimsical prompts to spark everyday creativity.',
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    title: 'Share & Compare',
    description: 'See how friends interpreted the same prompt in real time.',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    title: 'Streaks & Awards',
    description: 'Build streaks and climb the upcoming community leaderboard.',
    gradient: 'from-orange-400 to-orange-600',
  },
]

const PhoneScrollytelling = ({ textColor }) => {
  const phoneSectionRef = useRef(null)
  const { scrollYProgress: phoneScroll } = useScroll({
    target: phoneSectionRef,
    offset: ["start start", "end end"]
  })

  // --- EXISTING ANIMATIONS ---
  const phoneOpacity = useTransform(phoneScroll, [0, 0.1], [0, 1])
  const phoneScale = useTransform(phoneScroll, [0, 0.1], [0.9, 1])
  const phoneX = useTransform(phoneScroll, [0.1, 0.3], ["0%", "-25vw"])

  // Text Animations
  const t1Y = useTransform(phoneScroll, [0.3, 0.4], [20, 0])
  const t2Y = useTransform(phoneScroll, [0.4, 0.5], [20, 0])
  const glowOpacity = useTransform(phoneScroll, [0.4, 0.45], [0, 1])
  const t3Y = useTransform(phoneScroll, [0.5, 0.6], [20, 0])

  // Feature Cards logic
  const featureThresholds = [0.6, 0.66, 0.72]
  const featureYTransforms = [
    useTransform(phoneScroll, [0.6, 0.66], [20, 0]),
    useTransform(phoneScroll, [0.66, 0.72], [20, 0]),
    useTransform(phoneScroll, [0.72, 0.78], [20, 0]),
  ]
  const [featureActive, setFeatureActive] = useState([false, false, false])

  useMotionValueEvent(phoneScroll, 'change', (latest) => {
    setFeatureActive((prev) => {
      const next = featureThresholds.map((threshold) => latest >= threshold)
      const hasChanged = next.some((value, index) => value !== prev[index])
      return hasChanged ? next : prev
    })
  })

  // --- THE EXIT ANIMATION ---
  // From 85% to 100% of the scroll, fade everything out and push it up
  // This clears the screen for the ImageFan to enter
  const exitOpacity = useTransform(phoneScroll, [0.90, 0.99], [1, 0])
  const exitScale = useTransform(phoneScroll, [0.90, 0.99], [1, 0.95])
  const exitY = useTransform(phoneScroll, [0.90, 0.99], [0, -100])

  return (
    <section
      ref={phoneSectionRef}
      // Keep height tall (350vh) to allow enough time for reading
      className="relative h-[400vh]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* WRAP EVERYTHING IN THIS EXIT CONTAINER */}
        <motion.div
          style={{ opacity: exitOpacity, scale: exitScale, y: exitY }}
          className="relative w-full max-w-7xl mx-auto h-full flex items-center justify-center"
        >

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
          <div className="absolute w-full md:w-1/2 right-0 top-[18vh] px-8 md:pl-16 z-10 pointer-events-none">
            <div className="max-w-lg ml-auto md:ml-0 text-center md:text-left md:p-0 flex flex-col gap-6">

              {/* HEADERS */}
              <motion.div style={{ y: t1Y }} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <LetterReveal
                  text="Daily Prompts."
                  scrollProgress={phoneScroll}
                  startProgress={0.3}
                  endProgress={0.4}
                  style={{ color: textColor }}
                />
              </motion.div>

              <motion.div style={{ y: t2Y }} className="relative text-2xl sm:text-4xl font-semibold inline-block">
                <motion.div
                  className="absolute -inset-12 -z-10 pointer-events-none"
                  style={{
                    opacity: glowOpacity,
                    background: 'linear-gradient(90deg, rgba(241, 142, 72, 0.5) 0%, rgba(255, 77, 77, 0.5) 50%, rgba(192, 38, 211, 0.5) 100%)',
                    filter: 'blur(80px)',
                  }}
                />
                <div className="relative z-0 bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
                  <LetterReveal
                    text="Unfiltered Connections."
                    scrollProgress={phoneScroll}
                    startProgress={0.4}
                    endProgress={0.5}
                  />
                </div>
              </motion.div>

              {/* DESCRIPTION */}
              <motion.div style={{ y: t3Y }} className="text-lg sm:text-xl opacity-80 leading-relaxed">
                <LetterReveal
                  text="Reveal one of three daily photo prompts. No algorithms, no influencers—just you and your friends capturing life as it happens."
                  scrollProgress={phoneScroll}
                  startProgress={0.5}
                  endProgress={0.6}
                  style={{ color: textColor }}
                />
              </motion.div>

              {/* FEATURES */}
              <div className="mt-10 flex flex-col md:flex-row gap-4 md:gap-6 w-full">
                {featureCards.map((feature, index) => {
                  const yTransform = featureYTransforms[index] || featureYTransforms[0]
                  return (
                    <BubbleReveal
                      key={feature.title}
                      delay={index * 0.15}
                      isActive={featureActive[index]}
                      style={{ y: yTransform }}
                      className={`flex-1 ${FEATURE_CARD_HEIGHT} flex`}
                    >
                      <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-left shadow-lg flex flex-col h-full">
                        <motion.h4 className={`text-xl font-semibold mb-2 bg-gradient-to-r ${feature.gradient} text-transparent bg-clip-text`}>
                          {feature.title}
                        </motion.h4>
                        <motion.p className="text-sm leading-relaxed" style={{ color: textColor, opacity: 0.8 }}>
                          {feature.description}
                        </motion.p>
                      </div>
                    </BubbleReveal>
                  )
                })}
              </div>

            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}

export default PhoneScrollytelling