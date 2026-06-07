// Site-wide type definitions

export interface Service {
    id: string;
    title: string;
    slug: string;
    description: string;
    shortDescription: string;
    icon: string;
    features: string[];
    technologies?: string[];
    compliance?: string[];
}

export interface CaseStudy {
    id: string;
    title: string;
    slug: string;
    client?: string;
    serviceArea: string;
    therapeuticArea: string;
    summary: string;
    challenge: string;
    solution: string;
    results: string[];
    image?: string;
    pdfUrl?: string;
    publishedAt: string;
}

export interface Resource {
    id: string;
    title: string;
    slug: string;
    type: 'whitepaper' | 'application-note' | 'brochure' | 'webinar' | 'publication' | 'blog';
    serviceArea: string;
    description: string;
    thumbnail?: string;
    downloadUrl?: string;
    isGated: boolean;
    publishedAt: string;
}

export interface TeamMember {
    id: string;
    name: string;
    title: string;
    bio: string;
    image?: string;
    linkedin?: string;
}

export interface Facility {
    id: string;
    name: string;
    location: string;
    description: string;
    capabilities: string[];
    certifications: string[];
    images: string[];
}

export interface JobPosting {
    id: string;
    title: string;
    department: string;
    location: string;
    type: 'full-time' | 'part-time' | 'contract';
    description: string;
    requirements: string[];
    benefits?: string[];
    applyUrl?: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface NavItem {
    label: string;
    href: string;
    children?: NavItem[];
}

export interface SEOProps {
    title: string;
    description: string;
    keywords?: string[];
    canonical?: string;
    ogImage?: string;
    noIndex?: boolean;
}

export interface ContactFormData {
    name: string;
    email: string;
    company: string;
    phone?: string;
    modality?: string;
    timeline?: string;
    message: string;
    consent: boolean;
}
