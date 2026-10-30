'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  AlertCircle,
  Building2,
  Award,
} from 'lucide-react';
import { AnkLogo } from '@/components/brand/AnkLogo';
import { subscribeNewsletter } from '@/lib/api';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await subscribeNewsletter(email);
      setStatus('success');
      setMessage(res.message || 'Subscribed successfully!');
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Subscription failed. Please try again.');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-crimson-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-gold-400/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Newsletter & Pre-Footer Banner */}
      <div className="border-b border-navy-800/80 bg-gradient-to-r from-navy-900/90 via-navy-950/90 to-navy-900/90 py-14 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center px-2.5 py-1 rounded text-xs uppercase font-bold tracking-widest text-gold-400 bg-gold-400/10 border border-gold-400/20 mb-2">
              <Award className="w-3.5 h-3.5 mr-1.5" />
              UAE Regulatory Intelligence
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
              Stay Ahead of UAE Corporate Tax & VAT Amendments
            </h3>
            <p className="text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
              Receive authoritative Cabinet Decisions, FTA Public Clarifications, and strategic executive financial briefings curated by our Chartered Accountants.
            </p>
          </div>
          <div className="lg:col-span-5">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter corporate email address..."
                className="flex-1 bg-navy-900/90 border border-navy-700/80 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-shimmer inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-crimson-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-crimson-500 transition-all shadow-md shadow-crimson-900/40 disabled:opacity-50"
              >
                <span>{status === 'loading' ? 'Subscribing...' : 'Subscribe'}</span>
                <ArrowRight className="w-4 h-4 ml-1.5 text-gold-300" />
              </button>
            </form>
            {status === 'success' && (
              <p className="flex items-center text-xs text-emerald-400 mt-2.5">
                <CheckCircle2 className="w-4 h-4 mr-1.5" />
                {message}
              </p>
            )}
            {status === 'error' && (
              <p className="flex items-center text-xs text-crimson-400 mt-2.5">
                <AlertCircle className="w-4 h-4 mr-1.5" />
                {message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Company Profile with Authentic SVG Logo */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <AnkLogo variant="dark" className="h-9 sm:h-10 w-auto max-w-[200px]" priority />
            </Link>

            <p className="text-xs text-slate-300 leading-relaxed pr-6 mt-2">
              ANK Global is a premier management consultancy, statutory audit, and tax advisory firm based in Dubai, UAE. We empower enterprises from dynamic family businesses to multinational corporations with audit transparency, strategic Corporate Tax (9%) optimization, and sustainable capital growth.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-[11px] font-medium bg-navy-900 text-slate-200 border border-navy-700/80">
                <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-crimson-400" />
                FTA Registered Tax Agency
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-[11px] font-medium bg-navy-900 text-slate-200 border border-navy-700/80">
                <Building2 className="w-3.5 h-3.5 mr-1.5 text-gold-400" />
                Ministry Approved Auditors
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-[11px] font-medium bg-navy-900 text-slate-200 border border-navy-700/80">
                Free Zone Recognized
              </span>
            </div>
          </div>

          {/* Column 2: Tax & Audit Practice */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-crimson-400">
              Tax & Assurance
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/services/uae-corporate-tax" className="hover:text-gold-300 transition-colors">
                  UAE Corporate Tax (9%)
                </Link>
              </li>
              <li>
                <Link href="/services/uae-vat-compliance" className="hover:text-gold-300 transition-colors">
                  UAE VAT Filing & Health Checks
                </Link>
              </li>
              <li>
                <Link href="/services/excise-tax-advisory" className="hover:text-gold-300 transition-colors">
                  Excise Tax & Designated Zones
                </Link>
              </li>
              <li>
                <Link href="/services/economic-substance-regulations" className="hover:text-gold-300 transition-colors">
                  Economic Substance (ESR)
                </Link>
              </li>
              <li>
                <Link href="/services/audit-and-assurance" className="hover:text-gold-300 transition-colors">
                  Statutory External Audit
                </Link>
              </li>
              <li>
                <Link href="/services/audit-and-assurance" className="hover:text-gold-300 transition-colors">
                  Internal Controls & Risk
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Accounting & Advisory */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-gold-400">
              Accounting & Setup
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/services/accounting-and-bookkeeping" className="hover:text-gold-300 transition-colors">
                  Accounting & Bookkeeping
                </Link>
              </li>
              <li>
                <Link href="/services/company-setup-uae" className="hover:text-gold-300 transition-colors">
                  Mainland & Free Zone Setup
                </Link>
              </li>
              <li>
                <Link href="/services/pro-services-uae" className="hover:text-gold-300 transition-colors">
                  PRO Services & Visa Processing
                </Link>
              </li>
              <li>
                <Link href="/services/corporate-finance" className="hover:text-gold-300 transition-colors">
                  M&A & Business Valuation
                </Link>
              </li>
              <li>
                <Link href="/services/smart-sourcing" className="hover:text-gold-300 transition-colors">
                  Virtual CFO & Smart Sourcing
                </Link>
              </li>
              <li>
                <Link href="/services/erp-solutions" className="hover:text-gold-300 transition-colors">
                  ERP Systems (Zoho / Odoo)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Dubai Head Office & Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-200">
              Dubai Head Office
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-crimson-400 shrink-0 mt-0.5" />
                <span>
                  Office No. 402, Sheikh Saud Al Qasimi Bldg, Opp. Al Reef Mall, 159 Salah Al Din St, Deira, Dubai, UAE
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a href="tel:+971552138281" className="hover:text-gold-300 transition-colors">
                  +971 55 213 8281
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href="mailto:info@ankglobal.co" className="hover:text-gold-300 transition-colors">
                  info@ankglobal.co
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                P.O. Box 37212, Dubai, United Arab Emirates
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-12 mt-12 border-t border-navy-800/80 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 space-y-4 md:space-y-0">
          <p>
            © {new Date().getFullYear()} ANK Global Chartered Accountants and Advisors. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-xs">
            <Link href="/about" className="hover:text-gold-300 transition-colors">
              About ANK Global
            </Link>
            <Link href="/team" className="hover:text-gold-300 transition-colors">
              Leadership
            </Link>
            <Link href="/resources" className="hover:text-gold-300 transition-colors">
              Company Profile
            </Link>
            <Link href="/contact" className="hover:text-gold-300 transition-colors">
              Location Map
            </Link>
            <Link href="/admin/login" className="hover:text-gold-300 transition-colors">
              Admin Portal
            </Link>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-navy-900 hover:bg-navy-800 text-slate-300 hover:text-white transition-colors flex items-center justify-center border border-navy-800"
              aria-label="Scroll to top of page"
            >
              <ArrowUp className="w-4 h-4 text-gold-400" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
