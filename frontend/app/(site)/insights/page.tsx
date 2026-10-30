import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Search, Calendar, Clock, ChevronRight, BookOpen, Sparkles } from 'lucide-react';
import { getArticles } from '@/lib/api';
import BackgroundMesh from '@/components/animations/BackgroundMesh';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import CardHover from '@/components/animations/CardHover';

export const metadata: Metadata = {
  title: 'UAE Tax & Accounting Insights | ANK Global Knowledge Center',
  description:
    'Authoritative guides, Cabinet Decisions, FTA Public Clarifications, and regulatory analyses written by ANK Global Chartered Accountants in Dubai.',
};

export default async function InsightsPage() {
  const category = 'All';
  const search = '';

  const data = await getArticles();
  const articles = data?.items || [];

  const categories = [
    'All',
    'Taxation Insights',
    'Audit & Assurance',
    'Corporate Governance',
    'Business Guide',
  ];

  return (
    <div className="space-y-16 py-8 pb-24">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-navy-950 text-white py-24 px-4 sm:px-6 lg:px-8 border-b border-navy-800">
        <BackgroundMesh />
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ANK Global Thought Leadership</span>
          </div>

          <TextReveal
            text="UAE Tax, Audit & Governance Knowledge Center"
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white max-w-4xl leading-tight"
          />

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-light">
            Timely, actionable legal and financial commentary designed to help boardrooms, CFOs, and business owners navigate the rapidly evolving UAE regulatory landscape.
          </p>
        </div>
      </section>

      {/* Filter and Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-5">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/insights?category=${encodeURIComponent(cat)}`}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                category === cat
                  ? 'bg-navy-950 text-white shadow-md ring-2 ring-gold-400/30'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-gold-300 hover:text-navy-950'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-xl font-display font-bold text-navy-950">No articles found</h3>
            <p className="text-xs text-slate-500 mt-1">Try selecting another category or clear your search filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: any, idx: number) => (
              <ScrollReveal key={article.slug} delay={idx * 0.05}>
                <CardHover className="h-full">
                  <article className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-2xl hover:border-gold-400 transition-all group flex flex-col justify-between h-full">
                    <div>
                      <div className="h-56 overflow-hidden relative bg-navy-950">
                        {article.coverImage && (
                          <img
                            src={article.coverImage}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                        )}
                        <div className="absolute top-4 left-4 bg-navy-950/85 backdrop-blur-md text-gold-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-gold-400/20">
                          {article.category}
                        </div>
                      </div>

                      <div className="p-6 sm:p-7 space-y-3.5">
                        <div className="text-[11px] text-slate-400 flex items-center space-x-2">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            {new Date(article.publishedAt).toLocaleDateString('en-AE', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                          <span>•</span>
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{article.readTimeMinutes} min read</span>
                        </div>

                        <h3 className="text-xl font-display font-bold text-navy-950 group-hover:text-crimson-600 transition-colors leading-snug">
                          <Link href={`/insights/${article.slug}`}>{article.title}</Link>
                        </h3>

                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-light">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-400">
                        By {article.authorName}
                      </span>
                      <Link
                        href={`/insights/${article.slug}`}
                        className="text-xs font-bold text-navy-950 group-hover:text-crimson-600 flex items-center transition-colors"
                      >
                        <span>Read Article</span>
                        <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
                </CardHover>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
