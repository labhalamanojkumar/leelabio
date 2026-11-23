import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import styles from '../legal.module.css';

export const metadata: Metadata = {
    title: 'Terms of Service | Leelabiologics',
    description: 'Leelabiologics terms of service detailing website usage, intellectual property, confidentiality agreements (CDAs), and liability.',
    keywords: [
        'terms of service',
        'CDMO terms',
        'Leelabiologics legal',
        'intellectual property protection',
        'confidentiality agreement'
    ],
    openGraph: {
        title: 'Terms of Service | Leelabiologics',
        description: 'Terms and conditions for using the Leelabiologics website and services.',
        type: 'website',
        url: `${SITE_CONFIG.url}/legal/terms`,
    },
    alternates: {
        canonical: `${SITE_CONFIG.url}/legal/terms`,
    },
};

export default function TermsPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Terms of Service - Leelabiologics',
        description: metadata.description,
        url: `${SITE_CONFIG.url}/legal/terms`,
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
                        <h1>Terms of Service</h1>
                        <p className={styles.updated}>Last updated: December 2024</p>
                    </header>

                    <section>
                        <h2>1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using the Leelabiologics website (&quot;Site&quot;) or digital services,
                            you agree to be bound by these Terms of Service. If you do not agree to
                            these terms, please immediately cease use of our Site. These terms govern website usage only; actual CDMO services are governed by separate Master Services Agreements (MSAs).
                        </p>
                    </section>

                    <section>
                        <h2>2. Services Description & Scope</h2>
                        <p>
                            Leelabiologics provides advanced contract development and manufacturing (CDMO) services for
                            biologics, including cell line development, upstream/downstream process development, analytical characterization, and cGMP manufacturing. 
                            Information on this Site is for general informational purposes and does not constitute a binding offer to perform services. Specific service engagements are subject to separate, formally executed written agreements (such as Proposals, Statements of Work, and MSAs).
                        </p>
                    </section>

                    <section>
                        <h2>3. Intellectual Property Rights</h2>
                        <p>
                            All content present on this Site, including but not limited to text, scientific graphics, logos, images, UI design, and underlying software, is the exclusive property of Leelabiologics or its licensors, and is protected by international copyright, trademark, and intellectual property laws.
                        </p>
                        <p>
                            You may not reproduce, reverse-engineer, distribute, or create derivative works from any Site content without express written permission from our Legal department.
                        </p>
                    </section>

                    <section>
                        <h2>4. Confidentiality & CDAs</h2>
                        <p>
                            We take the protection of client Intellectual Property (IP) extremely seriously. While information submitted through this Site&apos;s contact forms is treated securely, we strongly recommend that sensitive, proprietary molecule data or trade secrets not be submitted via web forms.
                        </p>
                        <p>
                            For formal confidentiality protections, a mutually executed Confidential Disclosure Agreement (CDA) or Non-Disclosure Agreement (NDA) must be established prior to sharing proprietary scientific or business information.
                        </p>
                    </section>

                    <section>
                        <h2>5. Limitation of Liability</h2>
                        <p>
                            This Site and its content are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, either express or implied, including warranties of merchantability or fitness for a particular purpose.
                            Leelabiologics shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the Site, reliance on any scientific or technical information provided herein, or inability to access the Site.
                        </p>
                    </section>

                    <section>
                        <h2>6. Links to Third-Party Resources</h2>
                        <p>
                            Our Site may contain links to third-party websites, industry journals, or regulatory portals. We provide these links for convenience and informational purposes. We do not endorse and are not responsible for the content, scientific accuracy, privacy practices, or terms of use of these external sites.
                        </p>
                    </section>

                    <section>
                        <h2>7. Governing Law and Jurisdiction</h2>
                        <p>
                            These Terms of Service, and any disputes arising from website usage, shall be governed by and construed in accordance with the laws of India, specifically under the jurisdiction of the courts located in Andhra Pradesh, without regard to conflicts of law principles.
                        </p>
                    </section>

                    <section>
                        <h2>8. Amendments to Terms</h2>
                        <p>
                            We reserve the right to unilaterally modify, update, or revise these Terms at any time to reflect changes in our business or legal obligations. Changes become effective immediately upon posting to the Site. Your continued use of the Site constitutes acceptance of the modified Terms.
                        </p>
                    </section>

                    <section>
                        <h2>9. Contact Information</h2>
                        <p>
                            For legal inquiries regarding these Terms of Service or to request a CDA, please contact us at:
                            <br /><br />
                            <strong>Email:</strong> legal@leelabiologics.com<br />
                            <strong>Registered Office:</strong> Leelabiologics, Balaji Nagar, Pendurthi, Visakhapatnam-531171, Andhra Pradesh, India<br />
                            <strong>Corporate Office:</strong> Leelabiologics, 3rd Floor, World Trade Center (WTC), VM Steel Project S.O, Pragati Maidan, AIC-AMTZ Medi Valley Incubation Council, Andhra Pradesh MedTech Zone (AMTZ), Visakhapatnam-530031, Andhra Pradesh, India
                        </p>
                    </section>
                </article>
            </div>
        </main>
    );
}
