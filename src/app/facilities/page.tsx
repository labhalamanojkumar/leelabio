import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Facilities - GMP Manufacturing & Development Centers',
    description: 'Tour our state-of-the-art GMP manufacturing facilities, cleanroom suites, bioreactor capacity, and specialized centers for biologics, cell therapy, and nucleic acids.',
    keywords: ['GMP manufacturing facility', 'biologics facility', 'cleanroom', 'bioreactor capacity', 'CDMO facility'],
};

const FACILITIES = [
    {
        name: 'Biologics Manufacturing Center',
        location: 'Research Triangle Park, NC',
        description: 'Our flagship 150,000 sq. ft. facility houses state-of-the-art biomanufacturing suites for clinical and commercial production.',
        capabilities: ['2,000L single-use bioreactors', 'Downstream purification suites', 'Fill/finish lines', 'Lyophilization'],
        certifications: ['FDA Registered', 'EMA GMP Certified', 'ISO 9001:2015'],
    },
    {
        name: 'Cell & Gene Therapy Suite',
        location: 'Research Triangle Park, NC',
        description: 'Dedicated cleanroom suites for viral vector production and cell therapy processing.',
        capabilities: ['BSL-2 suites', 'Viral vector production', 'Cell isolation & expansion', 'Cryopreservation'],
        certifications: ['FDA Registered', 'AABB Accredited'],
    },
    {
        name: 'Analytical Development Center',
        location: 'Research Triangle Park, NC',
        description: 'Comprehensive analytical and QC laboratories supporting method development and GMP testing.',
        capabilities: ['Mass spectrometry suite', 'Chromatography lab', 'Cell-based assay lab', 'Stability chambers'],
        certifications: ['GLP Compliant', 'FDA Registered'],
    },
    {
        name: 'Nucleic Acid Center',
        location: 'Research Triangle Park, NC',
        description: 'Specialized facility for mRNA production, oligonucleotide synthesis, and LNP formulation.',
        capabilities: ['IVT production suites', 'Oligo synthesis', 'LNP formulation', 'Microfluidics mixing'],
        certifications: ['FDA Registered', 'GMP Compliant'],
    },
];

export default function FacilitiesPage() {
    return (
        <>
            <section className={styles.hero}>
                <div className={styles.container}>
                    <span className={styles.badge}>Our Facilities</span>
                    <h1 className={styles.heroTitle}>
                        State-of-the-Art
                        <span className={styles.accent}> Manufacturing Infrastructure</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        World-class GMP facilities designed for flexibility, scalability, and
                        regulatory compliance across multiple biologic modalities.
                    </p>
                </div>
            </section>

            <section className={styles.overview}>
                <div className={styles.container}>
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>300,000+</span>
                            <span className={styles.statLabel}>Sq. Ft. Total Facility Space</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>10</span>
                            <span className={styles.statLabel}>Cleanroom Suites</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>2,000L</span>
                            <span className={styles.statLabel}>Max Bioreactor Scale</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>24/7</span>
                            <span className={styles.statLabel}>Manufacturing Operations</span>
                        </div>
                    </div>
                </div>
            </section>


        </>
    );
}
