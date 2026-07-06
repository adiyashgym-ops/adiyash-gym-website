import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { trackLead } from '../lib/leadTracker'
import LeadModal from './LeadModal'

const OfferForm = () => {
  const navigate = useNavigate()
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOffer, setSelectedOffer] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalBranch, setModalBranch] = useState('')
  const [branchName, setBranchName] = useState('')

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
    if (offer.branch !== 'all') {
      setModalBranch(offer.branch)
      setBranchName(getBranchName(offer.branch))
      setIsModalOpen(true)
    } else {
      navigate('/select-branch')
    }
  }

  const handleModalSubmit = async (name, phone) => {
    await trackLead(name, phone, modalBranch, 'offer_get_this_offer')
    const branch = allBranches.find(b => b.id === modalBranch)
    const message = `Hi! I'm interested in this offer: ${selectedOffer?.title || 'Special Offer'}`
    window.open(`https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(message)}`, '_blank')
    setIsModalOpen(false)
    navigate('/')
  }

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
    <>
      <section className="min-h-screen bg-cream pt-28 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-body text-xs uppercase tracking-widest text-purple/60 mb-2">Exclusive Deals</p>
            <h1 className="font-['Anton'] text-4xl md:text-5xl text-ink uppercase tracking-wide">
              Current Offers
            </h1>
            <p className="font-body text-ink/50 mt-3">Select an offer below to claim it</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {offers.map((offer) => {
              const { benefits, amounts } = getAmountLines(offer.description)
              return (
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
                  {selectedOffer?.id === offer.id && (
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center z-10">
                      <span className="text-purple text-lg">✓</span>
                    </div>
                  )}

                  <div className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 80px)'
                    }}
                  />

                  <div className="relative z-10 p-7 flex flex-col gap-3">
                    <div>
                      <span className="inline-block bg-white/20 text-white text-xs font-heading uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                        {getBranchName(offer.branch)}
                      </span>
                      {offer.title && (
                        <h3 className="font-['Anton'] text-2xl md:text-3xl text-white uppercase tracking-wide leading-tight mb-2">
                          {offer.title}
                        </h3>
                      )}
                      {benefits.length > 0 && (
                        <p className="font-body text-white/70 text-sm leading-relaxed">
                          {benefits.join(' • ')}
                        </p>
                      )}
                    </div>

                    {/* Full-width Amount Box - YELLOW HIGHLIGHT */}
                    {amounts.length > 0 && (
                      <div className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl py-2 px-4">
                        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
                          {amounts.map((amount, index) => (
                            <div key={index} className="text-center">
                              <p className="font-['Anton'] text-yellow-300 text-base sm:text-lg md:text-xl whitespace-nowrap">
                                {amount}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-2">
                      <span className={`inline-block text-xs font-heading uppercase tracking-wider px-4 py-2 rounded-full transition-all ${
                        selectedOffer?.id === offer.id
                          ? 'bg-white text-purple'
                          : 'bg-white/20 text-white'
                      }`}>
                        {selectedOffer?.id === offer.id ? '✓ Selected' : 'Tap to Select'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <LeadModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedOffer(null)
        }}
        branch={modalBranch}
        branchName={branchName}
        onSubmit={handleModalSubmit}
      />
    </>
  )
}

export default OfferForm