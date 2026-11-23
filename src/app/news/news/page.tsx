import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Biologics News & Industry Insights | Leelabiologics',
    description: 'Read the latest press releases, company announcements, and expert insights on biologics CDMO trends, GMP manufacturing, and cell & gene therapy from Leelabiologics.',
    keywords: [
        'biologics news',
        'CDMO updates',
        'biotech industry news',
        'GMP manufacturing press release',
        'Leelabiologics announcements'
    ],
    openGraph: {
        title: 'Leelabiologics News & Insights',
        description: 'Stay updated with the latest in biologics manufacturing, company milestones, and industry trends.',
        type: 'website',
        url: `${SITE_CONFIG.url}/news`,
    },
    alternates: {
        canonical: `${SITE_CONFIG.url}/news`,
    },
};

const NEWS_ITEMS = [
    {
        id: '1',
        title: 'Leelabiologics Expands Commercial Manufacturing Capacity with New 2000L SUB Suite',
        date: '2024-12-01',
        category: 'Company Expansion',
        summary: 'To meet growing global demand for mammalian-expressed biologics, Leelabiologics has successfully commissioned a new cGMP suite featuring dual 2000L Single-Use Bioreactors (SUBs).',
    },
    {
        id: '2',
        title: 'Achieved FDA Pre-Approval Inspection (PAI) Success for Client BLA Filing',
        date: '2024-11-15',
        category: 'Regulatory Milestone',
        summary: 'Our quality and operations teams successfully supported a major client through a rigorous FDA PAI, resulting in zero Form 483 observations.',
    },
    {
        id: '3',
        title: 'Next-Generation Cell & Gene Therapy Cleanroom Suite Now Fully Operational',
        date: '2024-10-20',
        category: 'Facilities',
        summary: 'Expanding our ATMP capabilities, our new dedicated BSL-2 suites for AAV/Lentiviral vector and CAR-T cell therapy manufacturing are now taking clinical projects.',
    },
    {
        id: '4',
        title: 'Leelabiologics Presents Novel LNP Formulation Strategies at BIO International 2024',
        date: '2024-09-10',
        category: 'Events & Conferences',
        summary: 'Our Chief Scientific Officer presented breakthrough data on improving mRNA stability via advanced microfluidic LNP formulation techniques at BIO 2024.',
    },
    {
        id: '5',
        title: 'Whitepaper: Accelerating Tech Transfer for Complex Monoclonal Antibodies',
        date: '2024-08-25',
        category: 'Industry Insights',
        summary: 'A deep dive into our proprietary tech transfer framework that reduces scale-up timelines by 30% while ensuring robust process comparability.',
    },
];

export default function NewsPage() {
    const newsSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: NEWS_ITEMS.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'NewsArticle',
                headline: item.title,
                datePublished: item.date,
                description: item.summary,
                url: `${SITE_CONFIG.url}/news/${item.id}`,
                publisher: {
                    '@type': 'Organization',
                    name: SITE_CONFIG.name,
                    logo: {
                        '@type': 'ImageObject',
                        url: `${SITE_CONFIG.url}/images/logo.png`
                    }
                }
            }
        }))
    };

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(newsSchema) }}
            />

            <section className={styles.hero} aria-labelledby="news-hero">
                <div className={styles.container}>
                    <header>
                        <span className={styles.badge}>Newsroom</span>
                        <h1 id="news-hero" className={styles.heroTitle}>
                            Latest Updates &
                            <span className={styles.accent}> Industry Insights</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Stay informed with our latest press releases, facility expansions, regulatory milestones, and expert analyses shaping the biomanufacturing landscape.
                        </p>
                    </header>
                </div>
            </section>

            <section className={styles.news} aria-label="Latest News Articles">
                <div className={styles.container}>
                    <div className={styles.newsList}>
                        {NEWS_ITEMS.map((item) => (
                            <article key={item.id} className={styles.newsCard}>
                                <div className={styles.newsContent}>
                                    <header className={styles.newsMeta}>
                                        <span className={styles.category}>{item.category}</span>
                                        <time dateTime={item.date} className={styles.date}>
                                            {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </time>
                                    </header>
                                    <h2 className={styles.newsTitle}>
                                        <Link href={`/news/${item.id}`} className={styles.titleLink}>
                                            {item.title}
                                        </Link>
                                    </h2>
                                    <p className={styles.newsSummary}>{item.summary}</p>
                                    <Link href={`/news/${item.id}`} className={styles.readMore} aria-label={`Read more about ${item.title}`}>
                                        Read Full Story &rarr;
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.newsletter} aria-labelledby="newsletter-title">
                <div className={styles.container}>
                    <aside className={styles.newsletterCard}>
                        <h2 id="newsletter-title">Subscribe to the Leelabiologics Newsletter</h2>
                        <p>Receive bi-monthly updates on CDMO capacity, whitepapers, and regulatory insights directly to your inbox.</p>
                        <form className={styles.newsletterForm}>
                            <label htmlFor="email-input" className="sr-only">Email Address</label>
                            <input id="email-input" type="email" placeholder="Enter your corporate email address" required />
                            <button type="button" aria-label="Subscribe">Subscribe</button>
                        </form>
                    </aside>
                </div>
            </section>
        </main>
    );
}
