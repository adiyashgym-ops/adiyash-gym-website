import { siteConfig } from '../content/siteData'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedCard from './AnimatedCard'

const Trainers = () => {
  const featuredTrainers = []
  
  siteConfig.branches.forEach(branch => {
    branch.trainers.forEach(trainer => {
      if (trainer.featured === true) {
        featuredTrainers.push({
          ...trainer,
          branchName: branch.name
        })
      }
    })
  })

  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider text-ink text-center mb-4"
        >
          Meet Your Trainers
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-body text-lg md:text-xl text-ink/60 text-center max-w-2xl mx-auto mb-12"
        >
          Expert coaches dedicated to your transformation
        </motion.p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTrainers.map((trainer, index) => (
            <AnimatedCard key={index} delay={index * 0.1}>
              <div className="bg-white border border-ink/10 rounded-lg overflow-hidden hover:border-purple/50 transition-all hover:scale-[1.02] shadow-sm">
                <img 
                  src={trainer.image || '/placeholder-trainer.jpg'} 
                  alt={trainer.name} 
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-heading text-ink text-xl">{trainer.name}</h3>
                  <p className="font-body text-purple text-sm">{trainer.specialty}</p>
                  <p className="font-body text-ink/40 text-xs mt-1">{trainer.branchName}</p>
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
            to="/trainers"
            className="inline-block bg-purple text-white px-8 py-3 rounded-full font-heading text-sm uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105"
          >
            Meet All Our Trainers →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Trainers