# ANK Global Corporate Website & Administrative Platform

**Client:** ANK Global Chartered Accountants and Advisors  
**Headquarters:** Office No. 402, Sheikh Saud Al Qasimi Building, 159 Salah Al Din Street, Deira, Dubai, UAE  
**Contact:** Phone & WhatsApp: `+971 55 213 8281` | Email: `info@ankglobal.co`  
**Hosting Environment:** Hetzner Cloud VPS (CPX32) via Coolify & Docker  

---

## 1. Project Architecture

This repository contains the complete, production-ready corporate website and administration platform for **ANK Global Chartered Accountants and Advisors**, rebuilt from the ground up:

- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS.
  - Multi-page corporate site with 12 specialized practice landing pages.
  - Interactive UAE Corporate Tax (9%) & VAT calculators.
  - Consultation scheduling interface (virtual vs in-person at Deira office).
  - Built-in legacy 301 redirect map for all 21 historic WordPress URLs.
  - JSON-LD Schema.org structured data (`AccountingService`, `LocalBusiness`, `Article`, `FAQPage`, `BreadcrumbList`).
  - Secure administration portal (`/admin`).
- **Backend:** Node.js + NestJS + TypeScript RESTful API.
  - Modular design: Auth (JWT/Bcrypt), Inquiries, Consultations, Services, Articles, Team, FAQs, Settings, Subscribers, Audit Logs.
  - Rate limiting (Throttler), Helmet security headers, Cloudflare Turnstile verification.
  - Transactional email dispatch with customer acknowledgement and partner alerts.
- **Database:** PostgreSQL 16 + Prisma ORM.
  - Complete data model with production seed script populating all real, verified ANK Global business data.
- **Cache & Jobs:** Redis 7 + BullMQ ready.
- **Deployment:** Multi-container Docker Compose stack configured for Hetzner Cloud VPS via Coolify, engineered to coexist with SaveDownloads.com and Gaaon Se Shehr Tak without resource conflict or shared databases.

---

## 2. Directory Layout

```
ANK Global/
├── frontend/                     # Next.js 14 App Router + Tailwind CSS
│   ├── app/                      # Public routes & /admin portal
│   ├── components/               # Navbar, Footer, InquiryForm, TaxCalculator, WhatsAppButton
│   ├── lib/                      # API client & fallback data
│   ├── public/                   # Logos, static assets
│   ├── next.config.mjs           # Legacy 301 redirects & security headers
│   └── Dockerfile                # Production multi-stage Next.js image
├── backend/                      # NestJS RESTful API
│   ├── src/                      # Auth, inquiries, consultations, services, email, settings
│   ├── prisma/                   # schema.prisma & seed.ts
│   └── Dockerfile                # Production multi-stage NestJS image
├── docker-compose.yml            # Local development orchestration
├── docker-compose.prod.yml       # Production Coolify deployment compose
├── .env.example                  # Environment configuration template
├── nginx/                        # Nginx reverse proxy configuration
├── scripts/                      # Automated DB backup & restore scripts
└── docs/                         # Deployment, SEO redirect map, migration inventory & security
```

---

## 3. Quick Start (Local Development)

### Prerequisites:
- Node.js v20+
- Docker & Docker Compose

### 1. Clone & Configure Environment:
```bash
cp .env.example .env
```

### 2. Start Stack with Docker Compose:
```bash
docker-compose up -d
```

### 3. Or Run Locally Without Docker:

#### Start Backend:
```bash
cd backend
npm install
npx prisma generate
npm run start:dev
```

#### Start Frontend:
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` for the public website and `http://localhost:3000/admin/login` for the admin portal.

**Default Superadmin Credentials (Seeded):**
- **Email:** `admin@ankglobal.co`
- **Password:** `ANK_Global_Secure_2026!`

---

## 4. Production Deployment on Coolify (Hetzner Cloud VPS)

Detailed instructions are available in [docs/COOLIFY_DEPLOYMENT_GUIDE.md](docs/COOLIFY_DEPLOYMENT_GUIDE.md).

1. Add a new **Docker Compose** resource in Coolify pointing to this repository.
2. Select compose file: `docker-compose.prod.yml`.
3. Add the production environment variables from `.env.example`.
4. Point `ankglobal.co` to the Hetzner VPS IP in Cloudflare (Full Strict SSL).
5. Deploy the stack.
6. Run `npm run prisma:seed` in the backend container to populate verified ANK Global services, articles, and settings.
