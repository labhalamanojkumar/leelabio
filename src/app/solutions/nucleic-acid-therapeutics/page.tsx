import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../solution.module.css';

export const metadata: Metadata = {
    title: 'Nucleic Acid Therapeutics - mRNA, siRNA, ASO Development',
    description: 'Comprehensive nucleic acid therapeutics development including mRNA manufacturing, LNP formulation, siRNA and ASO synthesis, and scale-up to GMP production.',
    keywords: ['mRNA CDMO', 'LNP formulation', 'siRNA synthesis', 'ASO manufacturing', 'nucleic acid therapeutics'],
};

export default function NucleicAcidPage() {
    return (
        <>
            <section className={styles.hero}>
                <div className={styles.heroBackground}></div>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <Link href="/solutions" className={styles.breadcrumb}>← Back to Solutions</Link>
                        <span className={styles.badge}>Nucleic Acid Therapeutics</span>
                        <h1 className={styles.heroTitle}>
                            mRNA, siRNA & ASO
                            <span className={styles.accent}> Development Platform</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Accelerate your nucleic acid therapeutic from sequence design to GMP
                            manufacturing with our integrated platform and LNP formulation expertise.
                        </p>
                        <div className={styles.heroCtas}>
                            <Link href="/contact" className={styles.ctaPrimary}>Request a Quote</Link>
                            <Link href="#capabilities" className={styles.ctaSecondary}>View Capabilities</Link>
                        </div>
                    </div>
                    <div className={styles.heroStats}>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>mRNA, siRNA, ASO</span>
                            <span className={styles.statLabel}>Modalities</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>LNP Platform</span>
                            <span className={styles.statLabel}>Delivery Solutions</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.overview}>
                <div className={styles.container}>
                    <div className={styles.overviewGrid}>
                        <div className={styles.overviewContent}>
                            <h2>The Future of Therapeutics</h2>
                            <p>
                                Nucleic acid-based therapeutics represent one of the fastest-growing
                                modality classes in drug development. Our platform supports the full
                                spectrum from mRNA vaccines to siRNA therapeutics and antisense oligonucleotides.
                            </p>
                            <h3>Our Platform Includes</h3>
                            <ul className={styles.checkList}>
                                <li>mRNA synthesis and optimization</li>
                                <li>LNP formulation and encapsulation</li>
                                <li>siRNA and ASO oligo synthesis</li>
                                <li>Modified nucleotides and cap analogs</li>
                                <li>Scalable manufacturing to GMP</li>
                                <li>Comprehensive analytical characterization</li>
                            </ul>
                        </div>
                        <div className={styles.overviewVisual}>
                            <Image 
                                src="/images/nucleic-acid-lab.png" 
                                alt="High-tech Nucleic Acid Therapeutics laboratory with glowing mRNA and siRNA models" 
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
                        <h2>Nucleic Acid Capabilities</h2>
                        <p>End-to-end support for your RNA and oligonucleotide programs.</p>
                    </div>
                    <div className={styles.capabilitiesGrid}>
                        {[
                            { title: 'mRNA Manufacturing', desc: 'In vitro transcription and purification of mRNA therapeutics.', features: ['Sequence optimization', 'Modified nucleotides', 'Enzymatic capping', 'Poly(A) tailing'] },
                            { title: 'LNP Formulation', desc: 'Lipid nanoparticle encapsulation for RNA delivery.', features: ['Microfluidic mixing', 'Ionizable lipid libraries', 'Size optimization', 'Stability studies'] },
                            { title: 'Oligonucleotide Synthesis', desc: 'Custom siRNA, ASO, and aptamer production.', features: ['Solid-phase synthesis', 'Chemical modifications', 'Purification & QC', 'Scale-up capability'] },
                            { title: 'Analytics & QC', desc: 'Comprehensive characterization of nucleic acid products.', features: ['Integrity analysis', 'Encapsulation efficiency', 'Particle sizing', 'Potency assays'] }
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
                        <h2>Advance Your Nucleic Acid Program</h2>
                        <p>Connect with our RNA therapeutics specialists to discuss your project.</p>
                        <div className={styles.ctaButtons}>
                            <Link href="/contact" className={styles.ctaButtonPrimary}>Contact Us</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
