export const FALLBACK_SETTINGS = {
  site_name: 'ANK Global Chartered Accountants and Advisors',
  tagline: 'Premier UAE Audit, Tax, Advisory & Corporate Finance Solutions',
  phone: '+971 55 213 8281',
  whatsapp: '+971 55 213 8281',
  email: 'info@ankglobal.co',
  careers_email: 'careers@ankglobal.co',
  address_primary: 'Office No. 402, Sheikh Saud Al Qasimi Building (Prime Medical Centre Building), Opposite Al Reef Mall – 159 Salah Al Din St – Deira – Dubai, UAE',
  po_box: 'P.O. Box 37212, Dubai, UAE',
  working_hours: 'Monday - Friday: 9:00 AM - 6:00 PM',
};

export const FALLBACK_SERVICES = [
  {
    id: 's1',
    slug: 'uae-corporate-tax',
    title: 'UAE Corporate Tax Advisory & Filing',
    category: 'Taxation Services',
    shortDescription: 'Comprehensive Federal Corporate Tax compliance, tax registration, transfer pricing, and small business relief under Federal Decree-Law No. 47 of 2022.',
    fullDescription: 'The UAE Federal Corporate Tax regime is an essential consideration for all businesses operating across the Emirates. Under Federal Decree-Law No. 47 of 2022, taxable persons must register with the Federal Tax Authority (FTA), maintain compliant IFRS financial statements, calculate taxable income with accurate non-deductible adjustments, and submit their Corporate Tax returns within 9 months of the financial year-end.',
    features: [
      'Corporate Tax Registration & TRN issuance with FTA',
      'Corporate Tax Impact Assessment & Financial Restructuring',
      'Qualifying Free Zone Person (QFZP) 0% Eligibility Audit',
      'Small Business Relief (SBR) Optimization (< AED 3M Revenue)',
      'Transfer Pricing Documentation (Local File & Master File)',
      'Annual Corporate Tax Return Preparation & Timely Submission'
    ],
    deliverables: [
      'Corporate Tax Readiness & Impact Report',
      'Official FTA Registration Certificate',
      'Tax Adjusted Financial Computations',
      'Submitted Tax Return with FTA Confirmation Receipt'
    ],
    faqs: [
      {
        question: 'What is the UAE Corporate Tax rate and threshold?',
        answer: 'The standard statutory Corporate Tax rate is 9% on taxable income exceeding AED 375,000. Taxable income up to AED 375,000 is taxed at 0% to encourage small enterprises and startups.'
      },
      {
        question: 'Do Free Zone companies have to register for Corporate Tax?',
        answer: 'Yes. All Free Zone entities must register for Corporate Tax regardless of whether they qualify for the 0% Qualifying Free Zone Person (QFZP) tax rate.'
      }
    ],
    metaTitle: 'UAE Corporate Tax Advisory & Return Filing | ANK Global Dubai',
    metaDescription: 'Expert UAE Corporate Tax services in Dubai. FTA tax registration, QFZP 0% advisory, transfer pricing, small business relief, and compliant return filing.',
  },
  {
    id: 's2',
    slug: 'uae-vat-compliance',
    title: 'UAE VAT Advisory & Return Filing',
    category: 'Taxation Services',
    shortDescription: 'End-to-end Value Added Tax solutions: FTA registration, return filing, VAT health checks, input tax recovery optimization, and tax audit representation.',
    fullDescription: 'Value Added Tax (VAT) in the UAE applies at a standard rate of 5% on taxable supplies of goods and services. Since its introduction, the Federal Tax Authority has heightened auditing standards, requiring rigorous compliance with tax invoicing requirements, reverse charge mechanisms, and input tax apportionment rules.',
    features: [
      'VAT Registration, De-registration, and Tax Group Formation',
      'Quarterly & Monthly VAT Return Preparation and Filing',
      'VAT Health Check & Historical Transaction Review',
      'Voluntary Disclosure Form 211 Filing for Error Corrections',
      'FTA Reconsideration & Penalty Waiver Submissions',
      'Tax Audit Representation & FTA Inquiry Defense'
    ],
    deliverables: [
      'Accurate VAT Summary Worksheets with Reconciliation',
      'Form VAT201 Electronic Filing Submission',
      'VAT Health Check Audit Scorecard & Risk Matrix'
    ],
    faqs: [
      {
        question: 'When is VAT registration mandatory in the UAE?',
        answer: 'Mandatory VAT registration is required when the total value of taxable supplies and imports exceeds AED 375,000 over the preceding 12 months or is expected to exceed it in the next 30 days.'
      }
    ],
    metaTitle: 'UAE VAT Registration, Return Filing & Health Checks | ANK Global',
    metaDescription: 'Complete UAE VAT compliance and advisory services by FTA certified tax professionals in Dubai. VAT returns, health checks, voluntary disclosures and audit defense.',
  },
  {
    id: 's3',
    slug: 'excise-tax-advisory',
    title: 'Excise Tax Advisory & Compliance',
    category: 'Taxation Services',
    shortDescription: 'Specialized indirect tax services for importers, producers, and warehouse keepers of excise goods (tobacco, energy drinks, sweetened beverages).',
    fullDescription: 'Excise tax is levied on designated goods that are deemed harmful to human health or the environment. Operating in the excise sector requires specialized handling of Designated Zones, Customs clearance integrations, product registration in the FTA Excise Goods List, and strict inventory monitoring.',
    features: [
      'Excise Tax Registration for Businesses & Warehouse Keepers',
      'Excise Product Registration in the FTA Clearing System',
      'Designated Zone Registration & Bonded Storage Compliance',
      'Monthly Excise Tax Return Filing (Form EX201)',
      'FTA Digital Tax Stamp (DTS) Scheme Advisory'
    ],
    deliverables: [
      'Excise Registration Certificate & FTA Warehouse Permit',
      'Monthly Excise Tax Return Filings',
      'Designated Zone Stock Audit Reports'
    ],
    faqs: [
      {
        question: 'What goods are subject to UAE Excise Tax?',
        answer: 'Carbonated drinks (50%), energy drinks (100%), tobacco products (100%), electronic smoking devices (100%), and sweetened drinks (50%).'
      }
    ],
    metaTitle: 'UAE Excise Tax Advisory & Product Registration | ANK Global',
    metaDescription: 'Specialized UAE Excise Tax advisory in Dubai. Excise registration, product classification, designated zone compliance, and monthly return filing.',
  },
  {
    id: 's4',
    slug: 'economic-substance-regulations',
    title: 'Economic Substance Regulations (ESR)',
    category: 'Taxation Services',
    shortDescription: 'Guidance on UAE Economic Substance requirements, Relevant Activity assessments, notification submissions, and substance reporting.',
    fullDescription: 'The UAE Economic Substance Regulations mandate that onshore and free zone companies conducting Relevant Activities maintain an adequate economic presence within the UAE. While recent regulatory updates and Corporate Tax rules coordinate with substance provisions, businesses must ensure historical compliance and evaluate current applicability.',
    features: [
      'Relevant Activity Scoping & Substance Test Assessment',
      'Core Income-Generating Activities (CIGA) Review',
      'Preparation and Submission of Annual ESR Notifications',
      'Preparation of Detailed Economic Substance Returns',
      'ESR Penalty Appeals & Regulatory Authority Defense'
    ],
    deliverables: [
      'ESR Applicability & Gap Analysis Report',
      'FTA Ministry of Finance ESR Notification Confirmation',
      'Annual ESR Return Submission Documentation'
    ],
    faqs: [
      {
        question: 'What are the Relevant Activities under UAE ESR?',
        answer: 'Banking, Insurance, Investment Fund Management, Lease-Finance, Headquarter Business, Shipping, Holding Company Business, Intellectual Property (IP) Business, and Distribution & Service Centre Business.'
      }
    ],
    metaTitle: 'UAE Economic Substance Regulations (ESR) Compliance | ANK Global',
    metaDescription: 'UAE Economic Substance Regulations advisory. Activity evaluation, ESR notifications, annual returns, and substance test verification in Dubai.',
  },
  {
    id: 's5',
    slug: 'audit-and-assurance',
    title: 'Audit & Assurance (Internal & External)',
    category: 'Audit & Assurance',
    shortDescription: 'Independent statutory financial audits, internal controls evaluation, risk advisory, fixed asset verification, and bank/free zone compliance audits.',
    fullDescription: 'Independent auditing is the cornerstone of stakeholder confidence, credit facility access, and regulatory compliance in the UAE. Most UAE Free Zones (DMCC, DIFC, JAFZA, DAFZA) and mainland authorities require audited annual financial statements for trade license renewal and shareholder reporting.',
    features: [
      'Statutory Financial Statement Audits (External Audit)',
      'Internal Audit & Operational Risk Assessments',
      'Enterprise Risk Management (ERM) Frameworks',
      'Fixed Asset Physical Verification & Tagging',
      'Sales Audit Reports for Malls & Franchise Operators',
      'Financial Due Diligence for Mergers & Acquisitions'
    ],
    deliverables: [
      'Independent Auditor’s Report signed by Licensed Auditors',
      'Audited Financial Statements (Balance Sheet, P&L, Cash Flow, Notes)',
      'Comprehensive Management Letter on Internal Controls'
    ],
    faqs: [
      {
        question: 'Is external audit mandatory in Dubai Free Zones?',
        answer: 'Yes, authorities such as DMCC, DIFC, JAFZA, and DAFZA mandate the submission of audited financial statements prepared by an approved auditor at the time of trade license renewal.'
      }
    ],
    metaTitle: 'External & Internal Audit Services in Dubai, UAE | ANK Global',
    metaDescription: 'Approved auditors in UAE. Independent statutory audit, free zone compliance audit, internal control reviews, and risk assurance across Dubai & Emirates.',
  },
  {
    id: 's6',
    slug: 'accounting-and-bookkeeping',
    title: 'Accounting & Bookkeeping Services',
    category: 'Accounting Services',
    shortDescription: 'High-precision cloud accounting, backlog clearance, inventory reconciliation, management reporting (MIS), and IFRS-compliant ledger maintenance.',
    fullDescription: 'Maintaining clean, up-to-date accounting records is legally required under the UAE Commercial Companies Law and Corporate Tax Law. Inaccurate books expose businesses to tax audit adjustments, disallowed expense deductions, and misinformed management decisions.',
    features: [
      'Cloud Accounting Setup & Management (QuickBooks, Xero, Zoho)',
      'Overdue Backlog Accounting & Historic Ledger Rectification',
      'Virtual & Dedicated Remote Bookkeeper Placement',
      'Monthly Bank, Credit Card & Supplier Statement Reconciliations',
      'Standard Operating Procedures (SOPs) Design for Finance',
      'Management Information Systems (MIS) Reporting'
    ],
    deliverables: [
      'Monthly Profit & Loss, Balance Sheet & Cash Flow Statements',
      'Aged Receivables & Payables Ledgers',
      'Clean Trial Balance ready for Audit and Tax Filing'
    ],
    faqs: [
      {
        question: 'How long must accounting records be maintained in the UAE?',
        answer: 'Under UAE VAT and Corporate Tax regulations, commercial records and supporting financial documents must be securely preserved for a minimum of 5 years (and 15 years for real estate).'
      }
    ],
    metaTitle: 'Accounting & Bookkeeping Services in Dubai | ANK Global',
    metaDescription: 'Professional accounting and bookkeeping in UAE. Cloud accounting, backlog cleanup, monthly MIS reports, and IFRS compliance in Dubai.',
  },
  {
    id: 's7',
    slug: 'management-consultancy',
    title: 'Strategic Management Consultancy',
    category: 'Advisory Services',
    shortDescription: 'Executive advisory, corporate governance, organizational restructuring, feasibility studies, and operational policy design for sustainable growth.',
    fullDescription: 'Thriving in the dynamic UAE and regional markets requires agile strategic planning, sound corporate governance, and robust risk frameworks. ANK Global’s management consultants partner with board members, founders, and executive leadership to diagnose organizational bottlenecks and conduct bankable feasibility studies.',
    features: [
      'Corporate Strategy Formulation & Market Entry Roadmaps',
      'Bankable Feasibility Studies & Market Opportunity Analysis',
      'Corporate Governance Frameworks & Board Charters',
      'Change Management & Post-Merger Operational Integration',
      'Internal Control System Engineering & Fraud Safeguards'
    ],
    deliverables: [
      'Bankable Comprehensive Feasibility Study Report',
      'Corporate Governance Charter & Committee Structures',
      'Enterprise Policy and Standard Operating Manual'
    ],
    faqs: [
      {
        question: 'What is included in an ANK Global feasibility study?',
        answer: 'Our studies include market research, competitive benchmarking, technical feasibility, financial forecasting (5-year DCF, IRR, NPV, payback period), and sensitivity/risk analysis designed to satisfy UAE commercial banks and investors.'
      }
    ],
    metaTitle: 'Management Consultancy & Feasibility Studies Dubai | ANK Global',
    metaDescription: 'Strategic management consulting in UAE. Feasibility studies, corporate governance, change management, and internal policy design for high-growth enterprises.',
  },
  {
    id: 's8',
    slug: 'corporate-finance',
    title: 'Corporate Finance & Business Valuation',
    category: 'Advisory Services',
    shortDescription: 'Mergers & acquisitions advisory, independent business valuation (DCF / multiples), debt restructuring, financial due diligence, and capital advisory.',
    fullDescription: 'Whether raising capital, executing a cross-border acquisition, refinancing debt, or preparing for a shareholder exit, accurate financial evaluation and astute transaction advisory are imperative.',
    features: [
      'Mergers & Acquisitions (M&A) Buy-Side and Sell-Side Advisory',
      'Independent Business Valuation (DCF, Market Multiples, Net Asset)',
      'Financial Due Diligence & Quality of Earnings Reports',
      'Corporate Restructuring & Balance Sheet Recapitalization',
      'Transaction Advisory & Term Sheet Negotiation Support'
    ],
    deliverables: [
      'Certified Valuation Report compliant with IVS Standards',
      'Confidential Information Memorandum (CIM)',
      'Financial Due Diligence Audit Dossier'
    ],
    faqs: [
      {
        question: 'What methodologies do you utilize for business valuation in the UAE?',
        answer: 'We utilize Discounted Cash Flow (DCF), Comparable Company Analysis (CCA), Precedent Transactions, and Adjusted Book Value, tailored to UAE market dynamics and specific industry benchmarks.'
      }
    ],
    metaTitle: 'Corporate Finance & Valuation Services UAE | ANK Global',
    metaDescription: 'Trusted corporate finance advisory in Dubai. M&A advisory, independent business valuation, financial due diligence, and capital structuring.',
  },
  {
    id: 's9',
    slug: 'smart-sourcing',
    title: 'Smart Sourcing & Virtual CFO Support',
    category: 'Advisory Services',
    shortDescription: 'Fractional Chief Financial Officer (CFO) advisory, business process re-engineering, digital finance automation, and specialized talent sourcing.',
    fullDescription: 'Rapidly scaling businesses need elite financial leadership and agile operational models without incurring the full overhead of an executive C-suite hire. ANK Global’s Smart Sourcing suite provides access to experienced Virtual CFOs who steer cash flow management and investor relations.',
    features: [
      'Fractional / Part-Time CFO Strategic Advisory',
      'Budgeting, Forecasting & Cash Runway Management',
      'Business Process Enhancement & Operational Streamlining',
      'Digital Finance Transformation & Automated Workflows'
    ],
    deliverables: [
      'Monthly Virtual CFO Strategic Review & Board Deck',
      '13-Week Dynamic Cash Flow Forecast Model',
      'Optimized Process Workflow Diagrams'
    ],
    faqs: [
      {
        question: 'When should a growing business hire a Virtual CFO?',
        answer: 'When a company surpasses AED 5M-10M in annual turnover, needs strategic forecasting or debt financing, but does not yet require a full-time AED 50,000/month in-house CFO.'
      }
    ],
    metaTitle: 'Virtual CFO Services & Smart Sourcing in UAE | ANK Global',
    metaDescription: 'Fractional CFO and smart sourcing services in Dubai. High-level financial guidance, cash flow planning, KPI tracking, and finance automation.',
  },
  {
    id: 's10',
    slug: 'company-setup-uae',
    title: 'UAE Company Formation & Licensing',
    category: 'Corporate Services',
    shortDescription: 'Turnkey business setup across Dubai Mainland (DED), Free Zones (DMCC, DIFC, IFZA, DAFZA, JAFZA), and Offshore jurisdictions with full regulatory licensing.',
    fullDescription: 'Selecting the optimal corporate structure is foundational to long-term tax efficiency, foreign ownership rights, visa quotas, and banking success in the UAE. ANK Global guides local and international entrepreneurs through every step of commercial incorporation.',
    features: [
      'Mainland (DET / DED) Company Incorporation (100% Foreign Ownership)',
      'UAE Free Zone Licensing (DMCC, DIFC, IFZA, DAFZA, Meydan, Shams)',
      'Offshore Entity Formation (JAFZA Offshore, RAK ICC)',
      'Memorandum & Articles of Association (MOA) Drafting & Notarization',
      'Ejari / Office Lease Assistance & Virtual Office Solutions'
    ],
    deliverables: [
      'Official Commercial Trade License',
      'Memorandum of Association & Chamber of Commerce Certificate',
      'Company Establishment Card & Official Stamp'
    ],
    faqs: [
      {
        question: 'Can foreigners own 100% of a mainland UAE company?',
        answer: 'Yes. Under the amended UAE Commercial Companies Law, 100% foreign ownership is permitted across more than 1,000 commercial and industrial activities without requiring a local Emirati sponsor.'
      }
    ],
    metaTitle: 'UAE Company Formation & Business Setup Dubai | ANK Global',
    metaDescription: 'Setup your business in Dubai Mainland & Free Zones with ANK Global. 100% foreign ownership, trade licensing, MOA drafting, and fast-track company registration.',
  },
  {
    id: 's11',
    slug: 'pro-services-uae',
    title: 'PRO Services & Corporate Relations',
    category: 'Corporate Services',
    shortDescription: 'Government liaison, investor and employee visa processing, Emirates ID, medical clearance, corporate bank account assistance, and regulatory compliance.',
    fullDescription: 'Navigating governmental documentation, labor quotas, immigration requirements, and municipal approvals can consume vital operational hours. ANK Global’s dedicated Corporate Relations and Public Relations Officer (PRO) team handles all administrative formalities.',
    features: [
      'Investor & Partner Visa Processing (including Golden Visa assistance)',
      'Employee Employment Visa, Medical Typing & Emirates ID',
      'Corporate Bank Account Opening Guidance & Documentation',
      'License Amendments, Partner Additions & Capital Changes',
      'Tenancy Contract Registration (Ejari) & Municipal Approvals'
    ],
    deliverables: [
      'Approved Residency Visas & Emirates ID Cards',
      'Completed Corporate Bank Account Application Dossier',
      'Annual Commercial License Renewal Certificate'
    ],
    faqs: [
      {
        question: 'How long does a UAE investor visa take to process?',
        answer: 'Standard investor visa processing typically takes 5 to 7 business days following entry permit issuance and completion of medical fitness testing and biometrics.'
      }
    ],
    metaTitle: 'Corporate PRO Services & Visa Assistance Dubai | ANK Global',
    metaDescription: 'Reliable corporate PRO services in Dubai. Investor visas, employee visas, Golden Visa consultation, corporate bank accounts, and trade license renewals.',
  },
  {
    id: 's12',
    slug: 'erp-solutions',
    title: 'ERP Software Solutions & Implementation',
    category: 'Technology Solutions',
    shortDescription: 'Bespoke ERP selection, implementation, chart of accounts customization, and integration of Zoho Books, Odoo, SAP Business One, and custom accounting databases.',
    fullDescription: 'Modern accounting and auditing standards require integrated Enterprise Resource Planning (ERP) systems that unify inventory, invoicing, CRM, and financial accounting while remaining fully compliant with UAE VAT and Corporate Tax electronic records rules.',
    features: [
      'ERP Needs Assessment & System Selection (Zoho, Odoo, SAP, bespoke)',
      'Custom Chart of Accounts Architecture aligned with IFRS and UAE Tax',
      'Inventory Management & Supply Chain Workflow Automation',
      'Staff Training & Standard Operating Procedures Documentation',
      'Legacy Data Migration & Reconciliation to New ERP'
    ],
    deliverables: [
      'Configured & Tested Enterprise ERP Environment',
      'Standard Operating Manual for Financial & Operational Modules',
      'Migrated Historical Financial Data with Balance Reconciliation'
    ],
    faqs: [
      {
        question: 'Which ERP systems are recommended for UAE SMEs?',
        answer: 'For UAE SMEs, Zoho Books and Odoo ERP provide excellent compliance with FTA tax requirements, cost-effectiveness, and rapid implementation timelines. For larger trading and manufacturing entities, SAP Business One is ideal.'
      }
    ],
    metaTitle: 'ERP Software Solutions & Accounting Integration Dubai | ANK Global',
    metaDescription: 'ERP implementation and accounting software integration in UAE. Zoho, Odoo, SAP setup with FTA compliant VAT and Corporate Tax workflows.',
  },
];

