import { siteConfig } from '../content/siteData'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedCard from './AnimatedCard'

const Programs = () => {
  const featuredPrograms = siteConfig.programs.filter(p => p.featured === true)

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
          Our Programs
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-body text-lg md:text-xl text-ink/60 text-center max-w-2xl mx-auto mb-12"
        >
          World-class training programs for every fitness level
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPrograms.map((program, index) => (
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

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to="/programs"
            className="inline-block bg-purple text-white px-8 py-3 rounded-full font-heading text-sm uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105"
          >
            View All Programs →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Programs