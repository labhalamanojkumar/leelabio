import { MetadataRoute } from 'next';

const BASE_URL = 'https://leelabiologics.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const currentDate = new Date().toISOString();

    // Core pages
    const corePages = [
        { url: '', priority: 1.0, changeFrequency: 'weekly' as const },
        { url: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
        { url: '/solutions', priority: 0.9, changeFrequency: 'weekly' as const },
        { url: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
        { url: '/facilities', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/careers', priority: 0.7, changeFrequency: 'weekly' as const },
        { url: '/news', priority: 0.7, changeFrequency: 'weekly' as const },
    ];

    // Solution pages (pillar pages - high priority)
    const solutionPages = [
        '/solutions/biologics-cdmo',
        '/solutions/biologics-manufacturing',
        '/solutions/cell-gene-therapy',
        '/solutions/nucleic-acid-therapeutics',
        '/solutions/analytical-solutions',
        '/solutions/scientific-writing',
        '/solutions/formulation-development',
        '/solutions/technical-support',
    ].map(url => ({
        url,
        priority: 0.9,
        changeFrequency: 'weekly' as const,
    }));

    // Legal pages
    const legalPages = [
        '/legal/privacy',
        '/legal/terms',
        '/legal/gmp-statement',
        '/legal/cookies',
    ].map(url => ({
        url,
        priority: 0.3,
        changeFrequency: 'yearly' as const,
    }));

    // Combine all pages
    const allPages = [...corePages, ...solutionPages, ...legalPages];

    return allPages.map(page => ({
        url: `${BASE_URL}${page.url}`,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
    }));
}
