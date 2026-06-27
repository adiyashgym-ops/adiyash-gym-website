import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const [offers, setOffers] = useState([])
  const [pendingOffers, setPendingOffers] = useState([])
  const [showPublishSuccess, setShowPublishSuccess] = useState(false)
  const [newOffer, setNewOffer] = useState({
    image: '',
    imageFile: null,
    branch: 'all',
    title: '',
    description: '',
  })
  const navigate = useNavigate()

  useEffect(() => {
    const savedOffers = localStorage.getItem('adiyashOffers')
    if (savedOffers) {
      setOffers(JSON.parse(savedOffers))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('adiyashOffers', JSON.stringify(offers))
  }, [offers])

  const branches = [
    { id: 'all', name: 'All Branches' },
    { id: 'kurla', name: 'Kurla' },
    { id: 'vikhroli', name: 'Vikhroli' },
    { id: 'kandivali', name: 'Kandivali' },
    { id: 'asalfa-unisex', name: 'Asalfa Unisex' },
    { id: 'asalfa-ladies', name: 'Asalfa Ladies' },
    { id: 'marol', name: 'Marol' },
    { id: 'vfour9', name: 'Vfour9' },
  ]

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewOffer({ ...newOffer, image: reader.result, imageFile: file })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddToList = (e) => {
    e.preventDefault()
    if (newOffer.image && newOffer.branch) {
      const existing = pendingOffers.find(o => o.branch === newOffer.branch)
      if (existing) {
        alert(`You already have an offer for ${branches.find(b => b.id === newOffer.branch)?.name}. Remove it first if you want to change.`)
        return
      }
      
      setPendingOffers([...pendingOffers, { 
        ...newOffer, 
        id: Date.now(),
        createdAt: new Date().toISOString() 
      }])
      setNewOffer({ image: '', imageFile: null, branch: 'all', title: '', description: '' })
    }
  }

  const handlePublishAll = () => {
    if (pendingOffers.length === 0) {
      alert('No offers to publish!')
      return
    }
    setOffers([...offers, ...pendingOffers])
    setPendingOffers([])
    setShowPublishSuccess(true)
  }

  const handleRemovePending = (index) => {
    const updated = [...pendingOffers]
    updated.splice(index, 1)
    setPendingOffers(updated)
  }

  const handleDeleteOffer = (id) => {
    if (window.confirm('Delete this offer?')) {
      setOffers(offers.filter(offer => offer.id !== id))
    }
  }

  const handleLogout = () => {
    navigate('/')
  }

  const getBranchName = (id) => {
    return branches.find(b => b.id === id)?.name || id
  }

  return (
    <section className="min-h-screen bg-cream py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-heading text-4xl text-ink">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500/20 text-red-500 px-4 py-2 rounded-lg font-body hover:bg-red-500/30 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Add Offer Form */}
        <div className="bg-white border border-ink/10 rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="font-heading text-2xl text-ink mb-4">Add Offer to List</h2>
          <form onSubmit={handleAddToList} className="space-y-4">
            <div>
              <label className="font-body text-ink/60 text-sm block mb-1">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-2 text-ink font-body file:bg-purple file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer hover:file:bg-purple-light transition-all"
                required
              />
              {newOffer.image && (
                <img src={newOffer.image} alt="Preview" className="mt-2 h-20 object-cover rounded-lg" />
              )}
            </div>
            <div>
              <label className="font-body text-ink/60 text-sm block mb-1">Branch</label>
              <select
                value={newOffer.branch}
                onChange={(e) => setNewOffer({ ...newOffer, branch: e.target.value })}
                className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-2 text-ink font-body focus:outline-none focus:border-purple"
                required
              >
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-body text-ink/60 text-sm block mb-1">Offer Title (optional)</label>
              <input
                type="text"
                placeholder="Summer Special - 50% Off"
                value={newOffer.title}
                onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-2 text-ink font-body focus:outline-none focus:border-purple"
              />
            </div>
            <div>
              <label className="font-body text-ink/60 text-sm block mb-1">Description (optional)</label>
              <input
                type="text"
                placeholder="Get 50% off your first month"
                value={newOffer.description}
                onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-2 text-ink font-body focus:outline-none focus:border-purple"
              />
            </div>
            <button
              type="submit"
              className="bg-purple text-white px-6 py-2 rounded-lg font-heading uppercase tracking-wider hover:bg-purple-light transition-all"
            >
              Add to List
            </button>
          </form>
        </div>

        {/* Pending Offers List */}
        {pendingOffers.length > 0 && (
          <div className="bg-white border border-purple/30 rounded-lg p-6 mb-8 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-heading text-2xl text-ink">Pending Offers ({pendingOffers.length})</h2>
              <button
                onClick={handlePublishAll}
                className="bg-green-500 text-white px-6 py-2 rounded-lg font-heading uppercase tracking-wider hover:bg-green-400 transition-all"
              >
                Publish All Offers
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingOffers.map((offer, index) => (
                <div key={index} className="bg-cream border border-ink/10 rounded-lg overflow-hidden">
                  <img src={offer.image} alt={offer.title || 'Offer'} className="w-full h-32 object-cover" />
                  <div className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-body text-ink/60 text-xs">Branch: {getBranchName(offer.branch)}</p>
                        {offer.title && <p className="font-body text-ink text-sm">{offer.title}</p>}
                      </div>
                      <button
                        onClick={() => handleRemovePending(index)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Publish Success Message */}
        {showPublishSuccess && (
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-6 mb-8 text-center">
            <h2 className="font-heading text-2xl text-ink mb-2">✅ Offers Published Successfully!</h2>
            <p className="font-body text-ink/60 mb-4">All your offers are now live on the homepage.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-purple text-white px-8 py-3 rounded-lg font-heading uppercase tracking-wider hover:bg-purple-light transition-all"
            >
              Go to Homepage
            </button>
          </div>
        )}

        {/* Published Offers List */}
        <div>
          <h2 className="font-heading text-2xl text-ink mb-4">Published Offers ({offers.length})</h2>
          {offers.length === 0 ? (
            <p className="font-body text-ink/40">No offers published yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {offers.map((offer) => (
                <div key={offer.id} className="bg-white border border-ink/10 rounded-lg overflow-hidden shadow-sm">
                  <img src={offer.image} alt={offer.title || 'Offer'} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        {offer.title && <h3 className="font-heading text-ink text-lg">{offer.title}</h3>}
                        <p className="font-body text-ink/50 text-sm">
                          Branch: {getBranchName(offer.branch)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteOffer(offer.id)}
                        className="text-red-400 hover:text-red-300 font-body text-sm"
                      >
                        ✕
                      </button>
                    </div>
                    {offer.description && <p className="font-body text-ink/60 text-sm">{offer.description}</p>}
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