import { motion } from 'framer-motion'
import AppStoreButtons from './AppStoreButtons'
import AnimatedSpontaneous from './AnimatedSpontaneous'

const Hero = () => {
  return (
    <div className="relative z-10 flex flex-col items-center text-center pt-8 sm:pt-20 pb-6 sm:pb-10">
      
      {/* 1. LOGO - Smaller on mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-4 sm:mb-8"
      >
        <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl shadow-orange-500/30 flex items-center justify-center rotate-3 hover:rotate-6 transition-transform border-4 border-white/60 bg-white/80 backdrop-blur-xl">
          <img 
            src="/logo.png" 
            alt="Spontaneous logo" 
            className="w-14 sm:w-20 h-auto drop-shadow-2xl"
          />
        </div>
      </motion.div>

      {/* 2. HEADLINE: Animated 3D Gradient Text - Smaller on mobile */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-4 sm:mb-8 max-w-5xl mx-auto px-4"
      >
        <span className="text-slate-900">Be</span>{' '}
        <AnimatedSpontaneous />
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-base sm:text-xl md:text-3xl text-slate-600 max-w-3xl mx-auto mb-6 sm:mb-12 leading-relaxed font-medium px-4"
      >
        Photo prompts that bring the fun to your feed.
      </motion.p>

      {/* 3. BUTTONS: Reduced gap on mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col items-center gap-4 sm:gap-8 w-full pb-20 sm:pb-10"
      >
        {/* Scaled up to 1.3 for impact - reduced on mobile to prevent overlap */}
        <div className="scale-100 sm:scale-125 md:scale-150 transform origin-top pt-2 sm:pt-4">
            <AppStoreButtons />
        </div>
      </motion.div>
    </div>
  )
}

export default Hero