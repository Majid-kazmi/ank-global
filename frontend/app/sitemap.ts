import { MetadataRoute } from 'next';
import { FALLBACK_SERVICES, FALLBACK_ARTICLES } from '@/lib/fallback-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ankglobal.co';

  // Static Pages
  const staticRoutes = [
    '',
    '/about',
    '/team',
    '/services',
    '/industries',
    '/insights',
    '/news',
    '/tools',
    '/resources',
    '/contact',
    '/book-consultation',
    '/careers',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Service Landing Pages
  const serviceRoutes = FALLBACK_SERVICES.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Insights / Articles
  const articleRoutes = FALLBACK_ARTICLES.map((a) => ({
    url: `${baseUrl}/insights/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...articleRoutes];
}
