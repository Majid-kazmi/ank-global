'use client';

import React, { useEffect, useState } from 'react';
import { Edit3, CheckCircle2, Briefcase, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<any>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

  const fetchServices = async () => {
    setLoading(true);
    const token = localStorage.getItem('ank_token');
    try {
      const res = await fetch(`${apiUrl}/services/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setServices(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    const token = localStorage.getItem('ank_token');
    try {
      const res = await fetch(`${apiUrl}/services/${editingService.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editingService.title,
          category: editingService.category,
          shortDescription: editingService.shortDescription,
          fullDescription: editingService.fullDescription,
          metaTitle: editingService.metaTitle,
          metaDescription: editingService.metaDescription,
        }),
      });

      if (res.ok) {
        setEditingService(null);
        fetchServices();
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
            Practice Areas Catalog & SEO
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage service scopes, statutory references, and landing page SEO metadata.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Service Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">URL Slug</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    Loading practice catalog...
                  </td>
                </tr>
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    No services found. Ensure backend database has been seeded.
                  </td>
                </tr>
              ) : (
                services.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-navy-950">
                      {s.title}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-navy-800">
                        {s.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      /services/{s.slug}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-emerald-700 font-semibold flex items-center text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                        Published
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <Link
                        href={`/services/${s.slug}`}
                        target="_blank"
                        className="inline-block p-1.5 text-slate-400 hover:text-navy-900"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setEditingService(s)}
                        className="p-1.5 text-slate-500 hover:text-navy-900"
                        title="Edit Service"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Drawer/Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <h3 className="text-xl font-display font-bold text-navy-950">
              Edit Practice: {editingService.title}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) =>
                    setEditingService({ ...editingService, title: e.target.value })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={editingService.category}
                  onChange={(e) =>
                    setEditingService({ ...editingService, category: e.target.value })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={editingService.shortDescription}
                  onChange={(e) =>
                    setEditingService({ ...editingService, shortDescription: e.target.value })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Service Scope & Regulatory Framework
                </label>
                <textarea
                  rows={6}
                  value={editingService.fullDescription}
                  onChange={(e) =>
                    setEditingService({ ...editingService, fullDescription: e.target.value })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-xl space-y-3 border border-slate-200">
                <span className="text-xs font-bold text-navy-950 block">SEO Meta Settings</span>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-0.5">Meta Title</label>
                  <input
                    type="text"
                    value={editingService.metaTitle || ''}
                    onChange={(e) =>
                      setEditingService({ ...editingService, metaTitle: e.target.value })
                    }
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-0.5">Meta Description</label>
                  <textarea
                    rows={2}
                    value={editingService.metaDescription || ''}
                    onChange={(e) =>
                      setEditingService({ ...editingService, metaDescription: e.target.value })
                    }
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800"
                >
                  Save Practice Area
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
