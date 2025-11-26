import { motion } from 'framer-motion'
import BubbleReveal from './BubbleReveal'

// Tune these values to control the look of the glass
const GLASS_CONFIG = {
  glassOpacityStart: 0.005, // Top-left opacity (The "thickest" part)
  glassOpacityEnd: 0.0,    // Bottom-right opacity (The "clearest" part)
  
  // Refraction: How blurry the content behind the card looks
  blurStrength: '1px',    // Higher px = frostier/thicker ice. Lower = clear glass.

  // Edge Visibility: The sharp white lines defining the shape
  borderOpacity: 0.35,     // Opacity of the white highlight borders

  // Ambient Color Glows
  glowBlur: '80px',        // Blur strength for the gradient glows
  topRightGlowOpacity: 0.2,      // Top-right glow base opacity
  topRightGlowHoverOpacity: 0.60, // Top-right glow opacity on hover
  bottomLeftGlowOpacity: 0.15,    // Bottom-left glow base opacity
  bottomLeftGlowHoverOpacity: 0.60, // Bottom-left glow opacity on hover
}

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
    <>
      <style>{`
        .glow-top-right {
          opacity: var(--glow-top-opacity);
        }
        .group:hover .glow-top-right {
          opacity: var(--glow-top-hover-opacity);
        }
        .glow-bottom-left {
          opacity: var(--glow-bottom-opacity);
        }
        .group:hover .glow-bottom-left {
          opacity: var(--glow-bottom-hover-opacity);
        }
      `}</style>
      <BubbleReveal
        delay={delay}
        isActive={isActive}
        style={style}
        className={className}
        gradient={feature.gradient}
      >
        {/* CARD CONTAINER */}
        <div 
          className="group relative w-full h-full rounded-2xl overflow-hidden transition-transform duration-500 hover:scale-[1.02] hover:-translate-y-1"
          style={{
            // Complex shadows to simulate 3D thickness
            boxShadow: `
              0 20px 40px -10px rgba(0, 0, 0, 0.5),        
              inset 0 1px 0 0 rgba(255, 255, 255, ${GLASS_CONFIG.borderOpacity}),
              inset 0 0 20px 2px rgba(0, 0, 0, 0.3),       
              inset 0 0 2px 0 rgba(255, 255, 255, 0.1)     
            `,
            backdropFilter: `blur(${GLASS_CONFIG.blurStrength})`,
            WebkitBackdropFilter: `blur(${GLASS_CONFIG.blurStrength})`,
            // CSS custom properties for glow opacity values
            '--glow-top-opacity': GLASS_CONFIG.topRightGlowOpacity,
            '--glow-top-hover-opacity': GLASS_CONFIG.topRightGlowHoverOpacity,
            '--glow-bottom-opacity': GLASS_CONFIG.bottomLeftGlowOpacity,
            '--glow-bottom-hover-opacity': GLASS_CONFIG.bottomLeftGlowHoverOpacity,
          }}
        >
        {/* 1. Base Glass Material (Controlled by CONFIG above) */}
        <div 
            className="absolute inset-0 z-0"
            style={{
                background: `linear-gradient(135deg, rgba(255,255,255,${GLASS_CONFIG.glassOpacityStart}), rgba(255,255,255,${GLASS_CONFIG.glassOpacityEnd}))`
            }}
        />
        
        {/* 2. Top Specular Reflection (The "Glossy" top shine) */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none z-0" />

        {/* 3. Ambient Color Glows (The dynamic gradient blobs) */}
        <div 
          className={`absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-br ${feature.gradient} glow-top-right transition-opacity duration-700 ease-in-out`}
          style={{
            filter: `blur(${GLASS_CONFIG.glowBlur})`,
          }}
        />
        <div 
          className={`absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-gradient-to-tr ${feature.gradient} glow-bottom-left transition-opacity duration-700 ease-in-out`}
          style={{
            filter: `blur(${GLASS_CONFIG.glowBlur})`,
          }}
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
    </>
  )
}

export default IceCubeFeatureCard