import React from 'react';
import { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import InquiryForm from '@/components/InquiryForm';
import BackgroundMesh from '@/components/animations/BackgroundMesh';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import CardHover from '@/components/animations/CardHover';

export const metadata: Metadata = {
  title: 'Contact ANK Global | Deira Office Dubai, UAE',
  description:
    'Contact ANK Global Chartered Accountants & Tax Advisors. Office No. 402, Sheikh Saud Al Qasimi Building, Salah Al Din St, Deira, Dubai. Phone: +971 55 213 8281.',
};

export default function ContactPage() {
  return (
    <div className="space-y-16 py-8 pb-24">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-navy-950 text-white py-24 px-4 sm:px-6 lg:px-8 border-b border-navy-800">
        <BackgroundMesh />
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dubai Advisory Office</span>
          </div>

          <TextReveal
            text="Connect with Our Senior Chartered Accountants"
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white max-w-4xl leading-tight"
          />

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-light">
            Visit our Dubai headquarters in Deira or contact our partner advisory desk directly for confidential tax and audit consultations.
          </p>
        </div>
      </section>

      {/* Main Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Office Coordinates & Location Card */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal>
              <CardHover>
                <div className="bg-white p-8 sm:p-9 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-crimson-600">
                      Physical Presence
                    </span>
                    <h3 className="text-2xl font-display font-bold text-navy-950">
                      Dubai Headquarters
                    </h3>
                  </div>

                  <div className="space-y-5 text-xs sm:text-sm text-slate-600">
                    <div className="flex items-start space-x-3.5">
                      <div className="w-9 h-9 rounded-xl bg-crimson-50 text-crimson-600 flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="block text-slate-900 font-semibold mb-0.5">Physical Address:</strong>
                        <span>Office No. 402, Sheikh Saud Al Qasimi Building (Prime Medical Centre Building)</span>
                        <span className="block text-slate-500">Opposite Al Reef Mall – 159 Salah Al Din Street</span>
                        <span className="block text-slate-500">Deira, Dubai, United Arab Emirates</span>
                        <span className="block text-slate-400 mt-1">P.O. Box 37212</span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3.5">
                      <div className="w-9 h-9 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="block text-slate-900 font-semibold mb-0.5">Telephone & WhatsApp:</strong>
                        <a href="tel:+971552138281" className="hover:text-crimson-600 text-sm font-bold text-navy-950 transition-colors">
                          +971 55 213 8281
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3.5">
                      <div className="w-9 h-9 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center shrink-0 mt-0.5">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="block text-slate-900 font-semibold mb-0.5">Corporate Email:</strong>
                        <a href="mailto:info@ankglobal.co" className="hover:text-crimson-600 text-sm font-bold text-navy-950 transition-colors">
                          info@ankglobal.co
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3.5">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="block text-slate-900 font-semibold mb-0.5">Operating Hours:</strong>
                        <span>Monday - Friday: 9:00 AM – 6:00 PM (GST)</span>
                        <span className="block text-slate-400">Saturday: By Appointment Only | Sunday: Closed</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href="https://wa.me/971552138281"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 mr-1.5" />
                      <span>Start WhatsApp Chat</span>
                    </a>
                    <span className="text-[11px] text-slate-400 font-medium">Fast-track response &lt; 15 mins</span>
                  </div>
                </div>
              </CardHover>
            </ScrollReveal>

            {/* Interactive Map Embed */}
            <ScrollReveal delay={0.1}>
              <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm h-72">
                <iframe
                  src="https://maps.google.com/maps?q=ANK%20Global%20Management%20and%20Tax%20Consultants%2C%20deira%2C%20dubai&t=m&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ANK Global Dubai Headquarters Location"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.05}>
              <InquiryForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
