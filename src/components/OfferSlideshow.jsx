import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'

const OfferSlideshow = () => {
  const [offers, setOffers] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

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
    if (offers.length <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [offers.length])

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

  // No offers — Offers Coming Soon
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
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-2xl overflow-hidden shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #3d0f4a 0%, #5B1F6E 40%, #7B2D8E 70%, #2a0a33 100%)'
            }}
          >
            {/* Background pattern — subtle texture */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 80px)'
              }}
            />

            <div className="relative z-10 px-6 py-10 md:px-16 md:py-14 flex flex-col md:flex-row items-center gap-8">

              {/* Left — text content */}
              <div className="flex-1 text-center md:text-left">
                <span className="inline-block bg-white/20 text-white text-xs font-heading uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                  {getBranchName(currentOffer.branch)}
                </span>

                {currentOffer.title && (
                  <h3 className="font-['Anton'] text-3xl md:text-4xl lg:text-5xl text-white uppercase tracking-wide leading-tight mb-3">
                    {currentOffer.title}
                  </h3>
                )}

                {currentOffer.description && (
                  <p className="font-body text-white/80 text-base md:text-lg mb-6 max-w-md">
                    {currentOffer.description}
                  </p>
                )}

                <Link
                  to={`/offer/${currentOffer.id}`}
                  state={{ offer: currentOffer }}
                  className="inline-block bg-white text-purple px-8 py-3 rounded-full font-heading text-sm uppercase tracking-wider hover:bg-white/90 transition-all hover:scale-105 shadow-xl"
                >
                  Get This Offer
                </Link>
              </div>

              {/* Right — highlight pill (big bold text like 50% OFF or ₹999/month) */}
              {currentOffer.highlight && (
                <div className="flex-shrink-0 bg-white/10 border-2 border-white/30 rounded-2xl px-8 py-6 text-center backdrop-blur-sm">
                  <p className="font-['Anton'] text-4xl md:text-5xl lg:text-6xl text-white leading-none">
                    {currentOffer.highlight}
                  </p>
                </div>
              )}
            </div>

            {/* Dots */}
            {offers.length > 1 && (
              <div className="relative z-10 flex justify-center gap-2 pb-4">
                {offers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-white w-8' : 'bg-white/30 w-4'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default OfferSlideshow