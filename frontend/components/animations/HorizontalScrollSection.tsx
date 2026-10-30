'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ShieldCheck,
  Building2,
  FileCheck2,
  Calculator,
  ArrowRight,
  TrendingUp,
  Coins,
  Cpu,
  Tv,
  Stethoscope,
  Factory,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import MagneticButton from './MagneticButton';

interface PracticeCard {
  id: string;
  category: string;
  title: string;
  description: string;
  features: string[];
  slug: string;
  stat: string;
  statLabel: string;
}

const practices: PracticeCard[] = [
  {
    id: '01',
    category: 'Taxation Practices',
    title: 'UAE Corporate Tax (9%) & SBR',
    description:
      'Federal Decree-Law No. 47 registration, qualifying free zone person (0%) advisory, small business relief optimization, and transfer pricing.',
    features: ['FTA Registration & TRN', 'QFZP 0% Eligibility Audit', 'Transfer Pricing Local File'],
    slug: 'uae-corporate-tax',
    stat: '9%',
    statLabel: 'Standard UAE Rate',
  },
  {
    id: '02',
    category: 'Taxation Practices',
    title: 'UAE VAT Compliance & Filings',
    description:
      'Voluntary Disclosure (Form 211), VAT health checks, input tax recovery optimization, and FTA audit representation across all Emirates.',
    features: ['Quarterly VAT Return Filing', 'Voluntary Disclosure 211', 'Tax Group Deregistration'],
    slug: 'uae-vat-compliance',
    stat: '5%',
    statLabel: 'Standard VAT Rate',
  },
  {
    id: '03',
    category: 'Assurance Practices',
    title: 'Statutory Financial Audit',
    description:
      'Independent external audits for mainland and DMCC, DIFC, JAFZA, IFZA Free Zones. Complying with ISA and international IFRS frameworks.',
    features: ['Accredited Free Zone Filing', 'Internal Control Evaluation', 'Management Representation'],
    slug: 'audit-and-assurance',
    stat: '100%',
    statLabel: 'ISA & IFRS Compliance',
  },
  {
    id: '04',
    category: 'Advisory Practices',
    title: 'Smart Sourcing & Virtual CFO',
    description:
      'Executive financial governance, cash flow forecasting, working capital optimization, and senior partner board-level advisories.',
    features: ['Monthly Board Reporting', 'IFRS Chart of Accounts', 'Cash Flow Projections'],
    slug: 'smart-sourcing',
    stat: '24/7',
    statLabel: 'Partner Direct Desk',
  },
  {
    id: '05',
    category: 'Corporate Practices',
    title: 'UAE Company Setup & Licensing',
    description:
      'Turnkey mainland (100% foreign ownership), Free Zone (DMCC, DIFC, DAFZA), and offshore entity incorporation with commercial licensing.',
    features: ['100% Foreign Mainland Ownership', 'Free Zone Trade Licenses', 'Corporate Banking Dossiers'],
    slug: 'company-setup-uae',
    stat: '40+',
    statLabel: 'Jurisdictions Supported',
  },
  {
    id: '06',
    category: 'Digital Finance',
    title: 'ERP & Software Implementations',
    description:
      'Configuring Zoho Books, Odoo ERP, and SAP Business One with custom UAE tax workflows, inventory ledger automation, and chart of accounts.',
    features: ['Zoho Books & Odoo Certified', 'FTA-Compliant Tax Workpapers', 'Legacy Balance Migrations'],
    slug: 'erp-solutions',
    stat: 'Zero',
    statLabel: 'Disruption Migration',
  },
];

export default function HorizontalScrollSection() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate horizontal shift: 6 cards = ~-70% total scroll
  const x = useTransform(smoothProgress, [0, 1], ['0%', '-68%']);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#090A0C]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Ambient Embers */}
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-crimson-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gold-400/8 rounded-full blur-[140px] pointer-events-none" />

        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-8 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-crimson-600/10 border border-crimson-500/20 text-crimson-400 text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Practice Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white leading-tight">
              Institutional Advisory Spectrum
            </h2>
          </div>

          <div className="flex items-center space-x-4 text-xs text-slate-400">
            <span>Scroll Horizontally</span>
            <div className="w-10 h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: smoothProgress }}
                className="h-full bg-gradient-to-r from-crimson-600 to-gold-400 origin-left"
              />
            </div>
          </div>
        </div>

        {/* Horizontal Card Track */}
        <motion.div style={{ x }} className="flex space-x-6 sm:space-x-8 pl-4 sm:pl-8 lg:pl-16 z-10">
          {practices.map((practice) => (
            <div
              key={practice.id}
              className="w-[320px] sm:w-[400px] shrink-0 bg-[#131418] rounded-3xl border border-[#22242B] p-8 shadow-2xl hover:border-gold-400/40 transition-all flex flex-col justify-between group relative overflow-hidden h-[460px]"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-crimson-600 via-gold-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-gold-400 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/20">
                    {practice.id} • {practice.category}
                  </span>
                  <div className="text-right">
                    <div className="text-xl font-display font-bold text-white group-hover:text-gold-400 transition-colors">
                      {practice.stat}
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-slate-400">
                      {practice.statLabel}
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-display font-bold text-white group-hover:text-crimson-400 transition-colors">
                  {practice.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {practice.description}
                </p>

                <ul className="space-y-2 pt-2 border-t border-white/5 text-xs text-slate-300">
                  {practice.features.map((feat, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <Link
                  href={`/services/${practice.slug}`}
                  className="text-xs font-bold text-white group-hover:text-gold-400 flex items-center transition-colors"
                >
                  <span>Practice Details</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/book-consultation?service=${practice.slug}`}
                  className="text-[11px] font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  Book Advice
                </Link>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
