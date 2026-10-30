import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Linkedin, Award, ArrowRight, Sparkles } from 'lucide-react';
import { getTeamMembers } from '@/lib/api';
import BackgroundMesh from '@/components/animations/BackgroundMesh';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import CardHover from '@/components/animations/CardHover';

export const metadata: Metadata = {
  title: 'Our Leadership Team | ANK Global Chartered Accountants Dubai',
  description:
    'Meet the Senior Partners, Certified Tax Agents, and Chartered Accountants steering ANK Global in Dubai, UAE.',
};

export default async function TeamPage() {
  const team = await getTeamMembers();

  return (
    <div className="space-y-20 py-8 pb-24">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-navy-950 text-white py-24 px-4 sm:px-6 lg:px-8 border-b border-navy-800">
        <BackgroundMesh />
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Professional Bench</span>
          </div>

          <TextReveal
            text="Distinguished Chartered Accountants & Licensed Tax Advisors"
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white max-w-4xl leading-tight"
          />

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-light">
            Our multidisciplinary practice is led by experienced Chartered Accountants, certified auditors, corporate tax specialists, and financial technologists dedicated to your enterprise growth in the UAE.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {team.map((member: any, idx: number) => (
            <ScrollReveal key={member.id} delay={idx * 0.1}>
              <CardHover className="h-full">
                <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-2xl hover:border-gold-300 transition-all flex flex-col sm:flex-row group h-full">
                  <div className="sm:w-2/5 h-64 sm:h-auto overflow-hidden relative bg-navy-950 shrink-0">
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500 bg-gradient-to-br from-navy-900 to-navy-950">
                        <Award className="w-12 h-12 text-gold-400/40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="sm:w-3/5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-crimson-700 bg-crimson-50 border border-crimson-200/60 px-2.5 py-0.5 rounded-full">
                        <Award className="w-3 h-3 mr-1 text-crimson-600" />
                        {member.qualification}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-display font-bold text-navy-950 group-hover:text-crimson-600 transition-colors">
                        {member.name}
                      </h3>

                      <p className="text-xs font-semibold text-gold-600 uppercase tracking-wider">
                        {member.role}
                      </p>

                      <p className="text-xs text-slate-600 leading-relaxed pt-1 line-clamp-4">
                        {member.bio}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center space-x-4 text-xs text-slate-500">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="hover:text-crimson-600 flex items-center transition-colors font-medium"
                          title={member.email}
                        >
                          <Mail className="w-4 h-4 mr-1.5 text-crimson-600" />
                          <span>Email</span>
                        </a>
                      )}
                      {member.linkedinUrl && (
                        <a
                          href={member.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-navy-950 flex items-center transition-colors font-medium"
                        >
                          <Linkedin className="w-4 h-4 mr-1.5 text-[#0A66C2]" />
                          <span>LinkedIn</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardHover>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative overflow-hidden bg-gradient-to-r from-navy-950 via-navy-900 to-crimson-950 rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 shadow-2xl border border-navy-800">
            <BackgroundMesh />
            <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
                Direct Leadership Engagement
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
                Consult Directly with an ANK Global Partner
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Reserve a confidential strategy session to discuss your tax structuring, audit timelines, or commercial setup in the UAE.
              </p>
              <div className="pt-4">
                <Link
                  href="/book-consultation"
                  className="inline-flex items-center px-8 py-4 rounded-xl bg-gold-500 text-navy-950 text-xs font-bold uppercase tracking-wider hover:bg-gold-400 transition-all shadow-lg hover:shadow-gold-500/20 btn-shimmer"
                >
                  <span>Book Partner Appointment</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
