import { siteConfig } from '../content/siteData'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { trackWhatsAppLead } from '../lib/tracking'

const Hero = () => {
  const handleBookTrial = () => {
    trackWhatsAppLead('all', 'hero_book_trial')
  }

  return (
    <section className="relative h-[60vw] min-h-[250px] md:min-h-screen md:max-h-[700px] flex items-center justify-center overflow-hidden pt-12 md:pt-20 pb-12">
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
      <div className="absolute inset-0 bg-black/70"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-['Anton'] text-[#832D81] text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl flex items-center justify-center gap-1 flex-wrap text-3d"
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
          className="font-body text-sm sm:text-lg md:text-2xl lg:text-3xl text-white/90 max-w-3xl mx-auto mb-2 font-light tracking-wide"
        >
          We Make Your Life Fitter and Better
        </motion.p>
        
        {/* 24x7 Line */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
          className="font-['Anton'] text-base sm:text-xl md:text-3xl lg:text-4xl tracking-wider mb-4 text-white"
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
            className="inline-block bg-purple text-white px-4 sm:px-8 md:px-10 py-1.5 sm:py-3 md:py-4 rounded-full font-heading text-xs sm:text-base md:text-lg uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105 shadow-2xl"
          >
            Book a Free Trial
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero