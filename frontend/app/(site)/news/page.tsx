import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, MapPin, Bell, ArrowRight, Sparkles } from 'lucide-react';
import BackgroundMesh from '@/components/animations/BackgroundMesh';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import CardHover from '@/components/animations/CardHover';

export const metadata: Metadata = {
  title: 'News & Events | ANK Global Chartered Accountants Dubai',
  description:
    'Stay updated with ANK Global corporate events, regulatory seminars, tax webinars, and UAE accounting announcements.',
};

export default function NewsEventsPage() {
  const events = [
    {
      title: 'UAE Corporate Tax Executive Briefing: Navigating Small Business Relief & QFZP Deadlines',
      date: 'November 18, 2026',
      time: '10:00 AM - 1:00 PM',
      location: 'Prime Medical Centre Building, Salah Al Din St, Deira, Dubai',
      type: 'Executive Seminar',
      desc: 'An intensive seminar tailored for Dubai mainland and Free Zone business owners on complying with Federal Decree-Law No. 47 of 2022 and avoiding the AED 10,000 late registration penalty.',
    },
    {
      title: 'Webinar: Common Audit Inaccuracies and Free Zone Trade License Renewals',
      date: 'December 05, 2026',
      time: '2:00 PM - 3:30 PM',
      location: 'Virtual via MS Teams',
      type: 'Online Webinar',
      desc: 'Essential guidance for financial controllers and founders preparing annual audited financial statements for DMCC, DIFC, and JAFZA license submissions.',
    },
    {
      title: 'Tax Governance & IFRS Modernization Workshop',
      date: 'January 14, 2027',
      time: '9:30 AM - 4:00 PM',
      location: 'Grand Excelsior Hotel, Deira, Dubai',
      type: 'Full-Day Workshop',
      desc: 'Hands-on training for accounting managers on IFRS 15, IFRS 16, and setting up automated tax workpapers on Zoho Books and Odoo ERP.',
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
            <span>Corporate Events & Updates</span>
          </div>

          <TextReveal
            text="Seminars, Circulars & Regulatory Events"
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white max-w-4xl leading-tight"
          />

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-light">
            ANK Global regularly organizes technical workshops and executive briefings to prepare business leaders for regional fiscal reforms and compliance deadlines.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-6">
          {events.map((ev, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <CardHover>
                <div className="bg-white rounded-3xl p-8 sm:p-9 border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-gold-300 transition-all grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-8 space-y-3">
                    <div className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-crimson-700 bg-crimson-50 px-3 py-1 rounded-full border border-crimson-200/60">
                      <Bell className="w-3 h-3 mr-1 text-crimson-600" />
                      {ev.type}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-navy-950">
                      {ev.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl font-light">
                      {ev.desc}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 font-medium">
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-crimson-600" />
                        {ev.date} ({ev.time})
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1.5 text-gold-600" />
                        {ev.location}
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex justify-start lg:justify-end">
                    <Link
                      href={`/contact?event=${encodeURIComponent(ev.title)}`}
                      className="inline-flex items-center px-7 py-3.5 rounded-xl bg-navy-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-navy-900 transition-all shadow-md group btn-shimmer"
                    >
                      <span>Reserve Seat</span>
                      <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
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
