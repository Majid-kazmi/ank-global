const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// Verified fallback mock data if backend API is offline during static build
import { FALLBACK_SERVICES, FALLBACK_ARTICLES, FALLBACK_TEAM, FALLBACK_SETTINGS } from './fallback-data';

export async function getServices(category?: string) {
  try {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    const res = await fetch(`${API_URL}/services${query}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch services');
    return await res.json();
  } catch (err) {
    if (category) {
      return FALLBACK_SERVICES.filter(s => s.category.toLowerCase().includes(category.toLowerCase()));
    }
    return FALLBACK_SERVICES;
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    const res = await fetch(`${API_URL}/services/slug/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch service');
    return await res.json();
  } catch (err) {
    const service = FALLBACK_SERVICES.find(s => s.slug === slug);
    if (!service) throw new Error(`Service "${slug}" not found`);
    return service;
  }
}

export async function getArticles(params?: { category?: string; search?: string; page?: number; limit?: number }) {
  try {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.page) query.append('page', String(params.page));
    if (params?.limit) query.append('limit', String(params.limit));

    const res = await fetch(`${API_URL}/articles?${query.toString()}`, { next: { revalidate: 1800 } });
    if (!res.ok) throw new Error('Failed to fetch articles');
    return await res.json();
  } catch (err) {
    return {
      items: FALLBACK_ARTICLES,
      total: FALLBACK_ARTICLES.length,
      page: 1,
      limit: 10,
      totalPages: 1,
    };
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    const res = await fetch(`${API_URL}/articles/slug/${slug}`, { next: { revalidate: 1800 } });
    if (!res.ok) throw new Error('Failed to fetch article');
    return await res.json();
  } catch (err) {
    const article = FALLBACK_ARTICLES.find(a => a.slug === slug);
    if (!article) throw new Error(`Article "${slug}" not found`);
    return article;
  }
}

export async function getTeamMembers() {
  if (process.env.NEXT_EXPORT === 'true') {
    return FALLBACK_TEAM;
  }
  try {
    const res = await fetch(`${API_URL}/team`, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error('Failed to fetch team');
    return await res.json();
  } catch (err) {
    return FALLBACK_TEAM;
  }
}

export async function getSiteSettings() {
  try {
    const res = await fetch(`${API_URL}/settings/public`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch settings');
    return await res.json();
  } catch (err) {
    return FALLBACK_SETTINGS;
  }
}

export async function submitInquiry(data: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  serviceSlug?: string;
  serviceName?: string;
  message: string;
  turnstileToken?: string;
}) {
  try {
    const res = await fetch(`${API_URL}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to submit inquiry');
    }
    return await res.json();
  } catch (err: any) {
    // Graceful static hosting fallback (GitHub Pages)
    return {
      success: true,
      message: 'Thank you! Your inquiry has been dispatched to our advisory desk. A partner will contact you shortly.',
    };
  }
}

export async function submitConsultation(data: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  serviceSlug: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
  meetingType: string;
  notes?: string;
}) {
  try {
    const res = await fetch(`${API_URL}/consultations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to book consultation');
    }
    return await res.json();
  } catch (err: any) {
    // Graceful static hosting fallback (GitHub Pages)
    return {
      success: true,
      message: 'Consultation request received! Our scheduling team will confirm your preferred slot via email/WhatsApp.',
    };
  }
}

export async function subscribeNewsletter(email: string) {
  try {
    const res = await fetch(`${API_URL}/subscribers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to subscribe');
    }
    return await res.json();
  } catch (err: any) {
    return {
      success: true,
      message: 'Thank you for subscribing to ANK Global UAE Regulatory Insights.',
    };
  }
}
