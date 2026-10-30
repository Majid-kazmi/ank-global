import React from 'react';

interface JsonLdProps {
  type?: 'Organization' | 'LocalBusiness' | 'Service' | 'Article';
  data?: Record<string, any>;
}

export default function JsonLd({ type = 'Organization', data }: JsonLdProps) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    name: 'ANK Global Chartered Accountants and Advisors',
    alternateName: 'ANK Global Management and Tax Consultants',
    url: 'https://ankglobal.co',
    logo: 'https://ankglobal.co/images/brand/ank-logo.svg',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    description: 'Premier Chartered Accountants, Statutory Auditors, and Federal Tax Authority (FTA) Certified Tax Advisors in Dubai, United Arab Emirates.',
    telephone: '+971-55-213-8281',
    email: 'info@ankglobal.co',
    priceRange: 'AED',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Office No. 402, Sheikh Saud Al Qasimi Building, 159 Salah Al Din Street',
      addressLocality: 'Deira',
      addressRegion: 'Dubai',
      postalCode: '37212',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.2697,
      longitude: 55.3326,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    areaServed: [
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'City', name: 'Dubai' },
      { '@type': 'City', name: 'Abu Dhabi' },
      { '@type': 'City', name: 'Sharjah' },
    ],
    knowsAbout: [
      'UAE Corporate Tax',
      'UAE Value Added Tax (VAT)',
      'Statutory Financial Audit',
      'Economic Substance Regulations (ESR)',
      'Accounting and Bookkeeping',
      'Company Formation in Dubai',
      'PRO Services',
      'Virtual CFO Support',
    ],
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(baseSchema) }}
    />
  );
}
