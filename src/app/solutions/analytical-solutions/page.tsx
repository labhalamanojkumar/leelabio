import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../solution.module.css';

export const metadata: Metadata = {
    title: 'Analytical Solutions - Biologics Characterization & Testing',
    description: 'Comprehensive analytical services for biologics characterization, stability testing, potency assays, method development, and GMP release testing.',
    keywords: ['biologics characterization', 'analytical testing', 'stability studies', 'potency assays', 'release testing'],
};

export default function AnalyticalSolutionsPage() {
    return (
        <>
            <section className={styles.hero}>
                <div className={styles.heroBackground}></div>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <Link href="/solutions" className={styles.breadcrumb}>← Back to Solutions</Link>
                        <span className={styles.badge}>Analytical Solutions</span>
                        <h1 className={styles.heroTitle}>
                            Comprehensive
                            <span className={styles.accent}> Analytical Characterization</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            From method development to GxP release testing, our analytical experts
                            provide the data you need to advance your biologics program with confidence.
                        </p>
                        <div className={styles.heroCtas}>
                            <Link href="/contact" className={styles.ctaPrimary}>Request a Quote</Link>
                            <Link href="#capabilities" className={styles.ctaSecondary}>View Capabilities</Link>
                        </div>
                    </div>
                    <div className={styles.heroStats}>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>100+</span>
                            <span className={styles.statLabel}>Validated Methods</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>GMP/GLP</span>
                            <span className={styles.statLabel}>Compliant Labs</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.overview}>
                <div className={styles.container}>
                    <div className={styles.overviewGrid}>
                        <div className={styles.overviewContent}>
                            <h2>Data-Driven Decision Making</h2>
                            <p>
                                Our comprehensive analytical capabilities support every stage of
                                biologics development, from early characterization through commercial
                                release. State-of-the-art instrumentation combined with experienced
                                scientists ensures reliable, regulatory-compliant results.
                            </p>
                            <h3>Our Services Include</h3>
                            <ul className={styles.checkList}>
                                <li>Physicochemical characterization</li>
                                <li>Higher-order structure analysis</li>
                                <li>Potency and bioactivity assays</li>
                                <li>Impurity profiling and identification</li>
                                <li>Stability studies (ICH guidelines)</li>
                                <li>Method development and validation</li>
                                <li>Lot release and QC testing</li>
                                <li>Comparability and biosimilarity studies</li>
                            </ul>
                        </div>
                        <div className={styles.overviewVisual}>
                            <Image 
                                src="/images/analytical-lab.png" 
                                alt="High-tech analytical laboratory with UPLC, Aunty, Aurora TX, and HALCON instruments" 
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
                        <h2>Analytical Capabilities</h2>
                        <p>Full-spectrum analytical services for biologics development.</p>
                    </div>
                    <div className={styles.capabilitiesGrid}>
                        {[
                            { title: 'Characterization', desc: 'Complete structural and functional characterization.', features: ['Mass spectrometry', 'Peptide mapping', 'Glycan analysis', 'Disulfide mapping'] },
                            { title: 'Potency & Bioassays', desc: 'Cell-based and binding assays for biological activity.', features: ['ELISA & MSD', 'Flow cytometry', 'Reporter gene assays', 'Cell proliferation'] },
                            { title: 'Stability Testing', desc: 'ICH-compliant stability programs and shelf-life determination.', features: ['Real-time & accelerated', 'Photostability', 'Forced degradation', 'Container compatibility'] },
                            { title: 'Method Development', desc: 'Custom method development, transfer, and validation.', features: ['ICH Q2 validation', 'Method transfer', 'Qualification protocols', 'USP/Ph. Eur. compliant'] }
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
                        <h2>Instrumentation & Technology</h2>
                        <p>State-of-the-art analytical platforms.</p>
                    </div>
                    <div className={styles.techGrid}>
                        <div className={styles.techCategory}>
                            <h4>Chromatography</h4>
                            <ul>
                                <li>HPLC/UHPLC systems</li>
                                <li>SEC-MALS</li>
                                <li>IEX & HIC</li>
                                <li>RP-HPLC</li>
                            </ul>
                        </div>
                        <div className={styles.techCategory}>
                            <h4>Mass Spectrometry</h4>
                            <ul>
                                <li>Q-TOF LC-MS</li>
                                <li>Triple-quad MS</li>
                                <li>Intact mass analysis</li>
                                <li>Native MS</li>
                            </ul>
                        </div>
                        <div className={styles.techCategory}>
                            <h4>Spectroscopy</h4>
                            <ul>
                                <li>Circular dichroism</li>
                                <li>DSC/DSF</li>
                                <li>FTIR</li>
                                <li>UV-Vis</li>
                            </ul>
                        </div>
                        <div className={styles.techCategory}>
                            <h4>Particle Analysis</h4>
                            <ul>
                                <li>DLS & NTA</li>
                                <li>MFI & HIAC</li>
                                <li>Analytical ultracentrifugation</li>
                                <li>Zeta potential</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.cta}>
                <div className={styles.container}>
                    <div className={styles.ctaCard}>
                        <h2>Get the Data You Need</h2>
                        <p>Discuss your analytical requirements with our expert team.</p>
                        <div className={styles.ctaButtons}>
                            <Link href="/contact" className={styles.ctaButtonPrimary}>Contact Us</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
