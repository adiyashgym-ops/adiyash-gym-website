import { siteConfig } from '../content/siteData'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-offwhite/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-offwhite rounded-full flex items-center justify-center">
              <span className="text-black font-heading text-xl font-bold">AG</span>
            </div>
            <span className="text-offwhite font-heading text-xl tracking-wider hidden sm:block">
              {siteConfig.gymName}
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Admin Login Link */}
            <Link
              to="/admin"
              className="text-offwhite/40 hover:text-offwhite text-sm font-body transition-colors"
            >
              Admin
            </Link>

            {/* CTA Button */}
            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple text-offwhite px-6 py-2 rounded-full font-heading text-sm uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105"
            >
              Join Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar