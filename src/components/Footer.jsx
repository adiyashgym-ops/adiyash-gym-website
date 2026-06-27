import { siteConfig } from '../content/siteData'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="bg-cream border-t border-ink/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <img src="/logo.png" alt="Adiyash Gym" className="h-12 w-auto" />
          <span className="text-ink font-heading text-xl tracking-wider">
            {siteConfig.gymName}
          </span>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 mb-8"
        >
          <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-ink/60 hover:text-purple transition-colors">
            Instagram
          </a>
          <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-ink/60 hover:text-purple transition-colors">
            Facebook
          </a>
          <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="text-ink/60 hover:text-purple transition-colors">
            YouTube
          </a>
          <a href={`https://wa.me/${siteConfig.mainPhone}`} target="_blank" rel="noopener noreferrer" className="text-ink/60 hover:text-purple transition-colors">
            WhatsApp
          </a>
        </motion.div>

        {/* Legal Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 mb-8"
        >
          <a href="/privacy" className="text-ink/40 hover:text-purple transition-colors text-sm">
            Privacy Policy
          </a>
          <a href="/terms" className="text-ink/40 hover:text-purple transition-colors text-sm">
            Terms & Conditions
          </a>
        </motion.div>

        {/* Locations */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-8 text-sm"
        >
          {siteConfig.branches.map((loc, index) => (
            <span key={index} className="text-ink/40">{loc.name}</span>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-ink/40 text-sm"
        >
          <p>{siteConfig.footer.copyright}</p>
          <p className="mt-1 text-xs text-ink/30">
            {siteConfig.footer.credit}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer