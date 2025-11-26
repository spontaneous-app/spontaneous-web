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
      {/* CARD CONTAINER (Ice Cube Effect) */}
      <div 
        className="group relative w-full h-full rounded-2xl overflow-hidden transition-transform duration-500 hover:scale-[1.02] hover:-translate-y-1"
        style={{
          // The Magic: Complex shadows to simulate 3D glass thickness
          boxShadow: `
            0 20px 40px -10px rgba(0, 0, 0, 0.5),        /* Drop shadow for lift */
            inset 0 1px 0 0 rgba(255, 255, 255, 0.3),    /* Top edge highlight (sharp) */
            inset 0 0 20px 2px rgba(0, 0, 0, 0.3),       /* Inner depth */
            inset 0 0 2px 0 rgba(255, 255, 255, 0.1)     /* General rim definition */
          `,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)', // Safari support
        }}
      >
        {/* 1. Base Glass Material (Subtle gradient) */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.01] z-0" />
        
        {/* 2. Top Specular Reflection (The "Glossy" top shine) */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none z-0" />

        {/* 3. Ambient Color Glows (The dynamic gradient blobs) */}
        <div 
          className={`absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-br ${feature.gradient} blur-[60px] opacity-20 group-hover:opacity-40 transition-all duration-700 ease-in-out`} 
        />
        <div 
          className={`absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-gradient-to-tr ${feature.gradient} blur-[60px] opacity-10 group-hover:opacity-30 transition-all duration-700 ease-in-out`} 
        />

        {/* 4. Surface sheen on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 mix-blend-overlay z-0`}
        />

        {/* CONTENT */}
        <div className="relative z-10 p-5 md:p-6 flex flex-col h-full justify-between border-t border-white/10">
          <div>
            {useMotion ? (
              <>
                <motion.h4
                  className={`text-lg md:text-xl font-bold mb-3 bg-gradient-to-r ${feature.gradient} text-transparent bg-clip-text drop-shadow-sm filter brightness-125`}
                >
                  {feature.title}
                </motion.h4>
                <motion.p
                  className="text-sm leading-relaxed font-medium"
                  style={{ color: textColor || 'rgba(255,255,255,0.8)' }}
                >
                  {feature.description}
                </motion.p>
              </>
            ) : (
              <>
                <h4 className={`text-lg md:text-xl font-bold mb-3 bg-gradient-to-r ${feature.gradient} text-transparent bg-clip-text drop-shadow-sm filter brightness-125`}>
                  {feature.title}
                </h4>
                <p
                  className="text-sm leading-relaxed text-gray-300 font-medium"
                >
                  {feature.description}
                </p>
              </>
            )}
          </div>
          
          {/* Optional: A subtle "shine" line at the bottom to ground the text area */}
           <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>
    </BubbleReveal>
  )
}

export default IceCubeFeatureCard