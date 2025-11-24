import { motion } from 'framer-motion'

const BubbleReveal = ({ children, delay = 0, className = '', style, isActive = false }) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ scale: 0 }}
      animate={{ scale: isActive ? 1 : 0 }}
      transition={{
        type: 'spring',
        bounce: 0.5,
        duration: 0.8,
        delay: isActive ? delay : 0,
      }}
    >
      {children}
    </motion.div>
  )
}

export default BubbleReveal

