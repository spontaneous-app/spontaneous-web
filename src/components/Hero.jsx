import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import WaitlistForm from './WaitlistForm'

const Hero = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-orange-600 text-sm font-medium"
      >
        <Sparkles className="w-4 h-4" />
        <span>Coming Soon</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
      >
        <span className="bg-gradient-to-r from-gray-900 via-orange-600 to-orange-500 bg-clip-text text-transparent">
          Spark Creativity
        </span>
        <br />
        <span className="text-gray-900">with Daily Prompts</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-2xl"
      >
        The whimsical antidote to the algorithm. No endless scrolling—just fun prompts and badges for your friends.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <WaitlistForm />
      </motion.div>
    </div>
  )
}

export default Hero

