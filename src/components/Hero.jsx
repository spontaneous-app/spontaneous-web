import { motion } from 'framer-motion'
import AppStoreButtons from './AppStoreButtons'

const Hero = () => {
  return (
    <div className="relative z-10 flex flex-col items-center text-center pt-10 sm:pt-20 pb-10">
      {/* Main Headline - Centered & High Contrast */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6 max-w-4xl mx-auto"
      >
        <span className="text-slate-900">Be</span>{' '}
        <span className="text-[#F18E48]">Spontaneous.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xl sm:text-2xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
      >
        Photo prompts that bring the fun to your feed.
      </motion.p>

      {/* Large App Store Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col items-center gap-8 w-full"
      >
        {/* Scaled up buttons for emphasis - scale 1.25 */}
        <div className="scale-125 transform origin-top">
            <AppStoreButtons />
        </div>
      </motion.div>
    </div>
  )
}

export default Hero