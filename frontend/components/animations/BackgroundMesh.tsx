'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function BackgroundMesh({ className = '' }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Radial ambient glow 1: Crimson Red subtle pulse */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, 20, -15, 0],
                y: [0, -25, 15, 0],
                scale: [1, 1.08, 0.95, 1],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-crimson-600/15 blur-[120px]"
      />

      {/* Radial ambient glow 2: Warm Gold accent */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, -30, 20, 0],
                y: [0, 25, -20, 0],
                scale: [1, 0.92, 1.05, 1],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-1/4 -right-24 w-[28rem] h-[28rem] rounded-full bg-gold-400/12 blur-[130px]"
      />

      {/* Radial ambient glow 3: Deep Neutral Charcoal - Zero Blue */}
      <div className="absolute -bottom-40 left-1/3 w-[36rem] h-[36rem] rounded-full bg-neutral-900/40 blur-[140px]" />

      {/* Subtle architectural grid */}
      <div className="absolute inset-0 bg-grid-subtle opacity-60" />
    </div>
  );
}

export default BackgroundMesh;
