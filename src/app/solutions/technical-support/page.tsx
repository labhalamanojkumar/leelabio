import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../solution.module.css';

export const metadata: Metadata = {
    title: 'Technical Support & Consulting Services',
    description: 'Expert technical consulting for biologics development including process troubleshooting, technology transfer, regulatory strategy, and project management.',
    keywords: ['technical consulting', 'process troubleshooting', 'technology transfer', 'biologics consulting', 'regulatory strategy'],
};

export default function TechnicalSupportPage() {
    return (
        <>
            <section className={styles.hero}>
                <div className={styles.heroBackground}></div>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <Link href="/solutions" className={styles.breadcrumb}>← Back to Solutions</Link>
                        <span className={styles.badge}>Technical Support</span>
                        <h1 className={styles.heroTitle}>
                            Expert Consulting &
                            <span className={styles.accent}> Technical Support</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Tap into decades of biologics expertise. From process troubleshooting
                            to regulatory strategy, our consultants help you overcome challenges
                            and accelerate your program.
                        </p>
                        <div className={styles.heroCtas}>
                            <Link href="/contact" className={styles.ctaPrimary}>Request Consultation</Link>
                            <Link href="#capabilities" className={styles.ctaSecondary}>View Services</Link>
                        </div>
                    </div>
                    <div className={styles.heroStats}>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>150+</span>
                            <span className={styles.statLabel}>Years Combined Experience</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>Global</span>
                            <span className={styles.statLabel}>Regulatory Expertise</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.overview}>
                <div className={styles.container}>
                    <div className={styles.overviewGrid}>
                        <div className={styles.overviewContent}>
                            <h2>Expert Guidance When You Need It</h2>
                            <p>
                                Whether you&apos;re facing a specific technical challenge or need
                                strategic guidance for your biologics program, our team of seasoned
                                consultants brings the expertise to help you succeed.
                            </p>
                            <p>
                                Our consultants have held senior positions at major pharma companies,
                                regulatory agencies, and leading CDMOs. They bring real-world
                                experience solving complex problems across all biologics modalities.
                            </p>
                            <h3>How We Can Help</h3>
                            <ul className={styles.checkList}>
                                <li>Process troubleshooting and optimization</li>
                                <li>Technology transfer planning and execution</li>
                                <li>Regulatory strategy and agency interactions</li>
                                <li>Due diligence and asset evaluation</li>
                                <li>Quality systems and compliance</li>
                                <li>Project management and program oversight</li>
                            </ul>
                        </div>
                        <div className={styles.overviewVisual}>
                            <Image 
                                src="/images/technical-consulting.png" 
                                alt="Technical consulting experts discussing biologics strategies" 
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
                        <h2>Consulting Services</h2>
                        <p>Deep expertise across the biologics development landscape.</p>
                    </div>
                    <div className={styles.capabilitiesGrid}>
                        {[
                            { title: 'Process Consulting', desc: 'Troubleshoot and optimize your manufacturing processes.', features: ['Upstream optimization', 'Downstream troubleshooting', 'Scale-up support', 'Process characterization'] },
                            { title: 'Technology Transfer', desc: 'Seamless transfer of processes between sites or partners.', features: ['Gap analysis', 'Transfer protocols', 'Qualification support', 'Knowledge management'] },
                            { title: 'Regulatory Strategy', desc: 'Navigate the regulatory pathway with confidence.', features: ['CMC strategy', 'Agency meeting prep', 'Filing support', 'Post-approval changes'] },
                            { title: 'Program Management', desc: 'Strategic oversight for complex programs.', features: ['Project planning', 'Risk management', 'Vendor management', 'Timeline optimization'] }
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

            <section className={styles.process}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2>Engagement Models</h2>
                        <p>Flexible consulting arrangements to meet your needs.</p>
                    </div>
                    <div className={styles.processSteps}>
                        {[
                            { step: '01', title: 'Project-Based', desc: 'Defined scope & deliverables' },
                            { step: '02', title: 'Retainer', desc: 'Ongoing advisory support' },
                            { step: '03', title: 'Embedded', desc: 'On-site consultant placement' },
                            { step: '04', title: 'Workshops', desc: 'Targeted training sessions' },
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

            <section className={styles.faq}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2>Frequently Asked Questions</h2>
                    </div>
                    <div className={styles.faqGrid}>
                        {[
                            { question: 'What types of problems do you help solve?', answer: 'We support a wide range of challenges including low titers, aggregation issues, purification bottlenecks, tech transfer failures, regulatory questions, and strategic program decisions.' },
                            { question: 'How quickly can you mobilize?', answer: 'For urgent issues, we can often begin within 1-2 weeks. For planned engagements, we typically start within 3-4 weeks of contract execution.' },
                            { question: 'Can consultants work on-site?', answer: 'Yes, we offer embedded consulting arrangements where our experts work on-site at your facility for extended periods.' },
                            { question: 'What modalities do you cover?', answer: 'Our consultants have expertise across mAbs, bispecifics, ADCs, cell therapies, gene therapies, and mRNA/nucleic acid therapeutics.' },
                        ].map((faq, index) => (
                            <div key={index} className={styles.faqItem}>
                                <h4>{faq.question}</h4>
                                <p>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.cta}>
                <div className={styles.container}>
                    <div className={styles.ctaCard}>
                        <h2>Get Expert Support for Your Program</h2>
                        <p>Schedule a consultation to discuss how we can help.</p>
                        <div className={styles.ctaButtons}>
                            <Link href="/contact" className={styles.ctaButtonPrimary}>Schedule Consultation</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
