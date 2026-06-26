import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const OfferForm = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { offer } = location.state || {}

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // If no offer data, redirect home
  if (!offer) {
    navigate('/')
    return null
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
    return branchMap[branchId] || '919076633653'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (name && phone) {
      const branchId = offer.branch || 'all'
      const whatsappNumber = getWhatsAppNumber(branchId)
      
      // Auto-message
      const message = `Hi! I'm interested in this offer: ${offer.title || 'Special Offer'}%0A%0AName: ${name}%0APhone: ${phone}`
      
      // Redirect to WhatsApp
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
      setSubmitted(true)
      
      // Go back to home after 2 seconds
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
              <button
                type="submit"
                className="w-full bg-purple text-offwhite py-3 rounded-lg font-heading uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-[1.02]"
              >
                Chat on WhatsApp
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