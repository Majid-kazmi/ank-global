import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  FileCheck2,
  Building2,
  Calculator,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { getServices } from '@/lib/api';
import BackgroundMesh from '@/components/animations/BackgroundMesh';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import CardHover from '@/components/animations/CardHover';

export const metadata: Metadata = {
  title: 'Corporate Services & Practice Areas | ANK Global Dubai, UAE',
  description:
    'Comprehensive Chartered Accounting, Statutory Audits, UAE Corporate Tax (9%), VAT, Company Setup, and Virtual CFO services across Dubai and the UAE.',
};

export default async function ServicesHubPage() {
  const services = await getServices();

  const categories = [
    'Taxation Services',
    'Audit & Assurance',
    'Accounting Services',
    'Advisory Services',
    'Corporate Services',
    'Technology Solutions',
  ];

  return (
    <div className="space-y-20 py-8 pb-24">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-navy-950 text-white py-24 px-4 sm:px-6 lg:px-8 border-b border-navy-800">
        <BackgroundMesh />
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ANK Global Practice Portfolio</span>
          </div>

          <TextReveal
            text="Institutional Accounting, Tax & Advisory Practices"
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white max-w-4xl leading-tight"
          />

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-light">
            Delivering rigorous audit assurance, strategic Federal Corporate Tax planning, and turnkey corporate services designed specifically for the United Arab Emirates regulatory and economic framework.
          </p>
        </div>
      </section>

      {/* Main Catalog by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {categories.map((cat, catIdx) => {
          const catServices = services.filter((s: any) => s.category === cat);
          if (catServices.length === 0) return null;

          return (
            <ScrollReveal key={cat} delay={catIdx * 0.05} className="space-y-8">
              <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-crimson-600 block">
                    Practice Division
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-950 mt-1">
                    {cat}
                  </h2>
                </div>
                <span className="text-xs text-slate-400 font-semibold px-3 py-1 rounded-full bg-slate-100">
                  {catServices.length} {catServices.length === 1 ? 'Specialization' : 'Specializations'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {catServices.map((service: any) => (
                  <CardHover key={service.slug} className="h-full">
                    <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:border-gold-400 transition-all group flex flex-col justify-between h-full">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-navy-900 bg-slate-100 px-3 py-1 rounded-full group-hover:bg-gold-50 group-hover:text-gold-800 transition-colors">
                            Verified UAE Practice
                          </span>
                          <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-crimson-600 group-hover:text-white transition-colors flex items-center justify-center text-slate-400">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>

                        <h3 className="text-xl font-display font-bold text-navy-950 group-hover:text-crimson-600 transition-colors">
                          {service.title}
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                          {service.shortDescription}
                        </p>

                        <ul className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
                          {service.features.slice(0, 3).map((f: string, i: number) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="w-3.5 h-3.5 text-gold-600 mr-2 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                        <Link
                          href={`/services/${service.slug}`}
                          className="text-xs font-bold text-navy-900 group-hover:text-crimson-600 transition-colors flex items-center"
                        >
                          <span>Full practice scope</span>
                          <ChevronRight className="w-3.5 h-3.5 ml-1" />
                        </Link>
                        <Link
                          href={`/book-consultation?service=${service.slug}`}
                          className="text-[11px] text-slate-500 hover:text-navy-950 font-semibold"
                        >
                          Book Advice
                        </Link>
                      </div>
                    </div>
                  </CardHover>
                ))}
              </div>
            </ScrollReveal>
          );
        })}
      </section>

      {/* Strategy Retainer Proposal Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-crimson-950 p-8 sm:p-14 text-white shadow-2xl border border-navy-800">
            <BackgroundMesh />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-xl">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
                  Comprehensive UAE Retainers
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  Need a Customized Multi-Practice Retainer?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  We bundle statutory audit, quarterly VAT reviews, and annual Corporate Tax filings into comprehensive, cost-effective annual retainers for UAE corporate groups and Free Zone entities.
                </p>
              </div>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl bg-gold-500 text-navy-950 text-xs font-bold uppercase tracking-wider hover:bg-gold-400 transition-all shrink-0 shadow-lg hover:shadow-gold-500/20 btn-shimmer"
              >
                Request Retainer Proposal
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
