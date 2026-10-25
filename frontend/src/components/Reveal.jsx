import { motion } from 'framer-motion';

/**
 * Subtle fade-and-rise when an element scrolls into view.
 * Reduced-motion is handled globally by <MotionConfig reducedMotion="user"> in App.jsx.
 */
export default function Reveal({ as = 'div', delay = 0, className = '', children }) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </Component>
  );
}
