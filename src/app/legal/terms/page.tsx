import type { Metadata } from 'next';
import styles from '../legal.module.css';

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Leela Biologics Private Limited terms of service outlining the terms and conditions for using our website and services.',
};

export default function TermsPage() {
    return (
        <div className={styles.legal}>
            <div className={styles.container}>
                <h1>Terms of Service</h1>
                <p className={styles.updated}>Last updated: December 2024</p>

                <section>
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using the Leela Biologics Private Limited website (&quot;Site&quot;) or services,
                        you agree to be bound by these Terms of Service. If you do not agree to
                        these terms, please do not use our Site or services.
                    </p>
                </section>

                <section>
                    <h2>2. Services Description</h2>
                    <p>
                        Leela Biologics Private Limited provides contract development and manufacturing services for
                        biologics, including but not limited to cell line development, process
                        development, analytical services, and GMP manufacturing. Specific services
                        are subject to separate written agreements.
                    </p>
                </section>

                <section>
                    <h2>3. Intellectual Property</h2>
                    <p>
                        All content on this Site, including text, graphics, logos, images, and
                        software, is the property of Leela Biologics Private Limited or its licensors and is
                        protected by intellectual property laws. You may not reproduce, modify,
                        or distribute any content without our written permission.
                    </p>
                </section>

                <section>
                    <h2>4. Confidentiality</h2>
                    <p>
                        Information submitted through this Site, including project inquiries, is
                        treated as confidential. For formal confidentiality protections, a
                        Confidential Disclosure Agreement (CDA) must be executed prior to
                        sharing proprietary information.
                    </p>
                </section>

                <section>
                    <h2>5. Limitation of Liability</h2>
                    <p>
                        This Site and its content are provided &quot;as is&quot; without warranties of any kind.
                        Leela Biologics Private Limited shall not be liable for any damages arising from your use of
                        the Site or reliance on any information provided herein.
                    </p>
                </section>

                <section>
                    <h2>6. Third-Party Links</h2>
                    <p>
                        Our Site may contain links to third-party websites. We are not responsible
                        for the content, privacy practices, or terms of use of these external sites.
                    </p>
                </section>

                <section>
                    <h2>7. Governing Law</h2>
                    <p>
                        These Terms shall be governed by and construed in accordance with the laws
                        of the State of North Carolina, USA, without regard to conflicts of law principles.
                    </p>
                </section>

                <section>
                    <h2>8. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these Terms at any time. Changes become
                        effective upon posting to the Site. Continued use of the Site constitutes
                        acceptance of modified terms.
                    </p>
                </section>

                <section>
                    <h2>9. Contact</h2>
                    <p>
                        For questions about these Terms or any support, please contact us at:
                        <br /><br />
                        <strong>Email:</strong> info@leelabiologics.com
                    </p>
                </section>
            </div>
        </div>
    );
}
