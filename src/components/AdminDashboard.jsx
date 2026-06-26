import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const [offers, setOffers] = useState([])
  const [newOffer, setNewOffer] = useState({
    image: '',
    branch: 'all',
    title: '',
    description: '',
  })
  const navigate = useNavigate()

  // Load offers from localStorage on mount
  useEffect(() => {
    const savedOffers = localStorage.getItem('adiyashOffers')
    if (savedOffers) {
      setOffers(JSON.parse(savedOffers))
    }
  }, [])

  // Save offers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('adiyashOffers', JSON.stringify(offers))
  }, [offers])

  const branches = [
    'all',
    'kurla',
    'vikhroli',
    'kandivali',
    'asalfa-unisex',
    'asalfa-ladies',
    'marol',
    'vfour9'
  ]

  const handleAddOffer = (e) => {
    e.preventDefault()
    if (newOffer.image && newOffer.branch) {
      const offer = {
        id: Date.now(),
        ...newOffer,
        createdAt: new Date().toISOString(),
      }
      setOffers([...offers, offer])
      setNewOffer({ image: '', branch: 'all', title: '', description: '' })
    }
  }

  const handleDeleteOffer = (id) => {
    if (window.confirm('Delete this offer?')) {
      setOffers(offers.filter(offer => offer.id !== id))
    }
  }

  const handleLogout = () => {
    navigate('/admin')
  }

  return (
    <section className="min-h-screen bg-black py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-heading text-4xl text-offwhite">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg font-body hover:bg-red-500/30 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Add Offer Form */}
        <div className="bg-black/50 border border-offwhite/10 rounded-lg p-6 mb-8">
          <h2 className="font-heading text-2xl text-offwhite mb-4">Add New Offer</h2>
          <form onSubmit={handleAddOffer} className="space-y-4">
            <div>
              <label className="font-body text-offwhite/60 text-sm block mb-1">Image URL</label>
              <input
                type="text"
                placeholder="https://example.com/offer-image.jpg"
                value={newOffer.image}
                onChange={(e) => setNewOffer({ ...newOffer, image: e.target.value })}
                className="w-full bg-black/50 border border-offwhite/10 rounded-lg px-4 py-2 text-offwhite font-body focus:outline-none focus:border-purple"
                required
              />
            </div>
            <div>
              <label className="font-body text-offwhite/60 text-sm block mb-1">Branch</label>
              <select
                value={newOffer.branch}
                onChange={(e) => setNewOffer({ ...newOffer, branch: e.target.value })}
                className="w-full bg-black/50 border border-offwhite/10 rounded-lg px-4 py-2 text-offwhite font-body focus:outline-none focus:border-purple"
                required
              >
                {branches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch === 'all' ? 'All Branches' : branch.charAt(0).toUpperCase() + branch.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-body text-offwhite/60 text-sm block mb-1">Offer Title (optional)</label>
              <input
                type="text"
                placeholder="Summer Special - 50% Off"
                value={newOffer.title}
                onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                className="w-full bg-black/50 border border-offwhite/10 rounded-lg px-4 py-2 text-offwhite font-body focus:outline-none focus:border-purple"
              />
            </div>
            <div>
              <label className="font-body text-offwhite/60 text-sm block mb-1">Description (optional)</label>
              <input
                type="text"
                placeholder="Get 50% off your first month"
                value={newOffer.description}
                onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                className="w-full bg-black/50 border border-offwhite/10 rounded-lg px-4 py-2 text-offwhite font-body focus:outline-none focus:border-purple"
              />
            </div>
            <button
              type="submit"
              className="bg-purple text-offwhite px-6 py-2 rounded-lg font-heading uppercase tracking-wider hover:bg-purple-light transition-all"
            >
              Add Offer
            </button>
          </form>
        </div>

        {/* Offers List */}
        <div>
          <h2 className="font-heading text-2xl text-offwhite mb-4">Manage Offers ({offers.length})</h2>
          {offers.length === 0 ? (
            <p className="font-body text-offwhite/40">No offers added yet. Add your first offer above!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {offers.map((offer) => (
                <div key={offer.id} className="bg-black/50 border border-offwhite/10 rounded-lg overflow-hidden">
                  <img src={offer.image} alt={offer.title || 'Offer'} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        {offer.title && <h3 className="font-heading text-offwhite text-lg">{offer.title}</h3>}
                        <p className="font-body text-offwhite/50 text-sm">
                          Branch: {offer.branch === 'all' ? 'All Branches' : offer.branch.charAt(0).toUpperCase() + offer.branch.slice(1)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteOffer(offer.id)}
                        className="text-red-400 hover:text-red-300 font-body text-sm"
                      >
                        ✕
                      </button>
                    </div>
                    {offer.description && <p className="font-body text-offwhite/60 text-sm">{offer.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default AdminDashboard