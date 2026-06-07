import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { SERVICES, SITE_CONFIG } from '@/lib/constants';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Enterprise Biologics Solutions | Leela Biologics CDMO',
    description: 'Explore our comprehensive, end-to-end CDMO solutions including Cell Line Development, Commercial Biologics Manufacturing, and Advanced Therapies.',
    keywords: ['enterprise biologics', 'global CDMO solutions', 'commercial biologics manufacturing', 'advanced therapies'],
};

const SERVICE_ICONS: Record<string, JSX.Element> = {
    flask: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 3h6M12 3v6l6 9H6l6-9V3" /></svg>,
    factory: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 20V8l5 4V8l5 4V8l5 4v12H2zM17 8V4h4v16h-4" /></svg>,
    dna: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 15c6.667-6 13.333 0 20-6M2 9c6.667 6 13.333 0 20 6" /><path d="M5 3v18M19 3v18" /></svg>,
    rna: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12c0-3.87 3.13-7 7-7 1.93 0 3.68.78 4.95 2.05" /><circle cx="17" cy="7" r="4" /></svg>,
    microscope: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18h8M3 22h18M14 22v-5a6 6 0 00-6-6H6M12 2v8" /><circle cx="12" cy="8" r="2" /></svg>,
    document: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>,
    support: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /></svg>,
};

export default function SolutionsPage() {
    // Generate JSON-LD for the Solutions Hub
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Enterprise Biologics Solutions',
        description: 'Comprehensive biologics manufacturing and development services provided by a premier global CDMO.',
        url: `${SITE_CONFIG.url}/solutions`,
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: SERVICES.map((service, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@type': 'Service',
                    name: service.title,
                    description: service.shortDescription,
                    url: `${SITE_CONFIG.url}/solutions/${service.slug}`,
                    provider: {
                        '@type': 'Organization',
                        name: 'Leela Biologics'
                    }
                }
            }))
        }
    };

    return (
        <>
            <Script
                id="solutions-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero */}
            <section className={`${styles.hero} enterprise-gradient-bg`}>
                <div className={styles.container}>
                    <span className={styles.badge} style={{ color: 'var(--color-primary-900)' }}>Enterprise Solutions Hub</span>
                    <h1 className={styles.heroTitle} style={{ color: 'white' }}>
                        End-to-End Biologics
                        <span className={styles.accent} style={{ display: 'block', color: 'var(--color-secondary-100)' }}> Development & Commercial Supply</span>
                    </h1>
                    <p className={styles.heroSubtitle} style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '800px' }}>
                        Leverage our global network, state-of-the-art infrastructure, and decades of scientific expertise. We provide a fully integrated, scalable model that accelerates your path to market—from early-stage discovery and CMC through to global commercial manufacturing and regulatory approval.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className={styles.services}>
                <div className={styles.container}>
                    <div className={styles.servicesGrid}>
                        {SERVICES.map((service, index) => (
                            <Link
                                href={`/solutions/${service.slug}`}
                                key={service.id}
                                className={`${styles.serviceCard} glass-panel`}
                                style={{
                                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
                                    opacity: 0
                                }}
                            >
                                <div className={styles.serviceIcon}>
                                    {SERVICE_ICONS[service.icon] || SERVICE_ICONS.flask}
                                </div>
                                <div className={styles.serviceContent}>
                                    <h2 className={styles.serviceTitle}>{service.title}</h2>
                                    <p className={styles.serviceDescription}>{service.shortDescription}</p>
                                    <span className={styles.serviceLink}>
                                        Explore Capability
                                        <svg viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Capabilities Overview */}
            <section className={styles.capabilities} style={{ background: 'var(--color-gray-50)' }}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Global Capabilities at a Glance</h2>
                        <p className={styles.sectionSubtitle}>
                            Our world-class facilities and expert cross-functional teams support diverse, highly complex biologics programs at scale.
                        </p>
                    </div>
                    <div className={styles.capabilitiesGrid}>
                        {[
                            { label: 'Modalities Supported', items: ['Monoclonal Antibodies (mAbs)', 'Bispecifics & Multispecifics', 'Antibody-Drug Conjugates (ADCs)', 'Viral Vectors (AAV, Lentivirus)', 'mRNA Therapeutics', 'Cell Therapies'] },
                            { label: 'Development Services', items: ['High-Throughput Cell Line Development', 'Robust Process Development', 'Formulation Optimization', 'Advanced Analytical Methods', 'Seamless Tech Transfer'] },
                            { label: 'Manufacturing Scale', items: ['1L - 2000L Single-Use Bioreactors', 'Fed-Batch & Perfusion Processes', 'Aseptic Fill/Finish', 'Lyophilization', 'Global Cold Chain Supply'] },
                            { label: 'Quality & Regulatory', items: ['Strict cGMP/GLP Compliance', 'FDA, EMA, and PMDA Audited', 'Comprehensive QA/QC Programs', 'ICH Stability Studies', 'Global Regulatory Filing Support'] },
                        ].map((capability, index) => (
                            <div key={index} className={`${styles.capabilityCard} glass-panel`}>
                                <h3 className={styles.capabilityTitle} style={{ color: 'var(--color-primary-600)' }}>{capability.label}</h3>
                                <ul className={styles.capabilityList}>
                                    {capability.items.map((item, i) => (
                                        <li key={i} style={{ borderBottom: '1px solid var(--color-gray-200)', paddingBottom: '8px', marginBottom: '8px' }}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={styles.cta}>
                <div className={styles.container}>
                    <div className={`${styles.ctaCard} enterprise-gradient-bg`}>
                        <h2 style={{ color: 'white', marginBottom: '16px' }}>Ready to Scale Your Program?</h2>
                        <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '24px' }}>
                            Our strategic alliance management team is ready to design a tailored manufacturing and development strategy for your enterprise portfolio.
                        </p>
                        <Link href="/contact" className={styles.ctaButton} style={{ background: 'white', color: 'var(--color-primary-700)', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold' }}>
                            Schedule an Executive Consultation
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
