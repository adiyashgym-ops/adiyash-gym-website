import React from 'react'

const Container = ({ 
  children, 
  className = '',
  fluid = false,
}) => {
  return (
    <div className={`${fluid ? 'px-4 sm:px-6' : 'max-w-7xl mx-auto px-4 sm:px-6'} ${className}`}>
      {children}
    </div>
  )
}

export default Container