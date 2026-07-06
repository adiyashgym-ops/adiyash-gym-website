import { siteConfig } from '../content/siteData'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedCard from './AnimatedCard'
import { useState, useEffect } from 'react'
import { trackLead } from '../lib/leadTracker'
import LeadModal from './LeadModal'

const AllLocations = () => {
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [slideshowOpen, setSlideshowOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalBranch, setModalBranch] = useState(null)
  const [branchName, setBranchName] = useState('')

  const handleWhatsAppClick = (branchId, branchName) => {
    setModalBranch(branchId)
    setBranchName(branchName)
    setIsModalOpen(true)
  }

  const handleModalSubmit = async (name, phone) => {
    await trackLead(name, phone, modalBranch, 'all_locations_page')
    
    const branch = siteConfig.branches.find(b => b.id === modalBranch)
    const message = `Hi! I'm interested in joining Adiyash Gym at ${branch.name}`
    
    window.open(`https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(message)}`, '_blank')
    setIsModalOpen(false)
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
    <>
      <section className="min-h-screen bg-cream py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="text-purple hover:text-purple-light font-body mb-6 inline-block">
            ← Back to Home
          </Link>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-['Anton'] text-[#832D81] text-4xl md:text-6xl lg:text-7xl flex items-center justify-center gap-1 flex-wrap mb-4"
          >
            <span>AD</span>
            <img 
              src="/red-mark.png" 
              alt="" 
              className="h-[0.85em] inline-block align-middle" 
            />
            <span>YASH</span>
            <span className="text-ink">LOCATIONS</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-lg md:text-xl text-ink/60 text-center max-w-2xl mx-auto mb-12"
          >
            Find your nearest Adiyash Gym across Mumbai
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {siteConfig.branches.map((location, index) => (
              <AnimatedCard key={location.id} delay={index * 0.1}>
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
                    <h3 className="font-heading text-2xl text-ink mb-2">{location.name}</h3>
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
                        className="bg-purple text-white px-4 py-2 rounded-lg font-body text-sm hover:bg-purple-light transition-all"
                      >
                        📍 Get Directions
                      </a>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleWhatsAppClick(location.id, location.name)
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg font-body text-sm hover:bg-green-400 transition-all"
                      >
                        💬 Chat on WhatsApp
                      </button>
                      <a
                        href={`https://instagram.com/${location.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="bg-purple/10 text-purple text-sm font-body px-4 py-2 rounded-lg hover:bg-purple/20 transition-all"
                      >
                        📸 Instagram
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
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
              <button
                className="absolute top-4 right-4 text-white text-4xl hover:text-purple transition-colors z-10"
                onClick={closeSlideshow}
              >
                ✕
              </button>

              <div className="absolute top-4 left-4 text-white font-heading text-xl z-10">
                {selectedBranch.name}
                <span className="text-white/50 text-sm font-body ml-2">
                  {currentImageIndex + 1} / {selectedBranch.gallery.length}
                </span>
              </div>

              <div className="relative w-full h-full flex items-center justify-center p-8 md:p-12" onClick={(e) => e.stopPropagation()}>
                <img 
                  src={selectedBranch.gallery[currentImageIndex]} 
                  alt={`${selectedBranch.name} ${currentImageIndex + 1}`}
                  className="max-w-full max-h-[85vh] object-contain"
                />

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

      {/* Lead Modal */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        branch={modalBranch}
        branchName={branchName}
        onSubmit={handleModalSubmit}
      />
    </>
  )
}

export default AllLocations