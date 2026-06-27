import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Privacy = () => {
  return (
    <section className="min-h-screen bg-cream py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-purple hover:text-purple-light font-body mb-6 inline-block">
          ← Back to Home
        </Link>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-['Anton'] text-[#832D81] text-4xl md:text-5xl lg:text-6xl flex items-center justify-center gap-1 flex-wrap mb-8"
        >
          <span>AD</span>
          <img 
            src="/red-mark.png" 
            alt="" 
            className="h-[0.85em] inline-block align-middle" 
          />
          <span>YASH</span>
          <span className="text-ink">PRIVACY POLICY</span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-4 text-ink/70 font-body"
        >
          <p>Last updated: June 2026</p>
          <p>Adiyash Gym respects your privacy. This policy explains how we collect, use, and protect your personal information.</p>
          <h2 className="text-ink font-heading text-xl mt-6">Information We Collect</h2>
          <p>We collect information you provide directly, such as your name, email, phone number, and fitness goals.</p>
          <h2 className="text-ink font-heading text-xl mt-6">How We Use Your Information</h2>
          <p>We use your information to provide services, communicate with you, and improve our offerings.</p>
          <h2 className="text-ink font-heading text-xl mt-6">Contact</h2>
          <p>Email: info@adiyashgym.com</p>
        </motion.div>
      </div>
    </section>
  )
}

export default Privacy