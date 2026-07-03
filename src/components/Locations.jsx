import { siteConfig } from '../content/siteData'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedCard from './AnimatedCard'
import { useState, useEffect } from 'react'
import { trackWhatsAppLead } from '../lib/tracking'

const Locations = () => {
  const homeLocations = siteConfig.branches.slice(0, 6)
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [slideshowOpen, setSlideshowOpen] = useState(false)

  const handleWhatsAppClick = (branchId) => {
    trackWhatsAppLead(branchId, 'locations_page')
  }

  const openSlideshow = (branch) => {
    if (!branch.gallery || branch.gallery.length === 0) return
    setSelectedBranch(branch)
    setCurrentImageIndex(0)
    setSlideshowOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeSlideshow = () => {
    setSlideshowOpen(false)
    setSelectedBranch(null)
    document.body.style.overflow = 'auto'
  }

  const nextImage = () => {
    if (selectedBranch) {
      setCurrentImageIndex((prev) => 
        prev === selectedBranch.gallery.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedBranch) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedBranch.gallery.length - 1 : prev - 1
      )
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeSlideshow()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedBranch])

  return (
    <section className="py-16 md:py-24 bg-cream/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider text-ink text-center mb-4"
        >
          Our Locations
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-body text-lg md:text-xl text-ink/60 text-center max-w-2xl mx-auto mb-12"
        >
          7 gyms across Mumbai to serve you better
        </motion.p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {homeLocations.map((location, index) => (
            <AnimatedCard key={index} delay={index * 0.1}>
              <div 
                className="bg-white border border-ink/10 rounded-lg overflow-hidden hover:border-purple/50 transition-all hover:scale-[1.02] shadow-sm cursor-pointer"
                onClick={() => openSlideshow(location)}
              >
                <img 
                  src={location.image} 
                  alt={location.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-heading text-ink text-xl mb-2">{location.name}</h3>
                  <p className="font-body text-ink/60 text-sm mb-2">{location.address}</p>
                  <p className="font-body text-purple text-xs mb-3">⏰ {location.timings}</p>
                  
                  {/* View Gallery Text */}
                  {location.gallery && location.gallery.length > 0 && (
                    <div className="mb-3">
                      <span 
                        className="text-purple text-sm font-body hover:underline cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          openSlideshow(location)
                        }}
                      >
                        📸 View Gallery ({location.gallery.length} photos)
                      </span>
                    </div>
                  )}
                  
                  {location.gallery && location.gallery.length === 0 && (
                    <div className="text-center py-2 mb-3">
                      <span className="text-ink/40 text-xs font-body bg-ink/5 px-3 py-1 rounded-full">
                        📸 Coming Soon
                      </span>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={location.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple text-sm font-body hover:text-purple-light transition-colors"
                    >
                      Get Directions →
                    </a>
                    <a
                      href={`https://wa.me/${location.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleWhatsAppClick(location.id)
                      }}
                      className="bg-green-500/10 text-green-600 text-sm font-body px-3 py-1 rounded-full hover:bg-green-500/20 transition-colors"
                    >
                      💬 WhatsApp
                    </a>
                    <a
                      href={`https://instagram.com/${location.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-ink/40 hover:text-purple text-sm font-body px-3 py-1 rounded-full hover:bg-purple/10 transition-colors"
                    >
                      📸 Instagram
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to="/locations"
            className="inline-block bg-purple text-white px-8 py-3 rounded-full font-heading text-sm uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105"
          >
            View All Locations →
          </Link>
        </motion.div>
      </div>

      {/* Full-Screen Slideshow */}
      <AnimatePresence>
        {slideshowOpen && selectedBranch && selectedBranch.gallery && selectedBranch.gallery.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeSlideshow}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white text-4xl hover:text-purple transition-colors z-10"
              onClick={closeSlideshow}
            >
              ✕
            </button>

            {/* Branch Name */}
            <div className="absolute top-4 left-4 text-white font-heading text-xl z-10">
              {selectedBranch.name}
              <span className="text-white/50 text-sm font-body ml-2">
                {currentImageIndex + 1} / {selectedBranch.gallery.length}
              </span>
            </div>

            {/* Main Image */}
            <div className="relative w-full h-full flex items-center justify-center p-8 md:p-12" onClick={(e) => e.stopPropagation()}>
              <img 
                src={selectedBranch.gallery[currentImageIndex]} 
                alt={`${selectedBranch.name} ${currentImageIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain"
              />

              {/* Navigation Arrows */}
              {selectedBranch.gallery.length > 1 && (
                <>
                  <button
                    className="absolute left-4 text-white text-4xl hover:text-purple transition-colors bg-black/30 hover:bg-black/50 p-3 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                  >
                    ‹
                  </button>
                  <button
                    className="absolute right-4 text-white text-4xl hover:text-purple transition-colors bg-black/30 hover:bg-black/50 p-3 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                  >
                    ›
                  </button>
                </>
              )}

              {/* Dot Indicators */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
                {selectedBranch.gallery.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex 
                        ? 'bg-purple w-6' 
                        : 'bg-white/30 hover:bg-white/60'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentImageIndex(index)
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Locations