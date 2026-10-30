# Security Architecture & Data Protection Protocol
**Entity:** ANK Global Chartered Accountants and Advisors  
**Jurisdiction:** Dubai, United Arab Emirates (UAE)  
**Standard Compliance:** UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection (PDPL)  

---

## 1. Authentication & Session Security
- **Algorithm:** Passwords hashed with `bcrypt` using cost factor 10.
- **Session Tokens:** Stateless JSON Web Tokens (JWT) signed with SHA-256 HMAC (64-byte minimum entropy).
- **Transport Security:** Strict-Transport-Security (HSTS) with `max-age=31536000; includeSubDomains; preload`.
- **Role-Based Access Control (RBAC):** Hierarchical roles (`SUPERADMIN`, `ADMIN`, `EDITOR`) enforced by NestJS guards (`RolesGuard`, `JwtAuthGuard`).

## 2. Network & Boundary Protection
- **No Public Database Exposure:** Neither PostgreSQL (`port 5432`) nor Redis (`port 6379`) are published to the host network in production. They reside exclusively inside the private Docker bridge network (`ankglobal_net`).
- **Rate Limiting:** Throttler limits requests to 100 per minute per client IP to safeguard against brute-force attacks and volumetric API abuse.
- **Spam Mitigation:** Optional Cloudflare Turnstile token validation on all public lead and inquiry endpoints.

## 3. Client Inquiry & Confidentiality Controls
- **Confidentiality Obligation:** Inquiries, consultations, and corporate financial data submitted through ANK Global forms are encrypted in transit via TLS 1.3 and stored in isolated PostgreSQL tables.
- **Audit Logging:** Every administrative login, status change, and data alteration is recorded in the immutable `audit_logs` table with timestamp, IP address, and changed payload.

## 4. Disaster Recovery & Off-Site Backups
- **Daily Automated Dumps:** Compressed, encrypted database backups via `pg_dump` executed every 24 hours.
- **Local Retention:** 30-day retention on VPS.
- **Off-Site Sync Readiness:** Compatible with Cloudflare R2 / AWS S3 via standard rsync or S3 CLI upload commands.
