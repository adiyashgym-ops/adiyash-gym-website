import { siteConfig } from '../content/siteData'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedCard from './AnimatedCard'

const AllTrainers = () => {
  const allTrainers = []
  
  siteConfig.branches.forEach(branch => {
    branch.trainers.forEach(trainer => {
      allTrainers.push({
        ...trainer,
        branchName: branch.name,
        branchId: branch.id
      })
    })
  })

  const groupedTrainers = {}
  allTrainers.forEach(trainer => {
    if (!groupedTrainers[trainer.branchName]) {
      groupedTrainers[trainer.branchName] = []
    }
    groupedTrainers[trainer.branchName].push(trainer)
  })

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
          <span className="text-ink">TRAINERS</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-body text-lg md:text-xl text-ink/60 text-center max-w-2xl mx-auto mb-12"
        >
          Meet our expert coaches from all 7 branches
        </motion.p>
        
        {Object.keys(groupedTrainers).map((branchName) => (
          <div key={branchName} className="mb-12">
            <h2 className="font-heading text-2xl md:text-3xl text-purple mb-6 border-b border-ink/10 pb-2">
              {branchName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedTrainers[branchName].map((trainer, index) => (
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
                      {trainer.featured && (
                        <span className="inline-block bg-purple/10 text-purple text-xs px-2 py-1 rounded-full mt-1">
                          Featured Trainer
                        </span>
                      )}
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AllTrainers