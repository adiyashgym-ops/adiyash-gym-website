import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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

  // If loading
  if (loading) {
    return (
      <section className="relative w-full bg-cream py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-xl overflow-hidden border border-ink/10 shadow-sm bg-white p-12 text-center">
            <p className="font-body text-ink/60">Loading offers...</p>
          </div>
        </div>
      </section>
    )
  }

  // If no offers, show "Coming Soon" placeholder
  if (offers.length === 0) {
    return (
      <section className="relative w-full bg-cream py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-xl overflow-hidden border border-ink/10 shadow-sm">
            <img 
              src="/offers-coming-soon.jpg" 
              alt="Offers Coming Soon" 
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h2 className="font-heading text-3xl md:text-5xl text-white">
                Offers Coming Soon
              </h2>
              <p className="font-body text-white/70 text-lg mt-2">
                Stay tuned for exciting deals and discounts!
              </p>
              <div className="mt-4">
                <span className="inline-block bg-purple text-white px-6 py-2 rounded-full font-heading text-sm uppercase tracking-wider">
                  Join Now
                </span>
              </div>
            </div>
          </div>
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
            className="w-full h-64 md:h-96 object-cover"
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