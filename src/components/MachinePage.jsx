import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  fetchExercisesByEquipment, 
  slugify, 
  getEquipmentDisplayName,
  getEquipmentIcon 
} from '../lib/exerciseApi'

const MachinePage = () => {
  const { machineSlug } = useParams()
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const loadExercises = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // Convert slug back to equipment name
        const equipmentName = machineSlug.replace(/-/g, ' ')
        const data = await fetchExercisesByEquipment(equipmentName)
        
        if (data && data.length > 0) {
          setExercises(data)
        } else {
          setError('No exercises found for this machine.')
        }
      } catch (err) {
        setError('Failed to load exercises. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    loadExercises()
  }, [machineSlug])

  const displayName = getEquipmentDisplayName(machineSlug.replace(/-/g, ' '))
  const icon = getEquipmentIcon(machineSlug.replace(/-/g, ' '))

  // Filter exercises by search term
  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.target?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <section className="min-h-screen bg-cream pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="w-24 h-24 bg-purple/20 rounded-full mx-auto mb-6"></div>
            <div className="h-10 bg-ink/10 rounded-lg max-w-md mx-auto mb-4"></div>
            <div className="h-6 bg-ink/5 rounded-lg max-w-sm mx-auto"></div>
          </div>
          <p className="font-body text-ink/40 mt-8">Loading exercises...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="min-h-screen bg-cream pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">❌</div>
          <h2 className="font-heading text-3xl text-ink mb-3">Oops!</h2>
          <p className="font-body text-ink/60 mb-6">{error}</p>
          <Link
            to="/"
            className="bg-purple text-white px-8 py-3 rounded-full font-heading text-sm uppercase tracking-wider hover:bg-purple-light transition-all"
          >
            Back to Home
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-cream pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/machines"
          className="text-purple hover:text-purple-light font-body inline-block mb-6"
        >
          ← Back to Machines
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="text-6xl mb-4">{icon}</div>
          <h1 className="font-['Anton'] text-4xl md:text-5xl text-ink uppercase tracking-wide">
            {displayName}
          </h1>
          <p className="font-body text-ink/50 mt-2">
            {exercises.length} {exercises.length === 1 ? 'exercise' : 'exercises'} available
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-ink/10 rounded-lg px-6 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors shadow-sm"
          />
        </div>

        {/* Exercise List */}
        <div className="space-y-4">
          {filteredExercises.length === 0 ? (
            <p className="text-center text-ink/40 font-body py-8">
              No exercises found matching "{searchTerm}"
            </p>
          ) : (
            filteredExercises.map((exercise, index) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/exercise/${exercise.id}`}
                  className="block bg-white border border-ink/10 rounded-lg p-5 hover:border-purple/50 transition-all hover:scale-[1.01] shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    {/* Exercise GIF Thumbnail */}
                    {exercise.gifUrl && (
                      <img
                        src={exercise.gifUrl}
                        alt={exercise.name}
                        className="w-20 h-20 object-cover rounded-lg bg-purple/5"
                        loading="lazy"
                      />
                    )}
                    
                    <div className="flex-1">
                      <h3 className="font-heading text-ink text-lg">{exercise.name}</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {exercise.target && (
                          <span className="text-xs font-body text-purple bg-purple/10 px-3 py-1 rounded-full">
                            🎯 {exercise.target}
                          </span>
                        )}
                        {exercise.bodyPart && (
                          <span className="text-xs font-body text-ink/40 bg-ink/5 px-3 py-1 rounded-full">
                            {exercise.bodyPart}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-purple text-sm font-body">
                      View →
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default MachinePage