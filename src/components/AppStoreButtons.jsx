import { motion } from 'framer-motion'
import { Apple, Smartphone } from 'lucide-react'

const AppStoreButtons = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="flex flex-wrap justify-center gap-6"
    >
      {/* Apple App Store - Solid Black, White Text */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="relative group flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-900 text-white border border-slate-800 shadow-xl hover:shadow-2xl transition-all"
      >
        <Apple className="w-8 h-8 fill-current" />
        <div className="text-left">
          <div className="text-[10px] uppercase tracking-wider opacity-70">Download on the</div>
          <div className="text-lg font-bold leading-none">App Store</div>
        </div>
        
        {/* 'Soon' Badge */}
        <div className="absolute -top-3 -right-3 px-2 py-1 bg-orange-500 rounded-full text-[10px] font-bold text-white shadow-sm border-2 border-[#FFFBF7]">
          SOON
        </div>
      </motion.button>

      {/* Google Play - Solid Black, White Text */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="relative group flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-900 text-white border border-slate-800 shadow-xl hover:shadow-2xl transition-all"
      >
        <Smartphone className="w-8 h-8 fill-current" />
        <div className="text-left">
          <div className="text-[10px] uppercase tracking-wider opacity-70">Get it on</div>
          <div className="text-lg font-bold leading-none">Google Play</div>
        </div>
        
         {/* 'Soon' Badge */}
        <div className="absolute -top-3 -right-3 px-2 py-1 bg-orange-500 rounded-full text-[10px] font-bold text-white shadow-sm border-2 border-[#FFFBF7]">
          SOON
        </div>
      </motion.button>
    </motion.div>
  )
}

export default AppStoreButtons