import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const ScrollIndicator = ({ className = '' }) => {
  return (
    <motion.div
      className={`flex flex-col items-center text-xs uppercase tracking-[0.3em] text-white/70 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <span className="mb-2 text-[11px]">Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        className="rounded-full border border-white/30 p-2 bg-white/10 backdrop-blur-sm"
      >
        <ChevronDown className="w-4 h-4 text-white" />
      </motion.div>
    </motion.div>
  )
}

export default ScrollIndicator

