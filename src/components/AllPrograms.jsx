import { siteConfig } from '../content/siteData'
import { Link } from 'react-router-dom'

const AllPrograms = () => {
  return (
    <section className="min-h-screen bg-cream py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="text-purple hover:text-purple-light font-body mb-6 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider text-ink text-center mb-4">
          All Programs
        </h1>
        <p className="font-body text-lg md:text-xl text-ink/60 text-center max-w-2xl mx-auto mb-12">
          Explore our complete range of fitness programs
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.programs.map((program) => (
            <div key={program.id} className="bg-white border border-ink/10 rounded-lg overflow-hidden hover:border-purple/50 transition-all hover:scale-[1.02] shadow-sm">
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default AllPrograms