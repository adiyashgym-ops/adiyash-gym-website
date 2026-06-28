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

        {/* Our Story Section */}
        <AnimatedSection delay={0.2}>
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="font-heading text-3xl text-ink mb-4">Our Story</h2>
            <p className="font-body text-ink/70 text-lg leading-relaxed mb-4">
              Established in the year 2014, Adiyash Gym in Asalfa-Ghatkopar West, Mumbai is a top player in the category Gyms in Mumbai. This well-known establishment acts as a one-stop destination servicing customers both local and from other parts of Mumbai. Over the course of its journey, this business has established a firm foothold in its industry.
            </p>
            <p className="font-body text-ink/70 text-lg leading-relaxed mb-4">
              The belief that customer satisfaction is as important as their products and services has helped this establishment garner a vast base of customers, which continues to grow by the day. This business employs individuals that are dedicated towards their respective roles and put in a lot of effort to achieve the common vision and larger goals of the company.
            </p>
            <p className="font-body text-ink/70 text-lg leading-relaxed">
              In the near future, this business aims to expand its line of products and services and cater to a larger client base. In Mumbai, this establishment occupies a prominent location in Asalfa-Ghatkopar West. It is at A G Link Road, Near Sainath Wine Shop, which makes it easy for first-time visitors in locating this establishment.
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

        {/* Team Section */}
        <AnimatedSection delay={0.6}>
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="font-heading text-3xl text-ink mb-6 text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-ink/10 rounded-lg p-6 text-center shadow-sm hover:border-purple/50 transition-all">
                <img 
                  src="/team/vilas-kamthe.jpg" 
                  alt="Vilas Kamthe" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-purple/20"
                />
                <h3 className="font-heading text-ink text-xl">Vilas Kamthe</h3>
                <p className="font-body text-purple text-sm">Owner And Founder</p>
              </div>
              <div className="bg-white border border-ink/10 rounded-lg p-6 text-center shadow-sm hover:border-purple/50 transition-all">
                <img 
                  src="/team/sheetal-kamble.jpg" 
                  alt="Sheetal Kamble" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-purple/20"
                />
                <h3 className="font-heading text-ink text-xl">Sheetal Kamble</h3>
                <p className="font-body text-purple text-sm">Managing Director</p>
              </div>
              <div className="bg-white border border-ink/10 rounded-lg p-6 text-center shadow-sm hover:border-purple/50 transition-all">
                <img 
                  src="/team/ajit-roundhal.jpg" 
                  alt="Ajit Roundhal" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-purple/20"
                />
                <h3 className="font-heading text-ink text-xl">Ajit Roundhal</h3>
                <p className="font-body text-purple text-sm">Social Media & Marketing</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Mission Section */}
        <AnimatedSection delay={0.8}>
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="font-heading text-3xl text-ink mb-4">Our Mission</h2>
            <p className="font-body text-ink/70 text-lg leading-relaxed">
              To make every individual's life fitter and better by providing premium 
              fitness experiences, expert guidance, and a community that inspires 
              transformation every single day. We are dedicated to providing top 
              service in Gyms, Fitness Centres, and Gym Personal Trainers.
            </p>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={1.0}>
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