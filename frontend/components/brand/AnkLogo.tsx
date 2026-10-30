'use client';

import React from 'react';
import Image from 'next/image';

interface AnkLogoProps {
  variant?: 'light' | 'dark' | 'mark' | 'mark-dark';
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function AnkLogo({
  variant = 'light',
  className = 'h-8 sm:h-9 w-auto',
  priority = false,
}: AnkLogoProps) {
  let src = '/images/brand/ank-logo.svg';
  let aspectWidth = 2172;
  let aspectHeight = 724;

  if (variant === 'dark') {
    src = '/images/brand/ank-logo-white.svg';
  } else if (variant === 'mark') {
    src = '/images/brand/ank-mark.svg';
    aspectWidth = 512;
    aspectHeight = 512;
  } else if (variant === 'mark-dark') {
    src = '/images/brand/ank-mark-white.svg';
    aspectWidth = 512;
    aspectHeight = 512;
  }

  return (
    <div className="relative inline-flex items-center select-none shrink-0">
      <img
        src={src}
        alt="ANK Global Chartered Accountants and Advisors"
        className={`object-contain block ${className}`}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
}

export default AnkLogo;
