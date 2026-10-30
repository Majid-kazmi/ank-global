import React from 'react';
import { Metadata } from 'next';
import { Briefcase, GraduationCap, Users2, Mail, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import BackgroundMesh from '@/components/animations/BackgroundMesh';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import CardHover from '@/components/animations/CardHover';

export const metadata: Metadata = {
  title: 'Careers at ANK Global | Chartered Accounting Careers Dubai',
  description:
    'Explore career opportunities in audit, corporate tax, VAT, and financial advisory at ANK Global Chartered Accountants in Dubai, UAE.',
};

export default function CareersPage() {
  const openings = [
    {
      title: 'Senior Corporate Tax Advisor',
      department: 'Taxation & Regulatory Advisory',
      location: 'Deira, Dubai',
      experience: '4 - 7 Years in UAE Tax / FTA Practices',
      qualification: 'Chartered Accountant / Certified Tax Agent / LL.M Tax',
      desc: 'Lead Corporate Tax impact assessments, QFZP 0% audits, transfer pricing documentation, and client return filings.',
    },
    {
      title: 'Statutory Audit Senior / Assistant Manager',
      department: 'Audit & Assurance',
      location: 'Deira, Dubai',
      experience: '3 - 5 Years in Big 4 / Tier-2 UAE Audit Firm',
      qualification: 'ACCA / ACA / CPA',
      desc: 'Plan and execute external financial audits for mainland and DMCC/DIFC/JAFZA Free Zone corporations in accordance with ISA and IFRS.',
    },
    {
      title: 'Cloud Accounting & ERP Consultant',
      department: 'Accounting & Digital Finance',
      location: 'Deira, Dubai',
      experience: '2 - 4 Years',
      qualification: 'B.Com / Semi-Qualified ACCA / Zoho & Odoo Certified',
      desc: 'Manage monthly ledger reconciliations, backlog cleanups, payroll, and management reporting on Zoho Books and QuickBooks.',
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
            <span>Talent & Professional Excellence</span>
          </div>

          <TextReveal
            text="Build Your Career with ANK Global"
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white max-w-4xl leading-tight"
          />

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-light">
            Join a collaborative culture committed to technical mastery, continuous professional development, and high-impact client engagements across the UAE.
          </p>
        </div>
      </section>

      {/* Culture & Perks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ScrollReveal delay={0.05}>
            <CardHover className="h-full">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-3 h-full">
                <div className="w-12 h-12 rounded-2xl bg-gold-50 text-gold-600 flex items-center justify-center mb-2">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-navy-950">
                  Sponsored Professional Qualifications
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  We actively support ACCA, CPA, UAE CA, and FTA Certified Tax Agent credentials through study leave and senior mentorship.
                </p>
              </div>
            </CardHover>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <CardHover className="h-full">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-3 h-full">
                <div className="w-12 h-12 rounded-2xl bg-crimson-50 text-crimson-600 flex items-center justify-center mb-2">
                  <Users2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-navy-950">
                  Multidisciplinary Engagements
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  Work across corporate tax, statutory audits, M&A due diligence, and enterprise ERP transformations with leading UAE brands.
                </p>
              </div>
            </CardHover>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <CardHover className="h-full">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-3 h-full">
                <div className="w-12 h-12 rounded-2xl bg-navy-50 text-navy-900 flex items-center justify-center mb-2">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-navy-950">
                  Meritocratic Career Trajectory
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  Transparent promotion pathways from Associate to Engagement Manager and Director based on demonstrated technical competence.
                </p>
              </div>
            </CardHover>
          </ScrollReveal>
        </div>
      </section>

      {/* Open Positions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ScrollReveal>
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-crimson-600 block">
              Join Our Bench
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-950 mt-1">
              Current Vacancies in Dubai Office
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Applications are reviewed on a rolling basis by our Managing Partner.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          {openings.map((job, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.08}>
              <CardHover>
                <div className="bg-white rounded-3xl p-8 sm:p-9 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-gold-300 transition-all grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-8 space-y-3">
                    <div className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-crimson-700 bg-crimson-50 px-3 py-1 rounded-full border border-crimson-200/60">
                      {job.department}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-navy-950">
                      {job.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl font-light">
                      {job.desc}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1 font-medium">
                      <span>Location: <strong>{job.location}</strong></span>
                      <span>•</span>
                      <span>Experience: <strong>{job.experience}</strong></span>
                      <span>•</span>
                      <span>Qualification: <strong>{job.qualification}</strong></span>
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex justify-start lg:justify-end">
                    <a
                      href={`mailto:careers@ankglobal.co?subject=${encodeURIComponent(`Application for ${job.title}`)}`}
                      className="inline-flex items-center px-7 py-3.5 rounded-xl bg-navy-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-navy-900 transition-all shadow-md group btn-shimmer"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      <span>Apply via Email</span>
                    </a>
                  </div>
                </div>
              </CardHover>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
