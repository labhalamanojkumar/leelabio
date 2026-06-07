'use client';

import { useState, useEffect } from 'react';
import styles from './CookieConsent.module.css';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const hasConsented = localStorage.getItem('cookieConsent');
        if (!hasConsented) {
            // Delay showing the banner
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem('cookieConsent', 'all');
        setIsVisible(false);
        // Here you would typically initialize analytics, etc.
    };

    const handleAcceptEssential = () => {
        localStorage.setItem('cookieConsent', 'essential');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className={styles.banner}>
            <div className={styles.content}>
                <div className={styles.text}>
                    <h4>Cookie Preferences</h4>
                    <p>
                        We use cookies to enhance your experience, analyze site traffic, and
                        for marketing purposes. By clicking &quot;Accept All&quot;, you consent to our
                        use of cookies. Read our{' '}
                        <a href="/legal/cookies">Cookie Policy</a> and{' '}
                        <a href="/legal/privacy">Privacy Policy</a>.
                    </p>
                </div>
                <div className={styles.actions}>
                    <button
                        onClick={handleAcceptEssential}
                        className={styles.btnSecondary}
                    >
                        Essential Only
                    </button>
                    <button
                        onClick={handleAcceptAll}
                        className={styles.btnPrimary}
                    >
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    );
}
