import React from 'react'
import Container from './Container'

const Section = ({ 
  children, 
  className = '',
  light = true,
}) => {
  const bgClass = light ? 'bg-cream' : 'bg-cream/80'
  
  return (
    <section className={`py-16 md:py-24 ${bgClass} ${className}`}>
      <Container>
        {children}
      </Container>
    </section>
  )
}

export default Section