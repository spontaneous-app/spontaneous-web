import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import PhoneMockup from './PhoneMockup'
import LetterReveal from './LetterReveal'
import BubbleReveal from './BubbleReveal'
import { featureCards } from '../constants/featureCards'
import { PHONE_SCROLL } from '../constants/animations'
import { GRADIENTS } from '../constants/colors'
import { useMobile } from '../hooks/useMobile'

const FEATURE_CARD_HEIGHT = 'min-h-[330px]'

const PhoneScrollytelling = ({ textColor }) => {
  const phoneSectionRef = useRef(null)
  const isMobile = useMobile()
  const { scrollYProgress: phoneScroll } = useScroll({
    target: phoneSectionRef,
    offset: ["start start", "end end"]
  })

  // Phone animations
  const phoneOpacity = useTransform(phoneScroll, PHONE_SCROLL.FADE_IN, [0, 1])
  const phoneScale = useTransform(phoneScroll, PHONE_SCROLL.FADE_IN, [0.9, 1])
  // On mobile, don't move phone left - keep it centered
  const phoneX = useTransform(
    phoneScroll, 
    PHONE_SCROLL.MOVE_LEFT, 
    isMobile ? ["0%", "0%"] : ["0%", "-25vw"]
  )

  // Text animations
  const t1Y = useTransform(phoneScroll, PHONE_SCROLL.TEXT_1, [20, 0])
  const t2Y = useTransform(phoneScroll, PHONE_SCROLL.TEXT_2, [20, 0])
  const glowOpacity = useTransform(phoneScroll, PHONE_SCROLL.GLOW, [0, 1])
  const t3Y = useTransform(phoneScroll, PHONE_SCROLL.TEXT_3, [20, 0])

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

  // Exit animation - clears screen for ImageFan to enter
  const exitOpacity = useTransform(phoneScroll, PHONE_SCROLL.EXIT, [1, 0])
  const exitScale = useTransform(phoneScroll, PHONE_SCROLL.EXIT, [1, 0.95])
  const exitY = useTransform(phoneScroll, PHONE_SCROLL.EXIT, [0, -100])

  // Mobile: Render as normal scrollable section
  if (isMobile) {
    return (
      <section
        ref={phoneSectionRef}
        className="relative w-full py-20 px-4"
      >
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-12">
          {/* PHONE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative z-20 flex-shrink-0"
          >
            <div className="scale-100 shadow-2xl shadow-orange-500/20 rounded-[3rem]">
              <PhoneMockup
                imageSrc="/long_screenshot.png"
                scrollProgress={phoneScroll}
                scrollStart={PHONE_SCROLL.IMAGE_SCROLL.START}
                scrollEnd={PHONE_SCROLL.IMAGE_SCROLL.END}
              />
            </div>
          </motion.div>

          {/* TEXT BLOCK */}
          <div className="w-full text-center flex flex-col gap-6">

            {/* HEADERS */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-bold leading-tight"
              style={{ color: textColor }}
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
                style={{
                  background: GRADIENTS.glow,
                  filter: 'blur(80px)',
                }}
              />
              <div className="relative z-0 bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
                Unfiltered Connections.
              </div>
            </motion.div>

            {/* DESCRIPTION */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl opacity-80 leading-relaxed"
              style={{ color: textColor }}
            >
              Reveal one of three daily photo prompts. No algorithms, no influencers—just you and your friends capturing life as it happens.
            </motion.p>

            {/* FEATURES */}
            <div className="mt-10 flex flex-col gap-4 w-full">
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
                  <p className="text-sm leading-relaxed" style={{ color: textColor, opacity: 0.8 }}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Desktop: Original sticky scrollytelling behavior
  return (
    <section
      ref={phoneSectionRef}
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
                scrollStart={PHONE_SCROLL.IMAGE_SCROLL.START}
                scrollEnd={PHONE_SCROLL.IMAGE_SCROLL.END}
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

              {/* DESCRIPTION */}
              <motion.div style={{ y: t3Y }} className="text-lg sm:text-xl opacity-80 leading-relaxed">
                <LetterReveal
                  text="Reveal one of three daily photo prompts. No algorithms, no influencers—just you and your friends capturing life as it happens."
                  scrollProgress={phoneScroll}
                  startProgress={PHONE_SCROLL.TEXT_3[0]}
                  endProgress={PHONE_SCROLL.TEXT_3[1]}
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