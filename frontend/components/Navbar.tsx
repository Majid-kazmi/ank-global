'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Menu,
  X,
  Calendar,
  Calculator,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnkLogo } from '@/components/brand/AnkLogo';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isCurrent = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 select-none">
      {/* Top Utility Bar (Solid Obsidian) */}
      <div className="bg-[#090A0C] text-slate-300 text-xs py-2 px-4 border-b border-[#1A1B22] hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a
              href="tel:+971552138281"
              className="flex items-center space-x-1.5 hover:text-gold-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-crimson-500" />
              <span>+971 55 213 8281</span>
            </a>
            <a
              href="mailto:info@ankglobal.co"
              className="flex items-center space-x-1.5 hover:text-gold-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-gold-400" />
              <span>info@ankglobal.co</span>
            </a>
            <div className="flex items-center space-x-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-crimson-500" />
              <span>Office 402, Sheikh Saud Al Qasimi Bldg, Deira, Dubai</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-950 text-emerald-300 border border-emerald-700/60 shadow-sm">
              <ShieldCheck className="w-3 h-3 mr-1 text-emerald-400" />
              FTA Registered Tax Agency
            </span>
            <Link
              href="/tools"
              className="flex items-center space-x-1 text-gold-300 hover:text-gold-200 transition-colors"
            >
              <Calculator className="w-3 h-3 text-gold-400" />
              <span>Tax Calculators</span>
            </Link>
            <Link
              href="/admin/login"
              className="text-slate-400 hover:text-white transition-colors text-[11px] border-l border-[#262833] pl-3"
            >
              Portal Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (100% Solid Opaque Background - Zero Transparency) */}
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-[#090A0C] shadow-2xl border-b border-[#20222B] py-1'
            : 'bg-[#090A0C] text-white border-b border-[#1A1B22] py-2'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Brand Identity - Official Vector Logo (Compact & Sleek) */}
            <Link href="/" className="flex items-center shrink-0 py-1 mr-4 lg:mr-8 group">
              <div className="transition-transform duration-300 group-hover:scale-[1.02]">
                <AnkLogo variant="dark" className="h-7 sm:h-8 lg:h-9 w-auto max-w-[150px] sm:max-w-[180px]" priority />
              </div>
            </Link>

            {/* Desktop Menu Links */}
            <div className="hidden lg:flex items-center space-x-7">
              <Link
                href="/"
                className={`relative text-sm font-medium transition-colors hover:text-gold-400 py-1 ${
                  isCurrent('/') ? 'text-gold-400 font-semibold' : 'text-slate-200'
                }`}
              >
                Home
                {isCurrent('/') && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-crimson-500 to-gold-400 rounded-full"
                  />
                )}
              </Link>

              <Link
                href="/about"
                className={`relative text-sm font-medium transition-colors hover:text-gold-400 py-1 ${
                  isCurrent('/about') ? 'text-gold-400 font-semibold' : 'text-slate-200'
                }`}
              >
                About Us
                {isCurrent('/about') && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-crimson-500 to-gold-400 rounded-full"
                  />
                )}
              </Link>

              {/* Services Mega Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdown(true)}
                onMouseLeave={() => setServicesDropdown(false)}
              >
                <Link
                  href="/services"
                  className={`flex items-center text-sm font-medium transition-colors hover:text-gold-400 py-1 ${
                    pathname.startsWith('/services') ? 'text-gold-400 font-semibold' : 'text-slate-200'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                      servicesDropdown ? 'rotate-180 text-gold-400' : ''
                    }`}
                  />
                </Link>

                {/* 100% Solid Opaque Dropdown Menu (No Transparency, Pure Executive Obsidian) */}
                <AnimatePresence>
                  {servicesDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.99 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.99 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[760px] bg-[#0E0F14] border border-[#262834] rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.06)] p-6 mt-2 z-50 overflow-hidden"
                    >
                      {/* Top Brand Accent Stripe */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-crimson-600 via-gold-400 to-crimson-600" />

                      <div className="grid grid-cols-2 gap-6 relative z-10">
                        {/* Column 1: Taxation & Regulatory */}
                        <div className="space-y-3.5 pr-2 border-r border-[#1C1E26]">
                          <div className="border-b border-[#1E202B] pb-2.5 flex items-center justify-between">
                            <span className="text-xs uppercase font-extrabold tracking-wider text-crimson-500">
                              Taxation & Regulatory
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-crimson-950/70 border border-crimson-800/60 text-crimson-300 font-medium">
                              FTA Registered
                            </span>
                          </div>
                          <ul className="space-y-1 text-xs text-slate-300">
                            <li>
                              <Link
                                href="/services/uae-corporate-tax"
                                className="group block p-2.5 rounded-xl bg-[#12131A] hover:bg-[#181923] border border-[#1E202B] hover:border-[#2C2E3C] transition-all"
                              >
                                <strong className="text-white group-hover:text-gold-300 transition-colors block text-xs font-semibold">
                                  UAE Corporate Tax (9%)
                                </strong>
                                <span className="text-[11px] text-slate-400 leading-snug block mt-0.5">
                                  Registration, QFZP 0% status & return filing
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/services/uae-vat-compliance"
                                className="group block p-2.5 rounded-xl bg-[#12131A] hover:bg-[#181923] border border-[#1E202B] hover:border-[#2C2E3C] transition-all"
                              >
                                <strong className="text-white group-hover:text-gold-300 transition-colors block text-xs font-semibold">
                                  UAE VAT Compliance
                                </strong>
                                <span className="text-[11px] text-slate-400 leading-snug block mt-0.5">
                                  FTA registration, return filing & health checks
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/services/excise-tax-advisory"
                                className="group block p-2.5 rounded-xl bg-[#12131A] hover:bg-[#181923] border border-[#1E202B] hover:border-[#2C2E3C] transition-all"
                              >
                                <strong className="text-white group-hover:text-gold-300 transition-colors block text-xs font-semibold">
                                  Excise Tax Advisory
                                </strong>
                                <span className="text-[11px] text-slate-400 leading-snug block mt-0.5">
                                  Designated zones & product registrations
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/services/economic-substance-regulations"
                                className="group block p-2.5 rounded-xl bg-[#12131A] hover:bg-[#181923] border border-[#1E202B] hover:border-[#2C2E3C] transition-all"
                              >
                                <strong className="text-white group-hover:text-gold-300 transition-colors block text-xs font-semibold">
                                  Economic Substance (ESR)
                                </strong>
                                <span className="text-[11px] text-slate-400 leading-snug block mt-0.5">
                                  Scoping, notification filings & reporting
                                </span>
                              </Link>
                            </li>
                          </ul>
                        </div>

                        {/* Column 2: Audit, Accounting & Setup */}
                        <div className="space-y-3.5 pl-2">
                          <div className="border-b border-[#1E202B] pb-2.5 flex items-center justify-between">
                            <span className="text-xs uppercase font-extrabold tracking-wider text-gold-400">
                              Audit, Accounting & Setup
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-950/70 border border-gold-800/60 text-gold-300 font-medium">
                              Ministry Approved
                            </span>
                          </div>
                          <ul className="space-y-1 text-xs text-slate-300">
                            <li>
                              <Link
                                href="/services/audit-and-assurance"
                                className="group block p-2.5 rounded-xl bg-[#12131A] hover:bg-[#181923] border border-[#1E202B] hover:border-[#2C2E3C] transition-all"
                              >
                                <strong className="text-white group-hover:text-gold-300 transition-colors block text-xs font-semibold">
                                  Audit & Assurance
                                </strong>
                                <span className="text-[11px] text-slate-400 leading-snug block mt-0.5">
                                  Statutory external audit & free zone renewals
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/services/accounting-and-bookkeeping"
                                className="group block p-2.5 rounded-xl bg-[#12131A] hover:bg-[#181923] border border-[#1E202B] hover:border-[#2C2E3C] transition-all"
                              >
                                <strong className="text-white group-hover:text-gold-300 transition-colors block text-xs font-semibold">
                                  Accounting & Bookkeeping
                                </strong>
                                <span className="text-[11px] text-slate-400 leading-snug block mt-0.5">
                                  Cloud ledger, backlog cleanup & MIS reporting
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/services/company-setup-uae"
                                className="group block p-2.5 rounded-xl bg-[#12131A] hover:bg-[#181923] border border-[#1E202B] hover:border-[#2C2E3C] transition-all"
                              >
                                <strong className="text-white group-hover:text-gold-300 transition-colors block text-xs font-semibold">
                                  Company Setup & Licensing
                                </strong>
                                <span className="text-[11px] text-slate-400 leading-snug block mt-0.5">
                                  Dubai Mainland (100% Foreign) & Free Zones
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/services/smart-sourcing"
                                className="group block p-2.5 rounded-xl bg-[#12131A] hover:bg-[#181923] border border-[#1E202B] hover:border-[#2C2E3C] transition-all"
                              >
                                <strong className="text-white group-hover:text-gold-300 transition-colors block text-xs font-semibold">
                                  Virtual CFO & Advisory
                                </strong>
                                <span className="text-[11px] text-slate-400 leading-snug block mt-0.5">
                                  Strategic finance, ERP systems & M&A
                                </span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Solid Bottom Action Bar */}
                      <div className="mt-5 -mx-6 -mb-6 px-6 py-3.5 bg-[#090A0D] border-t border-[#1E202B] flex items-center justify-between">
                        <Link
                          href="/services"
                          className="text-xs font-bold text-gold-400 hover:text-gold-300 flex items-center group transition-colors"
                        >
                          <span>Explore all 12 institutional practice areas</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                          href="/book-consultation"
                          className="text-[11px] font-semibold text-slate-300 hover:text-white flex items-center transition-colors"
                        >
                          <Calendar className="w-3.5 h-3.5 mr-1.5 text-crimson-400" />
                          <span>Direct Partner Access</span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/industries"
                className={`relative text-sm font-medium transition-colors hover:text-gold-400 py-1 ${
                  isCurrent('/industries') ? 'text-gold-400 font-semibold' : 'text-slate-200'
                }`}
              >
                Industries
              </Link>

              <Link
                href="/insights"
                className={`relative text-sm font-medium transition-colors hover:text-gold-400 py-1 ${
                  isCurrent('/insights') ? 'text-gold-400 font-semibold' : 'text-slate-200'
                }`}
              >
                Insights
              </Link>

              <Link
                href="/contact"
                className={`relative text-sm font-medium transition-colors hover:text-gold-400 py-1 ${
                  isCurrent('/contact') ? 'text-gold-400 font-semibold' : 'text-slate-200'
                }`}
              >
                Contact
              </Link>
            </div>

            {/* Action CTA Button */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                href="/book-consultation"
                className="btn-shimmer inline-flex items-center px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-crimson-600 via-crimson-500 to-crimson-600 text-white hover:from-crimson-500 hover:to-crimson-600 shadow-md shadow-crimson-900/30 transition-all hover:scale-[1.02] active:scale-[0.98] border border-crimson-400/30"
              >
                <Calendar className="w-3.5 h-3.5 mr-1.5 text-gold-300" />
                <span>Book Consultation</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <Link
                href="/book-consultation"
                className="px-3 py-1.5 rounded bg-crimson-600 text-white text-xs font-semibold hover:bg-crimson-500"
              >
                Book
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#1A1B24] focus:outline-none transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-gold-400" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Animated Drawer Menu (100% Solid Opaque Background) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="lg:hidden bg-[#0C0D12] border-t border-[#1E202B] px-5 pt-4 pb-8 space-y-4 shadow-2xl overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-2 pb-2">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-[#14151D] border border-[#1E202B] text-sm font-medium text-slate-200 hover:text-gold-300 hover:bg-[#1B1D28]"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-[#14151D] border border-[#1E202B] text-sm font-medium text-slate-200 hover:text-gold-300 hover:bg-[#1B1D28]"
                >
                  About Us
                </Link>
                <Link
                  href="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-[#14151D] border border-[#1E202B] text-sm font-medium text-slate-200 hover:text-gold-300 hover:bg-[#1B1D28]"
                >
                  All Services
                </Link>
                <Link
                  href="/industries"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-[#14151D] border border-[#1E202B] text-sm font-medium text-slate-200 hover:text-gold-300 hover:bg-[#1B1D28]"
                >
                  Industries
                </Link>
                <Link
                  href="/insights"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-[#14151D] border border-[#1E202B] text-sm font-medium text-slate-200 hover:text-gold-300 hover:bg-[#1B1D28]"
                >
                  Insights & News
                </Link>
                <Link
                  href="/tools"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-[#14151D] border border-[#1E202B] text-sm font-medium text-slate-200 hover:text-gold-300 hover:bg-[#1B1D28]"
                >
                  Tax Calculators
                </Link>
                <Link
                  href="/team"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-[#14151D] border border-[#1E202B] text-sm font-medium text-slate-200 hover:text-gold-300 hover:bg-[#1B1D28]"
                >
                  Leadership Team
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-[#14151D] border border-[#1E202B] text-sm font-medium text-slate-200 hover:text-gold-300 hover:bg-[#1B1D28]"
                >
                  Contact Us
                </Link>
              </div>

              <div className="pt-2">
                <Link
                  href="/book-consultation"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center py-3 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-500 text-white font-bold text-sm shadow-lg shadow-crimson-900/40"
                >
                  <Calendar className="w-4 h-4 mr-2 text-gold-300" />
                  Schedule Confidential Consultation
                </Link>
              </div>

              <div className="pt-4 border-t border-[#1E202B] space-y-1 text-xs text-slate-400">
                <p className="flex items-center text-slate-300">
                  <Phone className="w-3.5 h-3.5 mr-2 text-crimson-400" />
                  +971 55 213 8281
                </p>
                <p className="flex items-center text-slate-300">
                  <Mail className="w-3.5 h-3.5 mr-2 text-gold-400" />
                  info@ankglobal.co
                </p>
                <p className="text-[11px] text-slate-500 pt-1">
                  Office 402, Sheikh Saud Al Qasimi Bldg, Deira, Dubai
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
