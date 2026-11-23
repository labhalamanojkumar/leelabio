import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'News - Company Updates & Industry Insights',
    description: 'Stay updated with the latest news from Leelabiologics including company announcements, industry insights, and biologics development trends.',
    keywords: ['biologics news', 'CDMO updates', 'biotech industry news', 'company announcements'],
};

const NEWS_ITEMS = [
    {
        id: '1',
        title: 'Leelabiologics Expands Manufacturing Capacity with New 2000L Bioreactor Suite',
        date: '2024-12-01',
        category: 'Company News',
        summary: 'New manufacturing suite adds capacity for commercial-scale biologics production.',
    },
    {
        id: '2',
        title: 'Achieved FDA Approval Support for Third Client BLA Filing',
        date: '2024-11-15',
        category: 'Client Success',
        summary: 'Our team successfully supported another client through the BLA approval process.',
    },
    {
        id: '3',
        title: 'New Cell & Gene Therapy Cleanroom Suite Now Operational',
        date: '2024-10-20',
        category: 'Facilities',
        summary: 'Dedicated BSL-2 suites for viral vector and cell therapy manufacturing now available.',
    },
    {
        id: '4',
        title: 'Leelabiologics Presents at BIO International Convention',
        date: '2024-09-10',
        category: 'Events',
        summary: 'Our team presented on advances in mRNA manufacturing at BIO 2024.',
    },
    {
        id: '5',
        title: 'Q3 2024 Industry Report: Trends in Biologics Outsourcing',
        date: '2024-08-25',
        category: 'Industry Insights',
        summary: 'Analysis of key trends shaping the biologics CDMO landscape.',
    },
];

export default function NewsPage() {
    return (
        <>
            <section className={styles.hero}>
                <div className={styles.container}>
                    <span className={styles.badge}>News & Updates</span>
                    <h1 className={styles.heroTitle}>
                        Latest
                        <span className={styles.accent}> News</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Stay informed about company updates, industry insights, and the
                        latest developments in biologics manufacturing.
                    </p>
                </div>
            </section>

            <section className={styles.news}>
                <div className={styles.container}>
                    <div className={styles.newsList}>
                        {NEWS_ITEMS.map((item) => (
                            <article key={item.id} className={styles.newsCard}>
                                <div className={styles.newsContent}>
                                    <div className={styles.newsMeta}>
                                        <span className={styles.category}>{item.category}</span>
                                        <span className={styles.date}>{item.date}</span>
                                    </div>
                                    <h2 className={styles.newsTitle}>{item.title}</h2>
                                    <p className={styles.newsSummary}>{item.summary}</p>
                                    <Link href={`/news/${item.id}`} className={styles.readMore}>
                                        Read More →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.newsletter}>
                <div className={styles.container}>
                    <div className={styles.newsletterCard}>
                        <h2>Subscribe to Our Newsletter</h2>
                        <p>Get the latest news and insights delivered to your inbox.</p>
                        <form className={styles.newsletterForm}>
                            <input type="email" placeholder="Enter your email" />
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
