import { motion, useTransform } from 'framer-motion'

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
  const fadeStart = scrollEnd * 0.85
  const imageOpacity = useTransform(
    scrollProgress,
    [fadeStart, scrollEnd],
    [1, 0]
  )
  const logoOpacity = useTransform(
    scrollProgress,
    [fadeStart, scrollEnd],
    [0, 1]
  )
  
  // Background color transition from black to white
  const backgroundColor = useTransform(
    scrollProgress,
    [fadeStart, scrollEnd],
    ['#000000', '#ffffff']
  )

  return (
    <motion.div
      className="relative perspective-1000"
      style={{ perspective: '1000px' }}
    >
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
              style={{ opacity: logoOpacity }}
            >
              <img
                src="/logo.png"
                alt="Spontaneous logo"
                className="max-w-[60%] h-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PhoneMockup