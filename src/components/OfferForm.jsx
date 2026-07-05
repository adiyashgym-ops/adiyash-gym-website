import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { trackWhatsAppLead } from '../lib/tracking'

const OfferForm = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { offer } = location.state || {}

  const [selectedBranch, setSelectedBranch] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [branchesWithOffers, setBranchesWithOffers] = useState([])
  const [loading, setLoading] = useState(true)

  const allBranches = [
    { id: 'kurla', name: 'Kurla', whatsapp: '918291743902' },
    { id: 'vikhroli', name: 'Vikhroli', whatsapp: '918291432839' },
    { id: 'kandivali', name: 'Kandivali', whatsapp: '919324337728' },
    { id: 'asalfa-unisex', name: 'Asalfa Unisex', whatsapp: '918268652812' },
    { id: 'asalfa-ladies', name: 'Asalfa Ladies', whatsapp: '919869565863' },
    { id: 'marol', name: 'Marol', whatsapp: '918104579053' },
    { id: 'vfour9', name: 'Vfour9', whatsapp: '918879410763' },
  ]

  useEffect(() => {
    const fetchBranchesWithOffers = async () => {
      try {
        const { data, error } = await supabase
          .from('offers')
          .select('branch')
        
        if (error) {
          console.error('Error fetching branches:', error)
          setBranchesWithOffers([])
        } else {
          const uniqueBranches = [...new Set(data.map(item => item.branch))]
          setBranchesWithOffers(uniqueBranches)
        }
      } catch (err) {
        console.error('Error:', err)
        setBranchesWithOffers([])
      } finally {
        setLoading(false)
      }
    }
    fetchBranchesWithOffers()
  }, [])

  if (!offer) {
    navigate('/')
    return null
  }

  let availableBranches = []

  if (offer.branch === 'all') {
    availableBranches = allBranches.filter(b => branchesWithOffers.includes(b.id))
  } else {
    availableBranches = allBranches.filter(b => b.id === offer.branch)
  }

  useEffect(() => {
    if (availableBranches.length === 1 && !selectedBranch) {
      setSelectedBranch(availableBranches[0].id)
    }
  }, [availableBranches, selectedBranch])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (selectedBranch) {
      const branch = allBranches.find(b => b.id === selectedBranch)
      
      trackWhatsAppLead(selectedBranch, 'offer_get_this_offer')
      
      const whatsappNumber = branch.whatsapp
      const message = `Hi! I'm interested in this offer: ${offer.title || 'Special Offer'}`
      
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
      setSubmitted(true)
      
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }

  if (loading) {
    return (
      <section className="min-h-screen bg-cream flex items-center justify-center px-4 py-20">
        <div className="text-ink font-body">Loading...</div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-cream flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full">
        {/* Offer Card */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <img 
            src={offer.image} 
            alt={offer.title || 'Offer'} 
            className="w-full h-64 object-cover"
          />
          
          {/* Red Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-red-800/70 to-red-700/40"></div>
          
          {/* Content - No duplicate title */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            {offer.title && (
              <h2 className="font-['Anton'] text-3xl md:text-4xl text-white uppercase tracking-wide leading-tight mb-2">
                {offer.title}
              </h2>
            )}
            
            {offer.description && (
              <p className="font-body text-white/90 text-sm md:text-base mb-4">
                {offer.description}
              </p>
            )}
          </div>
        </div>

        {/* Branch Selection */}
        {!submitted ? (
          <div className="bg-white border border-ink/10 rounded-lg p-6 mt-4 shadow-sm">
            <h3 className="font-heading text-xl text-ink mb-4">
              {availableBranches.length === 1 ? 'Confirm Your Branch' : 'Select Your Branch'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                {availableBranches.length === 1 ? (
                  <div className="bg-cream border border-purple/30 rounded-lg px-4 py-3 text-ink font-body">
                    {availableBranches[0].name}
                    <input type="hidden" value={availableBranches[0].id} />
                  </div>
                ) : availableBranches.length === 0 ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 font-body">
                    No branches currently have active offers. Please check back later.
                  </div>
                ) : (
                  <>
                    <label className="font-body text-ink/60 text-sm block mb-1">
                      Choose a branch
                    </label>
                    <select
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                      className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors"
                      required
                    >
                      <option value="">-- Select Branch --</option>
                      {availableBranches.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                          {branch.name}
                        </option>
                      ))}
                    </select>
                  </>
                )}
                {!selectedBranch && availableBranches.length > 1 && (
                  <p className="text-purple text-xs mt-1">Please select a branch to continue</p>
                )}
              </div>

              {availableBranches.length > 0 && (
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
              )}
            </form>
          </div>
        ) : (
          <div className="text-center py-8 bg-white border border-ink/10 rounded-lg shadow-sm mt-4">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="font-heading text-2xl text-ink mb-2">Redirecting to WhatsApp...</h3>
            <p className="font-body text-ink/60">Please wait while we connect you.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default OfferForm