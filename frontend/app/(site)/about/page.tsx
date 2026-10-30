import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Award, Target, Compass, Users2, ArrowRight, CheckCircle2, Building2, Scale } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';
import CardHover from '@/components/animations/CardHover';
import BackgroundMesh from '@/components/animations/BackgroundMesh';
import AnimatedCounter from '@/components/animations/AnimatedCounter';
import { AnkLogo } from '@/components/brand/AnkLogo';

export const metadata: Metadata = {
  title: 'About ANK Global | Premier UAE Chartered Accountants & Tax Advisors',
  description:
    'Discover ANK Global Chartered Accountants and Advisors. Established in Dubai, UAE, delivering statutory audits, corporate tax, VAT compliance, and corporate advisory with integrity and excellence.',
};

export default function AboutPage() {
  return (
    <div className="space-y-28 py-10 pb-28 overflow-hidden">
      {/* Hero Banner */}
      <section className="bg-navy-950 text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <BackgroundMesh />
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <ScrollReveal direction="down">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-gold-400/30 text-gold-300 text-xs font-semibold uppercase tracking-wider shadow-md">
              <ShieldCheck className="w-4 h-4 text-crimson-500" />
              <span>Corporate Identity & Institutional Values</span>
            </div>
          </ScrollReveal>

          <TextReveal
            text="Elevating Financial Integrity & Enterprise Growth in the UAE"
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white max-w-4xl leading-tight"
          />

          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
              ANK Global Chartered Accountants and Advisors is an accredited professional audit, taxation, and management advisory practice headquartered in Dubai, United Arab Emirates.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Profile Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="right">
              <span className="text-xs font-bold uppercase tracking-widest text-crimson-600 bg-crimson-50 px-3 py-1 rounded-full border border-crimson-100">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-950 mt-2">
                A Foundation of Technical Rigor, Independence & Due Diligence
              </h2>
              <div className="space-y-4 text-sm text-slate-600 leading-relaxed mt-4">
                <p>
                  Established to meet the heightened regulatory requirements of the United Arab Emirates commercial ecosystem, ANK Global stands as a beacon of financial credibility, transparency, and strategic stewardship.
                </p>
                <p>
                  From our headquarters in Deira, Dubai, our qualified multidisciplinary professionals—comprising Fellow Chartered Accountants (FCA), Certified Public Accountants (CPA), FTA Certified Tax Agents, and corporate advisors—guide client enterprises ranging from prominent UAE family businesses to high-growth multinational technology and trading corporations.
                </p>
                <p>
                  We do not merely report past ledger entries; we construct resilient financial frameworks that empower business leaders to make informed, defensible decisions in an increasingly regulated international market.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-200 mt-6">
                <div>
                  <div className="text-3xl font-display font-bold text-navy-950 flex items-center">
                    <AnimatedCounter value={100} suffix="%" />
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">FTA Certified Tax Agency Record</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-crimson-600 flex items-center">
                    <AnimatedCounter value={12} suffix=" Practice Areas" />
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">Free Zone & Mainland Authorized</div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5">
            <ScrollReveal direction="left" delay={0.15}>
              <div className="bg-gradient-to-b from-navy-950 to-navy-900 rounded-3xl p-8 sm:p-10 text-white space-y-6 shadow-2xl border border-navy-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-crimson-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="border-b border-navy-800 pb-4">
                  <div className="mb-3">
                    <AnkLogo variant="dark" width={200} height={52} />
                  </div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-gold-400">
                    Institutional Profile
                  </span>
                </div>

                <ul className="space-y-4 text-xs text-slate-300">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 mr-2.5 shrink-0 mt-0.5" />
                    <span><strong>Legal Identity:</strong> ANK Global Chartered Accountants and Advisors</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-crimson-400 mr-2.5 shrink-0 mt-0.5" />
                    <span><strong>Headquarters:</strong> Office No. 402, Sheikh Saud Al Qasimi Bldg, 159 Salah Al Din St, Deira, Dubai, UAE (P.O. Box 37212)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 mr-2.5 shrink-0 mt-0.5" />
                    <span><strong>Direct Contact:</strong> +971 55 213 8281 | info@ankglobal.co</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-crimson-400 mr-2.5 shrink-0 mt-0.5" />
                    <span><strong>Core Practices:</strong> Corporate Tax (9%), VAT, Excise Tax, Statutory Audit, Advisory & Company Setup</span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-navy-800">
                  <Link
                    href="/book-consultation"
                    className="btn-shimmer w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-700 text-white text-xs font-bold uppercase tracking-wider block text-center hover:from-crimson-500 hover:to-crimson-600 transition-all shadow-lg shadow-crimson-900/40 border border-crimson-400/30"
                  >
                    Schedule Meeting with Leadership
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gradient-to-b from-slate-100/80 to-slate-50 py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-navy-950 text-gold-400 flex items-center justify-center shadow-md">
                    <Target className="w-6 h-6 text-crimson-500" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-navy-950">Our Mission</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    To serve clients to their utmost satisfaction, enabling them to make the best, most informed business decisions that add substantial, enduring value to their businesses, shareholders, and communities.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500 to-gold-400 text-navy-950 flex items-center justify-center shadow-md">
                    <Compass className="w-6 h-6 text-navy-950" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-navy-950">Our Vision</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Unwavering client satisfaction. We empower strategic business decisions and stand as an unshakeable beacon of support, enabling clients across the UAE and globally to navigate complexities and achieve their highest commercial potential.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values / 6 Guiding Ethical Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-crimson-600 bg-crimson-50 px-3 py-1 rounded-full border border-crimson-100">
              Professional Code of Conduct
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-950">
              Our Six Guiding Ethical Pillars
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every audit report, tax return, and advisory engagement at ANK Global is governed by unwavering institutional benchmarks.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              num: '1',
              title: 'Integrity',
              desc: 'We are straightforward, honest, and transparent in all professional and business relationships, never compromising on factual accuracy.',
              color: 'border-t-crimson-500',
            },
            {
              num: '2',
              title: 'Objectivity',
              desc: 'We never allow bias, conflicts of interest, or undue external influence to override our rigorous professional judgment.',
              color: 'border-t-gold-500',
            },
            {
              num: '3',
              title: 'Confidentiality',
              desc: 'Client data, trade secrets, and financial disclosures are guarded with the strictest standards of professional secrecy under UAE law.',
              color: 'border-t-navy-900',
            },
            {
              num: '4',
              title: 'Professional Competence & Due Care',
              desc: 'Continuous technical learning ensures our clients benefit from current developments in practice, legislation, and digital techniques.',
              color: 'border-t-crimson-500',
            },
            {
              num: '5',
              title: 'Professional Behavior Obligation',
              desc: 'We comply strictly with all UAE federal regulations and international accounting standards, upholding the honor of the profession.',
              color: 'border-t-gold-500',
            },
            {
              num: '6',
              title: 'Flexibility',
              desc: 'We adapt seamlessly to our clients’ evolving corporate goals, structures, and budgets without sacrificing quality or compliance.',
              color: 'border-t-navy-900',
            },
          ].map((val, idx) => (
            <ScrollReveal key={val.title} direction="up" delay={idx * 0.08}>
              <CardHover className="h-full">
                <div className={`bg-white p-7 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-3.5 h-full border-t-4 ${val.color}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">Pillar 0{val.num}</span>
                  </div>
                  <h4 className="font-display font-bold text-lg text-navy-950 group-hover:text-crimson-700 transition-colors">
                    {val.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </CardHover>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
