
import React from 'react';
import { motion } from 'framer-motion';

function LeafAccent({ size = 'md', position = 'top-right', opacity = 0.2, className = '' }) {
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-48 h-48',
  };

  const positionMap = {
    'top-right': 'top-0 right-0 translate-x-1/4 -translate-y-1/4',
    'top-left': 'top-0 left-0 -translate-x-1/4 -translate-y-1/4 rotate-90',
    'bottom-right': 'bottom-0 right-0 translate-x-1/4 translate-y-1/4 -rotate-90',
    'bottom-left': 'bottom-0 left-0 -translate-x-1/4 translate-y-1/4 rotate-180',
  };

  return (
    <motion.div
      initial={{ opacity: 0, rotate: -10 }}
      animate={{ opacity, rotate: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className={`absolute pointer-events-none z-0 text-primary-botanical ${sizeMap[size]} ${positionMap[position]} ${className}`}
      style={{ opacity }}
    >
      <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0C50 0 100 20 100 50C100 80 50 100 50 100C50 100 0 80 0 50C0 20 50 0 50 0Z" />
        <path d="M50 100C50 100 45 60 50 0" stroke="hsl(var(--background))" strokeWidth="2" fill="none" />
      </svg>
    </motion.div>
  );
}

export default LeafAccent;
