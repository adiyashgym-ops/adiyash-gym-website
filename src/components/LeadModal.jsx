import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LeadModal = ({ isOpen, onClose, branch, branchName, onSubmit }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return
    
    setLoading(true)
    await onSubmit(name, phone)
    setLoading(false)
    setName('')
    setPhone('')
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-ink/40 hover:text-ink transition-colors"
          >
            ✕
          </button>

          {/* Branch Info */}
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">💬</div>
            <h2 className="font-heading text-2xl text-ink">Connect to {branchName}</h2>
            <p className="font-body text-ink/50 text-sm mt-1">
              Enter your details to chat with our team
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-body text-ink/60 text-sm block mb-1">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors"
                required
              />
            </div>

            <div>
              <label className="font-body text-ink/60 text-sm block mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !name.trim() || !phone.trim()}
              className={`w-full py-3 rounded-lg font-heading uppercase tracking-wider transition-all ${
                loading || !name.trim() || !phone.trim()
                  ? 'bg-purple/30 text-white/50 cursor-not-allowed'
                  : 'bg-purple text-white hover:bg-purple-light hover:scale-[1.02]'
              }`}
            >
              {loading ? 'Sending...' : 'Chat on WhatsApp'}
            </button>

            <p className="text-xs text-ink/30 text-center mt-2">
              By continuing, you agree to our Privacy Policy
            </p>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default LeadModal