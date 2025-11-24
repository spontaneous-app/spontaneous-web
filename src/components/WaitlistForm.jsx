import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Check } from 'lucide-react'

const WaitlistForm = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return

    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    setIsSubmitted(true)

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setEmail('')
    }, 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full pl-12 pr-4 py-4 rounded-xl glass border border-gray-200/50 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all text-gray-900 placeholder-gray-500 bg-white/80"
          />
        </div>
        <motion.button
          type="submit"
          disabled={isLoading || isSubmitted}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-4 rounded-xl font-medium text-gray-900 border border-gray-300 bg-white/80
             hover:border-orange-400 hover:bg-orange-50 hover:shadow-[0_0_20px_rgba(241,142,72,0.2)] 
             transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px]"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-gray-300 border-t-orange-500 rounded-full animate-spin" />
              <span>Joining...</span>
            </>
          ) : isSubmitted ? (
            <>
              <Check className="w-5 h-5 text-green-400" />
              <span>Joined!</span>
            </>
          ) : (
            // CHANGED: Added text glow
            <span className="drop-shadow-sm">Join Waitlist</span>
          )}
        </motion.button>
      </div>
      {isSubmitted && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-600 text-sm"
        >
          ✓ You're on the list! We'll notify you when we launch.
        </motion.p>
      )}
    </form>
  )
}

export default WaitlistForm

