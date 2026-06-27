import { siteConfig } from '../content/siteData'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedCard from './AnimatedCard'

const Locations = () => {
  // Show only first 6 locations on homepage
  const homeLocations = siteConfig.branches.slice(0, 6)

  return (
    <section className="py-16 md:py-24 bg-cream/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider text-ink text-center mb-4"
        >
          Our Locations
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-body text-lg md:text-xl text-ink/60 text-center max-w-2xl mx-auto mb-12"
        >
          7 gyms across Mumbai to serve you better
        </motion.p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {homeLocations.map((location, index) => (
            <AnimatedCard key={index} delay={index * 0.1}>
              <div className="bg-white border border-ink/10 rounded-lg p-6 hover:border-purple/50 transition-all hover:scale-[1.02] shadow-sm">
                <h3 className="font-heading text-ink text-xl mb-2">{location.name}</h3>
                <p className="font-body text-ink/60 text-sm mb-2">{location.address}</p>
                <p className="font-body text-purple text-xs mb-3">⏰ {location.timings}</p>
                <a
                  href={location.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple text-sm font-body hover:text-purple-light transition-colors"
                >
                  Get Directions →
                </a>
              </div>
            </AnimatedCard>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to="/locations"
            className="inline-block bg-purple text-white px-8 py-3 rounded-full font-heading text-sm uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105"
          >
            View All Locations →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Locations