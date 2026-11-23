# Leelabiologics Enterprise Website

A modern, conversion-driven enterprise website built with **Next.js 14**, featuring SEO optimization, responsive design, and a comprehensive design system.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [www.leelabiologics.com](leelabiologics.com) to view the site.

## 🛠 Technology Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | CSS Custom Properties |
| Fonts | Google Fonts (Outfit, Inter) |
| Deployment | Vercel-ready |

## 📁 Project Structure

```
src/
├── app/                    # Next.js pages
│   ├── layout.tsx          # Root layout with SEO
│   ├── page.tsx            # Home page
│   ├── about/             
│   ├── solutions/          # Service pages
│   ├── facilities/
│   ├── resources/
│   ├── careers/
│   ├── contact/
│   ├── legal/
│   └── sitemap.ts          # Dynamic sitemap
├── components/
│   ├── layout/             # Header, Footer
│   └── features/           # CookieConsent, etc.
├── lib/
│   ├── constants.ts        # Site config & data
│   └── utils.ts            # Utility functions
└── types/
    └── index.ts            # TypeScript definitions

docs/                       # Documentation
├── deployment.md           # Deployment guide
├── seo-checklist.md        # SEO maintenance
└── cms-guide.md            # CMS integration
```

## 📄 Pages

### Core Pages
- **Home** (`/`) - Hero, services, stats, CTA
- **About** (`/about`) - Mission, team, timeline
- **Solutions** (`/solutions`) - Service overview
- **Contact** (`/contact`) - RFP form
- **Facilities** (`/facilities`) - Manufacturing centers
- **Careers** (`/careers`) - Job listings
- **Resources** (`/resources`) - Knowledge hub

### Solution Pages
- Biologics CDMO (`/solutions/biologics-cdmo`)
- Biologics Manufacturing (`/solutions/biologics-manufacturing`)
- Cell & Gene Therapy (`/solutions/cell-gene-therapy`)
- Nucleic Acid Therapeutics (`/solutions/nucleic-acid-therapeutics`)
- Analytical Solutions (`/solutions/analytical-solutions`)
- Scientific Writing (`/solutions/scientific-writing`)
- Technical Support (`/solutions/technical-support`)

### Legal Pages
- Privacy Policy (`/legal/privacy`)
- Terms of Service (`/legal/terms`)
- GMP Statement (`/legal/gmp-statement`)

## 🎨 Design System

### Colors
```css
--color-primary-500: #0052cc;   /* Professional Blue */
--color-secondary-500: #00a3a3; /* Biotech Teal */
--color-accent-500: #ff6b4a;    /* CTA Coral */
```

### Typography
- **Headings**: Outfit (500-700 weight)
- **Body**: Inter (400-600 weight)

## 🔍 SEO Features

- ✅ Dynamic sitemap generation
- ✅ Meta tags for all pages
- ✅ OpenGraph & Twitter Cards
- ✅ JSON-LD structured data
- ✅ robots.txt
- ✅ Semantic HTML

## 📋 Pre-Launch Checklist

- [ ] Run `npm install` to install dependencies
- [ ] Configure environment variables (see `.env.example`)
- [ ] Replace placeholder content with real copy
- [ ] Add real images to `/public/images/`
- [ ] Set up Google Analytics (GA4)
- [ ] Submit sitemap to Google Search Console
- [ ] Configure form backend (HubSpot, API, etc.)
- [ ] Test on mobile devices

## 📚 Documentation

- [Deployment Guide](docs/deployment.md)
- [SEO Checklist](docs/seo-checklist.md)
- [CMS Integration Guide](docs/cms-guide.md)

## 📝 License

Proprietary - Leelabiologics © 2024
