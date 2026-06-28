import { siteConfig } from '../content/siteData'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedCard from './AnimatedCard'

const AllLocations = () => {
  return (
    <section className="min-h-screen bg-cream py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="text-purple hover:text-purple-light font-body mb-6 inline-block">
          ← Back to Home
        </Link>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-['Anton'] text-[#832D81] text-4xl md:text-6xl lg:text-7xl flex items-center justify-center gap-1 flex-wrap mb-4"
        >
          <span>AD</span>
          <img 
            src="/red-mark.png" 
            alt="" 
            className="h-[0.85em] inline-block align-middle" 
          />
          <span>YASH</span>
          <span className="text-ink">LOCATIONS</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-body text-lg md:text-xl text-ink/60 text-center max-w-2xl mx-auto mb-12"
        >
          Find your nearest Adiyash Gym across Mumbai
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {siteConfig.branches.map((location, index) => (
            <AnimatedCard key={location.id} delay={index * 0.1}>
              <div className="bg-white border border-ink/10 rounded-lg overflow-hidden hover:border-purple/50 transition-all hover:scale-[1.02] shadow-sm">
                <img 
                  src={location.image} 
                  alt={location.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-heading text-2xl text-ink mb-2">{location.name}</h3>
                  <p className="font-body text-ink/60 text-sm mb-2">{location.address}</p>
                  <p className="font-body text-purple text-xs mb-3">⏰ {location.timings}</p>
                  
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={location.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-purple text-white px-4 py-2 rounded-lg font-body text-sm hover:bg-purple-light transition-all"
                    >
                      📍 Get Directions
                    </a>
                    <a
                      href={`https://wa.me/${location.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 text-white px-4 py-2 rounded-lg font-body text-sm hover:bg-green-400 transition-all"
                    >
                      💬 Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AllLocations