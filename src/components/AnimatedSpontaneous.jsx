import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { COLORS } from '../constants/colors'

// Helper function to interpolate between hex colors
function interpolateColor(color1, color2, factor) {
  const hex1 = color1.replace('#', '')
  const hex2 = color2.replace('#', '')
  
  const r1 = parseInt(hex1.substring(0, 2), 16)
  const g1 = parseInt(hex1.substring(2, 4), 16)
  const b1 = parseInt(hex1.substring(4, 6), 16)
  
  const r2 = parseInt(hex2.substring(0, 2), 16)
  const g2 = parseInt(hex2.substring(2, 4), 16)
  const b2 = parseInt(hex2.substring(4, 6), 16)
  
  const r = Math.round(r1 + (r2 - r1) * factor)
  const g = Math.round(g1 + (g2 - g1) * factor)
  const b = Math.round(b1 + (b2 - b1) * factor)
  
  return `rgb(${r}, ${g}, ${b})`
}

const AnimatedSpontaneous = () => {
  const text = 'Spontaneous.'
  const letters = text.split('')
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Smooth spring values for mouse tracking
  const springX = useSpring(mouseX, { stiffness: 50, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 15 })
  
  // Wave animation state
  const [waveActive, setWaveActive] = useState(false)

  // Track mouse position for 3D effect with bounds checking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      // Calculate distance from cursor to center of word
      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      
      // Only apply transform when cursor is within 300px of the word
      const maxDistance = 2000
      if (distance > maxDistance) {
        // Reset to center when cursor is far away
        mouseX.set(0)
        mouseY.set(0)
        return
      }
      
      // Normalize to -1 to 1 range, but clamp to smaller effective area
      const normalizedX = deltaX / (rect.width / 2)
      const normalizedY = deltaY / (rect.height / 2)
      
      // Clamp values to prevent extreme transforms
      const clampedX = Math.max(-1, Math.min(1, normalizedX))
      const clampedY = Math.max(-1, Math.min(1, normalizedY))
      
      mouseX.set(clampedX)
      mouseY.set(clampedY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Trigger wave animation on mount and periodically
  useEffect(() => {
    // Initial wave
    setWaveActive(true)
    setTimeout(() => setWaveActive(false), 2000)
    
    // Periodic waves
    const interval = setInterval(() => {
      setWaveActive(true)
      setTimeout(() => setWaveActive(false), 2000)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Apply 3D transforms to entire word (facing cursor, minimal amounts)
  const rotateX = useTransform(springY, (y) => y * 9) // Further reduced from 3 to 1.5 degrees
  const rotateY = useTransform(springX, (x) => x * 9) // Further reduced from 3 to 1.5 degrees
  const translateZ = useTransform(
    [springX, springY],
    ([x, y]) => {
      const distance = Math.sqrt(x * x + y * y)
      return distance * 64 // Further reduced from 8 to 4
    }
  )

  // Static gradient that flows smoothly across the entire word
  // Calculate gradient for each letter to create smooth continuous flow
  const getLetterGradient = (index, total) => {
    const orange = COLORS.orange
    const orangeRed = COLORS.orangeRed
    const red = COLORS.red
    
    // Map letter position to gradient position (0 to 100%)
    const position = (index / (total - 1)) * 100
    
    // Get the color at this position in the overall gradient
    let centerColor
    if (position <= 33) {
      const t = position / 33
      centerColor = interpolateColor(orange, orangeRed, t)
    } else if (position <= 66) {
      const t = (position - 33) / 33
      centerColor = interpolateColor(orangeRed, red, t)
    } else {
      const t = (position - 66) / 34
      centerColor = interpolateColor(red, orange, t)
    }
    
    // Get the color slightly before and after for smooth gradient
    const letterWidth = 100 / total
    const prevPosition = Math.max(0, position - letterWidth / 2)
    const nextPosition = Math.min(100, position + letterWidth / 2)
    
    let startColor, endColor
    if (prevPosition <= 33) {
      const t = prevPosition / 33
      startColor = interpolateColor(orange, orangeRed, t)
    } else if (prevPosition <= 66) {
      const t = (prevPosition - 33) / 33
      startColor = interpolateColor(orangeRed, red, t)
    } else {
      const t = (prevPosition - 66) / 34
      startColor = interpolateColor(red, orange, t)
    }
    
    if (nextPosition <= 33) {
      const t = nextPosition / 33
      endColor = interpolateColor(orange, orangeRed, t)
    } else if (nextPosition <= 66) {
      const t = (nextPosition - 33) / 33
      endColor = interpolateColor(orangeRed, red, t)
    } else {
      const t = (nextPosition - 66) / 34
      endColor = interpolateColor(red, orange, t)
    }
    
    // Create a gradient for this letter that transitions smoothly
    return `linear-gradient(90deg, ${startColor} 0%, ${centerColor} 50%, ${endColor} 100%)`
  }

  return (
    <motion.span
      ref={containerRef}
      className="inline-block relative"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        z: translateZ,
      }}
    >
      {letters.map((letter, index) => {
        const isSpace = letter === ' '
        // Get the static gradient for this letter's position
        const letterGradient = getLetterGradient(index, letters.length)

        return (
          <motion.span
            key={`${letter}-${index}`}
            className="inline-block"
            style={{
              backgroundImage: letterGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            animate={waveActive ? {
              y: [0, -10, 0],
            } : {}}
            transition={{
              y: {
                delay: index * 0.05,
                duration: 0.5,
                ease: 'easeOut',
              },
            }}
          >
            {isSpace ? '\u00A0' : letter}
          </motion.span>
        )
      })}
    </motion.span>
  )
}

export default AnimatedSpontaneous

