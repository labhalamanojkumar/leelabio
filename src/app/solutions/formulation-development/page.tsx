import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../solution.module.css';

export const metadata: Metadata = {
    title: 'Center of Excellence Formulation Development',
    description: 'Expert formulation services maximizing the stability, safety, and efficacy of complex biologics.',
    keywords: ['formulation development', 'biologics formulation', 'center of excellence', 'stability', 'efficacy'],
};

export default function FormulationDevelopmentPage() {
    return (
        <>
            <section className={styles.hero}>
                <div className={styles.heroBackground}></div>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <Link href="/solutions" className={styles.breadcrumb}>← Back to Solutions</Link>
                        <span className={styles.badge}>Formulation</span>
                        <h1 className={styles.heroTitle}>
                            Center of Excellence
                            <span className={styles.accent}> Formulation Development</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Expert formulation services maximizing the stability, safety, and efficacy of complex biologics. We develop robust, scalable, and patentable formulations tailored to your molecule&apos;s specific needs.
                        </p>
                        <div className={styles.heroCtas}>
                            <Link href="/contact" className={styles.ctaPrimary}>Request a Quote</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.overview}>
                <div className={styles.container}>
                    <div className={styles.overviewGrid}>
                        <div className={styles.overviewContent}>
                            <h2>Comprehensive Formulation Strategies</h2>
                            <p>
                                At our Center of Excellence for Formulation Development, we bring together a multidisciplinary team dedicated to advancing biologics such as monoclonal antibodies (mAbs), antibody-drug conjugates (ADCs), and nucleic acid therapeutics. By leveraging high-throughput screening platforms and rigorous design of experiments methodologies, we systematically evaluate excipients and formulation conditions to identify optimal solutions that ensure maximum stability and therapeutic efficacy.
                            </p>
                            <p>
                                Beyond formulation science, our integrated process development efforts focus on scalability, robustness, and cost efficiency. This holistic approach enables us to design manufacturing processes that reduce production costs while maintaining uncompromising quality standards. Our mission is clear: to deliver biologics that are not only innovative and effective but also affordable and accessible, meeting the urgent needs of patients worldwide.
                            </p>
                            <h3>Key Capabilities</h3>
                            <ul className={styles.checkList}>
                                <li>Pre-formulation screening and forced degradation studies</li>
                                <li>Liquid and lyophilized formulation development</li>
                                <li>High-concentration protein formulations</li>
                                <li>LNP and novel delivery system formulation</li>
                                <li>Container closure system selection and compatibility</li>
                                <li>Drug-Device combination products (PFS with Needle safety Device, Auto Injectors, On body Injectors)</li>
                                <li>In-use stability testing and tech transfer support</li>
                            </ul>
                        </div>
                        <div className={styles.overviewVisual}>
                            <Image 
                                src="/images/formulation-development.png" 
                                alt="Formulation Development Center with scientists analyzing vials" 
                                width={800} 
                                height={600} 
                                className={styles.overviewImg} 
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
