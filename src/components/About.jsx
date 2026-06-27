import { siteConfig } from '../content/siteData'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <section className="min-h-screen bg-cream py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="text-purple hover:text-purple-light font-body mb-6 inline-block">
          ← Back to Home
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl uppercase tracking-wider text-ink mb-4">
            About Adiyash
          </h1>
          <p className="font-body text-2xl md:text-3xl text-purple font-light italic">
            {siteConfig.tagline}
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="font-heading text-3xl text-ink mb-4">Our Story</h2>
          <p className="font-body text-ink/70 text-lg leading-relaxed mb-4">
            Adiyash Gym was founded with a simple mission: to make fitness accessible, 
            effective, and life-changing for everyone in Mumbai. What started as a single 
            location has grown into 7 branches across the city, each one built on the same 
            core values of excellence, community, and transformation.
          </p>
          <p className="font-body text-ink/70 text-lg leading-relaxed">
            Our approach is different. We combine world-class facilities with expert 
            coaching and a supportive environment that pushes you to become the best 
            version of yourself. Whether you're taking your first step or preparing for 
            a competition, Adiyash Gym is your home for fitness.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
          {siteConfig.stats.map((stat, index) => (
            <div key={index} className="text-center bg-white border border-ink/10 rounded-lg p-6 shadow-sm hover:border-purple/50 transition-all">
              <div className="font-heading text-4xl md:text-5xl text-purple font-bold">
                {stat.number}
              </div>
              <div className="font-body text-sm text-ink/60 uppercase tracking-wider mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="font-heading text-3xl text-ink mb-4">Our Mission</h2>
          <p className="font-body text-ink/70 text-lg leading-relaxed">
            To make every individual's life fitter and better by providing premium 
            fitness experiences, expert guidance, and a community that inspires 
            transformation every single day.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/select-branch"
            className="inline-block bg-purple text-white px-12 py-4 rounded-full font-heading text-lg uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105 shadow-lg"
          >
            Join Adiyash Today
          </Link>
        </div>
      </div>
    </section>
  )
}

export default About