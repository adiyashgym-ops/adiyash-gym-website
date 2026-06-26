import React from 'react'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'default',
  className = '',
  href = '#',
  onClick,
  target = '_self',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-heading uppercase tracking-wider transition-all duration-300 font-bold'
  
  const variants = {
    primary: 'bg-purple text-offwhite hover:bg-purple-light hover:scale-105',
    secondary: 'bg-transparent border-2 border-offwhite text-offwhite hover:bg-offwhite hover:text-black hover:scale-105',
    outline: 'bg-transparent border-2 border-purple text-purple hover:bg-purple hover:text-offwhite hover:scale-105',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    default: 'px-8 py-4 text-base',
    lg: 'px-12 py-5 text-lg',
  }
  
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`
  
  if (href.startsWith('http') || href.startsWith('https') || href.startsWith('wa.me')) {
    return (
      <a 
        href={href} 
        target={target} 
        rel={target === '_blank' ? 'noopener noreferrer' : ''}
        className={classes}
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    )
  }
  
  return (
    <button 
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button