import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LeadModal = ({ isOpen, onClose, branch, branchName, onSubmit }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [errors, setErrors] = useState({})

  const nameRef = useRef(null)
  const phoneRef = useRef(null)
  const checkboxRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Check for errors
    const newErrors = {}
    if (!name.trim()) newErrors.name = 'Please enter your name'
    if (!phone.trim()) newErrors.phone = 'Please enter your phone number'
    if (!agreed) newErrors.agreed = 'Please agree to the terms'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      
      // Scroll to first error field
      if (newErrors.name && nameRef.current) {
        nameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
        nameRef.current.focus()
      } else if (newErrors.phone && phoneRef.current) {
        phoneRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
        phoneRef.current.focus()
      } else if (newErrors.agreed && checkboxRef.current) {
        checkboxRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    setErrors({})
    setLoading(true)
    await onSubmit(name, phone, branchName)
    setLoading(false)
    setName('')
    setPhone('')
    setAgreed(false)
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
          className="relative bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
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
              Enter your details to book a free trial
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div ref={nameRef}>
              <label className="font-body text-ink/60 text-sm block mb-1">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (errors.name) setErrors({ ...errors, name: '' })
                }}
                className={`w-full bg-cream border rounded-lg px-4 py-3 text-ink font-body focus:outline-none transition-colors ${
                  errors.name
                    ? 'border-red-500 focus:border-red-500 ring-1 ring-red-500'
                    : 'border-ink/10 focus:border-purple'
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs font-body mt-1">{errors.name}</p>
              )}
            </div>

            <div ref={phoneRef}>
              <label className="font-body text-ink/60 text-sm block mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                  if (errors.phone) setErrors({ ...errors, phone: '' })
                }}
                className={`w-full bg-cream border rounded-lg px-4 py-3 text-ink font-body focus:outline-none transition-colors ${
                  errors.phone
                    ? 'border-red-500 focus:border-red-500 ring-1 ring-red-500'
                    : 'border-ink/10 focus:border-purple'
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs font-body mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Trial Rules */}
            <div className="bg-purple/5 border border-purple/20 rounded-lg p-4 space-y-1">
              <p className="font-body text-sm text-ink/70 font-semibold">📋 Trial Rules:</p>
              <p className="font-body text-xs text-ink/60">⏰ Trial timing: 9:00 AM to 6:00 PM only</p>
              <p className="font-body text-xs text-ink/60">📅 Need to book 1 day before coming to the gym</p>
              <p className="font-body text-xs text-ink/60">❌ Not available on Sundays & festival holidays</p>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-ink/5 border border-ink/10 rounded-lg p-4">
              <p className="font-body text-xs text-ink/60 leading-relaxed">
                <span className="font-semibold text-ink/80">Terms & Conditions:</span> By booking a trial, you agree to provide accurate information. Trial is valid for first-time visitors only. Gym rules apply. Management reserves the right to cancel or reschedule trials.
              </p>
            </div>

            {/* Checkbox */}
            <div ref={checkboxRef} className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => {
                  setAgreed(!agreed)
                  if (errors.agreed) setErrors({ ...errors, agreed: '' })
                }}
                className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                  agreed
                    ? 'bg-purple border-purple'
                    : errors.agreed
                    ? 'border-red-500'
                    : 'border-ink/30 hover:border-purple'
                }`}
              >
                {agreed && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <label
                onClick={() => {
                  setAgreed(!agreed)
                  if (errors.agreed) setErrors({ ...errors, agreed: '' })
                }}
                className={`font-body text-xs cursor-pointer select-none ${
                  errors.agreed ? 'text-red-500' : 'text-ink/60'
                }`}
              >
                I agree to the <span className="font-semibold">Terms & Conditions</span> and confirm I understand the trial rules.
              </label>
            </div>
            {errors.agreed && (
              <p className="text-red-500 text-xs font-body text-center">{errors.agreed}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-heading uppercase tracking-wider transition-all ${
                loading
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