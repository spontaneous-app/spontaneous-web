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
  
  // Background color transition
  const backgroundColor = useTransform(
    scrollProgress, 
    [fadeStart, scrollEnd], 
    [COLORS.deepNavy, COLORS.warmOffWhite]
  )

  // Glow effect
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
      className="relative perspective-1000 flex justify-center items-center"
      style={{ perspective: '1000px' }}
    >
      {/* 1. Background Glow Layers */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-[3rem] pointer-events-none overflow-hidden"
        style={{
          opacity: glowOpacity,
          filter: `blur(${PHONE_MOCKUP.GLOW.BLUR})`,
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-[3rem]"
          style={{ background: gradientBg1, scale: glowScale1 }}
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
      
      {/* 2. THE PHONE CHASSIS */}
      <motion.div
        whileHover={{ rotateY: 5, rotateX: 5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative w-[280px] h-[580px] mx-auto transform-gpu"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* --- HARDWARE BUTTONS --- */}
        <div className="absolute top-24 -left-[2px] w-1 h-7 bg-gray-600 rounded-l-md shadow-sm" />
        <div className="absolute top-36 -left-[2px] w-1 h-12 bg-gray-600 rounded-l-md shadow-sm" />
        <div className="absolute top-52 -left-[2px] w-1 h-12 bg-gray-600 rounded-l-md shadow-sm" />
        <div className="absolute top-40 -right-[2px] w-1 h-16 bg-gray-600 rounded-r-md shadow-sm" />

        {/* --- METAL FRAME (Titanium Look) --- */}
        <div 
          className="absolute inset-0 rounded-[3.5rem] overflow-hidden"
          style={{
            background: 'linear-gradient(105deg, #374151 0%, #9ca3af 20%, #1f2937 40%, #4b5563 60%, #111827 100%)',
            boxShadow: `
              0 25px 50px -12px rgba(0, 0, 0, 0.5),
              inset 0 0 4px 1px rgba(255, 255, 255, 0.3),
              inset 0 0 10px 4px rgba(0, 0, 0, 0.5)
            `
          }}
        >
            {/* --- BLACK BEZEL --- */}
            <div className="absolute inset-[3px] bg-black rounded-[3.2rem] overflow-hidden">
                
                {/* --- THE SCREEN --- */}
                <motion.div 
                    className="absolute inset-[8px] rounded-[2.8rem] overflow-hidden isolate bg-gray-900"
                    style={{ backgroundColor }}
                >
                    {/* Screen Reflection (Subtle Gloss) */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-30 z-40 pointer-events-none" />

                    {/* Dynamic Island */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50">
                        <div className="w-[85px] h-[24px] bg-black rounded-full flex items-center justify-center gap-2 px-4 shadow-sm border border-gray-800/50">
                            <div className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full ring-1 ring-gray-600/20" />
                            <div className="w-12 h-1 bg-[#1a1a1a] rounded-full opacity-50" />
                        </div>
                    </div>

                    {/* Screen Content */}
                    {imageSrc ? (
                    <motion.div 
                        className="absolute inset-0 overflow-hidden rounded-[2.8rem] z-0"
                        style={{ opacity: imageOpacity }}
                    >
                        <motion.img
                          src={imageSrc}
                          alt="Spontaneous app screenshot"
                          className="w-full h-auto object-cover object-top relative block"
                          style={{ 
                            y: imageTranslateY 
                          }}
                        />
                    </motion.div>
                    ) : (
                    <div className="w-full h-full bg-gray-800" />
                    )}

                    {/* Logo Fade In */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
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
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PhoneMockup