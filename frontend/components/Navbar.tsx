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
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
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

      {/* Main Navigation Bar (100% Solid Opaque Background) */}
      <nav
        className={`relative transition-all duration-300 ${
          scrolled
            ? 'bg-[#090A0C] shadow-2xl border-b border-[#20222B] py-1'
            : 'bg-[#090A0C] text-white border-b border-[#1A1B22] py-2'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Brand Identity - Official Vector Logo (Compact & Sleek) */}
            <Link
              href="/"
              onMouseEnter={() => setServicesDropdown(false)}
              className="flex items-center shrink-0 py-1 mr-4 lg:mr-8 group"
            >
              <div className="transition-transform duration-300 group-hover:scale-[1.02]">
                <AnkLogo variant="dark" className="h-7 sm:h-8 lg:h-9 w-auto max-w-[150px] sm:max-w-[180px]" priority />
              </div>
            </Link>

            {/* Desktop Menu Links */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-7">
              <Link
                href="/"
                onMouseEnter={() => setServicesDropdown(false)}
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
                onMouseEnter={() => setServicesDropdown(false)}
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

              {/* Services Mega Dropdown with Structured Sub-menus (Centered to Screen/Navbar, No Overflow) */}
              <div
                className="flex items-center h-full"
                onMouseEnter={() => setServicesDropdown(true)}
                onMouseLeave={() => setServicesDropdown(false)}
              >
                <Link
                  href="/services"
                  className={`relative flex items-center text-sm font-medium transition-colors hover:text-gold-400 py-1 ${
                    pathname.startsWith('/services') ? 'text-gold-400 font-semibold' : 'text-slate-200'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                      servicesDropdown ? 'rotate-180 text-gold-400' : ''
                    }`}
                  />
                  {pathname.startsWith('/services') && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-crimson-500 to-gold-400 rounded-full"
                    />
                  )}
                </Link>

                {/* 100% Solid Opaque Dropdown with 4 Clean Sub-menu Columns (Centered to Screen/Navbar) */}
                <AnimatePresence>
                  {servicesDropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] xl:w-[840px] max-w-[calc(100vw-32px)] z-50 mt-1 pointer-events-auto">
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.99 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.99 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="w-full bg-[#0D0E13] border border-[#262834] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.06)] p-5 overflow-hidden before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
                      >
                        {/* Top Brand Accent Stripe */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-crimson-600 via-gold-400 to-crimson-600" />

                      <div className="grid grid-cols-4 gap-4 xl:gap-5 relative z-10 pt-1">
                        {/* Sub-menu 1: Tax Services */}
                        <div className="space-y-2.5">
                          <div className="border-b border-[#20222D] pb-2 flex items-center justify-between">
                            <span className="text-[11px] uppercase font-extrabold tracking-wider text-crimson-500">
                              Tax Services
                            </span>
                          </div>
                          <ul className="space-y-1 text-xs">
                            <li>
                              <Link
                                href="/services/uae-corporate-tax"
                                onClick={() => setServicesDropdown(false)}
                                className="text-slate-300 hover:text-gold-400 py-1 px-2 rounded-md hover:bg-[#161722] transition-colors block font-medium truncate"
                                title="UAE Corporate Tax (9%)"
                              >
                                Corporate Tax (9%)
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/services/uae-vat-compliance"
                                onClick={() => setServicesDropdown(false)}
                                className="text-slate-300 hover:text-gold-400 py-1 px-2 rounded-md hover:bg-[#161722] transition-colors block font-medium truncate"
                                title="UAE VAT Compliance"
                              >
                                UAE VAT Compliance
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/services/excise-tax-advisory"
                                onClick={() => setServicesDropdown(false)}
                                className="text-slate-300 hover:text-gold-400 py-1 px-2 rounded-md hover:bg-[#161722] transition-colors block font-medium truncate"
                                title="Excise Tax Advisory"
                              >
                                Excise Tax Advisory
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/services/economic-substance-regulations"
                                onClick={() => setServicesDropdown(false)}
                                className="text-slate-300 hover:text-gold-400 py-1 px-2 rounded-md hover:bg-[#161722] transition-colors block font-medium truncate"
                                title="Economic Substance Regulations (ESR)"
                              >
                                Economic Substance
                              </Link>
                            </li>
                          </ul>
                        </div>

                        {/* Sub-menu 2: Financial & Audit */}
                        <div className="space-y-2.5">
                          <div className="border-b border-[#20222D] pb-2 flex items-center justify-between">
                            <span className="text-[11px] uppercase font-extrabold tracking-wider text-gold-400">
                              Financial & Audit
                            </span>
                          </div>
                          <ul className="space-y-1 text-xs">
                            <li>
                              <Link
                                href="/services/audit-and-assurance"
                                onClick={() => setServicesDropdown(false)}
                                className="text-slate-300 hover:text-gold-400 py-1 px-2 rounded-md hover:bg-[#161722] transition-colors block font-medium truncate"
                                title="Statutory Audit & Related Services"
                              >
                                Audit & Assurance
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/services/accounting-and-bookkeeping"
                                onClick={() => setServicesDropdown(false)}
                                className="text-slate-300 hover:text-gold-400 py-1 px-2 rounded-md hover:bg-[#161722] transition-colors block font-medium truncate"
                                title="Accounting & Bookkeeping"
                              >
                                Accounting & Books
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/services/corporate-finance"
                                onClick={() => setServicesDropdown(false)}
                                className="text-slate-300 hover:text-gold-400 py-1 px-2 rounded-md hover:bg-[#161722] transition-colors block font-medium truncate"
                                title="Corporate Finance & Valuation"
                              >
                                Corporate Finance
                              </Link>
                            </li>
                          </ul>
                        </div>

                        {/* Sub-menu 3: Advisory & Consulting */}
                        <div className="space-y-2.5">
                          <div className="border-b border-[#20222D] pb-2 flex items-center justify-between">
                            <span className="text-[11px] uppercase font-extrabold tracking-wider text-slate-200">
                              Advisory
                            </span>
                          </div>
                          <ul className="space-y-1 text-xs">
                            <li>
                              <Link
                                href="/services/management-consultancy"
                                onClick={() => setServicesDropdown(false)}
                                className="text-slate-300 hover:text-gold-400 py-1 px-2 rounded-md hover:bg-[#161722] transition-colors block font-medium truncate"
                                title="Management Consultancy"
                              >
                                Management Advisory
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/services/smart-sourcing"
                                onClick={() => setServicesDropdown(false)}
                                className="text-slate-300 hover:text-gold-400 py-1 px-2 rounded-md hover:bg-[#161722] transition-colors block font-medium truncate"
                                title="Smart Sourcing & Virtual CFO"
                              >
                                Virtual CFO Sourcing
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/services/professional-development"
                                onClick={() => setServicesDropdown(false)}
                                className="text-slate-300 hover:text-gold-400 py-1 px-2 rounded-md hover:bg-[#161722] transition-colors block font-medium truncate"
                                title="Professional Developments & Training"
                              >
                                Professional Training
                              </Link>
                            </li>
                          </ul>
                        </div>

                        {/* Sub-menu 4: Business Setup & Tech */}
                        <div className="space-y-2.5">
                          <div className="border-b border-[#20222D] pb-2 flex items-center justify-between">
                            <span className="text-[11px] uppercase font-extrabold tracking-wider text-gold-400">
                              Setup & Tech
                            </span>
                          </div>
                          <ul className="space-y-1 text-xs">
                            <li>
                              <Link
                                href="/services/company-setup-uae"
                                onClick={() => setServicesDropdown(false)}
                                className="text-slate-300 hover:text-gold-400 py-1 px-2 rounded-md hover:bg-[#161722] transition-colors block font-medium truncate"
                                title="Company Setup in UAE (Mainland & Free Zones)"
                              >
                                Company Setup UAE
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/services/corporate-bank-account-opening"
                                onClick={() => setServicesDropdown(false)}
                                className="text-slate-300 hover:text-gold-400 py-1 px-2 rounded-md hover:bg-[#161722] transition-colors block font-medium truncate"
                                title="Corporate Bank Account Opening"
                              >
                                Bank Account Opening
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/services/pro-services-uae"
                                onClick={() => setServicesDropdown(false)}
                                className="text-slate-300 hover:text-gold-400 py-1 px-2 rounded-md hover:bg-[#161722] transition-colors block font-medium truncate"
                                title="PRO Services & Government Relations"
                              >
                                PRO Services in UAE
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/services/erp-solutions"
                                onClick={() => setServicesDropdown(false)}
                                className="text-slate-300 hover:text-gold-400 py-1 px-2 rounded-md hover:bg-[#161722] transition-colors block font-medium truncate"
                                title="ERP Software Solutions (Zoho & Odoo)"
                              >
                                ERP Software Setup
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Solid Bottom Action Bar */}
                      <div className="mt-4 -mx-5 -mb-5 px-5 py-3 bg-[#090A0D] border-t border-[#1C1E26] rounded-b-2xl flex items-center justify-between text-xs">
                        <Link
                          href="/services"
                          onClick={() => setServicesDropdown(false)}
                          className="font-bold text-gold-400 hover:text-gold-300 flex items-center group transition-colors"
                        >
                          <span>Explore all 14 practice areas</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                          href="/book-consultation"
                          onClick={() => setServicesDropdown(false)}
                          className="font-medium text-slate-300 hover:text-white flex items-center transition-colors"
                        >
                          <Calendar className="w-3.5 h-3.5 mr-1.5 text-crimson-400" />
                          <span>Schedule Advisory Session</span>
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>

              <Link
                href="/industries"
                onMouseEnter={() => setServicesDropdown(false)}
                className={`relative text-sm font-medium transition-colors hover:text-gold-400 py-1 ${
                  isCurrent('/industries') ? 'text-gold-400 font-semibold' : 'text-slate-200'
                }`}
              >
                Industries
              </Link>

              <Link
                href="/insights"
                onMouseEnter={() => setServicesDropdown(false)}
                className={`relative text-sm font-medium transition-colors hover:text-gold-400 py-1 ${
                  isCurrent('/insights') ? 'text-gold-400 font-semibold' : 'text-slate-200'
                }`}
              >
                Insights
              </Link>

              <Link
                href="/contact"
                onMouseEnter={() => setServicesDropdown(false)}
                className={`relative text-sm font-medium transition-colors hover:text-gold-400 py-1 ${
                  isCurrent('/contact') ? 'text-gold-400 font-semibold' : 'text-slate-200'
                }`}
              >
                Contact
              </Link>
            </div>

            {/* Action CTA Button */}
            <div
              className="hidden lg:flex items-center space-x-3"
              onMouseEnter={() => setServicesDropdown(false)}
            >
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
              className="lg:hidden bg-[#0C0D12] border-t border-[#1E202B] px-4 pt-4 pb-8 space-y-4 shadow-2xl overflow-y-auto max-h-[85vh]"
            >
              <div className="grid grid-cols-2 gap-2 pb-2">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-[#14151D] border border-[#1E202B] text-xs font-medium text-slate-200 hover:text-gold-300"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-[#14151D] border border-[#1E202B] text-xs font-medium text-slate-200 hover:text-gold-300"
                >
                  About Us
                </Link>
                <Link
                  href="/industries"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-[#14151D] border border-[#1E202B] text-xs font-medium text-slate-200 hover:text-gold-300"
                >
                  Industries
                </Link>
                <Link
                  href="/insights"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-[#14151D] border border-[#1E202B] text-xs font-medium text-slate-200 hover:text-gold-300"
                >
                  Insights & News
                </Link>
                <Link
                  href="/tools"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-[#14151D] border border-[#1E202B] text-xs font-medium text-slate-200 hover:text-gold-300"
                >
                  Tax Calculators
                </Link>
                <Link
                  href="/team"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-[#14151D] border border-[#1E202B] text-xs font-medium text-slate-200 hover:text-gold-300"
                >
                  Leadership Team
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-[#14151D] border border-[#1E202B] text-xs font-medium text-slate-200 hover:text-gold-300 col-span-2 text-center"
                >
                  Contact Advisory Desk
                </Link>
              </div>

              {/* Mobile Services Accordion with Clean Sub-menus */}
              <div className="border border-[#1E202B] rounded-xl bg-[#111219] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between p-3 text-xs font-bold text-gold-400 bg-[#161722]"
                >
                  <span>Services & Sub-Menus (14 Practices)</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {mobileServicesOpen && (
                  <div className="p-3 space-y-3 divide-y divide-[#1E202B] text-xs">
                    {/* Tax */}
                    <div className="pt-2 first:pt-0 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-crimson-400 tracking-wider">Tax Services</span>
                      <div className="grid grid-cols-1 gap-1 pt-1">
                        <Link href="/services/uae-corporate-tax" onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded hover:bg-[#1A1B28] text-slate-300 block">UAE Corporate Tax (9%)</Link>
                        <Link href="/services/uae-vat-compliance" onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded hover:bg-[#1A1B28] text-slate-300 block">UAE VAT Compliance</Link>
                        <Link href="/services/excise-tax-advisory" onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded hover:bg-[#1A1B28] text-slate-300 block">Excise Tax Advisory</Link>
                        <Link href="/services/economic-substance-regulations" onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded hover:bg-[#1A1B28] text-slate-300 block">Economic Substance (ESR)</Link>
                      </div>
                    </div>

                    {/* Financial */}
                    <div className="pt-2 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-gold-400 tracking-wider">Financial & Audit</span>
                      <div className="grid grid-cols-1 gap-1 pt-1">
                        <Link href="/services/audit-and-assurance" onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded hover:bg-[#1A1B28] text-slate-300 block">Audit & Related Services</Link>
                        <Link href="/services/accounting-and-bookkeeping" onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded hover:bg-[#1A1B28] text-slate-300 block">Accounting & Bookkeeping</Link>
                        <Link href="/services/corporate-finance" onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded hover:bg-[#1A1B28] text-slate-300 block">Corporate Finance & Valuation</Link>
                      </div>
                    </div>

                    {/* Advisory */}
                    <div className="pt-2 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-slate-300 tracking-wider">Advisory & Consulting</span>
                      <div className="grid grid-cols-1 gap-1 pt-1">
                        <Link href="/services/management-consultancy" onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded hover:bg-[#1A1B28] text-slate-300 block">Management Consultancy</Link>
                        <Link href="/services/smart-sourcing" onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded hover:bg-[#1A1B28] text-slate-300 block">Smart Sourcing & Virtual CFO</Link>
                        <Link href="/services/professional-development" onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded hover:bg-[#1A1B28] text-slate-300 block">Professional Developments</Link>
                      </div>
                    </div>

                    {/* Setup & Tech */}
                    <div className="pt-2 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-gold-400 tracking-wider">Business Setup & Tech</span>
                      <div className="grid grid-cols-1 gap-1 pt-1">
                        <Link href="/services/company-setup-uae" onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded hover:bg-[#1A1B28] text-slate-300 block">Company Setup in UAE</Link>
                        <Link href="/services/corporate-bank-account-opening" onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded hover:bg-[#1A1B28] text-slate-300 block">Corporate Bank Account Opening</Link>
                        <Link href="/services/pro-services-uae" onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded hover:bg-[#1A1B28] text-slate-300 block">PRO Services in UAE</Link>
                        <Link href="/services/erp-solutions" onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded hover:bg-[#1A1B28] text-slate-300 block">ERP Software Solutions</Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <Link
                  href="/book-consultation"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center py-3 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-crimson-900/40"
                >
                  <Calendar className="w-4 h-4 mr-2 text-gold-300" />
                  Schedule Confidential Consultation
                </Link>
              </div>

              <div className="pt-3 border-t border-[#1E202B] space-y-1 text-xs text-slate-400">
                <p className="flex items-center text-slate-300">
                  <Phone className="w-3.5 h-3.5 mr-2 text-crimson-400" />
                  +971 55 213 8281
                </p>
                <p className="flex items-center text-slate-300">
                  <Mail className="w-3.5 h-3.5 mr-2 text-gold-400" />
                  info@ankglobal.co
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
