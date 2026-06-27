import { useState } from 'react'
import { siteConfig } from '../content/siteData'
import { Link } from 'react-router-dom'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Send to WhatsApp
    const message = `Hi! I have a question.%0A%0AName: ${formData.name}%0AEmail: ${formData.email}%0AMessage: ${formData.message}`
    window.open(`https://wa.me/${siteConfig.mainPhone}?text=${message}`, '_blank')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="min-h-screen bg-cream py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="text-purple hover:text-purple-light font-body mb-6 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider text-ink text-center mb-4">
          Contact Us
        </h1>
        <p className="font-body text-lg md:text-xl text-ink/60 text-center max-w-2xl mx-auto mb-12">
          Reach out to any of our 7 branches across Mumbai
        </p>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {siteConfig.branches.map((branch) => (
            <div key={branch.id} className="bg-white border border-ink/10 rounded-lg p-6 hover:border-purple/50 transition-all shadow-sm">
              <h3 className="font-heading text-xl text-ink mb-2">{branch.name}</h3>
              <p className="font-body text-ink/60 text-sm mb-2">{branch.address}</p>
              <p className="font-body text-purple text-xs mb-3">⏰ {branch.timings}</p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`tel:${branch.phone}`}
                  className="text-ink/60 hover:text-purple text-sm font-body transition-colors"
                >
                  📞 {branch.phone}
                </a>
                <span className="text-ink/20">|</span>
                <a
                  href={`https://wa.me/${branch.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink/60 hover:text-purple text-sm font-body transition-colors"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-2xl text-ink text-center mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="bg-white border border-ink/10 rounded-lg p-8 shadow-sm">
            <div className="mb-4">
              <label className="font-body text-ink/60 text-sm block mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors"
                required
              />
            </div>
            <div className="mb-4">
              <label className="font-body text-ink/60 text-sm block mb-1">Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors"
                required
              />
            </div>
            <div className="mb-6">
              <label className="font-body text-ink/60 text-sm block mb-1">Message</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-3 text-ink font-body focus:outline-none focus:border-purple transition-colors resize-none"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-purple text-white py-3 rounded-lg font-heading uppercase tracking-wider hover:bg-purple-light transition-all hover:scale-[1.02]"
            >
              {submitted ? '✅ Sent!' : 'Send Message'}
            </button>
            <p className="text-ink/40 text-xs text-center mt-4">
              We'll respond within 24 hours via WhatsApp
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact