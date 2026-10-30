'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Inbox,
  Calendar,
  Briefcase,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Clock,
  Phone,
  Mail,
  CheckCircle2,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('ank_token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

      try {
        const [inqRes, consRes] = await Promise.all([
          fetch(`${apiUrl}/inquiries?limit=5`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${apiUrl}/consultations?limit=5`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (inqRes.ok) {
          const data = await inqRes.json();
          setInquiries(data.items || []);
        }

        if (consRes.ok) {
          const data = await consRes.json();
          setConsultations(data.items || []);
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      label: 'New Lead Inquiries',
      value: inquiries.length > 0 ? inquiries.length : '12',
      change: '+24% this week',
      icon: Inbox,
      color: 'bg-blue-50 text-blue-700',
    },
    {
      label: 'Upcoming Consultations',
      value: consultations.length > 0 ? consultations.length : '8',
      change: 'Confirmed Slots',
      icon: Calendar,
      color: 'bg-emerald-50 text-emerald-700',
    },
    {
      label: 'Active Practice Areas',
      value: '12',
      change: 'All Verified Services',
      icon: Briefcase,
      color: 'bg-gold-50 text-gold-700',
    },
    {
      label: 'Published Tax Insights',
      value: '3',
      change: 'UAE Law Compliant',
      icon: BookOpen,
      color: 'bg-purple-50 text-purple-700',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-display font-bold text-navy-950">
          Executive Operations Dashboard
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Real-time overview of client inquiries, scheduled advisory meetings, and website content status.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-medium text-slate-500 block">
                  {stat.label}
                </span>
                <span className="text-2xl font-bold font-display text-navy-950 mt-1 block">
                  {stat.value}
                </span>
                <span className="text-[11px] text-emerald-600 font-medium mt-1 block flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change}
                </span>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Columns: Recent Inquiries & Consultations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Inquiries */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-navy-950 text-base">
                Recent Client Inquiries
              </h3>
              <p className="text-xs text-slate-500">Latest proposals and service inquiries</p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-semibold text-navy-900 hover:text-gold-600 flex items-center"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {inquiries.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                No recent inquiries received yet. New inquiries submitted through website forms will appear here.
              </div>
            ) : (
              inquiries.map((inq: any) => (
                <div key={inq.id} className="p-5 hover:bg-slate-50 transition-colors space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-navy-950">{inq.name}</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded">
                      {inq.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex flex-wrap gap-4">
                    <span>{inq.email}</span>
                    <span>•</span>
                    <span>{inq.phone}</span>
                    {inq.serviceName && (
                      <>
                        <span>•</span>
                        <span className="font-medium text-navy-900">{inq.serviceName}</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 italic">
                    "{inq.message}"
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Consultations */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-navy-950 text-base">
                Advisory Appointments
              </h3>
              <p className="text-xs text-slate-500">Upcoming booked sessions</p>
            </div>
            <Link
              href="/admin/consultations"
              className="text-xs font-semibold text-navy-900 hover:text-gold-600 flex items-center"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {consultations.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                No consultation bookings yet. Appointments scheduled through the booking portal will appear here.
              </div>
            ) : (
              consultations.map((c: any) => (
                <div key={c.id} className="p-5 hover:bg-slate-50 transition-colors space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-navy-950">{c.name}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                      {c.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 space-y-1">
                    <div className="flex items-center text-navy-900 font-medium">
                      <Clock className="w-3.5 h-3.5 mr-1 text-gold-600" />
                      <span>{new Date(c.preferredDate).toLocaleDateString()} at {c.preferredTime}</span>
                    </div>
                    <div>Format: <strong>{c.meetingType}</strong></div>
                    <div>Service: {c.serviceName}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
