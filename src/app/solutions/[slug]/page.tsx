import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SERVICE_SECTIONS, SITE_CONFIG, ServiceSection, ServiceSubsection } from '@/lib/constants';
import styles from '../solution.module.css';

interface PageProps {
    params: {
        slug: string;
    };
}

// Helper to find Section or Subsection
function findServiceData(slug: string) {
    // Check if it's a Section
    const section = SERVICE_SECTIONS.find((s) => s.slug === slug);
    if (section) {
        return { type: 'section' as const, section, subsection: null };
    }

    // Check if it's a Subsection
    for (const sec of SERVICE_SECTIONS) {
        const sub = sec.subsections.find((s) => s.slug === slug);
        if (sub) {
            return { type: 'subsection' as const, section: sec, subsection: sub };
        }
    }

    return null;
}

export function generateStaticParams() {
    const sectionSlugs = SERVICE_SECTIONS.map((s) => ({ slug: s.slug }));
    const subsectionSlugs = SERVICE_SECTIONS.flatMap((s) =>
        s.subsections.map((sub) => ({ slug: sub.slug }))
    );
    return [...sectionSlugs, ...subsectionSlugs];
}

export function generateMetadata({ params }: PageProps): Metadata {
    const data = findServiceData(params.slug);
    if (!data) return { title: 'Service Not Found' };

    const title =
        data.type === 'section'
            ? `${data.section.title} | ${SITE_CONFIG.name}`
            : `${data.subsection!.title} - ${data.section.title} | ${SITE_CONFIG.name}`;

    const description =
        data.type === 'section'
            ? data.section.shortDescription
            : data.subsection!.shortDescription;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
            url: `${SITE_CONFIG.url}/solutions/${params.slug}`,
        },
    };
}

