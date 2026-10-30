import { PrismaClient, Role, InquiryStatus, MeetingType, ConsultationStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting ANK Global Production Database Seeding ---');

  // 1. Seed Superadmin User
  const adminEmail = 'admin@ankglobal.co';
  const existingUser = await prisma.user.findUnique({ where: { email: adminEmail } });
  
  if (!existingUser) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('ANK_Global_Secure_2026!', salt);

    await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'ANK Global Managing Director',
        passwordHash,
        role: Role.SUPERADMIN,
        isActive: true,
      },
    });
    console.log('✓ Created Superadmin: admin@ankglobal.co');
  }

  // 2. Seed Settings
  const settings = [
    { key: 'site_name', value: 'ANK Global Chartered Accountants and Advisors', description: 'Official corporate title' },
    { key: 'tagline', value: 'Premier UAE Audit, Tax, Advisory & Corporate Finance Solutions', description: 'Brand slogan' },
    { key: 'phone', value: '+971 55 213 8281', description: 'Primary phone' },
    { key: 'whatsapp', value: '+971 55 213 8281', description: 'WhatsApp inquiry number' },
    { key: 'email', value: 'info@ankglobal.co', description: 'Corporate inquiry email' },
    { key: 'careers_email', value: 'careers@ankglobal.co', description: 'HR and recruitment email' },
    { key: 'address_primary', value: 'Office No. 402, Sheikh Saud Al Qasimi Building (Prime Medical Centre Building), Opposite Al Reef Mall – 159 Salah Al Din St – Deira – Dubai, UAE', description: 'Head office address' },
    { key: 'po_box', value: 'P.O. Box 37212, Dubai, UAE', description: 'Postal address' },
    { key: 'google_maps_url', value: 'https://maps.google.com/maps?q=ANK%20Global%20Management%20and%20Tax%20Consultants%2C%20deira%2C%20dubai', description: 'Google Maps location link' },
    { key: 'working_hours', value: 'Monday - Friday: 9:00 AM - 6:00 PM | Saturday: By Appointment', description: 'Office operating hours' },
    { key: 'tax_agency_number', value: 'TAN-UAE-VERIFIED', description: 'FTA registered tax agency reference' },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value, description: s.description },
      create: s,
    });
  }
  console.log('✓ Seeded corporate settings');

  // 3. Seed Verified Services
  const services = [
    {
      slug: 'uae-corporate-tax',
      title: 'UAE Corporate Tax Advisory & Filing',
      category: 'Taxation Services',
      shortDescription: 'Comprehensive Federal Corporate Tax compliance, tax registration, transfer pricing, and small business relief under Federal Decree-Law No. 47 of 2022.',
      fullDescription: `The UAE Federal Corporate Tax regime is an essential consideration for all businesses operating across the Emirates. Under Federal Decree-Law No. 47 of 2022, taxable persons must register with the Federal Tax Authority (FTA), maintain compliant IFRS financial statements, calculate taxable income with accurate non-deductible adjustments, and submit their Corporate Tax returns within 9 months of the financial year-end.

At ANK Global, our certified tax advisors offer end-to-end Corporate Tax advisory to ensure strategic tax minimization, full regulatory compliance, and avoidance of heavy administrative fines. We guide mainland entities, Free Zone Persons claiming Qualifying Free Zone Person (QFZP) 0% benefit, and international business groups establishing tax groups in the UAE.`,
      features: [
        'Corporate Tax Registration & TRN issuance with FTA',
        'Corporate Tax Impact Assessment & Financial Restructuring',
        'Qualifying Free Zone Person (QFZP) 0% Eligibility Audit',
        'Small Business Relief (SBR) Optimization (< AED 3M Revenue)',
        'Transfer Pricing Documentation (Local File & Master File)',
        'Tax Group Formation & Consolidated Filing',
        'Annual Corporate Tax Return Preparation & Timely Submission'
      ],
      deliverables: [
        'Corporate Tax Readiness & Impact Report',
        'Official FTA Registration Certificate',
        'Tax Adjusted Financial Computations',
        'Transfer Pricing Disclosure & Benchmark Documentation',
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
        },
        {
          question: 'When is the deadline to file the UAE Corporate Tax return?',
          answer: 'The Corporate Tax return and associated tax liability must be paid within 9 months from the end of the relevant tax period.'
        }
      ],
      metaTitle: 'UAE Corporate Tax Advisory & Return Filing | ANK Global Dubai',
      metaDescription: 'Expert UAE Corporate Tax services in Dubai. FTA tax registration, QFZP 0% advisory, transfer pricing, small business relief, and compliant return filing.',
      sortOrder: 1,
    },
    {
      slug: 'uae-vat-compliance',
      title: 'UAE VAT Advisory & Return Filing',
      category: 'Taxation Services',
      shortDescription: 'End-to-end Value Added Tax solutions: FTA registration, return filing, VAT health checks, input tax recovery optimization, and tax audit representation.',
      fullDescription: `Value Added Tax (VAT) in the UAE applies at a standard rate of 5% on taxable supplies of goods and services. Since its introduction, the Federal Tax Authority has heightened auditing standards, requiring rigorous compliance with tax invoicing requirements, reverse charge mechanisms, and input tax apportionment rules.

ANK Global's senior VAT practitioners simplify the entire VAT life-cycle for your enterprise. We prevent penal exposure, correct historic misstatements through voluntary disclosures, and maximize legitimate input tax refunds.`,
      features: [
        'VAT Registration, De-registration, and Tax Group Formation',
        'Quarterly & Monthly VAT Return Preparation and Filing',
        'VAT Health Check & Historical Transaction Review',
        'Voluntary Disclosure Form 211 Filing for Error Corrections',
        'FTA Reconsideration & Penalty Waiver Submissions',
        'Tax Audit Representation & FTA Inquiry Defense',
        'UAE National New Residence VAT Refund Facilitation'
      ],
      deliverables: [
        'Accurate VAT Summary Worksheets with Reconciliation',
        'Form VAT201 Electronic Filing Submission',
        'VAT Health Check Audit Scorecard & Risk Matrix',
        'Formal Tax Agency Opinion Letters on Complex Transactions'
      ],
      faqs: [
        {
          question: 'When is VAT registration mandatory in the UAE?',
          answer: 'Mandatory VAT registration is required when the total value of taxable supplies and imports exceeds AED 375,000 over the preceding 12 months or is expected to exceed it in the next 30 days.'
        },
        {
          question: 'What is the voluntary VAT registration threshold?',
          answer: 'A business can voluntarily register for VAT if taxable supplies or taxable expenses exceed AED 187,500 over the prior 12 months.'
        }
      ],
      metaTitle: 'UAE VAT Registration, Return Filing & Health Checks | ANK Global',
      metaDescription: 'Complete UAE VAT compliance and advisory services by FTA certified tax professionals in Dubai. VAT returns, health checks, voluntary disclosures and audit defense.',
      sortOrder: 2,
    },
    {
      slug: 'excise-tax-advisory',
      title: 'Excise Tax Advisory & Compliance',
      category: 'Taxation Services',
      shortDescription: 'Specialized indirect tax services for importers, producers, and warehouse keepers of excise goods (tobacco, energy drinks, sweetened beverages, electronic smoking devices).',
      fullDescription: `Excise tax is levied on designated goods that are deemed harmful to human health or the environment. Operating in the excise sector requires specialized handling of Designated Zones, Customs clearance integrations, product registration in the FTA Excise Goods List, and strict inventory monitoring.

ANK Global works closely with importers, manufacturers, and designated zone operators to ensure compliance with Federal Decree-Law No. 7 of 2017 on Excise Tax.`,
      features: [
        'Excise Tax Registration for Businesses & Warehouse Keepers',
        'Excise Product Registration in the FTA Clearing System',
        'Designated Zone Registration & Bonded Storage Compliance',
        'Monthly Excise Tax Return Filing (Form EX201)',
        'Stockpiling Assessment & Physical Inventory Reconciliations',
        'FTA Digital Tax Stamp (DTS) Scheme Advisory'
      ],
      deliverables: [
        'Excise Registration Certificate & FTA Warehouse Permit',
        'Monthly Excise Tax Return Filings',
        'Designated Zone Stock Audit Reports',
        'Excise Classification & Valuation Advisory Memoranda'
      ],
      faqs: [
        {
          question: 'What goods are subject to UAE Excise Tax?',
          answer: 'Carbonated drinks (50%), energy drinks (100%), tobacco products (100%), electronic smoking devices & liquids (100%), and sweetened drinks (50%).'
        }
      ],
      metaTitle: 'UAE Excise Tax Advisory & Product Registration | ANK Global',
      metaDescription: 'Specialized UAE Excise Tax advisory in Dubai. Excise registration, product classification, designated zone compliance, and monthly return filing.',
      sortOrder: 3,
    },
    {
      slug: 'economic-substance-regulations',
      title: 'Economic Substance Regulations (ESR)',
      category: 'Taxation Services',
      shortDescription: 'Guidance on UAE Economic Substance requirements, Relevant Activity assessments, notification submissions, and substance reporting.',
      fullDescription: `The UAE Economic Substance Regulations (Cabinet Resolution No. 57 of 2020) mandate that onshore and free zone companies conducting Relevant Activities maintain an adequate economic presence within the UAE. While recent regulatory updates and Corporate Tax rules coordinate with substance provisions, businesses must ensure historical compliance and evaluate current applicability to avoid severe administrative penalties.

ANK Global conducts thorough assessments to determine whether your business performs Relevant Activities and provides structured guidance to meet the Economic Substance Test.`,
      features: [
        'Relevant Activity Scoping & Substance Test Assessment',
        'Core Income-Generating Activities (CIGA) Review',
        'Preparation and Submission of Annual ESR Notifications',
        'Preparation of Detailed Economic Substance Returns',
        'Board Meeting Governance & Local Expenditure Verification',
        'ESR Penalty Appeals & Regulatory Authority Defense'
      ],
      deliverables: [
        'ESR Applicability & Gap Analysis Report',
        'FTA Ministry of Finance ESR Notification Confirmation',
        'Annual ESR Return Submission Documentation',
        'Corporate Governance Enhancement Checklist'
      ],
      faqs: [
        {
          question: 'What are the Relevant Activities under UAE ESR?',
          answer: 'Banking, Insurance, Investment Fund Management, Lease-Finance, Headquarter Business, Shipping, Holding Company Business, Intellectual Property (IP) Business, and Distribution & Service Centre Business.'
        }
      ],
      metaTitle: 'UAE Economic Substance Regulations (ESR) Compliance | ANK Global',
      metaDescription: 'UAE Economic Substance Regulations advisory. Activity evaluation, ESR notifications, annual returns, and substance test verification in Dubai.',
      sortOrder: 4,
    },
    {
      slug: 'audit-and-assurance',
      title: 'Audit & Assurance (Internal & External)',
      category: 'Audit & Assurance',
      shortDescription: 'Independent statutory financial audits, internal controls evaluation, risk advisory, fixed asset verification, and bank/free zone compliance audits.',
      fullDescription: `Independent auditing is the cornerstone of stakeholder confidence, credit facility access, and regulatory compliance in the UAE. Most UAE Free Zones (DMCC, DIFC, JAFZA, DAFZA) and mainland authorities require audited annual financial statements for trade license renewal and shareholder reporting.

ANK Global’s certified audit team conducts thorough, risk-based audits in strict compliance with International Standards on Auditing (ISA) and International Financial Reporting Standards (IFRS). Beyond issuing compliance opinions, we deliver actionable management letters that identify internal control weaknesses, operational efficiencies, and fraud prevention strategies.`,
      features: [
        'Statutory Financial Statement Audits (External Audit)',
        'Internal Audit & Operational Risk Assessments',
        'Enterprise Risk Management (ERM) Frameworks',
        'Fixed Asset Physical Verification & Tagging',
        'Sales Audit Reports for Malls & Franchise Operators',
        'Financial Due Diligence for Mergers & Acquisitions',
        'Supply Chain Audits & Forensic Investigations'
      ],
      deliverables: [
        'Independent Auditor’s Report signed by Licensed Auditors',
        'Audited Financial Statements (Balance Sheet, P&L, Cash Flow, Notes)',
        'Comprehensive Management Letter on Internal Controls',
        'Fixed Asset Register Reconciliation Report'
      ],
      faqs: [
        {
          question: 'Is external audit mandatory in Dubai Free Zones?',
          answer: 'Yes, authorities such as DMCC, DIFC, JAFZA, and DAFZA mandate the submission of audited financial statements prepared by an approved auditor at the time of trade license renewal.'
        },
        {
          question: 'What accounting standards are required in the UAE?',
          answer: 'The UAE commercial companies law and tax legislation mandate International Financial Reporting Standards (IFRS) or IFRS for SMEs.'
        }
      ],
      metaTitle: 'External & Internal Audit Services in Dubai, UAE | ANK Global',
      metaDescription: 'Approved auditors in UAE. Independent statutory audit, free zone compliance audit, internal control reviews, and risk assurance across Dubai & Emirates.',
      sortOrder: 5,
    },
    {
      slug: 'accounting-and-bookkeeping',
      title: 'Accounting & Bookkeeping Services',
      category: 'Accounting Services',
      shortDescription: 'High-precision cloud accounting, backlog clearance, inventory reconciliation, management reporting (MIS), and IFRS-compliant ledger maintenance.',
      fullDescription: `Maintaining clean, up-to-date accounting records is legally required under the UAE Commercial Companies Law and Corporate Tax Law. Inaccurate books expose businesses to tax audit adjustments, disallowed expense deductions, and misinformed management decisions.

ANK Global provides tailored accounting solutions from cloud-based bookkeeping on QuickBooks, Xero, and Zoho Books to full-service outsourced finance departments. We organize backlogs, streamline day-to-day accounts payable and receivable, and provide insightful monthly management reports.`,
      features: [
        'Cloud Accounting Setup & Management (QuickBooks, Xero, Zoho)',
        'Overdue Backlog Accounting & Historic Ledger Rectification',
        'Virtual & Dedicated Remote Bookkeeper Placement',
        'Monthly Bank, Credit Card & Supplier Statement Reconciliations',
        'Standard Operating Procedures (SOPs) Design for Finance',
        'Physical Inventory Verification & Stock Valuation',
        'Management Information Systems (MIS) Reporting'
      ],
      deliverables: [
        'Monthly Profit & Loss, Balance Sheet & Cash Flow Statements',
        'Aged Receivables & Payables Ledgers',
        'Clean Trial Balance ready for Audit and Tax Filing',
        'Standard Financial Operating Manual (SOP)'
      ],
      faqs: [
        {
          question: 'How long must accounting records be maintained in the UAE?',
          answer: 'Under UAE VAT and Corporate Tax regulations, commercial records and supporting financial documents must be securely preserved for a minimum of 5 years (and 15 years for real estate).'
        }
      ],
      metaTitle: 'Accounting & Bookkeeping Services in Dubai | ANK Global',
      metaDescription: 'Professional accounting and bookkeeping in UAE. Cloud accounting, backlog cleanup, monthly MIS reports, and IFRS compliance in Dubai.',
      sortOrder: 6,
    },
    {
      slug: 'management-consultancy',
      title: 'Strategic Management Consultancy',
      category: 'Advisory Services',
      shortDescription: 'Executive advisory, corporate governance, organizational restructuring, feasibility studies, and operational policy design for sustainable growth.',
      fullDescription: `Thriving in the dynamic UAE and regional markets requires agile strategic planning, sound corporate governance, and robust risk frameworks.

ANK Global’s management consultants partner with board members, founders, and executive leadership to diagnose organizational bottlenecks, design high-impact operational policies, conduct market feasibility studies, and navigate complex business transitions.`,
      features: [
        'Corporate Strategy Formulation & Market Entry Roadmaps',
        'Bankable Feasibility Studies & Market Opportunity Analysis',
        'Corporate Governance Frameworks & Board Charters',
        'Change Management & Post-Merger Operational Integration',
        'Internal Control System Engineering & Fraud Safeguards',
        'Comprehensive Policies & Procedures Manual Development'
      ],
      deliverables: [
        'Bankable Comprehensive Feasibility Study Report',
        'Corporate Governance Charter & Committee Structures',
        'Enterprise Policy and Standard Operating Manual',
        'Strategic 3-to-5-Year Financial & Operational Roadmap'
      ],
      faqs: [
        {
          question: 'What is included in an ANK Global feasibility study?',
          answer: 'Our studies include market research, competitive benchmarking, technical feasibility, financial forecasting (5-year DCF, IRR, NPV, payback period), and sensitivity/risk analysis designed to satisfy UAE commercial banks and investors.'
        }
      ],
      metaTitle: 'Management Consultancy & Feasibility Studies Dubai | ANK Global',
      metaDescription: 'Strategic management consulting in UAE. Feasibility studies, corporate governance, change management, and internal policy design for high-growth enterprises.',
      sortOrder: 7,
    },
    {
      slug: 'corporate-finance',
      title: 'Corporate Finance & Business Valuation',
      category: 'Advisory Services',
      shortDescription: 'Mergers & acquisitions advisory, independent business valuation (DCF / multiples), debt restructuring, financial due diligence, and capital advisory.',
      fullDescription: `Whether raising capital, executing a cross-border acquisition, refinancing debt, or preparing for a shareholder exit, accurate financial evaluation and astute transaction advisory are imperative.

ANK Global brings deep financial modeling expertise to structure deals, value intangible and tangible enterprise assets, negotiate commercial terms, and safeguard capital.`,
      features: [
        'Mergers & Acquisitions (M&A) Buy-Side and Sell-Side Advisory',
        'Independent Business Valuation (DCF, Market Multiples, Net Asset)',
        'Financial Due Diligence & Quality of Earnings Reports',
        'Corporate Restructuring & Balance Sheet Recapitalization',
        'Transaction Advisory & Term Sheet Negotiation Support',
        'Wealth Advisory & Strategic Family Office Structuring'
      ],
      deliverables: [
        'Certified Valuation Report compliant with IVS Standards',
        'Confidential Information Memorandum (CIM)',
        'Financial Due Diligence Audit Dossier',
        'Deal Structuring & Capital Allocation Blueprint'
      ],
      faqs: [
        {
          question: 'What methodologies do you utilize for business valuation in the UAE?',
          answer: 'We utilize Discounted Cash Flow (DCF), Comparable Company Analysis (CCA), Precedent Transactions, and Adjusted Book Value, tailored to UAE market dynamics and specific industry benchmarks.'
        }
      ],
      metaTitle: 'Corporate Finance & Valuation Services UAE | ANK Global',
      metaDescription: 'Trusted corporate finance advisory in Dubai. M&A advisory, independent business valuation, financial due diligence, and capital structuring.',
      sortOrder: 8,
    },
    {
      slug: 'smart-sourcing',
      title: 'Smart Sourcing & Virtual CFO Support',
      category: 'Advisory Services',
      shortDescription: 'Fractional Chief Financial Officer (CFO) advisory, business process re-engineering, digital finance automation, and specialized talent sourcing.',
      fullDescription: `Rapidly scaling businesses need elite financial leadership and agile operational models without incurring the full overhead of an executive C-suite hire.

ANK Global’s Smart Sourcing suite provides access to experienced Virtual CFOs who steer cash flow management, investor relations, budgeting, and performance metrics, backed by automated business workflows.`,
      features: [
        'Fractional / Part-Time CFO Strategic Advisory',
        'Budgeting, Forecasting & Cash Runway Management',
        'Business Process Enhancement & Operational Streamlining',
        'Digital Finance Transformation & Automated Workflows',
        'KPI Scorecard Development & Board Presentation Support',
        'Specialized Accounting & Finance Talent Placement'
      ],
      deliverables: [
        'Monthly Virtual CFO Strategic Review & Board Deck',
        '13-Week Dynamic Cash Flow Forecast Model',
        'Optimized Process Workflow Diagrams & RACI Matrix',
        'Integrated Financial Dashboard'
      ],
      faqs: [
        {
          question: 'When should a growing business hire a Virtual CFO?',
          answer: 'When a company surpasses AED 5M-10M in annual turnover, needs strategic forecasting or debt financing, but does not yet require a full-time AED 50,000/month in-house CFO.'
        }
      ],
      metaTitle: 'Virtual CFO Services & Smart Sourcing in UAE | ANK Global',
      metaDescription: 'Fractional CFO and smart sourcing services in Dubai. High-level financial guidance, cash flow planning, KPI tracking, and finance automation.',
      sortOrder: 9,
    },
    {
      slug: 'company-setup-uae',
      title: 'UAE Company Formation & Licensing',
      category: 'Corporate Services',
      shortDescription: 'Turnkey business setup across Dubai Mainland (DED), Free Zones (DMCC, DIFC, IFZA, DAFZA, JAFZA), and Offshore jurisdictions with full regulatory licensing.',
      fullDescription: `Selecting the optimal corporate structure is foundational to long-term tax efficiency, foreign ownership rights, visa quotas, and banking success in the UAE.

ANK Global guides local and international entrepreneurs through every step of commercial incorporation, jurisdiction evaluation (Mainland vs. Free Zone vs. Offshore), memorandum drafting, and governmental approvals.`,
      features: [
        'Mainland (DET / DED) Company Incorporation (100% Foreign Ownership)',
        'UAE Free Zone Licensing (DMCC, DIFC, IFZA, DAFZA, Meydan, Shams)',
        'Offshore Entity Formation (JAFZA Offshore, RAK ICC)',
        'Memorandum & Articles of Association (MOA) Drafting & Notarization',
        'Ejari / Office Lease Assistance & Virtual Office Solutions',
        'Trade Name Approvals & Initial Licensing Sanctions'
      ],
      deliverables: [
        'Official Commercial Trade License',
        'Memorandum of Association & Chamber of Commerce Certificate',
        'Company Establishment Card & Official Stamp',
        'Comprehensive Corporate Formation Dossier'
      ],
      faqs: [
        {
          question: 'Can foreigners own 100% of a mainland UAE company?',
          answer: 'Yes. Under the amended UAE Commercial Companies Law, 100% foreign ownership is permitted across more than 1,000 commercial and industrial activities without requiring a local Emirati sponsor.'
        }
      ],
      metaTitle: 'UAE Company Formation & Business Setup Dubai | ANK Global',
      metaDescription: 'Setup your business in Dubai Mainland & Free Zones with ANK Global. 100% foreign ownership, trade licensing, MOA drafting, and fast-track company registration.',
      sortOrder: 10,
    },
    {
      slug: 'pro-services-uae',
      title: 'PRO Services & Corporate Relations',
      category: 'Corporate Services',
      shortDescription: 'Government liaison, investor and employee visa processing, Emirates ID, medical clearance, corporate bank account assistance, and regulatory compliance.',
      fullDescription: `Navigating governmental documentation, labor quotas, immigration requirements, and municipal approvals can consume vital operational hours.

ANK Global’s dedicated Corporate Relations and Public Relations Officer (PRO) team handles all administrative formalities with the Ministry of Human Resources & Emiratisation (MOHRE), General Directorate of Residency and Foreigners Affairs (GDRFA), and Free Zone authorities.`,
      features: [
        'Investor & Partner Visa Processing (including Golden Visa assistance)',
        'Employee Employment Visa, Medical Typing & Emirates ID',
        'Corporate Bank Account Opening Guidance & Documentation',
        'License Amendments, Partner Additions & Capital Changes',
        'Tenancy Contract Registration (Ejari) & Municipal Approvals',
        'Trade License Annual Renewal & Compliance Filings'
      ],
      deliverables: [
        'Approved Residency Visas & Emirates ID Cards',
        'Completed Corporate Bank Account Application Dossier',
        'Annual Commercial License Renewal Certificate',
        'MOHRE & Immigration Quota Approvals'
      ],
      faqs: [
        {
          question: 'How long does a UAE investor visa take to process?',
          answer: 'Standard investor visa processing typically takes 5 to 7 business days following entry permit issuance and completion of medical fitness testing and biometrics.'
        }
      ],
      metaTitle: 'Corporate PRO Services & Visa Assistance Dubai | ANK Global',
      metaDescription: 'Reliable corporate PRO services in Dubai. Investor visas, employee visas, Golden Visa consultation, corporate bank accounts, and trade license renewals.',
      sortOrder: 11,
    },
    {
      slug: 'erp-solutions',
      title: 'ERP Software Solutions & Implementation',
      category: 'Technology Solutions',
      shortDescription: 'Bespoke ERP selection, implementation, chart of accounts customization, and integration of Zoho Books, Odoo, SAP Business One, and custom accounting databases.',
      fullDescription: `Modern accounting and auditing standards require integrated Enterprise Resource Planning (ERP) systems that unify inventory, invoicing, CRM, and financial accounting while remaining fully compliant with UAE VAT and Corporate Tax electronic records rules.

ANK Global bridges accounting theory with enterprise technology to deliver turnkey ERP implementations tailored to your exact business workflows.`,
      features: [
        'ERP Needs Assessment & System Selection (Zoho, Odoo, SAP, bespoke)',
        'Custom Chart of Accounts Architecture aligned with IFRS and UAE Tax',
        'Inventory Management & Supply Chain Workflow Automation',
        'Point of Sale (POS) & E-Commerce Payment Gateway Integrations',
        'Staff Training & Standard Operating Procedures Documentation',
        'Legacy Data Migration & Reconciliation to New ERP'
      ],
      deliverables: [
        'Configured & Tested Enterprise ERP Environment',
        'Standard Operating Manual for Financial & Operational Modules',
        'Migrated Historical Financial Data with Balance Reconciliation',
        'Ongoing Technical & Accounting Support SLA'
      ],
      faqs: [
        {
          question: 'Which ERP systems are recommended for UAE SMEs?',
          answer: 'For UAE SMEs, Zoho Books and Odoo ERP provide excellent compliance with FTA tax requirements, cost-effectiveness, and rapid implementation timelines. For larger trading and manufacturing entities, SAP Business One or Microsoft Dynamics 365 are ideal.'
        }
      ],
      metaTitle: 'ERP Software Solutions & Accounting Integration Dubai | ANK Global',
      metaDescription: 'ERP implementation and accounting software integration in UAE. Zoho, Odoo, SAP setup with FTA compliant VAT and Corporate Tax workflows.',
      sortOrder: 12,
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }
  console.log(`✓ Seeded ${services.length} verified services`);

  // 4. Seed Verified Team Profiles
  const teamMembers = [
    {
      name: 'Naffar Hussain, ACA, APFA',
      role: 'Chief Executive Officer & Managing Partner',
      qualification: 'Associate Chartered Accountant (ACA - ICAP), APFA',
      bio: 'Over 12+ years of senior executive experience in statutory audit, UAE Corporate Tax (9%), VAT compliance, and corporate financial advisory. Qualified Chartered Accountant from the Institute of Chartered Accountants of Pakistan (ICAP) and active leader within the ICAP UAE Chapter. Specializes in Federal Tax Authority (FTA) representation, corporate restructurings, IFRS assurance, and E-Invoicing ASP onboarding. Founder of the Professional Development Club (PDC), mentoring corporate finance leadership across the GCC.',
      photoUrl: '/images/team/naffar-hussain.jpg',
      linkedinUrl: 'https://www.linkedin.com/in/naffar-hussain-aca-apfa-b515ab64/',
      email: 'info@ankglobal.co',
      sortOrder: 1,
    },
    {
      name: 'Muhammad Ashfaq',
      role: 'Partner – Corporate Structuring & Global Expansion',
      qualification: 'Corporate Strategist & International Expansion Specialist',
      bio: 'Senior partner steering ANK Global\'s cross-border operations, commercial licensing, and international entity structuring across the UAE, Oman, Saudi Arabia (KSA), and Europe (Portugal). With over 13+ years of professional corporate experience and 5.5+ years as Managing Partner, he regularly advises multinational enterprises and founders on Free Zone versus Mainland regulatory frameworks, banking dossiers, and international tax optimization.',
      photoUrl: '/images/team/muhammad-ashfaq.jpg',
      linkedinUrl: 'https://www.linkedin.com/in/muhammad-ashfaq-ank/',
      email: 'info@ankglobal.co',
      sortOrder: 2,
    },
    {
      name: 'Muhammad Awais Memon, ACA',
      role: 'Senior Manager – Audit & Assurance',
      qualification: 'Associate Chartered Accountant (ACA - ICAP Member No. 10455)',
      bio: 'Qualified Chartered Accountant with over 10+ years of rigorous audit, financial reporting, and assurance expertise. Directs statutory external audits, internal financial controls, and risk assurance engagements under International Standards on Auditing (ISA) and IFRS frameworks for DMCC, DIFC, JAFZA, and mainland DED entities across the United Arab Emirates.',
      photoUrl: '/images/team/muhammad-awais-memon.jpg',
      linkedinUrl: 'https://www.linkedin.com/in/muhammad-awais-memon/',
      email: 'info@ankglobal.co',
      sortOrder: 3,
    },
    {
      name: 'Muhammad Kamran Shafi',
      role: 'Director – Internal Audit, Risk & Control Strategy',
      qualification: 'Fellow Chartered Accountant (ICAP Member No. 4797)',
      bio: 'Solution-driven, business and technology-savvy control and audit strategist with 20+ years of senior executive experience. Specializes in corporate governance, risk assessment, internal audit architecture, IT audit frameworks, and financial control transformations across the UAE, GCC, and regional enterprises.',
      photoUrl: '/images/team/muhammad-kamran-shafi.jpg',
      linkedinUrl: 'https://www.linkedin.com/in/muhammad-kamran-shafi-6961a452/',
      email: 'info@ankglobal.co',
      sortOrder: 4,
    },
    {
      name: 'Muhammad Akhtar, ACCA, CA (F)',
      role: 'Senior Manager – Tax & Corporate Compliance',
      qualification: 'ACCA Member, Chartered Accountant Finalist (ICAP)',
      bio: 'Highly accomplished taxation and corporate compliance specialist with extensive track record in Federal Tax Authority (FTA) compliance, VAT return filings in EmaraTax, tax invoice validations, and Corporate Tax (9%) registrations. Leads complex VAT health checks, corporate tax planning, and statutory tax filings for high-volume trading and service groups.',
      photoUrl: '/images/team/muhammad-akhtar.jpg',
      linkedinUrl: 'https://www.linkedin.com/in/muhammad-akhtar-acca-ca-f-49642563/',
      email: 'info@ankglobal.co',
      sortOrder: 5,
    },
    {
      name: 'Mazhar Bashir, ACCA',
      role: 'Senior Accountant & Tax Consultant',
      qualification: 'Association of Chartered Certified Accountants (ACCA)',
      bio: 'Senior finance and tax professional with 13+ years of comprehensive experience across treasury, financial accounting, VAT & Excise tax advisory, and management consulting. Specializes in statutory bookkeeping, EmaraTax filings, VAT health checks, inventory & fixed asset management, and IFRS accounting conversions.',
      photoUrl: '/images/team/mazhar-bashir.jpg',
      linkedinUrl: 'https://www.linkedin.com/in/mazharacca/',
      email: 'mazhar.bashir1@outlook.com',
      sortOrder: 6,
    },
  ];

  for (const m of teamMembers) {
    const existing = await prisma.teamMember.findFirst({ where: { name: m.name } });
    if (!existing) {
      await prisma.teamMember.create({ data: m });
    }
  }
  console.log('✓ Seeded professional leadership team');

  // 5. Seed Authoritative Articles & Legacy Migrated Post
  const articles = [
    {
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
      publishedAt: new Date('2024-03-08'),
      metaTitle: 'How the UAE Empowers Women Through New Policies | ANK Global',
      metaDescription: 'Analysis of UAE policies empowering women in business, corporate governance reforms, and executive leadership impact across Dubai and the Emirates.',
    },
    {
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
      publishedAt: new Date('2025-01-15'),
      metaTitle: 'UAE Corporate Tax 9% Guide & Small Business Relief | ANK Global',
      metaDescription: 'Detailed breakdown of UAE Corporate Tax rules, 9% threshold, Small Business Relief under AED 3M, and Free Zone QFZP conditions.',
    },
    {
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
      publishedAt: new Date('2025-02-20'),
      metaTitle: 'DMCC & DIFC Statutory Audit Checklist & Deadlines | ANK Global',
      metaDescription: 'Essential guide to DMCC and DIFC statutory audit compliance, approved auditor requirements, and avoid license renewal delays in Dubai.',
    },
  ];

  for (const a of articles) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: a,
      create: a,
    });
  }
  console.log(`✓ Seeded ${articles.length} authoritative insights`);

  // 6. Seed Comprehensive FAQs
  const faqs = [
    {
      question: 'What professional services does ANK Global provide in the UAE?',
      answer: 'ANK Global provides comprehensive Chartered Accounting, Statutory External Audit, Internal Controls, UAE VAT Compliance, Corporate Tax Advisory, Excise Tax, Economic Substance Regulations (ESR), Business Valuation, M&A Due Diligence, UAE Company Setup (Mainland & Free Zones), PRO Services, and ERP Software Solutions.',
      category: 'General',
      sortOrder: 1,
    },
    {
      question: 'Where is the ANK Global head office located?',
      answer: 'Our main office is conveniently located at Office No. 402, Sheikh Saud Al Qasimi Building (Prime Medical Centre Building), Opposite Al Reef Mall – 159 Salah Al Din Street – Deira – Dubai, United Arab Emirates.',
      category: 'General',
      sortOrder: 2,
    },
    {
      question: 'How do I book a consultation with your senior tax advisors?',
      answer: 'You can book a consultation directly through our website booking portal by selecting your preferred date and time, call us at +971 55 213 8281, or contact us instantly via WhatsApp.',
      category: 'General',
      sortOrder: 3,
    },
    {
      question: 'Are your audits recognized by UAE banks and Free Zone authorities?',
      answer: 'Yes. ANK Global audits comply strictly with International Standards on Auditing (ISA) and International Financial Reporting Standards (IFRS), meeting the stringent criteria of UAE commercial banks, court requirements, and major Free Zones including DMCC, DIFC, JAFZA, and DAFZA.',
      category: 'Audit & Assurance',
      sortOrder: 4,
    },
    {
      question: 'What is the penalty for failing to register for UAE Corporate Tax on time?',
      answer: 'The Federal Tax Authority has instituted an administrative penalty of AED 10,000 for failure to submit a Corporate Tax registration application within the designated timeframe specified by the FTA.',
      category: 'Taxation Services',
      sortOrder: 5,
    },
  ];

  for (const f of faqs) {
    const existing = await prisma.fAQ.findFirst({ where: { question: f.question } });
    if (!existing) {
      await prisma.fAQ.create({ data: f });
    }
  }
  console.log('✓ Seeded comprehensive FAQs');

  console.log('--- Database Seeding Completed Successfully ---');
}

main()
  .catch((e) => {
    console.error('Error during database seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
