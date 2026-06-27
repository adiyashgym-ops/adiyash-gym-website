import { motion } from 'framer-motion'

const AnimatedCard = ({ 
  children, 
  className = '', 
  delay = 0,
  duration = 0.5,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedCard