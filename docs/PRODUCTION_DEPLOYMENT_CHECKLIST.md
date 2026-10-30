# Production Deployment Checklist - ANK Global

Use this checklist before and immediately following deployment to Hetzner Cloud via Coolify:

### Pre-Deployment Verification
- [x] Verified legacy crawl completed and real business coordinates confirmed:
  - Address: Office 402, Sheikh Saud Al Qasimi Bldg, Deira, Dubai, UAE
  - Phone / WhatsApp: +971 55 213 8281
  - Email: info@ankglobal.co
- [x] Legacy URL 301 redirect map configured in `next.config.mjs` (36 routes covered).
- [x] Environment variable template created (`.env.example`).
- [x] Production Dockerfile created for NestJS (`backend/Dockerfile`).
- [x] Production Dockerfile created for Next.js (`frontend/Dockerfile`).
- [x] Production Docker Compose stack created (`docker-compose.prod.yml`).
- [x] Resource limits defined to guarantee isolation alongside SaveDownloads and Gaaon Se Shehr Tak.

### Server & Coolify Configuration
- [ ] Ensure Hetzner Cloud VPS (CPX32) has Docker and Coolify running.
- [ ] Create independent project `ank-global` in Coolify.
- [ ] Configure environment variables in Coolify project settings.
- [ ] Deploy stack via `docker-compose.prod.yml`.
- [ ] Run `npx prisma migrate deploy` in backend container.
- [ ] Run `npm run prisma:seed` in backend container to seed real data and superadmin.

### DNS & Cloudflare Edge Setup
- [ ] Set DNS A record: `ankglobal.co` -> VPS IP (Proxied).
- [ ] Set DNS CNAME: `www.ankglobal.co` -> `ankglobal.co` (Proxied).
- [ ] Set Cloudflare SSL/TLS mode to **Full (Strict)**.
- [ ] Configure Cloudflare Turnstile widget and insert keys in environment.

### Post-Deployment Functional Smoke Testing
- [ ] Verify homepage loads with HTTPS and valid certificate.
- [ ] Verify top utility bar and WhatsApp button click links to `+971 55 213 8281`.
- [ ] Test UAE Corporate Tax (9%) & VAT interactive calculators on `/tools` and homepage.
- [ ] Test public lead form on `/contact` (verify DB record and email dispatch).
- [ ] Test consultation booking form on `/book-consultation`.
- [ ] Test legacy URL redirects (e.g., `curl -IL https://ankglobal.co/uae-vat/` -> 301 to `/services/uae-vat-compliance`).
- [ ] Verify `/sitemap.xml` returns valid XML with all service landing pages.
- [ ] Verify `/robots.txt` disallows `/admin/` and `/api/`.
- [ ] Test admin portal login at `/admin/login` using superadmin credentials.
- [ ] Test admin status update and notes on lead inquiry.
- [ ] Verify automated backup script execution via `scripts/backup.sh`.
