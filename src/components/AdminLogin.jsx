import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === 'editoffer') {
      navigate('/admin/dashboard')
    } else {
      setError('Wrong password! Try again.')
    }
  }

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-black/50 border border-offwhite/10 rounded-lg p-8 max-w-md w-full">
        <h2 className="font-heading text-3xl text-offwhite text-center mb-2">Admin Login</h2>
        <p className="font-body text-offwhite/50 text-center mb-8 text-sm">Enter your password to manage offers</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/50 border border-offwhite/10 rounded-lg px-4 py-3 text-offwhite font-body focus:outline-none focus:border-purple transition-colors mb-4"
          />
          {error && <p className="text-red-500 text-sm font-body mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-purple text-offwhite py-3 rounded-lg font-heading uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-[1.02]"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  )
}

export default AdminLogin