import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const OfferForm = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { offer } = location.state || {}

  const [selectedBranch, setSelectedBranch] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!offer) {
    navigate('/')
    return null
  }

  const allBranches = [
    { id: 'kurla', name: 'Kurla', whatsapp: '918291743902' },
    { id: 'vikhroli', name: 'Vikhroli', whatsapp: '918291432839' },
    { id: 'kandivali', name: 'Kandivali', whatsapp: '919324337728' },
    { id: 'asalfa-unisex', name: 'Asalfa Unisex', whatsapp: '918268652812' },
    { id: 'asalfa-ladies', name: 'Asalfa Ladies', whatsapp: '919869565863' },
    { id: 'marol', name: 'Marol', whatsapp: '918104579053' },
    { id: 'vfour9', name: 'Vfour9', whatsapp: '918879410763' },
  ]

  const allOffers = JSON.parse(localStorage.getItem('adiyashOffers') || '[]')
  const branchesWithOffers = [...new Set(allOffers.map(o => o.branch))]

  let availableBranches = []

  if (offer.branch === 'all') {
    availableBranches = allBranches.filter(b => branchesWithOffers.includes(b.id))
  } else {
    availableBranches = allBranches.filter(b => b.id === offer.branch)
  }

  if (availableBranches.length === 1 && !selectedBranch) {
    setSelectedBranch(availableBranches[0].id)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (selectedBranch) {
      const branch = allBranches.find(b => b.id === selectedBranch)
      const whatsappNumber = branch.whatsapp
      const message = `Hi! I'm interested in this offer: ${offer.title || 'Special Offer'}`
      
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
      setSubmitted(true)
      
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }

  return (
    <section className="min-h-screen bg-cream flex items-center justify-center px-4 py-20">
      <div className="bg-white border border-ink/10 rounded-lg p-8 max-w-md w-full shadow-sm">
        {/* Offer Preview */}
        <div className="mb-6">
          <img 
            src={offer.image} 
            alt={offer.title || 'Offer'} 
            className="w-full h-40 object-cover rounded-lg mb-3"
          />
          <h2 className="font-heading text-2xl text-ink">{offer.title || 'Special Offer'}</h2>
          <p className="font-body text-ink/60 text-sm">{offer.description}</p>
          {offer.branch === 'all' && (
            <p className="font-body text-purple text-xs mt-1">Available at selected branches</p>
          )}
          {offer.branch !== 'all' && (
            <p className="font-body text-purple text-xs mt-1">Available at {availableBranches[0]?.name}</p>
          )}
        </div>

        {!submitted ? (
          <>
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
                {!selectedBranch && (
                  <p className="text-purple text-xs mt-1">Please select a branch to continue</p>
                )}
              </div>

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
          </>
        ) : (
          <div className="text-center py-8">
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