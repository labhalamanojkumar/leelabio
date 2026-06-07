import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG, COMPLIANCE_BADGES } from '@/lib/constants';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'About Leela Biologics - Leading Biologics CDMO',
    description: 'Learn about Leela Biologics, our mission, expert leadership team, world-class GMP manufacturing standards, and 25+ years of experience in accelerating biologics drug development.',
    keywords: [
        'biologics CDMO',
        'GMP manufacturing',
        'drug development company',
        'contract development and manufacturing',
        'cell line development',
        'protein purification',
        'biologics leadership'
    ],
    openGraph: {
        title: 'About Leela Biologics | Premier Biologics CDMO',
        description: 'Accelerating the future of biologics medicine through scientific excellence, rapid scale-up, and world-class GMP manufacturing.',
        type: 'website',
        url: `${SITE_CONFIG.url}/about`,
        images: [
            {
                url: `${SITE_CONFIG.url}/images/quality-lab.png`,
                width: 1200,
                height: 630,
                alt: 'Leela Biologics Quality Lab',
            },
        ],
    },
    alternates: {
        canonical: `${SITE_CONFIG.url}/about`,
    },
};

const LEADERSHIP_TEAM = [
    {
        name: 'Dr. Suman Labala',
        title: 'Founder and Chief Executive Officer',
        bio: 'Over 16 years of experience in biologics development and manufacturing leadership. Dr. Labala has spearheaded the development of over 20 novel biological entities and biosimilars.',
    },
    {
        name: 'Pavani Nalla',
        title: 'Co-founder and Chief Operating Officer',
        bio: 'Led regulatory submissions for 30+ INDs and 10+ commercial biologics products. Expertise in navigating complex FDA, EMA, and CDSCO regulatory pathways.',
    },
    {
        name: 'Bhanu Bhalchandra',
        title: 'Chief Scientific Officer',
        bio: 'Extensive expertise in scientific operations and biologics development, specifically in downstream processing, protein characterization, and tech transfer methodologies.',
    },
];

