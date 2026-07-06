import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'

const OfferSlideshow = () => {
  const [offers, setOffers] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const { data, error } = await supabase
          .from('offers')
          .select('*')
          .order('created_at', { ascending: false })
        if (error) {
          setOffers([])
        } else {
          setOffers(data || [])
        }
      } catch (err) {
        setOffers([])
      } finally {
        setLoading(false)
      }
    }
    loadOffers()
  }, [])

  useEffect(() => {
    if (offers.length <= 1 || isPaused) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [offers.length, isPaused])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? offers.length - 1 : prev - 1))
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 5000)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % offers.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 5000)
  }

  const goToIndex = (index) => {
    setCurrentIndex(index)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 5000)
  }

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

  if (loading) return null

  if (offers.length === 0) {
    return (
      <section className="w-full bg-gradient-to-br from-purple/10 via-white to-purple/5 py-14 border-y border-purple/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-xs uppercase tracking-widest text-purple/60 mb-3">
              Exclusive Member Deals
            </p>
            <h2 className="font-['Anton'] text-4xl md:text-5xl lg:text-6xl text-ink uppercase tracking-wider mb-3">
              Offers Coming Soon
            </h2>
            <p className="font-body text-ink/50 text-base md:text-lg mb-8 max-w-md mx-auto">
              Something special is being prepared for you. Join now before the deals drop.
            </p>
            <Link
              to="/select-branch"
              className="inline-block bg-purple text-white px-8 py-3 rounded-full font-heading text-sm uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105 shadow-lg shadow-purple/20"
            >
              Join Now
            </Link>
          </motion.div>
        </div>
      </section>
    )
  }

  const currentOffer = offers[currentIndex]

  // Extract amount lines and non-amount lines from description
  const getAmountLines = (description) => {
    if (!description) return { benefits: [], amounts: [] }
    const parts = description.split('•').map(s => s.trim()).filter(Boolean)
    const benefits = []
    const amounts = []
    parts.forEach(part => {
      if (part.includes('Months →') || part.includes('₹')) {
        amounts.push(part)
      } else {
        benefits.push(part)
      }
    })
    return { benefits, amounts }
  }

  const { benefits, amounts } = getAmountLines(currentOffer.description)

  return (
    <section className="w-full bg-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-2xl overflow-hidden shadow-lg h-[340px] md:h-[380px]">
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, #3d0f4a 0%, #5B1F6E 40%, #7B2D8E 70%, #2a0a33 100%)'
          }} />

          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 80px)'
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 md:px-12 py-4"
            >
              {/* Branch Tag */}
              <span className="inline-block bg-white/20 text-white text-[10px] md:text-xs font-heading uppercase tracking-widest px-4 py-1 rounded-full mb-2">
                {getBranchName(currentOffer.branch)}
              </span>

              {/* Title */}
              {currentOffer.title && (
                <h3 className="font-['Anton'] text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white uppercase tracking-wide leading-tight mb-2 max-w-3xl">
                  {currentOffer.title}
                </h3>
              )}

              {/* Benefits (non-amount description) */}
              {benefits.length > 0 && (
                <p className="font-body text-white/70 text-xs sm:text-sm md:text-base mb-2 max-w-2xl leading-relaxed">
                  {benefits.join(' • ')}
                </p>
              )}

              {/* Full-width Amount Box - YELLOW HIGHLIGHT */}
              {amounts.length > 0 && (
                <div className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl py-2 px-3 md:py-3 md:px-5 mb-3">
                  <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
                    {amounts.map((amount, index) => (
                      <div key={index} className="text-center">
                        <p className="font-['Anton'] text-yellow-300 text-sm sm:text-base md:text-xl lg:text-2xl whitespace-nowrap">
                          {amount}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Button */}
              <Link
                to="/offer"
                className="inline-block bg-white text-purple px-6 sm:px-8 py-2 sm:py-2.5 rounded-full font-heading text-xs sm:text-sm uppercase tracking-wider hover:bg-white/90 transition-all hover:scale-105 shadow-xl"
              >
                Get This Offer
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {offers.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Dots */}
          {offers.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-20">
              {offers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white w-6 md:w-8' : 'bg-white/30 w-3 md:w-4 hover:bg-white/50'}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default OfferSlideshow