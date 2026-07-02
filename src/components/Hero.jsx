import { siteConfig } from '../content/siteData'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { trackWhatsAppLead } from '../lib/tracking'

const Hero = () => {
  const handleBookTrial = () => {
    trackWhatsAppLead('all', 'hero_book_trial')
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        poster="/hero-poster.jpg"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        <img src="/hero-fallback.jpg" alt="Adiyash Gym" className="w-full h-full object-cover" />
      </video>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-['Anton'] text-[#832D81] text-5xl sm:text-7xl md:text-8xl lg:text-9xl flex items-center justify-center gap-1 flex-wrap"
        >
          <span>AD</span>
          <img 
            src="/red-mark.png" 
            alt="" 
            className="h-[0.85em] inline-block align-middle" 
          />
          <span>YASH</span>
          <span className="text-white">GYM</span>
        </motion.h1>
        
        {/* Tagline */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          className="font-body text-2xl sm:text-3xl md:text-4xl text-white/90 max-w-3xl mx-auto mb-4 font-light tracking-wide"
        >
          We Make Your Life Fitter and Better
        </motion.p>
        
        {/* 24x7 Line */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
          className="font-['Anton'] text-3xl sm:text-4xl md:text-5xl tracking-wider mb-8 text-white"
        >
          we are open{' '}
          <span className="text-red-500">24</span>
          <span className="text-purple">x</span>
          <span className="text-white">7</span>
          {' '}across Mumbai
        </motion.p>
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.7 }}
        >
          <Link
            to="/select-branch"
            onClick={handleBookTrial}
            className="inline-block bg-purple text-white px-12 py-5 rounded-full font-heading text-lg uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105 shadow-2xl"
          >
            Book a Free Trial
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero