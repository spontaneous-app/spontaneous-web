import { useRef, useState, forwardRef } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import PhoneMockup from './PhoneMockup'
import LetterReveal from './LetterReveal'
import BubbleReveal from './BubbleReveal'
import { featureCards } from '../constants/featureCards'
import { PHONE_SCROLL } from '../constants/animations'
import { GRADIENTS } from '../constants/colors'
import { useMobile } from '../hooks/useMobile'

const FEATURE_CARD_HEIGHT = 'min-h-[330px]'

// Define constants outside component to keep it clean
const MOBILE_PHONE_ENTER_START = 0
const MOBILE_PHONE_ENTER_END = 0.15
const MOBILE_IMAGE_SCROLL_START = 0.15
const MOBILE_IMAGE_SCROLL_END = 0.85
const MOBILE_PHONE_EXIT_START = 0.85
const MOBILE_PHONE_EXIT_END = 1.0

const PhoneScrollytelling = forwardRef(({ textColor }, ref) => {
  const internalRef = useRef(null)
  const isMobile = useMobile()

  const setRef = (node) => {
    internalRef.current = node
    if (typeof ref === 'function') {
      ref(node)
    } else if (ref) {
      ref.current = node
    }
  }

  const { scrollYProgress: phoneScroll } = useScroll({
    target: internalRef,
    offset: ["start start", "end end"]
  })

  // --- DESKTOP ANIMATIONS (Always defined) ---
  const phoneOpacity = useTransform(phoneScroll, PHONE_SCROLL.FADE_IN, [0, 1])
  const phoneScale = useTransform(phoneScroll, PHONE_SCROLL.FADE_IN, [0.9, 1])
  const phoneX = useTransform(
    phoneScroll,
    PHONE_SCROLL.MOVE_LEFT,
    // We can use the isMobile variable inside the ARRAY, just not to conditionally run the hook
    isMobile ? ["0%", "0%"] : ["0%", "-25vw"]
  )

  const t1Y = useTransform(phoneScroll, PHONE_SCROLL.TEXT_1, [20, 0])
  const t2Y = useTransform(phoneScroll, PHONE_SCROLL.TEXT_2, [20, 0])
  const glowOpacity = useTransform(phoneScroll, PHONE_SCROLL.GLOW, [0, 1])
  const t3Y = useTransform(phoneScroll, PHONE_SCROLL.TEXT_3, [20, 0])

  // --- MOBILE ANIMATIONS (Must be defined at top level too!) ---
  // Even if not used in desktop view, these hooks must run to preserve order

  const mobilePhoneScale = useTransform(phoneScroll, (latest) => {
    if (latest < MOBILE_PHONE_ENTER_END) {
      const enterProgress = latest / MOBILE_PHONE_ENTER_END
      return 0.8 + (0.2 * enterProgress)
    } else if (latest < MOBILE_PHONE_EXIT_START) {
      return 1
    } else {
      const exitProgress = (latest - MOBILE_PHONE_EXIT_START) / (MOBILE_PHONE_EXIT_END - MOBILE_PHONE_EXIT_START)
      return 1 - (0.1 * exitProgress)
    }
  })

  const finalPhoneOpacity = useTransform(phoneScroll, (latest) => {
    if (latest < MOBILE_PHONE_ENTER_END) {
      return latest / MOBILE_PHONE_ENTER_END
    } else if (latest < MOBILE_PHONE_EXIT_START) {
      return 1
    } else {
      const exitProgress = (latest - MOBILE_PHONE_EXIT_START) / (MOBILE_PHONE_EXIT_END - MOBILE_PHONE_EXIT_START)
      return 1 - exitProgress
    }
  })

  const finalPhoneY = useTransform(phoneScroll, (latest) => {
    if (latest < MOBILE_PHONE_ENTER_END) {
      const enterProgress = latest / MOBILE_PHONE_ENTER_END
      return 100 * (1 - enterProgress)
    } else if (latest < MOBILE_PHONE_EXIT_START) {
      return 0
    } else {
      const exitProgress = (latest - MOBILE_PHONE_EXIT_START) / (MOBILE_PHONE_EXIT_END - MOBILE_PHONE_EXIT_START)
      return -50 * exitProgress
    }
  })

  const phoneTransform = useTransform(
    finalPhoneY,
    (y) => `translate(-50%, calc(-50% + ${y}px))`
  )

  // Exit animation
  const exitOpacity = useTransform(phoneScroll, PHONE_SCROLL.EXIT, [1, 0])
  const exitScale = useTransform(phoneScroll, PHONE_SCROLL.EXIT, [1, 0.95])
  const exitY = useTransform(phoneScroll, PHONE_SCROLL.EXIT, [0, -100])

  // Feature cards logic
  const featureThresholds = [0.6, 0.65, 0.70]
  const featureYTransforms = [
    useTransform(phoneScroll, [0.6, 0.65], [20, 0]),
    useTransform(phoneScroll, [0.65, 0.70], [20, 0]),
    useTransform(phoneScroll, [0.70, 0.75], [20, 0]),
  ]
  const [featureActive, setFeatureActive] = useState([false, false, false])

  useMotionValueEvent(phoneScroll, 'change', (latest) => {
    setFeatureActive((prev) => {
      const next = featureThresholds.map((threshold) => latest >= threshold)
      const hasChanged = next.some((value, index) => value !== prev[index])
      return hasChanged ? next : prev
    })
  })

  // --- RENDER LOGIC ---

  if (isMobile) {
    return (
      <>
        {/* PHONE SCROLLYTELLING SECTION */}
        <section
          ref={setRef}
          className="relative h-[300vh] w-full"
          style={{ backgroundColor: 'inherit' }}
        >
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
            <div className="max-w-2xl mx-auto flex flex-col items-center gap-12 px-4 w-full relative h-full">
              <motion.div
                style={{
                  opacity: finalPhoneOpacity,
                  scale: mobilePhoneScale,
                  transform: phoneTransform
                }}
                className="absolute top-1/2 left-1/2 z-20 flex-shrink-0"
                initial={false}
              >
                <div className="scale-100 shadow-2xl shadow-orange-500/20 rounded-[3rem]">
                  <PhoneMockup
                    imageSrc="/long_screenshot.png"
                    scrollProgress={phoneScroll}
                    scrollStart={MOBILE_IMAGE_SCROLL_START}
                    scrollEnd={MOBILE_IMAGE_SCROLL_END}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FEATURE CARDS SECTION */}
        <section className="relative w-full py-16 px-4" style={{ backgroundColor: 'inherit' }}>
          <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-bold leading-tight text-center"
              style={{ color: textColor || 'white' }}
            >
              Daily Prompts.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative text-2xl sm:text-3xl font-semibold inline-block"
            >
              <motion.div
                className="absolute -inset-12 -z-10 pointer-events-none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{
                  background: GRADIENTS.glow,
                  filter: 'blur(80px)',
                }}
              />
              <div className="relative z-0 bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
                Unfiltered Connections.
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.8, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl leading-relaxed text-center max-w-2xl"
              style={{ color: textColor || 'white' }}
            >
              Reveal one of three daily photo prompts. No algorithms, no influencers—just you and your friends capturing life as it happens.
            </motion.p>

            <div className="mt-8 flex flex-col gap-4 w-full">
              {featureCards.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-left shadow-lg"
                >
                  <h4 className={`text-xl font-semibold mb-2 bg-gradient-to-r ${feature.gradient} text-transparent bg-clip-text`}>
                    {feature.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed text-white"
                    style={{ color: textColor || 'white', opacity: 0.8 }}
                  >
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </>
    )
  }

  // Desktop Return
  return (
    <section
      ref={setRef}
      className="relative h-[400vh]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        <motion.div
          style={{ opacity: exitOpacity, scale: exitScale, y: exitY }}
          className="relative w-full max-w-7xl mx-auto h-full flex items-center justify-center"
        >

          <motion.div
            style={{ opacity: phoneOpacity, x: phoneX, scale: phoneScale }}
            className="relative z-20 flex-shrink-0"
          >
            <div className="scale-100 sm:scale-110 md:scale-125 shadow-2xl shadow-orange-500/20 rounded-[3rem]">
              <PhoneMockup
                imageSrc="/long_screenshot.png"
                scrollProgress={phoneScroll}
                scrollStart={PHONE_SCROLL.IMAGE_SCROLL.START}
                scrollEnd={PHONE_SCROLL.IMAGE_SCROLL.END}
              />
            </div>
          </motion.div>

          <div className="absolute w-full md:w-1/2 right-0 top-[18vh] px-8 md:pl-16 z-10 pointer-events-none">
            <div className="max-w-lg ml-auto md:ml-0 text-center md:text-left md:p-0 flex flex-col gap-6">

              <motion.div style={{ y: t1Y }} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <LetterReveal
                  text="Daily Prompts."
                  scrollProgress={phoneScroll}
                  startProgress={PHONE_SCROLL.TEXT_1[0]}
                  endProgress={PHONE_SCROLL.TEXT_1[1]}
                  style={{ color: textColor }}
                />
              </motion.div>

              <motion.div style={{ y: t2Y }} className="relative text-2xl sm:text-4xl font-semibold inline-block">
                <motion.div
                  className="absolute -inset-12 -z-10 pointer-events-none"
                  style={{
                    opacity: glowOpacity,
                    background: GRADIENTS.glow,
                    filter: 'blur(80px)',
                  }}
                />
                <div className="relative z-0 bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
                  <LetterReveal
                    text="Unfiltered Connections."
                    scrollProgress={phoneScroll}
                    startProgress={PHONE_SCROLL.TEXT_2[0]}
                    endProgress={PHONE_SCROLL.TEXT_2[1]}
                  />
                </div>
              </motion.div>

              <motion.div style={{ y: t3Y }} className="text-lg sm:text-xl opacity-80 leading-relaxed">
                <LetterReveal
                  text="Reveal one of three daily photo prompts. No algorithms, no influencers—just you and your friends capturing life as it happens."
                  scrollProgress={phoneScroll}
                  startProgress={PHONE_SCROLL.TEXT_3[0]}
                  endProgress={PHONE_SCROLL.TEXT_3[1]}
                  style={{ color: textColor }}
                />
              </motion.div>

              {/* CONTAINER: Always flex-col (Vertical Stack) */}
              <div className="mt-8 flex flex-col gap-4 w-full">
                {featureCards.map((feature, index) => {
                  const yTransform = featureYTransforms[index] || featureYTransforms[0]
                  return (
                    <BubbleReveal
                      key={feature.title}
                      delay={index * 0.15}
                      isActive={featureActive[index]}
                      style={{ y: yTransform }}
                      className="w-full"
                      gradient={feature.gradient}
                    >
                      {/* CARD CONTAINER (Premium Effects) */}
                      <div className="group relative w-full rounded-2xl border border-white/10 bg-gray-900/20 backdrop-blur-xl p-5 md:p-6 text-left shadow-lg overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-2xl">

                        {/* 1. AMBIENT LIGHTING (The Premium Glow) */}
                        <div
                          className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${feature.gradient} blur-[40px] opacity-20 group-hover:opacity-40 group-hover:scale-125 transition-all duration-700`}
                        />
                        <div
                          className={`absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-gradient-to-tr ${feature.gradient} blur-[40px] opacity-10 group-hover:opacity-30 group-hover:scale-125 transition-all duration-700`}
                        />

                        {/* 2. SUBTLE BORDER GRADIENT OVERLAY */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                        />

                        {/* CONTENT */}
                        <div className="relative z-10 flex flex-col h-full justify-between">
                          <div>
                            <motion.h4
                              className={`text-lg md:text-xl font-semibold mb-2 bg-gradient-to-r ${feature.gradient} text-transparent bg-clip-text drop-shadow-sm`}
                            >
                              {feature.title}
                            </motion.h4>
                            <motion.p
                              className="text-sm leading-relaxed"
                              style={{ color: textColor, opacity: 0.9 }}
                            >
                              {feature.description}
                            </motion.p>
                          </div>
                        </div>

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
})

PhoneScrollytelling.displayName = 'PhoneScrollytelling'
export default PhoneScrollytelling