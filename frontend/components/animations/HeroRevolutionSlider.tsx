'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Calculator,
  ArrowRight,
  Calendar,
  Building2,
  FileCheck2,
  Sparkles,
  TrendingUp,
  Layers,
  Award,
  Pause,
  Play,
} from 'lucide-react';
import MagneticButton from './MagneticButton';

interface SlideData {
  id: number;
  tag: string;
  tagIcon: any;
  headline: string;
  highlightWord: string;
  description: string;
  metrics: { value: string; label: string }[];
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  secondaryCtaIcon: any;
  bgImage: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    tag: 'FTA Certified Tax Agency • Federal Decree-Law No. 47',
    tagIcon: ShieldCheck,
    headline: 'Institutional Precision for UAE Corporate Tax',
    highlightWord: 'Corporate Tax',
    description:
      'Strategic compliance for mainland enterprises and Free Zone leaders. Qualifying Free Zone Person (0%) audits, Small Business Relief (< AED 3M), and voluntary disclosures in Dubai.',
    metrics: [
      { value: '9%', label: 'Standard Rate' },
      { value: 'AED 375k', label: '0% Tax Limit' },
      { value: 'AED 3M', label: 'SBR Ceiling' },
    ],
    primaryCtaText: 'Schedule Advisory Session',
    primaryCtaHref: '/book-consultation',
    secondaryCtaText: 'Calculate Corporate Tax (9%)',
    secondaryCtaHref: '/tools',
    secondaryCtaIcon: Calculator,
    bgImage:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=85',
  },
  {
    id: 2,
    tag: 'Ministry Approved Auditors • ISA & IFRS Assurance',
    tagIcon: Award,
    headline: 'Independent Statutory Financial Audit',
    highlightWord: 'Statutory Audit',
    description:
      'Rigorous statutory financial statements meeting International Standards on Auditing (ISA) and IFRS. Accredited for DMCC, DIFC, JAFZA, mainland DED, and all tier-1 UAE banks.',
    metrics: [
      { value: '100%', label: 'ISA & IFRS Standard' },
      { value: 'Unmodified', label: 'Auditor Opinions' },
      { value: 'Free Zone', label: 'Trade License Ready' },
    ],
    primaryCtaText: 'Explore Audit Services',
    primaryCtaHref: '/services/audit-and-assurance',
    secondaryCtaText: 'Request Retainer Scope',
    secondaryCtaHref: '/contact',
    secondaryCtaIcon: FileCheck2,
    bgImage:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85',
  },
  {
    id: 3,
    tag: 'Executive Governance • Strategic Financial Counsel',
    tagIcon: Layers,
    headline: 'Virtual CFO, Capital Advisory & Smart Sourcing',
    highlightWord: 'Virtual CFO',
    description:
      'Board-level financial acumen without the overhead of an in-house CFO. Real-time cash flow modeling, IFRS chart of accounts structuring, and automated Zoho Books & Odoo ERP deployments.',
    metrics: [
      { value: '24/7', label: 'Partner Direct Desk' },
      { value: 'Zoho & Odoo', label: 'Certified ERP' },
      { value: 'M&A Diligence', label: 'Institutional' },
    ],
    primaryCtaText: 'Consult Virtual CFO',
    primaryCtaHref: '/services/smart-sourcing',
    secondaryCtaText: 'Explore ERP Solutions',
    secondaryCtaHref: '/services/erp-solutions',
    secondaryCtaIcon: TrendingUp,
    bgImage:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=85',
  },
  {
    id: 4,
    tag: '100% Foreign Ownership • 40+ Free Zones & Mainland',
    tagIcon: Building2,
    headline: 'Turnkey UAE Company Setup & PRO Relations',
    highlightWord: 'Company Setup',
    description:
      'Seamless commercial incorporation across Dubai Mainland (DED) and premier Free Zones (DMCC, DIFC, IFZA, DAFZA). Complete corporate banking dossiers, investor visas, and trade licensing.',
    metrics: [
      { value: '100%', label: 'Foreign Ownership' },
      { value: '5-7 Days', label: 'Investor Visa SLA' },
      { value: 'Turnkey', label: 'Banking Dossiers' },
    ],
    primaryCtaText: 'Launch UAE Enterprise',
    primaryCtaHref: '/services/company-setup-uae',
    secondaryCtaText: 'Download Profile PDF',
    secondaryCtaHref: '/resources',
    secondaryCtaIcon: ArrowRight,
    bgImage:
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1920&q=85',
  },
];

