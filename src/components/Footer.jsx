import { siteConfig } from '../content/siteData'

const Footer = () => {
  return (
    <footer className="bg-black border-t border-offwhite/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 bg-offwhite rounded-full flex items-center justify-center">
            <span className="text-black font-heading text-xl font-bold">AG</span>
          </div>
          <span className="text-offwhite font-heading text-xl tracking-wider">
            {siteConfig.gymName}
          </span>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-8">
          <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-offwhite/60 hover:text-purple transition-colors">
            Instagram
          </a>
          <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-offwhite/60 hover:text-purple transition-colors">
            Facebook
          </a>
          <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="text-offwhite/60 hover:text-purple transition-colors">
            YouTube
          </a>
          <a href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer" className="text-offwhite/60 hover:text-purple transition-colors">
            WhatsApp
          </a>
        </div>

        {/* Locations */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-8 text-sm">
          {siteConfig.locations.map((loc, index) => (
            <span key={index} className="text-offwhite/40">{loc.name}</span>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-offwhite/40 text-sm">
          <p>{siteConfig.footer.copyright}</p>
          <p className="mt-1 text-xs text-offwhite/30">
            {siteConfig.footer.credit}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer