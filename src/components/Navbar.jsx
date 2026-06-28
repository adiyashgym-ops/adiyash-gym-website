import { siteConfig } from '../content/siteData'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { trackWhatsAppLead } from '../lib/tracking'

const Navbar = () => {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path) => {
    return location.pathname === path
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Trainers', path: '/trainers' },
    { name: 'Locations', path: '/locations' },
    { name: 'Contact', path: '/contact' },
  ]

  const handleJoinNow = () => {
    trackWhatsAppLead('all', 'navbar_join_now')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Adiyash Gym" className="h-12 w-auto" />
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-0.5"
            >
              <span className="text-ink font-heading text-xl tracking-wider hidden sm:block">AD</span>
              <img 
                src="/red-mark.png" 
                alt="" 
                className="h-5 w-auto hidden sm:inline-block" 
              />
              <span className="text-ink font-heading text-xl tracking-wider hidden sm:block">YASH GYM</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-body text-sm transition-colors ${
                  isActive(link.path)
                    ? 'text-purple font-semibold'
                    : 'text-ink/60 hover:text-purple'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Join Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/admin"
              className="text-ink/40 hover:text-ink text-sm font-body transition-colors"
            >
              Admin
            </Link>
            <Link
              to="/select-branch"
              onClick={handleJoinNow}
              className="bg-purple text-white px-6 py-2 rounded-full font-heading text-sm uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-105"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-ink p-2 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-ink/10 py-4 px-4">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-body text-sm py-2 transition-colors ${
                  isActive(link.path)
                    ? 'text-purple font-semibold'
                    : 'text-ink/60 hover:text-purple'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-ink/40 hover:text-ink text-sm font-body py-2 transition-colors"
            >
              Admin
            </Link>
            <Link
              to="/select-branch"
              onClick={() => {
                setMobileMenuOpen(false)
                handleJoinNow()
              }}
              className="bg-purple text-white px-6 py-2 rounded-full font-heading text-sm uppercase tracking-wider text-center hover:bg-purple-light transition-all"
            >
              Join Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar