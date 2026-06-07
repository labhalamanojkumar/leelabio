import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Manufacturing Facilities - GMP Biologics Production',
    description: 'Explore Leela Biologics\' state-of-the-art GMP manufacturing facilities, advanced cleanroom suites, high-capacity bioreactors, and analytical laboratories for biologics CDMO services.',
    keywords: [
        'GMP manufacturing facility',
        'biologics facility',
        'cleanroom suites',
        'bioreactor capacity',
        'CDMO facility',
        'downstream purification',
        'fill and finish',
        'analytical testing laboratory'
    ],
    openGraph: {
        title: 'State-of-the-Art Biologics Manufacturing Facilities',
        description: 'World-class GMP facilities designed for flexibility, scalability, and regulatory compliance across multiple biologic modalities.',
        type: 'website',
        url: `${SITE_CONFIG.url}/facilities`,
    },
    alternates: {
        canonical: `${SITE_CONFIG.url}/facilities`,
    },
};

const FACILITIES = [
    {
        name: 'Biologics Manufacturing Center',
        location: 'Visakhapatnam, Andhra Pradesh',
        description: 'Our flagship facility houses state-of-the-art biomanufacturing suites specifically designed for mammalian cell culture, offering seamless transitions from clinical to commercial-scale production.',
        capabilities: ['Up to 2,000L single-use bioreactors (SUBs)', 'Dedicated downstream purification suites (Chromatography, TFF)', 'Automated fill/finish lines (vials, syringes, cartridges)', 'Lyophilization capabilities'],
        certifications: ['FDA Compliant', 'EMA GMP Ready', 'ISO 9001:2015'],
    },
    {
        name: 'Cell & Gene Therapy Suite',
        location: 'Visakhapatnam, Andhra Pradesh',
        description: 'Dedicated, highly controlled cleanroom suites designed to handle complex ATMPs (Advanced Therapy Medicinal Products) including viral vector production and cell therapy processing.',
        capabilities: ['BSL-2 cleanroom suites', 'AAV and Lentiviral vector production', 'Closed-system cell isolation & expansion', 'Controlled-rate cryopreservation'],
        certifications: ['GMP Certified', 'AABB Guidelines Aligned'],
    },
    {
        name: 'Analytical Excellence Center',
        location: 'Visakhapatnam, Andhra Pradesh',
        description: 'Comprehensive analytical and QC laboratories supporting rapid method development, validation, and GMP release testing for complex biologics.',
        capabilities: ['High-Resolution Mass Spectrometry (HRMS) suite', 'Advanced Chromatography lab (HPLC, UPLC, SEC)', 'Cell-based bioassay lab', 'ICH-compliant stability testing chambers'],
        certifications: ['GLP Compliant', 'GMP Certified'],
    },
    {
        name: 'Nucleic Acid Therapeutics Center',
        location: 'Visakhapatnam, Andhra Pradesh',
        description: 'Specialized facility explicitly engineered for the production of mRNA therapeutics, oligonucleotide synthesis, and advanced Lipid Nanoparticle (LNP) formulation.',
        capabilities: ['In Vitro Transcription (IVT) production suites', 'Custom oligonucleotide synthesis', 'Microfluidic LNP formulation & mixing', 'TFF-based mRNA purification'],
        certifications: ['GMP Compliant', 'BSL-1/2 Capabilities'],
    },
];

export default function FacilitiesPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Leela Biologics Manufacturing Facilities',
        description: metadata.description,
        url: `${SITE_CONFIG.url}/facilities`,
        mainEntity: {
            '@type': 'MedicalOrganization',
            name: 'Leela Biologics Manufacturing Facilities',
            medicalSpecialty: ['Biologics Manufacturing', 'Pharmaceutical Development'],
        }
    };

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <section className={styles.hero} aria-labelledby="facilities-hero-title">
                <div className={styles.container}>
                    <header>
                        <span className={styles.badge}>Our Facilities</span>
                        <h1 id="facilities-hero-title" className={styles.heroTitle}>
                            State-of-the-Art
                            <span className={styles.accent}> Manufacturing Infrastructure</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            World-class GMP facilities designed for unparalleled flexibility, seamless scalability, and strict regulatory compliance across multiple complex biologic modalities.
                        </p>
                    </header>
                </div>
            </section>

            <section className={styles.overview} aria-label="Facility Statistics">
                <div className={styles.container}>
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>300,000+</span>
                            <span className={styles.statLabel}>Sq. Ft. Total Facility Space</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>10+</span>
                            <span className={styles.statLabel}>Classified Cleanroom Suites</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>2,000L</span>
                            <span className={styles.statLabel}>Max SUB Bioreactor Scale</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>24/7</span>
                            <span className={styles.statLabel}>Manufacturing Operations</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.centers} aria-labelledby="centers-title">
                <div className={styles.container}>
                    <h2 id="centers-title" className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        Specialized Development & Production Centers
                    </h2>
                    <div className={styles.facilitiesGrid}>
                        {FACILITIES.map((facility, index) => (
                            <article key={index} className={styles.facilityCard}>
                                <div className={styles.facilityHeader}>
                                    <h3>{facility.name}</h3>
                                    <span className={styles.location}>{facility.location}</span>
                                </div>
                                <div className={styles.facilityBody}>
                                    <p className={styles.facilityDesc}>{facility.description}</p>
                                    
                                    <div className={styles.capabilitiesList}>
                                        <h4>Key Capabilities:</h4>
                                        <ul>
                                            {facility.capabilities.map((cap, i) => (
                                                <li key={i}>{cap}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className={styles.certList}>
                                        <h4>Regulatory Standing:</h4>
                                        <div className={styles.badges}>
                                            {facility.certifications.map((cert, i) => (
                                                <span key={i} className={styles.smallBadge}>{cert}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.cta} aria-label="Take a tour">
                <div className={styles.container}>
                    <div className={styles.ctaCard} style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--color-surface-elevated)', borderRadius: '1rem', marginTop: '4rem' }}>
                        <h2>Schedule a Facility Audit or Virtual Tour</h2>
                        <p style={{ maxWidth: '600px', margin: '1rem auto 2rem' }}>
                            We welcome client audits and offer immersive virtual tours of our GMP manufacturing suites and analytical laboratories to demonstrate our commitment to transparency and quality.
                        </p>
                        <Link href="/contact" className={styles.ctaPrimary}>
                            Request a Tour
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