export default function AboutPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Leela Biologics',
        description: metadata.description,
        url: `${SITE_CONFIG.url}/about`,
        mainEntity: {
            '@type': 'Organization',
            name: SITE_CONFIG.name,
            description: SITE_CONFIG.description,
            founder: {
                '@type': 'Person',
                name: 'Dr. Suman Labala',
            },
            address: {
                '@type': 'PostalAddress',
                streetAddress: SITE_CONFIG.address.street,
                addressLocality: SITE_CONFIG.address.city,
                addressRegion: SITE_CONFIG.address.state,
                postalCode: SITE_CONFIG.address.zip,
                addressCountry: SITE_CONFIG.address.country,
            },
        },
    };

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <section className={styles.hero} aria-labelledby="about-hero-title">
                <div className={styles.heroBackground}></div>
                <div className={styles.container}>
                    <header className={styles.heroContent}>
                        <span className={styles.badge}>About Leela Biologics</span>
                        <h1 id="about-hero-title" className={styles.heroTitle}>
                            Accelerating the Future of
                            <span className={styles.accent}> Biologics Medicine</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Driven by the spirit of &lsquo;Make in India&rsquo;, we transform breakthrough science into life-changing therapeutics. With an unwavering commitment to world-class manufacturing and scientific excellence, we deliver next-generation biologics that are not only innovative but also affordable and accessible&mdash;ensuring better health outcomes for patients worldwide.
                        </p>
                    </header>
                </div>
            </section>

            {/* Mission Section */}
            <section className={styles.mission} aria-labelledby="mission-title">
                <div className={styles.container}>
                    <div className={styles.missionGrid}>
                        <article className={styles.missionContent}>
                            <h2 id="mission-title" className={styles.sectionTitle}>Our Mission & Vision</h2>
                            <p className={styles.missionText}>
                                To be the leading biologics manufacturing organization and trusted CDMO, delivering science-driven solutions that accelerate the journey from discovery to market. We are committed to advancing formulation development, process innovation, and manufacturing excellence to ensure biologic therapies are stable, scalable, and regulatory-ready.
                            </p>
                            <p className={styles.missionText}>
                                Above all, we dedicate our efforts to supporting patients worldwide—making life-changing biologics affordable, accessible, and impactful for better global health outcomes. We aim to bridge the gap between complex therapeutic modalities and commercial viability.
                            </p>
                            <div className={styles.missionValues}>
                                <div className={styles.valueCard}>
                                    <span className={styles.valueIcon} aria-hidden="true">🔬</span>
                                    <h3>Scientific Excellence</h3>
                                    <p>Deep expertise across modalities with innovative problem-solving in upstream and downstream processing.</p>
                                </div>
                                <div className={styles.valueCard}>
                                    <span className={styles.valueIcon} aria-hidden="true">⚡</span>
                                    <h3>Speed & Agility</h3>
                                    <p>Flexible operations and rapid tech transfer to meet aggressive clinical and commercial timelines.</p>
                                </div>
                                <div className={styles.valueCard}>
                                    <span className={styles.valueIcon} aria-hidden="true">🤝</span>
                                    <h3>Partnership Focus</h3>
                                    <p>Your success is our success—dedicated project management teams for end-to-end support.</p>
                                </div>
                                <div className={styles.valueCard}>
                                    <span className={styles.valueIcon} aria-hidden="true">✓</span>
                                    <h3>Quality First</h3>
                                    <p>Uncompromising commitment to cGMP guidelines and robust regulatory compliance strategies.</p>
                                </div>
                            </div>
                        </article>
                        <aside className={styles.missionVisual}>
                            <div className={styles.missionImageWrapper}>
                                <Image
                                    src="/images/team-collaboration.png"
                                    alt="Leela Biologics team collaborating in a modern biotech office setting"
                                    width={560}
                                    height={400}
                                    className={styles.missionImg}
                                />
                                <span className={styles.missionImageLabel}>Collaborative Excellence</span>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className={styles.leadership} aria-labelledby="leadership-title">
                <div className={styles.container}>
                    <header className={styles.sectionHeader}>
                        <span className={styles.label}>Leadership Team</span>
                        <h2 id="leadership-title" className={styles.sectionTitle}>Guided by Experience</h2>
                        <p className={styles.sectionSubtitle}>
                            Our leadership team brings decades of combined experience from leading pharmaceutical and biotechnology organizations, providing strategic direction for complex biologic development programs.
                        </p>
                    </header>
                    <div className={styles.leadershipGrid}>
                        {LEADERSHIP_TEAM.map((member, index) => (
                            <article key={index} className={styles.leaderCard}>
                                <h3 className={styles.leaderName}>{member.name}</h3>
                                <p className={styles.leaderTitle}>{member.title}</p>
                                <p className={styles.leaderBio}>{member.bio}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quality Section */}
            <section className={styles.quality} aria-labelledby="quality-title">
                <div className={styles.container}>
                    <div className={styles.qualityGrid}>
                        <article className={styles.qualityContent}>
                            <span className={styles.label}>Quality & Compliance</span>
                            <h2 id="quality-title" className={styles.sectionTitle}>Uncompromising GMP Standards</h2>
                            <p className={styles.qualityText}>
                                Quality is embedded in everything we do. Our internal facilities and processes, alongside our trusted collaborations with external manufacturing sites, are designed to meet the most stringent global regulatory requirements (FDA, EMA, PMDA, CDSCO), ensuring your products meet the highest standards of safety, identity, strength, purity, and quality (SISPQ).
                            </p>
                            <div className={styles.certifications}>
                                {COMPLIANCE_BADGES.map((badge, index) => (
                                    <span key={index} className={styles.certBadge}>
                                        {badge.label}
                                    </span>
                                ))}
                            </div>
                            <ul className={styles.qualityList}>
                                <li>FDA-registered and inspected manufacturing facilities</li>
                                <li>EMA GMP certified operations for global supply</li>
                                <li>ISO 9001:2015 certified quality management system</li>
                                <li>Comprehensive Quality Assurance (QA) and Quality Control (QC) programs</li>
                                <li>Rigorous internal auditing and supplier qualification programs</li>
                            </ul>
                        </article>
                        <aside className={styles.qualityVisual}>
                            <div className={styles.qualityImage}>
                                <Image
                                    src="/images/quality-lab.png"
                                    alt="Advanced quality control laboratory with mass spectrometry and HPLC analytical equipment"
                                    width={560}
                                    height={400}
                                    className={styles.qualityImg}
                                />
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.cta} aria-labelledby="cta-title">
                <div className={styles.container}>
                    <div className={styles.ctaCard}>
                        <h2 id="cta-title">Ready to Partner With Us?</h2>
                        <p>
                            Let&apos;s discuss how we can accelerate your biologics program from cell line development to commercial manufacturing.
                        </p>
                        <div className={styles.ctaButtons}>
                            <Link href="/contact" className={styles.ctaPrimary}>
                                Contact Our Scientific Team
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
