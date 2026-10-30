'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitInquiry } from '@/lib/api';
import LottiePlayer from '@/components/animations/LottiePlayer';

interface InquiryFormProps {
  initialServiceSlug?: string;
  initialServiceName?: string;
}

export default function InquiryForm({ initialServiceSlug, initialServiceName }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceSlug: initialServiceSlug || 'uae-corporate-tax',
    serviceName: initialServiceName || 'UAE Corporate Tax Advisory & Filing',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const servicesList = [
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

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSlug = e.target.value;
    const item = servicesList.find((s) => s.slug === selectedSlug);
    setFormData({
      ...formData,
      serviceSlug: selectedSlug,
      serviceName: item ? item.name : '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setResponseMsg('');

    try {
      const res = await submitInquiry(formData);
      setStatus('success');
      setResponseMsg(res.message || 'Thank you! Your inquiry has been dispatched to our advisory team.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        serviceSlug: initialServiceSlug || 'uae-corporate-tax',
        serviceName: initialServiceName || 'UAE Corporate Tax Advisory & Filing',
        message: '',
      });
    } catch (err: any) {
      setStatus('error');
      setResponseMsg(err.message || 'An error occurred while submitting your inquiry. Please try again.');
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/90 p-7 sm:p-8 relative overflow-hidden">
      {/* Decorative top accent line with brand gradient */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-crimson-600 via-gold-400 to-navy-900" />

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider font-bold text-crimson-600 bg-crimson-50 px-2.5 py-0.5 rounded-full border border-crimson-100">
            Fast Track SLA
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Response within 2h</span>
        </div>
        <h3 className="text-xl font-display font-bold text-navy-950 mt-2">
          Request a Confidential Proposal
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Direct consultation with our Dubai Chartered Accountants. No automated call centers.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-8 rounded-xl bg-gradient-to-b from-emerald-50 to-white border border-emerald-200 text-center space-y-4"
          >
            <div className="w-24 h-24 mx-auto">
              <LottiePlayer src="/animations/success-check.json" className="w-24 h-24" />
            </div>
            <h4 className="font-display font-bold text-lg text-emerald-950">Inquiry Transmitted Successfully</h4>
            <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">{responseMsg}</p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-3 inline-flex items-center text-xs font-semibold text-crimson-700 hover:text-crimson-800 underline underline-offset-4"
            >
              Submit Another Inquiry
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Tariq Al Mansoori"
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-crimson-500 focus:ring-2 focus:ring-crimson-500/10 transition-all bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="tariq@enterprise.ae"
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-crimson-500 focus:ring-2 focus:ring-crimson-500/10 transition-all bg-slate-50/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+971 50 000 0000"
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-crimson-500 focus:ring-2 focus:ring-crimson-500/10 transition-all bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Gulf Trading FZCO"
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-crimson-500 focus:ring-2 focus:ring-crimson-500/10 transition-all bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Required Practice Area *
              </label>
              <select
                value={formData.serviceSlug}
                onChange={handleServiceChange}
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-crimson-500 focus:ring-2 focus:ring-crimson-500/10 transition-all bg-slate-50/50 text-slate-800"
              >
                {servicesList.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Project Specifics or Current Tax Status
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Briefly state your requirements (e.g. Free zone 0% eligibility assessment, audit submission deadline, VAT refund)..."
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-crimson-500 focus:ring-2 focus:ring-crimson-500/10 transition-all bg-slate-50/50"
              />
            </div>

            {status === 'error' && (
              <div className="flex items-center text-xs text-crimson-700 bg-crimson-50 p-3 rounded-lg border border-crimson-200">
                <AlertCircle className="w-4 h-4 mr-2 shrink-0 text-crimson-600" />
                <span>{responseMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-shimmer w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-700 text-white font-bold text-xs uppercase tracking-wider hover:from-crimson-500 hover:to-crimson-600 shadow-md shadow-crimson-900/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
            >
              <Send className="w-3.5 h-3.5 mr-2 text-gold-300" />
              <span>{status === 'loading' ? 'Transmitting Request...' : 'Submit Advisory Request'}</span>
            </button>
            <p className="text-[10px] text-center text-slate-400">
              NDAs respected. All client disclosures remain strictly privileged under UAE federal law.
            </p>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
