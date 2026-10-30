import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import JsonLd from '@/components/JsonLd';
import SmoothScrollProvider from '@/components/animations/SmoothScrollProvider';
import ScrollProgressBar from '@/components/animations/ScrollProgressBar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ankglobal.co'),
  title: {
    default: 'ANK Global | Chartered Accountants & Advisors Dubai, UAE',
    template: '%s | ANK Global Chartered Accountants',
  },
  description:
    'Premier Chartered Accountants, Statutory Auditors, and Federal Tax Authority (FTA) Certified Tax Advisors in Dubai, UAE. Specializing in UAE Corporate Tax, VAT, Audit & Assurance, Accounting, and Business Setup.',
  keywords: [
    'Chartered Accountants Dubai',
    'Auditors in UAE',
    'UAE Corporate Tax Advisory',
    'VAT Consultants Dubai',
    'Statutory Audit Dubai',
    'Accounting and Bookkeeping UAE',
    'Company Formation Dubai',
    'ANK Global',
    'Economic Substance Regulations',
    'Virtual CFO Dubai',
  ],
  authors: [{ name: 'ANK Global Chartered Accountants and Advisors' }],
  creator: 'ANK Global',
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
    apple: `${basePath}/favicon.svg`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: 'https://ankglobal.co',
    siteName: 'ANK Global Chartered Accountants and Advisors',
    title: 'ANK Global | Chartered Accountants & Advisors Dubai, UAE',
    description:
      'Premier Chartered Accountants, Approved Auditors, and FTA Certified Tax Advisors in Dubai. Ensuring financial transparency and tax compliance across the UAE.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'ANK Global Chartered Accountants Dubai Headquarters',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ANK Global | Chartered Accountants & Advisors Dubai',
    description:
      'Premier Chartered Accountants, Statutory Auditors, and FTA Tax Advisors in Dubai, UAE.',
    images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} scroll-smooth`}>
      <head>
        <link rel="icon" type="image/svg+xml" href={`${basePath}/favicon.svg`} />
        <link rel="alternate icon" href={`${basePath}/favicon.ico`} />
        <link rel="apple-touch-icon" href={`${basePath}/favicon.svg`} />
        <JsonLd />
      </head>
      <body className="font-sans min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-crimson-600 selection:text-white overflow-x-hidden w-full">
        <ScrollProgressBar />
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-grow overflow-x-hidden">{children}</main>
          <Footer />
          <WhatsAppButton />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
