import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import styles from '../legal.module.css';

export const metadata: Metadata = {
    title: 'Cookie Policy | Leela Biologics',
    description: 'Leela Biologics Cookie Policy explaining how we use cookies and tracking technologies to improve user experience and analyze website traffic.',
    keywords: [
        'cookie policy',
        'website tracking',
        'Leela Biologics cookies',
        'privacy',
        'data collection'
    ],
    openGraph: {
        title: 'Cookie Policy | Leela Biologics',
        description: 'Understand how Leela Biologics uses cookies to enhance your digital experience.',
        type: 'website',
        url: `${SITE_CONFIG.url}/legal/cookies`,
    },
    alternates: {
        canonical: `${SITE_CONFIG.url}/legal/cookies`,
    },
};

export default function CookiesPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Cookie Policy - Leela Biologics',
        description: metadata.description,
        url: `${SITE_CONFIG.url}/legal/cookies`,
    };

    return (
        <main className={styles.legal}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className={styles.container}>
                <article className={styles.legalCard}>
                    <header className={styles.header}>
                        <h1>Cookie Policy</h1>
                        <p className={styles.updated}>Last updated: December 2024</p>
                    </header>

                    <section>
                        <h2>1. What Are Cookies?</h2>
                        <p>
                            Cookies are small text files that are placed on your computer, smartphone, or other device when you visit a website. 
                            They are widely used to make websites work more efficiently, enhance the user experience, and provide vital analytical information to the website owners.
                        </p>
                    </section>

                    <section>
                        <h2>2. How We Use Cookies</h2>
                        <p>
                            Leela Biologics utilizes cookies to ensure our digital platforms operate securely and efficiently. We use cookies for the following purposes:
                        </p>
                        <ul>
                            <li><strong>Essential/Strictly Necessary Cookies:</strong> These are required for the operation of our website, such as enabling secure logins to client portals or navigating between pages smoothly. The website cannot function properly without these.</li>
                            <li><strong>Analytical/Performance Cookies:</strong> These allow us to recognize and count the number of visitors and see how visitors move around our site. This helps us improve the way our website works, ensuring users find what they are looking for easily.</li>
                            <li><strong>Functional Cookies:</strong> These are used to recognize you when you return to our website. They enable us to personalize our content for you and remember your preferences (for example, your choice of language or region).</li>
                            <li><strong>Targeting/Advertising Cookies:</strong> These cookies record your visit to our website, the pages you have visited, and the links you have followed. We use this information to make our website and the communications we send more relevant to your professional interests.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. Third-Party Cookies</h2>
                        <p>
                            In addition to our own cookies, we may also use various third-party cookies (e.g., Google Analytics, LinkedIn Insights) to report usage statistics, deliver B2B marketing efforts, and integrate with professional social media networks. These third parties have their own privacy and cookie policies.
                        </p>
                    </section>

                    <section>
                        <h2>4. Managing Your Cookie Preferences</h2>
                        <p>
                            You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by interacting with the cookie consent banner presented upon your first visit to our site.
                        </p>
                        <p>
                            Additionally, you can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted. 
                            For more information on how to manage cookies, please visit your browser&apos;s help documentation.
                        </p>
                    </section>

                    <section>
                        <h2>5. Updates to This Policy</h2>
                        <p>
                            We may update this Cookie Policy periodically in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                        </p>
                    </section>

                    <section>
                        <h2>6. Contact Us</h2>
                        <p>
                            If you have any questions about our use of cookies or other technologies, please contact us at:
                            <br /><br />
                            <strong>Email:</strong> privacy@leelabiologics.com
                        </p>
                    </section>
                </article>
            </div>
        </main>
    );
}
