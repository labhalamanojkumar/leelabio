import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../solution.module.css';

export const metadata: Metadata = {
    title: 'Biologics CDMO Services - Contract Development & Manufacturing',
    description: 'End-to-end biologics CDMO services from cell line development to commercial manufacturing. GMP-compliant facilities, expert teams, and flexible capacity for your drug development needs.',
    keywords: ['biologics CDMO', 'contract manufacturing', 'drug development services', 'GMP manufacturing', 'biologics outsourcing'],
};

const CAPABILITIES = [
    {
        title: 'Cell Line Development',
        description: 'High-expressing, stable cell lines optimized for your target molecule with comprehensive characterization.',
        features: ['CHO, HEK293, NS0 platforms', 'Clone screening & selection', 'Cell bank manufacturing', 'Stability studies'],
    },
    {
        title: 'Process Development',
        description: 'Scalable upstream and downstream processes designed for manufacturability and regulatory compliance.',
        features: ['Fed-batch & perfusion culture', 'Chromatography optimization', 'Filtration & concentration', 'Hold studies'],
    },
    {
        title: 'Analytical Development',
        description: 'Method development, qualification, and validation to support your CMC package.',
        features: ['Identity & purity methods', 'Potency assays', 'Impurity profiling', 'Stability-indicating methods'],
    },
    {
        title: 'GMP Manufacturing',
        description: 'Clinical and commercial-scale production in FDA-registered, EMA-certified facilities.',
        features: ['1L - 2000L bioreactors', 'Single-use technology', 'Fill/finish capabilities', 'Lyophilization'],
    },
];

