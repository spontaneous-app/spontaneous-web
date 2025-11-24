import { motion, useTransform } from 'framer-motion'
import { useGlowAnimation } from '../hooks/useGlowAnimation'
import { PHONE_MOCKUP, PHONE_SCROLL } from '../constants/animations'
import { COLORS } from '../constants/colors'

const PhoneMockup = ({ 
  imageSrc, 
  scrollProgress, 
  scrollStart = PHONE_SCROLL.IMAGE_SCROLL.START, 
  scrollEnd = PHONE_SCROLL.IMAGE_SCROLL.END 
}) => {
  // Calculate image scroll translation
  const imageTranslateY = useTransform(
    scrollProgress,
    [scrollStart, scrollEnd],
    [0, PHONE_MOCKUP.MAX_SCROLL_DISTANCE]
  )

  // Fade out image and fade in logo near the end
  const fadeStart = scrollEnd * PHONE_SCROLL.FADE_TRANSITION
  const imageOpacity = useTransform(scrollProgress, [fadeStart, scrollEnd], [1, 0])
  const logoOpacity = useTransform(scrollProgress, [fadeStart, scrollEnd], [0, 1])
  const logoScale = useTransform(scrollProgress, [fadeStart, scrollEnd], [0.1, 0.65])
  
  // Background color transition from deep navy to warm off-white
  const backgroundColor = useTransform(
    scrollProgress, 
    [fadeStart, scrollEnd], 
    [COLORS.deepNavy, COLORS.warmOffWhite]
  )

  // Glow effect during phone fade-in
  const {
    glowOpacity,
    glowScale1,
    glowScale2,
    gradientBg1,
    gradientBg2,
    normalizedRotation,
  } = useGlowAnimation(scrollProgress)

  return (
    <motion.div
      className="relative perspective-1000"
      style={{ perspective: '1000px' }}
    >
      {/* Flowy Glow Effect - Multiple layers for depth */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-[3rem] pointer-events-none overflow-hidden"
        style={{
          opacity: glowOpacity,
          filter: `blur(${PHONE_MOCKUP.GLOW.BLUR})`,
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-[3rem]"
          style={{
            background: gradientBg1,
            scale: glowScale1,
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-[3rem]"
          style={{
            background: gradientBg2,
            scale: glowScale2,
            rotate: useTransform(normalizedRotation, (r) => `${r * 0.5}deg`),
          }}
        />
      </motion.div>
      
      <motion.div
        whileHover={{ rotateY: 5, rotateX: 5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative w-[280px] h-[560px] mx-auto transform-gpu"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Phone Frame - Lighter border for Dark Mode visibility */}
        <div className="absolute inset-0 rounded-[3rem] bg-gray-900 p-2 shadow-2xl shadow-orange-500/10 border-[6px] border-gray-700">
          {/* Screen */}
          <motion.div 
            className="w-full h-full rounded-[2.0rem] overflow-hidden relative"
            style={{ backgroundColor }}
          >
            
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30">
              <div className="w-[80px] h-[20px] bg-black rounded-full flex items-center justify-center gap-2 px-4 shadow-sm border border-gray-800">
                <div className="w-1.5 h-1.5 bg-gray-800 rounded-full" />
                <div className="w-12 h-1 bg-red-800 rounded-full" />
              </div>
            </div>

            {/* Screen Content - Long Screenshot */}
            {imageSrc ? (
              <motion.div 
                className="absolute inset-0 overflow-hidden rounded-[2.0rem]"
                style={{ opacity: imageOpacity }}
              >
                <motion.img
                  src={imageSrc}
                  alt="Spontaneous app screenshot"
                  style={{ 
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    objectPosition: 'top',
                    y: imageTranslateY,
                    display: 'block',
                    top: 0,
                    left: 0,
                    position: 'relative'
                  }}
                />
              </motion.div>
            ) : (
              <div className="w-full h-full bg-gray-800" />
            )}

            {/* Logo - Fades in at the end */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-20"
              style={{ opacity: logoOpacity, scale: logoScale }}
            >
              <img
                src="/logo.png"
                alt="Spontaneous logo"
                className="max-w-[45%] h-auto drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PhoneMockup