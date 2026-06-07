import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import styles from '../legal.module.css';

export const metadata: Metadata = {
    title: 'Privacy Policy | Leela Biologics',
    description: 'Leela Biologics Private Limited privacy policy describing how we collect, use, and protect your personal information in compliance with global data protection regulations.',
    keywords: [
        'privacy policy',
        'data protection',
        'Leela Biologics privacy',
        'GDPR compliance',
        'CDMO data security'
    ],
    openGraph: {
        title: 'Privacy Policy | Leela Biologics',
        description: 'Read our comprehensive privacy policy governing data protection and security.',
        type: 'website',
        url: `${SITE_CONFIG.url}/legal/privacy`,
    },
    alternates: {
        canonical: `${SITE_CONFIG.url}/legal/privacy`,
    },
};

export default function PrivacyPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Privacy Policy - Leela Biologics',
        description: metadata.description,
        url: `${SITE_CONFIG.url}/legal/privacy`,
        publisher: {
            '@type': 'Organization',
            name: SITE_CONFIG.name,
        }
    };

    return (
        <main className={styles.legal}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className={styles.container}>
                <article className={styles.legalCard}>
                    <header className={styles.header}>
                        <h1>Privacy Policy</h1>
                        <p className={styles.updated}>Last updated: December 2024</p>
                    </header>

                    <section>
                        <h2>1. Introduction & Commitment to Privacy</h2>
                        <p>
                            Leela Biologics Private Limited (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is deeply committed to protecting your privacy and ensuring the security of your personal and corporate data.
                            As a leading biologics Contract Development and Manufacturing Organization (CDMO), we understand the critical nature of confidentiality, data integrity, and regulatory compliance.
                            This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website, interact with our client portals, or engage our biomanufacturing services.
                        </p>
                    </section>

                    <section>
                        <h2>2. Information We Collect</h2>
                        <h3>Personal and Corporate Information</h3>
                        <p>We may collect information that you voluntarily provide to us during inquiries, project onboarding, or portal registration, including:</p>
                        <ul>
                            <li>Professional contact information (Name, corporate email, phone number, business address)</li>
                            <li>Company details and job title</li>
                            <li>Project specifications, molecule details (under Confidential Disclosure Agreements - CDAs), and manufacturing requirements</li>
                            <li>Communication preferences and marketing consent records</li>
                        </ul>

                        <h3>Automatically Collected Information</h3>
                        <p>When you navigate our website, we may automatically collect technical data to improve our services and ensure platform security:</p>
                        <ul>
                            <li>IP address, browser type, and operating system</li>
                            <li>Pages visited, time spent, and navigation paths</li>
                            <li>Referring website and search queries</li>
                            <li>Device identifiers and geolocation data (at the city/country level)</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. How We Use Your Information</h2>
                        <p>We process your data strictly for legitimate business purposes, including:</p>
                        <ul>
                            <li><strong>Service Delivery:</strong> To evaluate project feasibility, prepare proposals, and execute CDMO services.</li>
                            <li><strong>Communication:</strong> To respond to technical inquiries, provide project updates, and send administrative notices.</li>
                            <li><strong>Marketing (With Consent):</strong> To deliver industry whitepapers, webinar invitations, and company news (you may opt-out at any time).</li>
                            <li><strong>Platform Improvement:</strong> To analyze website traffic and optimize our digital presence.</li>
                            <li><strong>Compliance & Security:</strong> To comply with global regulatory requirements, prevent fraud, and secure our IT infrastructure.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Data Sharing and Disclosure</h2>
                        <p>
                            We <strong>do not</strong> sell your personal or corporate information. We only share information under strict confidentiality obligations with:
                        </p>
                        <ul>
                            <li><strong>Service Providers:</strong> Audited third-party vendors who assist in IT hosting, CRM management, and secure document exchange.</li>
                            <li><strong>Professional Advisors:</strong> Legal counsel, auditors, and regulatory consultants bound by confidentiality.</li>
                            <li><strong>Regulatory Authorities:</strong> Entities such as the FDA, EMA, or CDSCO, only when required by law or during facility inspections.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>5. Global Data Privacy Compliance (GDPR & CCPA)</h2>
                        <p>We align our data protection practices with global standards, including the EU General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). Depending on your jurisdiction, you have the right to:</p>
                        <ul>
                            <li>Request access to the personal data we hold about you.</li>
                            <li>Request correction of inaccurate or incomplete data.</li>
                            <li>Request erasure of your data (&quot;Right to be Forgotten&quot;).</li>
                            <li>Object to or restrict the processing of your data.</li>
                            <li>Request data portability in a structured, machine-readable format.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>6. Data Security Measures</h2>
                        <p>
                            Leela Biologics employs robust technical and organizational security measures to protect your data against unauthorized access, alteration, or destruction. This includes enterprise-grade encryption (in transit and at rest), strict access controls, regular security audits, and secure, segmented client data portals.
                        </p>
                    </section>

                    <section>
                        <h2>7. Contact Our Data Protection Officer</h2>
                        <p>
                            If you have questions regarding this Privacy Policy, wish to exercise your data rights, or need to report a privacy concern, please contact our Data Protection Officer at:
                            <br /><br />
                            <strong>Email:</strong> privacy@leelabiologics.com<br />
                            <strong>Address:</strong> Leela Biologics Private Limited, Balaji Nagar, Pendurthi, Visakhapatnam, Andhra Pradesh 531171, India
                        </p>
                    </section>
                </article>
            </div>
        </main>
    );
}
