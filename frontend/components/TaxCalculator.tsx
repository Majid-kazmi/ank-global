'use client';

import React, { useState } from 'react';
import { Calculator, ShieldCheck, ArrowRight, HelpCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function TaxCalculator() {
  const [activeTab, setActiveTab] = useState<'corporate' | 'vat'>('corporate');

  // Corporate Tax State
  const [annualRevenue, setAnnualRevenue] = useState<number>(2500000);
  const [netAccountingProfit, setNetAccountingProfit] = useState<number>(650000);
  const [isFreeZone, setIsFreeZone] = useState<boolean>(false);
  const [isQFZP, setIsQFZP] = useState<boolean>(false);
  const [applySmallBusinessRelief, setApplySmallBusinessRelief] = useState<boolean>(false);

  // VAT State
  const [vatAmountInput, setVatAmountInput] = useState<number>(10000);
  const [vatMode, setVatMode] = useState<'exclusive' | 'inclusive'>('exclusive');

  // Corporate Tax Calculations
  const qualifiesForSBR = annualRevenue <= 3000000;
  const isSbrActive = qualifiesForSBR && applySmallBusinessRelief;

  let taxableProfit = Math.max(0, netAccountingProfit);
  let corporateTaxPayable = 0;

  if (isFreeZone && isQFZP) {
    corporateTaxPayable = 0;
  } else if (isSbrActive) {
    corporateTaxPayable = 0;
  } else {
    if (taxableProfit > 375000) {
      corporateTaxPayable = (taxableProfit - 375000) * 0.09;
    } else {
      corporateTaxPayable = 0;
    }
  }

  const effectiveRate = taxableProfit > 0 ? (corporateTaxPayable / taxableProfit) * 100 : 0;

  // VAT Calculations
  let vatTax = 0;
  let vatTotal = 0;
  let vatNet = 0;

  if (vatMode === 'exclusive') {
    vatNet = vatAmountInput;
    vatTax = vatAmountInput * 0.05;
    vatTotal = vatNet + vatTax;
  } else {
    vatTotal = vatAmountInput;
    vatNet = vatAmountInput / 1.05;
    vatTax = vatTotal - vatNet;
  }

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden relative">
      {/* Top Brand Gradient Ribbon */}
      <div className="h-1.5 bg-gradient-to-r from-crimson-600 via-gold-400 to-navy-950" />

      {/* Header Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50/80 p-1.5 gap-1.5">
        <button
          onClick={() => setActiveTab('corporate')}
          className={`flex-1 py-3.5 px-4 text-xs sm:text-sm font-bold text-center rounded-xl transition-all flex items-center justify-center space-x-2 relative ${
            activeTab === 'corporate'
              ? 'bg-white text-navy-950 shadow-sm border border-slate-200/80'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
          }`}
        >
          <Calculator className={`w-4 h-4 ${activeTab === 'corporate' ? 'text-crimson-600' : 'text-slate-400'}`} />
          <span>UAE Corporate Tax (9%) Calculator</span>
        </button>
        <button
          onClick={() => setActiveTab('vat')}
          className={`flex-1 py-3.5 px-4 text-xs sm:text-sm font-bold text-center rounded-xl transition-all flex items-center justify-center space-x-2 relative ${
            activeTab === 'vat'
              ? 'bg-white text-navy-950 shadow-sm border border-slate-200/80'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
          }`}
        >
          <ShieldCheck className={`w-4 h-4 ${activeTab === 'vat' ? 'text-gold-500' : 'text-slate-400'}`} />
          <span>UAE VAT (5%) Calculator</span>
        </button>
      </div>

      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'corporate' ? (
            <motion.div
              key="corporate"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Input Controls */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Gross Annual Turnover / Revenue (AED)
                    </label>
                    <span className="text-xs font-bold text-navy-950 font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      AED {annualRevenue.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="20000000"
                    step="50000"
                    value={annualRevenue}
                    onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                    className="w-full accent-crimson-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>AED 100K</span>
                    <span className="text-crimson-600 font-semibold">AED 3M (SBR Threshold)</span>
                    <span>AED 20M+</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Net Accounting Profit / Taxable Base (AED)
                    </label>
                    <span className="text-xs font-bold text-navy-950 font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      AED {netAccountingProfit.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000000"
                    step="25000"
                    value={netAccountingProfit}
                    onChange={(e) => setNetAccountingProfit(Number(e.target.value))}
                    className="w-full accent-crimson-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>AED 0</span>
                    <span className="text-gold-600 font-semibold">AED 375K (0% Bracket)</span>
                    <span>AED 5M+</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="sbrToggle"
                        disabled={!qualifiesForSBR}
                        checked={isSbrActive}
                        onChange={(e) => setApplySmallBusinessRelief(e.target.checked)}
                        className="rounded text-crimson-600 focus:ring-crimson-500 w-4 h-4 cursor-pointer accent-crimson-600"
                      />
                      <label htmlFor="sbrToggle" className="text-xs font-medium text-slate-700 cursor-pointer">
                        Elect for Small Business Relief (SBR)
                      </label>
                    </div>
                    {qualifiesForSBR ? (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                        Eligible (Revenue ≤ AED 3M)
                      </span>
                    ) : (
                      <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                        Ineligible (&gt; AED 3M)
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-200">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="fzToggle"
                        checked={isFreeZone}
                        onChange={(e) => {
                          setIsFreeZone(e.target.checked);
                          if (!e.target.checked) setIsQFZP(false);
                        }}
                        className="rounded text-crimson-600 focus:ring-crimson-500 w-4 h-4 cursor-pointer accent-crimson-600"
                      />
                      <label htmlFor="fzToggle" className="text-xs font-medium text-slate-700 cursor-pointer">
                        Registered in a UAE Free Zone
                      </label>
                    </div>
                    {isFreeZone && (
                      <label className="flex items-center space-x-1.5 text-xs text-navy-900 font-medium">
                        <input
                          type="checkbox"
                          checked={isQFZP}
                          onChange={(e) => setIsQFZP(e.target.checked)}
                          className="rounded text-gold-600 focus:ring-gold-500 w-3.5 h-3.5 accent-gold-500"
                        />
                        <span>Qualifies as QFZP (0%)</span>
                      </label>
                    )}
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  * Note: Estimation based on Federal Decree-Law No. 47 of 2022. Actual taxable income requires audit adjustments for non-deductible items (50% entertainment), interest caps, and tax depreciation.
                </p>
              </div>

              {/* Computation Results */}
              <div className="lg:col-span-5 bg-gradient-to-b from-navy-950 to-navy-900 text-white rounded-2xl p-7 space-y-5 border border-navy-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-crimson-600/10 rounded-full blur-2xl pointer-events-none" />

                <div className="border-b border-navy-800 pb-4 relative z-10">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400">
                    Tax Calculation Breakdown
                  </span>
                  <h4 className="text-xl font-display font-bold text-white mt-1">
                    Estimated Tax Liability
                  </h4>
                </div>

                <div className="space-y-3 text-xs relative z-10">
                  <div className="flex justify-between text-slate-300">
                    <span>Net Accounting Profit:</span>
                    <span className="font-semibold text-white font-mono">AED {taxableProfit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>0% Statutory Bracket:</span>
                    <span className="text-emerald-400 font-medium">Up to AED 375,000 (0%)</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Taxable Base @ 9%:</span>
                    <span className="font-semibold text-white font-mono">
                      AED {Math.max(0, taxableProfit - 375000).toLocaleString()}
                    </span>
                  </div>
                  {isSbrActive && (
                    <div className="bg-emerald-950/80 border border-emerald-700/60 p-2.5 rounded-lg text-[11px] text-emerald-300">
                      ✓ Small Business Relief Applied: 0% Taxable Income.
                    </div>
                  )}
                  {isFreeZone && isQFZP && (
                    <div className="bg-gold-950/80 border border-gold-700/60 p-2.5 rounded-lg text-[11px] text-gold-300">
                      ✓ Qualifying Free Zone Person Benefit: 0% on Qualifying Income.
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-navy-800/80 relative z-10">
                  <span className="text-xs text-slate-400 block">Total Corporate Tax Payable:</span>
                  <div className="text-3xl font-bold font-display text-gold-400 mt-1 font-mono">
                    AED {corporateTaxPayable.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <span className="text-xs text-slate-400 mt-1 block">
                    Effective Tax Rate: {effectiveRate.toFixed(1)}%
                  </span>
                </div>

                <Link
                  href="/book-consultation?service=uae-corporate-tax"
                  className="btn-shimmer w-full py-3 px-4 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-700 text-white font-bold text-xs uppercase tracking-wider hover:from-crimson-500 hover:to-crimson-600 transition-all flex items-center justify-center space-x-1.5 shadow-lg shadow-crimson-900/40 relative z-10 border border-crimson-400/30"
                >
                  <span>Request Formal Tax Assessment</span>
                  <ArrowRight className="w-4 h-4 ml-1 text-gold-300" />
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="vat"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* VAT Inputs */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Calculation Mode
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setVatMode('exclusive')}
                      className={`py-3 px-4 rounded-xl text-xs font-bold border text-center transition-all ${
                        vatMode === 'exclusive'
                          ? 'border-crimson-600 bg-crimson-50 text-crimson-700 shadow-sm'
                          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      Add 5% VAT (Tax Exclusive)
                    </button>
                    <button
                      type="button"
                      onClick={() => setVatMode('inclusive')}
                      className={`py-3 px-4 rounded-xl text-xs font-bold border text-center transition-all ${
                        vatMode === 'inclusive'
                          ? 'border-crimson-600 bg-crimson-50 text-crimson-700 shadow-sm'
                          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      Extract 5% VAT (Tax Inclusive)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Amount in UAE Dirhams (AED)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={vatAmountInput}
                    onChange={(e) => setVatAmountInput(Number(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-lg font-bold text-navy-950 focus:outline-none focus:ring-2 focus:ring-crimson-500/20 focus:border-crimson-500 bg-slate-50/50"
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                  <p>
                    <strong className="text-navy-950">Standard Rate (5%):</strong> Mandatory on mainland commercial supplies, consulting, and services.
                  </p>
                  <p>
                    <strong className="text-navy-950">Zero-Rated (0%):</strong> Qualifying cross-border services, exports outside the GCC implementing states, and international freight.
                  </p>
                </div>
              </div>

              {/* VAT Output */}
              <div className="lg:col-span-5 bg-gradient-to-b from-navy-950 to-navy-900 text-white rounded-2xl p-7 space-y-5 border border-navy-800 shadow-xl relative overflow-hidden">
                <div className="border-b border-navy-800 pb-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400">
                    VAT Output Summary
                  </span>
                  <h4 className="text-xl font-display font-bold text-white mt-1">
                    5% Value Added Tax
                  </h4>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Net Amount (excl. VAT):</span>
                    <span className="font-semibold text-white font-mono">
                      AED {vatNet.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>VAT Component (5%):</span>
                    <span className="font-bold text-gold-400 font-mono">
                      AED {vatTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-300 border-t border-navy-800/80 pt-3">
                    <span>Total Amount (incl. VAT):</span>
                    <span className="text-2xl font-bold text-white font-mono">
                      AED {vatTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <Link
                  href="/services/uae-vat-compliance"
                  className="btn-shimmer w-full py-3 px-4 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-700 text-white font-bold text-xs uppercase tracking-wider hover:from-crimson-500 hover:to-crimson-600 transition-all flex items-center justify-center space-x-1.5 shadow-lg shadow-crimson-900/40 border border-crimson-400/30"
                >
                  <span>Book VAT Health Check</span>
                  <ArrowRight className="w-4 h-4 ml-1 text-gold-300" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
