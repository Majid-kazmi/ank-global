'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [tooltipVisible, setTooltipVisible] = useState(true);
  const phoneNumber = '971552138281';
  const defaultMessage = encodeURIComponent(
    'Hello ANK Global, I would like to inquire about your Corporate Tax / Audit / Accounting services in Dubai.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end space-x-3">
      {tooltipVisible && (
        <div className="hidden sm:flex items-center bg-white text-navy-950 text-xs px-3.5 py-2 rounded-xl shadow-xl border border-slate-200 animate-in fade-in slide-in-from-right-4 duration-300">
          <div>
            <p className="font-semibold text-navy-900">Have a question?</p>
            <p className="text-[11px] text-slate-500">Chat directly with an ANK Global advisor</p>
          </div>
          <button
            onClick={() => setTooltipVisible(false)}
            className="ml-3 text-slate-400 hover:text-slate-600 p-0.5"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <a
        href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-500 hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Contact ANK Global via WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}
