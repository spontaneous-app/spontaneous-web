import { useEffect } from 'react'
import { useMotionValue, useTransform } from 'framer-motion'
import { PHONE_MOCKUP } from '../constants/animations'

export const useGlowAnimation = (scrollProgress) => {
  const glowOpacity = useTransform(
    scrollProgress,
    PHONE_MOCKUP.GLOW.OPACITY_RANGE,
    PHONE_MOCKUP.GLOW.OPACITY_VALUES
  )
  const glowIntensity = useTransform(
    scrollProgress,
    PHONE_MOCKUP.GLOW.INTENSITY_RANGE,
    PHONE_MOCKUP.GLOW.INTENSITY_VALUES
  )
  const glowScale1 = useTransform(glowIntensity, [0, 1], PHONE_MOCKUP.GLOW.SCALE_1)
  const glowScale2 = useTransform(glowIntensity, [0, 1], PHONE_MOCKUP.GLOW.SCALE_2)

  // Animated gradient position
  const gradientRotation = useMotionValue(0)

  // identity transform, because a normalized roation causes cuts for some reason
  const normalizedRotation = useTransform(gradientRotation, (v) => v)

  // Create animated gradient backgrounds
  const gradientBg1 = useTransform(normalizedRotation, (r) => {
    const angle = r * Math.PI / 180
    const x = 50 + 20 * Math.cos(angle)
    const y = 50 + 20 * Math.sin(angle)
    return `radial-gradient(circle at ${x}% ${y}%, rgba(241, 142, 72, 0.9) 0%, rgba(255, 77, 77, 0.7) 25%, rgba(192, 38, 211, 0.5) 50%, transparent 75%)`
  })

  const gradientBg2 = useTransform(normalizedRotation, (r) => {
    const angle = (r + 120) * Math.PI / 180
    const x = 50 + 20 * Math.cos(angle)
    const y = 50 + 20 * Math.sin(angle)
    return `radial-gradient(circle at ${x}% ${y}%, rgba(192, 38, 211, 0.8) 0%, rgba(255, 77, 77, 0.6) 30%, transparent 60%)`
  })

  useEffect(() => {
    let animationFrame
    let startTime = performance.now()

    const animate = () => {
      const elapsed = (performance.now() - startTime) / 1000
      const rotation = elapsed * PHONE_MOCKUP.GLOW.ROTATION_SPEED
      gradientRotation.set(rotation)
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [gradientRotation])

  return {
    glowOpacity,
    glowScale1,
    glowScale2,
    gradientBg1,
    gradientBg2,
    normalizedRotation,
  }
}