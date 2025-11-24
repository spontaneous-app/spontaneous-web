import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// --- TUNING VARIABLES ---
const SPACING = 170          // Controls overall width (Higher = Wider)
const MOBILE_SPACING = 50   // Controls width on mobile
const ARCH_STRENGTH = 10    // Controls how much the sides drop down (Lower = Flatter/Less Cutoff)
const ROTATION_STRENGTH = 8 // Controls how much the sides tilt
// -----------------------------------------------

const ImageFan = ({ images = [] }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

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
    // Added 'pb-32' to prevent bottom clipping and increased min-height
    <div className="relative min-h-[700px] w-full flex items-center justify-center overflow-hidden py-20 pb-32">
      <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
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
            // We reduced the multiplier here to prevent the deep drop-off
            const translateY = isHovered ? -40 : Math.abs(offset) * ARCH_STRENGTH 
            
            const scale = isHovered ? 1.15 : 1 - Math.abs(offset) * 0.05
            const zIndex = isHovered ? 50 : 10 - Math.abs(offset)

            return (
              <motion.div
                key={src}
                layout
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                // Increased width for desktop to match the "wide" vibe
                className="absolute w-[240px] sm:w-[300px] aspect-[9/15] rounded-[2rem] shadow-2xl border-[6px] border-gray-900 bg-gray-900 cursor-pointer overflow-hidden origin-bottom will-change-transform"
                initial={false}
                animate={{
                  rotate: rotation,
                  x: translateX,
                  y: translateY,
                  scale: scale,
                  zIndex: zIndex,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 24,
                  mass: 1
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
                
                {/* Dark overlay */}
                <motion.div 
                  animate={{ opacity: isHovered ? 0 : 0.4 }}
                  className="absolute inset-0 bg-black/60 pointer-events-none"
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ImageFan