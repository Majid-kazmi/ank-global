import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Mail,
  Linkedin,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Building,
  Sparkles,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { getTeamMembers } from '@/lib/api';
import BackgroundMesh from '@/components/animations/BackgroundMesh';
import ScrollReveal from '@/components/animations/ScrollReveal';
import CardHover from '@/components/animations/CardHover';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  title: 'Executive Leadership & Partners | ANK Global Chartered Accountants Dubai',
  description:
    'Meet the Executive Partners, Certified Tax Agents, and Chartered Accountants steering ANK Global in Dubai, UAE.',
};

export default async function TeamPage() {
  const team = await getTeamMembers();
  const leader = team.find((m: any) => m.id === 't1') || team[0];
  const otherMembers = team.filter((m: any) => m.id !== leader.id);

  const resolveImage = (url?: string) => {
    if (!url) return null;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `${basePath}${url}`;
  };

  return (
    <div className="space-y-16 sm:space-y-20 pb-24 select-none">
      {/* Header Banner (Executive Obsidian Theme) */}
      <section className="relative overflow-hidden bg-[#090A0C] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#1E202B]">
        <BackgroundMesh />
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-crimson-950/70 border border-crimson-500/40 text-crimson-400 text-xs font-bold uppercase tracking-wider shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>Executive Leadership</span>
            </span>
            <span className="inline-flex items-center text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              ICAP Qualified • FTA Approved Tax Agency
            </span>
          </div>

          <div className="block w-full">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white max-w-4xl tracking-tight leading-tight">
              Distinguished Chartered Accountants &amp; Advisory Partners
            </h1>
          </div>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-light">
            ANK Global is guided by qualified Chartered Accountants (ACA, APFA), licensed statutory auditors, and accredited Federal Tax Authority (FTA) tax advisors dedicated to delivering institutional precision, financial transparency, and strategic growth across the UAE and GCC.
          </p>
        </div>
      </section>

      {/* Featured Executive Spotlight: CEO & Managing Partner */}
      {leader && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="relative overflow-hidden bg-[#0D0E13] border border-[#262834] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
              {/* Top Accent Stripe */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-crimson-600 via-gold-400 to-crimson-600" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                {/* Profile Photo with Authentic Badge */}
                <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border-2 border-gold-500/30 shadow-2xl bg-[#161722] group">
                    <img
                      src={resolveImage(leader.photoUrl) || ''}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C]/90 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gold-400/20 text-gold-300 border border-gold-400/40 backdrop-blur-md">
                        Managing Partner
                      </span>
                    </div>
                  </div>
                </div>

                {/* Narrative & Verification */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-crimson-400 bg-crimson-950/60 border border-crimson-500/40 px-3 py-1 rounded-full">
                        <Award className="w-3.5 h-3.5 mr-1.5 text-gold-400" />
                        {leader.qualification}
                      </span>
                      <span className="text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                        12+ Years UAE &amp; Regional Advisory
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
                      {leader.name}
                    </h2>

                    <p className="text-sm font-semibold text-gold-400 uppercase tracking-wider">
                      {leader.role}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                    {leader.bio}
                  </p>

                  {/* Focus Areas Badges */}
                  {leader.specialties && (
                    <div className="pt-2">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Core Practice Domains
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {leader.specialties.map((spec: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-xs font-medium text-slate-200 bg-[#151620] border border-[#2B2D3C] px-3 py-1 rounded-lg flex items-center"
                          >
                            <CheckCircle2 className="w-3 h-3 mr-1.5 text-gold-400" />
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Direct Contact & Social Actions */}
                  <div className="pt-4 border-t border-[#20222F] flex flex-wrap items-center gap-3">
                    {leader.linkedinUrl && (
                      <a
                        href={leader.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 rounded-xl bg-[#1A1C26] border border-[#2B2D3C] text-slate-200 hover:text-white hover:border-gold-400/60 transition-all text-xs font-semibold group"
                      >
                        <Linkedin className="w-4 h-4 mr-2 text-gold-400" />
                        <span>Verified LinkedIn Profile</span>
                        <ExternalLink className="w-3 h-3 ml-1.5 opacity-60 group-hover:opacity-100" />
                      </a>
                    )}

                    {leader.phone && (
                      <a
                        href={`https://wa.me/${leader.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-700 text-white hover:from-crimson-500 hover:to-crimson-600 transition-all text-xs font-bold shadow-md shadow-crimson-900/30"
                      >
                        <MessageCircle className="w-4 h-4 mr-2 text-white" />
                        <span>Direct WhatsApp</span>
                      </a>
                    )}

                    {leader.email && (
                      <a
                        href={`mailto:${leader.email}`}
                        className="inline-flex items-center px-4 py-2 rounded-xl bg-[#161720] border border-[#262834] text-slate-300 hover:text-white transition-colors text-xs font-medium"
                      >
                        <Mail className="w-3.5 h-3.5 mr-2 text-gold-400" />
                        <span>{leader.email}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* Leadership & Practice Bench Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 mb-10">
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Partners &amp; Practice Bench
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            Multidisciplinary chartered accountants, certified auditors, and corporate expansion consultants steering client engagements across the Emirates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherMembers.map((member: any, idx: number) => (
            <ScrollReveal key={member.id} delay={idx * 0.1}>
              <CardHover className="h-full">
                <div className="bg-[#0D0E13] rounded-2xl border border-[#222430] hover:border-gold-400/50 transition-all duration-300 overflow-hidden shadow-lg flex flex-col justify-between h-full group p-6 sm:p-7 space-y-5">
                  <div className="space-y-4">
                    {/* Header with Qualification */}
                    <div className="space-y-2">
                      <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-gold-400 bg-gold-400/10 border border-gold-400/25 px-2.5 py-1 rounded-full">
                        <Award className="w-3 h-3 mr-1 text-gold-400" />
                        {member.qualification}
                      </span>

                      <h3 className="text-xl font-display font-bold text-white group-hover:text-gold-300 transition-colors">
                        {member.name}
                      </h3>

                      <p className="text-xs font-semibold text-crimson-400 uppercase tracking-wider">
                        {member.role}
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {member.bio}
                    </p>

                    {/* Specialties */}
                    {member.specialties && (
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {member.specialties.map((spec: string, sIdx: number) => (
                          <span
                            key={sIdx}
                            className="text-[11px] font-medium text-slate-300 bg-[#161722] border border-[#262838] px-2.5 py-0.5 rounded-md"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Footer Links */}
                  <div className="pt-4 border-t border-[#1C1E2A] flex items-center justify-between text-xs text-slate-400">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="hover:text-gold-300 flex items-center transition-colors font-medium"
                      >
                        <Mail className="w-3.5 h-3.5 mr-1.5 text-gold-400" />
                        <span>Email Partner</span>
                      </a>
                    )}

                    {member.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white flex items-center transition-colors font-medium text-slate-300"
                      >
                        <Linkedin className="w-3.5 h-3.5 mr-1 text-gold-400" />
                        <span>LinkedIn</span>
                        <ExternalLink className="w-2.5 h-2.5 ml-1 opacity-60" />
                      </a>
                    )}
                  </div>
                </div>
              </CardHover>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Institutional Code of Practice & Governance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0D0E13] border border-[#20222D] rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="space-y-2 border-b md:border-b-0 md:border-r border-[#1F212C] pb-6 md:pb-0 md:pr-6">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-crimson-500">
                Statutory Licensing
              </span>
              <h4 className="text-base font-bold text-white">FTA Accredited Agency</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Registered Federal Tax Authority tax agency providing officially recognized corporate tax and VAT filings.
              </p>
            </div>

            <div className="space-y-2 border-b md:border-b-0 md:border-r border-[#1F212C] pb-6 md:pb-0 md:px-6">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-gold-400">
                Professional Ethics
              </span>
              <h4 className="text-base font-bold text-white">ICAP Governance Standards</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Adherence to strict chartered professional ethics, continuous CPD audits, and independent verification.
              </p>
            </div>

            <div className="space-y-2 md:pl-6">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-300">
                Auditing Standards
              </span>
              <h4 className="text-base font-bold text-white">IFRS &amp; ISA Compliance</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Audits executed under International Standards on Auditing recognized across all UAE Free Zones and Mainland DED.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Partner Strategy Consultation CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0D0E13] via-[#14151C] to-[#0D0E13] rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 shadow-2xl border border-[#262836]">
            <BackgroundMesh />
            <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-gold-400 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/20">
                Direct Partner Access
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
                Schedule a Direct Partner Consultation
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Connect directly with Naffar Hussain (ACA, APFA) and our senior partners to evaluate your corporate tax liabilities, audit requirements, or UAE company setup.
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/book-consultation"
                  className="btn-shimmer inline-flex items-center px-8 py-3.5 rounded-xl bg-gradient-to-r from-crimson-600 via-crimson-500 to-crimson-600 text-white font-bold text-xs uppercase tracking-wider hover:from-crimson-500 hover:to-crimson-600 transition-all shadow-xl shadow-crimson-900/40 border border-crimson-400/30"
                >
                  <span>Book Partner Appointment</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <a
                  href="https://wa.me/971552138281"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3.5 rounded-xl bg-[#171822] border border-[#2B2D3C] text-slate-200 hover:text-white hover:border-gold-400/40 font-semibold text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4 mr-2 text-gold-400" />
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
