# CMS Integration Guide

## Overview

This website is built with **Next.js 14** and is designed to be easily integrated with a headless CMS. The recommended CMS options are:

1. **Sanity** (Recommended) - Real-time preview, flexible content modeling
2. **Contentful** - Enterprise-ready, strong API
3. **Strapi** - Self-hosted, open-source option

## Current Data Structure

Content is currently stored in TypeScript files in `/src/data/` and `/src/lib/constants.ts`. To integrate with a CMS:

### Services
Location: `/src/lib/constants.ts` → `SERVICES`

```typescript
{
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  icon: string;
}
```

### Case Studies
Location: Create `/src/data/caseStudies.ts`

```typescript
{
  id: string;
  title: string;
  slug: string;
  serviceArea: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  image?: string;
  pdfUrl?: string;
}
```

### Resources
Location: Create `/src/data/resources.ts`

```typescript
{
  id: string;
  title: string;
  slug: string;
  type: 'whitepaper' | 'application-note' | 'case-study' | 'webinar';
  serviceArea: string;
  description: string;
  downloadUrl?: string;
  isGated: boolean;
}
```

## Sanity Integration Steps

### 1. Install Sanity

```bash
npm install sanity next-sanity @sanity/image-url
```

### 2. Create Sanity Project

```bash
npx sanity@latest init --create-project "Leelabiologics CMS" --dataset production
```

### 3. Define Schemas

Create `/sanity/schemas/service.ts`:

```typescript
export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'icon', title: 'Icon', type: 'string' },
    { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] },
  ],
};
```

### 4. Fetch Data

Create `/src/lib/sanity.ts`:

```typescript
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
});

export async function getServices() {
  return client.fetch(`*[_type == "service"] | order(order asc)`);
}
```

### 5. Update Pages

Replace static imports with dynamic fetches:

```typescript
// Before (static)
import { SERVICES } from '@/lib/constants';

// After (dynamic)
import { getServices } from '@/lib/sanity';
const services = await getServices();
```

## Content Types to Create in CMS

1. **Services** - Main service pages
2. **Case Studies** - Client success stories
3. **Resources** - Whitepapers, brochures, webinars
4. **Team Members** - Leadership and team
5. **Job Postings** - Career opportunities
6. **News/Blog Posts** - Company updates
7. **FAQs** - Per-service FAQs
8. **Testimonials** - Client quotes

## Image Management

### Current State
Images are stored in `/public/images/`

### With CMS
Images should be uploaded to the CMS and served via CDN:
- Sanity: `@sanity/image-url` for transformations
- Contentful: Built-in image API
- Cloudinary: Third-party option for any CMS

## Preview Mode

For content editors to preview unpublished changes:

```typescript
// pages/api/preview.ts
export default function handler(req, res) {
  res.setPreviewData({});
  res.redirect(req.query.redirect || '/');
}
```

## Content Editing Tips

### For Marketing Team

1. **Page Titles**: Keep under 60 characters
2. **Descriptions**: Keep under 160 characters
3. **Images**: Use WebP format, max 1920px wide
4. **Alt Text**: Always describe the image content
5. **Links**: Use descriptive anchor text
6. **Headings**: Use hierarchy (H2, H3, H4)

### Workflow

1. Create/edit content in CMS
2. Preview changes
3. Publish when ready
4. Changes appear on live site within minutes

## Support

For CMS setup assistance or custom integration needs, consult your development team.
