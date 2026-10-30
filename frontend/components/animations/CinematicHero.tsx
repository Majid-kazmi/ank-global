'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ShieldCheck,
  Calculator,
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';
import MagneticButton from './MagneticButton';
import AnimatedCounter from './AnimatedCounter';
import BackgroundMesh from './BackgroundMesh';

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Apple-style scaling & parallax transforms
  const heroScale = useTransform(smoothProgress, [0, 0.8], [1, 0.94]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.7], [1, 0.1]);
  const frameScale = useTransform(smoothProgress, [0, 0.8], [0.92, 1.04]);
  const cardLeftY = useTransform(smoothProgress, [0, 1], [0, -110]);
  const cardRightY = useTransform(smoothProgress, [0, 1], [0, -160]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[140vh] bg-[#090A0C] text-white pt-16 sm:pt-24 pb-20 overflow-hidden"
    >
      <BackgroundMesh />

      {/* Main Hero Header */}
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8"
      >
        {/* Institutional Authority Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-crimson-600/10 via-gold-400/15 to-crimson-600/10 border border-gold-400/30 text-gold-400 text-xs font-bold uppercase tracking-widest shadow-lg shadow-gold-400/5"
        >
          <Award className="w-4 h-4 text-gold-400" />
          <span>Chartered Accountants & Licensed UAE Tax Advisors</span>
        </motion.div>

        {/* Cinematic Headline */}
        <div className="space-y-4 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight text-white leading-[1.08]"
          >
            Institutional Precision for{' '}
            <span className="text-gold-gradient inline-block">UAE Corporate Tax</span>,{' '}
            Audit & Advisory
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Strategic compliance for mainland enterprises and Free Zone leaders under Federal Decree-Law No. 47 of 2022. Certified statutory audit assurance and turnkey virtual CFO support in Dubai.
          </motion.p>
        </div>

        {/* Dual Magnetic Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <MagneticButton>
            <Link
              href="/book-consultation"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-crimson-600 via-crimson-700 to-crimson-600 text-white font-bold text-xs uppercase tracking-wider hover:from-crimson-500 hover:to-crimson-600 transition-all shadow-xl shadow-crimson-900/40 flex items-center space-x-2 group btn-shimmer"
            >
              <span>Schedule Confidential Consultation</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform text-gold-300" />
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link
              href="/tools"
              className="px-8 py-4 rounded-2xl bg-[#131418] hover:bg-[#1a1c22] text-slate-200 border border-[#22242B] font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center space-x-2 group hover:border-gold-400/40"
            >
              <Calculator className="w-4 h-4 text-gold-400" />
              <span>Calculate Corporate Tax (9%)</span>
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Verified Fast Stats Ribbon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-6 flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-xs text-slate-400 border-t border-white/5 max-w-4xl mx-auto"
        >
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span>FTA Certified Tax Agency</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-crimson-500" />
            <span>Ministry Registered Auditors</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>DMCC / DIFC Accredited</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Apple-Style Cockpit Showcase Frame (Transforms on Scroll) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 relative z-20">
        <motion.div
          style={{ scale: frameScale }}
          className="relative rounded-3xl bg-gradient-to-b from-[#131418] to-[#0A0B0D] p-3 sm:p-5 border border-[#22242B] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.8)]"
        >
          {/* Inner Display Glass */}
          <div className="relative rounded-2xl bg-[#090A0C] border border-white/5 overflow-hidden p-6 sm:p-10">
            {/* Top Bar of the Cockpit */}
            <div className="flex items-center justify-between pb-6 border-b border-white/5 text-xs text-slate-400">
              <div className="flex items-center space-x-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-crimson-600 animate-pulse" />
                <span className="font-mono text-slate-300 font-semibold">ANK EXECUTIVE DESK</span>
              </div>
              <span className="text-[10px] font-mono bg-white/5 px-2.5 py-1 rounded text-gold-400">
                DEIRA DUBAI HQ • STATUS: ACTIVE
              </span>
            </div>

            {/* Central Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                  Practice Areas
                </span>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white">
                  <AnimatedCounter value={12} suffix="+" />
                </div>
                <span className="text-[10px] text-gold-400">Statutory Practices</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                  Tax Zero-Bracket
                </span>
                <div className="text-2xl sm:text-3xl font-display font-bold text-gold-400">
                  AED 375k
                </div>
                <span className="text-[10px] text-slate-400">0% Corporate Tax Rate</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                  Small Business Relief
                </span>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white">
                  AED 3.0M
                </div>
                <span className="text-[10px] text-emerald-400">Eligible Nil Assessment</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                  Partner Advisory
                </span>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white">
                  24/7
                </div>
                <span className="text-[10px] text-gold-400">Direct Senior Counsel</span>
              </div>
            </div>

            {/* Live CTA Strip */}
            <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3 text-xs text-slate-300">
                <div className="w-8 h-8 rounded-full bg-crimson-600/20 text-crimson-500 flex items-center justify-center font-bold">
                  !
                </div>
                <div>
                  <strong className="block text-white">Corporate Tax Deadline Approaching</strong>
                  <span className="text-slate-400 text-[11px]">Ensure your trade license avoids the AED 10,000 late filing fine.</span>
                </div>
              </div>

              <Link
                href="/contact"
                className="text-xs font-bold text-gold-400 hover:text-white flex items-center transition-colors group shrink-0"
              >
                <span>Request Impact Assessment</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Floating Parallax Card 1 (Left Depth) */}
          <motion.div
            style={{ y: cardLeftY }}
            className="hidden lg:block absolute -left-12 bottom-12 w-64 p-4 rounded-2xl bg-[#131418]/95 border border-[#22242B] shadow-2xl backdrop-blur-xl space-y-2 pointer-events-none"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[10px] uppercase">Corporate Tax</span>
              <span className="text-gold-400 font-mono text-[10px]">FTA COMPLIANT</span>
            </div>
            <div className="text-sm font-display font-bold text-white">
              Federal Decree-Law 47
            </div>
            <div className="text-[11px] text-slate-400">
              Complete Return Preparation, SBR & Transfer Pricing Documentation.
            </div>
          </motion.div>

          {/* Floating Parallax Card 2 (Right Depth) */}
          <motion.div
            style={{ y: cardRightY }}
            className="hidden lg:block absolute -right-12 top-10 w-64 p-4 rounded-2xl bg-[#131418]/95 border border-[#22242B] shadow-2xl backdrop-blur-xl space-y-2 pointer-events-none"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[10px] uppercase">Ministry Audit</span>
              <span className="text-emerald-400 font-mono text-[10px]">UNMODIFIED</span>
            </div>
            <div className="text-sm font-display font-bold text-white">
              ISA / IFRS Assurance
            </div>
            <div className="text-[11px] text-slate-400">
              Free Zone & Mainland trade license renewal audits with guaranteed sign-off.
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
