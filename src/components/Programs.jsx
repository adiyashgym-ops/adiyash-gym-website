import { siteConfig } from '../content/siteData'

const Programs = () => {
  return (
    <section className="py-16 md:py-24 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider text-offwhite text-center mb-4">
          Our Programs
        </h2>
        <p className="font-body text-lg md:text-xl text-offwhite/70 text-center max-w-2xl mx-auto mb-12">
          World-class training programs for every fitness level
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.programs.map((program) => (
            <div key={program.id} className="bg-black/30 border border-offwhite/10 rounded-lg p-6 hover:border-purple/50 transition-all hover:scale-[1.02] text-center">
              <div className="text-5xl mb-4">{program.icon}</div>
              <h3 className="font-heading text-offwhite text-xl uppercase tracking-wider mb-2">
                {program.title}
              </h3>
              <p className="font-body text-offwhite/60 text-sm">
                {program.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Programs