import { siteConfig } from '../content/siteData'
import { Link } from 'react-router-dom'

const AllTrainers = () => {
  // Get all trainers grouped by branch
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

  // Group trainers by branch
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
        
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider text-ink text-center mb-4">
          All Trainers
        </h1>
        <p className="font-body text-lg md:text-xl text-ink/60 text-center max-w-2xl mx-auto mb-12">
          Meet our expert coaches from all 7 branches
        </p>
        
        {Object.keys(groupedTrainers).map((branchName) => (
          <div key={branchName} className="mb-12">
            <h2 className="font-heading text-2xl md:text-3xl text-purple mb-6 border-b border-ink/10 pb-2">
              {branchName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedTrainers[branchName].map((trainer, index) => (
                <div key={index} className="bg-white border border-ink/10 rounded-lg overflow-hidden hover:border-purple/50 transition-all hover:scale-[1.02] shadow-sm">
                  <div className="aspect-square bg-purple/10 flex items-center justify-center">
                    <span className="text-6xl">🏋️</span>
                  </div>
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
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AllTrainers