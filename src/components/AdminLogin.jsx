import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginAdmin } from '../lib/adminAuth'

const AdminLogin = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const result = await loginAdmin(password)

      if (result.success) {
        navigate('/admin/dashboard')
      } else {
        setError(result.message || 'Wrong password! Try again.')
      }
    } catch (err) {
      setError('Could not reach the server. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="bg-white border border-ink/10 rounded-lg p-8 max-w-md w-full shadow-sm">
        <h2 className="font-heading text-3xl text-ink text-center mb-2">Admin Login</h2>
        <p className="font-body text-ink/50 text-center mb-8 text-sm">Enter your password to manage offers</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors mb-4"
          />
          {error && <p className="text-red-500 text-sm font-body mb-4">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-purple text-white py-3 rounded-lg font-heading uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-[1.02] disabled:opacity-60"
          >
            {submitting ? 'Checking...' : 'Login'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default AdminLogin