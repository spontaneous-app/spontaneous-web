import { motion } from 'framer-motion'
import { Apple, Smartphone } from 'lucide-react'

const AppStoreButtons = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="flex flex-wrap gap-4"
    >
      {/* Apple App Store Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gray-900 border border-gray-800 opacity-50 cursor-not-allowed">
          <Apple className="w-6 h-6 text-white" />
          <div className="text-left">
            <div className="text-xs text-gray-300">Download on the</div>
            <div className="text-sm font-semibold text-white">App Store</div>
          </div>
        </div>
        <div className="absolute -top-2 -right-2 px-2 py-1 bg-orange-500 rounded-full text-xs font-semibold text-white shadow-lg">
          Soon
        </div>
      </motion.div>

      {/* Google Play Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gray-900 border border-gray-800 opacity-50 cursor-not-allowed">
          <Smartphone className="w-6 h-6 text-white" />
          <div className="text-left">
            <div className="text-xs text-gray-300">Get it on</div>
            <div className="text-sm font-semibold text-white">Google Play</div>
          </div>
        </div>
        <div className="absolute -top-2 -right-2 px-2 py-1 bg-orange-500 rounded-full text-xs font-semibold text-white shadow-lg">
          Soon
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AppStoreButtons

