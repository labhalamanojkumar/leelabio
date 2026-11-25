'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/features/CookieConsent';

export default function SiteChrome() {
    const pathname = usePathname();
    if (pathname.startsWith('/admin')) return null;

    return (
        <>
            <Header />
            <Footer />
            <CookieConsent />
        </>
    );
}
