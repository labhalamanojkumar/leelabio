import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import type { JSX } from 'react';
import { SERVICE_SECTIONS, SITE_CONFIG } from '@/lib/constants';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Services & Product Solutions | Leelabiologics',
    description: 'Explore our comprehensive portfolio across Biotechnology Products, Pharmaceutical Products, Medical Devices, Bioprocess Consumables, and Animal Healthcare Products.',
    keywords: [
        'biotechnology products',
        'pharmaceutical products',
        'medical devices',
        'bioprocess consumables',
        'animal healthcare products',
        'CDMO solutions',
        'GMP biologics manufacturing',
        'aseptic fill finish',
    ],
};

const SERVICE_ICONS: Record<string, JSX.Element> = {
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
        </svg>
    ),
    rna: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12c0-3.87 3.13-7 7-7 1.93 0 3.68.78 4.95 2.05" />
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
        </svg>
    ),
};

export default function SolutionsPage() {
    // Generate JSON-LD for the 5 Sections and their Subsections
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Services & Product Solutions - Leelabiologics',
        description: 'Comprehensive solutions across Biotechnology Products, Pharmaceutical Products, Medical Devices, Bioprocess Consumables, and Animal Healthcare.',
        url: `${SITE_CONFIG.url}/solutions`,
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: SERVICE_SECTIONS.flatMap((section, sIdx) => [
                {
                    '@type': 'ListItem',
                    position: (sIdx + 1) * 10,
                    item: {
                        '@type': 'Service',
                        name: section.title,
                        description: section.shortDescription,
                        url: `${SITE_CONFIG.url}/solutions/${section.slug}`,
                        provider: {
                            '@type': 'Organization',
                            name: 'Leelabiologics',
                        },
                    },
                },
                ...section.subsections.map((sub, subIdx) => ({
                    '@type': 'ListItem',
                    position: (sIdx + 1) * 10 + subIdx + 1,
                    item: {
                        '@type': 'Service',
                        name: sub.title,
                        description: sub.shortDescription,
                        url: `${SITE_CONFIG.url}/solutions/${sub.slug}`,
                        provider: {
                            '@type': 'Organization',
                            name: 'Leelabiologics',
                        },
                    },
                })),
            ]),
        },
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
                    <span className={styles.badge} style={{ color: 'var(--color-primary-900)' }}>
                        Services & Product Portfolio
                    </span>
                    <h1 className={styles.heroTitle} style={{ color: 'white' }}>
                        Integrated Life Sciences Solutions
                        <span className={styles.accent} style={{ display: 'block', color: 'var(--color-secondary-100)' }}>
                            From Discovery to Commercial Scale
                        </span>
                    </h1>
                    <p className={styles.heroSubtitle} style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '850px' }}>
                        Leelabiologics offers specialized, cGMP-compliant manufacturing, development, and supply across different core industry sectors. Explore our dedicated capabilities below.
                    </p>
                </div>
            </section>

            {/* Main Content Area */}
            <section className={styles.services}>
                <div className={styles.container}>
                    {/* Quick Jump Category Navigation */}
                    <nav className={styles.categoryNav} aria-label="Services categories">
                        {SERVICE_SECTIONS.map((sec, idx) => (
                            <a key={sec.id} href={`#${sec.slug}`} className={styles.categoryPill}>
                                <span>{String(idx + 1).padStart(2, '0')}.</span>
                                <span>{sec.title}</span>
                            </a>
                        ))}
                    </nav>

                    {/* 5 Primary Service Sections with Subsections */}
                    {SERVICE_SECTIONS.map((section, sIdx) => (
                        <div key={section.id} id={section.slug} className={styles.sectionBlock}>
                            <div className={styles.sectionHeaderBlock}>
                                <div className={styles.sectionHeaderInfo}>
                                    <span className={styles.sectionIndex}>
                                        Section {String(sIdx + 1).padStart(2, '0')}
                                    </span>
                                    <h2 className={styles.sectionMainTitle}>{section.title}</h2>
                                    <p className={styles.sectionMainDesc}>{section.shortDescription}</p>


                                </div>
                                <Link href={`/solutions/${section.slug}`} className={styles.sectionActionLink}>
                                    <span>Explore {section.title}</span>
                                    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>

                            {/* Subsections Grid */}
                            <div className={styles.subsectionsGrid}>
                                {section.subsections.map((sub) => (
                                    <Link
                                        key={sub.id}
                                        href={`/solutions/${sub.slug}`}
                                        className={styles.subsectionCard}
                                    >
                                        <div className={styles.subsectionCardHeader}>
                                            <div className={styles.subsectionIcon}>
                                                {SERVICE_ICONS[sub.icon || section.icon] || SERVICE_ICONS.flask}
                                            </div>
                                            <h3 className={styles.subsectionTitle}>{sub.title}</h3>
                                        </div>
                                        <p className={styles.subsectionDesc}>{sub.shortDescription}</p>

                                        {/* Capabilities Tags */}
                                        <div className={styles.capabilitiesTags}>
                                            {sub.capabilities.map((cap, cIdx) => (
                                                <span key={cIdx} className={styles.capabilityTag}>
                                                    {cap}
                                                </span>
                                            ))}
                                        </div>

                                        <div className={styles.subsectionFooter}>
                                            <span>Explore Details</span>
                                            <svg viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Capabilities Overview */}
            <section className={styles.capabilities} style={{ background: 'var(--color-gray-50)' }}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Quality & Compliance Framework</h2>
                        <p className={styles.sectionSubtitle}>
                            All our product and service divisions are backed by rigorous global quality systems, state-of-the-art cleanrooms, and cross-functional regulatory expertise.
                        </p>
                    </div>
                    <div className={styles.capabilitiesGrid}>
                        {[
                            {
                                label: 'Global Compliance Standards',
                                items: [
                                    'cGMP (21 CFR Part 210/211/600)',
                                    'EU GMP (EudraLex Volume 4)',
                                    'ISO 13485:2016 (Medical Devices)',
                                    'ISO 14971:2019 (Risk Management)',
                                    'ISO 9001:2015 Quality Systems',
                                    'GLP & OECD Laboratory Controls',
                                ],
                            },
                            {
                                label: 'Manufacturing & Scale',
                                items: [
                                    'Up to 2,000L Single-Use Bioreactors',
                                    'Small Molecule Pilot up to 5,000L',
                                    'Automated Aseptic Fill/Finish Lines',
                                    'Class 7/8 Cleanroom Device Assembly',
                                    'Gamma-Irradiated Single-Use Lines',
                                ],
                            },
                            {
                                label: 'Analytical & Testing Excellence',
                                items: [
                                    'High-Resolution Mass Spec (HRMS)',
                                    'UPLC/HPLC Impurity Profiling',
                                    'ICH Stability Storage (25/60, 30/65, 40/75)',
                                    'Cell-Based Potency Bioassays',
                                    'Biocompatibility (ISO 10993 Series)',
                                ],
                            },
                            {
                                label: 'Regulatory & Clinical Governance',
                                items: [
                                    'Clinical Evaluation Reports (CER/CEP)',
                                    'Post-Market Surveillance (PMS/PSUR)',
                                    'Post-Market Clinical Follow-up (PMCF)',
                                    'EU MDR (2017/745) & IVDR (2017/746)',
                                    'FDA 510(k), De Novo & PMA Clearance',
                                    'eCTD Submissions (IND, NDA, BLA, MAA)',
                                ],
                            },
                        ].map((capability, index) => (
                            <div key={index} className={`${styles.capabilityCard} glass-panel`}>
                                <h3 className={styles.capabilityTitle} style={{ color: 'var(--color-primary-600)' }}>
                                    {capability.label}
                                </h3>
                                <ul className={styles.capabilityList}>
                                    {capability.items.map((item, i) => (
                                        <li
                                            key={i}
                                            style={{
                                                borderBottom: '1px solid var(--color-gray-200)',
                                                paddingBottom: '8px',
                                                marginBottom: '8px',
                                            }}
                                        >
                                            {item}
                                        </li>
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
                        <h2 style={{ color: 'white', marginBottom: '16px' }}>
                            Ready to Accelerate Your Product Development?
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '24px', maxWidth: '720px' }}>
                            Speak with our technical leads and business development team to discuss technical feasibility, batch scheduling, or request a custom quote for your program.
                        </p>
                        <Link
                            href="/contact"
                            className={styles.ctaButton}
                            style={{
                                background: 'white',
                                color: 'var(--color-primary-700)',
                                padding: '12px 28px',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                display: 'inline-block',
                            }}
                        >
                            Schedule a Consultation / Request Quote
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
