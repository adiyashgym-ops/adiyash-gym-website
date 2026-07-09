import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fetchExerciseById } from '../lib/exerciseApi'

const ExercisePage = () => {
  const { exerciseId } = useParams()
  const [exercise, setExercise] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [gifUrl, setGifUrl] = useState(null)
  const [gifLoading, setGifLoading] = useState(false)

  useEffect(() => {
    const loadExercise = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchExerciseById(exerciseId)
        setExercise(data)
      } catch (err) {
        setError('Failed to load exercise details. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadExercise()
  }, [exerciseId])

  useEffect(() => {
    if (!exercise?.id) return
    let objectUrl = null

    const fetchGif = async () => {
      setGifLoading(true)
      try {
        const response = await fetch(
          `https://exercisedb.p.rapidapi.com/image?exerciseId=${exercise.id}&resolution=360`,
          {
            headers: {
              'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
              'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
            }
          }
        )
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const blob = await response.blob()
        objectUrl = URL.createObjectURL(blob)
        setGifUrl(objectUrl)
      } catch (err) {
        console.error('GIF load failed:', err)
        setGifUrl(null)
      } finally {
        setGifLoading(false)
      }
    }

    fetchGif()
    return () => { if (objectUrl) URL.revokeObjectURL(objectUrl) }
  }, [exercise])

  if (loading) {
    return (
      <section className="min-h-screen bg-cream pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="w-full h-64 bg-ink/10 rounded-2xl mb-6"></div>
            <div className="h-10 bg-ink/10 rounded-lg max-w-md mx-auto mb-4"></div>
            <div className="h-6 bg-ink/5 rounded-lg max-w-sm mx-auto"></div>
          </div>
          <p className="font-body text-ink/40 mt-8">Loading exercise...</p>
        </div>
      </section>
    )
  }

  if (error || !exercise) {
    return (
      <section className="min-h-screen bg-cream pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-6xl mb-6">❌</div>
          <h2 className="font-heading text-3xl text-ink mb-3">Exercise Not Found</h2>
          <p className="font-body text-ink/60 mb-6">{error || "The exercise you're looking for doesn't exist."}</p>
          <Link
            to="/machines"
            className="bg-purple text-white px-8 py-3 rounded-full font-heading text-sm uppercase tracking-wider hover:bg-purple-light transition-all"
          >
            Back to Machines
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-cream pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto">

        <Link
          to="/machines"
          className="text-purple hover:text-purple-light font-body inline-block mb-6"
        >
          ← Back to Machines
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-ink/10 rounded-2xl overflow-hidden shadow-sm"
        >
          {/* GIF */}
          <div className="w-full bg-[#1a1a1a] flex items-center justify-center min-h-[300px]">
            {gifLoading ? (
              <div className="text-center">
                <div className="animate-spin w-10 h-10 border-4 border-purple border-t-transparent rounded-full mx-auto mb-3"></div>
                <p className="font-body text-white/40 text-sm">Loading animation...</p>
              </div>
            ) : gifUrl ? (
              <img
                src={gifUrl}
                alt={exercise.name}
                className="w-auto h-auto max-w-[280px] max-h-[280px] object-contain"
                style={{ imageRendering: 'auto' }}
              />
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-3">🏋️</div>
                <p className="font-body text-white/40 text-sm">No animation available</p>
              </div>
            )}
          </div>

          <div className="p-6 md:p-8">
            <h1 className="font-['Anton'] text-3xl md:text-4xl text-ink uppercase tracking-wide mb-4">
              {exercise.name}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {exercise.target && (
                <span className="text-sm font-body text-purple bg-purple/10 px-4 py-1.5 rounded-full">
                  🎯 {exercise.target}
                </span>
              )}
              {exercise.bodyPart && (
                <span className="text-sm font-body text-ink/40 bg-ink/5 px-4 py-1.5 rounded-full">
                  {exercise.bodyPart}
                </span>
              )}
              {exercise.equipment && (
                <span className="text-sm font-body text-ink/40 bg-ink/5 px-4 py-1.5 rounded-full">
                  🏋️ {exercise.equipment}
                </span>
              )}
            </div>

            {exercise.instructions && exercise.instructions.length > 0 && (
              <div>
                <h2 className="font-heading text-xl text-ink mb-4">How to Do It</h2>
                <ol className="space-y-3">
                  {exercise.instructions.map((step, index) => (
                    <li key={index} className="flex gap-4 text-ink/70 font-body leading-relaxed">
                      <span className="text-purple font-bold min-w-[24px]">{index + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
              <div className="mt-6 pt-6 border-t border-ink/10">
                <h3 className="font-heading text-sm text-ink/40 uppercase tracking-wider mb-3">
                  Secondary Muscles
                </h3>
                <div className="flex flex-wrap gap-2">
                  {exercise.secondaryMuscles.map((muscle, index) => (
                    <span key={index} className="text-sm font-body text-ink/60 bg-ink/5 px-3 py-1 rounded-full">
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <div className="text-center mt-8">
          <Link
            to="/machines"
            className="inline-block bg-purple text-white px-8 py-3 rounded-full font-heading text-sm uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105"
          >
            Explore More Machines
          </Link>
        </div>

      </div>
    </section>
  )
}

export default ExercisePage