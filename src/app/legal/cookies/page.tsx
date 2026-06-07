import type { Metadata } from 'next';
import styles from '../legal.module.css';

export const metadata: Metadata = {
    title: 'Cookie Policy',
    description: 'Leela Biologics Private Limited cookie policy describing how we use cookies and similar technologies on our website.',
};

export default function CookiePolicyPage() {
    return (
        <div className={styles.legal}>
            <div className={styles.container}>
                <h1>Cookie Policy</h1>
                <p className={styles.updated}>Last updated: December 2024</p>

                <section>
                    <h2>1. What Are Cookies?</h2>
                    <p>
                        Cookies are small text files that are placed on your device when you visit
                        a website. They are widely used to make websites work more efficiently and
                        to provide information to website owners.
                    </p>
                </section>

                <section>
                    <h2>2. How We Use Cookies</h2>
                    <p>We use cookies to:</p>
                    <ul>
                        <li>Remember your preferences and settings</li>
                        <li>Understand how you use our website</li>
                        <li>Improve your browsing experience</li>
                        <li>Analyze website traffic and performance</li>
                        <li>Deliver relevant marketing content (with consent)</li>
                    </ul>
                </section>

                <section>
                    <h2>3. Types of Cookies We Use</h2>

                    <h3>Essential Cookies</h3>
                    <p>
                        These cookies are necessary for the website to function properly. They enable
                        core functionality such as security, network management, and accessibility.
                    </p>

                    <h3>Analytics Cookies</h3>
                    <p>
                        We use analytics cookies (such as Google Analytics) to understand how visitors
                        interact with our website. This helps us improve our content and user experience.
                    </p>

                    <h3>Functional Cookies</h3>
                    <p>
                        These cookies enable enhanced functionality and personalization, such as
                        remembering your preferences or form inputs.
                    </p>

                    <h3>Marketing Cookies</h3>
                    <p>
                        With your consent, we may use marketing cookies to deliver relevant
                        advertisements and track the effectiveness of our marketing campaigns.
                    </p>
                </section>

                <section>
                    <h2>4. Managing Cookies</h2>
                    <p>
                        You can control and manage cookies in several ways:
                    </p>
                    <ul>
                        <li>Use our cookie consent banner to accept or reject optional cookies</li>
                        <li>Adjust your browser settings to block or delete cookies</li>
                        <li>Use browser extensions to manage cookie preferences</li>
                    </ul>
                    <p>
                        Note that blocking certain cookies may impact your experience on our website.
                    </p>
                </section>

                <section>
                    <h2>5. Third-Party Cookies</h2>
                    <p>
                        Some cookies are placed by third-party services that appear on our pages.
                        We do not control these cookies. Please review the respective privacy
                        policies of these third parties for more information.
                    </p>
                </section>

                <section>
                    <h2>6. Changes to This Policy</h2>
                    <p>
                        We may update this Cookie Policy from time to time. Changes will be
                        posted on this page with an updated revision date.
                    </p>
                </section>

                <section>
                    <h2>7. Contact Us</h2>
                    <p>
                        If you have questions about our use of cookies, please contact us at:
                        <br /><br />
                        <strong>Email:</strong> privacy@leelabiologics.com
                    </p>
                </section>
            </div>
        </div>
    );
}
