import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  getAllTrials, 
  addTrial, 
  searchTrialsByAadhar,
  checkExistingTrial 
} from '../lib/trialTracker'

const Trials = () => {
  const navigate = useNavigate()
  const [trials, setTrials] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchAadhar, setSearchAadhar] = useState('')
  const [searchResult, setSearchResult] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    aadhar: '',
    branch: '',
    trial_date: '',
    trial_time: '',
  })
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const branches = [
    'Kurla',
    'Vikhroli',
    'Kandivali',
    'Asalfa Unisex',
    'Asalfa Ladies',
    'Marol',
    'Vfour9',
  ]

  useEffect(() => {
    const loadTrials = async () => {
      setLoading(true)
      const data = await getAllTrials(200)
      setTrials(data)
      setLoading(false)
    }
    loadTrials()
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchAadhar.trim()) {
      setSearchResult(null)
      return
    }
    const results = await searchTrialsByAadhar(searchAadhar.trim())
    setSearchResult(results)
  }

  const handleAddTrial = async (e) => {
    e.preventDefault()
    setFormError('')
    setFormSuccess('')
    setSubmitting(true)

    if (!formData.name || !formData.phone || !formData.aadhar || !formData.branch || !formData.trial_date || !formData.trial_time) {
      setFormError('Please fill in all fields')
      setSubmitting(false)
      return
    }

    const existing = await checkExistingTrial(formData.aadhar)
    if (existing.exists) {
      setFormError(`❌ Already trialed on ${existing.trialData.trial_date} at ${existing.trialData.branch}`)
      setSubmitting(false)
      return
    }

    const result = await addTrial(formData)
    if (result.success) {
      setFormSuccess('✅ Trial added successfully!')
      setTrials([result.data, ...trials])
      setFormData({
        name: '',
        phone: '',
        aadhar: '',
        branch: '',
        trial_date: '',
        trial_time: '',
      })
      setShowAddForm(false)
    } else {
      setFormError(`❌ ${result.error}`)
    }
    setSubmitting(false)
  }

  const handleLogout = () => {
    navigate('/')
  }

  if (loading) {
    return (
      <section className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-ink font-body">Loading trials...</div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-cream py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-heading text-4xl text-ink">Trial Tracking</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500/20 text-red-500 px-4 py-2 rounded-lg font-body hover:bg-red-500/30 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="bg-white border border-ink/10 rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="font-heading text-2xl text-ink mb-4">Search by Aadhar</h2>
          <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Enter Aadhar number..."
              value={searchAadhar}
              onChange={(e) => setSearchAadhar(e.target.value)}
              className="flex-1 bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors min-w-[200px]"
            />
            <button
              type="submit"
              className="bg-purple text-white px-6 py-3 rounded-lg font-heading uppercase tracking-wider hover:bg-purple-light transition-all"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchAadhar('')
                setSearchResult(null)
              }}
              className="bg-ink/10 text-ink px-6 py-3 rounded-lg font-body hover:bg-ink/20 transition-all"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(!showAddForm)
                setFormError('')
                setFormSuccess('')
              }}
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-heading uppercase tracking-wider hover:bg-green-400 transition-all ml-auto"
            >
              + Add Trial
            </button>
          </form>

          {searchResult && searchResult.length > 0 && (
            <div className="mt-4 border-t border-ink/10 pt-4">
              <h3 className="font-heading text-lg text-ink mb-3">
                {searchResult.length} trial{searchResult.length > 1 ? 's' : ''} found
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-body">
                  <thead className="bg-cream">
                    <tr>
                      <th className="text-left py-2 px-3 text-ink/60 font-semibold">Name</th>
                      <th className="text-left py-2 px-3 text-ink/60 font-semibold">Phone</th>
                      <th className="text-left py-2 px-3 text-ink/60 font-semibold">Branch</th>
                      <th className="text-left py-2 px-3 text-ink/60 font-semibold">Trial Date</th>
                      <th className="text-left py-2 px-3 text-ink/60 font-semibold">Trial Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResult.map((trial, index) => (
                      <tr key={index} className="border-t border-ink/5 hover:bg-cream/50">
                        <td className="py-2 px-3 text-ink">{trial.name}</td>
                        <td className="py-2 px-3 text-ink/60">{trial.phone}</td>
                        <td className="py-2 px-3 text-ink/60">{trial.branch}</td>
                        <td className="py-2 px-3 text-ink/60">{trial.trial_date}</td>
                        <td className="py-2 px-3 text-ink/60">{trial.trial_time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {searchResult && searchResult.length === 0 && searchAadhar && (
            <p className="text-ink/40 font-body mt-4">No trials found for this Aadhar number</p>
          )}
        </div>

        {showAddForm && (
          <div className="bg-white border border-ink/10 rounded-lg p-6 mb-8 shadow-sm">
            <h2 className="font-heading text-2xl text-ink mb-4">Add New Trial</h2>
            {formError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-red-600 font-body text-sm">
                {formError}
              </div>
            )}
            {formSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 text-green-600 font-body text-sm">
                {formSuccess}
              </div>
            )}
            <form onSubmit={handleAddTrial} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-body text-ink/60 text-sm block mb-1">Name *</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors"
                  required
                />
              </div>
              <div>
                <label className="font-body text-ink/60 text-sm block mb-1">Phone *</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors"
                  required
                />
              </div>
              <div>
                <label className="font-body text-ink/60 text-sm block mb-1">Aadhar Number *</label>
                <input
                  type="text"
                  placeholder="Enter Aadhar number"
                  value={formData.aadhar}
                  onChange={(e) => setFormData({ ...formData, aadhar: e.target.value })}
                  className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors"
                  required
                />
              </div>
              <div>
                <label className="font-body text-ink/60 text-sm block mb-1">Branch *</label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors"
                  required
                >
                  <option value="">Select branch...</option>
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-body text-ink/60 text-sm block mb-1">Trial Date *</label>
                <input
                  type="date"
                  value={formData.trial_date}
                  onChange={(e) => setFormData({ ...formData, trial_date: e.target.value })}
                  className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors"
                  required
                />
              </div>
              <div>
                <label className="font-body text-ink/60 text-sm block mb-1">Trial Time *</label>
                <input
                  type="time"
                  value={formData.trial_time}
                  onChange={(e) => setFormData({ ...formData, trial_time: e.target.value })}
                  className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors"
                  required
                />
              </div>
              <div className="md:col-span-2 flex gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`bg-purple text-white px-8 py-3 rounded-lg font-heading uppercase tracking-wider hover:bg-purple-light transition-all ${
                    submitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {submitting ? 'Adding...' : 'Add Trial'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setFormError('')
                    setFormSuccess('')
                  }}
                  className="bg-ink/10 text-ink px-8 py-3 rounded-lg font-body hover:bg-ink/20 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white border border-ink/10 rounded-lg p-6 shadow-sm">
          <h2 className="font-heading text-2xl text-ink mb-4">All Trials ({trials.length})</h2>
          {trials.length === 0 ? (
            <p className="font-body text-ink/40">No trials recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead className="bg-cream">
                  <tr>
                    <th className="text-left py-2 px-3 text-ink/60 font-semibold">Name</th>
                    <th className="text-left py-2 px-3 text-ink/60 font-semibold">Phone</th>
                    <th className="text-left py-2 px-3 text-ink/60 font-semibold">Aadhar</th>
                    <th className="text-left py-2 px-3 text-ink/60 font-semibold">Branch</th>
                    <th className="text-left py-2 px-3 text-ink/60 font-semibold">Date</th>
                    <th className="text-left py-2 px-3 text-ink/60 font-semibold">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {trials.map((trial, index) => (
                    <tr key={index} className="border-t border-ink/5 hover:bg-cream/50">
                      <td className="py-2 px-3 text-ink">{trial.name}</td>
                      <td className="py-2 px-3 text-ink/60">{trial.phone}</td>
                      <td className="py-2 px-3 text-ink/60 font-mono text-xs">{trial.aadhar}</td>
                      <td className="py-2 px-3 text-ink/60">{trial.branch}</td>
                      <td className="py-2 px-3 text-ink/60">{trial.trial_date}</td>
                      <td className="py-2 px-3 text-ink/60">{trial.trial_time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Trials