export default function HeroRevolutionSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const DURATION_MS = 6500;

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  // Autoplay timer
  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;

    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, DURATION_MS);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, isPaused, shouldReduceMotion]);

  // Touch Swipe handlers
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  const active = slides[current];
  const TagIcon = active.tagIcon;
  const SecondaryIcon = active.secondaryCtaIcon;

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full min-h-[500px] sm:min-h-[540px] md:min-h-[580px] lg:min-h-[620px] bg-[#090A0C] text-white overflow-hidden flex items-center select-none"
    >
      {/* 1. CINEMATIC BACKGROUND IMAGERY WITH KEN BURNS ZOOM */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={active.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          {/* Ken Burns zooming container */}
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    scale: [1, 1.08],
                    x: direction === 1 ? [0, -15] : [0, 15],
                  }
            }
            transition={{
              duration: DURATION_MS / 1000 + 1,
              ease: 'easeOut',
            }}
            className="w-full h-full"
          >
            <img
              src={active.bgImage}
              alt={active.headline}
              className="w-full h-full object-cover object-center filter brightness-[0.70] contrast-[1.08]"
            />
          </motion.div>

          {/* High-Contrast Obsidian Vignette & Brand Embers (Zero Blue) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#090A0C]/95 via-[#090A0C]/80 to-[#090A0C]/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C] via-transparent to-[#090A0C]/50" />

          {/* Ambient Brand Glowing Orbs */}
          <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-crimson-600/18 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-0 w-[26rem] h-[26rem] rounded-full bg-gold-400/12 blur-[140px] pointer-events-none" />

          {/* Subtle architectural mesh grid */}
          <div className="absolute inset-0 bg-grid-subtle opacity-35" />
        </motion.div>
      </AnimatePresence>

      {/* 2. LAYERED ANIMATED SLIDE CONTENT */}
      {/* Safe padding left & right (px-12 sm:px-16 lg:px-20) guarantees zero overlap with Left/Right arrow controls */}
      <div className="max-w-7xl mx-auto px-12 sm:px-16 lg:px-20 w-full relative z-10 pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-16">
        <div className="max-w-3xl space-y-4 sm:space-y-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${active.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3.5 sm:space-y-4"
            >
              {/* Slide Authority Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#131418]/90 border border-gold-400/30 text-gold-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-lg shadow-black/40 backdrop-blur-md">
                <TagIcon className="w-3.5 h-3.5 text-crimson-500" />
                <span className="truncate max-w-[260px] sm:max-w-none">{active.tag}</span>
              </div>

              {/* Headline with Gold Gradient Emphasis */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.12]">
                {active.headline.split(active.highlightWord)[0]}
                <span className="text-gold-gradient inline-block">
                  {active.highlightWord}
                </span>
                {active.headline.split(active.highlightWord)[1]}
              </h1>

              {/* Description */}
              <p className="text-xs sm:text-sm lg:text-base text-slate-300 max-w-2xl leading-relaxed font-light">
                {active.description}
              </p>

              {/* Floating Verified Stats Pills */}
              <div className="pt-1 flex flex-wrap gap-2.5 sm:gap-3 text-xs">
                {active.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#131418]/85 border border-[#22242B] backdrop-blur-md shadow-md"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    <div>
                      <span className="font-display font-bold text-white text-xs sm:text-sm mr-1">
                        {m.value}
                      </span>
                      <span className="text-slate-400 text-[10px] uppercase tracking-wider">
                        {m.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dual Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <MagneticButton>
                  <Link
                    href={active.primaryCtaHref}
                    className="btn-shimmer inline-flex items-center justify-center px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-crimson-600 via-crimson-700 to-crimson-600 text-white shadow-xl shadow-crimson-900/40 hover:from-crimson-500 hover:to-crimson-600 transition-all border border-crimson-400/30 group"
                  >
                    <Calendar className="w-4 h-4 mr-2 text-gold-300" />
                    <span>{active.primaryCtaText}</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform text-gold-300" />
                  </Link>
                </MagneticButton>

                <MagneticButton>
                  <Link
                    href={active.secondaryCtaHref}
                    className="inline-flex items-center justify-center px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#131418]/90 hover:bg-[#1c1d24] text-slate-200 border border-[#22242B] hover:border-gold-400/50 transition-all backdrop-blur-md shadow-lg group"
                  >
                    <SecondaryIcon className="w-4 h-4 mr-2 text-gold-400" />
                    <span>{active.secondaryCtaText}</span>
                  </Link>
                </MagneticButton>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 3. SLIDER CONTROLS: PROMINENT LEFT & RIGHT ARROWS (NEVER HIDDEN, Z-30) */}
      {/* Left Arrow Button */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#131418]/90 hover:bg-crimson-600 border border-white/20 hover:border-crimson-500 text-white flex items-center justify-center transition-all duration-200 shadow-2xl backdrop-blur-md active:scale-95 group focus:outline-none focus:ring-2 focus:ring-gold-400/50 hover:shadow-crimson-600/40"
        title="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform text-white" />
      </button>

      {/* Right Arrow Button */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#131418]/90 hover:bg-crimson-600 border border-white/20 hover:border-crimson-500 text-white flex items-center justify-center transition-all duration-200 shadow-2xl backdrop-blur-md active:scale-95 group focus:outline-none focus:ring-2 focus:ring-gold-400/50 hover:shadow-crimson-600/40"
        title="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform text-white" />
      </button>

      {/* 4. BOTTOM INTERACTIVE THUMBNAIL TABS & PROGRESS TIMERS */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-[#090A0C]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 sm:py-2.5 gap-2 sm:gap-4">
            {/* 4-Column Compact Slide Tabs */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-3 flex-1">
              {slides.map((s, idx) => {
                const isActive = idx === current;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    className={`text-left p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl transition-all relative overflow-hidden group ${
                      isActive
                        ? 'bg-white/[0.08] border border-gold-400/35'
                        : 'hover:bg-white/[0.03] border border-transparent'
                    }`}
                  >
                    {/* Active Slide Progress Line Timer */}
                    <div className="h-0.5 w-full bg-white/10 rounded-full mb-1 sm:mb-1.5 overflow-hidden">
                      {isActive ? (
                        <motion.div
                          key={`bar-${s.id}-${isPaused ? 'paused' : 'running'}`}
                          initial={{ width: '0%' }}
                          animate={{ width: isPaused ? '0%' : '100%' }}
                          transition={{
                            duration: DURATION_MS / 1000,
                            ease: 'linear',
                          }}
                          className="h-full bg-gradient-to-r from-crimson-600 to-gold-400"
                        />
                      ) : (
                        <div
                          className={`h-full ${
                            idx < current ? 'bg-gold-400/40 w-full' : 'w-0'
                          }`}
                        />
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] sm:text-[10px] text-slate-400 font-semibold">
                        0{s.id}
                      </span>
                      <span
                        className={`text-[8px] sm:text-[9px] uppercase tracking-wider font-bold truncate max-w-[85px] sm:max-w-[130px] ${
                          isActive ? 'text-gold-400' : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      >
                        {s.highlightWord}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Play / Pause Toggle Button */}
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? 'Resume Auto-play' : 'Pause Auto-play'}
              className="shrink-0 w-8 h-8 rounded-lg bg-[#131418]/80 hover:bg-[#1f2028] border border-white/10 text-slate-300 hover:text-gold-400 flex items-center justify-center transition-colors text-xs"
              title={isPaused ? 'Resume slider' : 'Pause slider'}
            >
              {isPaused ? (
                <Play className="w-3.5 h-3.5 ml-0.5 text-gold-400" />
              ) : (
                <Pause className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
