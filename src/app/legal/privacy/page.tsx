import type { Metadata } from 'next';
import styles from '../legal.module.css';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Leela Biologics Private Limited privacy policy describing how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
    return (
        <div className={styles.legal}>
            <div className={styles.container}>
                <h1>Privacy Policy</h1>
                <p className={styles.updated}>Last updated: December 2024</p>

                <section>
                    <h2>1. Introduction</h2>
                    <p>
                        Leela Biologics Private Limited (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
                        This Privacy Policy explains how we collect, use, disclose, and safeguard your
                        information when you visit our website or engage with our services.
                    </p>
                </section>

                <section>
                    <h2>2. Information We Collect</h2>
                    <h3>Personal Information</h3>
                    <p>We may collect personal information that you voluntarily provide, including:</p>
                    <ul>
                        <li>Name and contact information (email, phone, address)</li>
                        <li>Company name and job title</li>
                        <li>Project and inquiry details</li>
                        <li>Communication preferences</li>
                    </ul>

                    <h3>Automatically Collected Information</h3>
                    <p>When you visit our website, we may automatically collect:</p>
                    <ul>
                        <li>IP address and browser type</li>
                        <li>Pages visited and time spent</li>
                        <li>Referring website information</li>
                        <li>Device and operating system information</li>
                    </ul>
                </section>

                <section>
                    <h2>3. How We Use Your Information</h2>
                    <p>We use collected information to:</p>
                    <ul>
                        <li>Respond to your inquiries and service requests</li>
                        <li>Provide and improve our services</li>
                        <li>Send relevant marketing communications (with consent)</li>
                        <li>Analyze website usage and improve user experience</li>
                        <li>Comply with legal obligations</li>
                    </ul>
                </section>

                <section>
                    <h2>4. Data Sharing and Disclosure</h2>
                    <p>
                        We do not sell your personal information. We may share information with:
                    </p>
                    <ul>
                        <li>Service providers who assist our operations</li>
                        <li>Professional advisors (legal, accounting)</li>
                        <li>Regulatory authorities when required by law</li>
                        <li>Business partners with your consent</li>
                    </ul>
                </section>

                <section>
                    <h2>5. Your Rights</h2>
                    <p>Depending on your location, you may have rights to:</p>
                    <ul>
                        <li>Access your personal information</li>
                        <li>Correct inaccurate data</li>
                        <li>Request deletion of your data</li>
                        <li>Opt-out of marketing communications</li>
                        <li>Data portability</li>
                    </ul>
                </section>

                <section>
                    <h2>6. Data Security</h2>
                    <p>
                        We implement appropriate technical and organizational measures to protect
                        your personal information against unauthorized access, alteration, disclosure,
                        or destruction.
                    </p>
                </section>

                <section>
                    <h2>7. Contact Us</h2>
                    <p>
                        For privacy-related inquiries or any support, please contact us at:
                        <br /><br />
                        <strong>Email:</strong> info@leelabiologics.com
                    </p>
                </section>
            </div>
        </div>
    );
}
