import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'

const PhoneMockup = ({ imageSrc }) => {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -15 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative perspective-1000"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        whileHover={{ rotateY: 5, rotateX: 5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative w-[280px] h-[560px] mx-auto transform-gpu"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Phone Frame */}
        <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-gray-800 to-gray-900 p-2 shadow-2xl border-4 border-gray-700">
          {/* Screen */}
          <div className="w-full h-full rounded-[2.5rem] bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 overflow-hidden relative">
            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-12 z-20 flex items-center justify-between px-6 text-white text-xs font-medium">
              <span className="drop-shadow-md">9:41</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-2 border border-white/50 rounded-sm">
                  <div className="w-3/4 h-full bg-white/80 rounded-sm" />
                </div>
                <div className="w-1 h-1 bg-white/80 rounded-full" />
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
              /* Daily Prompt Card Placeholder */
              <div className="pt-12 h-full flex flex-col items-center justify-center p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="w-full max-w-[240px] bg-white rounded-2xl shadow-2xl p-6 space-y-4"
                >
                  {/* Prompt Header */}
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Lightbulb className="w-5 h-5 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <div className="h-3 w-20 bg-gray-200 rounded-full mb-2" />
                      <div className="h-2 w-16 bg-gray-100 rounded-full" />
                    </div>
                  </div>

                  {/* Prompt Text */}
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded-full" />
                    <div className="h-4 w-3/4 bg-gray-200 rounded-full" />
                    <div className="h-4 w-5/6 bg-gray-200 rounded-full" />
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    <div className="h-10 w-full bg-orange-500 rounded-xl" />
                  </div>
                </motion.div>
              </div>
            )}

            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-10" />
          </div>
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-[3rem] bg-orange-500/20 blur-3xl -z-10 scale-110" />
      </motion.div>
    </motion.div>
  )
}

export default PhoneMockup

