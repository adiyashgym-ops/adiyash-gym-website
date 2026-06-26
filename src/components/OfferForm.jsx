import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const OfferForm = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { offer } = location.state || {}

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // If no offer data, redirect home
  if (!offer) {
    navigate('/')
    return null
  }

  // Get all branches with WhatsApp numbers
  const branches = [
    { id: 'kurla', name: 'Kurla', whatsapp: '918291743902' },
    { id: 'vikhroli', name: 'Vikhroli', whatsapp: '918291432839' },
    { id: 'kandivali', name: 'Kandivali', whatsapp: '919324337728' },
    { id: 'asalfa-unisex', name: 'Asalfa Unisex', whatsapp: '918268652812' },
    { id: 'asalfa-ladies', name: 'Asalfa Ladies', whatsapp: '919869565863' },
    { id: 'marol', name: 'Marol', whatsapp: '918104579053' },
    { id: 'vfour9', name: 'Vfour9', whatsapp: '918879410763' },
  ]

  // If offer is for a specific branch, only show that branch
  const availableBranches = offer.branch === 'all' 
    ? branches 
    : branches.filter(b => b.id === offer.branch)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (name && phone && selectedBranch) {
      const branch = branches.find(b => b.id === selectedBranch)
      const whatsappNumber = branch.whatsapp
      
      const message = `Hi! I'm interested in this offer: ${offer.title || 'Special Offer'}%0A%0AName: ${name}%0APhone: ${phone}`
      
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
      setSubmitted(true)
      
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-4 py-20">
      <div className="bg-black/50 border border-offwhite/10 rounded-lg p-8 max-w-md w-full">
        {/* Offer Preview */}
        <div className="mb-6">
          <img 
            src={offer.image} 
            alt={offer.title || 'Offer'} 
            className="w-full h-40 object-cover rounded-lg mb-3"
          />
          <h2 className="font-heading text-2xl text-offwhite">{offer.title || 'Special Offer'}</h2>
          <p className="font-body text-offwhite/60 text-sm">{offer.description}</p>
          {offer.branch === 'all' && (
            <p className="font-body text-purple text-xs mt-1">Available at all branches</p>
          )}
        </div>

        {!submitted ? (
          <>
            <h3 className="font-heading text-xl text-offwhite mb-4">Claim This Offer</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-body text-offwhite/60 text-sm block mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/50 border border-offwhite/10 rounded-lg px-4 py-3 text-offwhite font-body focus:outline-none focus:border-purple transition-colors"
                  required
                />
              </div>
              <div>
                <label className="font-body text-offwhite/60 text-sm block mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-black/50 border border-offwhite/10 rounded-lg px-4 py-3 text-offwhite font-body focus:outline-none focus:border-purple transition-colors"
                  required
                />
              </div>
              
              {/* Branch Selection */}
              <div>
                <label className="font-body text-offwhite/60 text-sm block mb-1">
                  Select Branch
                  {offer.branch === 'all' && <span className="text-purple text-xs ml-1">(required)</span>}
                </label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full bg-black/50 border border-offwhite/10 rounded-lg px-4 py-3 text-offwhite font-body focus:outline-none focus:border-purple transition-colors"
                  required
                >
                  <option value="">-- Select Branch --</option>
                  {availableBranches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
                {offer.branch === 'all' && !selectedBranch && (
                  <p className="text-purple text-xs mt-1">Please select a branch to continue</p>
                )}
              </div>

              <button
                type="submit"
                disabled={!selectedBranch}
                className={`w-full py-3 rounded-lg font-heading uppercase tracking-wider transition-all ${
                  selectedBranch 
                    ? 'bg-purple text-offwhite hover:bg-purple-light hover:scale-[1.02]' 
                    : 'bg-purple/30 text-offwhite/50 cursor-not-allowed'
                }`}
              >
                {selectedBranch ? 'Chat on WhatsApp' : 'Select a branch first'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="font-heading text-2xl text-offwhite mb-2">Redirecting to WhatsApp...</h3>
            <p className="font-body text-offwhite/60">Please wait while we connect you.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default OfferForm