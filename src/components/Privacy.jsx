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
          <p><strong>Last updated:</strong> June 2026</p>
          
          <p>At Adiyash Gym, we ensure that your privacy stays protected.</p>
          
          <p>Our visitors are encouraged to register with us to gain access to all our site has to offer. Should you decide to register, you will be asked for name, email address and telephone number.</p>
          
          <p>Your personal details cannot be viewed by our advertisers or any other party. The information you submit to us is used to identify user profiles to help us personalize and improve our services.</p>
          
          <p>When you share a page from our site via email, your email address will not be disclosed to our advertisers. However, we may send some information about Adiyash Gym to that address.</p>

          <h2 className="text-ink font-heading text-xl mt-6">Information We Collect</h2>
          <p>We collect information you provide directly, such as your name, email address, phone number, and fitness goals. This information helps us personalize your experience and improve our services.</p>

          <h2 className="text-ink font-heading text-xl mt-6">How We Use Your Information</h2>
          <p>We use your information to provide services, communicate with you about your fitness journey, and improve our offerings. Your personal details are never shared with advertisers or third parties.</p>

          <h2 className="text-ink font-heading text-xl mt-6">Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>

          <h2 className="text-ink font-heading text-xl mt-6">Contact</h2>
          <p>Email: adiyashgym.mail@gmail.com</p>
          <p>Phone: 9076336653</p>
        </motion.div>
      </div>
    </section>
  )
}

export default Privacy