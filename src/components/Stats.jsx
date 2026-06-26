import { siteConfig } from '../content/siteData'

const Stats = () => {
  return (
    <section className="py-16 md:py-24 bg-black border-t border-b border-offwhite/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {siteConfig.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-heading text-4xl md:text-5xl lg:text-6xl text-purple font-bold">
                {stat.number}
              </div>
              <div className="font-body text-sm md:text-base text-offwhite/60 mt-2 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats