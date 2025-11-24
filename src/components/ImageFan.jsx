import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent } from 'framer-motion'
import LetterReveal from './LetterReveal'

// --- TUNING VARIABLES ---
const SPACING = 170          // Controls overall width (Higher = Wider)
const MOBILE_SPACING = 50   // Controls width on mobile
const ARCH_STRENGTH = 10    // Controls how much the sides drop down (Lower = Flatter/Less Cutoff)
const ROTATION_STRENGTH = 8 // Controls how much the sides tilt
// -----------------------------------------------

const TEXT_COMPLETE_THRESHOLD = 0.3

const ImageFan = ({
  images = [],
  title = 'Captured on Spontaneous'
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [textComplete, setTextComplete] = useState(false)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { margin: '-10% 0px -10% 0px' })
  const { scrollYProgress: localScroll } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  useMotionValueEvent(localScroll, 'change', (latest) => {
    setTextComplete(latest >= TEXT_COMPLETE_THRESHOLD)
  })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Generate placeholders if no images exist
  const allImages = images.length > 0 ? images : Array(5).fill('/api/placeholder/400/800')

  // Mobile: Show 3 images | Desktop: Show all
  const centerOfArray = Math.floor(allImages.length / 2)
  const displayImages = isMobile 
    ? allImages.slice(centerOfArray - 1, centerOfArray + 2) 
    : allImages

  const centerIndex = Math.floor(displayImages.length / 2)

  return (
    <section
      ref={containerRef}
      className="relative h-[280vh] w-full flex items-center justify-center z-30"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-visible">
        <div className="absolute top-12 left-0 w-full px-4 sm:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              <LetterReveal
                text={title}
                scrollProgress={localScroll}
                startProgress={0}
                endProgress={0.3}
              />
            </motion.h3>
          </div>
        </div>

        <div className="relative w-full max-w-[95vw] h-full flex items-center justify-center px-4 sm:px-8 pt-24">
          <AnimatePresence>
            {displayImages.map((src, index) => {
              const offset = index - centerIndex
              const isHovered = hoveredIndex === index
              
              // Dynamic Spacing Logic
              const currentSpacing = isMobile ? MOBILE_SPACING : SPACING
              
              // "Parting the Sea" - Dynamic push based on spacing
              let extraShift = 0
              if (hoveredIndex !== null && index !== hoveredIndex) {
                const pushDistance = isMobile ? 40 : 80 // Push further on desktop
                if (index < hoveredIndex) extraShift = -pushDistance
                if (index > hoveredIndex) extraShift = pushDistance
              }

              // Calculations
              const rotation = isHovered ? 0 : offset * ROTATION_STRENGTH 
              const translateX = (offset * currentSpacing) + extraShift
              const translateY = isHovered ? -40 : Math.abs(offset) * ARCH_STRENGTH 
              
              const scale = isHovered ? 1.15 : 1 - Math.abs(offset) * 0.05
              const zIndex = isHovered ? 50 : 10 - Math.abs(offset)

              const shouldAnimateIn = textComplete && isInView

              return (
                <motion.div
                  key={src}
                  layout
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="absolute w-[240px] sm:w-[300px] aspect-[9/15] rounded-[2rem] shadow-2xl border-[6px] border-gray-900 bg-gray-900 cursor-pointer overflow-hidden origin-bottom will-change-transform"
                  initial={{
                    opacity: 0,
                    y: 180,
                    scale: 0,
                    rotate: offset * 15,
                  }}
                  animate={{
                    opacity: shouldAnimateIn ? 1 : 0,
                    rotate: rotation,
                    x: translateX,
                    y: translateY,
                    scale: shouldAnimateIn ? scale : 0,
                    zIndex: zIndex,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 220,
                    damping: 16,
                    mass: 1.1,
                    delay: shouldAnimateIn ? index * 0.12 : 0
                  }}
                  whileHover={{
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    borderColor: "rgba(255, 255, 255, 0.2)"
                  }}
                >
                  <img 
                    src={src} 
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-full object-cover pointer-events-none select-none"
                    draggable={false}
                  />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default ImageFan