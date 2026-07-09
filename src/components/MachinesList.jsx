import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  fetchEquipmentList, 
  slugify, 
  getEquipmentDisplayName,
  getEquipmentIcon 
} from '../lib/exerciseApi'

const MachinesList = () => {
  const [machines, setMachines] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const loadMachines = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const data = await fetchEquipmentList()
        // Sort alphabetically
        const sorted = data.sort((a, b) => a.localeCompare(b))
        setMachines(sorted)
      } catch (err) {
        setError('Failed to load machines. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    loadMachines()
  }, [])

  // Filter machines by search term
  const filteredMachines = machines.filter(name =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <section className="min-h-screen bg-cream pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="w-24 h-24 bg-purple/20 rounded-full mx-auto mb-6"></div>
            <div className="h-10 bg-ink/10 rounded-lg max-w-md mx-auto mb-4"></div>
            <div className="h-6 bg-ink/5 rounded-lg max-w-sm mx-auto"></div>
          </div>
          <p className="font-body text-ink/40 mt-8">Loading machines...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="min-h-screen bg-cream pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">❌</div>
          <h2 className="font-heading text-3xl text-ink mb-3">Oops!</h2>
          <p className="font-body text-ink/60 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-purple text-white px-8 py-3 rounded-full font-heading text-sm uppercase tracking-wider hover:bg-purple-light transition-all"
          >
            Try Again
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-cream pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-['Anton'] text-4xl md:text-5xl text-ink uppercase tracking-wide">
            Gym Machines
          </h1>
          <p className="font-body text-ink/50 mt-2">
            Select a machine to see exercises
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search machines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-ink/10 rounded-lg px-6 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors shadow-sm"
          />
        </div>

        {/* QR Code Generator Note */}
        <div className="bg-purple/5 border border-purple/20 rounded-lg p-4 mb-8 text-center">
          <p className="font-body text-sm text-ink/60">
            📱 Scan a QR code on any machine to see exercises instantly.
          </p>
        </div>

        {/* Machines Grid */}
        {filteredMachines.length === 0 ? (
          <p className="text-center text-ink/40 font-body py-8">
            No machines found matching "{searchTerm}"
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredMachines.map((machine, index) => {
              const slug = slugify(machine)
              const displayName = getEquipmentDisplayName(machine)
              const icon = getEquipmentIcon(machine)
              
              return (
                <motion.div
                  key={machine}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Link
                    to={`/machine/${slug}`}
                    className="block bg-white border border-ink/10 rounded-lg p-5 hover:border-purple/50 transition-all hover:scale-[1.02] shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{icon}</div>
                      <div>
                        <h3 className="font-heading text-ink text-lg">{displayName}</h3>
                      </div>
                      <div className="ml-auto text-purple text-sm font-body">
                        View →
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* QR Code Instructions */}
        <div className="mt-12 bg-white border border-ink/10 rounded-lg p-6 shadow-sm">
          <h3 className="font-heading text-lg text-ink mb-2">📋 How to Use QR Codes</h3>
          <ul className="space-y-2 font-body text-ink/60 text-sm">
            <li>1. Print the QR code for each machine</li>
            <li>2. Stick it on the machine</li>
            <li>3. Members scan → exercises appear instantly</li>
          </ul>
          <div className="mt-4">
            <span className="text-xs text-ink/30">
              URL format: adiyashgym.in/machine/equipment-name
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MachinesList