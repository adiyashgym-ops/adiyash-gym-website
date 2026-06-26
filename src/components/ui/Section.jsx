import React from 'react'
import Container from './Container'

const Section = ({ 
  children, 
  className = '',
  dark = true,
}) => {
  const bgClass = dark ? 'bg-black' : 'bg-offwhite/5'
  
  return (
    <section className={`py-16 md:py-24 ${bgClass} ${className}`}>
      <Container>
        {children}
      </Container>
    </section>
  )
}

export default Section