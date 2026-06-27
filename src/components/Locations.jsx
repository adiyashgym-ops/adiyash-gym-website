import { siteConfig } from '../content/siteData'

const Locations = () => {
  return (
    <section className="py-16 md:py-24 bg-cream/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider text-ink text-center mb-4">
          Our Locations
        </h2>
        <p className="font-body text-lg md:text-xl text-ink/60 text-center max-w-2xl mx-auto mb-12">
          7 gyms across Mumbai to serve you better
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.branches.map((location, index) => (
            <div key={index} className="bg-white border border-ink/10 rounded-lg p-6 hover:border-purple/50 transition-all hover:scale-[1.02] shadow-sm">
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default Locations