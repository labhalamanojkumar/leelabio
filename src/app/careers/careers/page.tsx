import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/constants';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Careers in Biologics - Join Leela Biologics',
    description: 'Join Leela Biologics and help build the future of biologics medicine. Explore careers in process development, manufacturing, quality control, and regulatory affairs.',
    keywords: [
        'biologics careers',
        'CDMO jobs',
        'pharmaceutical careers',
        'biotech jobs',
        'manufacturing associate',
        'process development scientist',
        'quality control analyst'
    ],
    openGraph: {
        title: 'Careers | Build the Future of Biologics',
        description: 'Join a world-class team of scientists and engineers dedicated to advancing life-saving therapies.',
        type: 'website',
        url: `${SITE_CONFIG.url}/careers`,
    },
    alternates: {
        canonical: `${SITE_CONFIG.url}/careers`,
    },
};

const JOB_OPENINGS = [
    { id: '1', title: 'Senior Scientist, Process Development (Upstream)', department: 'R&D', location: 'Visakhapatnam, AP', type: 'Full-time', reqId: 'REQ-2024-001' },
    { id: '2', title: 'Manufacturing Associate II, GMP Biologics', department: 'Operations', location: 'Visakhapatnam, AP', type: 'Full-time', reqId: 'REQ-2024-002' },
    { id: '3', title: 'Quality Control Analyst (HPLC/Mass Spec)', department: 'Quality', location: 'Visakhapatnam, AP', type: 'Full-time', reqId: 'REQ-2024-003' },
    { id: '4', title: 'Project Manager, CDMO Services', department: 'Program Management', location: 'Hybrid / Remote', type: 'Full-time', reqId: 'REQ-2024-004' },
    { id: '5', title: 'Regulatory Affairs Specialist (CMC)', department: 'Regulatory', location: 'Visakhapatnam, AP', type: 'Full-time', reqId: 'REQ-2024-005' },
    { id: '6', title: 'Cell Therapy Scientist (CAR-T / NK)', department: 'ATMP R&D', location: 'Visakhapatnam, AP', type: 'Full-time', reqId: 'REQ-2024-006' },
    { id: '7', title: 'Formulation Scientist (LNP/mRNA)', department: 'Formulation', location: 'Visakhapatnam, AP', type: 'Full-time', reqId: 'REQ-2024-007' },
];

const BENEFITS = [
    { icon: '🏥', title: 'Health & Wellness', desc: 'Comprehensive medical, dental, and vision coverage for employees and dependents.' },
    { icon: '💰', title: 'Competitive Compensation', desc: 'Market-leading salaries, annual performance bonuses, and equity programs.' },
    { icon: '📚', title: 'Continuous Learning', desc: 'Tuition reimbursement, specialized technical training, and conference allowances.' },
    { icon: '🏖️', title: 'Work-Life Balance', desc: 'Generous paid time off (PTO), paid parental leave, and flexible hybrid schedules where applicable.' },
    { icon: '🧬', title: 'Meaningful Impact', desc: 'Directly contribute to the development and manufacturing of life-saving patient therapies.' },
    { icon: '📈', title: 'Career Trajectory', desc: 'Defined scientific and management career tracks with robust internal mobility.' },
];

