import { siteConfig } from '../content/siteData'
import { Link } from 'react-router-dom'

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
        <img src="/hero-fallback.jpg" alt="Adiyash Gym" className="w-full h-full object-cover" />
      </video>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-wider text-white leading-[1.1] mb-4">
          {siteConfig.gymName}
        </h1>
        <p className="font-body text-2xl sm:text-3xl md:text-4xl text-white/90 max-w-3xl mx-auto mb-8 font-light tracking-wide">
          {siteConfig.tagline}
        </p>
        <Link
          to="/select-branch"
          className="inline-block bg-purple text-white px-12 py-5 rounded-full font-heading text-lg uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105 shadow-2xl"
        >
          Book a Free Trial
        </Link>
      </div>
    </section>
  )
}

export default Hero