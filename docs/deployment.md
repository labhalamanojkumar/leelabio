# Leelabiologics Website - Deployment Guide

## Prerequisites

- **Node.js**: v18.17 or higher
- **npm**: v9 or higher (comes with Node.js)
- **Git**: For version control

## Quick Start

```bash
# 1. Navigate to project directory
cd d:\leelabiologics

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open in browser
# Visit http://localhost:3000
```

## Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. Push code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel auto-detects Next.js and deploys

**Configuration**: No additional configuration needed. Vercel handles SSR, ISR, and Edge functions automatically.

### Option 2: Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import your repository
4. Set build command: `npm run build`
5. Set publish directory: `.next`
6. Install Next.js plugin from Netlify plugins

### Option 3: Traditional Hosting (AWS, GCP, Azure)

1. Build the application: `npm run build`
2. Upload the entire project to your server
3. Run: `npm start`
4. Configure reverse proxy (nginx/Apache) to port 3000

### Option 4: Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Environment Variables

Create a `.env.local` file for local development:

```env
# Required
NEXT_PUBLIC_SITE_URL=https://leelabiologics.com

# Analytics (add when ready)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# reCAPTCHA (for forms)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
RECAPTCHA_SECRET_KEY=your-secret-key

# Email/Forms (if using backend)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password
```

## Post-Deployment Checklist

### Immediate

- [ ] Verify all pages load correctly
- [ ] Test responsive layouts (mobile, tablet, desktop)
- [ ] Verify navigation works
- [ ] Test contact form submission
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
