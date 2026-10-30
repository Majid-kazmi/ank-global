'use client';

import React, { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface CardHoverProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function CardHover({ children, className = '', onClick }: CardHoverProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div onClick={onClick} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      onClick={onClick}
      whileHover={{
        y: -5,
        transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
      }}
      whileTap={{ scale: 0.99 }}
      className={`group relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default CardHover;
