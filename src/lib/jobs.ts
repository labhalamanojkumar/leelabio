export interface JobOpening {
    id: string;
    slug: string;
    title: string;
    department: string;
    location: string;
    type: string;
    experience: string;
    reqId: string;
    shortDescription: string;
    overview: string;
    responsibilities: string[];
    qualifications: string[];
    email: string;
}

export const JOB_OPENINGS: JobOpening[] = [
    {
        id: '1',
        slug: 'senior-scientist-process-development',
        title: 'Senior Scientist, Process Development (Upstream)',
        department: 'R&D',
        location: 'Leelabiologics, Visakhapatnam, India',
        type: 'Full-time',
        experience: '5+ Years',
        reqId: 'REQ-2024-001',
        email: 'careers@leelabiologics.com',
        shortDescription: 'Lead upstream bioprocess development for mammalian cell culture (CHO/HEK), perfusion bioreactors, and media optimization.',
        overview: 'We are seeking an experienced Senior Scientist to lead upstream bioprocess development at Leelabiologics. In this role, you will design and execute fed-batch and perfusion bioreactor runs from bench scale (2L) to pilot scale (500L), supporting monoclonal antibodies, recombinant proteins, and viral vector pipelines.',
        responsibilities: [
            'Design and optimize upstream cell culture parameters (pH, DO, feeding strategies, temperature shift) for CHO and HEK293 platforms.',
            'Lead tech transfer of upstream processes to cGMP manufacturing cleanrooms.',
            'Perform bioreactor operation, metabolite analysis (Nova Bioprofile), and statistical DoE studies.',
            'Author CMC regulatory sections, development reports, and standard operating procedures (SOPs).',
            'Collaborate with downstream purification and analytical teams to maximize product titer and quality.'
        ],
        qualifications: [
            'Ph.D. or Master\'s degree in Biochemical Engineering, Biotechnology, Molecular Biology, or related field.',
            '5+ years of industry experience in biologics upstream process development.',
            'Extensive hands-on experience with single-use bioreactors (Ambr250, 10L, 50L, 500L).',
            'Familiarity with cGMP standards, ICH Q8 guidelines, and QbD (Quality by Design) methodology.'
        ]
    },
    {
        id: '2',
        slug: 'manufacturing-associate-ii',
        title: 'Manufacturing Associate II, GMP Biologics',
        department: 'Operations',
        location: 'Leelabiologics, Visakhapatnam, India',
        type: 'Full-time',
        experience: '2-4 Years',
        reqId: 'REQ-2024-002',
        email: 'careers@leelabiologics.com',
        shortDescription: 'Execute cGMP cleanroom operations including single-use bioreactor production, aseptic sampling, and tangential flow filtration.',
        overview: 'Join our cleanroom operations team executing commercial and clinical cGMP production runs. You will operate state-of-the-art single-use bioreactors, chromatography skids, and aseptic fill-finish lines in certified Grade B/C environments.',
        responsibilities: [
            'Execute Master Batch Records (MBRs) in compliance with 21 CFR Part 211 and EU GMP guidelines.',
            'Prepare and sterilize single-use manifolds, fluid pathways, and sterile filtration assemblies.',
            'Perform in-process sampling, pH/conductivity testing, and environmental monitoring.',
            'Document all manufacturing activities in real-time following Good Documentation Practices (GDP).',
            'Assist in equipment CIP/SIP cycles, preventive maintenance, and deviation investigations.'
        ],
        qualifications: [
            'Bachelor\'s degree in Biotechnology, Biochemistry, Microbiology, or Chemical Engineering.',
            '2-4 years of experience in a pharmaceutical or biologics cGMP manufacturing cleanroom facility.',
            'Demonstrated proficiency in aseptic technique and gowning in Grade B/C cleanroom environments.',
            'Strong attention to detail, team collaboration, and compliance mindset.'
        ]
    },
    {
        id: '3',
        slug: 'quality-control-analyst',
        title: 'Quality Control Analyst (HPLC / Mass Spec)',
        department: 'Quality',
        location: 'Leelabiologics, Visakhapatnam, India',
        type: 'Full-time',
        experience: '2-5 Years',
        reqId: 'REQ-2024-003',
        email: 'careers@leelabiologics.com',
        shortDescription: 'Perform release and stability testing of biologics using UPLC/HPLC, capillary electrophoresis, and LC-MS/MS.',
        overview: 'As a QC Analyst at Leelabiologics, you will test critical quality attributes (CQAs) of therapeutic antibodies, recombinant proteins, and nucleic acid products to ensure patient safety and global regulatory compliance.',
        responsibilities: [
            'Execute analytical testing using SEC-HPLC, RP-UPLC, CEX, and capillary electrophoresis (CE-SDS, cIEF).',
            'Perform LC-MS intact mass analysis and peptide mapping for product identity and purity verification.',
            'Conduct ICH stability testing (accelerated and long-term chambers) and document results in LIMS.',
            'Participate in analytical method validation, transfer protocols, and Out-of-Specification (OOS) investigations.',
            'Maintain laboratory instrumentation, calibration schedules, and reference standard inventories.'
        ],
        qualifications: [
            'Bachelor\'s or Master\'s degree in Analytical Chemistry, Biochemistry, or Pharmacy.',
            '2-5 years of industry experience in a biologics or pharmaceutical QC laboratory.',
            'Hands-on expertise with Waters Empower / Agilent ChemStation chromatography data systems.',
            'Working knowledge of ICH guidelines (Q1A, Q2B, Q6B) and 21 CFR Part 11 electronic records.'
        ]
    },
    {
        id: '4',
        slug: 'project-manager-cdmo-services',
        title: 'Project Manager, CDMO Services',
        department: 'Program Management',
        location: 'Hybrid / Remote / Visakhapatnam',
        type: 'Full-time',
        experience: '4-7 Years',
        reqId: 'REQ-2024-004',
        email: 'careers@leelabiologics.com',
        shortDescription: 'Lead multidisciplinary CDMO client programs, managing project scope, timelines, deliverables, and cross-functional teams.',
        overview: 'We are seeking a proactive Project Manager to serve as the primary operational liaison between Leelabiologics and our global biopharma clients. You will orchestrate development programs from contract signing to commercial delivery.',
        responsibilities: [
            'Drive client project delivery, creating detailed Gantt charts, milestone tracking, and budget adherence.',
            'Lead weekly client governance meetings, steering committees, and joint project team (JPT) sessions.',
            'Coordinate internal cross-functional alignment across R&D, Operations, Quality, Regulatory, and Supply Chain.',
            'Identify project risks early and implement effective risk mitigation strategies.',
            'Manage contract amendments, out-of-scope requests, and invoicing milestones.'
        ],
        qualifications: [
            'Bachelor\'s or Master\'s degree in Life Sciences or Chemical Engineering; PMP certification preferred.',
            '4+ years of project or alliance management experience within a CDMO or pharmaceutical organization.',
            'Outstanding communication, stakeholder management, and problem-solving skills.',
            'Familiarity with drug substance (DS) and drug product (DP) development lifecycles.'
        ]
    },
    {
        id: '5',
        slug: 'regulatory-affairs-specialist',
        title: 'Regulatory Affairs Specialist (CMC & Medical Devices)',
        department: 'Regulatory',
        location: 'Leelabiologics, Visakhapatnam, India',
        type: 'Full-time',
        experience: '3-6 Years',
        reqId: 'REQ-2024-005',
        email: 'careers@leelabiologics.com',
        shortDescription: 'Prepare eCTD Module 3 dossiers, EU MDR/IVDR technical documentation, Clinical Evaluation Reports (CER), and PMS/PMCF.',
        overview: 'Join our expanding Regulatory Affairs & Quality Compliance team. You will prepare global regulatory submissions (FDA IND/BLA, EMA MAA), EU MDR/IVDR technical files, and post-market surveillance reports supporting our clients\' cutting-edge medical devices and therapeutics.',
        responsibilities: [
            'Compile and review CMC Module 3 documentation for IND, NDA, and BLA filings.',
            'Draft Technical Documentation for Medical Devices in compliance with EU MDR 2017/745 and FDA 510(k).',
            'Support Clinical Evaluation Reports (CER/CEP) and Post-Market Surveillance (PMS/PMCF) plans and updates.',
            'Review process validation, analytical validation, and stability protocols for regulatory compliance.',
            'Act as a regulatory liaison during health authority inspections and client audits.'
        ],
        qualifications: [
            'Master\'s degree in Pharmacy (Regulatory Affairs), Life Sciences, or Biomedical Engineering.',
            '3-6 years of regulatory experience in biopharma or medical device companies.',
            'In-depth knowledge of FDA, EMA, CDSCO regulations and ISO 13485 / ISO 14971 standards.',
            'Excellent technical writing and scientific dossier compilation skills.'
        ]
    },
    {
        id: '6',
        slug: 'cell-therapy-scientist',
        title: 'Cell Therapy Scientist (CAR-T / CAR-NK)',
        department: 'ATMP R&D',
        location: 'Leelabiologics, Visakhapatnam, India',
        type: 'Full-time',
        experience: '3-6 Years',
        reqId: 'REQ-2024-006',
        email: 'careers@leelabiologics.com',
        shortDescription: 'Develop autologous and allogeneic cell therapy workflows: cell isolation, viral transduction, expansion, and cryopreservation.',
        overview: 'Leelabiologics is advancing innovative Cell & Gene Therapy (ATMP) platforms. In this role, you will establish closed-system manufacturing processes for chimeric antigen receptor (CAR) T and NK cell therapies.',
        responsibilities: [
            'Develop and optimize cell processing protocols using CliniMACS Prodigy, Lonza Nucleofector, or bioreactors.',
            'Perform lentiviral and retroviral transduction for immune cell engineering.',
            'Execute multicolor flow cytometry immunophenotyping, cell viability assays, and cytotoxicity bioassays.',
            'Establish controlled-rate freezing protocols and cryopreservation stability studies.',
            'Author process development reports and transfer scalable workflows to GMP cleanroom suites.'
        ],
        qualifications: [
            'Ph.D. or Master\'s degree in Immunology, Cell Biology, Molecular Biology, or related field.',
            '3+ years of hands-on cell culture experience with primary human T-cells, NK-cells, or stem cells.',
            'Direct experience with flow cytometry, viral vector transduction, and closed-system automation.',
            'Strong commitment to quality, patient safety, and scientific rigor.'
        ]
    },
    {
        id: '7',
        slug: 'formulation-scientist',
        title: 'Formulation Scientist (LNP / mRNA & Injectables)',
        department: 'Formulation',
        location: 'Leelabiologics, Visakhapatnam, India',
        type: 'Full-time',
        experience: '3-6 Years',
        reqId: 'REQ-2024-007',
        email: 'careers@leelabiologics.com',
        shortDescription: 'Formulate lipid nanoparticles (LNPs) for mRNA delivery, injectable biologics, and lyophilized drug product matrices.',
        overview: 'We are expanding our Nucleic Acid & Advanced Formulation division. As a Formulation Scientist, you will design microfluidic lipid nanoparticle (LNP) formulations, optimize buffer excipients, and develop lyophilization cycles for next-generation biologics.',
        responsibilities: [
            'Formulate and optimize mRNA-LNP and siRNA complexes using microfluidic mixing systems.',
            'Perform biophysical characterization: particle size/PDI (DLS), encapsulation efficiency (RiboGreen), and zeta potential.',
            'Conduct pre-formulation stability screening and surfactant/excipient compatibility studies.',
            'Develop freeze-drying (lyophilization) cycles using differential scanning calorimetry (DSC) and freeze-dry microscopy.',
            'Support tech transfer to automated sterile fill-finish isolator lines.'
        ],
        qualifications: [
            'Ph.D. or Master\'s degree in Pharmaceutics, Chemistry, Chemical Engineering, or Biotechnology.',
            '3+ years of experience in lipid nanoparticle formulation, liposomes, or parenteral formulation development.',
            'Hands-on expertise with microfluidics (Precision NanoSystems / NanoAssemblr) and analytical particle sizing.',
            'Knowledge of aseptic fill-finish processes and ICH Q8 formulation principles.'
        ]
    }
];

export function findJobByIdOrSlug(identifier: string): JobOpening | undefined {
    return JOB_OPENINGS.find(
        (job) => job.id === identifier || job.slug === identifier
    );
}
