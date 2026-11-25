import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAdminData } from '@/lib/data-store';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Careers - Join Our Team',
    description: 'Join Leelabiologics and be part of a team advancing next-generation biologics. View open positions in science, manufacturing, quality, and operations.',
    keywords: ['biologics careers', 'CDMO jobs', 'pharmaceutical careers', 'biotech jobs'],
};

const BENEFITS = [
    { icon: '🏥', title: 'Health & Wellness', desc: 'Comprehensive medical, dental, and vision coverage' },
    { icon: '💰', title: 'Competitive Pay', desc: 'Market-leading salaries and performance bonuses' },
    { icon: '📚', title: 'Learning & Development', desc: 'Tuition assistance and professional development' },
    { icon: '🏖️', title: 'Work-Life Balance', desc: 'Generous PTO and flexible work arrangements' },
    { icon: '🧬', title: 'Meaningful Work', desc: 'Contribute to life-saving therapies' },
    { icon: '📈', title: 'Growth Opportunities', desc: 'Clear career paths and internal mobility' },
];

export default async function CareersPage() {
    const { jobs } = await getAdminData();
    return (
        <>
            <section className={styles.hero}>
                <div className={styles.heroBackground}></div>
                <div className={styles.container}>
                    <span className={styles.badge}>Join Our Team</span>
                    <h1 className={styles.heroTitle}>
                        Build the Future of
                        <span className={styles.accent}> Biologics Medicine</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Join a team of passionate scientists, engineers, and professionals
                        dedicated to advancing life-saving therapies to patients worldwide.
                    </p>
                    <Link href="#openings" className={styles.ctaButton}>
                        View Open Positions
                    </Link>
                </div>
            </section>

            <section className={styles.culture}>
                <div className={styles.container}>
                    <div className={styles.cultureGrid}>
                        <div className={styles.cultureContent}>
                            <h2>Why Leelabiologics?</h2>
                            <p>
                                At Leelabiologics, you&apos;ll work at the forefront of biologics
                                innovation, collaborating with world-class scientists and
                                contributing to therapies that transform lives.
                            </p>
                            <p>
                                We foster a culture of scientific excellence, collaboration,
                                and continuous learning. Your ideas matter here, and you&apos;ll
                                have the opportunity to grow your career while making a real impact.
                            </p>
                        </div>
                        <div className={styles.cultureImage}>
                            <Image
                                src="/images/team-collaboration.png"
                                alt="Diverse team of scientists collaborating in a biologics laboratory"
                                width={600}
                                height={400}
                                className={styles.cultureImg}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.benefits}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Benefits & Perks</h2>
                    <div className={styles.benefitsGrid}>
                        {BENEFITS.map((benefit, index) => (
                            <div key={index} className={styles.benefitCard}>
                                <span className={styles.benefitIcon}>{benefit.icon}</span>
                                <h3>{benefit.title}</h3>
                                <p>{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="openings" className={styles.openings}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Open Positions</h2>
                    <p className={styles.sectionSubtitle}>
                        Explore current opportunities and find your next role.
                    </p>
                    <div className={styles.jobList}>
                        {jobs.map((job) => (
                            <div key={job.id} className={styles.jobCard}>
                                <div className={styles.jobInfo}>
                                    <h3 className={styles.jobTitle}>{job.title}</h3>
                                    <div className={styles.jobMeta}>
                                        <span style={{ fontWeight: 600, color: 'var(--color-primary-700)' }}>{job.department}</span>
                                        <span>•</span>
                                        <span>{job.location}</span>
                                        <span>•</span>
                                        <span>{job.type}</span>
                                        <span>•</span>
                                        <span style={{ fontSize: '12px', background: '#e0f2fe', color: '#0369a1', padding: '2px 6px', borderRadius: '4px' }}>
                                            {job.reqId}
                                        </span>
                                    </div>
                                    <div style={{ marginTop: '6px', fontSize: '13px', color: '#64748b' }}>
                                        Direct Inquiries: <a href={`mailto:${job.email}?subject=Application for ${encodeURIComponent(job.title)} (${job.reqId})`} style={{ color: 'var(--color-primary-600)', fontWeight: 500 }}>{job.email}</a>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '150px' }}>
                                    <Link href={`/careers/${job.id}`} className={styles.applyBtn} style={{ textAlign: 'center' }}>
                                        View & Apply
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.noPosition}>
                        <p>Don&apos;t see the right fit? Send your resume to <a href="mailto:careers@leelabiologics.com">careers@leelabiologics.com</a></p>
                    </div>
                </div>
            </section>


        </>
    );
}
