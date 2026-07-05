import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from 'recharts'

const AdminDashboard = () => {
  const [offers, setOffers] = useState([])
  const [pendingOffers, setPendingOffers] = useState([])
  const [toast, setToast] = useState(null)
  const [newOffer, setNewOffer] = useState({
    branch: 'all',
    title: '',
    highlight: '',
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
  
  // ===== NEW: Bulk Upload State =====
  const [bulkText, setBulkText] = useState('')
  
  const navigate = useNavigate()

  const showToast = (type, message) => {
    setToast({ type, message })
    setTimeout(() => setToast(null), 3000)
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

  useEffect(() => {
    if (activeTab !== 'reports') return
    const loadAnalytics = async () => {
      try {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        const yearStart = new Date(now.getFullYear(), 0, 1)

        const { data: visitsData } = await supabase.from('site_visits').select('created_at')
        const visitCounts = { today: 0, month: 0, year: 0 }
        visitsData?.forEach(v => {
          const d = new Date(v.created_at)
          if (d >= today) visitCounts.today++
          if (d >= monthStart) visitCounts.month++
          if (d >= yearStart) visitCounts.year++
        })
        setVisits(visitCounts)

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
          const bn = l.branch || 'unknown'
          branchMap[bn] = (branchMap[bn] || 0) + 1
          tableData.push({
            branch: bn,
            source: l.source || 'unknown',
            date: d.toLocaleDateString(),
            time: d.toLocaleTimeString(),
            created_at: l.created_at
          })
        })
        setLeads(leadCounts)
        setLeadsByBranch(Object.keys(branchMap).map(k => ({
          name: k.charAt(0).toUpperCase() + k.slice(1),
          leads: branchMap[k]
        })))
        setLeadsTable(tableData)
      } catch (err) {
        console.error(err)
      }
    }
    loadAnalytics()
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

  const getBranchName = (id) => branches.find(b => b.id === id)?.name || id

  const handleAddToList = (e) => {
    e.preventDefault()
    if (!newOffer.title && !newOffer.highlight) {
      showToast('error', '❌ Please enter at least a title or highlight')
      return
    }
    const existing = pendingOffers.find(o => o.branch === newOffer.branch)
    if (existing) {
      showToast('error', `❌ Already have an offer for ${getBranchName(newOffer.branch)}`)
      return
    }
    setPendingOffers([...pendingOffers, { ...newOffer, createdAt: new Date().toISOString() }])
    setNewOffer({ branch: 'all', title: '', highlight: '', description: '' })
    showToast('success', '✅ Added to list!')
  }

  // ===== NEW: Bulk Upload Handler =====
  const handleBulkUpload = async () => {
    if (!bulkText.trim()) {
      showToast('error', '❌ Please paste some offers first!')
      return
    }

    const lines = bulkText.split('\n').filter(line => line.trim())
    const offersToInsert = []

    for (const line of lines) {
      const parts = line.split('|').map(s => s.trim())
      if (parts.length >= 3) {
        const [branchName, title, description] = parts
        const branch = branches.find(b => b.name.toLowerCase() === branchName.toLowerCase())
        if (branch) {
          offersToInsert.push({
            branch: branch.id,
            title: title,
            highlight: '',
            description: description,
            image: '',
          })
        }
      }
    }

    if (offersToInsert.length === 0) {
      showToast('error', '❌ No valid offers found. Format: Branch|Title|Description')
      return
    }

    setPublishing(true)
    try {
      const { data, error } = await supabase.from('offers').insert(offersToInsert).select()
      if (error) {
        showToast('error', '❌ Failed to upload: ' + error.message)
      } else {
        setOffers([...offers, ...data])
        setBulkText('')
        showToast('success', `✅ ${offersToInsert.length} offers uploaded successfully!`)
      }
    } catch (err) {
      showToast('error', '❌ Error: ' + err.message)
    } finally {
      setPublishing(false)
    }
  }

  const handlePublishAll = async () => {
    if (pendingOffers.length === 0) {
      showToast('error', '❌ No offers to publish!')
      return
    }
    setPublishing(true)
    try {
      const offersToInsert = pendingOffers.map(o => ({
        branch: o.branch,
        title: o.title || '',
        highlight: o.highlight || '',
        description: o.description || '',
        image: '',
      }))
      const { data, error } = await supabase.from('offers').insert(offersToInsert).select()
      if (error) {
        showToast('error', '❌ Failed to Publish — Please Try Again')
      } else {
        setOffers([...offers, ...data])
        setPendingOffers([])
        showToast('success', '✅ Offers Published Successfully!')
        setTimeout(() => navigate('/'), 3000)
      }
    } catch (err) {
      showToast('error', '❌ Failed to Publish — Please Try Again')
    } finally {
      setPublishing(false)
    }
  }

  const handleDeleteOffer = async (id) => {
    if (!window.confirm('Delete this offer?')) return
    try {
      const { error } = await supabase.from('offers').delete().eq('id', id)
      if (error) {
        showToast('error', '❌ Failed to delete')
      } else {
        setOffers(offers.filter(o => o.id !== id))
        showToast('success', '✅ Offer deleted')
      }
    } catch (err) {
      showToast('error', '❌ Error: ' + err.message)
    }
  }

  const filteredLeads = () => {
    const now = new Date()
    let filterDate = new Date()
    if (dateFilter === 'today') filterDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    else if (dateFilter === 'week') { filterDate = new Date(now); filterDate.setDate(filterDate.getDate() - 7) }
    else if (dateFilter === 'month') filterDate = new Date(now.getFullYear(), now.getMonth(), 1)
    else if (dateFilter === 'year') filterDate = new Date(now.getFullYear(), 0, 1)
    return leadsTable.filter(l => new Date(l.created_at) >= filterDate)
  }

  if (loading) {
    return (
      <section className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-ink font-body">Loading...</div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-cream py-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-lg shadow-lg font-body text-white text-sm ${
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
            onClick={() => navigate('/')}
            className="bg-red-500/20 text-red-500 px-4 py-2 rounded-lg font-body hover:bg-red-500/30 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-ink/10">
          {['offers', 'reports'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-4 font-heading text-sm uppercase tracking-wider transition-colors ${
                activeTab === tab ? 'text-purple border-b-2 border-purple' : 'text-ink/40 hover:text-ink'
              }`}
            >
              {tab === 'offers' ? 'Offers Management' : 'Reports & Analytics'}
            </button>
          ))}
        </div>

        {/* OFFERS TAB */}
        {activeTab === 'offers' && (
          <>
            {/* ===== NEW: BULK UPLOAD SECTION ===== */}
            <div className="bg-white border border-ink/10 rounded-xl p-6 mb-8 shadow-sm">
              <h2 className="font-heading text-2xl text-ink mb-2">⚡ Quick Bulk Offer Upload</h2>
              <p className="font-body text-ink/60 text-sm mb-3">
                Paste your offers in this format (one per line):
                <br />
                <span className="text-purple text-xs">Branch|Title|Description</span>
              </p>
              
              <p className="font-body text-ink/40 text-xs mb-2 bg-cream p-2 rounded">
                Example: <span className="text-purple">Vfour9|MONSOON Phase One|First 150 Members... 12 Months → ₹9,595/-</span>
              </p>
              
              <textarea
                rows="8"
                placeholder="Vfour9|MONSOON Phase One|First 150 Members... 12 Months → ₹9,595/-"
                className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors mb-4"
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
              />
              
              <div className="flex gap-4">
                <button
                  onClick={handleBulkUpload}
                  disabled={publishing}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg font-heading uppercase tracking-wider hover:bg-green-400 transition-all disabled:opacity-50"
                >
                  📤 Upload All Offers
                </button>
                <button
                  onClick={() => setBulkText('')}
                  className="bg-ink/10 text-ink px-6 py-3 rounded-lg font-body hover:bg-ink/20 transition-all"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Add Offer Form — KEPT EXACTLY AS YOUR BROTHER WROTE IT */}
            <div className="bg-white border border-ink/10 rounded-xl p-6 mb-8 shadow-sm">
              <h2 className="font-heading text-2xl text-ink mb-2">Create New Offer</h2>
              <p className="font-body text-ink/50 text-sm mb-6">Fill in the offer details below. No image needed — it will display as a premium styled card on the homepage automatically.</p>

              <form onSubmit={handleAddToList} className="space-y-4">
                <div>
                  <label className="font-body text-ink/60 text-sm block mb-1">Branch <span className="text-red-400">*</span></label>
                  <select
                    value={newOffer.branch}
                    onChange={(e) => setNewOffer({ ...newOffer, branch: e.target.value })}
                    className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-2 text-ink font-body focus:outline-none focus:border-purple"
                    disabled={publishing}
                  >
                    {branches.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-body text-ink/60 text-sm block mb-1">Offer Title <span className="text-ink/30">(e.g. Monsoon Special)</span></label>
                  <input
                    type="text"
                    placeholder="Monsoon Special"
                    value={newOffer.title}
                    onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                    className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-2 text-ink font-body focus:outline-none focus:border-purple"
                    disabled={publishing}
                  />
                </div>

                <div>
                  <label className="font-body text-ink/60 text-sm block mb-1">Highlight <span className="text-ink/30">(big bold text — e.g. 50% OFF or ₹999/month)</span></label>
                  <input
                    type="text"
                    placeholder="50% OFF"
                    value={newOffer.highlight}
                    onChange={(e) => setNewOffer({ ...newOffer, highlight: e.target.value })}
                    className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-2 text-ink font-body focus:outline-none focus:border-purple"
                    disabled={publishing}
                  />
                  <p className="text-xs text-ink/30 mt-1">This appears as large bold text on the right side of the offer card</p>
                </div>

                <div>
                  <label className="font-body text-ink/60 text-sm block mb-1">Description <span className="text-ink/30">(optional — fine print or extra detail)</span></label>
                  <input
                    type="text"
                    placeholder="Limited time only. First 50 members."
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

            {/* Pending — KEPT EXACTLY AS YOUR BROTHER WROTE IT */}
            {pendingOffers.length > 0 && (
              <div className="bg-white border border-purple/30 rounded-xl p-6 mb-8 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-heading text-2xl text-ink">Pending ({pendingOffers.length})</h2>
                  <button
                    onClick={handlePublishAll}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg font-heading uppercase tracking-wider hover:bg-green-400 transition-all disabled:opacity-50"
                    disabled={publishing}
                  >
                    {publishing ? 'Publishing...' : 'Publish All'}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pendingOffers.map((offer, index) => (
                    <div key={index} className="bg-cream border border-ink/10 rounded-lg p-4 relative">
                      <button
                        onClick={() => setPendingOffers(pendingOffers.filter((_, i) => i !== index))}
                        className="absolute top-3 right-3 text-red-400 hover:text-red-600 text-sm"
                      >✕</button>
                      <span className="text-xs font-heading uppercase text-purple">{getBranchName(offer.branch)}</span>
                      {offer.title && <p className="font-heading text-ink text-base mt-1">{offer.title}</p>}
                      {offer.highlight && <p className="font-['Anton'] text-purple text-2xl">{offer.highlight}</p>}
                      {offer.description && <p className="text-ink/50 text-xs mt-1">{offer.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Published — WITH BIGGER DELETE BUTTONS */}
            <div>
              <h2 className="font-heading text-2xl text-ink mb-4">Live Offers ({offers.length})</h2>
              {offers.length === 0 ? (
                <p className="font-body text-ink/40">No offers live yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {offers.map(offer => (
                    <div key={offer.id} className="bg-white border border-ink/10 rounded-xl p-5 shadow-sm relative">
                      {/* ===== BIGGER DELETE BUTTON ===== */}
                      <button
                        onClick={() => handleDeleteOffer(offer.id)}
                        className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-body hover:bg-red-600 transition-all flex items-center gap-1"
                        disabled={publishing}
                      >
                        🗑️ Delete
                      </button>
                      <span className="text-xs font-heading uppercase text-purple">{getBranchName(offer.branch)}</span>
                      {offer.title && <p className="font-heading text-ink text-lg mt-1">{offer.title}</p>}
                      {offer.highlight && <p className="font-['Anton'] text-purple text-3xl">{offer.highlight}</p>}
                      {offer.description && <p className="font-body text-ink/50 text-sm mt-1">{offer.description}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* REPORTS TAB — KEPT EXACTLY AS YOUR BROTHER WROTE IT */}
        {activeTab === 'reports' && (
          <div>
            <h2 className="font-heading text-2xl text-ink mb-6">Analytics & Reports</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Visits Today', val: visits.today },
                { label: 'Leads Today', val: leads.today },
                { label: 'Conversion Today', val: visits.today > 0 ? Math.round((leads.today / visits.today) * 100) + '%' : '0%' },
                { label: 'Visits This Month', val: visits.month },
                { label: 'Leads This Month', val: leads.month },
                { label: 'Month Conversion', val: visits.month > 0 ? Math.round((leads.month / visits.month) * 100) + '%' : '0%' },
                { label: 'Visits This Year', val: visits.year },
                { label: 'Leads This Year', val: leads.year },
                { label: 'Year Conversion', val: visits.year > 0 ? Math.round((leads.year / visits.year) * 100) + '%' : '0%' },
              ].map((card, i) => (
                <div key={i} className={`bg-white border border-ink/10 rounded-lg p-4 shadow-sm ${i === 2 || i === 5 || i === 8 ? 'col-span-2 md:col-span-1' : ''}`}>
                  <p className="font-body text-ink/40 text-xs uppercase tracking-wider">{card.label}</p>
                  <p className="font-heading text-3xl text-purple">{card.val}</p>
                </div>
              ))}
            </div>

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
                      {leadsByBranch.map((_, index) => (
                        <Cell key={index} fill="#5B1F6E" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="font-body text-ink/40 text-center py-8">No lead data yet</p>
              )}
            </div>

            <div className="bg-white border border-ink/10 rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading text-xl text-ink">All Leads</h3>
                <div className="flex gap-2">
                  {['today', 'week', 'month', 'year'].map(f => (
                    <button
                      key={f}
                      onClick={() => setDateFilter(f)}
                      className={`px-3 py-1 rounded text-sm font-body capitalize transition-colors ${
                        dateFilter === f ? 'bg-purple text-white' : 'bg-cream text-ink/60 hover:text-ink'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              {filteredLeads().length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm font-body">
                    <thead className="bg-cream">
                      <tr>
                        {['Branch', 'Source', 'Date', 'Time'].map(h => (
                          <th key={h} className="text-left py-2 px-3 text-ink/60 font-semibold">{h}</th>
                        ))}
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