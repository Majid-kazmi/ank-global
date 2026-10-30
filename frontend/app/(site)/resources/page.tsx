import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { FileDown, FileText, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import BackgroundMesh from '@/components/animations/BackgroundMesh';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import CardHover from '@/components/animations/CardHover';

export const metadata: Metadata = {
  title: 'Download Company Profile & Resources | ANK Global Dubai',
  description:
    'Download the official ANK Global Chartered Accountants corporate profile, UAE Corporate Tax readiness checklist, and Free Zone audit guidelines.',
};

export default function ResourcesPage() {
  const documents = [
    {
      title: 'ANK Global Official Corporate Profile',
      category: 'Firm Brochure',
      format: 'PDF Document',
      size: '2.4 MB',
      desc: 'Complete overview of our audit, corporate tax, VAT, and business advisory practices, senior leadership bios, and client engagement models.',
      url: '/profile-download',
    },
    {
      title: 'UAE Corporate Tax (9%) Compliance & SBR Checklist',
      category: 'Regulatory Guide',
      format: 'PDF Guide',
      size: '1.1 MB',
      desc: 'Step-by-step checklist to prepare financial ledgers, calculate non-deductible adjustments, and test Small Business Relief eligibility under AED 3M revenue.',
      url: '/tools',
    },
    {
      title: 'DMCC, DIFC & Free Zone Audit Requirement Guide',
      category: 'Audit Assurance',
      format: 'PDF Guide',
      size: '850 KB',
      desc: 'Accredited auditor guidelines, filing deadlines, and mandatory documentation for trade license renewals across major UAE Free Zones.',
      url: '/services/audit-and-assurance',
    },
    {
      title: 'UAE VAT Voluntary Disclosure (Form 211) Roadmap',
      category: 'Taxation Whitepaper',
      format: 'PDF Guide',
      size: '920 KB',
      desc: 'How to correct historical VAT return misstatements, calculate penalty exposure, and liaise with the Federal Tax Authority without incurring audit fines.',
      url: '/services/uae-vat-compliance',
    },
  ];

  return (
    <div className="space-y-16 py-8 pb-24">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-navy-950 text-white py-24 px-4 sm:px-6 lg:px-8 border-b border-navy-800">
        <BackgroundMesh />
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Corporate Resources</span>
          </div>

          <TextReveal
            text="Download ANK Global Corporate Profile & Practice Guides"
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white max-w-4xl leading-tight"
          />

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-light">
            Access authoritative documentation, compliance scorecards, and regulatory roadmaps curated by our Chartered Accountants and Tax Advisors.
          </p>
        </div>
      </section>

      {/* Documents Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {documents.map((doc, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.08}>
              <CardHover className="h-full">
                <div className="bg-white rounded-3xl p-8 sm:p-9 border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-gold-400 transition-all flex flex-col justify-between space-y-6 h-full">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-crimson-700 bg-crimson-50 px-3 py-1 rounded-full border border-crimson-200/60">
                        {doc.category}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">
                        {doc.format} • {doc.size}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-bold text-navy-950 group-hover:text-crimson-600 transition-colors">
                      {doc.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                      {doc.desc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href="/contact?intent=download-profile"
                      className="inline-flex items-center text-xs font-bold text-navy-950 hover:text-crimson-600 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-full bg-gold-50 text-gold-700 group-hover:bg-crimson-600 group-hover:text-white transition-colors flex items-center justify-center mr-2.5">
                        <FileDown className="w-4 h-4" />
                      </div>
                      <span>Download Document</span>
                    </Link>
                    <Link
                      href="/book-consultation"
                      className="text-xs text-slate-400 hover:text-navy-950 font-medium"
                    >
                      Request Printed Copy
                    </Link>
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
