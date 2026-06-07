import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../solution.module.css';

export const metadata: Metadata = {
    title: 'Cell & Gene Therapy Manufacturing Services',
    description: 'Expert cell and gene therapy CDMO services including viral vector production, CAR-T processing, GMP manufacturing, and advanced therapy medicinal products (ATMP) support.',
    keywords: ['cell gene therapy CDMO', 'viral vector manufacturing', 'CAR-T manufacturing', 'ATMP', 'gene therapy production'],
};

export default function CellGeneTherapyPage() {
    return (
        <>
            <section className={styles.hero}>
                <div className={styles.heroBackground}></div>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <Link href="/solutions" className={styles.breadcrumb}>← Back to Solutions</Link>
                        <span className={styles.badge}>Cell & Gene Therapy</span>
                        <h1 className={styles.heroTitle}>
                            Next-Generation
                            <span className={styles.accent}> Cell & Gene Therapy</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            From viral vector production to CAR-T cell processing, we provide comprehensive
                            manufacturing solutions for advanced therapy medicinal products (ATMPs).
                        </p>
                        <div className={styles.heroCtas}>
                            <Link href="/contact" className={styles.ctaPrimary}>Request a Quote</Link>
                            <Link href="#capabilities" className={styles.ctaSecondary}>View Capabilities</Link>
                        </div>
                    </div>
                    <div className={styles.heroStats}>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>AAV, Lenti, Adeno</span>
                            <span className={styles.statLabel}>Vector Platforms</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>GMP Certified</span>
                            <span className={styles.statLabel}>Clean Room Suites</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.overview}>
                <div className={styles.container}>
                    <div className={styles.overviewGrid}>
                        <div className={styles.overviewContent}>
                            <h2>Advancing Curative Therapies</h2>
                            <p>
                                Cell and gene therapies represent the frontier of medicine, offering
                                potential cures for previously untreatable diseases. Our dedicated
                                facilities and specialized teams support the development and manufacture
                                of these transformative therapies.
                            </p>
                            <h3>Our Capabilities Include</h3>
                            <ul className={styles.checkList}>
                                <li>Viral vector production (AAV, Lentivirus, Adenovirus)</li>
                                <li>Plasmid DNA manufacturing</li>
                                <li>Cell therapy processing (CAR-T, CAR-NK, TIL)</li>
                                <li>GMP-grade viral testing and safety panels</li>
                                <li>Potency assay development and validation</li>
                                <li>Regulatory support for ATMP filings</li>
                            </ul>
                        </div>
                        <div className={styles.overviewVisual}>
                            <Image 
                                src="/images/cell-therapy-lab.png" 
                                alt="Modern high-tech Cell and Gene Therapy laboratory" 
                                width={800} 
                                height={600} 
                                className={styles.overviewImg} 
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section id="capabilities" className={styles.capabilities}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2>Cell & Gene Therapy Services</h2>
                        <p>Comprehensive support for your advanced therapy programs.</p>
                    </div>
                    <div className={styles.capabilitiesGrid}>
                        {[
                            { title: 'Viral Vector Production', desc: 'Scalable manufacturing of AAV, lentiviral, and adenoviral vectors.', features: ['Transient and stable production', 'Scale-up to 500L', 'Downstream purification', 'Full characterization'] },
                            { title: 'Plasmid DNA', desc: 'High-quality plasmid manufacturing for vector production and gene therapy.', features: ['Research to GMP grade', 'Endotoxin-free', 'Supercoiled DNA', 'Custom modifications'] },
                            { title: 'Cell Processing', desc: 'Autologous and allogeneic cell therapy manufacturing support.', features: ['Cell isolation & activation', 'Viral transduction', 'Expansion protocols', 'Cryopreservation'] },
                            { title: 'Testing & Release', desc: 'Comprehensive analytical testing for ATMP release.', features: ['Viral safety testing', 'Potency assays', 'Identity testing', 'Sterility & endotoxin'] }
                        ].map((item, i) => (
                            <div key={i} className={styles.capabilityCard}>
                                <span className={styles.capabilityNumber}>{String(i + 1).padStart(2, '0')}</span>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                                <ul>{item.features.map((f, j) => <li key={j}>{f}</li>)}</ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.cta}>
                <div className={styles.container}>
                    <div className={styles.ctaCard}>
                        <h2>Partner with Our Cell & Gene Therapy Experts</h2>
                        <p>Discuss your ATMP development needs with our specialized team.</p>
                        <div className={styles.ctaButtons}>
                            <Link href="/contact" className={styles.ctaButtonPrimary}>Contact Us</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
