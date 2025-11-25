import { motion } from 'framer-motion'

const BubbleReveal = ({ 
  children, 
  delay = 0, 
  className = '', 
  style, 
  isActive = false,
  gradient = 'from-orange-500 to-amber-500' // Default fallback
}) => {
  
  return (
    <div className={`relative isolate ${className}`} style={style}>
      
      {/* 1. THE GLOW ECHO (The Premium Pulse) */}
      {/* A soft, blurred copy of the card that pulses outward and fades */}
      <motion.div
        className={`absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r ${gradient}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isActive 
          ? { 
              opacity: [0, 0.4, 0], // Flash on, then fade off
              scale: [0.95, 1.05, 1.1] // Expand slightly outward
            } 
          : { opacity: 0, scale: 0.9 }
        }
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay: isActive ? delay : 0,
        }}
        style={{ filter: 'blur(20px)' }} // Heavy blur makes it look like light, not a shape
      />

      {/* 2. THE MAIN CARD CONTENT */}
      <motion.div
        className="h-full w-full"
        // Start slightly small and blurry
        initial={{ scale: 0.95, opacity: 0, filter: 'blur(8px)' }}
        animate={isActive
          ? { scale: 1, opacity: 1, filter: 'blur(0px)' }
          : { scale: 0.95, opacity: 0, filter: 'blur(8px)' }
        }
        transition={{
          type: "spring",
          stiffness: 180, // Lower stiffness = softer, heavier feel
          damping: 24,    // No wobble, just a clean "landing"
          mass: 1,     
          delay: isActive ? delay : 0
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default BubbleReveal