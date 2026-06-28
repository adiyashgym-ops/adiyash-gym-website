import { siteConfig } from '../content/siteData'
import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import AnimatedCard from './AnimatedCard'

const Stories = () => {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider text-ink text-center mb-4">
            Before & After Stories
          </h2>
        </AnimatedSection>
        
        <AnimatedSection delay={0.2}>
          <p className="font-body text-lg md:text-xl text-ink/60 text-center max-w-2xl mx-auto mb-12">
            Real transformations from our members
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteConfig.stories.map((story, index) => (
            <AnimatedCard key={story.id} delay={index * 0.1}>
              <div className="bg-white border border-ink/10 rounded-lg overflow-hidden hover:border-purple/50 transition-all hover:scale-[1.02] shadow-sm">
                <div className="aspect-video w-full bg-purple/10">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${story.videoId}`}
                    title={story.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-ink text-lg">{story.title}</h3>
                  <p className="font-body text-ink/60 text-sm">{story.tagline}</p>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href={siteConfig.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple text-white px-8 py-3 rounded-full font-heading text-sm uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105"
          >
            Watch More on YouTube
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Stories