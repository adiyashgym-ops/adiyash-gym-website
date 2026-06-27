import { siteConfig } from '../content/siteData'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const CTA = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-cream to-purple/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl uppercase tracking-wider text-ink mb-6"
        >
          {siteConfig.cta.title}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-body text-lg md:text-xl text-ink/60 max-w-2xl mx-auto mb-10"
        >
          {siteConfig.cta.subtitle}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            to="/select-branch"
            className="inline-block bg-purple text-white px-12 py-5 rounded-full font-heading text-xl uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105 shadow-2xl shadow-purple/30"
          >
            {siteConfig.cta.buttonText}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA