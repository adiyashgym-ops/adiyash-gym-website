import { siteConfig } from '../content/siteData'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

const About = () => {
  return (
    <section className="min-h-screen bg-cream py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="text-purple hover:text-purple-light font-body mb-6 inline-block">
          ← Back to Home
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-['Anton'] text-[#832D81] text-5xl md:text-7xl lg:text-8xl flex items-center justify-center gap-1 flex-wrap"
          >
            <span>AD</span>
            <img 
              src="/red-mark.png" 
              alt="" 
              className="h-[0.85em] inline-block align-middle" 
            />
            <span>YASH</span>
            <span className="text-ink">GYM</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="font-body text-2xl md:text-3xl text-purple font-light italic mt-4"
          >
            {siteConfig.tagline}
          </motion.p>
        </div>

        {/* Story Section */}
        <AnimatedSection delay={0.2}>
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
        </AnimatedSection>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
          {siteConfig.stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white border border-ink/10 rounded-lg p-6 shadow-sm hover:border-purple/50 transition-all"
            >
              <div className="font-heading text-4xl md:text-5xl text-purple font-bold">
                {stat.number}
              </div>
              <div className="font-body text-sm text-ink/60 uppercase tracking-wider mt-2">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission Section */}
        <AnimatedSection delay={0.6}>
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="font-heading text-3xl text-ink mb-4">Our Mission</h2>
            <p className="font-body text-ink/70 text-lg leading-relaxed">
              To make every individual's life fitter and better by providing premium 
              fitness experiences, expert guidance, and a community that inspires 
              transformation every single day.
            </p>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.8}>
          <div className="text-center">
            <Link
              to="/select-branch"
              className="inline-block bg-purple text-white px-12 py-4 rounded-full font-heading text-lg uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105 shadow-lg"
            >
              Join Adiyash Today
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default About