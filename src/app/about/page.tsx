import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG, COMPLIANCE_BADGES } from '@/lib/constants';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'About Us - Our Mission & Approach',
    description: 'Learn about Leela biologics\'s mission, leadership team, quality standards, and commitment to advancing biologics development. 25+ years of expertise in drug development.',
    keywords: ['biologics company', 'CDMO about', 'drug development company', 'GMP manufacturing'],
};

const LEADERSHIP_TEAM = [
    {
        name: 'Dr. Suman Labala',
        title: 'Founder and Chief Executive Officer',
        bio: 'Over 16 years of experience in biologics development and manufacturing leadership.',
    },

    {
        name: 'Pavani Nalla',
        title: 'Co-founder and Chief Operating Officer',
        bio: 'Extensive expertise in Analytical characterization and Quality assurance.',
    },
    {
        name: 'Bhanu Bhalchandra',
        title: 'Chief Scientific Officer',
        bio: 'Extensive expertise in scientific operations and biologics development.',
    },
];



export default function AboutPage() {
    return (
        <>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}></div>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <span className={styles.badge}>About Leela biologics</span>
                        <h1 className={styles.heroTitle}>
                            Accelerating the Future of
                            <span className={styles.accent}> Biologics Medicine</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Driven by the spirit of &lsquo;Make in India&rsquo;, we transform breakthrough science into life-changing therapeutics. With an unwavering commitment to world-class manufacturing and scientific excellence, we deliver next-generation biologics that are not only innovative but also affordable and accessible&mdash;ensuring better health outcomes for patients worldwide.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className={styles.mission}>
                <div className={styles.container}>
                    <div className={styles.missionGrid}>
                        <div className={styles.missionContent}>
                            <h2 className={styles.sectionTitle}>Our Mission</h2>
                            <p className={styles.missionText}>
                                To be the leading biologics manufacturing organization and trusted CDMO, delivering science-driven solutions that accelerate the journey from discovery to market. We are committed to advancing formulation development, process innovation, and manufacturing excellence to ensure biologic therapies are stable, scalable, and regulatory-ready.
                            </p>
                            <p className={styles.missionText}>
                                Above all, we dedicate our efforts to supporting patients worldwide—making life-changing biologics affordable, accessible, and impactful for better global health outcomes.
                            </p>
                            <div className={styles.missionValues}>
                                <div className={styles.valueCard}>
                                    <span className={styles.valueIcon}>🔬</span>
                                    <h3>Scientific Excellence</h3>
                                    <p>Deep expertise across modalities with innovative problem-solving</p>
                                </div>
                                <div className={styles.valueCard}>
                                    <span className={styles.valueIcon}>⚡</span>
                                    <h3>Speed & Agility</h3>
                                    <p>Flexible operations to meet aggressive timelines</p>
                                </div>
                                <div className={styles.valueCard}>
                                    <span className={styles.valueIcon}>🤝</span>
                                    <h3>Partnership Focus</h3>
                                    <p>Your success is our success—dedicated teams for every project</p>
                                </div>
                                <div className={styles.valueCard}>
                                    <span className={styles.valueIcon}>✓</span>
                                    <h3>Quality First</h3>
                                    <p>Uncompromising commitment to GMP and regulatory compliance</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.missionVisual}>
                            <div className={styles.missionImageWrapper}>
                                <Image
                                    src="/images/team-collaboration.png"
                                    alt="Team collaboration in modern biotech office"
                                    width={560}
                                    height={400}
                                    className={styles.missionImg}
                                />
                                <span className={styles.missionImageLabel}>Team Collaboration</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className={styles.leadership}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.label}>Leadership Team</span>
                        <h2 className={styles.sectionTitle}>Guided by Experience</h2>
                        <p className={styles.sectionSubtitle}>
                            Our leadership team brings decades of combined experience from leading
                            pharmaceutical and biotechnology organizations.
                        </p>
                    </div>
                    <div className={styles.leadershipGrid}>
                        {LEADERSHIP_TEAM.map((member, index) => (
                            <div key={index} className={styles.leaderCard}>
                                <h3 className={styles.leaderName}>{member.name}</h3>
                                <p className={styles.leaderTitle}>{member.title}</p>
                                <p className={styles.leaderBio}>{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Quality Section */}
            <section className={styles.quality}>
                <div className={styles.container}>
                    <div className={styles.qualityGrid}>
                        <div className={styles.qualityContent}>
                            <span className={styles.label}>Quality & Compliance</span>
                            <h2 className={styles.sectionTitle}>Uncompromising Standards</h2>
                            <p className={styles.qualityText}>
                                Quality is embedded in everything we do. Our internal facilities and processes,
                                alongside our trusted collaborations with external manufacturing sites, are designed
                                to meet the most stringent global regulatory requirements, ensuring your products
                                meet the highest standards of safety and efficacy.
                            </p>
                            <div className={styles.certifications}>
                                {COMPLIANCE_BADGES.map((badge, index) => (
                                    <span key={index} className={styles.certBadge}>
                                        {badge.label}
                                    </span>
                                ))}
                            </div>
                            <ul className={styles.qualityList}>
                                <li>FDA-registered and inspected facilities</li>
                                <li>EMA GMP certified operations</li>
                                <li>ISO 9001:2015 quality management system</li>
                                <li>Comprehensive quality assurance and control programs</li>
                                <li>Regular internal and external audits</li>
                            </ul>
                        </div>
                        <div className={styles.qualityVisual}>
                            <div className={styles.qualityImage}>
                                <Image
                                    src="/images/quality-lab.png"
                                    alt="Quality control laboratory with analytical equipment"
                                    width={560}
                                    height={400}
                                    className={styles.qualityImg}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.cta}>
                <div className={styles.container}>
                    <div className={styles.ctaCard}>
                        <h2>Ready to Partner With Us?</h2>
                        <p>
                            Let&apos;s discuss how we can accelerate your biologics program.
                        </p>
                        <div className={styles.ctaButtons}>
                            <Link href="/contact" className={styles.ctaPrimary}>
                                Contact Our Team
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