export default function SolutionDetailPage({ params }: PageProps) {
    const data = findServiceData(params.slug);
    if (!data) notFound();

    const isSection = data.type === 'section';
    const section = data.section;
    const subsection = data.subsection;

    return (
        <>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}></div>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <div className={styles.breadcrumb}>
                            <Link href="/solutions">← All Services</Link>
                            {!isSection && (
                                <>
                                    <span>/</span>
                                    <Link href={`/solutions/${section.slug}`}>{section.title}</Link>
                                </>
                            )}
                        </div>
                        <span className={styles.badge}>
                            {isSection ? 'Core Division' : section.title}
                        </span>
                        <h1 className={styles.heroTitle}>
                            {isSection ? section.title : subsection!.title}
                        </h1>
                        <p className={styles.heroSubtitle}>
                            {isSection ? section.shortDescription : subsection!.shortDescription}
                        </p>
                        <div className={styles.heroCtas}>
                            <Link href="/contact" className={styles.ctaPrimary}>
                                Request a Proposal / Quote
                            </Link>
                            <Link href="#capabilities" className={styles.ctaSecondary}>
                                View Specifications
                            </Link>
                        </div>
                    </div>
                    <div className={styles.heroStats}>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>cGMP / ISO</span>
                            <span className={styles.statLabel}>Quality Certified</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>Global Supply</span>
                            <span className={styles.statLabel}>Commercial Readiness</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Overview / Introduction */}
            <section className={styles.overview}>
                <div className={styles.container}>
                    <div className={styles.overviewGrid}>
                        <div className={styles.overviewContent}>
                            <h2>{isSection ? `About Our ${section.title} Division` : `Capability Highlights`}</h2>
                            <p>
                                At {SITE_CONFIG.name}, we integrate cutting-edge scientific expertise, regulatory mastery, and scalable production infrastructure to ensure superior results for our global partners.
                            </p>
                            <h3>Key Technical Advantages</h3>
                            <ul className={styles.checkList}>
                                {isSection
                                    ? section.subsections.map((sub) => (
                                          <li key={sub.id}>
                                              <strong>{sub.title}:</strong> {sub.shortDescription}
                                          </li>
                                      ))
                                    : subsection!.capabilities.map((cap, i) => (
                                          <li key={i}>{cap}</li>
                                      ))}
                            </ul>
                        </div>
                        <div className={styles.overviewVisual}>
                            <Image
                                src="/images/quality-lab.png"
                                alt={`${isSection ? section.title : subsection!.title} laboratory and manufacturing`}
                                width={800}
                                height={600}
                                className={styles.overviewImg}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* If Section: Show All Subsections under this Section */}
            {isSection && (
                <section id="capabilities" className={styles.capabilities}>
                    <div className={styles.container}>
                        <div className={styles.sectionHeader}>
                            <h2>Subsections & Specialized Services</h2>
                            <p>Explore the dedicated product and service streams within {section.title}.</p>
                        </div>
                        <div className={styles.capabilitiesGrid}>
                            {section.subsections.map((sub, i) => (
                                <div key={sub.id} className={styles.capabilityCard}>
                                    <span className={styles.capabilityNumber}>
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <h3>{sub.title}</h3>
                                    <p>{sub.shortDescription}</p>
                                    <ul>
                                        {sub.capabilities.map((c, j) => (
                                            <li key={j}>{c}</li>
                                        ))}
                                    </ul>
                                    <div style={{ marginTop: '20px' }}>
                                        <Link
                                            href={`/solutions/${sub.slug}`}
                                            style={{
                                                color: 'var(--color-primary-600)',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            View {sub.title} Details →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* If Subsection: Show Detailed Capabilities & Technical Features */}
            {!isSection && (
                <section id="capabilities" className={styles.capabilities}>
                    <div className={styles.container}>
                        <div className={styles.sectionHeader}>
                            <h2>Technical Specifications & Capabilities</h2>
                            <p>Detailed service parameters and technical workflows engineered for high yield, purity, and compliance.</p>
                        </div>
                        <div className={styles.capabilitiesGrid}>
                            {subsection!.capabilities.map((cap, i) => (
                                <div key={i} className={styles.capabilityCard}>
                                    <span className={styles.capabilityNumber}>
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <h3>{cap}</h3>
                                    <p>
                                        Engineered with validated protocols, state-of-the-art analytical characterization, and compliance with US FDA, EMA, and ICH regulatory standards.
                                    </p>
                                    <ul>
                                        <li>Robust process validation & tech transfer</li>
                                        <li>Continuous in-process quality testing</li>
                                        <li>Scalable batch sizes for clinical & commercial phases</li>
                                        <li>Full GxP audit trail and comprehensive documentation</li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Workflow / Execution Lifecycle */}
            <section className={styles.workflow}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2>Development to Commercialization Lifecycle</h2>
                        <p>Our structured, milestone-driven framework minimizes risk and accelerates timelines.</p>
                    </div>
                    <div className={styles.workflowGrid}>
                        {[
                            {
                                step: '01',
                                title: 'Feasibility & Scouting',
                                desc: 'Initial molecule / device evaluation, proof of concept, and regulatory pathway alignment.',
                            },
                            {
                                step: '02',
                                title: 'Process Optimization',
                                desc: 'High-throughput development, formulation stabilization, and parameter definition.',
                            },
                            {
                                step: '03',
                                title: 'Pilot & Scale-Up',
                                desc: 'Scale verification, engineering batches, and technology transfer to cleanroom manufacturing.',
                            },
                            {
                                step: '04',
                                title: 'Commercial Release',
                                desc: 'cGMP batch manufacturing, ICH stability storage, batch release, and global cold-chain distribution.',
                            },
                        ].map((item, index) => (
                            <div key={index} className={styles.workflowCard}>
                                <span className={styles.workflowStep}>{item.step}</span>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.cta}>
                <div className={styles.container}>
                    <div className={styles.ctaCard}>
                        <h2>Partner with {SITE_CONFIG.name}</h2>
                        <p>
                            Accelerate your product pipeline with custom development, contract manufacturing, or high-purity bioprocess consumables.
                        </p>
                        <div className={styles.ctaButtons}>
                            <Link href="/contact" className={styles.ctaPrimary}>
                                Connect with Business Development
                            </Link>
                            <Link href="/solutions" className={styles.ctaSecondary}>
                                Explore All Services & Products
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
