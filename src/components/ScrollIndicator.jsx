import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const ScrollIndicator = ({ className = '', color, style }) => {
  const resolvedColor = color ?? '#0f172a'
  
  return (
    <motion.div
      className={`flex flex-col items-center text-xs uppercase tracking-[0.3em] z-50 ${className}`}
      style={{ color: resolvedColor, ...style }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <span className="mb-2 text-[11px]">Scroll For More</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        className="rounded-full border w-8 h-8 flex items-center justify-center backdrop-blur-sm bg-white/10"
        style={{ borderColor: resolvedColor }}
      >
        <ChevronDown className="w-4 h-4" style={{ color: resolvedColor }} />
      </motion.div>
    </motion.div>
  )
}

export default ScrollIndicator

