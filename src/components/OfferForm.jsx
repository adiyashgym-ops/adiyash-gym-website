import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { trackWhatsAppLead } from '../lib/tracking'

const OfferForm = () => {
  const navigate = useNavigate()
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOffer, setSelectedOffer] = useState(null)
  const [selectedBranch, setSelectedBranch] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const allBranches = [
    { id: 'kurla', name: 'Kurla', whatsapp: '918291743902' },
    { id: 'vikhroli', name: 'Vikhroli', whatsapp: '918291432839' },
    { id: 'kandivali', name: 'Kandivali', whatsapp: '919324337728' },
    { id: 'asalfa-unisex', name: 'Asalfa Unisex', whatsapp: '918268652812' },
    { id: 'asalfa-ladies', name: 'Asalfa Ladies', whatsapp: '919869565863' },
    { id: 'marol', name: 'Marol', whatsapp: '918104579053' },
    { id: 'vfour9', name: 'Vfour9', whatsapp: '918879410763' },
  ]

  const getBranchName = (id) => {
    const map = {
      'all': 'All Branches', 'kurla': 'Kurla', 'vikhroli': 'Vikhroli',
      'kandivali': 'Kandivali', 'asalfa-unisex': 'Asalfa Unisex',
      'asalfa-ladies': 'Asalfa Ladies', 'marol': 'Marol', 'vfour9': 'Vfour9',
    }
    return map[id] || id
  }

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const { data, error } = await supabase
          .from('offers')
          .select('*')
          .order('created_at', { ascending: false })
        if (!error) setOffers(data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadOffers()
  }, [])

  const handleSelectOffer = (offer) => {
    setSelectedOffer(offer)
    setSelectedBranch(offer.branch !== 'all' ? offer.branch : '')
    setSubmitted(false)
    // Smooth scroll to branch selection
    setTimeout(() => {
      document.getElementById('branch-section')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedBranch || !selectedOffer) return
    const branch = allBranches.find(b => b.id === selectedBranch)
    trackWhatsAppLead(selectedBranch, 'offer_get_this_offer')
    const message = `Hi! I'm interested in this offer: ${selectedOffer.title || 'Special Offer'}`
    window.open(`https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(message)}`, '_blank')
    setSubmitted(true)
    setTimeout(() => navigate('/'), 2500)
  }

  if (loading) {
    return (
      <section className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-ink font-body">Loading offers...</div>
      </section>
    )
  }

  if (offers.length === 0) {
    return (
      <section className="min-h-screen bg-cream flex items-center justify-center px-4 py-20">
        <div className="text-center">
          <h2 className="font-heading text-3xl text-ink mb-3">No Active Offers</h2>
          <p className="font-body text-ink/50 mb-6">Check back soon for exclusive deals.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-purple text-white px-8 py-3 rounded-full font-heading text-sm uppercase tracking-wider hover:bg-purple-light transition-all"
          >
            Go Home
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-cream pt-28 pb-20 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Page heading */}
        <div className="text-center mb-10">
          <p className="font-body text-xs uppercase tracking-widest text-purple/60 mb-2">Exclusive Deals</p>
          <h1 className="font-['Anton'] text-4xl md:text-5xl text-ink uppercase tracking-wide">
            Current Offers
          </h1>
          <p className="font-body text-ink/50 mt-3">Select an offer below to claim it</p>
        </div>

        {/* All Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {offers.map((offer) => (
            <motion.div
              key={offer.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleSelectOffer(offer)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer shadow-md transition-all duration-300 ${
                selectedOffer?.id === offer.id
                  ? 'ring-4 ring-purple shadow-xl shadow-purple/20'
                  : 'ring-1 ring-ink/10'
              }`}
              style={{
                background: 'linear-gradient(135deg, #3d0f4a 0%, #5B1F6E 40%, #7B2D8E 70%, #2a0a33 100%)'
              }}
            >
              {/* Selected checkmark */}
              {selectedOffer?.id === offer.id && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center z-10">
                  <span className="text-purple text-lg">✓</span>
                </div>
              )}

              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 80px)'
                }}
              />

              <div className="relative z-10 p-7 flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex-1">
                  <span className="inline-block bg-white/20 text-white text-xs font-heading uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                    {getBranchName(offer.branch)}
                  </span>
                  {offer.title && (
                    <h3 className="font-['Anton'] text-2xl md:text-3xl text-white uppercase tracking-wide leading-tight mb-2">
                      {offer.title}
                    </h3>
                  )}
                  {offer.description && (
                    <p className="font-body text-white/70 text-sm">{offer.description}</p>
                  )}
                </div>
                {offer.highlight && (
                  <div className="flex-shrink-0 bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-center">
                    <p className="font-['Anton'] text-3xl md:text-4xl text-white">{offer.highlight}</p>
                  </div>
                )}
              </div>

              {/* Select button */}
              <div className="relative z-10 px-7 pb-6">
                <span className={`inline-block text-xs font-heading uppercase tracking-wider px-4 py-2 rounded-full transition-all ${
                  selectedOffer?.id === offer.id
                    ? 'bg-white text-purple'
                    : 'bg-white/20 text-white'
                }`}>
                  {selectedOffer?.id === offer.id ? '✓ Selected' : 'Tap to Select'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Branch Selection — appears after offer is selected */}
        <AnimatePresence>
          {selectedOffer && (
            <motion.div
              id="branch-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
              className="max-w-md mx-auto"
            >
              {!submitted ? (
                <div className="bg-white border border-ink/10 rounded-2xl p-8 shadow-sm">
                  <h2 className="font-heading text-2xl text-ink text-center mb-1">
                    Select Your Branch
                  </h2>
                  <p className="font-body text-ink/50 text-center text-sm mb-6">
                    Choose your nearest Adiyash Gym location
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <select
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                      className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors"
                      required
                    >
                      <option value="">Select a branch...</option>
                      {allBranches.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                          {branch.name}
                        </option>
                      ))}
                    </select>

                    <button
                      type="submit"
                      disabled={!selectedBranch}
                      className={`w-full py-3 rounded-lg font-heading uppercase tracking-wider transition-all ${
                        selectedBranch
                          ? 'bg-purple text-white hover:bg-purple-light hover:scale-[1.02]'
                          : 'bg-purple/30 text-white/50 cursor-not-allowed'
                      }`}
                    >
                      {selectedBranch ? 'Chat on WhatsApp' : 'Select a branch first'}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-8 bg-white border border-ink/10 rounded-2xl shadow-sm">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="font-heading text-2xl text-ink mb-2">Redirecting to WhatsApp...</h3>
                  <p className="font-body text-ink/60">Please wait while we connect you.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}

export default OfferForm