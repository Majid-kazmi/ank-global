import React from 'react';
import { Metadata } from 'next';
import ConsultationForm from '@/components/ConsultationForm';
import { ShieldCheck, Clock, Calendar, CheckCircle2, Sparkles, UserCheck, FileCheck } from 'lucide-react';
import BackgroundMesh from '@/components/animations/BackgroundMesh';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import CardHover from '@/components/animations/CardHover';

export const metadata: Metadata = {
  title: 'Book an Advisory Consultation | ANK Global Chartered Accountants Dubai',
  description:
    'Schedule a confidential strategy session with our senior Chartered Accountants and FTA Certified Tax Agents in Dubai, UAE.',
};

export default function BookConsultationPage() {
  const defaultService = undefined;

  return (
    <div className="space-y-16 py-8 pb-24">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-navy-950 text-white py-24 px-4 sm:px-6 lg:px-8 border-b border-navy-800">
        <BackgroundMesh />
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Advisory Strategy Session</span>
          </div>

          <TextReveal
            text="Schedule a Confidential Consultation with Our Senior Partners"
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white max-w-4xl leading-tight"
          />

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-light">
            Reserve your dedicated 45-minute technical consultation. Choose a virtual conference via Microsoft Teams / Zoom or an in-person meeting at our Deira Dubai offices.
          </p>
        </div>
      </section>

      {/* Main Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: What to Expect */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal>
              <CardHover>
                <div className="bg-white p-8 sm:p-9 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-crimson-600 block">
                      Client Value Standard
                    </span>
                    <h3 className="text-2xl font-display font-bold text-navy-950 mt-1">
                      What to Expect from Your Session
                    </h3>
                  </div>

                  <div className="space-y-5 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                    <div className="flex items-start space-x-3.5">
                      <div className="w-9 h-9 rounded-xl bg-crimson-50 text-crimson-600 flex items-center justify-center shrink-0 mt-0.5">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="block text-slate-900 font-semibold mb-0.5 font-sans">
                          Direct Senior Partner Access:
                        </strong>
                        <span>
                          You will speak directly with an accredited FCA, CPA, or FTA Certified Tax Agent, not junior intake staff.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3.5">
                      <div className="w-9 h-9 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center shrink-0 mt-0.5">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="block text-slate-900 font-semibold mb-0.5 font-sans">
                          Corporate Tax & VAT Scoping:
                        </strong>
                        <span>
                          We analyze your licensing (Mainland vs Free Zone), QFZP eligibility, Small Business Relief threshold, and transaction flow.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3.5">
                      <div className="w-9 h-9 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center shrink-0 mt-0.5">
                        <FileCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="block text-slate-900 font-semibold mb-0.5 font-sans">
                          Actionable Compliance Roadmap:
                        </strong>
                        <span>
                          You will receive specific statutory filing deadlines, risk mitigation steps, and transparent professional fee quotations.
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-500 space-y-1">
                    <p className="font-bold text-navy-950">Need Immediate Assistance?</p>
                    <p>Call our partner desk directly at <strong>+971 55 213 8281</strong> or start a WhatsApp chat for immediate scheduling.</p>
                  </div>
                </div>
              </CardHover>
            </ScrollReveal>
          </div>

          {/* Right: Booking Form */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.05}>
              <ConsultationForm defaultServiceSlug={defaultService} />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
