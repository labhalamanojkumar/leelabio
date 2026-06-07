'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG, NAVIGATION } from '@/lib/constants';
import styles from './Header.module.css';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
    };

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                {/* Logo */}
                <div className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <Image
                            src="/images/logo.png"
                            alt={`${SITE_CONFIG.name} Logo`}
                            width={40}
                            height={40}
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <span className={styles.logoText}>{SITE_CONFIG.name}</span>
                </div>

                {/* Desktop Navigation */}
                <nav className={styles.desktopNav}>
                    {NAVIGATION.main.map((item) => (
                        <div
                            key={item.label}
                            className={styles.navItem}
                            onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link href={item.href} className={styles.navLink}>
                                {item.label}
                                {item.children && (
                                    <svg className={styles.chevron} viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </Link>

                            {/* Dropdown Menu */}
                            {item.children && activeDropdown === item.label && (
                                <div className={styles.dropdown}>
                                    <div className={styles.dropdownContent}>
                                        {item.children.map((child) => (
                                            <Link key={child.label} href={child.href} className={styles.dropdownLink}>
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* CTA Buttons */}
                <div className={styles.actions}>
                    <Link href="/contact" className={styles.ctaButton}>
                        Request Quote
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`${styles.mobileMenuBtn} ${isMobileMenuOpen ? styles.active : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
                <nav className={styles.mobileNav}>
                    {NAVIGATION.main.map((item) => (
                        <div key={item.label} className={styles.mobileNavItem}>
                            <Link
                                href={item.href}
                                className={styles.mobileNavLink}
                                onClick={() => !item.children && toggleMobileMenu()}
                            >
                                {item.label}
                            </Link>
                            {item.children && (
                                <div className={styles.mobileSubnav}>
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.label}
                                            href={child.href}
                                            className={styles.mobileSubnavLink}
                                            onClick={toggleMobileMenu}
                                        >
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <Link href="/contact" className={styles.mobileCta} onClick={toggleMobileMenu}>
                        Request Quote
                    </Link>
                </nav>
            </div>
        </header>
    );
}
