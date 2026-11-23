// Site-wide constants

export const SITE_CONFIG = {
    name: 'Leelabiologics',
    tagline: 'End-to-End Biologics CDMO',
    description: 'Leading biologics CDMO providing comprehensive drug development, manufacturing, cell & gene therapy, nucleic acid therapeutics, and analytical solutions.',
    url: 'https://leelabiologics.com',
    email: 'info@leelabiologics.com',
    phone: '91-8464043265',
    registeredOffice: {
        title: 'Registered Office',
        company: 'Leelabiologics Private Limited',
        street: 'Balaji Nagar, Pendurthi',
        city: 'Visakhapatnam',
        state: 'Andhra Pradesh',
        zip: '531171',
        country: 'India',
        full: 'Registered office: Leelabiologics Private Limited, Balaji Nagar, Pendurthi, Visakhapatnam-531171, Andhra Pradesh, India',
    },
    corporateOffice: {
        title: 'Corporate Office',
        company: 'Leelabiologics Private Limited',
        premise: '3rd Floor, World Trade Center (WTC), VM Steel Project S.O, Pragati Maidan, AIC-AMTZ Medi Valley Incubation Council, Andhra Pradesh MedTech Zone (AMTZ)',
        city: 'Visakhapatnam',
        state: 'Andhra Pradesh',
        zip: '530031',
        country: 'India',
        full: 'Corporate office: Leelabiologics Private Limited, 3rd Floor, World Trade Center (WTC), VM Steel Project S.O, Pragati Maidan, AIC-AMTZ Medi Valley Incubation Council, Andhra Pradesh MedTech Zone (AMTZ), Visakhapatnam-530031, Andhra Pradesh, India',
    },
    address: {
        street: 'Balaji Nagar, Pendurthi',
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

export interface ServiceSubsection {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    capabilities: string[];
    icon?: string;
}

export interface ServiceSection {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    icon: string;
    subsections: ServiceSubsection[];
    secondaryServices?: { label: string; href: string }[];
}

export const BIOPHARMA_CORE_SERVICES: { label: string; href: string }[] = [
    { label: 'Process Development', href: '/solutions/biologics-cdmo' },
    { label: 'Formulation Development', href: '/solutions/formulation-development' },
    { label: 'Container Selection', href: '/solutions/formulation-development' },
    { label: 'Process Characterization', href: '/solutions/technical-support' },
    { label: 'Process Performance Qualification', href: '/solutions/biologics-manufacturing' },
    { label: 'Analytical Development and Validation', href: '/solutions/analytical-solutions' },
    { label: 'Drug Product Fill Finish Operations', href: '/solutions/sterile-fill-finish' },
    { label: 'Device Testing Studies', href: '/solutions/device-design-prototyping' },
    { label: 'Extractable & Leachable Studies', href: '/solutions/scientific-writing' },
    { label: 'Toxicological Assessment', href: '/solutions/scientific-writing' },
    { label: 'Transport Simulation Studies', href: '/solutions/formulation-development' },
    { label: 'Dossier Writing', href: '/solutions/scientific-writing' },
    { label: 'Regulatory Support', href: '/solutions/device-regulatory-affairs' },
];

export const PHARMA_CORE_SERVICES: { label: string; href: string }[] = [
    { label: 'Process Development', href: '/solutions/small-molecule-api' },
    { label: 'Formulation Development', href: '/solutions/formulation-development' },
    { label: 'Container Selection', href: '/solutions/formulation-development' },
    { label: 'Process Characterization', href: '/solutions/technical-support' },
    { label: 'Process Performance Qualification', href: '/solutions/pharmaceutical-products' },
    { label: 'Analytical Development and Validation', href: '/solutions/analytical-solutions' },
    { label: 'Drug Product Fill Finish Operations', href: '/solutions/sterile-fill-finish' },
    { label: 'Device Testing Studies', href: '/solutions/device-design-prototyping' },
    { label: 'Extractable & Leachable Studies', href: '/solutions/scientific-writing' },
    { label: 'Toxicological Assessment', href: '/solutions/scientific-writing' },
    { label: 'Transport Simulation Studies', href: '/solutions/formulation-development' },
    { label: 'Dossier Writing', href: '/solutions/scientific-writing' },
    { label: 'Regulatory Support', href: '/solutions/scientific-writing' },
];

export const SERVICE_SECTIONS: ServiceSection[] = [
    {
        id: 'biotechnology-products',
        title: 'Biotechnology Products',
        slug: 'biotechnology-products',
        shortDescription: 'High-titer mAbs, recombinant proteins, mRNA therapeutics, biosimilars, and therapeutic enzymes from discovery to cGMP batch release.',
        icon: 'dna',
        secondaryServices: BIOPHARMA_CORE_SERVICES,
        subsections: [
            {
                id: 'monoclonal-antibodies-recombinant-proteins',
                title: 'Monoclonal Antibodies & Recombinant Proteins',
                slug: 'monoclonal-antibodies-recombinant-proteins',
                shortDescription: 'High-titer mammalian cell culture (CHO/HEK), bispecific antibodies, antibody-drug conjugates (ADCs), and therapeutic recombinant enzymes.',
                capabilities: ['CHO-K1 / DG44 expression', 'Perfusion & fed-batch bioreactors', 'Affinity chromatography', 'ADC conjugation chemistry'],
                icon: 'flask',
            },
            {
                id: 'nucleic-acid-therapeutics',
                title: 'Nucleic Acid Therapeutics & mRNA',
                slug: 'nucleic-acid-therapeutics',
                shortDescription: 'In vitro transcription (IVT), mRNA synthesis, siRNA/ASO development, and advanced lipid nanoparticle (LNP) encapsulation.',
                capabilities: ['High-yield IVT synthesis', 'Microfluidic LNP formulation', 'Capping & polyadenylation', 'Capillary electrophoresis purity analysis'],
                icon: 'rna',
            },
            {
                id: 'biosimilars-biobetters',
                title: 'Biosimilars & Biobetters',
                slug: 'biosimilars-biobetters',
                shortDescription: 'Comprehensive physicochemical and functional comparability studies, clone selection, and regulatory-compliant biosimilar scale-up.',
                capabilities: ['Peptide mapping & glycan profiling', 'SPR binding kinetics', 'ADCC/CDC bioassays', 'ICH Q6B analytical packages'],
                icon: 'microscope',
            },
            {
                id: 'vaccines-immunotherapeutics',
                title: 'Vaccines & Immunotherapeutics',
                slug: 'vaccines-immunotherapeutics',
                shortDescription: 'Recombinant protein subunit vaccines, viral vector-based vaccines, and next-generation conjugate platforms.',
                capabilities: ['Antigen design & expression', 'Adjuvant formulation & stability', 'Sterility & endotoxin assurance', 'Cold-chain stability validation'],
                icon: 'support',
            },
            {
                id: 'recombinant-enzymes-proteins',
                title: 'Recombinant Enzymes & Therapeutic Proteins',
                slug: 'recombinant-enzymes-proteins',
                shortDescription: 'Custom enzyme engineering, microbial and fungal expression, refolding processes, and high-purity downstream isolation.',
                capabilities: ['E. coli / Pichia pastoris fermentation', 'Inclusion body refolding', 'Cross-flow ultrafiltration', 'Activity & kinetic characterization'],
                icon: 'flask',
            },
        ],
    },
    {
        id: 'pharmaceutical-products',
        title: 'Pharmaceutical Products',
        slug: 'pharmaceutical-products',
        shortDescription: 'Synthetic chemistry, small molecule API scale-up, custom formulation, oral solids, and automated aseptic fill-finish injectables.',
        icon: 'flask',
        secondaryServices: PHARMA_CORE_SERVICES,
        subsections: [
            {
                id: 'small-molecule-api',
                title: 'Small Molecule API & Intermediates',
                slug: 'small-molecule-api',
                shortDescription: 'Synthetic process chemistry, route scouting, crystallization development, and cGMP API manufacturing at scale.',
                capabilities: ['Multi-step organic synthesis', 'Pilot plant scale-up (up to 5,000L)', 'Flow chemistry', 'Polymorph screening & particle engineering'],
                icon: 'flask',
            },
            {
                id: 'formulation-development',
                title: 'Formulation & Drug Product Development',
                slug: 'formulation-development',
                shortDescription: 'Center of excellence for oral solid dosage (tablets, capsules), parenteral formulations, and bioavailability enhancement.',
                capabilities: ['Pre-formulation screening', 'Solubility enhancement (nanomilling/dispersion)', 'Taste-masking', 'Modified-release matrices'],
                icon: 'document',
            },
            {
                id: 'sterile-fill-finish',
                title: 'Sterile Fill & Finish',
                slug: 'sterile-fill-finish',
                shortDescription: 'High-speed automated aseptic filling for vials, pre-filled syringes (PFS), and cartridges with terminal sterilization or aseptic processing.',
                capabilities: ['Isolator-based aseptic lines', 'Automated visual inspection', 'Lyophilization cycle optimization', 'Nitrogen headspace purging'],
                icon: 'factory',
            },
            {
                id: 'specialty-injectables',
                title: 'Generic & Specialty Injectables',
                slug: 'specialty-injectables',
                shortDescription: 'Complex generic formulations, lyophilized injectables, depot suspensions, and ophthalmic solutions.',
                capabilities: ['Emulsions & liposomal injectables', 'Sustained-release microspheres', 'Preservative-free ophthalmic packaging', 'Bioequivalence batch manufacturing'],
                icon: 'support',
            },
            {
                id: 'analytical-solutions',
                title: 'Analytical Solutions & Quality Control',
                slug: 'analytical-solutions',
                shortDescription: 'Method development and validation, ICH stability testing, trace impurity profiling, and release testing.',
                capabilities: ['UPLC/HPLC & LC-MS/MS impurity profiling', 'Elemental impurity testing (ICP-MS)', 'Dissolution testing', 'ICH stability storage chambers'],
                icon: 'microscope',
            },
        ],
    },
    {
        id: 'cell-and-gene-therapies',
        title: 'Cell & Gene Therapies',
        slug: 'cell-and-gene-therapies',
        shortDescription: 'Advanced ATMP manufacturing: AAV and Lentivirus viral vectors, closed-system CAR-T/NK cell processing, GMP plasmid DNA, and CRISPR gene editing.',
        icon: 'dna',
        subsections: [
            {
                id: 'viral-vector-manufacturing',
                title: 'Viral Vector Manufacturing (AAV & Lentivirus)',
                slug: 'viral-vector-manufacturing',
                shortDescription: 'High-yield upstream and downstream manufacturing of AAV (serotypes 1-9), Lentivirus, and retroviral vectors up to 500L bioreactors.',
                capabilities: ['Triple transfection & suspension HEK293/Sf9', 'Full vs empty capsid separation (AEX/AUC)', 'Genomic titer qPCR & ddPCR', 'Host cell protein & residual DNA clearance'],
                icon: 'dna',
            },
            {
                id: 'cell-processing-immunotherapies',
                title: 'Cell Processing & Immunotherapies (CAR-T / CAR-NK)',
                slug: 'cell-processing-immunotherapies',
                shortDescription: 'Closed-system cell isolation, genetic modification, activation, and clinical-scale expansion for autologous and allogeneic cell therapies.',
                capabilities: ['Automated selection (CliniMACS Prodigy)', 'Electroporation & viral transduction', 'Large-scale bioreactor cell expansion', 'Controlled-rate cryopreservation'],
                icon: 'flask',
            },
            {
                id: 'plasmid-dna-manufacturing',
                title: 'Plasmid DNA & Starting Materials',
                slug: 'plasmid-dna-manufacturing',
                shortDescription: 'High-purity research to GMP-grade plasmid DNA production providing critical starting material for viral vectors and mRNA therapeutics.',
                capabilities: ['High-copy microbial fermentation (up to 300L)', 'Alkaline lysis & chromatographic purification', '>90% supercoiled monomer fraction', 'Endotoxin-free (<0.05 EU/mg) certification'],
                icon: 'document',
            },
            {
                id: 'gene-editing-non-viral',
                title: 'Gene Editing & Non-Viral Therapeutics',
                slug: 'gene-editing-non-viral',
                shortDescription: 'CRISPR/Cas9 ribonucleoprotein (RNP) complexes, zinc-finger nucleases, and non-viral nanoparticle delivery platforms.',
                capabilities: ['Guide RNA (gRNA) design & validation', 'RNP complex formulation & stability', 'Non-viral lipid & polymeric delivery', 'Targeted genome integration verification'],
                icon: 'rna',
            },
            {
                id: 'cgt-analytical-release',
                title: 'CGT Analytical Characterization & Release',
                slug: 'cgt-analytical-release',
                shortDescription: 'Specialized cell characterization, vector potency assays, replication-competent virus testing (RCA/RCL), and GxP release testing.',
                capabilities: ['Multicolor flow cytometry (immunophenotyping)', 'Vector copy number (VCN) ddPCR assays', 'Replication-competent virus screening', 'Rapid sterility & mycoplasma testing'],
                icon: 'microscope',
            },
        ],
    },
    {
        id: 'regenerative-medicine',
        title: 'Regenerative Medicine',
        slug: 'regenerative-medicine',
        shortDescription: 'Clinical-grade MSCs/iPSCs, extrusion-based 3D bioprinting scaffolds, acellular ECM matrices, exosome therapeutics, and bioactive wound care.',
        icon: 'support',
        subsections: [
            {
                id: 'stem-cell-therapies',
                title: 'Stem Cell Therapies & iPSCs',
                slug: 'stem-cell-therapies',
                shortDescription: 'Derivation, characterization, banking, and directed differentiation of Mesenchymal Stem Cells (MSCs) and Induced Pluripotent Stem Cells (iPSCs).',
                capabilities: ['Bone marrow/adipose/cord tissue MSCs', 'Feeder-free iPSC reprogramming', 'Multilineage differentiation verification', 'Master & Working Cell Bank cryo-storage'],
                icon: 'dna',
            },
            {
                id: 'tissue-engineering-bioprinting',
                title: 'Tissue Engineering & 3D Bioprinting',
                slug: 'tissue-engineering-bioprinting',
                shortDescription: 'Cellularized biomaterial constructs, extrusion-based 3D bioprinting, and vascularized 3D tissue models for therapeutic grafting.',
                capabilities: ['Bio-ink formulation & shear rheology', 'Photocrosslinkable hydrogel scaffolds', 'Perfusion bioreactor tissue maturation', 'Biomechanical tensile & compressive testing'],
                icon: 'factory',
            },
            {
                id: 'acellular-ecm-scaffolds',
                title: 'Acellular & Extracellular Matrix (ECM) Scaffolds',
                slug: 'acellular-ecm-scaffolds',
                shortDescription: 'Decellularized biological matrices and synthetic bioabsorbable polymer scaffolds for surgical repair and tissue reconstruction.',
                capabilities: ['Detergent-free decellularization protocols', 'Residual DNA depletion (<50 ng/mg)', 'Ultrastructural SEM preservation analysis', 'EtO & e-beam sterilization validation'],
                icon: 'support',
            },
            {
                id: 'exosome-therapeutics',
                title: 'Exosome & Extracellular Vesicle (EV) Therapeutics',
                slug: 'exosome-therapeutics',
                shortDescription: 'Isolation, surface functionalization, and formulation of therapeutic exosomes derived from MSCs and targeted cell lines.',
                capabilities: ['TFF & size-exclusion chromatographic isolation', 'Nanoparticle Tracking Analysis (NTA)', 'Surface marker validation (CD9, CD63, CD81)', 'Cargo loading (miRNA/small molecules)'],
                icon: 'microscope',
            },
            {
                id: 'wound-healing-biomaterials',
                title: 'Bioactive Wound Healing & Regenerative Biomaterials',
                slug: 'wound-healing-biomaterials',
                shortDescription: 'Advanced collagen matrices, growth factor-impregnated hydrogels, and bioactive dressings accelerating tissue regeneration.',
                capabilities: ['Sustained growth factor release kinetics', 'ISO 10993 biocompatibility testing', 'Antimicrobial silver/peptide functionalization', 'Pilot to commercial packaging'],
                icon: 'flask',
            },
        ],
    },
    {
        id: 'medical-devices',
        title: 'Medical Devices',
        slug: 'medical-devices',
        shortDescription: 'Combination drug delivery devices, rapid IVD test kits, sterile surgical implants, design controls (DHF/DMR), and global regulatory compliance (CER, PMS/PMCF).',
        icon: 'support',
        subsections: [
            {
                id: 'drug-delivery-systems',
                title: 'Drug Delivery Systems & Combination Products',
                slug: 'drug-delivery-systems',
                shortDescription: 'Auto-injectors, pen injectors, pre-filled safety syringes, and wearable continuous infusion systems compliant with 21 CFR Part 4 and ISO 11608.',
                capabilities: [
                    'Dose accuracy & injection force characterization',
                    'IEC 62366-1 Human Factors Engineering (HFE) & Usability',
                    '21 CFR Part 4 combination product regulatory compliance',
                    'Drug-device compatibility & container closure integrity (CCIT)',
                ],
                icon: 'factory',
            },
            {
                id: 'in-vitro-diagnostics',
                title: 'In Vitro Diagnostics (IVD) & Rapid Test Kits',
                slug: 'in-vitro-diagnostics',
                shortDescription: 'Point-of-care test kits, lateral flow immunoassays, molecular diagnostic cartridges, and biosensors aligned with EU IVDR 2017/746 and FDA CLIA requirements.',
                capabilities: [
                    'IVDR 2017/746 Technical Files & Performance Evaluation Reports (PER)',
                    'Analytical sensitivity, specificity & cross-reactivity validation',
                    'Nitrocellulose strip assembly & microfluidic cartridge bonding',
                    'EN ISO 23640 reagent stability testing & batch release verification',
                ],
                icon: 'microscope',
            },
            {
                id: 'surgical-implantable-devices',
                title: 'Sterile Surgical & Implantable Devices',
                slug: 'surgical-implantable-devices',
                shortDescription: 'Bioabsorbable scaffolds, surgical catheters, orthopedic implants, and precision consumables manufactured under ISO 13485 cleanroom controls.',
                capabilities: [
                    'ISO 10993-1 Biological Evaluation Plans (BEP) & Reports (BER)',
                    'Toxicological risk assessments & chemical characterization (ISO 10993-18)',
                    'ISO 11135 (EtO) & ISO 11137 (Gamma) sterilization validations',
                    'ISO 14644 Class 7/8 cleanroom packaging & sterile barrier validation (ISO 11607)',
                ],
                icon: 'support',
            },
            {
                id: 'device-design-prototyping',
                title: 'Device Design Controls, Prototyping & Verification',
                slug: 'device-design-prototyping',
                shortDescription: 'CAD engineering, FEA simulations, rapid prototyping, and full Design Controls (DHF/DMR) per 21 CFR 820.30 & ISO 13485:2016.',
                capabilities: [
                    'Design History File (DHF) & Device Master Record (DMR) compilation',
                    'Design Verification & Validation (V&V) protocol execution',
                    'Mechanical fatigue cycling, simulated transit, and drop testing',
                    'Requirement Traceability Matrix (RTM) from user needs to risk controls',
                ],
                icon: 'document',
            },
            {
                id: 'device-regulatory-affairs',
                title: 'Regulatory Affairs, Clinical Evaluation (CER) & PMS/PMCF',
                slug: 'device-regulatory-affairs',
                shortDescription: 'Comprehensive regulatory affairs consultancy and technical documentation: Clinical Evaluation Reports (CER/CEP), EU MDR 2017/745 & IVDR 2017/746 Technical Files, FDA 510(k)/PMA submissions, and active Post-Market Surveillance (PMS) with Post-Market Clinical Follow-up (PMCF).',
                capabilities: [
                    'Clinical Evaluation Reports (CER) & CEP per MEDDEV 2.7/1 Rev 4 & EU MDR Annex XIV',
                    'Post-Market Surveillance (PMS) plans, PMSR & Periodic Safety Update Reports (PSUR)',
                    'Post-Market Clinical Follow-up (PMCF) study design, protocols & evaluation reports',
                    'State of the Art (SOTA) systematic literature reviews & clinical data appraisal',
                    'EU MDR 2017/745 & IVDR 2017/746 Technical Documentation & Notified Body audits',
                    'US FDA 510(k), De Novo, and PMA submissions & FDA QSR / QMSR alignment',
                    'ISO 14971:2019 Risk Management files (hazard identification & FMEA)',
                    'Global vigilance reporting, incident investigation & trend reporting',
                ],
                icon: 'support',
            },
            {
                id: 'post-market-surveillance-pms',
                title: 'Post-Market Surveillance (PMS)',
                slug: 'post-market-surveillance-pms',
                shortDescription: 'Proactive PMS plans, Periodic Safety Update Reports (PSUR), Post-Market Surveillance Reports (PMSR), complaint handling, and global vigilance reporting compliant with EU MDR/IVDR and FDA.',
                capabilities: [
                    'PMS Plan & PMSR compilation per EU MDR Articles 83-86',
                    'Periodic Safety Update Reports (PSUR) preparation & updates',
                    'Vigilance reporting, incident investigations & field safety corrective actions (FSCA)',
                    'Customer feedback analysis, complaint trend monitoring & CAPA integration',
                ],
                icon: 'support',
            },
            {
                id: 'post-market-clinical-follow-up-pmcf',
                title: 'Post-Market Clinical Follow-up (PMCF)',
                slug: 'post-market-clinical-follow-up-pmcf',
                shortDescription: 'Continuous clinical data gathering, PMCF plan design, registry studies, real-world evidence (RWE), and PMCF Evaluation Reports under EU MDR 2017/745 Annex XIV Part B.',
                capabilities: [
                    'PMCF Plan & Evaluation Report (PMCF ER) development',
                    'PMCF clinical investigation protocol design & ethics submissions',
                    'User surveys, clinical registries & real-world evidence (RWE) studies',
                    'Continuous risk-benefit ratio re-evaluation & clinical evidence updates',
                ],
                icon: 'document',
            },
        ],
    },
    {
        id: 'bioprocess-consumables',
        title: 'Bioprocess Consumables',
        slug: 'bioprocess-consumables',
        shortDescription: 'High-purity single-use bioreactor bags (up to 2,000L), sterile filtration media, chemically defined cell culture reagents, and fluid transfer systems.',
        icon: 'factory',
        subsections: [
            {
                id: 'single-use-assemblies',
                title: 'Single-Use Bioreactor Bags & Fluid Assemblies',
                slug: 'single-use-assemblies',
                shortDescription: '2D/3D storage bags (50mL to 2,000L), single-use mixing systems, and custom gamma-irradiated fluid pathways.',
                capabilities: ['Low-extractable multilayer film', 'Custom tubing manifold design', 'Integral sterile filter capsules', '100% pressure decay integrity testing'],
                icon: 'factory',
            },
            {
                id: 'filtration-purification-media',
                title: 'Filtration & Purification Media',
                slug: 'filtration-purification-media',
                shortDescription: 'High-performance depth filters, sterilizing grade polyethersulfone (PES/PVDF) membranes, and TFF cassettes.',
                capabilities: ['Bioburden reduction filtration', 'Viral clearance filters', 'Ultrafiltration / diafiltration cassettes', 'Bubble-point integrity verification'],
                icon: 'microscope',
            },
            {
                id: 'cell-culture-media-buffers',
                title: 'Cell Culture Media, Feeds & Buffers',
                slug: 'cell-culture-media-buffers',
                shortDescription: 'Chemically defined cell culture media, recombinant feed supplements, cryopreservation solutions, and USP-grade process buffers.',
                capabilities: ['Powder & liquid media blending', 'Animal-Origin-Free (AOF) certified', 'Custom amino acid/vitamin spiking', 'Endotoxin-tested process buffers'],
                icon: 'flask',
            },
            {
                id: 'aseptic-transfer-systems',
                title: 'Aseptic Connectors, Tubing & Transfer Systems',
                slug: 'aseptic-transfer-systems',
                shortDescription: 'Thermoplastic elastomer (TPE) welding tubing, platinum-cured silicone tubing, and sterile quick-connectors.',
                capabilities: ['Sterile welding & sealing compatibility', 'Peristaltic pump life validation', 'USP Class VI compliance', 'Autoclave & gamma resistance'],
                icon: 'support',
            },
            {
                id: 'chromatography-resins-columns',
                title: 'Chromatography Resins & Pre-Packed Columns',
                slug: 'chromatography-resins-columns',
                shortDescription: 'Protein A affinity resins, ion exchange (IEX), hydrophobic interaction (HIC), and pre-packed GMP columns.',
                capabilities: ['High dynamic binding capacity resins', 'Wide pH stability range', 'Pre-packed format with HETP/asymmetry certs', 'CIP cleaning validation'],
                icon: 'flask',
            },
        ],
    },
    {
        id: 'animal-healthcare-products',
        title: 'Animal Healthcare Products',
        slug: 'animal-healthcare-products',
        shortDescription: 'Targeted veterinary vaccines, companion and livestock pharmaceuticals, rapid pen-side diagnostics, and custom veterinary CDMO manufacturing.',
        icon: 'support',
        subsections: [
            {
                id: 'veterinary-biologics-vaccines',
                title: 'Veterinary Biologics & Vaccines',
                slug: 'veterinary-biologics-vaccines',
                shortDescription: 'Inactivated and live-attenuated vaccines, recombinant veterinary antibodies, and herd-specific prophylactic biologics.',
                capabilities: ['Avian, bovine, porcine, canine vaccines', 'Multi-antigen combination formulations', 'Adjuvant stabilization', 'Lyophilized animal vaccines'],
                icon: 'dna',
            },
            {
                id: 'veterinary-pharmaceuticals',
                title: 'Veterinary Pharmaceuticals & Therapeutics',
                slug: 'veterinary-pharmaceuticals',
                shortDescription: 'Injectable veterinary therapeutics, antimicrobials, anti-inflammatory compounds, and targeted parasiticide formulations.',
                capabilities: ['Sustained-release pour-on/injectables', 'Palatability-optimized oral suspensions', 'Stability in farm environments', 'Flock & herd dosing solutions'],
                icon: 'flask',
            },
            {
                id: 'veterinary-diagnostics',
                title: 'Veterinary Diagnostics & Rapid Field Testing',
                slug: 'veterinary-diagnostics',
                shortDescription: 'Rapid point-of-care field tests for livestock infectious diseases, companion animal wellness panels, and ELISA kits.',
                capabilities: ['Pen-side rapid antigen cassettes', 'Milk/blood pathogen screening', 'Canine/feline vector-borne panels', 'Veterinary ELISA kits'],
                icon: 'microscope',
            },
            {
                id: 'animal-feed-supplements',
                title: 'Animal Nutritional Health & Feed Supplements',
                slug: 'animal-feed-supplements',
                shortDescription: 'Probiotics, therapeutic enzyme additives, electrolyte supplements, and immune-supporting feed formulations.',
                capabilities: ['Microencapsulated probiotics', 'Heat-stable feed pellet additives', 'Chelated mineral premixes', 'Veterinary nutraceutical development'],
                icon: 'support',
            },
            {
                id: 'veterinary-cdmo',
                title: 'Veterinary Contract Manufacturing (CDMO)',
                slug: 'veterinary-cdmo',
                shortDescription: 'Dedicated veterinary GMP manufacturing, pilot batch formulation, aseptic vial fill-finish, and commercial packaging.',
                capabilities: ['Segregated veterinary production blocks', 'Flexible pilot to commercial batch sizes', 'Multi-dose vial filling', 'Global veterinary dossier support'],
                icon: 'factory',
            },
        ],
    },
];

// Flat list of all services for backward compatibility and direct mapping
export const SERVICES = [
    // 1. Biotechnology Products
    {
        id: 'biotechnology-products',
        title: 'Biotechnology Products',
        slug: 'biotechnology-products',
        shortDescription: 'Advanced biologic therapeutic development and cGMP manufacturing across recombinant modalities, cellular systems, and genomic medicines.',
        icon: 'dna',
        category: 'Biotechnology Products',
    },
    {
        id: 'monoclonal-antibodies-recombinant-proteins',
        title: 'Monoclonal Antibodies & Recombinant Proteins',
        slug: 'monoclonal-antibodies-recombinant-proteins',
        shortDescription: 'High-titer mammalian cell culture (CHO/HEK), bispecific antibodies, ADCs, and therapeutic enzymes.',
        icon: 'flask',
        category: 'Biotechnology Products',
    },
    {
        id: 'cell-gene-therapy',
        title: 'Cell & Gene Therapy (ATMPs)',
        slug: 'cell-gene-therapy',
        shortDescription: 'Viral vector production (AAV, Lentivirus), CAR-T/NK cell manufacturing, and personalized regenerative medicines.',
        icon: 'dna',
        category: 'Biotechnology Products',
    },
    {
        id: 'nucleic-acid-therapeutics',
        title: 'Nucleic Acid Therapeutics & mRNA',
        slug: 'nucleic-acid-therapeutics',
        shortDescription: 'mRNA synthesis, siRNA/ASO development, and advanced lipid nanoparticle (LNP) formulation.',
        icon: 'rna',
        category: 'Biotechnology Products',
    },
    {
        id: 'biosimilars-biobetters',
        title: 'Biosimilars & Biobetters',
        slug: 'biosimilars-biobetters',
        shortDescription: 'Comprehensive comparability studies, clone selection, and regulatory-compliant biosimilar scale-up.',
        icon: 'microscope',
        category: 'Biotechnology Products',
    },
    {
        id: 'vaccines-immunotherapeutics',
        title: 'Vaccines & Immunotherapeutics',
        slug: 'vaccines-immunotherapeutics',
        shortDescription: 'Recombinant subunit vaccines, viral vector-based vaccines, and conjugate platforms.',
        icon: 'support',
        category: 'Biotechnology Products',
    },

    // 2. Pharmaceutical Products
    {
        id: 'pharmaceutical-products',
        title: 'Pharmaceutical Products',
        slug: 'pharmaceutical-products',
        shortDescription: 'Comprehensive development, scale-up, and cGMP manufacturing for small molecule active substances and sterile injectables.',
        icon: 'flask',
        category: 'Pharmaceutical Products',
    },
    {
        id: 'small-molecule-api',
        title: 'Small Molecule API & Intermediates',
        slug: 'small-molecule-api',
        shortDescription: 'Synthetic process chemistry, route scouting, crystallization development, and cGMP API manufacturing at scale.',
        icon: 'flask',
        category: 'Pharmaceutical Products',
    },
    {
        id: 'formulation-development',
        title: 'Formulation & Drug Product Development',
        slug: 'formulation-development',
        shortDescription: 'Center of excellence for oral solid dosage (tablets, capsules), parenteral formulations, and bioavailability enhancement.',
        icon: 'document',
        category: 'Pharmaceutical Products',
    },
    {
        id: 'sterile-fill-finish',
        title: 'Sterile Fill & Finish',
        slug: 'sterile-fill-finish',
        shortDescription: 'High-speed automated aseptic filling for vials, pre-filled syringes (PFS), and cartridges with isolator technology.',
        icon: 'factory',
        category: 'Pharmaceutical Products',
    },
    {
        id: 'specialty-injectables',
        title: 'Generic & Specialty Injectables',
        slug: 'specialty-injectables',
        shortDescription: 'Complex generic formulations, lyophilized injectables, depot suspensions, and ophthalmic solutions.',
        icon: 'support',
        category: 'Pharmaceutical Products',
    },
    {
        id: 'analytical-solutions',
        title: 'Analytical Solutions & Quality Control',
        slug: 'analytical-solutions',
        shortDescription: 'Method development and validation, ICH stability testing, trace impurity profiling, and release testing.',
        icon: 'microscope',
        category: 'Pharmaceutical Products',
    },

    // 3. Medical Devices
    {
        id: 'medical-devices',
        title: 'Medical Devices',
        slug: 'medical-devices',
        shortDescription: 'Comprehensive medical device engineering, cleanroom assembly, Clinical Evaluation (CER/CEP), and global regulatory compliance (MDR/IVDR, FDA, PMS/PMCF).',
        icon: 'support',
        category: 'Medical Devices',
    },
    {
        id: 'drug-delivery-systems',
        title: 'Drug Delivery Systems & Combination Products',
        slug: 'drug-delivery-systems',
        shortDescription: 'Auto-injectors, pen injectors, pre-filled safety syringes, and wearable continuous infusion systems compliant with 21 CFR Part 4.',
        icon: 'factory',
        category: 'Medical Devices',
    },
    {
        id: 'in-vitro-diagnostics',
        title: 'In Vitro Diagnostics (IVD) & Rapid Test Kits',
        slug: 'in-vitro-diagnostics',
        shortDescription: 'Point-of-care test kits, lateral flow immunoassays, molecular diagnostics cartridges, and biosensors aligned with EU IVDR.',
        icon: 'microscope',
        category: 'Medical Devices',
    },
    {
        id: 'surgical-implantable-devices',
        title: 'Sterile Surgical & Implantable Devices',
        slug: 'surgical-implantable-devices',
        shortDescription: 'Bioabsorbable scaffolds, surgical catheters, orthopedic implants, and precision consumables with ISO 10993 biological evaluations.',
        icon: 'support',
        category: 'Medical Devices',
    },
    {
        id: 'device-design-prototyping',
        title: 'Device Design Controls, Prototyping & Verification',
        slug: 'device-design-prototyping',
        shortDescription: 'CAD engineering, FEA simulations, rapid prototyping, and Design History File (DHF) controls per ISO 13485.',
        icon: 'document',
        category: 'Medical Devices',
    },
    {
        id: 'device-regulatory-affairs',
        title: 'Regulatory Affairs, Clinical Evaluation (CER) & PMS/PMCF',
        slug: 'device-regulatory-affairs',
        shortDescription: 'Clinical Evaluation Reports (CER/CEP), EU MDR/IVDR Technical Files, FDA 510(k)/PMA submissions, and proactive Post-Market Surveillance (PMS/PMCF).',
        icon: 'support',
        category: 'Medical Devices',
    },
    {
        id: 'post-market-surveillance-pms',
        title: 'Post-Market Surveillance (PMS)',
        slug: 'post-market-surveillance-pms',
        shortDescription: 'Proactive PMS plans, Periodic Safety Update Reports (PSUR), PMSR, complaint handling, and global vigilance reporting compliant with EU MDR/IVDR and FDA.',
        icon: 'support',
        category: 'Medical Devices',
    },
    {
        id: 'post-market-clinical-follow-up-pmcf',
        title: 'Post-Market Clinical Follow-up (PMCF)',
        slug: 'post-market-clinical-follow-up-pmcf',
        shortDescription: 'Continuous clinical data gathering, PMCF plan design, registry studies, real-world evidence (RWE), and PMCF Evaluation Reports under EU MDR 2017/745 Annex XIV Part B.',
        icon: 'document',
        category: 'Medical Devices',
    },

    // 4. Bioprocess Consumables
    {
        id: 'bioprocess-consumables',
        title: 'Bioprocess Consumables',
        slug: 'bioprocess-consumables',
        shortDescription: 'High-purity single-use bioprocessing assemblies, sterile filtration media, specialized cell culture reagents, and fluid transfer solutions.',
        icon: 'factory',
        category: 'Bioprocess Consumables',
    },
    {
        id: 'single-use-assemblies',
        title: 'Single-Use Bioreactor Bags & Fluid Assemblies',
        slug: 'single-use-assemblies',
        shortDescription: '2D/3D storage bags (50mL to 2,000L), single-use mixing systems, and custom gamma-irradiated fluid pathways.',
        icon: 'factory',
        category: 'Bioprocess Consumables',
    },
    {
        id: 'filtration-purification-media',
        title: 'Filtration & Purification Media',
        slug: 'filtration-purification-media',
        shortDescription: 'High-performance depth filters, sterilizing grade polyethersulfone (PES/PVDF) membranes, and TFF cassettes.',
        icon: 'microscope',
        category: 'Bioprocess Consumables',
    },
    {
        id: 'cell-culture-media-buffers',
        title: 'Cell Culture Media, Feeds & Buffers',
        slug: 'cell-culture-media-buffers',
        shortDescription: 'Chemically defined cell culture media, recombinant feed supplements, cryopreservation solutions, and USP-grade process buffers.',
        icon: 'flask',
        category: 'Bioprocess Consumables',
    },
    {
        id: 'aseptic-transfer-systems',
        title: 'Aseptic Connectors, Tubing & Transfer Systems',
        slug: 'aseptic-transfer-systems',
        shortDescription: 'Thermoplastic elastomer (TPE) welding tubing, platinum-cured silicone tubing, and sterile quick-connectors.',
        icon: 'support',
        category: 'Bioprocess Consumables',
    },
    {
        id: 'chromatography-resins-columns',
        title: 'Chromatography Resins & Pre-Packed Columns',
        slug: 'chromatography-resins-columns',
        shortDescription: 'Protein A affinity resins, ion exchange (IEX), hydrophobic interaction (HIC), and pre-packed GMP columns.',
        icon: 'flask',
        category: 'Bioprocess Consumables',
    },

    // 5. Animal Healthcare Products
    {
        id: 'animal-healthcare-products',
        title: 'Animal Healthcare Products',
        slug: 'animal-healthcare-products',
        shortDescription: 'Targeted veterinary biologics, specialized pharmaceuticals, diagnostics, and nutritional health solutions for livestock and companion animals.',
        icon: 'support',
        category: 'Animal Healthcare Products',
    },
    {
        id: 'veterinary-biologics-vaccines',
        title: 'Veterinary Biologics & Vaccines',
        slug: 'veterinary-biologics-vaccines',
        shortDescription: 'Inactivated and live-attenuated vaccines, recombinant veterinary antibodies, and herd-specific prophylactic biologics.',
        icon: 'dna',
        category: 'Animal Healthcare Products',
    },
    {
        id: 'veterinary-pharmaceuticals',
        title: 'Veterinary Pharmaceuticals & Therapeutics',
        slug: 'veterinary-pharmaceuticals',
        shortDescription: 'Injectable veterinary therapeutics, antimicrobials, anti-inflammatory compounds, and targeted parasiticide formulations.',
        icon: 'flask',
        category: 'Animal Healthcare Products',
    },
    {
        id: 'veterinary-diagnostics',
        title: 'Veterinary Diagnostics & Rapid Field Testing',
        slug: 'veterinary-diagnostics',
        shortDescription: 'Rapid point-of-care field tests for livestock infectious diseases, companion animal wellness panels, and ELISA kits.',
        icon: 'microscope',
        category: 'Animal Healthcare Products',
    },
    {
        id: 'animal-feed-supplements',
        title: 'Animal Nutritional Health & Feed Supplements',
        slug: 'animal-feed-supplements',
        shortDescription: 'Probiotics, therapeutic enzyme additives, electrolyte supplements, and immune-supporting feed formulations.',
        icon: 'support',
        category: 'Animal Healthcare Products',
    },
    {
        id: 'veterinary-cdmo',
        title: 'Veterinary Contract Manufacturing (CDMO)',
        slug: 'veterinary-cdmo',
        shortDescription: 'Dedicated veterinary GMP manufacturing, pilot batch formulation, aseptic vial fill-finish, and commercial packaging.',
        icon: 'factory',
        category: 'Animal Healthcare Products',
    },
];

export interface NavSubsection {
    label: string;
    href: string;
}

export interface NavSection {
    label: string;
    href: string;
    description?: string;
    icon?: string;
    subsections: NavSubsection[];
}

export interface NavChild {
    label: string;
    href: string;
    items?: NavSubsection[];
}

export interface NavItem {
    label: string;
    href: string;
    sections?: NavSection[];
    children?: NavChild[];
}

export const NAVIGATION: {
    main: NavItem[];
    footer: {
        solutions: { label: string; href: string }[];
        company: { label: string; href: string }[];
        legal: { label: string; href: string }[];
    };
} = {
    main: [
        { label: 'Home', href: '/' },
        { label: 'About us', href: '/about' },
        {
            label: 'Services',
            href: '/solutions',
            children: [
                {
                    label: 'Biotechnology Products',
                    href: '/solutions/biotechnology-products',
                    items: BIOPHARMA_CORE_SERVICES,
                },
                {
                    label: 'Pharmaceutical Products',
                    href: '/solutions/pharmaceutical-products',
                    items: PHARMA_CORE_SERVICES,
                },
                {
                    label: 'Cell & Gene Therapies',
                    href: '/solutions/cell-and-gene-therapies',
                    items: [
                        { label: 'Viral Vector Manufacturing (AAV & Lentivirus)', href: '/solutions/viral-vector-manufacturing' },
                        { label: 'Cell Processing & Immunotherapies (CAR-T / NK)', href: '/solutions/cell-processing-immunotherapies' },
                        { label: 'Plasmid DNA & Starting Materials', href: '/solutions/plasmid-dna-manufacturing' },
                        { label: 'Gene Editing & Non-Viral Delivery', href: '/solutions/gene-editing-non-viral' },
                        { label: 'CGT Analytical Characterization & Release', href: '/solutions/cgt-analytical-release' },
                    ],
                },
                {
                    label: 'Regenerative Medicine',
                    href: '/solutions/regenerative-medicine',
                    items: [
                        { label: 'Stem Cell Therapies & iPSCs', href: '/solutions/stem-cell-therapies' },
                        { label: 'Tissue Engineering & 3D Bioprinting', href: '/solutions/tissue-engineering-bioprinting' },
                        { label: 'Acellular & ECM Scaffolds', href: '/solutions/acellular-ecm-scaffolds' },
                        { label: 'Exosome & Extracellular Vesicles (EV)', href: '/solutions/exosome-therapeutics' },
                        { label: 'Bioactive Wound Healing & Biomaterials', href: '/solutions/wound-healing-biomaterials' },
                    ],
                },
                {
                    label: 'Medical Devices',
                    href: '/solutions/medical-devices',
                    items: [
                        { label: 'Drug Delivery Systems & Combination Products', href: '/solutions/drug-delivery-systems' },
                        { label: 'In Vitro Diagnostics (IVD) & Rapid Kits', href: '/solutions/in-vitro-diagnostics' },
                        { label: 'Sterile Surgical & Implantable Devices', href: '/solutions/surgical-implantable-devices' },
                        { label: 'Device Design Controls, Prototyping & V&V', href: '/solutions/device-design-prototyping' },
                        { label: 'Regulatory Affairs, Clinical Evaluation (CER)', href: '/solutions/device-regulatory-affairs' },
                        { label: 'Post-Market Surveillance (PMS)', href: '/solutions/post-market-surveillance-pms' },
                        { label: 'Post-Market Clinical Follow-up (PMCF)', href: '/solutions/post-market-clinical-follow-up-pmcf' },
                    ],
                },
                {
                    label: 'Bioprocess Consumables',
                    href: '/solutions/bioprocess-consumables',
                    items: [
                        { label: 'Single-Use Bioreactor Bags & Fluid Assemblies', href: '/solutions/single-use-assemblies' },
                        { label: 'Filtration & Purification Media', href: '/solutions/filtration-purification-media' },
                        { label: 'Cell Culture Media, Feeds & Buffers', href: '/solutions/cell-culture-media-buffers' },
                        { label: 'Aseptic Connectors & Transfer Systems', href: '/solutions/aseptic-transfer-systems' },
                        { label: 'Chromatography Resins & Pre-Packed Columns', href: '/solutions/chromatography-resins-columns' },
                    ],
                },
                {
                    label: 'Animal Healthcare Products',
                    href: '/solutions/animal-healthcare-products',
                    items: [
                        { label: 'Veterinary Biologics & Vaccines', href: '/solutions/veterinary-biologics-vaccines' },
                        { label: 'Veterinary Pharmaceuticals & Therapeutics', href: '/solutions/veterinary-pharmaceuticals' },
                        { label: 'Veterinary Diagnostics & Rapid Field Testing', href: '/solutions/veterinary-diagnostics' },
                        { label: 'Animal Nutritional Health & Feed Supplements', href: '/solutions/animal-feed-supplements' },
                        { label: 'Veterinary Contract Manufacturing (CDMO)', href: '/solutions/veterinary-cdmo' },
                    ],
                },
                { label: 'View All Services & Solutions', href: '/solutions' },
            ],
        },
        { label: 'Careers', href: '/careers' },
    ],
    footer: {
        solutions: [
            { label: 'Biotechnology Products', href: '/solutions/biotechnology-products' },
            { label: 'Pharmaceutical Products', href: '/solutions/pharmaceutical-products' },
            { label: 'Cell & Gene Therapies', href: '/solutions/cell-and-gene-therapies' },
            { label: 'Regenerative Medicine', href: '/solutions/regenerative-medicine' },
            { label: 'Medical Devices', href: '/solutions/medical-devices' },
            { label: 'Bioprocess Consumables', href: '/solutions/bioprocess-consumables' },
            { label: 'Animal Healthcare Products', href: '/solutions/animal-healthcare-products' },
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

export const GOVERNMENT_RECOGNITIONS = [
    {
        name: 'MSME',
        fullName: 'Ministry of Micro, Small & Medium Enterprises',
        logo: '/images/msme-logo.png',
    },
    {
        name: 'DPIIT',
        fullName: 'Department for Promotion of Industry and Internal Trade',
        logo: '/images/dpiit-logo.png',
    },
];

export const STATS = [
    { value: '150+', label: 'Projects Completed' },
    { value: '20+', label: 'Years Experience' },
    { value: '50+', label: 'Global Clients' },
    { value: '99.8%', label: 'Quality Rate' },
];

export interface ModalityGroup {
    category: string;
    options: string[];
}

export const MODALITY_GROUPS: ModalityGroup[] = [
    {
        category: 'Biotechnology Products',
        options: [
            'Biotechnology Products (All / General)',
            'Monoclonal Antibodies & Recombinant Proteins',
            'Nucleic Acid Therapeutics & mRNA',
            'Biosimilars & Biobetters',
            'Vaccines & Immunotherapeutics',
            'Recombinant Enzymes & Therapeutic Proteins',
        ],
    },
    {
        category: 'Pharmaceutical Products',
        options: [
            'Pharmaceutical Products (All / General)',
            'Small Molecule API & Intermediates',
            'Formulation & Drug Product Development',
            'Sterile Fill & Finish (Vials / PFS / Cartridges)',
            'Generic & Specialty Injectables',
            'Analytical Solutions & Quality Control',
        ],
    },
    {
        category: 'Cell & Gene Therapies',
        options: [
            'Cell & Gene Therapies (All / General)',
            'Viral Vector Manufacturing (AAV & Lentivirus)',
            'Cell Processing & Immunotherapies (CAR-T / CAR-NK)',
            'Plasmid DNA & Starting Materials',
            'Gene Editing & Non-Viral Delivery',
            'CGT Analytical Characterization & Release',
        ],
    },
    {
        category: 'Regenerative Medicine',
        options: [
            'Regenerative Medicine (All / General)',
            'Stem Cell Therapies & iPSCs',
            'Tissue Engineering & 3D Bioprinting Scaffolds',
            'Acellular & ECM Scaffolds',
            'Exosome & Extracellular Vesicle (EV) Therapeutics',
            'Bioactive Wound Healing & Regenerative Biomaterials',
        ],
    },
    {
        category: 'Medical Devices',
        options: [
            'Medical Devices (All / General)',
            'Drug Delivery Systems & Combination Products',
            'In Vitro Diagnostics (IVD) & Rapid Test Kits',
            'Sterile Surgical & Implantable Devices',
            'Device Design Controls, Prototyping & Verification (DHF/DMR)',
            'Regulatory Affairs, Clinical Evaluation (CER) & PMS/PMCF',
            'Post-Market Surveillance (PMS)',
            'Post-Market Clinical Follow-up (PMCF)',
        ],
    },
    {
        category: 'Bioprocess Consumables',
        options: [
            'Bioprocess Consumables (All / General)',
            'Single-Use Bioreactor Bags & Fluid Assemblies',
            'Filtration & Purification Media (TFF / Viral Filters)',
            'Cell Culture Media, Feeds & Process Buffers',
            'Aseptic Connectors, Tubing & Transfer Systems',
            'Chromatography Resins & Pre-Packed Columns',
        ],
    },
    {
        category: 'Animal Healthcare Products',
        options: [
            'Animal Healthcare Products (All / General)',
            'Veterinary Biologics & Vaccines',
            'Veterinary Pharmaceuticals & Therapeutics',
            'Veterinary Diagnostics & Rapid Field Testing',
            'Animal Nutritional Health & Feed Supplements',
            'Veterinary Contract Manufacturing (CDMO)',
        ],
    },
    {
        category: 'Integrated & Custom Solutions',
        options: [
            'Multi-Disciplinary / Integrated CRDMO Program',
            'Other Custom Development / Manufacturing Requirement',
        ],
    },
];

export const MODALITIES: string[] = MODALITY_GROUPS.flatMap((group) => group.options);

export const PROJECT_TIMELINES = [
    'Immediate (< 1 month)',
    'Short-term (1-3 months)',
    'Medium-term (3-6 months)',
    'Long-term (6-12 months)',
    'Planning stage (> 12 months)',
];
