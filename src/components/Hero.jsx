import { siteConfig } from '../content/siteData'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        poster="/hero-poster.jpg"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        {/* Fallback image if video doesn't load */}
        <img src="/hero-fallback.jpg" alt="Adiyash Gym" className="w-full h-full object-cover" />
      </video>
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-wider text-offwhite leading-[1.1] mb-6">
          Train Harder.
          <br />
          <span className="text-purple">Live Better.</span>
        </h1>
        
        <p className="font-body text-lg sm:text-xl md:text-2xl text-offwhite/70 max-w-2xl mx-auto mb-10">
          {siteConfig.description}
        </p>
        
        <a
          href={siteConfig.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-purple text-offwhite px-10 py-4 rounded-full font-heading text-lg uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105 shadow-lg shadow-purple/30"
        >
          Book a Free Trial
        </a>
      </div>
    </section>
  )
}

export default Hero