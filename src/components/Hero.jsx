import { siteConfig } from '../content/siteData'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image/Video */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/hero-poster.jpg)' }}>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-wider text-white leading-[1.1] mb-4">
          {siteConfig.gymName}
        </h1>
        <p className="font-body text-2xl sm:text-3xl md:text-4xl text-white/80 max-w-3xl mx-auto mb-8 font-light tracking-wide">
          {siteConfig.tagline}
        </p>
        <a
          href={siteConfig.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-purple text-white px-12 py-5 rounded-full font-heading text-lg uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105 shadow-2xl"
        >
          Book a Free Trial
        </a>
      </div>
    </section>
  )
}

export default Hero