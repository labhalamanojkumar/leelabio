import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import styles from '../legal.module.css';

export const metadata: Metadata = {
    title: 'GMP & Quality Statement | Leela Biologics',
    description: 'Leela Biologics Quality Statement detailing our rigorous compliance with global cGMP and GLP regulations, including FDA, EMA, and ICH guidelines for biologics manufacturing.',
    keywords: [
        'GMP statement',
        'quality assurance biologics',
        'cGMP compliance',
        'GLP laboratory',
        'FDA compliant CDMO',
        'EMA certified'
    ],
    openGraph: {
        title: 'GMP & Quality Statement | Leela Biologics',
        description: 'Review our uncompromising commitment to global quality standards and regulatory compliance.',
        type: 'website',
        url: `${SITE_CONFIG.url}/legal/gmp-statement`,
    },
    alternates: {
        canonical: `${SITE_CONFIG.url}/legal/gmp-statement`,
    },
};

export default function GMPStatementPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'GMP & Quality Statement - Leela Biologics',
        description: metadata.description,
        url: `${SITE_CONFIG.url}/legal/gmp-statement`,
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
                        <h1>GMP & Quality Statement</h1>
                        <p className={styles.updated}>Last updated: December 2024</p>
                    </header>

                    <section>
                        <h2>Our Unwavering Commitment to Quality</h2>
                        <p>
                            At Leela Biologics Private Limited, quality is not just a department—it is the foundational pillar of our corporate culture. We recognize that the biologics we develop and manufacture are destined for patients whose lives depend on them. 
                            Therefore, we maintain rigorous, phase-appropriate Quality Management Systems (QMS) that comply strictly with current Good Manufacturing Practice (cGMP) and Good Laboratory Practice (GLP) regulations globally.
                        </p>
                    </section>

                    <section>
                        <h2>Global Regulatory Compliance</h2>
                        <h3>cGMP Compliance (Manufacturing)</h3>
                        <p>Our manufacturing facilities, cleanrooms, and production processes are designed, validated, and operated in accordance with:</p>
                        <ul>
                            <li><strong>US FDA:</strong> 21 CFR Parts 210 and 211 (cGMP for Drugs), and 21 CFR Part 600 (Biological Products).</li>
                            <li><strong>European Union:</strong> EudraLex Volume 4 (EU Guidelines to Good Manufacturing Practice).</li>
                            <li><strong>ICH Guidelines:</strong> Stringent adherence to ICH Q7 (API), Q8 (Pharmaceutical Development), Q9 (Quality Risk Management), Q10 (Pharmaceutical Quality System), and Q11.</li>
                            <li><strong>PIC/S:</strong> Pharmaceutical Inspection Co-operation Scheme guidelines.</li>
                        </ul>

                        <h3>GLP Compliance (Analytical & R&D)</h3>
                        <p>Our analytical development, characterization, and quality control laboratories operate under strict controls aligned with:</p>
                        <ul>
                            <li>21 CFR Part 58 (FDA GLP regulations for nonclinical laboratory studies).</li>
                            <li>OECD Principles of Good Laboratory Practice.</li>
                            <li>Data Integrity standards complying with 21 CFR Part 11 and EU Annex 11.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Facility Certifications & Registrations</h2>
                        <p>We proactively maintain our facility registrations and certifications to ensure seamless global market access for our clients:</p>
                        <ul>
                            <li>FDA Registered and Inspected Manufacturing Facility</li>
                            <li>EMA GMP Certified Operations</li>
                            <li>ISO 9001:2015 Certified Quality Management System</li>
                            <li>CDSCO (India) approved manufacturing licenses</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Comprehensive Quality Assurance (QA) Programs</h2>
                        <p>Our independent Quality Assurance unit oversees all GxP activities through comprehensive programs including:</p>
                        <ul>
                            <li><strong>Electronic Quality Management System (eQMS):</strong> Streamlined document control, deviations, CAPAs, and change management.</li>
                            <li><strong>Validation & Qualification:</strong> Robust Equipment, Facility, Utility (EFU), and Process validation lifecycles.</li>
                            <li><strong>Supplier Quality Management:</strong> Rigorous auditing and qualification of raw material suppliers and critical vendors.</li>
                            <li><strong>Training:</strong> Continuous, role-specific GxP training and competency assessments for all personnel.</li>
                            <li><strong>Environmental Monitoring:</strong> State-of-the-art continuous monitoring of classified cleanroom environments.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Audit Readiness & Transparency</h2>
                        <p>
                            We maintain a perpetual state of &quot;audit readiness.&quot; Our facilities have a strong history of successful inspections by major regulatory authorities. 
                            We view our clients as true partners and welcome routine client audits, Person-in-Plant (PiP) arrangements, and transparent, real-time access to batch records and analytical data through secure portals.
                        </p>
                    </section>

                    <section>
                        <h2>Contact Quality Assurance</h2>
                        <p>
                            To request our Quality Manual, review our regulatory inspection history, or schedule a facility audit, please contact our Quality department:
                            <br /><br />
                            <strong>Email:</strong> quality@leelabiologics.com<br />
                            <strong>Address:</strong> Quality Unit, Leela Biologics Private Limited, Visakhapatnam, AP, India
                        </p>
                    </section>
                </article>
            </div>
        </main>
    );
}
