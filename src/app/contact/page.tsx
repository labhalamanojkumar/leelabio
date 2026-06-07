import type { Metadata } from 'next';
import Script from 'next/script';
import { SITE_CONFIG, MODALITIES, PROJECT_TIMELINES } from '@/lib/constants';
import styles from './page.module.css';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
    title: 'Global Contact & Alliance Management | Leela Biologics CDMO',
    description: 'Partner with Leela Biologics. Contact our global business development team to discuss enterprise CDMO solutions, request an RFP, or schedule an executive consultation.',
    keywords: ['contact biologics CDMO', 'global CDMO alliance', 'RFP biologics manufacturing', 'enterprise biotech partnership'],
};

export default function ContactPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact Leela Biologics - Global CDMO',
        description: 'Contact information for global business development and alliance management.',
        url: `${SITE_CONFIG.url}/contact`,
        mainEntity: {
            '@type': 'Organization',
            name: 'Leela Biologics',
            contactPoint: [
                {
                    '@type': 'ContactPoint',
                    telephone: SITE_CONFIG.phone,
                    contactType: 'Business Development',
                    email: SITE_CONFIG.email,
                    areaServed: 'Worldwide',
                    availableLanguage: ['English']
                }
            ],
            location: [
                {
                    '@type': 'Place',
                    name: 'Global Headquarters & Manufacturing Center',
                    address: {
                        '@type': 'PostalAddress',
                        streetAddress: SITE_CONFIG.address.street,
                        addressLocality: SITE_CONFIG.address.city,
                        addressRegion: SITE_CONFIG.address.state,
                        postalCode: SITE_CONFIG.address.zip,
                        addressCountry: SITE_CONFIG.address.country
                    }
                }
            ]
        }
    };

    return (
        <>
            <Script
                id="contact-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero */}
            <section className={`${styles.hero} enterprise-gradient-bg`}>
                <div className={styles.container}>
                    <span className={styles.badge} style={{ color: 'var(--color-primary-900)' }}>Global Alliance Management</span>
                    <h1 className={styles.heroTitle} style={{ color: 'white' }}>
                        Accelerate Your
                        <span className={styles.accent} style={{ display: 'block', color: 'var(--color-secondary-100)' }}> Global Commercialization Strategy</span>
                    </h1>
                    <p className={styles.heroSubtitle} style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '800px' }}>
                        Connect with our executive business development team to discuss capacity reservations, strategic partnerships, and end-to-end CDMO solutions for your critical biologics pipeline.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className={styles.contact} style={{ background: 'var(--color-gray-50)' }}>
                <div className={styles.container}>
                    <div className={styles.contactGrid}>
                        {/* Form */}
                        <div className={`${styles.formSection} glass-panel`} style={{ padding: '40px', borderRadius: '16px' }}>
                            <h2 style={{ color: 'var(--color-primary-800)', marginBottom: '8px' }}>Request for Proposal (RFP)</h2>
                            <p className={styles.formIntro} style={{ marginBottom: '32px' }}>
                                Provide details about your clinical or commercial manufacturing requirements. A senior alliance manager will respond within 24 business hours.
                            </p>

                            <ContactForm />
                        </div>

                        {/* Contact Info Sidebar */}
                        <div className={styles.infoSection}>
                            <div className={`${styles.infoCard} glass-panel`} style={{ borderTop: '4px solid var(--color-primary-500)' }}>
                                <h3>Global Business Development</h3>
                                <div className={styles.contactItem}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-500)" strokeWidth="2">
                                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <div>
                                        <span className={styles.contactLabel}>Alliance Management</span>
                                        <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>
                                    </div>
                                </div>
                                <div className={styles.contactItem}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-500)" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                    </svg>
                                    <div>
                                        <span className={styles.contactLabel}>Executive Office</span>
                                        <a href={`tel:${SITE_CONFIG.phone}`}>{SITE_CONFIG.phone}</a>
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles.infoCard} glass-panel`}>
                                <h3>Global Headquarters</h3>
                                <address className={styles.address}>
                                    <strong>Leela Biologics Campus</strong><br />
                                    {SITE_CONFIG.address.street}<br />
                                    {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} {SITE_CONFIG.address.zip}<br />
                                    {SITE_CONFIG.address.country}
                                </address>
                            </div>

                            <div className={`${styles.infoCard} glass-panel`}>
                                <h3>Strategic Engagement Process</h3>
                                <ol className={styles.processList}>
                                    <li>
                                        <span style={{ background: 'var(--color-primary-100)', color: 'var(--color-primary-700)' }}>1</span>
                                        <div>
                                            <strong>Technical Evaluation</strong>
                                            <p>Our SMEs review your high-level requirements.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <span style={{ background: 'var(--color-primary-100)', color: 'var(--color-primary-700)' }}>2</span>
                                        <div>
                                            <strong>CDA & Deep Dive</strong>
                                            <p>Secure exchange of technical data under CDA.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <span style={{ background: 'var(--color-primary-100)', color: 'var(--color-primary-700)' }}>3</span>
                                        <div>
                                            <strong>Formal Proposal</strong>
                                            <p>Detailed technical, timeline, and commercial offer.</p>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
