import { siteConfig } from '../content/siteData'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Adiyash Gym" className="h-12 w-auto" />
            <span className="text-ink font-heading text-xl tracking-wider hidden sm:block">
              {siteConfig.gymName}
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              className="text-ink/40 hover:text-ink text-sm font-body transition-colors"
            >
              Admin
            </Link>
            <Link
              to="/select-branch"
              className="bg-purple text-white px-6 py-2 rounded-full font-heading text-sm uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar