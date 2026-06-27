import { siteConfig } from '../content/siteData'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedCard from './AnimatedCard'

const AllPrograms = () => {
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
          <span className="text-ink">PROGRAMS</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-body text-lg md:text-xl text-ink/60 text-center max-w-2xl mx-auto mb-12"
        >
          Explore our complete range of fitness programs
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.programs.map((program, index) => (
            <AnimatedCard key={program.id} delay={index * 0.1}>
              <div className="bg-white border border-ink/10 rounded-lg overflow-hidden hover:border-purple/50 transition-all hover:scale-[1.02] shadow-sm">
                <img 
                  src={program.image} 
                  alt={program.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="font-heading text-ink text-xl uppercase tracking-wider mb-2">
                    {program.title}
                  </h3>
                  <p className="font-body text-ink/60 text-sm">
                    {program.description}
                  </p>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AllPrograms