import type { Metadata } from 'next';
import styles from '../legal.module.css';

export const metadata: Metadata = {
    title: 'GMP/GLP Quality Statement',
    description: 'Leelabiologics quality statement outlining our GMP and GLP compliance, certifications, and commitment to quality.',
};

export default function GMPStatementPage() {
    return (
        <div className={styles.legal}>
            <div className={styles.container}>
                <h1>GMP/GLP Quality Statement</h1>
                <p className={styles.updated}>Last updated: December 2024</p>

                <section>
                    <h2>Our Commitment to Quality</h2>
                    <p>
                        Leelabiologics is committed to the highest standards of quality in all aspects
                        of our operations. We maintain rigorous quality management systems that comply
                        with current Good Manufacturing Practice (cGMP) and Good Laboratory Practice (GLP)
                        regulations.
                    </p>
                </section>

                <section>
                    <h2>Regulatory Compliance</h2>
                    <h3>GMP Compliance</h3>
                    <p>Our manufacturing facilities are designed and operated in accordance with:</p>
                    <ul>
                        <li>21 CFR Parts 210, 211 (FDA cGMP for drugs)</li>
                        <li>21 CFR Part 600 (FDA biologics regulations)</li>
                        <li>EudraLex Volume 4 (EU GMP guidelines)</li>
                        <li>ICH Q7, Q8, Q9, Q10, Q11 guidelines</li>
                        <li>PIC/S GMP guidelines</li>
                    </ul>

                    <h3>GLP Compliance</h3>
                    <p>Our analytical and development laboratories operate under:</p>
                    <ul>
                        <li>21 CFR Part 58 (FDA GLP regulations)</li>
                        <li>OECD Principles of Good Laboratory Practice</li>
                    </ul>
                </section>

                <section>
                    <h2>Certifications & Registrations</h2>
                    <ul>
                        <li>FDA Registered Facility</li>
                        <li>EMA GMP Certified</li>
                        <li>ISO 9001:2015 Certified Quality Management System</li>
                        <li>State Pharmaceutical Licenses</li>
                    </ul>
                </section>

                <section>
                    <h2>Quality Assurance Programs</h2>
                    <p>Our comprehensive quality assurance programs include:</p>
                    <ul>
                        <li>Document control and change management</li>
                        <li>Deviation and CAPA management</li>
                        <li>Qualification and validation programs</li>
                        <li>Supplier qualification and management</li>
                        <li>Internal and external audit programs</li>
                        <li>Ongoing personnel training and competency assessment</li>
                        <li>Environmental monitoring programs</li>
                        <li>Stability testing programs</li>
                    </ul>
                </section>

                <section>
                    <h2>Quality Control</h2>
                    <p>
                        Our quality control laboratories are equipped with state-of-the-art analytical
                        instrumentation and staffed by experienced scientists. We perform comprehensive
                        testing to ensure product quality, safety, and efficacy.
                    </p>
                </section>

                <section>
                    <h2>Regulatory Inspections</h2>
                    <p>
                        Our facilities have been successfully inspected by regulatory authorities
                        including the U.S. FDA and European competent authorities. We maintain an
                        inspection-ready state and welcome client audits.
                    </p>
                </section>

                <section>
                    <h2>Contact Quality Assurance</h2>
                    <p>
                        For quality-related inquiries or to request audit information, please contact:
                        <br /><br />
                        <strong>Email:</strong> quality@leelabiologics.com<br />
                        <strong>Phone:</strong> +1 (800) 555-0199
                    </p>
                </section>
            </div>
        </div>
    );
}
