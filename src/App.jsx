import { motion } from 'framer-motion'
import Hero from './components/Hero'
import PhoneMockup from './components/PhoneMockup'
import AppStoreButtons from './components/AppStoreButtons'
import SocialProof from './components/SocialProof'
import FeaturesGrid from './components/FeaturesGrid'

function App() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <Hero />
            <AppStoreButtons />
            <SocialProof />
          </motion.div>

          {/* Right Column - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <PhoneMockup imageSrc="/assets/screenshot.png" />
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 lg:mt-32"
        >
          <FeaturesGrid />
        </motion.div>
      </main>
    </div>
  )
}

export default App

