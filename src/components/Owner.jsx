import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

const Owner = () => {
  return (
    <section className="min-h-screen bg-cream py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/about" className="text-purple hover:text-purple-light font-body mb-6 inline-block">
          ← Back to About
        </Link>

        {/* Owner Profile */}
        <div className="bg-white border border-ink/10 rounded-lg overflow-hidden shadow-sm">
          <div className="md:flex">
            {/* Photo */}
            <div className="md:w-1/3 bg-purple/5 flex items-center justify-center p-8">
              <img 
                src="/team/vilas-kamathe.jpg" 
                alt="Vilas Kamateh" 
                className="w-64 h-64 rounded-full object-cover border-4 border-purple/20"
              />
            </div>

            {/* Info */}
            <div className="md:w-2/3 p-8 md:p-10">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-heading text-3xl md:text-4xl text-ink mb-2"
              >
                Vilas Kamateh
              </motion.h1>
              <p className="font-body text-purple font-semibold text-lg mb-4">
                Owner & Founder
              </p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4 text-ink/70 font-body leading-relaxed"
              >
                <p>
                  Vilas Kamateh started Adiyash Gym in 2010 with a vision to make 
                  fitness accessible to everyone. What began as a single location 
                  has now grown into 7 branches across Mumbai, creating a community 
                  of thousands of transformed lives.
                </p>
                <p>
                  His passion for fitness and dedication to helping others achieve 
                  their goals has been the driving force behind Adiyash Gym's success. 
                  Under his leadership, the gym has become a trusted name in the 
                  fitness industry, known for its expert trainers, state-of-the-art 
                  facilities, and commitment to member success.
                </p>
                <p>
                  Today, Adiyash Gym continues to grow, with a mission to make 
                  every individual's life fitter and better.
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-ink/10"
              >
                <div className="text-center">
                  <p className="font-heading text-2xl text-purple">2010</p>
                  <p className="font-body text-xs text-ink/40">Started</p>
                </div>
                <div className="text-center">
                  <p className="font-heading text-2xl text-purple">7</p>
                  <p className="font-body text-xs text-ink/40">Branches</p>
                </div>
                <div className="text-center">
                  <p className="font-heading text-2xl text-purple">5000+</p>
                  <p className="font-body text-xs text-ink/40">Transformations</p>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8"
              >
                <Link
                  to="/select-branch"
                  className="inline-block bg-purple text-white px-8 py-3 rounded-full font-heading text-sm uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105"
                >
                  Join Adiyash Gym
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Owner