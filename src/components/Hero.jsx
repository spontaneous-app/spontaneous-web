import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import WaitlistForm from './WaitlistForm'
import AppStoreButtons from './AppStoreButtons'

const Hero = () => {
  return (
    <div className="relative z-10 flex flex-col items-center text-center pt-20 pb-10">
      
      {/* 1. LOGO: Better placeholder with gradient & border */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl shadow-2xl shadow-orange-500/20 flex items-center justify-center rotate-3 hover:rotate-6 transition-transform border-4 border-white/50 backdrop-blur-xl">
           <Sparkles className="w-12 h-12 text-white drop-shadow-md" />
        </div>
      </motion.div>

      {/* 2. HEADLINE: Added Gradient Text */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-6xl sm:text-7xl lg:text-9xl font-bold tracking-tight mb-8 max-w-5xl mx-auto"
      >
        <span className="text-slate-900">Be</span>{' '}
        <span className="bg-gradient-to-r from-[#F18E48] to-[#ff4d4d] bg-clip-text text-transparent pb-2">
          Spontaneous.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xl sm:text-3xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
      >
        Photo prompts that bring the fun to your feed.
      </motion.p>

      {/* 3. BUTTONS: Removed opacity, fully solid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col items-center gap-8 w-full"
      >
        {/* Scaled up to 1.3 for impact */}
        <div className="scale-125 sm:scale-150 transform origin-top pt-4">
            <AppStoreButtons />
        </div>
      </motion.div>
    </div>
  )
}

export default Hero