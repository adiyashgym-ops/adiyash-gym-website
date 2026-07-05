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

  return (
    <section className="w-full bg-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-2xl overflow-hidden shadow-lg h-[340px] md:h-[380px]">
          {/* Background */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #3d0f4a 0%, #5B1F6E 40%, #7B2D8E 70%, #2a0a33 100%)'
            }}
          />

          {/* Background pattern */}
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
              className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 md:px-12 py-6"
            >
              {/* Branch Tag */}
              <span className="inline-block bg-white/20 text-white text-[10px] md:text-xs font-heading uppercase tracking-widest px-4 py-1 rounded-full mb-3">
                {getBranchName(currentOffer.branch)}
              </span>

              {/* Title */}
              {currentOffer.title && (
                <h3 className="font-['Anton'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white uppercase tracking-wide leading-tight mb-2 max-w-3xl">
                  {currentOffer.title}
                </h3>
              )}

              {/* Highlight */}
              {currentOffer.highlight && (
                <p className="font-['Anton'] text-3xl md:text-4xl text-white/90 mb-2">
                  {currentOffer.highlight}
                </p>
              )}

              {/* Description — amounts highlighted in yellow */}
              {currentOffer.description && (
                <p className="font-body text-white/80 text-sm sm:text-base md:text-lg mb-5 max-w-2xl leading-relaxed">
                  {currentOffer.description.split('•').map((item, index) => {
                    const trimmed = item.trim()
                    if (trimmed.includes('Months →') || trimmed.includes('₹')) {
                      return (
                        <span key={index} className="font-['Anton'] text-yellow-300 text-base sm:text-lg md:text-xl">
                          • {trimmed}{' '}
                        </span>
                      )
                    }
                    return <span key={index}>{index === 0 ? trimmed : '• ' + trimmed}{' '}</span>
                  })}
                </p>
              )}

              {/* CTA Button */}
              <Link
                to="/offer"
                className="inline-block bg-white text-purple px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-heading text-xs sm:text-sm uppercase tracking-wider hover:bg-white/90 transition-all hover:scale-105 shadow-xl"
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
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                aria-label="Previous offer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                aria-label="Next offer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Dots */}
          {offers.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
              {offers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-white w-8' : 'bg-white/30 w-4 hover:bg-white/50'
                  }`}
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