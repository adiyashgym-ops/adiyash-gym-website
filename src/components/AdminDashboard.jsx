import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts'

const AdminDashboard = () => {
  const [offers, setOffers] = useState([])
  const [pendingOffers, setPendingOffers] = useState([])
  const [toast, setToast] = useState(null)
  const [newOffer, setNewOffer] = useState({
    image: '',
    imageFile: null,
    branch: 'all',
    title: '',
    description: '',
  })
  const [loading, setLoading] = useState(true)
  const [publishing, setPublishing] = useState(false)
  const [activeTab, setActiveTab] = useState('offers')
  const [visits, setVisits] = useState({ today: 0, month: 0, year: 0 })
  const [leads, setLeads] = useState({ today: 0, month: 0, year: 0 })
  const [leadsByBranch, setLeadsByBranch] = useState([])
  const [leadsTable, setLeadsTable] = useState([])
  const [dateFilter, setDateFilter] = useState('today')
  const navigate = useNavigate()

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
        } else {
          setOffers(data || [])
        }
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }
    loadOffers()
  }, [])

  // Load analytics data
  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        const yearStart = new Date(now.getFullYear(), 0, 1)

        // Get visits counts
        const { data: visitsData } = await supabase
          .from('site_visits')
          .select('created_at')

        const visitCounts = { today: 0, month: 0, year: 0 }
        visitsData?.forEach(v => {
          const d = new Date(v.created_at)
          if (d >= today) visitCounts.today++
          if (d >= monthStart) visitCounts.month++
          if (d >= yearStart) visitCounts.year++
        })
        setVisits(visitCounts)

        // Get leads counts
        const { data: leadsData } = await supabase
          .from('website_leads')
          .select('branch, source, created_at')
          .order('created_at', { ascending: false })

        const leadCounts = { today: 0, month: 0, year: 0 }
        const branchMap = {}
        const tableData = []

        leadsData?.forEach(l => {
          const d = new Date(l.created_at)
          if (d >= today) leadCounts.today++
          if (d >= monthStart) leadCounts.month++
          if (d >= yearStart) leadCounts.year++
          
          // Branch count
          const branchName = l.branch || 'unknown'
          if (!branchMap[branchName]) branchMap[branchName] = 0
          branchMap[branchName]++

          // Table data
          tableData.push({
            branch: branchName,
            source: l.source || 'unknown',
            date: d.toLocaleDateString(),
            time: d.toLocaleTimeString(),
            created_at: l.created_at
          })
        })

        setLeads(leadCounts)

        // Branch chart data
        const chartData = Object.keys(branchMap).map(key => ({
          name: key.charAt(0).toUpperCase() + key.slice(1),
          leads: branchMap[key]
        }))
        setLeadsByBranch(chartData)

        // Table data (newest first)
        setLeadsTable(tableData)

      } catch (err) {
        console.error('Error loading analytics:', err)
      }
    }

    if (activeTab === 'reports') {
      loadAnalytics()
    }
  }, [activeTab])

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
        setToast({
          type: 'error',
          message: `You already have an offer for ${branches.find(b => b.id === newOffer.branch)?.name}. Remove it first.`
        })
        setTimeout(() => setToast(null), 3000)
        return
      }
      
      setPendingOffers([...pendingOffers, { 
        ...newOffer, 
        createdAt: new Date().toISOString() 
      }])
      setNewOffer({ image: '', imageFile: null, branch: 'all', title: '', description: '' })
      setToast({
        type: 'success',
        message: '✅ Added to list!'
      })
      setTimeout(() => setToast(null), 2000)
    }
  }

  const handlePublishAll = async () => {
    if (pendingOffers.length === 0) {
      setToast({
        type: 'error',
        message: '❌ No offers to publish!'
      })
      setTimeout(() => setToast(null), 3000)
      return
    }

    setPublishing(true)
    
    try {
      const offersToInsert = pendingOffers.map(o => ({
        image: o.image,
        branch: o.branch,
        title: o.title || '',
        description: o.description || '',
      }))

      const { data, error } = await supabase
        .from('offers')
        .insert(offersToInsert)
        .select()

      if (error) {
        setToast({
          type: 'error',
          message: '❌ Failed to Publish — Please Try Again'
        })
        setTimeout(() => setToast(null), 3000)
      } else {
        setOffers([...offers, ...data])
        setPendingOffers([])
        setToast({
          type: 'success',
          message: '✅ Offer Published Successfully'
        })
        setTimeout(() => {
          setToast(null)
          navigate('/')
        }, 3000)
      }
    } catch (err) {
      setToast({
        type: 'error',
        message: '❌ Failed to Publish — Please Try Again'
      })
      setTimeout(() => setToast(null), 3000)
    } finally {
      setPublishing(false)
    }
  }

  const handleRemovePending = (index) => {
    const updated = [...pendingOffers]
    updated.splice(index, 1)
    setPendingOffers(updated)
  }

  const handleDeleteOffer = async (id) => {
    if (!window.confirm('Delete this offer?')) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('offers')
        .delete()
        .eq('id', id)

      if (error) {
        setToast({
          type: 'error',
          message: '❌ Failed to delete offer'
        })
        setTimeout(() => setToast(null), 3000)
      } else {
        setOffers(offers.filter(offer => offer.id !== id))
        setToast({
          type: 'success',
          message: '✅ Offer deleted successfully'
        })
        setTimeout(() => setToast(null), 2000)
      }
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    navigate('/')
  }

  const getBranchName = (id) => {
    return branches.find(b => b.id === id)?.name || id
  }

  // Filter leads table by date
  const filteredLeads = () => {
    const now = new Date()
    let filterDate = new Date()
    
    if (dateFilter === 'today') {
      filterDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    } else if (dateFilter === 'week') {
      filterDate = new Date(now)
      filterDate.setDate(filterDate.getDate() - 7)
    } else if (dateFilter === 'month') {
      filterDate = new Date(now.getFullYear(), now.getMonth(), 1)
    } else if (dateFilter === 'year') {
      filterDate = new Date(now.getFullYear(), 0, 1)
    }

    return leadsTable.filter(l => new Date(l.created_at) >= filterDate)
  }

  if (loading && activeTab === 'offers') {
    return (
      <section className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-ink font-body">Loading offers...</div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-cream py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-lg shadow-lg font-body text-white text-sm ${
                toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>

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

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-ink/10">
          <button
            onClick={() => setActiveTab('offers')}
            className={`pb-3 px-4 font-heading text-sm uppercase tracking-wider transition-colors ${
              activeTab === 'offers'
                ? 'text-purple border-b-2 border-purple'
                : 'text-ink/40 hover:text-ink'
            }`}
          >
            Offers Management
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`pb-3 px-4 font-heading text-sm uppercase tracking-wider transition-colors ${
              activeTab === 'reports'
                ? 'text-purple border-b-2 border-purple'
                : 'text-ink/40 hover:text-ink'
            }`}
          >
            Reports & Analytics
          </button>
        </div>

        {/* Offers Management Tab */}
        {activeTab === 'offers' && (
          <>
            {/* Add Offer Form */}
            <div className="bg-white border border-ink/10 rounded-lg p-6 mb-8 shadow-sm">
              <h2 className="font-heading text-2xl text-ink mb-4">Add Offer to List</h2>
              
              {/* Image Guidelines */}
              <div className="bg-purple/5 border border-purple/20 rounded-lg p-4 mb-4 text-sm font-body text-ink/70">
                <p className="font-semibold text-ink mb-1">📋 Image Guidelines:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Recommended size: 1200 x 500px (landscape banner)</li>
                  <li>Format: JPG or PNG</li>
                  <li>Max file size: 2MB</li>
                  <li>Keep important text/offer details centered — edges may get cropped on mobile</li>
                </ul>
              </div>

              <form onSubmit={handleAddToList} className="space-y-4">
                <div>
                  <label className="font-body text-ink/60 text-sm block mb-1">Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-2 text-ink font-body file:bg-purple file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer hover:file:bg-purple-light transition-all"
                    required
                    disabled={publishing}
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
                    disabled={publishing}
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
                    disabled={publishing}
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
                    disabled={publishing}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-purple text-white px-6 py-2 rounded-lg font-heading uppercase tracking-wider hover:bg-purple-light transition-all disabled:opacity-50"
                  disabled={publishing}
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
                    className="bg-green-500 text-white px-6 py-2 rounded-lg font-heading uppercase tracking-wider hover:bg-green-400 transition-all disabled:opacity-50"
                    disabled={publishing}
                  >
                    {publishing ? 'Publishing...' : 'Publish All Offers'}
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
                            disabled={publishing}
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
                            disabled={publishing}
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
          </>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div>
            <h2 className="font-heading text-2xl text-ink mb-6">Analytics & Reports</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white border border-ink/10 rounded-lg p-4 shadow-sm">
                <p className="font-body text-ink/40 text-sm uppercase tracking-wider">Visits Today</p>
                <p className="font-heading text-3xl text-purple">{visits.today}</p>
              </div>
              <div className="bg-white border border-ink/10 rounded-lg p-4 shadow-sm">
                <p className="font-body text-ink/40 text-sm uppercase tracking-wider">Leads Today</p>
                <p className="font-heading text-3xl text-purple">{leads.today}</p>
              </div>
              <div className="bg-white border border-ink/10 rounded-lg p-4 shadow-sm col-span-2 md:col-span-1">
                <p className="font-body text-ink/40 text-sm uppercase tracking-wider">Conversion Rate</p>
                <p className="font-heading text-3xl text-purple">
                  {visits.today > 0 ? Math.round((leads.today / visits.today) * 100) : 0}%
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white border border-ink/10 rounded-lg p-4 shadow-sm">
                <p className="font-body text-ink/40 text-sm uppercase tracking-wider">Visits This Month</p>
                <p className="font-heading text-2xl text-purple">{visits.month}</p>
              </div>
              <div className="bg-white border border-ink/10 rounded-lg p-4 shadow-sm">
                <p className="font-body text-ink/40 text-sm uppercase tracking-wider">Leads This Month</p>
                <p className="font-heading text-2xl text-purple">{leads.month}</p>
              </div>
              <div className="bg-white border border-ink/10 rounded-lg p-4 shadow-sm col-span-2 md:col-span-1">
                <p className="font-body text-ink/40 text-sm uppercase tracking-wider">Month Conversion</p>
                <p className="font-heading text-2xl text-purple">
                  {visits.month > 0 ? Math.round((leads.month / visits.month) * 100) : 0}%
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white border border-ink/10 rounded-lg p-4 shadow-sm">
                <p className="font-body text-ink/40 text-sm uppercase tracking-wider">Visits This Year</p>
                <p className="font-heading text-2xl text-purple">{visits.year}</p>
              </div>
              <div className="bg-white border border-ink/10 rounded-lg p-4 shadow-sm">
                <p className="font-body text-ink/40 text-sm uppercase tracking-wider">Leads This Year</p>
                <p className="font-heading text-2xl text-purple">{leads.year}</p>
              </div>
              <div className="bg-white border border-ink/10 rounded-lg p-4 shadow-sm col-span-2 md:col-span-1">
                <p className="font-body text-ink/40 text-sm uppercase tracking-wider">Year Conversion</p>
                <p className="font-heading text-2xl text-purple">
                  {visits.year > 0 ? Math.round((leads.year / visits.year) * 100) : 0}%
                </p>
              </div>
            </div>

            {/* Leads by Branch Chart */}
            <div className="bg-white border border-ink/10 rounded-lg p-6 shadow-sm mb-8">
              <h3 className="font-heading text-xl text-ink mb-4">Leads by Branch</h3>
              {leadsByBranch.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={leadsByBranch} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip />
                    <Bar dataKey="leads" fill="#5B1F6E" radius={[4, 4, 0, 0]}>
                      {leadsByBranch.map((entry, index) => (
                        <Cell key={index} fill={entry.leads > 0 ? '#5B1F6E' : '#ddd'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="font-body text-ink/40 text-center py-8">No lead data yet</p>
              )}
            </div>

            {/* Leads Table */}
            <div className="bg-white border border-ink/10 rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading text-xl text-ink">All Leads</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDateFilter('today')}
                    className={`px-3 py-1 rounded text-sm font-body transition-colors ${
                      dateFilter === 'today' ? 'bg-purple text-white' : 'bg-cream text-ink/60 hover:text-ink'
                    }`}
                  >
                    Today
                  </button>
                  <button
                    onClick={() => setDateFilter('week')}
                    className={`px-3 py-1 rounded text-sm font-body transition-colors ${
                      dateFilter === 'week' ? 'bg-purple text-white' : 'bg-cream text-ink/60 hover:text-ink'
                    }`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setDateFilter('month')}
                    className={`px-3 py-1 rounded text-sm font-body transition-colors ${
                      dateFilter === 'month' ? 'bg-purple text-white' : 'bg-cream text-ink/60 hover:text-ink'
                    }`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setDateFilter('year')}
                    className={`px-3 py-1 rounded text-sm font-body transition-colors ${
                      dateFilter === 'year' ? 'bg-purple text-white' : 'bg-cream text-ink/60 hover:text-ink'
                    }`}
                  >
                    Year
                  </button>
                </div>
              </div>
              {filteredLeads().length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm font-body">
                    <thead className="bg-cream">
                      <tr>
                        <th className="text-left py-2 px-3 text-ink/60 font-semibold">Branch</th>
                        <th className="text-left py-2 px-3 text-ink/60 font-semibold">Source</th>
                        <th className="text-left py-2 px-3 text-ink/60 font-semibold">Date</th>
                        <th className="text-left py-2 px-3 text-ink/60 font-semibold">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads().map((lead, index) => (
                        <tr key={index} className="border-t border-ink/5 hover:bg-cream/50">
                          <td className="py-2 px-3 text-ink">{lead.branch}</td>
                          <td className="py-2 px-3 text-ink/60">{lead.source}</td>
                          <td className="py-2 px-3 text-ink/60">{lead.date}</td>
                          <td className="py-2 px-3 text-ink/60">{lead.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="font-body text-ink/40 text-center py-8">No leads for this period</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default AdminDashboard