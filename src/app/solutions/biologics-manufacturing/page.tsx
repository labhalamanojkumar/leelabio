import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../solution.module.css';

export const metadata: Metadata = {
    title: 'Biologics Manufacturing - GMP Clinical & Commercial Production',
    description: 'GMP biologics manufacturing from 1L to 2000L scale. Clinical and commercial production of mAbs, bispecifics, and recombinant proteins with fill/finish capabilities.',
    keywords: ['biologics manufacturing', 'GMP production', 'commercial manufacturing', 'clinical manufacturing', 'fill finish'],
};

export default function BiologicsManufacturingPage() {
    return (
        <>
            <section className={styles.hero}>
                <div className={styles.heroBackground}></div>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <Link href="/solutions" className={styles.breadcrumb}>← Back to Solutions</Link>
                        <span className={styles.badge}>GMP Manufacturing</span>
                        <h1 className={styles.heroTitle}>
                            Clinical & Commercial
                            <span className={styles.accent}> Biologics Manufacturing</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            From Phase I clinical trials to commercial launch, our GMP facilities
                            deliver the quality, flexibility, and reliability your biologics program demands.
                        </p>
                        <div className={styles.heroCtas}>
                            <Link href="/contact" className={styles.ctaPrimary}>Request a Quote</Link>
                            <Link href="#capabilities" className={styles.ctaSecondary}>View Capabilities</Link>
                        </div>
                    </div>
                    <div className={styles.heroStats}>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>2,000L</span>
                            <span className={styles.statLabel}>Max Bioreactor Scale</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>99.8%</span>
                            <span className={styles.statLabel}>Batch Success Rate</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>FDA/EMA</span>
                            <span className={styles.statLabel}>Compliant</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.overview}>
                <div className={styles.container}>
                    <div className={styles.overviewGrid}>
                        <div className={styles.overviewContent}>
                            <h2>Manufacturing Excellence at Scale</h2>
                            <p>
                                Our state-of-the-art GMP manufacturing facilities are designed for
                                flexibility and efficiency. With a track record of 99.8% batch
                                success rate and support for 50+ clinical and commercial programs,
                                we deliver the reliability your program requires.
                            </p>
                            <h3>Manufacturing Highlights</h3>
                            <ul className={styles.checkList}>
                                <li>Single-use and stainless steel bioreactors (1L - 2000L)</li>
                                <li>Fed-batch and perfusion capability</li>
                                <li>Integrated downstream processing</li>
                                <li>Fill/finish including vials, PFS, and lyophilization</li>
                                <li>Cold chain storage and distribution support</li>
                                <li>24/7 operations with real-time monitoring</li>
                            </ul>
                        </div>
                        <div className={styles.overviewVisual}>
                            <Image 
                                src="/images/gmp-manufacturing.png" 
                                alt="State-of-the-art GMP Biologics Manufacturing Suite" 
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
                        <h2>Manufacturing Capabilities</h2>
                        <p>Comprehensive GMP production for every stage of development.</p>
                    </div>
                    <div className={styles.capabilitiesGrid}>
                        {[
                            { title: 'Clinical Manufacturing', desc: 'Phase I, II, and III clinical supply.', features: ['200L - 1000L batches', 'Rapid campaign starts', 'Comparability support', 'Clinical labeling & packaging'] },
                            { title: 'Commercial Manufacturing', desc: 'Validated production at commercial scale.', features: ['Up to 2000L bioreactors', 'Multi-product capability', 'Continuous improvement', 'Robust supply chain'] },
                            { title: 'Fill/Finish', desc: 'Aseptic filling and primary packaging.', features: ['Vials (2mL - 50mL)', 'Pre-filled syringes', 'Lyophilization', 'Visual inspection'] },
                            { title: 'Quality & Release', desc: 'Full QA/QC support for batch release.', features: ['In-house testing', 'Stability programs', 'Release documentation', 'Regulatory support'] }
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

            <section className={styles.technologies}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2>Manufacturing Infrastructure</h2>
                        <p>State-of-the-art equipment and facilities.</p>
                    </div>
                    <div className={styles.techGrid}>
                        <div className={styles.techCategory}>
                            <h4>Upstream</h4>
                            <ul>
                                <li>50L - 2000L single-use</li>
                                <li>Stainless steel vessels</li>
                                <li>Fed-batch & perfusion</li>
                                <li>Automated sampling</li>
                            </ul>
                        </div>
                        <div className={styles.techCategory}>
                            <h4>Downstream</h4>
                            <ul>
                                <li>Affinity chromatography</li>
                                <li>Ion exchange</li>
                                <li>Size exclusion</li>
                                <li>TFF & viral filtration</li>
                            </ul>
                        </div>
                        <div className={styles.techCategory}>
                            <h4>Fill/Finish</h4>
                            <ul>
                                <li>Isolator filling lines</li>
                                <li>Automatic inspection</li>
                                <li>Lyophilizer capacity</li>
                                <li>Capping & labeling</li>
                            </ul>
                        </div>
                        <div className={styles.techCategory}>
                            <h4>Support</h4>
                            <ul>
                                <li>WFI & clean utilities</li>
                                <li>Environmental monitoring</li>
                                <li>Cold storage (-80°C)</li>
                                <li>Warehouse & shipping</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.cta}>
                <div className={styles.container}>
                    <div className={styles.ctaCard}>
                        <h2>Ready to Manufacture?</h2>
                        <p>Discuss your manufacturing requirements with our operations team.</p>
                        <div className={styles.ctaButtons}>
                            <Link href="/contact" className={styles.ctaButtonPrimary}>Request a Quote</Link>
                            <Link href="/facilities" className={styles.ctaButtonSecondary}>Tour Our Facilities</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
