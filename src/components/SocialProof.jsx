import { motion } from 'framer-motion'
import { Users } from 'lucide-react'

const SocialProof = () => {
  // This would typically come from an API
  const waitlistCount = 1247

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="flex items-center gap-3 text-gray-300"
    >
      <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10">
        <Users className="w-5 h-5 text-orange-400" />
        <span className="text-sm font-medium">
          <span className="text-white font-bold">{waitlistCount.toLocaleString()}</span> people on the waitlist
        </span>
      </div>
    </motion.div>
  )
}

export default SocialProof

