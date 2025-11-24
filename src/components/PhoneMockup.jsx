import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'

const PhoneMockup = ({ imageSrc }) => {
  return (
    <motion.div
      className="relative perspective-1000"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        whileHover={{ rotateY: 5, rotateX: 5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative w-[280px] h-[560px] mx-auto transform-gpu"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Phone Frame - Lighter border for Dark Mode visibility */}
        <div className="absolute inset-0 rounded-[3rem] bg-gray-900 p-2 shadow-2xl shadow-orange-500/10 border-[6px] border-gray-700">
          {/* Screen */}
          <div className="w-full h-full rounded-[2.5rem] bg-black overflow-hidden relative">
            
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30">
              <div className="w-[80px] h-[24px] bg-black rounded-full flex items-center justify-center gap-2 px-4 shadow-sm border border-gray-800">
                <div className="w-1.5 h-1.5 bg-gray-800 rounded-full" />
                <div className="w-12 h-1 bg-gray-800 rounded-full" />
              </div>
            </div>

            {/* Screen Content */}
            {imageSrc ? (
              <img
                src={imageSrc}
                alt="Spontaneous app screenshot"
                className="absolute inset-0 w-full h-full"
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div className="w-full h-full bg-gray-800" />
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PhoneMockup