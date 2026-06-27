import { siteConfig } from '../content/siteData'
import { Link } from 'react-router-dom'

const AllLocations = () => {
  return (
    <section className="min-h-screen bg-cream py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="text-purple hover:text-purple-light font-body mb-6 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider text-ink text-center mb-4">
          All Locations
        </h1>
        <p className="font-body text-lg md:text-xl text-ink/60 text-center max-w-2xl mx-auto mb-12">
          Find your nearest Adiyash Gym across Mumbai
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {siteConfig.branches.map((location) => (
            <div key={location.id} className="bg-white border border-ink/10 rounded-lg overflow-hidden hover:border-purple/50 transition-all hover:scale-[1.02] shadow-sm">
              {/* Branch Image Placeholder */}
              <div className="w-full h-48 bg-purple/10 flex items-center justify-center">
                <span className="text-4xl">📍</span>
              </div>
              
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default AllLocations