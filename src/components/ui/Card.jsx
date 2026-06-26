import React from 'react'

const Card = ({ 
  children, 
  className = '',
  hover = true,
}) => {
  const baseStyles = 'bg-black/30 backdrop-blur-sm border border-offwhite/10 rounded-lg p-6 md:p-8 transition-all duration-300'
  const hoverStyles = hover ? 'hover:border-purple/50 hover:shadow-lg hover:shadow-purple/10 hover:scale-[1.02]' : ''
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  )
}

export default Card