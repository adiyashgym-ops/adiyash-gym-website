import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { siteConfig } from '../content/siteData'

const Facilities = () => {
  const { branchId } = useParams()
  const [branch, setBranch] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const foundBranch = siteConfig.branches.find(b => b.id === branchId)
    if (foundBranch) {
      setBranch(foundBranch)
    }
    setLoading(false)
  }, [branchId])

  if (loading) {
    return (
      <section className="min-h-screen bg-cream pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-body text-ink/40">Loading facilities...</p>
        </div>
      </section>
    )
  }

  if (!branch) {
    return (
      <section className="min-h-screen bg-cream pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-heading text-3xl text-ink mb-3">Branch Not Found</h2>
          <p className="font-body text-ink/60 mb-6">The branch you're looking for doesn't exist.</p>
          <Link to="/locations" className="bg-purple text-white px-8 py-3 rounded-full font-heading text-sm uppercase tracking-wider hover:bg-purple-light transition-all">
            Back to Locations
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-cream pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          to="/locations"
          className="text-purple hover:text-purple-light font-body inline-block mb-6"
        >
          ← Back to Locations
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-['Anton'] text-4xl md:text-5xl text-ink uppercase tracking-wide">
            {branch.name}
          </h1>
          <p className="font-body text-ink/50 mt-2">
            {branch.facilities.length} facilities available
          </p>
        </motion.div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {branch.facilities.map((facility, index) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-ink/10 rounded-xl p-5 text-center hover:border-purple/50 transition-all hover:scale-[1.03] shadow-sm"
            >
              {/* Icon - will be replaced by image later */}
              <div className="text-4xl mb-3">{facility.icon}</div>
              <h3 className="font-heading text-ink text-sm md:text-base uppercase tracking-wider">
                {facility.name}
              </h3>
              {facility.note && (
                <p className="font-body text-ink/40 text-xs mt-2 italic">
                  {facility.note}
                </p>
              )}
              {/* Hidden image placeholder - ready for future */}
              <div className="hidden">{facility.image}</div>
            </motion.div>
          ))}
        </div>

        {/* Back to Locations CTA */}
        <div className="text-center mt-12">
          <Link
            to="/locations"
            className="inline-block bg-purple text-white px-8 py-3 rounded-full font-heading text-sm uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105"
          >
            View All Locations
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Facilities