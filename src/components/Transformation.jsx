import { siteConfig } from '../content/siteData'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import AnimatedCard from './AnimatedCard'
import { useState } from 'react'

const Transformation = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState('')

  // Instagram Reels
  const instagramReels = [
    {
      id: 'reel1',
      url: 'https://www.instagram.com/reel/DWoqquSjBcG/embed',
      title: 'Training like a pro...'
    },
    {
      id: 'reel2',
      url: 'https://www.instagram.com/reel/DWa-w9bDAyN/embed',
      title: 'Pumping Iron...'
    },
    {
      id: 'reel3',
      url: 'https://www.instagram.com/reel/DWBars_DGYP/embed',
      title: 'Mumbai shree #bodybuilding'
    }
  ]

  // YouTube Videos (same as homepage)
  const youtubeVideos = [
    {
      id: 'story1',
      videoId: 'ZRRQor-5eOE',
      title: 'Adiyash Gym | Before & After Stories | Ep 5 | Kandivali'
    },
    {
      id: 'story2',
      videoId: 'c2blybicHac',
      title: 'Adiyash Gym | Before & After Stories | Ep 4 | Kandivali'
    },
    {
      id: 'story3',
      videoId: 'XivOEGm-1rE',
      title: 'Adiyash Gym | Before & After Stories | Ep 8 | Kurla'
    }
  ]

  // Client photos (10 images)
  const clientPhotos = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    src: `/transformations/client-${i + 1}.jpg`
  }))

  const openLightbox = (image) => {
    setLightboxImage(image)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setLightboxImage('')
    document.body.style.overflow = 'auto'
  }

  return (
    <section className="min-h-screen bg-cream py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="text-purple hover:text-purple-light font-body mb-6 inline-block">
          ← Back to Home
        </Link>

        {/* Page Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-['Anton'] text-[#832D81] text-4xl md:text-6xl lg:text-7xl flex items-center justify-center gap-1 flex-wrap mb-4"
        >
          <span>AD</span>
          <img 
            src="/red-mark.png" 
            alt="" 
            className="h-[0.85em] inline-block align-middle" 
          />
          <span>YASH</span>
          <span className="text-ink">TRANSFORMATIONS</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-body text-lg md:text-xl text-ink/60 text-center max-w-2xl mx-auto mb-12"
        >
          Real transformations from our members. Watch their journeys, get inspired, and start yours.
        </motion.p>

        {/* ===== INSTAGRAM REELS ===== */}
        <AnimatedSection>
          <h2 className="font-heading text-3xl md:text-4xl text-ink text-center mb-8">
            Instagram Reels
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {instagramReels.map((reel, index) => (
            <AnimatedCard key={reel.id} delay={index * 0.1}>
              <div className="bg-white border border-ink/10 rounded-lg overflow-hidden shadow-sm hover:border-purple/50 transition-all hover:scale-[1.02]">
                <div className="aspect-[9/16] w-full bg-black/5">
                  <iframe
                    src={reel.url}
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                    loading="lazy"
                    title={reel.title}
                  ></iframe>
                </div>
                <div className="p-4 text-center">
                  <p className="font-body text-ink/60 text-sm">{reel.title}</p>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* ===== YOUTUBE VIDEOS ===== */}
        <AnimatedSection>
          <h2 className="font-heading text-3xl md:text-4xl text-ink text-center mb-8">
            YouTube Stories
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {youtubeVideos.map((video, index) => (
            <AnimatedCard key={video.id} delay={index * 0.1}>
              <div className="bg-white border border-ink/10 rounded-lg overflow-hidden shadow-sm hover:border-purple/50 transition-all hover:scale-[1.02]">
                <div className="aspect-video w-full bg-purple/10">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="p-4">
                  <p className="font-body text-ink/60 text-sm">{video.title}</p>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* ===== PHOTOS COLLAGE ===== */}
        <AnimatedSection>
          <h2 className="font-heading text-3xl md:text-4xl text-ink text-center mb-8">
            Transformation Photos
          </h2>
          <p className="font-body text-ink/60 text-center max-w-2xl mx-auto mb-10">
            Real results from real members. Click any photo to enlarge.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {clientPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="aspect-square overflow-hidden rounded-lg border border-ink/10 hover:border-purple/50 transition-all hover:scale-[1.05] cursor-pointer shadow-sm"
              onClick={() => openLightbox(photo.src)}
            >
              <img 
                src={photo.src} 
                alt={`Transformation ${photo.id}`} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        {/* ===== CTA ===== */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/select-branch"
            className="inline-block bg-purple text-white px-10 py-4 rounded-full font-heading text-base uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105 shadow-lg"
          >
            Start Your Transformation
          </Link>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl w-full">
            <button
              className="absolute top-4 right-4 text-white text-3xl hover:text-purple transition-colors"
              onClick={closeLightbox}
            >
              ✕
            </button>
            <img 
              src={lightboxImage} 
              alt="Transformation" 
              className="w-full h-auto max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default Transformation