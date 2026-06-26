import { siteConfig } from '../content/siteData'

const Trainers = () => {
  const allTrainers = siteConfig.branches.flatMap(branch =>
    branch.trainers.map(trainer => ({
      ...trainer,
      branch: branch.name
    }))
  )

  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider text-offwhite text-center mb-4">
          Meet Your Trainers
        </h2>
        <p className="font-body text-lg md:text-xl text-offwhite/70 text-center max-w-2xl mx-auto mb-12">
          Expert coaches dedicated to your transformation
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTrainers.map((trainer, index) => (
            <div key={index} className="bg-black/30 border border-offwhite/10 rounded-lg overflow-hidden hover:border-purple/50 transition-all hover:scale-[1.02]">
              <div className="aspect-square bg-purple/20 flex items-center justify-center">
                <span className="text-6xl">🏋️</span>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-heading text-offwhite text-xl">{trainer.name}</h3>
                <p className="font-body text-purple text-sm">{trainer.specialty}</p>
                <p className="font-body text-offwhite/40 text-xs mt-1">{trainer.branch}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Trainers