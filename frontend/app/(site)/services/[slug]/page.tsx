import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  HelpCircle,
  ArrowRight,
  ChevronRight,
  Phone,
  Building,
  Sparkles,
  Layers,
  Clock,
  Send,
  MessageCircle,
} from 'lucide-react';
import { getServiceBySlug, getServices } from '@/lib/api';
import InquiryForm from '@/components/InquiryForm';
import BackgroundMesh from '@/components/animations/BackgroundMesh';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import CardHover from '@/components/animations/CardHover';
import FaqAccordion from '@/components/animations/FaqAccordion';

interface ServicePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const services = await getServices();
  return (services || []).map((service: any) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  try {
    const service = await getServiceBySlug(params.slug);
    return {
      title: service.metaTitle || `${service.title} | ANK Global Dubai`,
      description: service.metaDescription || service.shortDescription,
      openGraph: {
        title: service.metaTitle || service.title,
        description: service.metaDescription || service.shortDescription,
        images: service.imageUrl ? [{ url: service.imageUrl }] : undefined,
      },
    };
  } catch {
    return {
      title: 'Corporate Service | ANK Global',
    };
  }
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  let service: any;
  try {
    service = await getServiceBySlug(params.slug);
  } catch (err) {
    notFound();
  }

  const allServices = await getServices();
  const relatedServices = allServices.filter((s: any) => s.slug !== service.slug).slice(0, 5);

  const engagementPhases = [
    {
      num: '01',
      title: 'Discovery & Scoping',
      desc: 'Initial review of corporate structure, licensing type (Mainland vs Free Zone), transactions, and regulatory status.',
    },
    {
      num: '02',
      title: 'Technical Review & Audit',
      desc: 'Meticulous verification of financial ledgers, supporting agreements, and statutory compliance documentation.',
    },
    {
      num: '03',
      title: 'Agency Filing & Submission',
      desc: 'Direct electronic submission via official FTA EmaraTax or ministerial portals with complete audit trails.',
    },
    {
      num: '04',
      title: 'Partner Governance & Retainer',
      desc: 'Ongoing advisory guidance, deadline management, and proactive regulatory updates under UAE Federal laws.',
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-24 select-none">
      {/* Hero Header (Directly connects with dark Navbar) */}
      <section className="relative overflow-hidden bg-[#090A0C] text-white py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#1E202B]">
        <BackgroundMesh />
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          {/* Practice Badge Category (Row 1 - Independent Alignment) */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-crimson-950/70 border border-crimson-500/40 text-crimson-400 text-xs font-bold uppercase tracking-wider shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>{service.category || 'Tax & Advisory Services'}</span>
            </span>
            <span className="inline-flex items-center text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              UAE Statutory & Regulatory Compliance
            </span>
          </div>

          {/* Service Title (Row 2 - Full-Width Block Heading) */}
          <div className="block w-full">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white max-w-4xl tracking-tight leading-tight">
              {service.title}
            </h1>
          </div>

          {/* Service Description (Row 3 - Clean Reading Line) */}
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-light">
            {service.shortDescription}
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Detailed Service Narrative & Visuals */}
          <div className="lg:col-span-7 space-y-10">
            {/* High-Resolution Relevant Corporate Visual Media */}
            {service.imageUrl && (
              <ScrollReveal>
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 aspect-[16/9] group bg-slate-950">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C]/90 via-[#090A0C]/25 to-transparent" />
                  <div className="absolute bottom-5 left-6 right-6 flex flex-col sm:flex-row sm:items-center justify-between text-white gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 bg-[#131418]/90 px-2.5 py-1 rounded-full border border-gold-400/30 backdrop-blur-md">
                        ANK Global Chartered Advisory
                      </span>
                      <p className="text-sm sm:text-base font-bold text-white mt-1">
                        {service.title}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="px-3 py-1 rounded-full bg-[#131418]/90 border border-white/10 text-slate-300 backdrop-blur-md">
                        Dubai • UAE
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Detailed Description & Framework */}
            <ScrollReveal>
              <div className="space-y-5 text-sm text-slate-700 leading-relaxed bg-white p-7 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm">
                <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-crimson-50 text-crimson-700 text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-crimson-600" />
                  <span>Technical Overview</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#090A0C]">
                  Regulatory Context & Scope
                </h2>
                <div className="space-y-4 whitespace-pre-line text-slate-600 leading-relaxed text-sm sm:text-base font-light">
                  {service.fullDescription}
                </div>
              </div>
            </ScrollReveal>

            {/* Core Practice Features */}
            {service.features && service.features.length > 0 && (
              <ScrollReveal delay={0.05}>
                <div className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600">
                      Advisory Capabilities
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-[#090A0C]">
                      What We Deliver for Your Enterprise
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {service.features.map((feature: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-gold-300 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-medium text-slate-700 leading-snug">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* 4-Step Engagement Roadmap */}
            <ScrollReveal delay={0.1}>
              <div className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-crimson-600">
                    Execution Methodology
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#090A0C]">
                    Our 4-Phase Engagement Process
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {engagementPhases.map((phase, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 hover:border-gold-300 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-crimson-600 bg-crimson-50 px-2 py-0.5 rounded-md">
                          {phase.num}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-slate-400">
                          Phase {idx + 1}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-sm text-[#090A0C]">
                        {phase.title}
                      </h4>
                      <p className="text-xs text-slate-600 font-light leading-relaxed">
                        {phase.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Key Deliverables */}
            {service.deliverables && service.deliverables.length > 0 && (
              <ScrollReveal delay={0.15}>
                <div className="relative overflow-hidden bg-gradient-to-br from-[#090A0C] via-[#131418] to-[#090A0C] text-white p-7 sm:p-10 rounded-3xl border border-[#20222B] shadow-xl space-y-6">
                  <BackgroundMesh />
                  <div className="relative z-10 space-y-4">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/20">
                      Verified Documentation
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                      Official Outputs & Deliverables
                    </h3>
                    <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                      {service.deliverables.map((deliv: string, idx: number) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <div className="w-5 h-5 rounded-full bg-gold-400/20 text-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                            <FileText className="w-3 h-3" />
                          </div>
                          <span className="font-light">{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Service Specific FAQs Accordion */}
            {service.faqs && service.faqs.length > 0 && (
              <ScrollReveal delay={0.2}>
                <div className="space-y-5">
                  <div className="flex items-center space-x-2">
                    <HelpCircle className="w-5 h-5 text-crimson-600" />
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-[#090A0C]">
                      Frequently Asked Questions
                    </h3>
                  </div>
                  <FaqAccordion faqs={service.faqs} />
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Right Column: Sticky Lead Capture Form & Related Practice Areas */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            {/* Dedicated Service Consultation Form */}
            <InquiryForm
              initialServiceSlug={service.slug}
              initialServiceName={service.title}
            />

            {/* Direct Partner WhatsApp Consultation */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Fast-Track Assistance
              </span>
              <h4 className="text-sm font-display font-bold text-[#090A0C]">
                Need Immediate Partner Consultation?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Connect directly with our senior Chartered Accountants via WhatsApp for quick scoping and fee estimates.
              </p>
              <a
                href={`https://wa.me/971552138281?text=${encodeURIComponent(
                  `Hello ANK Global, I am inquiring regarding ${service.title}. Please share guidance.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                <span>Chat on WhatsApp (+971 55 213 8281)</span>
              </a>
            </div>

            {/* Related Practice Areas Widget */}
            <CardHover>
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-3.5">
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#090A0C]">
                  Related Advisory Practices
                </h4>
                <ul className="space-y-1.5 text-xs">
                  {relatedServices.map((rel: any) => (
                    <li key={rel.slug}>
                      <Link
                        href={`/services/${rel.slug}`}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 hover:text-crimson-600 text-slate-700 transition-colors group"
                      >
                        <span className="line-clamp-1 font-medium">{rel.title}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-crimson-600 shrink-0 ml-2 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </CardHover>

            {/* Direct Phone Support Widget */}
            <div className="p-6 rounded-3xl bg-[#090A0C] text-white border border-[#20222B] space-y-3 shadow-lg">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400">
                Partner Direct Desk
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Prefer discussing your scope over the phone? Contact our partner advisory desk directly:
              </p>
              <div className="pt-1">
                <a
                  href="tel:+971552138281"
                  className="flex items-center text-sm font-bold text-gold-300 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2 text-gold-400" />
                  <span>+971 55 213 8281</span>
                </a>
              </div>
              <p className="text-[11px] text-slate-400 pt-1 border-t border-[#1E202B]">
                Office No. 402, Sheikh Saud Al Qasimi Bldg, Deira, Dubai
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
