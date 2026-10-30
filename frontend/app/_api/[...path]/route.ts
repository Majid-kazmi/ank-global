import { NextRequest, NextResponse } from 'next/server';
import {
  FALLBACK_SERVICES,
  FALLBACK_ARTICLES,
  FALLBACK_TEAM,
  FALLBACK_SETTINGS,
} from '@/lib/fallback-data';

// Local in-memory state for zero-config localhost testing
let localServices = [...FALLBACK_SERVICES];
let localArticles = [...FALLBACK_ARTICLES];
let localTeam = [...FALLBACK_TEAM];
let localSettings = { ...FALLBACK_SETTINGS };

let localInquiries: any[] = [
  {
    id: 'inq-1',
    name: 'Rashid Al-Nuaimi',
    email: 'rashid@nuaimigroup.ae',
    phone: '+971 50 882 1923',
    company: 'Al-Nuaimi Trading LLC',
    serviceSlug: 'uae-corporate-tax',
    serviceName: 'UAE Corporate Tax Advisory & Filing',
    message: 'We require a Corporate Tax Impact Assessment and review of our Small Business Relief eligibility before financial year-end.',
    status: 'NEW',
    internalNotes: 'Initial consultation scheduled.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'inq-2',
    name: 'Sarah Jenkins',
    email: 's.jenkins@vanguardtech.co',
    phone: '+971 55 412 8761',
    company: 'Vanguard DMCC',
    serviceSlug: 'audit-and-assurance',
    serviceName: 'Audit & Assurance (Internal & External)',
    message: 'Seeking approved auditor quotation for our DMCC trade license renewal and audited financial statements.',
    status: 'IN_PROGRESS',
    internalNotes: 'Sent fee quotation.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

let localConsultations: any[] = [
  {
    id: 'cons-1',
    name: 'Tariq Al-Mansoor',
    email: 'tariq@gulfproperties.ae',
    phone: '+971 52 331 4490',
    company: 'Gulf Horizon Real Estate',
    serviceSlug: 'uae-corporate-tax',
    serviceName: 'UAE Corporate Tax Advisory & Filing',
    preferredDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    preferredTime: '11:00 AM - 12:00 PM',
    meetingType: 'VIRTUAL',
    status: 'CONFIRMED',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/sample-ank-link',
    notes: 'Discussion on Free Zone QFZP conditions and commercial lease revenues.',
    createdAt: new Date().toISOString(),
  },
];

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/');
  const { searchParams } = new URL(request.url);

  // 1. Services
  if (path === 'services' || path === 'services/admin/all') {
    const category = searchParams.get('category');
    if (category) {
      return NextResponse.json(
        localServices.filter((s) => s.category.toLowerCase().includes(category.toLowerCase()))
      );
    }
    return NextResponse.json(localServices);
  }

  if (path.startsWith('services/slug/')) {
    const slug = path.replace('services/slug/', '');
    const service = localServices.find((s) => s.slug === slug);
    if (!service) return NextResponse.json({ message: 'Service not found' }, { status: 404 });
    return NextResponse.json(service);
  }

  // 2. Articles
  if (path === 'articles' || path === 'articles/admin/all') {
    const category = searchParams.get('category');
    const search = searchParams.get('search')?.toLowerCase();
    let filtered = [...localArticles];

    if (category && category !== 'All') {
      filtered = filtered.filter((a) => a.category === category);
    }
    if (search) {
      filtered = filtered.filter(
        (a) => a.title.toLowerCase().includes(search) || a.excerpt.toLowerCase().includes(search)
      );
    }
    return NextResponse.json({
      items: filtered,
      total: filtered.length,
      page: 1,
      limit: 10,
      totalPages: 1,
    });
  }

  if (path.startsWith('articles/slug/')) {
    const slug = path.replace('articles/slug/', '');
    const article = localArticles.find((a) => a.slug === slug);
    if (!article) return NextResponse.json({ message: 'Article not found' }, { status: 404 });
    return NextResponse.json(article);
  }

  // 3. Team
  if (path === 'team' || path === 'team/admin/all') {
    return NextResponse.json(localTeam);
  }

  // 4. Settings
  if (path === 'settings/public') {
    return NextResponse.json(localSettings);
  }
  if (path === 'settings/all') {
    const list = Object.entries(localSettings).map(([key, value]) => ({
      key,
      value,
      description: `Configuration setting for ${key}`,
    }));
    return NextResponse.json(list);
  }

  // 5. Inquiries
  if (path === 'inquiries') {
    const status = searchParams.get('status');
    const search = searchParams.get('search')?.toLowerCase();
    let filtered = [...localInquiries];

    if (status) {
      filtered = filtered.filter((i) => i.status === status);
    }
    if (search) {
      filtered = filtered.filter(
        (i) =>
          i.name?.toLowerCase().includes(search) ||
          i.email?.toLowerCase().includes(search) ||
          i.phone?.includes(search)
      );
    }
    return NextResponse.json({ items: filtered, total: filtered.length });
  }

  // 6. Consultations
  if (path === 'consultations') {
    return NextResponse.json({ items: localConsultations, total: localConsultations.length });
  }

  return NextResponse.json({ message: `Path /api/${path} not recognized` }, { status: 404 });
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/');
  const body = await request.json().catch(() => ({}));

  // Auth Login
  if (path === 'auth/login') {
    const { email, password } = body;
    if (email === 'admin@ankglobal.co' && password === 'ANK_Global_Secure_2026!') {
      return NextResponse.json({
        accessToken: 'ank_global_local_demo_jwt_token_2026',
        user: {
          id: 'admin-super-1',
          name: 'ANK Global Managing Partner',
          email: 'admin@ankglobal.co',
          role: 'SUPERADMIN',
        },
      });
    }
    return NextResponse.json(
      { message: 'Invalid credentials. Use admin@ankglobal.co / ANK_Global_Secure_2026!' },
      { status: 401 }
    );
  }

  // Create Inquiry
  if (path === 'inquiries') {
    const newInquiry = {
      id: `inq-${Date.now()}`,
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company || '',
      serviceSlug: body.serviceSlug,
      serviceName: body.serviceName,
      message: body.message,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };
    localInquiries.unshift(newInquiry);
    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been successfully received by ANK Global.',
      inquiryId: newInquiry.id,
    });
  }

  // Create Consultation
  if (path === 'consultations') {
    const newConsultation = {
      id: `cons-${Date.now()}`,
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company || '',
      serviceSlug: body.serviceSlug,
      serviceName: body.serviceName,
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime,
      meetingType: body.meetingType || 'VIRTUAL',
      notes: body.notes || '',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    localConsultations.unshift(newConsultation);
    return NextResponse.json({
      success: true,
      message: 'Consultation appointment request successfully registered.',
      consultationId: newConsultation.id,
    });
  }

  // Subscribers
  if (path === 'subscribers') {
    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing to ANK Global insights.',
    });
  }

  // Create Article
  if (path === 'articles') {
    const newArticle = {
      id: `art-${Date.now()}`,
      ...body,
      publishedAt: new Date().toISOString(),
    };
    localArticles.unshift(newArticle);
    return NextResponse.json(newArticle);
  }

  // Create Team
  if (path === 'team') {
    const newMember = {
      id: `team-${Date.now()}`,
      ...body,
    };
    localTeam.push(newMember);
    return NextResponse.json(newMember);
  }

  return NextResponse.json({ message: 'Resource created' });
}

