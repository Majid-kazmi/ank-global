'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit3, Trash2, BookOpen, ExternalLink, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminInsightsPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Taxation Insights',
    excerpt: '',
    content: '',
    coverImage: '',
    authorName: 'ANK Global Advisory Team',
    readTimeMinutes: 5,
    metaTitle: '',
    metaDescription: '',
    isPublished: true,
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

  const fetchArticles = async () => {
    setLoading(true);
    const token = localStorage.getItem('ank_token');
    try {
      const res = await fetch(`${apiUrl}/articles/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setArticles(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('ank_token');

    try {
      const method = editingArticle ? 'PUT' : 'POST';
      const url = editingArticle
        ? `${apiUrl}/articles/${editingArticle.id}`
        : `${apiUrl}/articles`;

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setEditingArticle(null);
        setIsCreating(false);
        fetchArticles();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    const token = localStorage.getItem('ank_token');
    try {
      const res = await fetch(`${apiUrl}/articles/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchArticles();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy-950">
            Insights & Regulatory Articles
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Author and publish UAE tax guides, auditing memos, and corporate circulars.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingArticle(null);
            setFormData({
              title: '',
              slug: '',
              category: 'Taxation Insights',
              excerpt: '',
              content: '',
              coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
              authorName: 'ANK Global Advisory Team',
              readTimeMinutes: 5,
              metaTitle: '',
              metaDescription: '',
              isPublished: true,
            });
            setIsCreating(true);
          }}
          className="inline-flex items-center px-4 py-2 rounded-xl bg-gold-500 text-navy-950 font-semibold text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          <span>New Article</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Published Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    Loading articles...
                  </td>
                </tr>
              ) : articles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    No articles published yet.
                  </td>
                </tr>
              ) : (
                articles.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-navy-950">
                      {a.title}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-navy-800">
                        {a.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{a.authorName}</td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {new Date(a.publishedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <Link
                        href={`/insights/${a.slug}`}
                        target="_blank"
                        className="inline-block p-1.5 text-slate-400 hover:text-navy-900"
                        title="View Public Post"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => {
                          setEditingArticle(a);
                          setFormData({
                            title: a.title,
                            slug: a.slug,
                            category: a.category,
                            excerpt: a.excerpt,
                            content: a.content,
                            coverImage: a.coverImage || '',
                            authorName: a.authorName,
                            readTimeMinutes: a.readTimeMinutes,
                            metaTitle: a.metaTitle || '',
                            metaDescription: a.metaDescription || '',
                            isPublished: a.isPublished,
                          });
                          setIsCreating(true);
                        }}
                        className="p-1.5 text-slate-500 hover:text-navy-900"
                        title="Edit Article"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(a.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <h3 className="text-xl font-display font-bold text-navy-950">
              {editingArticle ? 'Edit Insight Article' : 'Publish New Insight'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setFormData({ ...formData, title, slug: editingArticle ? formData.slug : slug });
                  }}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-white"
                  >
                    <option value="Taxation Insights">Taxation Insights</option>
                    <option value="Audit & Assurance">Audit & Assurance</option>
                    <option value="Corporate Governance">Corporate Governance</option>
                    <option value="Business Guide">Business Guide</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lead Excerpt (Summary for Cards & Search) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Article Content (Markdown / Text) *
                </label>
                <textarea
                  rows={8}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Author Attribution
                  </label>
                  <input
                    type="text"
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
