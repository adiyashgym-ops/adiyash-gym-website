import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { trackLead } from '../lib/leadTracker'
import LeadModal from './LeadModal'

const SelectBranch = () => {
  const [selectedBranch, setSelectedBranch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [branchName, setBranchName] = useState('')
  const navigate = useNavigate()

  const branches = [
    { id: 'kurla', name: 'Kurla', whatsapp: '918291743902' },
    { id: 'vikhroli', name: 'Vikhroli', whatsapp: '918291432839' },
    { id: 'kandivali', name: 'Kandivali', whatsapp: '919324337728' },
    { id: 'asalfa-unisex', name: 'Asalfa Unisex', whatsapp: '918268652812' },
    { id: 'asalfa-ladies', name: 'Asalfa Ladies', whatsapp: '919869565863' },
    { id: 'marol', name: 'Marol', whatsapp: '918104579053' },
    { id: 'vfour9', name: 'Vfour9', whatsapp: '918879410763' },
  ]

  const handleBranchSelect = (e) => {
    e.preventDefault()
    if (selectedBranch) {
      const branch = branches.find(b => b.id === selectedBranch)
      setBranchName(branch.name)
      setIsModalOpen(true)
    }
  }

  const handleModalSubmit = async (name, phone) => {
    // Track lead in Google Sheets + Supabase
    await trackLead(name, phone, selectedBranch, 'select_branch_page')
    
    // Get branch WhatsApp number
    const branch = branches.find(b => b.id === selectedBranch)
    const message = `Hi! I'm interested in joining Adiyash Gym`
    
    // Redirect to WhatsApp
    window.open(`https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(message)}`, '_blank')
    
    // Close modal and navigate home
    setIsModalOpen(false)
    navigate('/')
  }

  return (
    <>
      <section className="min-h-screen bg-cream flex items-center justify-center px-4 py-20">
        <div className="bg-white border border-ink/10 rounded-lg p-8 max-w-md w-full shadow-sm">
          <h2 className="font-heading text-3xl text-ink text-center mb-2">Select Your Branch</h2>
          <p className="font-body text-ink/50 text-center mb-8 text-sm">Choose your nearest Adiyash Gym location</p>
          
          <form onSubmit={handleBranchSelect} className="space-y-4">
            <div>
              <label className="font-body text-ink/60 text-sm block mb-1">Choose a branch</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors"
                required
              >
                <option value="">-- Select Branch --</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
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
              {selectedBranch ? 'Continue' : 'Select a branch first'}
            </button>
          </form>
        </div>
      </section>

      {/* Lead Modal */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        branch={selectedBranch}
        branchName={branchName}
        onSubmit={handleModalSubmit}
      />
    </>
  )
}

export default SelectBranch