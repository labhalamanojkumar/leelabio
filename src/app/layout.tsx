/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from 'next';
import SiteChrome from '@/components/layout/SiteChrome';
import { SITE_CONFIG } from '@/lib/constants';
import './globals.css';
import './components.css';

export const metadata: Metadata = {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
        default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
        template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    keywords: [
        'biologics CDMO',
        'contract development manufacturing',
        'cell therapy',
        'gene therapy',
        'mRNA therapeutics',
        'analytical services',
        'GMP manufacturing',
        'viral vector production',
        'LNP formulation',
        'biologics development',
    ],
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: SITE_CONFIG.url,
        siteName: SITE_CONFIG.name,
        title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
        description: SITE_CONFIG.description,
    },
    twitter: {
        card: 'summary_large_image',
        title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
        description: SITE_CONFIG.description,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code',
    },
};

// JSON-LD Schema for Organization
const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/logo.png`,
    contactPoint: {
        '@type': 'ContactPoint',
        telephone: SITE_CONFIG.phone,
        email: SITE_CONFIG.email,
        contactType: 'sales',
        availableLanguage: ['English'],
    },
    address: {
        '@type': 'PostalAddress',
        streetAddress: SITE_CONFIG.address.street,
        addressLocality: SITE_CONFIG.address.city,
        addressRegion: SITE_CONFIG.address.state,
        postalCode: SITE_CONFIG.address.zip,
        addressCountry: SITE_CONFIG.address.country,
    },
    sameAs: [
        SITE_CONFIG.social.linkedin,
        SITE_CONFIG.social.twitter,
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Preconnect to font services */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                {/* Google Fonts - Outfit & Inter */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700&display=swap"
                    rel="stylesheet"
                />

                {/* Favicon */}
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/icon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />

                {/* Theme Color */}
                <meta name="theme-color" content="#0052cc" />

                {/* JSON-LD Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(organizationSchema),
                    }}
                />
            </head>
            <body>
                <main id="main-content">
                    {children}
                </main>
                <SiteChrome />
            </body>
        </html>
    );
}