export default function CareersPage() {
    const jobListingsSchema = JOB_OPENINGS.map(job => ({
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: job.title,
        jobLocation: {
            '@type': 'Place',
            address: {
                '@type': 'PostalAddress',
                addressLocality: job.location,
                addressCountry: 'India'
            }
        },
        employmentType: job.type === 'Full-time' ? 'FULL_TIME' : 'OTHER',
        hiringOrganization: {
            '@type': 'Organization',
            name: SITE_CONFIG.name,
            sameAs: SITE_CONFIG.url,
            logo: `${SITE_CONFIG.url}/images/logo.png`
        },
        identifier: {
            '@type': 'PropertyValue',
            name: SITE_CONFIG.name,
            value: job.reqId
        },
        description: `Join Leela Biologics as a ${job.title} in our ${job.department} department. Contribute to advancing life-saving biologic therapies.`
    }));

    return (
        <main>
            {jobListingsSchema.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}

            <section className={styles.hero} aria-labelledby="careers-hero">
                <div className={styles.heroBackground}></div>
                <div className={styles.container}>
                    <header>
                        <span className={styles.badge}>Join Our Team</span>
                        <h1 id="careers-hero" className={styles.heroTitle}>
                            Build the Future of
                            <span className={styles.accent}> Biologics Medicine</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Join a premier team of passionate scientists, engineers, and biopharma professionals
                            dedicated to advancing life-saving therapies from sequence to commercial supply.
                        </p>
                        <Link href="#openings" className={styles.ctaButton}>
                            Explore Open Positions
                        </Link>
                    </header>
                </div>
            </section>

            <section className={styles.culture} aria-labelledby="culture-title">
                <div className={styles.container}>
                    <div className={styles.cultureGrid}>
                        <article className={styles.cultureContent}>
                            <h2 id="culture-title">Why Leela Biologics?</h2>
                            <p>
                                At Leela Biologics, you won&apos;t just have a job—you&apos;ll build a highly specialized career at the forefront of the biologics CDMO industry. Our state-of-the-art facilities and diverse pipeline of complex modalities mean you will constantly be challenged and intellectually engaged.
                            </p>
                            <p>
                                We foster an inclusive culture built on scientific rigor, transparent collaboration, and continuous improvement. We believe that empowering our employees with the best tools, ongoing training, and a supportive environment directly translates to superior outcomes for our clients and, ultimately, the patients who depend on these therapies.
                            </p>
                        </article>
                        <aside className={styles.cultureImage}>
                            <Image 
                                src="/images/team-collaboration.png" 
                                alt="Diverse team of scientists collaborating in a modern biologics laboratory" 
                                width={600} 
                                height={400} 
                                className={styles.cultureImg} 
                            />
                        </aside>
                    </div>
                </div>
            </section>

            <section className={styles.benefits} aria-labelledby="benefits-title">
                <div className={styles.container}>
                    <h2 id="benefits-title" className={styles.sectionTitle}>Comprehensive Benefits & Perks</h2>
                    <div className={styles.benefitsGrid}>
                        {BENEFITS.map((benefit, index) => (
                            <article key={index} className={styles.benefitCard}>
                                <span className={styles.benefitIcon} aria-hidden="true">{benefit.icon}</span>
                                <h3>{benefit.title}</h3>
                                <p>{benefit.desc}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section id="openings" className={styles.openings} aria-labelledby="openings-title">
                <div className={styles.container}>
                    <h2 id="openings-title" className={styles.sectionTitle}>Current Opportunities</h2>
                    <p className={styles.sectionSubtitle}>
                        Discover your next career milestone in Biomanufacturing, R&D, or Quality.
                    </p>
                    <div className={styles.jobList}>
                        {JOB_OPENINGS.map((job) => (
                            <article key={job.id} className={styles.jobCard}>
                                <div className={styles.jobInfo}>
                                    <h3 className={styles.jobTitle}>{job.title}</h3>
                                    <div className={styles.jobMeta}>
                                        <span className={styles.departmentTag}>{job.department}</span>
                                        <span>•</span>
                                        <span>{job.location}</span>
                                        <span>•</span>
                                        <span>{job.type}</span>
                                        <span>•</span>
                                        <span className={styles.reqId}>{job.reqId}</span>
                                    </div>
                                </div>
                                <Link href={`/careers/${job.id}`} className={styles.applyBtn}>
                                    View Details & Apply
                                </Link>
                            </article>
                        ))}
                    </div>
                    <div className={styles.noPosition}>
                        <p>Don&apos;t see the perfect fit? We are always looking for exceptional talent.<br/>
                        Submit your CV to our talent network: <a href="mailto:careers@leelabiologics.com">careers@leelabiologics.com</a></p>
                    </div>
                </div>
            </section>
        </main>
    );
}
