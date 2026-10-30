const isExport = process.env.NEXT_EXPORT === 'true' || process.env.GITHUB_PAGES === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: isExport ? 'export' : 'standalone',
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: isExport ? true : false,
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  images: {
    domains: ["ankglobal.co", "images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ankglobal.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  ...(isExport ? {} : { async redirects() {
    return [
      {
        source: "/sample-page-2",
        destination: "/",
        permanent: true,
      },
      {
        source: "/sample-page-2/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/accounting-bookkeeping",
        destination: "/services/accounting-and-bookkeeping",
        permanent: true,
      },
      {
        source: "/accounting-bookkeeping/",
        destination: "/services/accounting-and-bookkeeping",
        permanent: true,
      },
      {
        source: "/uae-vat",
        destination: "/services/uae-vat-compliance",
        permanent: true,
      },
      {
        source: "/uae-vat/",
        destination: "/services/uae-vat-compliance",
        permanent: true,
      },
      {
        source: "/excise-tax",
        destination: "/services/excise-tax-advisory",
        permanent: true,
      },
      {
        source: "/excise-tax/",
        destination: "/services/excise-tax-advisory",
        permanent: true,
      },
      {
        source: "/economic-substance",
        destination: "/services/economic-substance-regulations",
        permanent: true,
      },
      {
        source: "/economic-substance/",
        destination: "/services/economic-substance-regulations",
        permanent: true,
      },
      {
        source: "/audit-related-services",
        destination: "/services/audit-and-assurance",
        permanent: true,
      },
      {
        source: "/audit-related-services/",
        destination: "/services/audit-and-assurance",
        permanent: true,
      },
      {
        source: "/management-consultancy",
        destination: "/services/management-consultancy",
        permanent: true,
      },
      {
        source: "/management-consultancy/",
        destination: "/services/management-consultancy",
        permanent: true,
      },
      {
        source: "/corporate-finance",
        destination: "/services/corporate-finance",
        permanent: true,
      },
      {
        source: "/corporate-finance/",
        destination: "/services/corporate-finance",
        permanent: true,
      },
      {
        source: "/smart-sourcing",
        destination: "/services/smart-sourcing",
        permanent: true,
      },
      {
        source: "/smart-sourcing/",
        destination: "/services/smart-sourcing",
        permanent: true,
      },
      {
        source: "/professional-developments",
        destination: "/services/professional-development",
        permanent: true,
      },
      {
        source: "/professional-developments/",
        destination: "/services/professional-development",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/about-us/",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contact-us/",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/blogs",
        destination: "/insights",
        permanent: true,
      },
      {
        source: "/blogs/",
        destination: "/insights",
        permanent: true,
      },
      {
        source: "/events",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/events/",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/our-events",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/our-events/",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/career",
        destination: "/careers",
        permanent: true,
      },
      {
        source: "/career/",
        destination: "/careers",
        permanent: true,
      },
      {
        source: "/pay-online",
        destination: "/contact?intent=pay-online",
        permanent: true,
      },
      {
        source: "/pay-online/",
        destination: "/contact?intent=pay-online",
        permanent: true,
      },
      {
        source: "/how-the-uae-is-empowering-women-through-new-policies",
        destination: "/insights/how-the-uae-is-empowering-women-through-new-policies",
        permanent: true,
      },
      {
        source: "/how-the-uae-is-empowering-women-through-new-policies/",
        destination: "/insights/how-the-uae-is-empowering-women-through-new-policies",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  }),
};

export default nextConfig;
