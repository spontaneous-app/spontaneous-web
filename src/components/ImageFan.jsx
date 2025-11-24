import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent } from 'framer-motion'
import LetterReveal from './LetterReveal'
import { useMobile } from '../hooks/useMobile'
import { IMAGE_FAN_SCROLL, IMAGE_FAN } from '../constants/animations'
import { GRADIENTS } from '../constants/colors'

const ImageFan = ({
  images = [],
  title = 'Captured on Spontaneous'
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const isMobile = useMobile()
  const [textComplete, setTextComplete] = useState(false)
  const [showImages, setShowImages] = useState(false)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { margin: '-10% 0px -10% 0px' })
  const { scrollYProgress: localScroll } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const allImages = images.length > 0 ? images : Array(5).fill('/api/placeholder/400/800')
  const centerOfArray = Math.floor(allImages.length / 2)
  const displayImages = isMobile 
    ? allImages.slice(centerOfArray - 1, centerOfArray + 2) 
    : allImages

  const centerIndex = Math.floor(displayImages.length / 2)
  const highlightWord = 'Spontaneous'
  const hasHighlight = title.includes(highlightWord)
  const [prefixPart, suffixPart] = hasHighlight ? title.split(highlightWord) : [title, '']

  useMotionValueEvent(localScroll, 'change', (latest) => {
    setTextComplete(latest >= IMAGE_FAN_SCROLL.TEXT_COMPLETE)
    setShowImages(latest >= IMAGE_FAN_SCROLL.REVEAL_START)
  })

  return (
    <section
      ref={containerRef}
      className="relative h-[280vh] w-full flex items-center justify-center z-30"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-visible">
        <div className="absolute top-6 sm:top-8 left-0 w-full px-4 sm:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h3 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-tight">
              {hasHighlight ? (
                <div className="inline-flex flex-wrap items-baseline justify-center gap-4">
                  {prefixPart.trim() && (
                    <LetterReveal
                      text={prefixPart.trim()}
                      scrollProgress={localScroll}
                      startProgress={IMAGE_FAN_SCROLL.TITLE.PREFIX[0]}
                      endProgress={IMAGE_FAN_SCROLL.TITLE.PREFIX[1]}
                    />
                  )}
                  <LetterReveal
                    text={highlightWord}
                    scrollProgress={localScroll}
                    startProgress={IMAGE_FAN_SCROLL.TITLE.HIGHLIGHT[0]}
                    endProgress={IMAGE_FAN_SCROLL.TITLE.HIGHLIGHT[1]}
                    className="text-transparent bg-clip-text"
                    style={{
                      backgroundImage: GRADIENTS.brand,
                    }}
                  />
                  {suffixPart.trim() && (
                    <LetterReveal
                      text={suffixPart.trim()}
                      scrollProgress={localScroll}
                      startProgress={IMAGE_FAN_SCROLL.TITLE.SUFFIX[0]}
                      endProgress={IMAGE_FAN_SCROLL.TITLE.SUFFIX[1]}
                    />
                  )}
                </div>
              ) : (
                <LetterReveal
                  text={title}
                  scrollProgress={localScroll}
                  startProgress={IMAGE_FAN_SCROLL.TITLE.FALLBACK[0]}
                  endProgress={IMAGE_FAN_SCROLL.TITLE.FALLBACK[1]}
                />
              )}
            </motion.h3>
          </div>
        </div>

        <div className="relative w-full max-w-[95vw] h-full flex items-center justify-center px-4 sm:px-8 pt-24">
          <AnimatePresence>
            {displayImages.map((src, index) => {
              const offset = index - centerIndex
              const isHovered = hoveredIndex === index
              
              const currentSpacing = isMobile ? IMAGE_FAN.MOBILE_SPACING : IMAGE_FAN.SPACING
              
              let extraShift = 0
              if (hoveredIndex !== null && index !== hoveredIndex) {
                const pushDistance = isMobile ? IMAGE_FAN.HOVER_PUSH.MOBILE : IMAGE_FAN.HOVER_PUSH.DESKTOP
                if (index < hoveredIndex) extraShift = -pushDistance
                if (index > hoveredIndex) extraShift = pushDistance
              }

              const rotation = isHovered ? 0 : offset * IMAGE_FAN.ROTATION_STRENGTH 
              const translateX = (offset * currentSpacing) + extraShift
              const translateY = isHovered ? -40 : Math.abs(offset) * IMAGE_FAN.ARCH_STRENGTH 
              
              const scale = isHovered ? 1.15 : 1 - Math.abs(offset) * 0.05
              const zIndex = isHovered ? 50 : 10 - Math.abs(offset)

              // 2. UPDATED CONDITION: Simple boolean check
              const shouldAnimateIn = textComplete && isInView && showImages

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
                    scale: 0.8, // Slightly larger start scale for snappier feel
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
                    stiffness: IMAGE_FAN.SPRING.STIFFNESS,
                    damping: IMAGE_FAN.SPRING.DAMPING,
                    mass: IMAGE_FAN.SPRING.MASS,
                    delay: shouldAnimateIn ? index * IMAGE_FAN.SPRING.DELAY_INCREMENT : 0 
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