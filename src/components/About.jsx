import { siteConfig } from '../content/siteData'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

const About = () => {
  const timelineData = [
    {
      year: '2010',
      title: 'Business Born',
      description: 'The vision for Adiyash Gym was born — a dream to make fitness accessible to everyone.',
    },
    {
      year: '2015',
      title: 'Ladies Gym',
      description: "Adiyash's first dedicated ladies-only fitness space, created to empower women in a safe, supportive environment.",
      date: '11/01/2015',
    },
    {
      year: '2015',
      title: 'Unisex Gym',
      description: 'The original Adiyash Gym — where it all began. A community hub for fitness enthusiasts of all levels.',
      date: '31/05/2015',
    },
    {
      year: '2020',
      title: 'Kandivali',
      description: 'Opened during challenging times, Kandivali became a beacon of health and resilience for the community.',
      date: '01/11/2020',
    },
    {
      year: '2022',
      title: 'Vikhroli',
      description: "A modern facility designed to bring premium fitness to the heart of Vikhroli's growing community.",
      date: '02/10/2022',
    },
    {
      year: '2024',
      title: 'Kurla',
      description: 'Our newest flagship location, offering state-of-the-art equipment and a premium fitness experience.',
      date: '21/01/2024',
    },
    {
      year: '2024',
      title: 'Marol',
      description: 'A fresh, vibrant space for the Marol community — the latest addition to the Adiyash family.',
      date: '05/06/2024',
    },
    {
      year: '2025',
      title: 'V49 Thane',
      description: "The newest branch in Thane, bringing Adiyash's signature fitness experience to a new city.",
      date: '30/04/2025',
    },
  ]

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
              Adiyash Gym was established in 2010 in Asalfa-Ghatkopar West, Mumbai, with a 
              vision to create a fitness space that truly transforms lives. Over the years, 
              it has grown into one of the most trusted gyms in Mumbai, serving thousands 
              of members across multiple branches.
            </p>
            <p className="font-body text-ink/70 text-lg leading-relaxed mb-4">
              What started as a single location is now a network of 7+ branches across 
              Mumbai and Thane, each built on the same foundation of quality, community, 
              and results. Our belief in customer satisfaction and our commitment to 
              excellence has helped us build a loyal community of members who trust us 
              with their fitness journey.
            </p>
            <p className="font-body text-ink/70 text-lg leading-relaxed">
              Today, Adiyash Gym continues to expand, bringing premium fitness experiences 
              to more people. Whether you're a beginner or a seasoned athlete, our doors 
              are open to everyone who wants to become a better version of themselves.
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/owner" className="bg-white border border-ink/10 rounded-lg p-6 text-center shadow-sm hover:border-purple/50 transition-all hover:scale-[1.02] cursor-pointer block">
                <img 
                  src="/team/vilas-kamathe.jpg" 
                  alt="Vilas Kamateh" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-purple/20"
                />
                <h3 className="font-heading text-ink text-xl">Vilas Kamateh</h3>
                <p className="font-body text-purple text-sm">Owner & Founder</p>
                <p className="font-body text-ink/40 text-xs mt-2">Click to view profile →</p>
              </Link>

              <div className="bg-white border border-ink/10 rounded-lg p-6 text-center shadow-sm hover:border-purple/50 transition-all hover:scale-[1.02]">
                <img 
                  src="/team/sheetal-kamble.jpg" 
                  alt="Sheetal Kamble" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-purple/20"
                />
                <h3 className="font-heading text-ink text-xl">Sheetal Kamble</h3>
                <p className="font-body text-purple text-sm">Managing Director</p>
              </div>

              <div className="bg-white border border-ink/10 rounded-lg p-6 text-center shadow-sm hover:border-purple/50 transition-all hover:scale-[1.02]">
                <img 
                  src="/team/ajit-roundhal.jpg" 
                  alt="Ajit Roundhal" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-purple/20"
                />
                <h3 className="font-heading text-ink text-xl">Ajit Roundhal</h3>
                <p className="font-body text-purple text-sm">Operations Head</p>
              </div>

              <div className="bg-white border border-ink/10 rounded-lg p-6 text-center shadow-sm hover:border-purple/50 transition-all hover:scale-[1.02]">
                <img 
                  src="/team/yash-vilas.jpg" 
                  alt="Yash Vilas Kamathe" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-purple/20"
                />
                <h3 className="font-heading text-ink text-xl">Yash Vilas Kamathe</h3>
                <p className="font-body text-purple text-sm">Sales & Marketing</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ===== OUR JOURNEY TIMELINE ===== */}
        <AnimatedSection delay={0.8}>
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="font-heading text-3xl text-ink mb-2 text-center">Our Journey</h2>
            <p className="font-body text-ink/60 text-center max-w-2xl mx-auto mb-10">
              16 Years of Excellence — From a vision in 2010 to 7+ branches across Mumbai
            </p>

            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-purple/30"></div>

              {timelineData.map((item, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-purple rounded-full transform -translate-x-1.5 md:-translate-x-1.5 mt-2 z-10"></div>

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-white border border-ink/10 rounded-lg p-6 shadow-sm hover:border-purple/50 transition-all hover:scale-[1.01]">
                      <div className="flex items-center justify-between md:block">
                        <span className="font-heading text-2xl text-purple">{item.year}</span>
                        {item.date && (
                          <span className="text-ink/40 text-sm font-body ml-2 md:ml-0 md:block">
                            {item.date}
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading text-xl text-ink mt-2">{item.title}</h3>
                      <p className="font-body text-ink/60 text-sm mt-1">{item.description}</p>
                    </div>
                  </div>

                  {/* Empty spacer for alternating */}
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Mission Section */}
        <AnimatedSection delay={1.0}>
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
        <AnimatedSection delay={1.2}>
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