import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Calculator,
  Lock,
  TrendingUp,
  Award,
  ChevronRight,
  Sparkles,
  Building2,
  FileCheck2,
} from 'lucide-react';
import { getServices, getArticles } from '@/lib/api';
import TaxCalculator from '@/components/TaxCalculator';
import ScrollReveal from '@/components/animations/ScrollReveal';
import CardHover from '@/components/animations/CardHover';
import MagneticButton from '@/components/animations/MagneticButton';
import HeroRevolutionSlider from '@/components/animations/HeroRevolutionSlider';

export const metadata: Metadata = {
  title: 'ANK Global | Chartered Accountants & Corporate Tax Advisors Dubai, UAE',
  description:
    'Award-winning corporate advisory, FTA certified UAE Corporate Tax (9%) compliance, statutory audit assurance, and virtual CFO governance across Dubai and Free Zones.',
};

export default async function HomePage() {
  const [services, articlesData] = await Promise.all([
    getServices(),
    getArticles({ limit: 3 }),
  ]);

  const articles = articlesData?.items || [];
  const featuredServices = services.slice(0, 6);

  return (
    <div className="space-y-24 sm:space-y-28 pb-24 overflow-hidden bg-slate-50">
      {/* 1. HERO EXTRAORDINARY MOTION SLIDER (Slider Revolution Style) */}
      <HeroRevolutionSlider />

      {/* 2. CORE PRACTICE AREAS (Instituional Scope) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-crimson-600 bg-crimson-50 px-3 py-1 rounded-full border border-crimson-100">
                Core Advisory Spectrum
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#090A0C]">
                Institutional Accounting, Tax & Audit Practices
              </h2>
            </div>
            <Link
              href="/services"
              className="text-xs font-bold text-[#090A0C] hover:text-crimson-600 flex items-center transition-colors group"
            >
              <span>Explore all 12 services</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service: any, idx: number) => (
            <ScrollReveal key={service.slug} direction="up" delay={idx * 0.06}>
              <CardHover className="h-full">
                <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-gold-400/50 transition-all flex flex-col justify-between h-full group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-3 py-1 rounded-full group-hover:bg-gold-50 group-hover:text-gold-800 transition-colors">
                        {service.category}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-crimson-600 group-hover:text-white transition-colors flex items-center justify-center text-slate-400">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-xl font-display font-bold text-[#090A0C] group-hover:text-crimson-600 transition-colors leading-snug">
                      {service.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-light">
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
                      className="text-xs font-bold text-[#090A0C] group-hover:text-crimson-600 transition-colors flex items-center"
                    >
                      <span>Full practice scope</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                    <Link
                      href={`/book-consultation?service=${service.slug}`}
                      className="text-[11px] text-slate-400 hover:text-[#090A0C] font-semibold"
                    >
                      Book Advice
                    </Link>
                  </div>
                </div>
              </CardHover>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 3. INTERACTIVE CORPORATE TAX & VAT ESTIMATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ScrollReveal direction="up">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-[11px] uppercase font-bold tracking-widest text-crimson-600 bg-crimson-50 px-3.5 py-1 rounded-full border border-crimson-200">
              Interactive Financial Estimator
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#090A0C] tracking-tight">
              UAE Corporate Tax (9%) & VAT Estimator
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-light">
              Under Federal Decree-Law No. 47 of 2022, taxable profit exceeding AED 375,000 is subject to 9% Corporate Tax. Calculate your estimated statutory liability and test Small Business Relief (<span className="font-semibold text-slate-900">AED 3M Revenue</span>) status.
            </p>
          </div>
        </ScrollReveal>

        <TaxCalculator />
      </section>

      {/* 4. WHY DUBAI ENTERPRISES ENTRUST THEIR GOVERNANCE TO ANK GLOBAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal direction="right">
              <span className="text-[10px] uppercase font-bold tracking-widest text-crimson-600 bg-crimson-50 px-3 py-1 rounded-full border border-crimson-100">
                Institutional Principles
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#090A0C] leading-tight mt-2">
                Why Dubai Enterprises Entrust Their Financial Governance to ANK Global
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light mt-3">
                In an era of stringent UAE tax reforms and tightened audit criteria, accounting cannot merely be a retrospective compliance chore. ANK Global acts as an active strategic partner—safeguarding enterprise assets, avoiding punitive fines, and unlocking sustainable capital efficiency.
              </p>

              <div className="space-y-4 pt-3">
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-crimson-50 text-crimson-600 flex items-center justify-center shrink-0 border border-crimson-100 shadow-sm">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#090A0C]">Uncompromising Integrity & Objectivity</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed font-light">
                      We strictly uphold international professional ethics, ensuring zero conflict of interest and unbiased audit reporting that satisfies global tier-1 banks and tax auditors.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#090A0C]">Strict Professional Confidentiality</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed font-light">
                      Your financial and corporate records are protected with bank-grade encryption and stringent legal non-disclosure agreements under UAE federal law.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-gold-50 text-gold-700 flex items-center justify-center shrink-0 border border-gold-200 shadow-sm">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#090A0C]">Commercial Flexibility & Due Care</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed font-light">
                      Custom-tailored scopes matching your exact operational rhythm, from high-growth tech ventures to established family offices and industrial holdings.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="text-xs font-bold text-crimson-700 hover:text-crimson-800 flex items-center group"
                >
                  <span>Explore our corporate history & institutional code</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7">
            <ScrollReveal direction="left" delay={0.15}>
              <div className="bg-[#090A0C] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-[#22242B]">
                <div className="absolute top-0 right-0 w-80 h-80 bg-crimson-600/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-400/8 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-8 relative z-10">
                  <div className="border-b border-white/10 pb-6">
                    <div className="flex items-center space-x-2 text-gold-400 text-xs font-bold uppercase tracking-widest">
                      <Sparkles className="w-4 h-4 text-gold-400" />
                      <span>Corporate Mission & Standard</span>
                    </div>
                    <blockquote className="text-xl sm:text-2xl font-display italic text-slate-100 mt-3 leading-relaxed">
                      “To serve clients to their utmost satisfaction, enabling informed business decisions that add measurable, lasting strategic value to their enterprises and stakeholders.”
                    </blockquote>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div className="p-5 rounded-2xl bg-[#131418] border border-white/5 space-y-2">
                      <span className="text-gold-400 font-bold text-xs uppercase tracking-wider block">
                        Dedicated Practice Units
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        Direct engagement with qualified Chartered Accountants and certified Tax Agents aligned specifically to your industry sector.
                      </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#131418] border border-white/5 space-y-2">
                      <span className="text-crimson-400 font-bold text-xs uppercase tracking-wider block">
                        100% On-Time Filing Record
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        Meticulous statutory checklists ensuring zero late-filing fines across VAT, Corporate Tax, and ESR submissions.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
                    <div>
                      <p className="text-xs font-semibold text-white">Direct Partner Consultation</p>
                      <p className="text-xs text-gold-400 font-mono">+971 55 213 8281</p>
                    </div>
                    <MagneticButton>
                      <Link
                        href="/book-consultation"
                        className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-neutral-950 font-bold text-xs uppercase tracking-wider hover:from-gold-400 hover:to-gold-300 transition-all text-center shadow-lg btn-shimmer"
                      >
                        Book Session Now
                      </Link>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. LATEST UAE REGULATORY INSIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-crimson-600 bg-crimson-50 px-3 py-1 rounded-full border border-crimson-100">
                Thought Leadership & Circulars
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#090A0C]">
                Latest UAE Accounting & Tax Insights
              </h2>
            </div>
            <Link
              href="/insights"
              className="text-xs font-bold text-[#090A0C] hover:text-crimson-600 flex items-center transition-colors group"
            >
              <span>Explore all insights & updates</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article: any, i: number) => (
            <ScrollReveal key={article.slug} direction="up" delay={i * 0.1}>
              <CardHover className="h-full">
                <article className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-2xl transition-all flex flex-col justify-between h-full">
                  <div>
                    <div className="h-52 overflow-hidden relative bg-[#090A0C]">
                      {article.coverImage && (
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      )}
                      <div className="absolute top-4 left-4 bg-[#090A0C]/85 backdrop-blur-md text-gold-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10">
                        {article.category}
                      </div>
                    </div>

                    <div className="p-6 sm:p-7 space-y-3.5">
                      <div className="text-[11px] text-slate-400 flex items-center space-x-2">
                        <span>
                          {new Date(article.publishedAt).toLocaleDateString('en-AE', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                        <span>•</span>
                        <span>{article.readTimeMinutes} min read</span>
                      </div>

                      <h3 className="text-xl font-display font-bold text-[#090A0C] group-hover:text-crimson-600 transition-colors leading-snug">
                        <Link href={`/insights/${article.slug}`}>{article.title}</Link>
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-light">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-400">
                      By {article.authorName}
                    </span>
                    <Link
                      href={`/insights/${article.slug}`}
                      className="text-xs font-bold text-[#090A0C] group-hover:text-crimson-600 flex items-center transition-colors"
                    >
                      <span>Read Article</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                </article>
              </CardHover>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 6. CINEMATIC APPOINTMENT / HEAD OFFICE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#090A0C] via-[#131418] to-[#090A0C] rounded-3xl p-8 sm:p-14 text-white border border-[#22242B] shadow-2xl">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-crimson-600/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gold-400/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/20">
                  Direct Partner Access
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
                  Ready to Resolve Your UAE Tax & Audit Requirements?
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-light">
                  Connect directly with our senior Chartered Accountants. We review your company structure, identify risk exposures, provide clear actionable guidance, and ensure complete regulatory alignment under UAE federal laws.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300">
                  <span className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-crimson-400 mr-2" />
                    Office No. 402, Sheikh Saud Al Qasimi Bldg, Deira, Dubai
                  </span>
                  <span className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-gold-400 mr-2" />
                    Direct Telephone: +971 55 213 8281
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-center">
                <MagneticButton>
                  <Link
                    href="/book-consultation"
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-700 text-white font-bold text-xs uppercase tracking-wider text-center hover:from-crimson-500 hover:to-crimson-600 transition-all shadow-xl shadow-crimson-900/40 border border-crimson-400/30 block btn-shimmer"
                  >
                    Schedule Meeting Now
                  </Link>
                </MagneticButton>

                <a
                  href="https://wa.me/971552138281"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-xl bg-[#131418] border border-[#22242B] text-slate-200 hover:text-white hover:border-gold-400/40 font-semibold text-xs uppercase tracking-wider text-center transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
