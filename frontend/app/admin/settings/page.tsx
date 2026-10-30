'use client';

import React, { useEffect, useState } from 'react';
import { Save, CheckCircle2, ShieldCheck, Settings } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedMsg, setSavedMsg] = useState('');

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

  const fetchSettings = async () => {
    setLoading(true);
    const token = localStorage.getItem('ank_token');
    try {
      const res = await fetch(`${apiUrl}/settings/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSettings(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleUpdate = async (key: string, value: string) => {
    const token = localStorage.getItem('ank_token');
    try {
      const res = await fetch(`${apiUrl}/settings/${key}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ value }),
      });

      if (res.ok) {
        setSavedMsg(`Updated "${key}" successfully.`);
        setTimeout(() => setSavedMsg(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy-950">
            Global Website Configuration
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Dynamic site contacts, office addresses, WhatsApp routing, and operational variables.
          </p>
        </div>
      </div>

      {savedMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center">
          <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600" />
          <span>{savedMsg}</span>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        {loading ? (
          <div className="text-center py-8 text-xs text-slate-400">Loading settings...</div>
        ) : (
          <div className="space-y-6">
            {settings.map((item) => (
              <div key={item.key} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-navy-950 uppercase tracking-wide">
                    {item.key}
                  </label>
                  <span className="text-[11px] text-slate-400">{item.description}</span>
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    defaultValue={item.value}
                    onBlur={(e) => {
                      if (e.target.value !== item.value) {
                        handleUpdate(item.key, e.target.value);
                      }
                    }}
                    className="flex-1 p-2.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-navy-900"
                  />
                  <button
                    onClick={(e) => {
                      const input = (e.currentTarget.previousSibling as HTMLInputElement);
                      handleUpdate(item.key, input.value);
                    }}
                    className="px-4 py-2 bg-navy-900 text-white rounded-lg text-xs font-semibold hover:bg-navy-800 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
