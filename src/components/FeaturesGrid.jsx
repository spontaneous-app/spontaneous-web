import { motion } from 'framer-motion'
import { Lightbulb, Share2, Award } from 'lucide-react'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const features = [
  {
    icon: Lightbulb,
    title: 'Daily Prompts',
    description: 'Pick one of three daily prompts! Whimsical prompts to bring fun to your day.',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Share2,
    title: 'Share & Compare',
    description: 'Post and share! See how friends interpreted the same prompt or a different one.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Award,
    title: 'Streaks & Awards',
    description: 'Maintain a streak! Compete to have the most awards on the monthly leaderboard (Coming Soon).',
    color: 'from-orange-400 to-orange-600',
  },
]

const FeaturesGrid = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="space-y-12"
    >
      <motion.div
        variants={itemVariants}
        className="text-center"
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          Why <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Spontaneous</span>?
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A new way to connect through creativity and genuine moments
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="relative group"
            >
              <div className="h-full p-8 rounded-2xl glass border border-gray-200/50 hover:border-orange-200 transition-all backdrop-blur-xl">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
              
              {/* Hover glow effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 blur-xl -z-10 transition-opacity`} />
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default FeaturesGrid
