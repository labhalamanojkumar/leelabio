import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../solution.module.css';

export const metadata: Metadata = {
    title: 'Scientific Writing & Regulatory Documentation Services',
    description: 'Expert scientific writing services for regulatory submissions including INDs, CTAs, BLAs, CMC modules, clinical study reports, and scientific publications.',
    keywords: ['scientific writing', 'regulatory writing', 'IND submission', 'BLA writing', 'CMC documentation', 'CTD modules'],
};

export default function ScientificWritingPage() {
    return (
        <>
            <section className={styles.hero}>
                <div className={styles.heroBackground}></div>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <Link href="/solutions" className={styles.breadcrumb}>← Back to Solutions</Link>
                        <span className={styles.badge}>Scientific Writing</span>
                        <h1 className={styles.heroTitle}>
                            Regulatory & Scientific
                            <span className={styles.accent}> Writing Excellence</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Expert writing services to support your regulatory submissions, from IND applications
                            to BLA filings. Our team of PhD-level medical writers ensures clear, compliant,
                            and compelling documentation.
                        </p>
                        <div className={styles.heroCtas}>
                            <Link href="/contact" className={styles.ctaPrimary}>Request a Quote</Link>
                            <Link href="#capabilities" className={styles.ctaSecondary}>View Services</Link>
                        </div>
                    </div>
                    <div className={styles.heroStats}>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>50+</span>
                            <span className={styles.statLabel}>IND/CTA Filings</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>PhD Writers</span>
                            <span className={styles.statLabel}>Expert Team</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.overview}>
                <div className={styles.container}>
                    <div className={styles.overviewGrid}>
                        <div className={styles.overviewContent}>
                            <h2>Accelerate Your Regulatory Path</h2>
                            <p>
                                World-class expertise in biologics, powered by in-house developed AI-driven eCTD drafting and automated query response suites. We deliver documentation that is precise, compliant, and submission-ready — ensuring therapies are affordable and serve global patient needs.
                            </p>
                            <p>
                                Our team of scientific and medical writers combines deep biologics knowledge with hands-on experience in successful submissions and regulatory approvals. With a proven track record across global agencies, we deliver documentation that is precise, compliant, and strategically aligned to accelerate approvals.
                            </p>
                            <h3>Why Choose Our Writing Services?</h3>
                            <ul className={styles.checkList}>
                                <li>eCTD-compliant document formatting</li>
                                <li>FDA, EMA, and global regulatory experience</li>
                                <li>Dedicated project management</li>
                                <li>Quality review and editing processes</li>
                                <li>Fast turnaround for urgent submissions</li>
                            </ul>
                        </div>
                        <div className={styles.overviewVisual}>
                            <div className={styles.overviewImage}>
                                <Image
                                    src="/images/scientific-writing-ai.png"
                                    alt="Artificial intelligence driven regulatory dossier writing"
                                    width={560}
                                    height={400}
                                    className={styles.overviewImg}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="capabilities" className={styles.capabilities}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2>Writing Services</h2>
                        <p>Comprehensive documentation support for your regulatory needs.</p>
                    </div>
                    <div className={styles.capabilitiesGrid}>
                        {[
                            { title: 'Regulatory Submissions', desc: 'IND, CTA, BLA, MAA preparation and support.', features: ['Pre-IND meeting packages', 'IND/CTA modules', 'Annual reports', 'Amendments & supplements'] },
                            { title: 'CMC Documentation', desc: 'Module 3 documentation for CTD submissions.', features: ['Drug substance sections', 'Drug product sections', 'Process validation', 'Specifications & controls'] },
                            { title: 'Clinical Documents', desc: 'Clinical study documentation and reports.', features: ['Clinical study reports', 'Investigator brochures', 'Protocols & amendments', 'Safety narratives'] },
                            { title: 'Scientific Publications', desc: 'Manuscripts, posters, and presentations.', features: ['Peer-reviewed manuscripts', 'Conference abstracts', 'Scientific posters', 'Slide decks'] },
                            { title: 'Pharmaceutical Development Reports', desc: 'Comprehensive development documentation for drug products.', features: ['Formulation development', 'Process development reports', 'Analytical method development', 'Stability study reports', 'Filter validation study protocols and reports', 'Extractable and Leachables study design and reports', 'Toxicology assessment reports', 'Elemental impurity risk assessment', 'Transport validation study protocol and reports', 'Biosimilarity reports', 'Device development reports', 'General Safety and Performance Requirements (GSPR)'] }
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
                        <h2>Document Types We Prepare</h2>
                        <p>Full spectrum of regulatory and scientific documentation.</p>
                    </div>
                    <div className={styles.techGrid}>
                        <div className={styles.techCategory}>
                            <h4>Regulatory Filings</h4>
                            <ul>
                                <li>IND Applications</li>
                                <li>CTA (Clinical Trial Applications)</li>
                                <li>BLA (Biologics License)</li>
                                <li>Orphan Drug Designations</li>
                            </ul>
                        </div>
                        <div className={styles.techCategory}>
                            <h4>CTD Modules</h4>
                            <ul>
                                <li>Module 2 Summaries</li>
                                <li>Module 3 (Quality/CMC)</li>
                                <li>Module 4 (Nonclinical)</li>
                                <li>Module 5 (Clinical)</li>
                            </ul>
                        </div>
                        <div className={styles.techCategory}>
                            <h4>Clinical Documents</h4>
                            <ul>
                                <li>Clinical Study Reports</li>
                                <li>Investigator Brochures</li>
                                <li>Study Protocols</li>
                                <li>ICFs & Patient Materials</li>
                            </ul>
                        </div>
                        <div className={styles.techCategory}>
                            <h4>Scientific Writing</h4>
                            <ul>
                                <li>Journal Manuscripts</li>
                                <li>White Papers</li>
                                <li>Medical Affairs Content</li>
                                <li>Training Materials</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.cta}>
                <div className={styles.container}>
                    <div className={styles.ctaCard}>
                        <h2>Support Your Regulatory Submission</h2>
                        <p>Get expert writing support to accelerate your path to approval.</p>
                        <div className={styles.ctaButtons}>
                            <Link href="/contact" className={styles.ctaButtonPrimary}>Contact Us</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
