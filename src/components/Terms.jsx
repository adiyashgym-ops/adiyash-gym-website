import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Terms = () => {
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
          <span className="text-ink">TERMS & CONDITIONS</span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-4 text-ink/70 font-body"
        >
          <p>Last updated: June 2026</p>
          <p>By using Adiyash Gym's services, you agree to these terms.</p>
          <h2 className="text-ink font-heading text-xl mt-6">Membership</h2>
          <p>Membership is subject to our membership agreement. All payments are non-refundable.</p>
          <h2 className="text-ink font-heading text-xl mt-6">Code of Conduct</h2>
          <p>Members must follow gym rules and respect staff and other members.</p>
          <h2 className="text-ink font-heading text-xl mt-6">Liability</h2>
          <p>Exercise at your own risk. Consult a physician before starting any fitness program.</p>
          <h2 className="text-ink font-heading text-xl mt-6">Contact</h2>
          <p>Email: info@adiyashgym.com</p>
        </motion.div>
      </div>
    </section>
  )
}

export default Terms