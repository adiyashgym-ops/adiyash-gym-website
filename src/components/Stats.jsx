import { siteConfig } from '../content/siteData'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const Stats = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [counts, setCounts] = useState(siteConfig.stats.map(() => 0))

  useEffect(() => {
    if (isInView) {
      const newCounts = siteConfig.stats.map((stat) => {
        const target = parseInt(stat.number.replace(/[^0-9]/g, ''))
        return target
      })
      
      // Animate each count
      const durations = [1000, 1000, 1000, 1000]
      const startTimes = [0, 200, 400, 600]
      
      siteConfig.stats.forEach((stat, index) => {
        const target = parseInt(stat.number.replace(/[^0-9]/g, ''))
        const duration = durations[index]
        const startTime = startTimes[index]
        
        setTimeout(() => {
          let start = 0
          const increment = target / (duration / 16)
          const interval = setInterval(() => {
            start += increment
            if (start >= target) {
              start = target
              clearInterval(interval)
            }
            setCounts(prev => {
              const newArr = [...prev]
              newArr[index] = Math.floor(start)
              return newArr
            })
          }, 16)
        }, startTime)
      })
    }
  }, [isInView])

  const getDisplayNumber = (stat, count) => {
    if (stat.number.includes('+')) {
      return count + '+'
    }
    return count
  }

  return (
    <section ref={ref} className="py-16 md:py-24 bg-cream border-t border-b border-ink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {siteConfig.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="font-heading text-4xl md:text-5xl lg:text-6xl text-purple font-bold"
              >
                {getDisplayNumber(stat, counts[index])}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                className="font-body text-sm md:text-base text-ink/60 mt-2 uppercase tracking-wider"
              >
                {stat.label}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats