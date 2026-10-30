'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ShieldCheck,
  Calculator,
  Building2,
  FileCheck2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  BadgePercent,
  Layers,
} from 'lucide-react';
import MagneticButton from './MagneticButton';

interface StoryStep {
  tag: string;
  badgeIcon: any;
  title: string;
  description: string;
  metrics: { label: string; value: string }[];
  deliverables: string[];
  ctaText: string;
  ctaHref: string;
  previewType: 'tax' | 'audit' | 'cfo';
}

const steps: StoryStep[] = [
  {
    tag: 'Statutory Practice 01',
    badgeIcon: BadgePercent,
    title: 'UAE Corporate Tax (9%) & Free Zone Structuring',
    description:
      'Navigating Federal Decree-Law No. 47 with precision. We model qualifying income, test QFZP 0% eligibility, optimize Small Business Relief (< AED 3M), and liaise directly with the Federal Tax Authority.',
    metrics: [
      { label: 'Standard Rate', value: '9%' },
      { label: 'Zero-Bracket', value: 'AED 375k' },
      { label: 'SBR Ceiling', value: 'AED 3M' },
    ],
    deliverables: [
      'FTA Corporate Tax Registration & TRN',
      'Qualifying Free Zone Person (0%) Review',
      'Transfer Pricing Local & Master Files',
    ],
    ctaText: 'Explore Corporate Tax',
    ctaHref: '/services/uae-corporate-tax',
    previewType: 'tax',
  },
  {
    tag: 'Assurance Practice 02',
    badgeIcon: ShieldCheck,
    title: 'Statutory Financial Audit & Ministry Assurance',
    description:
      'Rigorous independent auditing under International Standards on Auditing (ISA) and IFRS. Accredited for DMCC, DIFC, JAFZA, mainland DED, and all UAE financial institutions.',
    metrics: [
      { label: 'Compliance', value: '100% ISA' },
      { label: 'Audit Opinions', value: 'Clean & True' },
      { label: 'Renewal Ready', value: 'Free Zone & Mainland' },
    ],
    deliverables: [
      'Audited Financial Statements with Opinion',
      'Management Letter on Internal Controls',
      'Bank & Ministry Trade License Filings',
    ],
    ctaText: 'Explore Audit Services',
    ctaHref: '/services/audit-and-assurance',
    previewType: 'audit',
  },
  {
    tag: 'Advisory Practice 03',
    badgeIcon: Layers,
    title: 'Virtual CFO, Capital Advisory & Smart Sourcing',
    description:
      'Executive financial governance without the overhead of a full-time board member. Cash flow modeling, ERP transformation on Zoho & Odoo, and strategic corporate restructuring across the Emirates.',
    metrics: [
      { label: 'Advisory Desk', value: '24/7 SLA' },
      { label: 'ERP Deployment', value: 'Zoho / Odoo' },
      { label: 'M&A Diligence', value: 'Comprehensive' },
    ],
    deliverables: [
      'Monthly Executive Board Financial Pack',
      'IFRS Chart of Accounts Architecture',
      'Working Capital Optimization Models',
    ],
    ctaText: 'Explore CFO Advisory',
    ctaHref: '/services/smart-sourcing',
    previewType: 'cfo',
  },
];

export default function PinnedStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform scroll progress into active step index (0, 1, 2)
  // Step 0: 0 to 0.33
  // Step 1: 0.33 to 0.66
  // Step 2: 0.66 to 1.0

  return (
    <section ref={containerRef} className="relative h-[280vh] bg-[#090A0C] text-white">
      {/* Sticky Storyboard Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        {/* Ambient Embers */}
        <div className="absolute top-1/4 left-10 w-[30rem] h-[30rem] bg-crimson-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-gold-400/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-subtle opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 space-y-6">
              {/* Pillar Category Progress Indicator */}
              <div className="flex items-center space-x-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400 bg-gold-400/10 border border-gold-400/20 px-3 py-1 rounded-full">
                  Institutional Practice Showcase
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Scroll To Experience
                </span>
              </div>

              {/* Stacked story steps that crossfade smoothly */}
              <div className="relative min-h-[320px] sm:min-h-[360px]">
                {steps.map((step, idx) => {
                  const start = idx * 0.33;
                  const end = (idx + 1) * 0.33;
                  const isLast = idx === steps.length - 1;

                  return (
                    <StepContent
                      key={idx}
                      step={step}
                      index={idx}
                      progress={smoothProgress}
                      start={start}
                      end={isLast ? 1.0 : end}
                    />
                  );
                })}
              </div>

              {/* Progress step indicators */}
              <div className="pt-4 flex items-center space-x-3">
                {steps.map((_, i) => (
                  <StepBar key={i} index={i} progress={smoothProgress} />
                ))}
              </div>
            </div>

            {/* Right Interactive Preview Cockpit */}
            <div className="lg:col-span-6">
              <div className="relative">
                {steps.map((step, idx) => {
                  const start = idx * 0.33;
                  const end = (idx + 1) * 0.33;
                  const isLast = idx === steps.length - 1;

                  return (
                    <StepVisual
                      key={idx}
                      step={step}
                      index={idx}
                      progress={smoothProgress}
                      start={start}
                      end={isLast ? 1.0 : end}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepContent({
  step,
  index,
  progress,
  start,
  end,
}: {
  step: StoryStep;
  index: number;
  progress: any;
  start: number;
  end: number;
}) {
  const Icon = step.badgeIcon;

  // Opacity & Y translation curve based on progress
  const opacity = useTransform(
    progress,
    [start - 0.08, start, end - 0.05, end],
    [0, 1, 1, index === 2 ? 1 : 0]
  );

  const y = useTransform(
    progress,
    [start - 0.08, start, end - 0.05, end],
    [24, 0, 0, index === 2 ? 0 : -24]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-between space-y-5"
    >
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-crimson-400">
          <Icon className="w-4 h-4 text-gold-400" />
          <span>{step.tag}</span>
        </div>

        <h3 className="text-2xl sm:text-4xl font-display font-bold text-white leading-tight">
          {step.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light pr-4">
          {step.description}
        </p>

        {/* Deliverables Checklist */}
        <ul className="space-y-2 pt-2 text-xs text-slate-300">
          {step.deliverables.map((item, i) => (
            <li key={i} className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-2">
        <MagneticButton>
          <Link
            href={step.ctaHref}
            className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-700 text-white text-xs font-bold uppercase tracking-wider hover:from-crimson-500 hover:to-crimson-600 transition-all shadow-lg shadow-crimson-900/30 group btn-shimmer"
          >
            <span>{step.ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </MagneticButton>
      </div>
    </motion.div>
  );
}

function StepVisual({
  step,
  index,
  progress,
  start,
  end,
}: {
  step: StoryStep;
  index: number;
  progress: any;
  start: number;
  end: number;
}) {
  const opacity = useTransform(
    progress,
    [start - 0.08, start, end - 0.05, end],
    [0, 1, 1, index === 2 ? 1 : 0]
  );

  const scale = useTransform(
    progress,
    [start - 0.08, start, end - 0.05, end],
    [0.92, 1, 1, index === 2 ? 1 : 0.95]
  );

  return (
    <motion.div
      style={{ opacity, scale }}
      className={`${index === 0 ? 'relative' : 'absolute inset-0'}`}
    >
      <div className="bg-[#131418] rounded-3xl border border-[#22242B] p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Subtle accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-crimson-600 via-gold-400 to-crimson-600" />

        {/* Card Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/5">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-crimson-500/80" />
            <div className="w-3 h-3 rounded-full bg-gold-400/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
            ANK Verification Framework • v2.6
          </span>
        </div>

        {/* Dynamic Metric Grid */}
        <div className="grid grid-cols-3 gap-3 py-6">
          {step.metrics.map((m, i) => (
            <div
              key={i}
              className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1 text-center"
            >
              <div className="text-lg sm:text-xl font-display font-bold text-gold-400">
                {m.value}
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Interactive Visual Preview */}
        {step.previewType === 'tax' && (
          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Small Business Relief</span>
                <span className="text-emerald-400 font-bold font-mono">0% Tax Rate</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-gold-400 to-crimson-500 h-full w-3/4 rounded-full" />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Revenue: AED 2,240,000</span>
                <span>Threshold: AED 3,000,000</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-gold-400/5 border border-gold-400/20 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-gold-300">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>FTA Registration Certificate Ready</span>
              </div>
              <span className="text-[10px] font-mono text-slate-300 bg-white/10 px-2 py-0.5 rounded">
                Verified
              </span>
            </div>
          </div>
        )}

        {step.previewType === 'audit' && (
          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Independent Auditor Opinion</span>
                <span className="text-emerald-400 font-bold font-mono">Unmodified</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                Financial statements present fairly, in all material respects, in accordance with IFRS and UAE Commercial Companies Law.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="text-slate-300 text-[11px]">Free Zone Trade Lic.</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center space-x-2">
                <FileCheck2 className="w-4 h-4 text-crimson-400 shrink-0" />
                <span className="text-slate-300 text-[11px]">Central Bank Compliant</span>
              </div>
            </div>
          </div>
        )}

        {step.previewType === 'cfo' && (
          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Executive Cash Velocity</span>
                <span className="text-gold-400 font-bold font-mono">+18.4% YoY</span>
              </div>
              <div className="h-16 flex items-end space-x-2 pt-2">
                {[40, 55, 48, 65, 78, 92, 85, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-white/5 rounded-t hover:bg-gold-400/40 transition-colors h-full flex items-end">
                    <div
                      style={{ height: `${h}%` }}
                      className={`w-full rounded-t ${
                        i === 7 ? 'bg-gold-400' : 'bg-crimson-600/70'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-crimson-600/10 border border-crimson-600/20 flex items-center justify-between text-xs">
              <span className="text-slate-300 text-[11px]">ERP Integration Live</span>
              <span className="text-gold-400 font-mono text-[10px]">Zoho • Odoo • SAP</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function StepBar({
  index,
  progress,
}: {
  index: number;
  progress: any;
}) {
  const start = index * 0.33;
  const end = (index + 1) * 0.33;

  const barScale = useTransform(progress, [start, end], [0, 1]);

  return (
    <div className="h-1 w-16 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        style={{ scaleX: barScale }}
        className="h-full bg-gradient-to-r from-crimson-600 to-gold-400 origin-left"
      />
    </div>
  );
}
