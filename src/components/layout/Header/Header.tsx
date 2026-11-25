'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG, NAVIGATION, NavItem } from '@/lib/constants';
import styles from './Header.module.css';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
    const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const navRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Outside click detection to close mega menu
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                }
                setActiveDropdown(null);
                setActiveSubmenu(null);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
    };

    const handleMouseEnter = (label: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setActiveDropdown(label);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        // Grace timeout so cursor movement across tabs, down to footer never drops
        timeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
            setActiveSubmenu(null);
        }, 300);
    };

    const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
        if (item.sections || item.children) {
            e.preventDefault();
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            setActiveDropdown((prev) => {
                if (prev === item.label) {
                    setActiveSubmenu(null);
                    return null;
                }
                return item.label;
            });
        }
    };

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                {/* Logo */}
                <Link href="/" className={styles.logo} aria-label={`${SITE_CONFIG.name} home`}>
                    <div className={styles.logoIcon}>
                        <Image
                            src="/images/logo.png"
                            alt={`${SITE_CONFIG.name} Logo`}
                            width={40}
                            height={40}
                            style={{ objectFit: 'contain', width: 40, height: 40 }}
                        />
                    </div>
                    <span className={styles.logoText}>{SITE_CONFIG.name}</span>
                </Link>

                {/* Desktop Navigation */}
                <nav ref={navRef} className={styles.desktopNav}>
                    {NAVIGATION.main.map((item: NavItem) => (
                        <div
                            key={item.label}
                            className={styles.navItem}
                            onMouseEnter={() => (item.sections || item.children) && handleMouseEnter(item.label)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link
                                href={item.href}
                                className={`${styles.navLink} ${activeDropdown === item.label ? styles.activeNavLink : ''}`}
                                onClick={(e) => handleNavClick(e, item)}
                            >
                                {item.label}
                                {(item.sections || item.children) && (
                                    <svg
                                        className={`${styles.chevron} ${activeDropdown === item.label ? styles.chevronRotated : ''}`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </Link>

                            {/* Dropdown Menu */}
                            {item.children && activeDropdown === item.label && (
                                <div
                                    className={styles.dropdown}
                                    onMouseEnter={() => {
                                        if (timeoutRef.current) {
                                            clearTimeout(timeoutRef.current);
                                            timeoutRef.current = null;
                                        }
                                    }}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div className={styles.dropdownContent}>
                                        {item.children.map((child) => {
                                            const hasSub = child.items && child.items.length > 0;
                                            const isAllLink = child.href === '/solutions';
                                            return (
                                                <div
                                                    key={child.label}
                                                    className={styles.dropdownItemWrapper}
                                                    onMouseEnter={() => hasSub && setActiveSubmenu(child.label)}
                                                >
                                                    <Link
                                                        href={child.href}
                                                        className={`${styles.dropdownLink} ${isAllLink ? styles.dropdownLinkAll : ''} ${activeSubmenu === child.label ? styles.activeDropdownLink : ''}`}
                                                        onClick={() => {
                                                            setActiveDropdown(null);
                                                            setActiveSubmenu(null);
                                                        }}
                                                    >
                                                        <span>{child.label}</span>
                                                        {hasSub && (
                                                            <svg className={styles.subChevron} viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
                                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                        {isAllLink && (
                                                            <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
                                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                    </Link>

                                                    {/* Additional Sub-Dropdown for each section */}
                                                    {hasSub && activeSubmenu === child.label && (
                                                        <div className={styles.subDropdown}>
                                                            <div className={styles.subDropdownContent}>
                                                                <div className={styles.subDropdownHeader}>
                                                                    {child.label}
                                                                </div>
                                                                {child.items!.map((sub) => (
                                                                    <Link
                                                                        key={sub.label}
                                                                        href={sub.href}
                                                                        className={styles.subDropdownLink}
                                                                        onClick={() => {
                                                                            setActiveDropdown(null);
                                                                            setActiveSubmenu(null);
                                                                        }}
                                                                    >
                                                                        <svg viewBox="0 0 20 20" fill="currentColor" width="12" height="12">
                                                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                                        </svg>
                                                                        <span>{sub.label}</span>
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
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
                    {NAVIGATION.main.map((item: NavItem) => (
                        <div key={item.label} className={styles.mobileNavItem}>
                            <Link
                                href={item.href}
                                className={styles.mobileNavLink}
                                onClick={() => !item.children && toggleMobileMenu()}
                            >
                                {item.label}
                            </Link>

                            {/* Mobile Subnav */}
                            {item.children && (
                                <div className={styles.mobileSubnav}>
                                    {item.children.map((child) => {
                                        const hasSub = child.items && child.items.length > 0;
                                        const isExpanded = mobileExpandedSection === child.label;
                                        return (
                                            <div key={child.label} className={styles.mobileChildGroup}>
                                                <div className={styles.mobileChildHeader}>
                                                    <Link
                                                        href={child.href}
                                                        className={styles.mobileSubnavLink}
                                                        onClick={toggleMobileMenu}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                    {hasSub && (
                                                        <button
                                                            type="button"
                                                            className={`${styles.mobileExpandBtn} ${isExpanded ? styles.mobileExpandBtnRotated : ''}`}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setMobileExpandedSection(isExpanded ? null : child.label);
                                                            }}
                                                            aria-label={`Toggle ${child.label} services`}
                                                        >
                                                            <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
                                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>
                                                {hasSub && isExpanded && (
                                                    <div className={styles.mobileSubItemsList}>
                                                        {child.items!.map((sub) => (
                                                            <Link
                                                                key={sub.label}
                                                                href={sub.href}
                                                                className={styles.mobileSubItemLink}
                                                                onClick={toggleMobileMenu}
                                                            >
                                                                <span>›</span>
                                                                <span>{sub.label}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
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
