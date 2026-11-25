# Leelabiologics Website - Deployment Guide

## Prerequisites

- **Node.js**: v20.9 or higher (Node 22 recommended)
- **npm**: v10 or higher (comes with Node.js)
- **Git**: For version control

## Quick Start

```bash
# Run from the repository root
npm ci

# Copy local templates and use the same database password in both files
Copy-Item .env.postgres.example .env.postgres
Copy-Item .env.example .env.local

# Start PostgreSQL (Docker Desktop must be running)
docker compose up -d

# Start the development server
npm run dev

# Open http://localhost:3000
```

## Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Deployment Options

### Option 1: Vercel

1. Push code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Select Node.js 22 for the build/runtime
5. Add the environment variables listed below and provision a hosted PostgreSQL database

Do not use the local Docker database for a hosted deployment. The hosting platform must be able to reach the configured PostgreSQL service.

### Option 2: Docker (self-hosted)

Build and run the included standalone image:

```bash
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://your-domain.example -t leelabiologics .
docker run --name leelabiologics --restart unless-stopped --env-file .env.production -p 3000:3000 leelabiologics
```

Provide a production `.env.production` file to the container with database, SMTP, and admin settings. Use a managed PostgreSQL database or attach the container to a private database network. Put TLS termination and a reverse proxy in front of the app.

### Option 3: Other Node.js hosts

Use Node.js 22, run `npm ci`, `npm run build`, then `npm start`. Configure the environment variables and a reachable PostgreSQL database before accepting traffic.

## Environment Variables

Set these variables in the hosting provider's secret/environment settings (or a local `.env.local` file):

```env
# Required
NEXT_PUBLIC_SITE_URL=https://leelabiologics.com
DATABASE_URL=postgresql://<user>:<password>@<host>:5432/<database>
DATABASE_SSL=true

# Analytics (add when ready)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# reCAPTCHA (for forms)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
RECAPTCHA_SECRET_KEY=your-secret-key

# Contact form and careers application email delivery
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email
SMTP_PASS=your-provider-app-password
SMTP_FROM=noreply@leelabiologics.com
CONTACT_EMAIL=info@leelabiologics.com

# Admin dashboard: use a unique password and a random 32-byte signing secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-unique-long-password
ADMIN_SESSION_SECRET=your-random-32-byte-secret
```

Never put real credentials in `.env.example` or commit `.env.local`. The admin dashboard is at `/admin`; its session cookie is HTTP-only, signed, and expires after eight hours. Use the dashboard's **Test SMTP** button to verify SMTP connectivity and authentication without sending an email. Contact inquiries are emailed to `CONTACT_EMAIL`; career applications, including the uploaded resume, are emailed to `careers@leelabiologics.com`.

Local PostgreSQL runs in Docker and persists its data in the named `leelabiologics-pgdata` volume. The app creates its tables, including `career_applications` for applicant details and resume files, and migrates an existing `.data/admin-data.json` file on first connection. Resumes are available only through authenticated admin downloads. The PostgreSQL database itself must exist before the app connects; the included Compose service creates it. For production or a hosted database, set `DATABASE_URL` and `DATABASE_SSL` in the hosting environment and provision the database first.

## Post-Deployment Checklist

### Immediate

- [ ] Verify all pages load correctly
- [ ] Test responsive layouts (mobile, tablet, desktop)
- [ ] Verify navigation works
- [ ] Confirm `/admin` credentials are unique and the admin session secret is strong
- [ ] Verify SMTP from the admin Settings page
- [ ] Submit a contact inquiry and a test career application; confirm delivery and PostgreSQL records
- [ ] Confirm applicant resumes can be downloaded only after admin login
- [ ] Check cookie consent banner

### SEO

- [ ] Submit sitemap to Google Search Console
- [ ] Verify robots.txt is accessible
- [ ] Run Lighthouse audit
- [ ] Test structured data with Google Rich Results Test

### Analytics

- [ ] Set up Google Analytics 4
- [ ] Configure conversion tracking
- [ ] Set up Google Tag Manager (optional)
- [ ] Verify events fire correctly

### Legal

- [ ] Update privacy policy with real contact info
- [ ] Configure cookie consent for your jurisdiction
- [ ] Add any required legal disclaimers

## Monitoring

### Recommended Tools

- **Uptime**: UptimeRobot, Pingdom
- **Performance**: Lighthouse CI, WebPageTest
- **Errors**: Sentry, LogRocket
- **Analytics**: Google Analytics, Plausible

## Support

For deployment issues or questions, contact your development team.
