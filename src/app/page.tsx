import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { SERVICES, SITE_CONFIG } from '@/lib/constants';
import styles from './page.module.css';

export default function HomePage() {
    // Generate Organization and WebSite Schema for the homepage
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Corporation',
                '@id': `${SITE_CONFIG.url}/#organization`,
                name: SITE_CONFIG.name,
                url: SITE_CONFIG.url,
                logo: `${SITE_CONFIG.url}/logo.png`,
                description: SITE_CONFIG.description,
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Plot No. 12, Phase II, Biotech Park',
                    addressLocality: 'Genome Valley, Hyderabad',
                    postalCode: '500078',
                    addressCountry: 'IN'
                },
                contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: SITE_CONFIG.phone,
                    contactType: 'customer service',
                    email: SITE_CONFIG.email,
                    availableLanguage: ['English', 'Hindi']
                },
                sameAs: [
                    'https://www.linkedin.com/company/leelabiologics',
                    'https://twitter.com/leelabiologics'
                ]
            },
            {
                '@type': 'WebSite',
                '@id': `${SITE_CONFIG.url}/#website`,
                url: SITE_CONFIG.url,
                name: SITE_CONFIG.name,
                publisher: {
                    '@id': `${SITE_CONFIG.url}/#organization`
                }
            }
        ]
    };

    return (
        <>
            <Script
                id="homepage-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={`${styles.heroBackground} enterprise-gradient-bg`}>
                    <div className={styles.heroPattern}></div>
                </div>
                <div className={styles.heroContent}>
                    <span className={styles.heroBadge}>
                        <span className={styles.badgeDot}></span>
                        Global Biotech Enterprise
                    </span>
                    <h1 className={styles.heroTitle} style={{ color: 'white' }}>
                        Accelerating the Future of
                        <span style={{ display: 'block', color: 'var(--color-secondary-100)' }}>Biologics Medicine</span>
                    </h1>
                    <p className={styles.heroSubtitle} style={{ color: 'rgba(255,255,255,0.9)' }}>
                        A premier global CDMO empowering pharmaceutical innovators with world-class drug development, commercial manufacturing, and advanced analytical solutions for next-generation therapeutics.
                    </p>
                    <div className={styles.heroCtas}>
                        <Link href="/contact" className={styles.ctaPrimary}>
                            Partner With Us
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                        <Link href="/solutions" className={styles.ctaSecondary}>
                            Explore Solutions
                        </Link>
                    </div>
                    <div className={styles.heroTrust}>
                        <span className={styles.trustLabel} style={{ color: 'rgba(255,255,255,0.7)' }}>Trusted by leading biopharma innovators worldwide</span>
                    </div>
                </div>
                <div className={styles.heroVisual}>
                    <div className={styles.heroImageWrapper}>
                        <Image
                            src="/images/hero-patient.png"
                            alt="Advanced biologics facility operations representing global manufacturing scale"
                            width={600}
                            height={450}
                            className={styles.heroImage}
                            priority
                        />
                    </div>
                    <div className={`${styles.heroCardSmall} glass-panel`}>
                        <span className={styles.heroCardSmallIcon}>✓</span>
                        <span style={{ color: 'var(--color-gray-900)'}}>FDA & EMA Ready Facilities</span>
                    </div>
                    <div className={`${styles.heroCardSmall} glass-panel`} style={{ animationDelay: '0.2s' }}>
                        <span className={styles.heroCardSmallIcon}>✓</span>
                        <span style={{ color: 'var(--color-gray-900)'}}>Commercial Scale Supply</span>
                    </div>
                </div>
            </section>

            {/* Global Footprint Section */}
            <section className={`${styles.stats} enterprise-gradient-bg`}>
                <div className={styles.container}>
                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>25+</span>
                            <span className={styles.statLabel}>Years of Scientific Excellence</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>500+</span>
                            <span className={styles.statLabel}>Global Biopharma Partners</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>12+</span>
                            <span className={styles.statLabel}>Commercial Approvals Supported</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>Global</span>
                            <span className={styles.statLabel}>Supply Chain Network</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className={styles.services}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionLabel}>Enterprise Capabilities</span>
                        <h2 className={styles.sectionTitle}>
                            End-to-End Biologics Solutions
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            From cell line development to commercial manufacturing, our global network provides fully integrated capabilities to de-risk your development and accelerate time-to-market.
                        </p>
                    </div>
                    <div className={styles.servicesGrid}>
                        {SERVICES.map((service, index) => (
                            <Link
                                href={`/solutions/${service.slug}`}
                                key={service.id}
                                className={styles.serviceCard}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className={styles.serviceIcon}>
                                    {getServiceIcon(service.icon)}
                                </div>
                                <h3 className={styles.serviceTitle}>{service.title}</h3>
                                <p className={styles.serviceDescription}>{service.shortDescription}</p>
                                <span className={styles.serviceLink}>
                                    Learn more
                                    <svg viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className={styles.whyUs}>
                <div className={styles.container}>
                    <div className={styles.whyUsGrid}>
                        <div className={styles.whyUsContent}>
                            <span className={styles.sectionLabel}>The Enterprise Advantage</span>
                            <h2 className={styles.sectionTitle}>
                                Global Scale, Uncompromising Quality
                            </h2>
                            <p className={styles.whyUsText}>
                                As a premier CDMO, we combine deep scientific expertise with state-of-the-art facilities across our global network, ensuring robust, scalable, and regulatory-compliant manufacturing for your life-saving therapeutics.
                            </p>
                            <ul className={styles.whyUsList}>
                                <li className={styles.whyUsItem}>
                                    <span className={styles.whyUsIcon}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                            <polyline points="22 4 12 14.01 9 11.01" />
                                        </svg>
                                    </span>
                                    <div>
                                        <strong>Fully Integrated CDMO</strong>
                                        <span>Seamless tech transfer from preclinical to commercial scale.</span>
                                    </div>
                                </li>
                                <li className={styles.whyUsItem}>
                                    <span className={styles.whyUsIcon}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                            <polyline points="22 4 12 14.01 9 11.01" />
                                        </svg>
                                    </span>
                                    <div>
                                        <strong>Global Regulatory Excellence</strong>
                                        <span>Proven track record with FDA, EMA, and global health authorities.</span>
                                    </div>
                                </li>
                                <li className={styles.whyUsItem}>
                                    <span className={styles.whyUsIcon}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                            <polyline points="22 4 12 14.01 9 11.01" />
                                        </svg>
                                    </span>
                                    <div>
                                        <strong>Advanced Technologies</strong>
                                        <span>Pioneering single-use systems and continuous bioprocessing.</span>
                                    </div>
                                </li>
                                <li className={styles.whyUsItem}>
                                    <span className={styles.whyUsIcon}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                            <polyline points="22 4 12 14.01 9 11.01" />
                                        </svg>
                                    </span>
                                    <div>
                                        <strong>Dedicated Alliance Management</strong>
                                        <span>Strategic partnership models tailored to enterprise portfolios.</span>
                                    </div>
                                </li>
                            </ul>
                            <Link href="/about" className={styles.whyUsLink}>
                                Discover our corporate vision
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>
                        <div className={styles.whyUsVisual}>
                            <div className={styles.whyUsImage}>
                                <Image
                                    src="/images/patient-sma.png"
                                    alt="Advanced analytical laboratory testing for biologics"
                                    width={560}
                                    height={400}
                                    className={styles.whyUsMainImage}
                                />
                            </div>
                            <div className={styles.whyUsImageSecondary}>
                                <Image
                                    src="/images/patient-geriatric.png"
                                    alt="Cleanroom manufacturing operations at scale"
                                    width={280}
                                    height={200}
                                    className={styles.whyUsSecImage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pipeline Section */}
            <section className={styles.pipeline}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionLabel}>Lifecycle Management</span>
                        <h2 className={styles.sectionTitle}>
                            Accelerating Your Pipeline to Market
                        </h2>
                    </div>
                    <div className={styles.pipelineTrack}>
                        <div className={styles.pipelineLine}></div>
                        <div className={styles.pipelineStages}>
                            {[
                                { label: 'Discovery Support', icon: '🔬' },
                                { label: 'Preclinical / IND', icon: '🧪' },
                                { label: 'CMC & Process Dev', icon: '⚗️' },
                                { label: 'Clinical Supply', icon: '🏭' },
                                { label: 'Commercial Manufacturing', icon: '📦' },
                            ].map((stage, index) => (
                                <div key={index} className={styles.pipelineStage}>
                                    <div className={styles.pipelineNode}>
                                        <span>{stage.icon}</span>
                                    </div>
                                    <span className={styles.pipelineLabel}>{stage.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.pipelineCta}>
                        <Link href="/contact" className={styles.ctaSecondary}>
                            Discuss Your Pipeline Strategy
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.cta}>
                <div className={styles.container}>
                    <div className={styles.ctaCard}>
                        <div className={styles.ctaContent}>
                            <h2 className={styles.ctaTitle}>
                                Secure Your Supply Chain with a Global Leader
                            </h2>
                            <p className={styles.ctaText}>
                                Connect with our executive business development team to discuss your capacity requirements, technology transfer needs, or strategic portfolio alliances.
                            </p>
                            <div className={styles.ctaButtons}>
                                <Link href="/contact" className={styles.ctaPrimary}>
                                    Contact Business Development
                                </Link>
                            </div>
                        </div>
                        <div className={styles.ctaInfo}>
                            <div className={styles.ctaInfoItem}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>{SITE_CONFIG.email}</span>
                            </div>
                            <div className={styles.ctaInfoItem}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                </svg>
                                <span>{SITE_CONFIG.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

// Helper function for service icons
function getServiceIcon(icon: string) {
    const icons: Record<string, JSX.Element> = {
        flask: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 3h6M12 3v6l6 9H6l6-9V3" />
            </svg>
        ),
        factory: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 20V8l5 4V8l5 4V8l5 4v12H2zM17 8V4h4v16h-4" />
            </svg>
        ),
        dna: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 15c6.667-6 13.333 0 20-6M2 9c6.667 6 13.333 0 20 6" />
                <path d="M5 3v18M19 3v18" />
                <circle cx="5" cy="9" r="1" /><circle cx="5" cy="15" r="1" />
                <circle cx="19" cy="9" r="1" /><circle cx="19" cy="15" r="1" />
            </svg>
        ),
        rna: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12c0-3.87 3.13-7 7-7 1.93 0 3.68.78 4.95 2.05L12 10l2.95 2.95A6.978 6.978 0 0114 19c-3.87 0-7-3.13-7-7" />
                <circle cx="17" cy="7" r="4" />
            </svg>
        ),
        microscope: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18h8M3 22h18M14 22v-5a6 6 0 00-6-6H6M12 2v8" />
                <circle cx="12" cy="8" r="2" />
            </svg>
        ),
        document: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
            </svg>
        ),
        support: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
                <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
                <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
                <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
                <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
            </svg>
        ),
    };
    return icons[icon] || icons.flask;
}
