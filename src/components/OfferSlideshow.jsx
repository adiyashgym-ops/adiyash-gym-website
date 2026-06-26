import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const OfferSlideshow = () => {
  const [offers, setOffers] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  // Load offers from localStorage
  useEffect(() => {
    const savedOffers = localStorage.getItem('adiyashOffers')
    if (savedOffers) {
      const allOffers = JSON.parse(savedOffers)
      setOffers(allOffers)
    }
  }, [])

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (offers.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [offers.length])

  // If no offers, don't show anything
  if (offers.length === 0) {
    return null
  }

  const currentOffer = offers[currentIndex]

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

  // Get WhatsApp number for branch
  const getWhatsAppNumber = (branchId) => {
    const branchMap = {
      'kurla': '918291743902',
      'vikhroli': '918291432839',
      'kandivali': '919324337728',
      'asalfa-unisex': '918268652812',
      'asalfa-ladies': '91869565863',
      'marol': '918104579053',
      'vfour9': '918879410763',
    }
    return branchMap[branchId] || '919076633653' // fallback to main number
  }

  return (
    <section className="relative w-full bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-xl overflow-hidden border border-offwhite/10">
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
              <span className="bg-purple text-offwhite text-xs font-heading uppercase tracking-wider px-3 py-1 rounded-full">
                {getBranchName(currentOffer.branch)}
              </span>
              {currentOffer.title && (
                <span className="text-offwhite font-heading text-xl md:text-2xl">
                  {currentOffer.title}
                </span>
              )}
            </div>
            {currentOffer.description && (
              <p className="text-offwhite/80 font-body text-sm md:text-base mb-3">
                {currentOffer.description}
              </p>
            )}
            <Link
              to={`/offer/${currentOffer.id}`}
              state={{ offer: currentOffer }}
              className="inline-block bg-purple text-offwhite px-6 py-2 rounded-full font-heading text-sm uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105"
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
                  index === currentIndex ? 'bg-purple w-6' : 'bg-offwhite/30'
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