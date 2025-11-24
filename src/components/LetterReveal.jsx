import { motion, useMotionValueEvent, useTransform } from 'framer-motion'
import { useState } from 'react'

const LetterReveal = ({
  text,
  scrollProgress,
  startProgress,
  endProgress,
  style,
  className,
  letterClassName,
  letterStyle
}) => {
  const [visibleChars, setVisibleChars] = useState(0)

  // Transform scroll progress to letter count
  const letterProgress = useTransform(
    scrollProgress,
    [startProgress, endProgress],
    [0, 1]
  )

  // Update visible character count based on scroll progress
  useMotionValueEvent(letterProgress, 'change', (latest) => {
    const totalChars = text.length
    const charsToShow = Math.floor(latest * totalChars)
    setVisibleChars(charsToShow)
  })

  // Split text into words to keep letters from wrapping mid-word
  const words = text.split(' ')
  let processedChars = 0

  return (
    <motion.span style={style} className={className}>
      {words.map((word, wordIndex) => {
        const letters = word.split('')
        return (
          <span
            key={`word-${wordIndex}`}
            className="inline-flex flex-nowrap items-baseline mr-[0.35em]"
          >
            {letters.map((char, index) => {
              const currentIndex = processedChars
              const isVisible = currentIndex < visibleChars
              processedChars += 1

              return (
                <motion.span
                  key={`${wordIndex}-${index}`}
                  className={`inline-block ${letterClassName ?? ''}`}
                  style={letterStyle}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: isVisible ? 1 : 0,
                    y: isVisible ? 0 : 10
                  }}
                  transition={{
                    duration: 0.15,
                    ease: 'easeOut'
                  }}
                >
                  {char}
                </motion.span>
              )
            })}
            {/* Account for the space that follows (except after the last word) */}
            {wordIndex < words.length - 1 && (() => {
              processedChars += 1
              return null
            })()}
          </span>
        )
      })}
    </motion.span>
  )
}

export default LetterReveal

