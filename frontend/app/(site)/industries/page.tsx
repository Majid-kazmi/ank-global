import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2,
  HardHat,
  Cpu,
  Tv,
  Coins,
  Stethoscope,
  Flame,
  Factory,
  Hotel,
  Shield,
  ShoppingBag,
  Truck,
  GraduationCap,
  UtensilsCrossed,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import BackgroundMesh from '@/components/animations/BackgroundMesh';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import CardHover from '@/components/animations/CardHover';

export const metadata: Metadata = {
  title: 'Industries We Serve | ANK Global Chartered Accountants Dubai',
  description:
    'Sector-specific audit, corporate tax, and advisory solutions for UAE banking, real estate, manufacturing, healthcare, technology, retail, and hospitality.',
};

export default function IndustriesPage() {
  const industries = [
    {
      title: 'Real Estate & Construction',
      icon: HardHat,
      desc: 'Escrow account audits, project feasibility, milestone revenue recognition (IFRS 15), and VAT on commercial lease contracts.',
    },
    {
      title: 'Banking & Financial Services',
      icon: Coins,
      desc: 'Internal controls reviews, anti-money laundering (AML) audits, loan portfolio assessments, and regulatory capital advisory.',
    },
    {
      title: 'Healthcare & Pharmaceuticals',
      icon: Stethoscope,
      desc: 'Medical practice accounting, Ministry of Health regulatory compliance, medical equipment asset valuation, and VAT health checks.',
    },
    {
      title: 'Retail, E-Commerce & Consumer',
      icon: ShoppingBag,
      desc: 'Point of sale (POS) reconciliations, inventory valuation, cross-border e-commerce VAT, and payment gateway ledger automation.',
    },
    {
      title: 'Energy, Water, Oil & Gas',
      icon: Flame,
      desc: 'Capital expenditure auditing, joint venture cost reviews, upstream/downstream compliance, and statutory assurance.',
    },
    {
      title: 'Industrials & Manufacturing',
      icon: Factory,
      desc: 'Standard costing, bill of materials (BOM) auditing, factory fixed asset tagging, and excise tax designated zone reporting.',
    },
    {
      title: 'Engineering & Information Technology',
      icon: Cpu,
      desc: 'Software development revenue recognition, intellectual property valuation, IT smart sourcing, and ERP implementations.',
    },
    {
      title: 'Hospitality, Tourism & F&B',
      icon: UtensilsCrossed,
      desc: 'Restaurant chain food cost audits, franchise royalty verifications, municipality tax compliance, and daily cash sweeps.',
    },
    {
      title: 'Logistics, Shipping & Automotive',
      icon: Truck,
      desc: 'Fleet depreciation, customs bond reconciliations, supply chain audits, and Economic Substance Regulations (ESR) compliance.',
    },
    {
      title: 'Education & E-Learning',
      icon: GraduationCap,
      desc: 'Fee structure feasibility, educational institution statutory audits, KHDA regulatory reporting, and payroll optimization.',
    },
    {
      title: 'Media, Events & Exhibition',
      icon: Tv,
      desc: 'Exhibition budget management, ticketing revenue audits, performer withholding taxes, and project-based financial controls.',
    },
    {
      title: 'Insurance & Reinsurance',
      icon: Shield,
      desc: 'IFRS 17 insurance contract reporting, solvency assessment, claim reserve verification, and Central Bank compliance.',
    },
  ];

  return (
    <div className="space-y-20 py-8 pb-24">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-navy-950 text-white py-24 px-4 sm:px-6 lg:px-8 border-b border-navy-800">
        <BackgroundMesh />
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sector Specialization</span>
          </div>

          <TextReveal
            text="Deep Industry Knowledge Across the UAE Economy"
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white max-w-4xl leading-tight"
          />

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-light">
            Every industry operates under distinct accounting standards, tax treatments, and commercial risks. Our practice groups provide bespoke guidance grounded in sector realities.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <ScrollReveal key={i} delay={i * 0.04}>
                <CardHover className="h-full">
                  <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:border-gold-400 transition-all group flex flex-col justify-between h-full">
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-navy-950 to-navy-900 text-gold-400 flex items-center justify-center group-hover:bg-crimson-600 group-hover:text-white transition-all shadow-sm">
                        <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      </div>
                      <h3 className="text-xl font-display font-bold text-navy-950 group-hover:text-crimson-600 transition-colors">
                        {ind.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                        {ind.desc}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-100">
                      <Link
                        href={`/contact?industry=${encodeURIComponent(ind.title)}`}
                        className="text-xs font-bold text-navy-950 group-hover:text-crimson-600 flex items-center transition-colors"
                      >
                        <span>Request industry brief</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </CardHover>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative overflow-hidden bg-gradient-to-r from-navy-950 via-navy-900 to-crimson-950 rounded-3xl p-8 sm:p-14 text-white shadow-2xl border border-navy-800">
            <BackgroundMesh />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-xl">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
                  Custom Industry Scopes
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  Operating in a Niche or Regulated UAE Industry?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  Our Senior Partners have led audits and tax registrations for mainland, free zone, and offshore entities across all major UAE economic clusters.
                </p>
              </div>
              <Link
                href="/book-consultation"
                className="px-8 py-4 rounded-xl bg-gold-500 text-navy-950 text-xs font-bold uppercase tracking-wider hover:bg-gold-400 transition-all shrink-0 shadow-lg hover:shadow-gold-500/20 btn-shimmer"
              >
                Speak to Industry Specialist
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
