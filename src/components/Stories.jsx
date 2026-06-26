import { siteConfig } from '../content/siteData'

const Stories = () => {
  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider text-offwhite text-center mb-4">
          Before & After Stories
        </h2>
        <p className="font-body text-lg md:text-xl text-offwhite/70 text-center max-w-2xl mx-auto mb-12">
          Real transformations from our members
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteConfig.stories.map((story) => (
            <div key={story.id} className="bg-black/30 border border-offwhite/10 rounded-lg overflow-hidden hover:border-purple/50 transition-all hover:scale-[1.02]">
              <div className="aspect-video bg-purple/20 flex items-center justify-center">
                <span className="text-5xl">▶️</span>
              </div>
              <div className="p-4">
                <h3 className="font-heading text-offwhite text-lg">{story.title}</h3>
                <p className="font-body text-offwhite/60 text-sm">{story.tagline}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a
            href={siteConfig.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple text-offwhite px-8 py-3 rounded-full font-heading text-sm uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105"
          >
            Watch More on YouTube
          </a>
        </div>
      </div>
    </section>
  )
}

export default Stories