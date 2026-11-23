import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE_CONFIG } from '@/lib/constants';
import { JOB_OPENINGS, findJobByIdOrSlug } from '@/lib/jobs';
import JobApplicationForm from './JobApplicationForm';
import styles from './jobDetail.module.css';

interface PageProps {
    params: {
        id: string;
    };
}

export function generateStaticParams() {
    const idParams = JOB_OPENINGS.map((job) => ({ id: job.id }));
    const slugParams = JOB_OPENINGS.map((job) => ({ id: job.slug }));
    return [...idParams, ...slugParams];
}

export function generateMetadata({ params }: PageProps): Metadata {
    const job = findJobByIdOrSlug(params.id);
    if (!job) return { title: 'Position Not Found | Careers' };

    return {
        title: `${job.title} - Careers | ${SITE_CONFIG.name}`,
        description: `${job.shortDescription} Join ${SITE_CONFIG.name} in ${job.location}. Apply now or email ${job.email}.`,
        openGraph: {
            title: `${job.title} | ${SITE_CONFIG.name}`,
            description: job.shortDescription,
            type: 'website',
            url: `${SITE_CONFIG.url}/careers/${params.id}`,
        },
    };
}

export default function JobDetailPage({ params }: PageProps) {
    const job = findJobByIdOrSlug(params.id);
    if (!job) {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: job.title,
        description: job.overview,
        identifier: {
            '@type': 'PropertyValue',
            name: SITE_CONFIG.name,
            value: job.reqId,
        },
        datePosted: '2024-01-15',
        validThrough: '2026-12-31',
        employmentType: 'FULL_TIME',
        hiringOrganization: {
            '@type': 'Organization',
            name: SITE_CONFIG.name,
            sameAs: SITE_CONFIG.url,
            logo: `${SITE_CONFIG.url}/images/logo.png`,
        },
        jobLocation: {
            '@type': 'Place',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Visakhapatnam',
                addressRegion: 'Andhra Pradesh',
                postalCode: '530031',
                addressCountry: 'IN',
            },
        },
        directApply: true,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <div className={styles.breadcrumb}>
                        <Link href="/">Home</Link>
                        <span>/</span>
                        <Link href="/careers">Careers</Link>
                        <span>/</span>
                        <span>{job.title}</span>
                    </div>

                    <div className={styles.badgeGroup}>
                        <span className={styles.badge}>Job Requisition: {job.reqId}</span>
                        <span className={`${styles.badge} ${styles.badgeAccent}`}>{job.department}</span>
                        <span className={styles.badge}>{job.type}</span>
                    </div>

                    <h1 className={styles.jobTitle}>{job.title}</h1>

                    <div className={styles.jobMetaRow}>
                        <div className={styles.metaItem}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span>{job.location}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            <span>Experience: {job.experience}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <span>Contact: {job.email}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Layout */}
            <section className={styles.contentSection}>
                <div className={styles.container}>
                    <div className={styles.layoutGrid}>
                        {/* Main Description */}
                        <div className={styles.jobMainCard}>
                            <div className={styles.sectionBlock}>
                                <h2 className={styles.sectionHeading}>Role Overview</h2>
                                <p className={styles.paragraph}>{job.overview}</p>
                            </div>

                            <div className={styles.sectionBlock}>
                                <h2 className={styles.sectionHeading}>Key Responsibilities</h2>
                                <ul className={styles.checkList}>
                                    {job.responsibilities.map((resp, idx) => (
                                        <li key={idx}>{resp}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.sectionBlock}>
                                <h2 className={styles.sectionHeading}>Qualifications & Competencies</h2>
                                <ul className={styles.checkList}>
                                    {job.qualifications.map((qual, idx) => (
                                        <li key={idx}>{qual}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.sectionBlock}>
                                <h2 className={styles.sectionHeading}>Life at {SITE_CONFIG.name}</h2>
                                <p className={styles.paragraph}>
                                    We offer market-leading compensation, comprehensive medical and life insurance, performance bonuses, state-of-the-art cleanroom facilities in Visakhapatnam, and collaborative professional development in next-generation therapeutics.
                                </p>
                            </div>
                        </div>

                        {/* Sidebar Application Form */}
                        <div className={styles.sidebarSticky}>
                            <JobApplicationForm job={job} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
