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
  const relatedServices = allServices.filter((s: any) => s.slug !== service.slug).slice(0, 4);

  return (
    <div className="space-y-16 py-8 pb-24">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-navy-950 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/services" className="hover:text-navy-950 transition-colors">
            Services
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-crimson-600 font-semibold">{service.title}</span>
        </nav>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-navy-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-navy-800">
        <BackgroundMesh />
        <div className="max-w-7xl mx-auto space-y-5 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span>{service.category}</span>
          </div>

          <TextReveal
            text={service.title}
            className="text-3xl sm:text-5xl font-display font-bold text-white max-w-4xl leading-tight"
          />

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-light">
            {service.shortDescription}
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Detailed Service Narrative */}
          <div className="lg:col-span-7 space-y-10">
            {/* Detailed Description */}
            <ScrollReveal>
              <div className="space-y-5 text-sm text-slate-700 leading-relaxed bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm">
                <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-crimson-50 text-crimson-700 text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-crimson-600" />
                  <span>Technical Scope</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-950">
                  Service Overview & Regulatory Framework
                </h2>
                <div className="space-y-4 whitespace-pre-line text-slate-600 leading-relaxed text-sm sm:text-base">
                  {service.fullDescription}
                </div>
              </div>
            </ScrollReveal>

            {/* Core Practice Features */}
            {service.features && service.features.length > 0 && (
              <ScrollReveal delay={0.1}>
                <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-navy-950">
                    Key Scope & Advisory Capabilities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feature: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-3 p-4 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-gold-300 transition-colors"
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

            {/* Key Deliverables */}
            {service.deliverables && service.deliverables.length > 0 && (
              <ScrollReveal delay={0.15}>
                <div className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-crimson-950 text-white p-8 sm:p-10 rounded-3xl border border-navy-800 shadow-xl space-y-6">
                  <BackgroundMesh />
                  <div className="relative z-10 space-y-4">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400">
                      Formal Documentation & Outputs
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                      Tangible Deliverables Provided to Clients
                    </h3>
                    <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300">
                      {service.deliverables.map((deliv: string, idx: number) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <div className="w-5 h-5 rounded-full bg-gold-400/20 text-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                            <FileText className="w-3 h-3" />
                          </div>
                          <span>{deliv}</span>
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
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-navy-950">
                      Frequently Asked Questions
                    </h3>
                  </div>
                  <FaqAccordion faqs={service.faqs} />
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Right Column: Sticky Lead Capture Form & Related Practice Areas */}
          <div className="lg:col-span-5 space-y-8 sticky top-28">
            <InquiryForm
              initialServiceSlug={service.slug}
              initialServiceName={service.title}
            />

            {/* Related Practice Areas Widget */}
            <CardHover>
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
                <h4 className="text-xs uppercase font-bold tracking-wider text-navy-950">
                  Related Advisory Practices
                </h4>
                <ul className="space-y-2 text-xs">
                  {relatedServices.map((rel: any) => (
                    <li key={rel.slug}>
                      <Link
                        href={`/services/${rel.slug}`}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 hover:text-crimson-600 text-slate-700 transition-colors group"
                      >
                        <span className="line-clamp-1 font-medium">{rel.title}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-crimson-600 shrink-0 ml-2 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </CardHover>

            {/* Direct Phone Support Widget */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white border border-navy-800 space-y-3 shadow-lg">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400">
                Direct Advisory Desk
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Prefer discussing your scope over the phone? Contact our partner advisory desk directly:
              </p>
              <div className="pt-2">
                <a
                  href="tel:+971552138281"
                  className="flex items-center text-sm font-bold text-gold-300 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2 text-gold-400" />
                  <span>+971 55 213 8281</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