export default function BiologicsCDMOPage() {
    return (
        <>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}></div>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <Link href="/solutions" className={styles.breadcrumb}>
                            ← Back to Solutions
                        </Link>
                        <span className={styles.badge}>CDMO Services</span>
                        <h1 className={styles.heroTitle}>
                            Biologics CDMO:
                            <span className={styles.accent}> End-to-End Excellence</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Accelerate your biologics program with our comprehensive contract development
                            and manufacturing services. From cell line to commercial supply, we deliver
                            quality, speed, and scientific expertise.
                        </p>
                        <div className={styles.heroCtas}>
                            <Link href="/contact" className={styles.ctaPrimary}>
                                Request a Quote
                            </Link>
                            <Link href="#capabilities" className={styles.ctaSecondary}>
                                View Capabilities
                            </Link>
                        </div>
                    </div>
                    <div className={styles.heroStats}>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>150+</span>
                            <span className={styles.statLabel}>Projects Delivered</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>50+</span>
                            <span className={styles.statLabel}>IND Filings Supported</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>99.8%</span>
                            <span className={styles.statLabel}>Batch Success Rate</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className={styles.overview}>
                <div className={styles.container}>
                    <div className={styles.overviewGrid}>
                        <div className={styles.overviewContent}>
                            <h2>Your Partner for Biologics Success</h2>
                            <p>
                                Our biologics CDMO services provide a fully integrated solution for
                                companies looking to outsource their drug development and manufacturing.
                                With over 25 years of experience, GMP-compliant facilities, and a team
                                of seasoned scientists and engineers, we de-risk your program and
                                accelerate your path to patients.
                            </p>
                            <p>
                                Whether you&apos;re a virtual biotech with your first molecule or a
                                large pharma seeking additional capacity, our flexible engagement
                                models and scalable infrastructure adapt to your needs.
                            </p>
                            <h3>Why Choose Our CDMO Services?</h3>
                            <ul className={styles.checkList}>
                                <li>Single source for development through commercial manufacturing</li>
                                <li>Dedicated project teams with deep therapeutic expertise</li>
                                <li>Flexible capacity from 1L process development to 2000L GMP production</li>
                                <li>Proven regulatory track record with FDA, EMA, and global agencies</li>
                                <li>Transparent communication and real-time project visibility</li>
                            </ul>
                        </div>
                        <div className={styles.overviewVisual}>
                            <Image 
                                src="/images/cdmo-facility.png" 
                                alt="CDMO Facility cleanroom with bioreactors" 
                                width={800} 
                                height={600} 
                                className={styles.overviewImg} 
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Capabilities */}
            <section id="capabilities" className={styles.capabilities}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2>Our CDMO Capabilities</h2>
                        <p>Comprehensive services to support your biologics journey from concept to commercialization.</p>
                    </div>
                    <div className={styles.capabilitiesGrid}>
                        {CAPABILITIES.map((capability, index) => (
                            <div key={index} className={styles.capabilityCard}>
                                <span className={styles.capabilityNumber}>{String(index + 1).padStart(2, '0')}</span>
                                <h3>{capability.title}</h3>
                                <p>{capability.description}</p>
                                <ul>
                                    {capability.features.map((feature, i) => (
                                        <li key={i}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className={styles.process}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2>Our Integrated Approach</h2>
                        <p>A seamless journey from early development to commercial production.</p>
                    </div>
                    <div className={styles.processSteps}>
                        {[
                            { step: '01', title: 'Discovery Support', desc: 'Early feasibility, expression screening' },
                            { step: '02', title: 'Cell Line Development', desc: 'Stable, high-expressing clones' },
                            { step: '03', title: 'Process Development', desc: 'Scalable upstream & downstream' },
                            { step: '04', title: 'Analytical Development', desc: 'Methods for CMC package' },
                            { step: '05', title: 'Clinical Manufacturing', desc: 'Phase I-III GMP production' },
                            { step: '06', title: 'Commercial Supply', desc: 'Validated, scaled-up production' },
                        ].map((item, index) => (
                            <div key={index} className={styles.processStep}>
                                <span className={styles.processNumber}>{item.step}</span>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technologies */}
            <section className={styles.technologies}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2>Technologies & Platforms</h2>
                        <p>State-of-the-art equipment and established platform technologies.</p>
                    </div>
                    <div className={styles.techGrid}>
                        <div className={styles.techCategory}>
                            <h4>Expression Systems</h4>
                            <ul>
                                <li>CHO-K1, CHO-DG44, CHO-S</li>
                                <li>HEK293 (transient & stable)</li>
                                <li>NS0 myeloma cells</li>
                                <li>E. coli for inclusion bodies</li>
                            </ul>
                        </div>
                        <div className={styles.techCategory}>
                            <h4>Bioreactor Systems</h4>
                            <ul>
                                <li>Ambr® 15/250 for development</li>
                                <li>Single-use bioreactors (50-2000L)</li>
                                <li>Stainless steel (up to 5000L)</li>
                                <li>Perfusion systems</li>
                            </ul>
                        </div>
                        <div className={styles.techCategory}>
                            <h4>Purification</h4>
                            <ul>
                                <li>Protein A/G/L affinity</li>
                                <li>Ion exchange chromatography</li>
                                <li>Size exclusion chromatography</li>
                                <li>TFF and viral filtration</li>
                            </ul>
                        </div>
                        <div className={styles.techCategory}>
                            <h4>Fill/Finish</h4>
                            <ul>
                                <li>Vial filling (2mL - 50mL)</li>
                                <li>Pre-filled syringes</li>
                                <li>Lyophilization</li>
                                <li>Visual inspection</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>


            {/* CTA */}
            <section className={styles.cta}>
                <div className={styles.container}>
                    <div className={styles.ctaCard}>
                        <h2>Ready to Accelerate Your Biologics Program?</h2>
                        <p>
                            Connect with our CDMO experts to discuss your project requirements
                            and discover how we can help bring your therapeutic to market.
                        </p>
                        <div className={styles.ctaButtons}>
                            <Link href="/contact" className={styles.ctaButtonPrimary}>
                                Request a Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
