import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'

const OfferSlideshow = () => {
  const [offers, setOffers] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  // Load offers from Supabase
  useEffect(() => {
    const loadOffers = async () => {
      try {
        const { data, error } = await supabase
          .from('offers')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) {
          console.error('Error loading offers:', error)
          setOffers([])
        } else {
          setOffers(data || [])
        }
      } catch (err) {
        console.error('Error:', err)
        setOffers([])
      } finally {
        setLoading(false)
      }
    }
    loadOffers()
  }, [])

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (offers.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [offers.length])

  // Get branch name for display
  const getBranchName = (branchId) => {
    const branchMap = {
      'all': 'All Branches',
      'kurla': 'Kurla',
      'vikhroli': 'Vikhroli',
      'kandivali': 'Kandivali',
      'asalfa-unisex': 'Asalfa Unisex',
      'asalfa-ladies': 'Asalfa Ladies',
      'marol': 'Marol',
      'vfour9': 'Vfour9',
    }
    return branchMap[branchId] || branchId
  }

  // Skeleton loading state
  if (loading) {
    return (
      <section className="relative w-full bg-cream py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-xl overflow-hidden border border-ink/10 shadow-sm bg-white p-12 text-center animate-pulse">
            <div className="flex flex-col items-center gap-4">
              <div className="w-full h-48 md:h-64 bg-ink/5 rounded-lg"></div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="h-6 w-20 bg-ink/5 rounded-full"></div>
                <div className="h-8 w-40 bg-ink/5 rounded"></div>
              </div>
              <div className="h-4 w-48 bg-ink/5 rounded"></div>
              <div className="h-10 w-32 bg-ink/5 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // If no offers, show text-only placeholder with color-changing effect
  if (offers.length === 0) {
    return (
      <section className="relative w-full bg-gradient-to-br from-purple/5 via-white to-purple/5 py-16 md:py-20 border-y border-purple/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="font-['Anton'] text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider mb-4"
              animate={{
                color: ['#5B1F6E', '#7B2D8E', '#9B4DAE', '#5B1F6E'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              New Offers Loading
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-body text-base md:text-lg text-ink/50 max-w-xl mx-auto mb-8 leading-relaxed"
            >
              We're crafting exclusive deals for you.
              <br />
              Join now and be the first to grab them.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <Link
                to="/select-branch"
                className="inline-block bg-purple text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-heading text-sm md:text-base uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105 shadow-lg shadow-purple/20"
              >
                Join Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    )
  }

  const currentOffer = offers[currentIndex]

  return (
    <section className="relative w-full bg-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-xl overflow-hidden border border-ink/10 shadow-sm">
          {/* Offer Image */}
          <img 
            src={currentOffer.image} 
            alt={currentOffer.title || 'Offer'} 
            className="w-full h-48 md:h-64 object-cover"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="bg-purple text-white text-xs font-heading uppercase tracking-wider px-3 py-1 rounded-full">
                {getBranchName(currentOffer.branch)}
              </span>
              {currentOffer.title && (
                <span className="text-white font-heading text-xl md:text-2xl">
                  {currentOffer.title}
                </span>
              )}
            </div>
            {currentOffer.description && (
              <p className="text-white/80 font-body text-sm md:text-base mb-3">
                {currentOffer.description}
              </p>
            )}
            <Link
              to={`/offer/${currentOffer.id}`}
              state={{ offer: currentOffer }}
              className="inline-block bg-purple text-white px-6 py-2 rounded-full font-heading text-sm uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105"
            >
              Get This Offer
            </Link>
          </div>

          {/* Dots indicator */}
          <div className="absolute bottom-20 right-6 flex gap-2">
            {offers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-purple w-6' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OfferSlideshow