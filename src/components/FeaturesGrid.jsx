import { motion } from 'framer-motion'
import { Lightbulb, Award, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Lightbulb,
    title: 'Unique Daily Prompts',
    description: 'See how your friends interpret the same prompt differently. Every perspective is unique, every response is creative.',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Award,
    title: 'Custom Badges',
    description: 'Award badges to your friends\' posts. Celebrate creativity, humor, and those moments that make you smile.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Sparkles,
    title: 'Algorithm-Free',
    description: 'Zero clutter. No AI content. Just your friends and the prompts that spark real conversations.',
    color: 'from-orange-400 to-orange-600',
  },
]

const FeaturesGrid = () => {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
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
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.2, delay: 0 } // This forces hover to be instant
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
    </div>
  )
}

export default FeaturesGrid

