import { motion } from 'framer-motion'
import { Twitter, Instagram, Mail } from 'lucide-react'

const Footer = () => {
  return (
    // CHANGED: Removed 'bg-...' entirely. 
    // Added 'border-orange-500/10' for a subtle divider that fits the theme.
    <footer className="py-12 border-t border-orange-500/10 relative z-10">
      <div className="container mx-auto px-4 flex flex-col items-center gap-8">
        
        {/* Social Links */}
        <div className="flex items-center gap-6">
          <motion.a 
            href="#" 
            whileHover={{ y: -3, color: '#F18E48' }}
            className="text-slate-500/80 transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </motion.a>
          <motion.a 
            href="#" 
            whileHover={{ y: -3, color: '#F18E48' }}
            className="text-slate-500/80 transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </motion.a>
          <motion.a 
            href="mailto:hello@spontaneous.app" 
            whileHover={{ y: -3, color: '#F18E48' }}
            className="text-slate-500/80 transition-colors"
          >
            <Mail className="w-5 h-5" />
          </motion.a>
        </div>

        {/* Legal Links */}
        <div className="flex gap-6 text-sm font-medium text-slate-500">
          <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Support</a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-400 font-medium">
          © {new Date().getFullYear()} Spontaneous. All rights reserved.
        </div>
        
      </div>
    </footer>
  )
}

export default Footer