// Site-wide constants

export const SITE_CONFIG = {
    name: 'Leela biologics',
    tagline: 'End-to-End Biologics CDMO',
    description: 'Leading biologics CDMO providing comprehensive drug development, manufacturing, cell & gene therapy, nucleic acid therapeutics, and analytical solutions.',
    url: 'https://leelabiologics.com',
    email: 'info@leelabiologics.com',
    phone: '91-8464043265',
    address: {
        street: 'Leela Biologics Private Limited, Balaji Nagar, Pendurthi',
        city: 'Visakhapatnam',
        state: 'Andhra Pradesh',
        zip: '531171',
        country: 'India',
    },
    social: {
        linkedin: 'https://www.linkedin.com/company/124953900/admin/dashboard/',
        twitter: 'https://x.com/LeelaBiologics',
    },
};

export const SERVICES = [
    {
        id: 'biologics-cdmo',
        title: 'Biologics CDMO',
        slug: 'biologics-cdmo',
        shortDescription: 'End-to-end contract development and manufacturing for biologics, from cell line to commercial supply.',
        icon: 'flask',
    },
    {
        id: 'biologics-manufacturing',
        title: 'Biologics Manufacturing',
        slug: 'biologics-manufacturing',
        shortDescription: 'Clinical to commercial-scale GMP manufacturing with flexible batch sizes and rapid scale-up.',
        icon: 'factory',
    },
    {
        id: 'cell-gene-therapy',
        title: 'Cell & Gene Therapy',
        slug: 'cell-gene-therapy',
        shortDescription: 'Viral vector production, CAR-T cell processing, and advanced therapy medicinal products (ATMPs).',
        icon: 'dna',
    },
    {
        id: 'nucleic-acid-therapeutics',
        title: 'Nucleic Acid Therapeutics',
        slug: 'nucleic-acid-therapeutics',
        shortDescription: 'mRNA, siRNA, and ASO development with LNP formulation and scale-up capabilities.',
        icon: 'rna',
    },
    {
        id: 'analytical-solutions',
        title: 'Analytical Solutions',
        slug: 'analytical-solutions',
        shortDescription: 'Comprehensive characterization, stability testing, potency assays, and release testing.',
        icon: 'microscope',
    },
    {
        id: 'scientific-writing',
        title: 'Scientific Writing',
        slug: 'scientific-writing',
        shortDescription: 'Regulatory documentation, CTD modules, IND/NDA/MAA submissions, and technical reports.',
        icon: 'document',
    },
    {
        id: 'formulation-development',
        title: 'Center of Excellence Formulation Development',
        slug: 'formulation-development',
        shortDescription: 'Expert formulation services maximizing the stability, safety, and efficacy of complex biologics.',
        icon: 'flask',
    },
    {
        id: 'technical-support',
        title: 'Technical Support',
        slug: 'technical-support',
        shortDescription: 'Dedicated project management, client portal access, and real-time sample tracking.',
        icon: 'support',
    },
];

export const NAVIGATION = {
    main: [
        { label: 'Home', href: '/' },
        { label: 'About us', href: '/about' },
        {
            label: 'Services',
            href: '/solutions',
            children: [
                { label: 'Biologics CDMO', href: '/solutions/biologics-cdmo' },
                { label: 'Biologics Manufacturing', href: '/solutions/biologics-manufacturing' },
                { label: 'Cell & Gene Therapy', href: '/solutions/cell-gene-therapy' },
                { label: 'Nucleic Acid Therapeutics', href: '/solutions/nucleic-acid-therapeutics' },
                { label: 'Analytical Solutions', href: '/solutions/analytical-solutions' },
                { label: 'Scientific Writing', href: '/solutions/scientific-writing' },
                { label: 'Center of Excellence Formulation Development', href: '/solutions/formulation-development' },
                { label: 'Technical Support', href: '/solutions/technical-support' },
            ],
        },
        { label: 'Facilities', href: '/facilities' },
        { label: 'Careers', href: '/careers' },
    ],
    footer: {
        solutions: [
            { label: 'Biologics CDMO', href: '/solutions/biologics-cdmo' },
            { label: 'Biologics Manufacturing', href: '/solutions/biologics-manufacturing' },
            { label: 'Cell & Gene Therapy', href: '/solutions/cell-gene-therapy' },
            { label: 'Analytical Solutions', href: '/solutions/analytical-solutions' },
            { label: 'Formulation Development', href: '/solutions/formulation-development' },
        ],
        company: [
            { label: 'About Us', href: '/about' },
            { label: 'Facilities', href: '/facilities' },
            { label: 'Careers', href: '/careers' },
            { label: 'News', href: '/news' },
        ],
        legal: [
            { label: 'Privacy Policy', href: '/legal/privacy' },
            { label: 'Terms of Service', href: '/legal/terms' },
            { label: 'GMP Statement', href: '/legal/gmp-statement' },
            { label: 'Cookie Policy', href: '/legal/cookies' },
        ],
    },
};

export const COMPLIANCE_BADGES = [
    { label: 'GMP Certified', icon: 'gmp' },
    { label: 'GLP Compliant', icon: 'glp' },
    { label: 'FDA Registered', icon: 'fda' },
    { label: 'EMA Certified', icon: 'ema' },
    { label: 'ISO 9001', icon: 'iso' },
];

export const STATS = [
    { value: '150+', label: 'Projects Completed' },
    { value: '25+', label: 'Years Experience' },
    { value: '50+', label: 'Global Clients' },
    { value: '99.8%', label: 'Quality Rate' },
];

export const MODALITIES = [
    'Monoclonal Antibodies',
    'Bispecific Antibodies',
    'Antibody-Drug Conjugates',
    'Recombinant Proteins',
    'Viral Vectors (AAV, Lentivirus)',
    'mRNA Therapeutics',
    'siRNA/ASO',
    'Cell Therapies',
    'Gene Therapies',
    'Vaccines',
    'Other',
];

export const PROJECT_TIMELINES = [
    'Immediate (< 1 month)',
    'Short-term (1-3 months)',
    'Medium-term (3-6 months)',
    'Long-term (6-12 months)',
    'Planning stage (> 12 months)',
];