export const FALLBACK_ARTICLES = [
  {
    id: 'a1',
    slug: 'how-the-uae-is-empowering-women-through-new-policies',
    title: 'How the UAE is Empowering Women through New Policies',
    excerpt: 'Exploring national initiatives, corporate governance reforms, and executive board participation shaping the UAE modern business environment.',
    content: `The United Arab Emirates continues to lead regional innovation and inclusive economic reform. Among the most strategic assets of the nation are its people and visionary leaders who foster gender diversity in commercial and governmental spheres.

Recent corporate governance directives from the Securities and Commodities Authority (SCA) requiring publicly listed companies to appoint female representation to their boards of directors signal a mature, globally competitive economic environment.

At ANK Global, we support growing businesses in building transparent governance structures, equal opportunity frameworks, and standard operating procedures that reflect international best practices. Empowering talent directly accelerates enterprise productivity, innovation, and long-term sustainability.`,
    category: 'Corporate Governance',
    tags: ['UAE Policies', 'Corporate Governance', 'Business Strategy'],
    coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    authorName: 'ANK Global Research Team',
    readTimeMinutes: 4,
    publishedAt: '2024-03-08T00:00:00.000Z',
    metaTitle: 'How the UAE Empowers Women Through New Policies | ANK Global',
    metaDescription: 'Analysis of UAE policies empowering women in business, corporate governance reforms, and executive leadership impact across Dubai and the Emirates.',
  },
  {
    id: 'a2',
    slug: 'uae-corporate-tax-9-percent-complete-guide',
    title: 'UAE Corporate Tax at 9%: Complete Compliance & Small Business Relief Guide',
    excerpt: 'Everything UAE businesses need to know regarding taxable net profit calculation, Qualifying Free Zone Person conditions, and the AED 3M revenue relief threshold.',
    content: `Federal Decree-Law No. 47 of 2022 on the Taxation of Corporations and Businesses has reshaped commercial operations in the United Arab Emirates. With a headline statutory rate of 9% for taxable income exceeding AED 375,000, all businesses must adhere to disciplined financial accounting.

### 1. Key Deadlines and Filing Obligations
Regardless of whether a company expects to owe tax, every registered business must obtain a Corporate Tax Registration Number (TRN) from the FTA and submit an annual declaration within 9 months following the close of its tax year.

### 2. Small Business Relief (SBR)
To encourage small businesses and startups, Ministerial Decision No. 73 of 2023 allows resident taxable persons with gross revenue not exceeding AED 3,000,000 in any relevant tax period to elect for Small Business Relief. Under this election, the business is treated as having no taxable income for that period, significantly reducing compliance costs.

### 3. Free Zone Entities & Qualifying Income
Free Zone companies can enjoy a 0% tax rate on 'Qualifying Income' provided they maintain adequate substance in the Free Zone, derive income from Qualifying Activities, adhere to transfer pricing rules, and refrain from making an election to be subject to the normal 9% regime.

Contact ANK Global for a formal Corporate Tax Readiness Assessment tailored to your corporate structure.`,
    category: 'Taxation Insights',
    tags: ['Corporate Tax', 'UAE Law', 'Small Business Relief', 'Free Zones'],
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    authorName: 'Fatima Al Mansoori',
    readTimeMinutes: 7,
    publishedAt: '2025-01-15T00:00:00.000Z',
    metaTitle: 'UAE Corporate Tax 9% Guide & Small Business Relief | ANK Global',
    metaDescription: 'Detailed breakdown of UAE Corporate Tax rules, 9% threshold, Small Business Relief under AED 3M, and Free Zone QFZP conditions.',
  },
  {
    id: 'a3',
    slug: 'dmcc-difc-statutory-audit-deadlines-compliance',
    title: 'DMCC & DIFC Statutory Audit Requirements: A Checklist for License Renewals',
    excerpt: 'Understand approved auditor lists, submission deadlines, and common financial reporting oversights when preparing annual audited accounts.',
    content: `Major UAE Free Zone jurisdictions, including the Dubai Multi Commodities Centre (DMCC) and Dubai International Financial Centre (DIFC), require member companies to submit annual audited financial statements prepared by accredited, approved audit firms.

### Common Audit Pitfalls for Free Zone Entities
1. **Unreconciled Intercompany Balances:** Failure to maintain formal loan agreements or transfer pricing documentation for shareholder loans.
2. **Fixed Asset Verification Deficits:** Discrepancies between the physical asset registry and the balance sheet carrying value.
3. **Revenue Recognition Inconsistencies:** Not aligning milestone billing with IFRS 15 principles.

Partnering with ANK Global ensures your audit is conducted with minimal operational disruption and full compliance with both Free Zone Authority timelines and UAE Federal regulations.`,
    category: 'Audit & Assurance',
    tags: ['Audit', 'DMCC', 'DIFC', 'License Renewal', 'IFRS'],
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    authorName: 'Naveed S. Rehman',
    readTimeMinutes: 6,
    publishedAt: '2025-02-20T00:00:00.000Z',
    metaTitle: 'DMCC & DIFC Statutory Audit Checklist & Deadlines | ANK Global',
    metaDescription: 'Essential guide to DMCC and DIFC statutory audit compliance, approved auditor requirements, and avoid license renewal delays in Dubai.',
  },
];

