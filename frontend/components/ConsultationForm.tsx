'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Video, Building2, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { submitConsultation } from '@/lib/api';
import LottiePlayer from '@/components/animations/LottiePlayer';

interface ConsultationFormProps {
  defaultServiceSlug?: string;
}

export default function ConsultationForm({ defaultServiceSlug }: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceSlug: defaultServiceSlug || 'uae-corporate-tax',
    serviceName: 'UAE Corporate Tax Advisory & Filing',
    preferredDate: '',
    preferredTime: '10:00 AM - 11:00 AM',
    meetingType: 'VIRTUAL',
    notes: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const services = [
    { slug: 'uae-corporate-tax', name: 'UAE Corporate Tax Advisory & Filing' },
    { slug: 'uae-vat-compliance', name: 'UAE VAT Advisory & Return Filing' },
    { slug: 'excise-tax-advisory', name: 'Excise Tax Advisory & Compliance' },
    { slug: 'economic-substance-regulations', name: 'Economic Substance Regulations (ESR)' },
    { slug: 'audit-and-assurance', name: 'Audit & Assurance (Internal & External)' },
    { slug: 'accounting-and-bookkeeping', name: 'Accounting & Bookkeeping Services' },
    { slug: 'management-consultancy', name: 'Strategic Management Consultancy' },
    { slug: 'corporate-finance', name: 'Corporate Finance & Business Valuation' },
    { slug: 'smart-sourcing', name: 'Smart Sourcing & Virtual CFO Support' },
    { slug: 'company-setup-uae', name: 'UAE Company Formation & Licensing' },
    { slug: 'pro-services-uae', name: 'PRO Services & Corporate Relations' },
    { slug: 'erp-solutions', name: 'ERP Software Solutions & Implementation' },
  ];

  const timeSlots = [
    '09:30 AM - 10:30 AM',
    '11:00 AM - 12:00 PM',
    '02:00 PM - 03:00 PM',
    '03:30 PM - 04:30 PM',
    '05:00 PM - 06:00 PM',
  ];

  const handleServiceSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value;
    const match = services.find((s) => s.slug === slug);
    setFormData({
      ...formData,
      serviceSlug: slug,
      serviceName: match ? match.name : '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.preferredDate) {
      setStatus('error');
      setMessage('Please select a preferred consultation date.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await submitConsultation(formData);
      setStatus('success');
      setMessage(res.message || 'Consultation appointment successfully requested!');
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Failed to request consultation. Please try again.');
    }
  };

  // Get tomorrow's date for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-3xl shadow-xl border border-slate-200/90 p-6 sm:p-9 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-gold-100/40 via-crimson-100/20 to-transparent rounded-bl-full pointer-events-none" />

      <div className="border-b border-slate-200 pb-5 mb-6 relative z-10">
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-gold-50 border border-gold-200 text-gold-700 text-[10px] font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3 h-3 text-gold-600" />
          <span>Reserved Strategy Session</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-display font-bold text-navy-950 mt-1">
          Schedule an Advisory Consultation
        </h3>
        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
          Speak with our Senior Partners and Certified Tax Agents. Virtual video conference or in-person at our Deira Dubai office.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success-box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-emerald-50/80 via-white to-gold-50/40 border border-emerald-200 text-center space-y-4"
          >
            <div className="w-20 h-20 mx-auto">
              <LottiePlayer
                animationPath="/animations/success-check.json"
                fallback={<CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />}
              />
            </div>
            <h4 className="text-2xl font-display font-bold text-navy-950">
              Consultation Request Confirmed
            </h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              {message} Our partner scheduling desk will confirm the official calendar invitation and meeting link shortly.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="px-6 py-2.5 rounded-xl bg-navy-950 text-white text-xs font-semibold hover:bg-navy-900 transition-colors shadow-sm"
              >
                Book Another Appointment
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Meeting Format Toggle */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Preferred Meeting Format *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, meetingType: 'VIRTUAL' })}
                  className={`flex items-center justify-center p-3.5 rounded-xl border text-xs font-semibold transition-all ${
                    formData.meetingType === 'VIRTUAL'
                      ? 'border-navy-950 bg-navy-950 text-white shadow-md ring-2 ring-gold-400/30'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Video className="w-4 h-4 mr-2 text-gold-400" />
                  <span>Virtual Video Call (Teams / Zoom)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, meetingType: 'IN_PERSON' })}
                  className={`flex items-center justify-center p-3.5 rounded-xl border text-xs font-semibold transition-all ${
                    formData.meetingType === 'IN_PERSON'
                      ? 'border-navy-950 bg-navy-950 text-white shadow-md ring-2 ring-gold-400/30'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Building2 className="w-4 h-4 mr-2 text-gold-400" />
                  <span>In-Person (Deira Dubai Office)</span>
                </button>
              </div>
            </div>

            {/* Practice Area Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Select Advisory Practice Area *
              </label>
              <select
                value={formData.serviceSlug}
                onChange={handleServiceSelect}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 bg-white shadow-sm"
              >
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-gold-600" />
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  min={minDateStr}
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-gold-600" />
                  Preferred Time Slot (GST / UAE) *
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 bg-white shadow-sm"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sameer Al-Ghamdi"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@enterprise.ae"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Direct Contact / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+971 50 123 4567"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Company / Legal Entity
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Company Trading Name"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Discussion Topics & Objectives (Optional)
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="e.g. Free Zone QFZP qualification review, statutory audit for bank facility, or VAT assessment support..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 resize-none shadow-sm"
              />
            </div>

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center text-xs text-crimson-700 bg-crimson-50 p-3.5 rounded-xl border border-crimson-200"
              >
                <AlertCircle className="w-4 h-4 mr-2 shrink-0 text-crimson-600" />
                <span>{message}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-navy-950 via-navy-900 to-crimson-900 text-white font-semibold text-xs uppercase tracking-wider hover:from-navy-900 hover:to-crimson-800 transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 group btn-shimmer"
            >
              <span>{status === 'loading' ? 'Securing Slot...' : 'Confirm Consultation Booking'}</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
