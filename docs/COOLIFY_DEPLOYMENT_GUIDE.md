# Hetzner Cloud & Coolify Production Deployment Guide
**Target Client:** ANK Global Chartered Accountants & Advisors  
**Infrastructure Target:** Hetzner Cloud CPX32 VPS (4 vCPU, 8 GB RAM)  
**Management Engine:** Coolify with Docker Compose  
**Edge CDN & Security:** Cloudflare  

---

## 1. Multi-Business Infrastructure Overview

The Hetzner VPS hosts three completely independent production services managed through one Coolify dashboard:
1. **ANK Global** (Corporate platform: Next.js + NestJS + PostgreSQL + Redis)
2. **SaveDownloads.com** (Digital download portal with independent Cloudflare R2 worker proxies)
3. **Gaaon Se Shehr Tak** (E-commerce application)

### Resource Allocation Blueprint (8 GB RAM Total):
| Application Stack | RAM Limit | CPU Limit | Database Namespace | Network |
| :--- | :--- | :--- | :--- | :--- |
| **ANK Global Frontend (Next.js)** | 1.5 GB | 1.5 vCPU | N/A | `ankglobal_net` |
| **ANK Global Backend (NestJS)** | 1.5 GB | 1.5 vCPU | N/A | `ankglobal_net` |
| **ANK Global PostgreSQL** | 2.0 GB | 1.5 vCPU | `ankglobal_db` | `ankglobal_net` |
| **ANK Global Redis** | 0.5 GB | 0.5 vCPU | N/A | `ankglobal_net` |
| **Coolify Core / Traefik Proxy** | 1.0 GB | 1.0 vCPU | Coolify DB | `coolify` |
| **Buffer for Co-hosted Apps / OS**| 1.5 GB | Shared | Independent DBs | Isolated nets |

---

## 2. Step-by-Step Coolify Deployment

### Step 1: Connect Git Repository in Coolify
1. Log into your Coolify Dashboard at `https://coolify.yourserver.com`.
2. Navigate to **Projects** → Select or Create **ANK Global**.
3. Click **+ New Resource** → Choose **Docker Compose**.
4. Select **Git Repository** (Private or Public GitHub/GitLab).
5. Specify Branch: `main`.

### Step 2: Configure Compose File
Set the Compose file path to:
```
docker-compose.prod.yml
```

### Step 3: Configure Environment Variables
In the Coolify project **Environment Variables** tab, paste the variables from `.env.example`:

```env
NODE_ENV=production
POSTGRES_USER=ankglobal_user
POSTGRES_PASSWORD=GENERATE_STRONG_RANDOM_PASSWORD
POSTGRES_DB=ankglobal_db

REDIS_PASSWORD=GENERATE_STRONG_REDIS_PASSWORD

JWT_SECRET=GENERATE_64_CHARACTER_RANDOM_SECRET_KEY

FRONTEND_URL=https://ankglobal.co
NEXT_PUBLIC_API_URL=https://ankglobal.co/api
NEXT_PUBLIC_SITE_URL=https://ankglobal.co
NEXT_PUBLIC_WHATSAPP_NUMBER=971552138281
NEXT_PUBLIC_PHONE_NUMBER="+971 55 213 8281"

SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@mg.ankglobal.co
SMTP_PASS=YourSmtpKey
SMTP_FROM="ANK Global" <info@ankglobal.co>
ADMIN_ALERT_EMAIL=info@ankglobal.co
```

### Step 4: Configure Domain & Traefik Routing
In Coolify:
- **Frontend FQDN:** `https://ankglobal.co, https://www.ankglobal.co` (points to port `3000`).
- **Backend API Routing:** Either map `https://api.ankglobal.co` to port `4000` or configure Traefik path prefix `/api` to route to `backend:4000`.

### Step 5: Database Seeding (First-Time Deployment)
Once containers are deployed and healthy:
1. Open Coolify Terminal for the `ankglobal_backend` container.
2. Run database migrations:
   ```bash
   npx prisma migrate deploy
   ```
3. Run the production seed script:
   ```bash
   npm run prisma:seed
   ```
   *(This populates all 12 verified practice areas, authoritative articles, FAQs, leadership team, and superadmin account).*

---

## 3. Cloudflare Configuration

1. In Cloudflare DNS, add:
   - `A ankglobal.co` → Your Hetzner VPS IP (Proxy enabled: Orange Cloud).
   - `CNAME www` → `ankglobal.co` (Proxy enabled).
2. Set SSL/TLS encryption mode to **Full (Strict)**.
3. In Cloudflare Security → WAF, enable standard DDoS rules and Rate Limiting.
4. Cloudflare Turnstile:
   - Create a Turnstile widget for `ankglobal.co`.
   - Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.

---

## 4. Rollback & Continuous Delivery

- **Auto-Deploy on Push:** Enabled on branch `main`.
- **Zero-Downtime Rollback:** Coolify retains past container builds. To rollback, click **Deployments** → Select previous commit → Click **Redeploy**.
