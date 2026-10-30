import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User, ChevronRight, ArrowLeft, Share2, ShieldCheck, Sparkles } from 'lucide-react';
import { getArticleBySlug, getArticles } from '@/lib/api';
import JsonLd from '@/components/JsonLd';
import ScrollReveal from '@/components/animations/ScrollReveal';
import BackgroundMesh from '@/components/animations/BackgroundMesh';

interface InsightPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const data = await getArticles();
  return (data?.items || []).map((article: any) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  try {
    const article = await getArticleBySlug(params.slug);
    return {
      title: article.metaTitle || `${article.title} | ANK Global`,
      description: article.metaDescription || article.excerpt,
      openGraph: {
        title: article.metaTitle || article.title,
        description: article.metaDescription || article.excerpt,
        images: article.coverImage ? [{ url: article.coverImage }] : undefined,
      },
    };
  } catch {
    return { title: 'Insight | ANK Global' };
  }
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  let article: any;
  try {
    article = await getArticleBySlug(params.slug);
  } catch (err) {
    notFound();
  }

  const articleSchema = {
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'ANK Global Chartered Accountants and Advisors',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ANK Global Chartered Accountants',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ankglobal.co/logo.png',
      },
    },
  };

  return (
    <div className="py-8 pb-24 space-y-12">
      <JsonLd type="Article" data={articleSchema} />

      {/* Breadcrumb Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-navy-950 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/insights" className="hover:text-navy-950 transition-colors">
            Insights
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-crimson-600 font-semibold line-clamp-1">{article.title}</span>
        </nav>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <ScrollReveal>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-crimson-50 border border-crimson-200 text-crimson-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-crimson-600" />
            <span>{article.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-bold text-navy-950 leading-tight mt-3">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light mt-4">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-between py-4 border-y border-slate-200 text-xs text-slate-500 gap-4 mt-6">
            <div className="flex items-center space-x-6">
              <span className="flex items-center font-semibold text-navy-950">
                <User className="w-4 h-4 mr-1.5 text-crimson-600" />
                {article.authorName}
              </span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1.5 text-slate-400" />
                {new Date(article.publishedAt).toLocaleDateString('en-AE', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1.5 text-slate-400" />
                {article.readTimeMinutes} min read
              </span>
            </div>
          </div>
        </ScrollReveal>
      </header>

      {/* Article Cover Image */}
      {article.coverImage && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal delay={0.1}>
            <div className="h-80 sm:h-[420px] w-full rounded-3xl overflow-hidden shadow-xl bg-navy-950 border border-slate-200">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      )}

      {/* Article Body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6">
        <ScrollReveal delay={0.15}>
          <div className="prose prose-slate max-w-none text-slate-700 text-base sm:text-lg leading-relaxed space-y-6 whitespace-pre-line font-light">
            {article.content}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-8 mt-10 border-t border-slate-200 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 mr-2">Topics:</span>
              {article.tags.map((tag: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-slate-100 hover:bg-gold-50 hover:text-gold-800 transition-colors rounded-full text-xs font-semibold text-slate-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Advisory Box */}
          <div className="mt-14 relative overflow-hidden bg-gradient-to-r from-navy-950 via-navy-900 to-crimson-950 text-white p-8 sm:p-10 rounded-3xl border border-navy-800 space-y-4 shadow-xl">
            <BackgroundMesh />
            <div className="relative z-10 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
                Institutional Advisory Desk
              </span>
              <h3 className="text-2xl font-display font-bold text-white">
                Need Expert Support on this Topic?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                The regulatory interpretations presented here are for technical orientation. Specific applicability requires direct review of your company’s trade licensing, transactional nexus, and corporate accounting books.
              </p>
              <div className="pt-3">
                <Link
                  href="/book-consultation"
                  className="inline-flex items-center px-7 py-3.5 rounded-xl bg-gold-500 text-navy-950 text-xs font-bold uppercase tracking-wider hover:bg-gold-400 transition-all shadow-md btn-shimmer"
                >
                  <span>Schedule Strategy Consultation</span>
                  <ChevronRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </article>
    </div>
  );
}
