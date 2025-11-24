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
    [0, 0.15, 0.75, 0.80], 
    ["#FFEFE0", "#090D1F", "#090D1F", "#090D1F"]
  )
  
  // Text Color Transition
  const textColor = useTransform(
    globalScroll,
    [0, 0.15, 0.66, 0.72], 
    ["#0f172a", "#f8fafc", "#f8fafc", "#f8fafc"]
  )

  return {
    containerRef,
    backgroundColor,
    textColor
  }
}

