import { siteConfig } from '../content/siteData'

const CTA = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-cream to-purple/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl uppercase tracking-wider text-ink mb-6">
          {siteConfig.cta.title}
        </h2>
        <p className="font-body text-lg md:text-xl text-ink/60 max-w-2xl mx-auto mb-10">
          {siteConfig.cta.subtitle}
        </p>
        <a
          href={siteConfig.cta.buttonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-purple text-white px-12 py-5 rounded-full font-heading text-xl uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105 shadow-2xl shadow-purple/30"
        >
          {siteConfig.cta.buttonText}
        </a>
      </div>
    </section>
  )
}

export default CTA