import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG, NAVIGATION, COMPLIANCE_BADGES } from '@/lib/constants';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.topSection}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        {/* Brand & Info Column */}
                        <div className={styles.brandColumn}>
                            <div className={styles.logo}>
                                <Image
                                    src="/images/logo.png"
                                    alt={`${SITE_CONFIG.name} Logo`}
                                    width={40}
                                    height={40}
                                    style={{ objectFit: 'contain' }}
                                />
                                <span className={styles.logoText}>{SITE_CONFIG.name}</span>
                            </div>
                            <p className={styles.tagline}>{SITE_CONFIG.description}</p>
                            
                            <div className={styles.contactInfo}>
                                <a href={`mailto:${SITE_CONFIG.email}`} className={styles.contactLink}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    {SITE_CONFIG.email}
                                </a>
                                <a href={`tel:${SITE_CONFIG.phone}`} className={styles.contactLink}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                    </svg>
                                    {SITE_CONFIG.phone}
                                </a>
                            </div>

                            <div className={styles.certBadges}>
                                {COMPLIANCE_BADGES.slice(0, 4).map((badge, index) => (
                                    <span key={index} className={styles.certBadge} title={badge.label}>
                                        {badge.label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Columns */}
                        <div className={styles.navGroup}>
                            {/* Solutions */}
                            <div className={styles.navColumn}>
                                <h3 className={styles.columnTitle}>Capabilities</h3>
                                <ul className={styles.navList}>
                                    {NAVIGATION.footer.solutions.map((item, index) => (
                                        <li key={index}>
                                            <Link href={item.href} className={styles.navLink}>
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                    <li>
                                        <Link href="/solutions" className={styles.navLink} style={{ color: 'var(--color-primary-400)' }}>
                                            View All Solutions →
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Company */}
                            <div className={styles.navColumn}>
                                <h3 className={styles.columnTitle}>Company</h3>
                                <ul className={styles.navList}>
                                    {NAVIGATION.footer.company.map((item, index) => (
                                        <li key={index}>
                                            <Link href={item.href} className={styles.navLink}>
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Legal & Support */}
                            <div className={styles.navColumn}>
                                <h3 className={styles.columnTitle}>Legal & Support</h3>
                                <ul className={styles.navList}>
                                    <li><Link href="/contact" className={styles.navLink}>Contact Us</Link></li>
                                    {NAVIGATION.footer.legal.map((item, index) => (
                                        <li key={index}>
                                            <Link href={item.href} className={styles.navLink}>
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.bottomSection}>
                <div className={styles.container}>
                    <div className={styles.bottomContent}>
                        <div className={styles.copyrightGroup}>
                            <p className={styles.copyright}>
                                © {currentYear} {SITE_CONFIG.name}. All rights reserved.
                            </p>
                            <p className={styles.address}>
                                {SITE_CONFIG.address.street}, {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} {SITE_CONFIG.address.zip}
                            </p>
                        </div>
                        
                        <div className={styles.social}>
                            <a href={SITE_CONFIG.social.twitter} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