export async function PATCH(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/');
  const body = await request.json().catch(() => ({}));

  if (path.startsWith('inquiries/')) {
    const id = path.replace('inquiries/', '');
    const inq = localInquiries.find((i) => i.id === id);
    if (inq) {
      if (body.status) inq.status = body.status;
      if (body.internalNotes !== undefined) inq.internalNotes = body.internalNotes;
      return NextResponse.json(inq);
    }
  }

  if (path.startsWith('consultations/')) {
    const id = path.replace('consultations/', '');
    const c = localConsultations.find((item) => item.id === id);
    if (c) {
      if (body.status) c.status = body.status;
      if (body.meetingLink !== undefined) c.meetingLink = body.meetingLink;
      if (body.notes !== undefined) c.notes = body.notes;
      return NextResponse.json(c);
    }
  }

  return NextResponse.json({ message: 'Resource updated' });
}

export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/');
  const body = await request.json().catch(() => ({}));

  if (path.startsWith('services/')) {
    const id = path.replace('services/', '');
    const idx = localServices.findIndex((s) => s.id === id);
    if (idx !== -1) {
      localServices[idx] = { ...localServices[idx], ...body };
      return NextResponse.json(localServices[idx]);
    }
  }

  if (path.startsWith('settings/')) {
    const key = path.replace('settings/', '');
    localSettings[key as keyof typeof localSettings] = body.value;
    return NextResponse.json({ key, value: body.value });
  }

  if (path.startsWith('articles/')) {
    const id = path.replace('articles/', '');
    const idx = localArticles.findIndex((a) => a.id === id);
    if (idx !== -1) {
      localArticles[idx] = { ...localArticles[idx], ...body };
      return NextResponse.json(localArticles[idx]);
    }
  }

  if (path.startsWith('team/')) {
    const id = path.replace('team/', '');
    const idx = localTeam.findIndex((m) => m.id === id);
    if (idx !== -1) {
      localTeam[idx] = { ...localTeam[idx], ...body };
      return NextResponse.json(localTeam[idx]);
    }
  }

  return NextResponse.json({ message: 'Resource saved' });
}

export async function DELETE(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/');

  if (path.startsWith('inquiries/')) {
    const id = path.replace('inquiries/', '');
    localInquiries = localInquiries.filter((i) => i.id !== id);
    return NextResponse.json({ success: true });
  }

  if (path.startsWith('articles/')) {
    const id = path.replace('articles/', '');
    localArticles = localArticles.filter((a) => a.id !== id);
    return NextResponse.json({ success: true });
  }

  if (path.startsWith('team/')) {
    const id = path.replace('team/', '');
    localTeam = localTeam.filter((m) => m.id !== id);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: true });
}
