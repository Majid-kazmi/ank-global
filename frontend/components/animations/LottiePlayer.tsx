'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useReducedMotion } from 'framer-motion';

// Dynamically import Lottie from lottie-react named export
const Lottie = dynamic<any>(
  () => import('lottie-react').then((mod) => mod.Lottie),
  { ssr: false }
);

interface LottiePlayerProps {
  animationData?: any;
  src?: string;
  animationPath?: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  fallbackIcon?: React.ReactNode;
  fallback?: React.ReactNode;
}

export function LottiePlayer({
  animationData: directData,
  src,
  animationPath,
  loop = true,
  autoplay = true,
  className = 'w-48 h-48',
  fallbackIcon,
  fallback,
}: LottiePlayerProps) {
  const targetPath = src || animationPath;
  const targetFallback = fallback || fallbackIcon;
  const [data, setData] = useState<any>(directData || null);
  const [hasError, setHasError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (directData) {
      setData(directData);
      return;
    }

    if (targetPath) {
      fetch(targetPath)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to load animation');
          return res.json();
        })
        .then((json) => setData(json))
        .catch(() => setHasError(true));
    }
  }, [targetPath, directData]);

  if (shouldReduceMotion || hasError || !data) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        {targetFallback || (
          <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-400/20 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-gold-400 animate-ping opacity-75" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Lottie
        animationData={data}
        loop={loop}
        autoPlay={autoplay}
        className="w-full h-full"
      />
    </div>
  );
}

export default LottiePlayer;