export const FALLBACK_TEAM = [
  {
    id: 't1',
    name: 'Muhammad A. Kazmi',
    role: 'Managing Partner & Head of Advisory',
    qualification: 'FCA, CPA, Certified FTA Tax Agent',
    bio: 'Over 20 years of international audit, corporate tax, and strategic financial advisory experience across the UAE, UK, and South Asia. Specializes in complex corporate restructurings, M&A due diligence, and Federal Corporate Tax planning.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    linkedinUrl: 'https://www.linkedin.com/company/ank-global',
    email: 'm.kazmi@ankglobal.co',
  },
  {
    id: 't2',
    name: 'Naveed S. Rehman',
    role: 'Partner – Audit & Assurance',
    qualification: 'ACA, CIA, UAE Certified Auditor',
    bio: 'Leads statutory audits and internal assurance engagements across real estate, industrial manufacturing, and DIFC financial entities. Deep specialist in IFRS reporting standards, ISA frameworks, and fraud prevention.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    linkedinUrl: 'https://www.linkedin.com/company/ank-global',
    email: 'n.rehman@ankglobal.co',
  },
  {
    id: 't3',
    name: 'Fatima Al Mansoori',
    role: 'Director – Corporate Tax & Regulatory Compliance',
    qualification: 'LL.M (Tax), Certified Tax Agent',
    bio: 'Advises multinational groups and Free Zone Persons on UAE Corporate Tax exemptions, transfer pricing agreements, and FTA dispute reconsiderations. Regularly liaises with UAE government bodies.',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    linkedinUrl: 'https://www.linkedin.com/company/ank-global',
    email: 'f.almansoori@ankglobal.co',
  },
  {
    id: 't4',
    name: 'Khurram Shehzad',
    role: 'Senior Manager – Accounting & Cloud ERP Solutions',
    qualification: 'ACCA, UAE CA, Zoho & Odoo Certified Consultant',
    bio: 'Directs cloud accounting teams, ERP integrations, and management reporting for over 150 client accounts across Dubai and Abu Dhabi. Expert in financial workflow automation and backlog recovery.',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    linkedinUrl: 'https://www.linkedin.com/company/ank-global',
    email: 'k.shehzad@ankglobal.co',
  },
];
