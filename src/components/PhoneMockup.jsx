import { motion, useTransform, useMotionValue, animate } from 'framer-motion'
import { useEffect } from 'react'

const PhoneMockup = ({ imageSrc, scrollProgress, scrollStart = 0.3, scrollEnd = 0.85 }) => {
  // Calculate image scroll translation
  // The image should scroll from top (0) to reveal more content below
  // The long screenshot will scroll upward (negative translateY) as user scrolls
  // scrollStart: when phone is fully moved to the left (30% = 0.3)
  // scrollEnd: when image has finished scrolling (85% = 0.85)
  // Using pixel-based translation - adjust maxScrollDistance based on your image height
  const maxScrollDistance = -2500 // Adjust this value based on the height of the long_screenshot.png image
  const imageTranslateY = useTransform(
    scrollProgress,
    [scrollStart, scrollEnd],
    [0, maxScrollDistance]
  )

  // Fade out image and fade in logo near the end
  // Start transition at 75% of scrollEnd, complete at scrollEnd
  const fadeStart = scrollEnd * 0.90
  const imageOpacity = useTransform(scrollProgress, [fadeStart, scrollEnd], [1, 0])
  const logoOpacity = useTransform(scrollProgress, [fadeStart, scrollEnd], [0, 1])
  const logoScale = useTransform(scrollProgress, [fadeStart, scrollEnd], [0.1, 0.65])
  
  // Background color transition from deep navy to warm off-white for smoother reveal
  const backgroundColor = useTransform(scrollProgress, [fadeStart, scrollEnd], ['#090D1F', '#F0DFCC'])

  // Glow effect during phone fade-in (0 to 0.1 scroll progress)
  const glowOpacity = useTransform(scrollProgress, [0, 0.1], [0, 1.2])
  const glowIntensity = useTransform(scrollProgress, [0, 0.1], [0, 1])
  // Tighter glow - closer to phone size
  const glowScale1 = useTransform(glowIntensity, [0, 1], [1.05, 1.15])
  const glowScale2 = useTransform(glowIntensity, [0, 1], [1.08, 1.18])
  
  // Animated gradient position for flowy effect - use continuous rotation for smooth loop
  const gradientRotation = useMotionValue(0)
  
  // Create animated gradient backgrounds with higher opacity for brightness
  // Normalize rotation to 0-360 range for smooth calculations
  const normalizedRotation = useTransform(gradientRotation, (r) => {
    // Normalize to 0-360 range smoothly
    const normalized = ((r % 360) + 360) % 360
    return normalized
  })
  
  const gradientBg1 = useTransform(
    normalizedRotation,
    (r) => {
      const angle = r * Math.PI / 180
      const x = 50 + 20 * Math.cos(angle)
      const y = 50 + 20 * Math.sin(angle)
      return `radial-gradient(circle at ${x}% ${y}%, rgba(241, 142, 72, 0.9) 0%, rgba(255, 77, 77, 0.7) 25%, rgba(192, 38, 211, 0.5) 50%, transparent 75%)`
    }
  )
  
  const gradientBg2 = useTransform(
    normalizedRotation,
    (r) => {
      const angle = (r + 120) * Math.PI / 180
      const x = 50 + 20 * Math.cos(angle)
      const y = 50 + 20 * Math.sin(angle)
      return `radial-gradient(circle at ${x}% ${y}%, rgba(192, 38, 211, 0.8) 0%, rgba(255, 77, 77, 0.6) 30%, transparent 60%)`
    }
  )
  
  useEffect(() => {
    // Use continuous animation that never resets - let it grow infinitely
    let animationFrame
    let startTime = performance.now()
    
    const animate = () => {
      const elapsed = (performance.now() - startTime) / 1000
      // Continuous rotation - grows infinitely, no reset
      const rotation = elapsed * 36 // 36 degrees per second
      gradientRotation.set(rotation)
      animationFrame = requestAnimationFrame(animate)
    }
    
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [gradientRotation])

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
          filter: `blur(35px)`,
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