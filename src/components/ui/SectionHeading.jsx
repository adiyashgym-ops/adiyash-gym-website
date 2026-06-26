import React from 'react'

const SectionHeading = ({ 
  title, 
  subtitle, 
  className = '',
  align = 'center',
}) => {
  const alignClasses = {
    center: 'text-center',
    left: 'text-left',
    right: 'text-right',
  }
  
  return (
    <div className={`mb-16 ${alignClasses[align]} ${className}`}>
      <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider text-offwhite mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="font-body text-lg md:text-xl text-offwhite/70 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionHeading