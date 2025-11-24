import { useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'

export const useScrollAnimations = () => {
  const containerRef = useRef(null)
  
  // Global Scroll for Background Color
  const { scrollYProgress: globalScroll } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Background Transition
  const backgroundColor = useTransform(
    globalScroll,
    [0, 0.10, 0.7, 0.80], 
    ["#FFEFE0", "#182140", "#0f172a", "#FFEFE0"]
  )
  
  // Text Color Transition
  const textColor = useTransform(
    globalScroll,
    [0, 0.15, 0.7, 0.70], 
    ["#0f172a", "#f8fafc", "#f8fafc", "#0f172a"]
  )

  return {
    containerRef,
    backgroundColor,
    textColor
  }
}

