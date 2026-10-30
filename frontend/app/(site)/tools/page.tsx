import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import TaxCalculator from '@/components/TaxCalculator';
import { ShieldCheck, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import BackgroundMesh from '@/components/animations/BackgroundMesh';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import CardHover from '@/components/animations/CardHover';

export const metadata: Metadata = {
  title: 'UAE Corporate Tax (9%) & VAT Calculators | ANK Global',
  description:
    'Free interactive UAE Corporate Tax and VAT calculation tools. Calculate 9% corporate tax liability, small business relief threshold, and 5% VAT components.',
};

export default function ToolsPage() {
  return (
    <div className="space-y-16 py-8 pb-24">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-navy-950 text-white py-24 px-4 sm:px-6 lg:px-8 border-b border-navy-800">
        <BackgroundMesh />
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complimentary Financial Estimators</span>
          </div>

          <TextReveal
            text="UAE Corporate Tax (9%) & VAT Calculators"
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white max-w-4xl leading-tight"
          />

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-light">
            Estimate your corporate tax liabilities under Federal Decree-Law No. 47 of 2022. Determine whether your enterprise qualifies for the 0% Small Business Relief or Free Zone QFZP benefits.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal>
          <TaxCalculator />
        </ScrollReveal>

        {/* Regulatory Context Matrix */}
        <ScrollReveal delay={0.1}>
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-crimson-50 text-crimson-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-crimson-600 block">
                  Federal Decree-Law No. 47
                </span>
                <h3 className="text-2xl font-display font-bold text-navy-950">
                  Statutory Basis & Corporate Tax Rules
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              <CardHover>
                <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-gold-300 transition-colors space-y-2.5 h-full">
                  <h4 className="font-bold text-navy-950 text-base font-display">AED 375,000 Zero-Bracket</h4>
                  <p>
                    Taxable income up to AED 375,000 is taxed at 0% to foster entrepreneurship and support early-stage growth enterprises across all Emirates.
                  </p>
                </div>
              </CardHover>

              <CardHover>
                <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-gold-300 transition-colors space-y-2.5 h-full">
                  <h4 className="font-bold text-navy-950 text-base font-display">Small Business Relief (SBR)</h4>
                  <p>
                    Eligible resident persons with gross revenue under AED 3,000,000 across tax periods ending before December 31, 2026 can elect to treat taxable income as nil.
                  </p>
                </div>
              </CardHover>

              <CardHover>
                <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-gold-300 transition-colors space-y-2.5 h-full">
                  <h4 className="font-bold text-navy-950 text-base font-display">Qualifying Free Zone Persons (0%)</h4>
                  <p>
                    Free Zone entities maintaining audited accounts, satisfying transfer pricing rules, and earning Qualifying Income may benefit from a 0% rate.
                  </p>
                </div>
              </CardHover>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-slate-600">
                Need a verified Corporate Tax Impact Assessment performed on your audited financial ledgers?
              </p>
              <Link
                href="/book-consultation?service=uae-corporate-tax"
                className="inline-flex items-center px-7 py-3 rounded-xl bg-navy-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-navy-900 transition-all shrink-0 shadow-md group btn-shimmer"
              >
                <span>Book Formal Tax Audit</span>
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
