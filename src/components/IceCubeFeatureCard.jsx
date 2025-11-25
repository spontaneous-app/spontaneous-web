import { motion } from 'framer-motion'
import BubbleReveal from './BubbleReveal'

const IceCubeFeatureCard = ({ 
  feature, 
  index = 0, 
  textColor, 
  isActive, 
  delay = 0, 
  style,
  className = "w-full",
  useMotion = false 
}) => {
  return (
    <BubbleReveal
      delay={delay}
      isActive={isActive}
      style={style}
      className={className}
      gradient={feature.gradient}
    >
      {/* CARD CONTAINER (Premium 3D Ice Cube Effect) */}
      <div 
        className="group relative w-full rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
        style={{
          border: '2px solid rgba(255, 255, 255, 0.1)', // Glass edge
          boxShadow: `
            inset 0 0 15px rgba(255, 255, 255, 0.05), // Inner light reflection
            0 8px 20px -8px rgba(0, 0, 0, 0.5)      // Outer drop shadow
          `,
        }}
      >
        {/* Glass Background Texture */}
        <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-xl" />

        <div 
          className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${feature.gradient} blur-[50px] opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700`} 
        />
        <div 
          className={`absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-gradient-to-tr ${feature.gradient} blur-[50px] opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700`} 
        />

        <div
          className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 mix-blend-overlay`}
        />

        {/* CONTENT */}
        <div className="relative z-10 p-4 md:p-5 flex flex-col h-full justify-between">
          <div>
            {useMotion ? (
              <>
                <motion.h4
                  className={`text-lg md:text-xl font-bold mb-2 bg-gradient-to-r ${feature.gradient} text-transparent bg-clip-text drop-shadow-sm`}
                >
                  {feature.title}
                </motion.h4>
                <motion.p
                  className="text-sm leading-relaxed"
                  style={{ color: textColor, opacity: 0.9 }}
                >
                  {feature.description}
                </motion.p>
              </>
            ) : (
              <>
                <h4 className={`text-lg md:text-xl font-bold mb-2 bg-gradient-to-r ${feature.gradient} text-transparent bg-clip-text drop-shadow-sm`}>
                  {feature.title}
                </h4>
                <p
                  className="text-sm leading-relaxed text-white"
                  style={{ opacity: 0.9 }}
                >
                  {feature.description}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </BubbleReveal>
  )
}

export default IceCubeFeatureCard

