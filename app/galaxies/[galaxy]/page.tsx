"use client";
import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { platform } from "process";
export interface GalaxyOffering {
    name: string;
    keyUseCases: string[];
    customerLogos: string[];
}

export interface Galaxy {
    id: string; // e.g., 'bfsi', 'retail', etc.
    name: string;
    logo: string;
    offerings: GalaxyOffering[];
}

// Sample data for all five galaxies
const GALAXIES: Galaxy[] = [
    {
        id: "bfs",
        name: "BFS Galaxy",
        logo: "/galaxy-bfsi.png",
        offerings: [
            {
                name: "Supernova",
                keyUseCases: [
                    "Core Banking and ODS modernization",
                    "Report Modernization",
                    "Customer Analytics Platform Modernization"
                ],
                customerLogos: ["/logos/hsbc.png", "/logos/fiserv.png", "/logos/voya.png"],
            },
            {
                name: "Nebula",
                keyUseCases: [
                    "Enterprise Customer 360 Platform",
                    "Automated Data Lineage for Compliance",
                    "Fraud Detection Pipeline"
                ],
                customerLogos: ["/logos/associated-bank.png", "/logos/bank-of-england.png", "/logos/yoma-bank.png"],
            },
            {
                name: "Hypernova",
                keyUseCases: [
                    "Risk & Compliance Domain Mesh",
                    "Customer 360 & Personalization Mesh",
                    "Payments & Transaction Analytics Mesh"
                ],
                customerLogos: ["/logos/lpl-financial.png", "/logos/santander.png", "/logos/goldman-sachs.png"],
            },
            {
                name: "Pulsar",
                keyUseCases: [
                    "Agentic support L1.5 &  L2 for data pipelines retail and corporate banking",
                    "Incident , CR  & SR ticket analysis",
                    "Incident resolution of ETL/reporting issues"
                ],
                customerLogos: [
                    "/logos/fifth-third-bank.png", "/logos/liberty-bank.png", "/logos/farm-credit.png"
                ],
            },
            {
                name: "Quasar",
                keyUseCases: [
                    "Fraud Detection & Prevention",
                    "Anti-Money Laundering (AML) Analytics",
                    "Risk score assessment"
                ],
                customerLogos: ["/logos/sei.png", "/logos/sbi.png", "/logos/nn-investment-partners.png"],
            },
        ],
    },
    {
        id: "ins",
        name: "Insurance Galaxy",
        logo: "/galaxy-ins.png",
        offerings: [
            {
                name: "Supernova",
                keyUseCases: [
                    "Customer 360 view of policy, claims, and CRM",
                    "Migration of Policy records from mainframe to cloud",
                    "Real-time Executive Performance Dashboards"
                ],
                customerLogos: ["/logos/mosaic.png", "/logos/ms-amlin.png", "/logos/lincoln.png"],
            },
            {
                name: "Nebula",
                keyUseCases: [
                    "Unified Data Platform for Enterprise Insights",
                    "Customer Churn Prediction",
                    "Data-Driven Underwriting and Risk Management"
                ],
                customerLogos: ["/logos/assurant.png", "/logos/north-bridge.png", "/logos/qbe.png"],
            },
            {
                name: "Hypernova",
                keyUseCases: [
                    "Claims Domain Data Product",
                    "Risk & Pricing Analytics Data Product",
                    "Decentralized policy and claims data ownership"
                ],
                customerLogos: [""],
            },
            {
                name: "Pulsar",
                keyUseCases: [
                    "L1.5 &  L2  support  for policy and claims data pipelines",
                    "KT sessions on risk & underwriting data processes",
                    "Analyze logs and tickets resolution for claim exceptions"
                ],
                customerLogos: [
                    "/logos/utica.png", "/logos/tokio-marine.png", "/logos/thrivent.png"
                ],
            },
            {
                name: "Quasar",
                keyUseCases: [
                    "Claims Fraud Detection",
                    "Pricing Predictive Model",
                    "Cognitive automation in underwriting"
                ],
                customerLogos: ["/logos/aspen.png", "/logos/canopius.png"],
            },
        ],
    },
    {
        id: "tth",
        name: "TTH Galaxy",
        logo: "/galaxy-tth.svg",
        offerings: [
            {
                name: "Supernova",
                keyUseCases: [
                    "Modern Data Quality Monitoring for airlines",
                    "Modernize flight data ecosystem",
                    "Modernize crew scheduling with real-time streaming"
                ],
                customerLogos: ["/logos/caesars.png", "/logos/emirates.png", "/logos/american-airlines.png"],
            },
            {
                name: "Nebula",
                keyUseCases: [
                    "Real-time weather and NOTAM using External API + ELT",
                    "Passenger Flow & Queue Prediction",
                    "Integrated Passenger Journey Platform"
                ],
                customerLogos: ["/logos/db.png", "/logos/sabre.png", "/logos/spirit.png"],
            },
            {
                name: "Hypernova",
                keyUseCases: [
                    "Passenger 360",
                    "Domain-based Flight Operations Data Mesh",
                    "Federated Governance Framework"
                ],
                customerLogos: ["/logos/southwest.png"],
            },
            {
                name: "Pulsar",
                keyUseCases: [
                    "Agentic L2, L3 support for cargo domain",
                    "Automate Incident Resolution for Airline’s Operations",
                    "Monitor Real-Time Travel Data Pipelines"
                ],
                customerLogos: ["/logos/virgin-australia.png", "/logos/iag.png"],
            },
            {
                name: "Quasar",
                keyUseCases: [
                    "Integrated Hotel Management System",
                    "Route & Network Optimization",
                    "AI powered insights from Airline contracts"
                ],
                customerLogos: ["/logos/sita.png"],
            },
        ],
    },
    {
        id: "retail",
        name: "Retail Galaxy",
        logo: "/galaxy-retail.png",
        offerings: [
            {
                name: "Supernova",
                keyUseCases: [
                    " Migration of POS data into cloud",
                    "Replace Legacy reports with interactive dashboards",
                    "Monitor data quality across store systems"
                ],
                customerLogos: ["/logos/costa.png", "/logos/volcafe.png", "/logos/colgate.png"],
            },
            {
                name: "Nebula",
                keyUseCases: [
                    "Executive dashboards for sales insights",
                    "Optimize shelf layouts with IOT",
                    "Metadata-driven transformations for SKU updates"
                ],
                customerLogos: ["/logos/walmart.png", "/logos/moog.png", "/logos/pella.png"],
            },
            {
                name: "Hypernova",
                keyUseCases: [
                    "Cross-domain analytics for supply chain optimization",
                    "Unified shopper 360 view through federated mesh",
                    "Real-time inventory visibility across all stores"
                ],
                customerLogos: [""],
            },
            {
                name: "Pulsar",
                keyUseCases: [
                    "L1/L2 support for sales, inventory, and POS data pipelines.",
                    "Log analysis for stock & transaction anomalies"
                ],
                customerLogos: ["/logos/arnotts.png", "/logos/betagro.png"],
            },
            {
                name: "Quasar",
                keyUseCases: [
                    "Predict customer churn across loyalty tiers",
                    "Forecast demand using AI-driven models",
                    "Automate price recommendations using ML insights"
                ],
                customerLogos: ["/logos/lennox.png"],
            },
        ],
    },
    {
        id: "healthcare",
        name: "Healthcare Galaxy",
        logo: "/galaxy-healthcare.png",
        offerings: [
            {
                name: "Supernova",
                keyUseCases: [
                    "Claims & Billing Data Modernization",
                    "Patient 360 & Health Record Consolidation",
                    "Citizen Master Data Management"
                ],
                customerLogos: ["/logos/nhs.png"],
            },
            {
                name: "Nebula",
                keyUseCases: [
                    "Operational & Supply Chain Optimization",
                    "Research & Clinical  Data Hub",
                    "Digital Citizen 360 & Social Program Management"
                ],
                customerLogos: ["/logos/sk.png"],
            },
            {
                name: "Hypernova",
                keyUseCases: [
                    "Revenue Cycle data product",
                    "Medication Dispensing Data Product",
                    "Infrastructure & Utility Data Product"
                ],
                customerLogos: [""],
            },
            {
                name: "Pulsar",
                keyUseCases: [
                    "Daily ETL Monitoring and Support for patient records, billing and clinical data",
                    "Clinical Dashboard Maintenance",
                    "Incident Resolution"
                ],
                customerLogos: ["/logos/philip.png"],
            },
            {
                name: "Quasar",
                keyUseCases: [
                    "Public Health Surveillance & Forecasting",
                    "Gen AI powered healthcare provider assist",
                    "Clinical Documentation Automation"
                ],
                customerLogos: ["/logos/insulet.png"],
            },
        ],
    },
    {
        id: "energy",
        name: "Public Sector, Energy & Utilities",
        logo: "/galaxy-public-sector.png",
        offerings: [
            {
                name: "Supernova",
                keyUseCases: [
                    "Modernize legacy billing and metering systems",
                    "Unified reporting for energy distribution network",
                    "Implement policy-based access across departments"
                ],
                customerLogos: ["/logos/nhs.png"],
            },
            {
                name: "Nebula",
                keyUseCases: [
                    "Consolidate citizen data into unified platform",
                    "Replace manual ETL with orchestration pipelines",
                    "Monitor lineage across inter-agency data exchanges"
                ],
                customerLogos: ["/logos/nsw.png"],
            },
            {
                name: "Hypernova",
                keyUseCases: [
                    "Enable cross-departmental data sharing",
                    "Unified health and welfare insights via mesh",
                    "Distributed data ownership across regional plants"
                ],
                customerLogos: ["/logos/db.png"],
            },
            {
                name: "Pulsar",
                keyUseCases: [
                    "L1/L2 support for citizen services and census data",
                    "Analyze logs/tickets for operational anomalies",
                    "Incident resolution of ETL/reporting issues"
                ],
                customerLogos: ["/logos/wm.png", "/logos/duke-energy.png"],
            },
            {
                name: "Quasar",
                keyUseCases: [
                    "Predict energy consumption using ML models",
                    "AI driven Compliance automation",
                    "Gen AI powered healthcare provider assist"
                ],
                customerLogos: ["/logos/ofcom.png"],
            },
        ],
    },
];

// Tech stack model
const TECH_STACK = [
    { name: "Azure", logo: "/logos/azure.png", width: 100, height: 32 },
    { name: "AWS", logo: "/logos/aws.png", width: 60, height: 32 },
    { name: "Google Cloud Platform", logo: "/logos/gcp.png", width: 140, height: 32 },
    { name: "Snowflake", logo: "/logos/snowflake.png", width: 120, height: 32 },
    { name: "Databricks", logo: "/logos/databricks.png", width: 100, height: 32 },
    { name: "dbt", logo: "/logos/dbt.png", width: 80, height: 32 },
    { name: "Qlik", logo: "/logos/qlik.png", width: 80, height: 32 },
    { name: "Matillion", logo: "/logos/matillion.png", width: 100, height: 32 },
    { name: "Snaplogic", logo: "/logos/snaplogic_white.png", width: 100, height: 32 },
];

// Offering logo mapping
const OFFERING_LOGOS: Record<string, string> = {
    Supernova: '/logos/galaxies/coforge-supernova_white.svg',
    Nebula: '/logos/galaxies/coforge-nebula_white.svg',
    Hypernova: '/logos/galaxies/coforge-hypernova_white.svg',
    Pulsar: '/logos/galaxies/coforge-pulsar_white.svg',
    Quasar: '/logos/galaxies/coforge-quasar_white.svg',
};

export default function GalaxyDetailPage() {
    const params = useParams();
    const galaxyParam = (params.galaxy as string)?.toLowerCase();
    const galaxy = GALAXIES.find(g => g.id === galaxyParam);

    if (!galaxy) {
        return (
            <main className="min-h-screen flex items-center justify-center" style={{backgroundImage: "linear-gradient(88deg, #111d56, #141946, #090c3a)"}}>
                <div className="bg-slate-800/60 rounded-xl shadow-lg p-8 text-center">
                    <h1 className="text-3xl font-bold text-white mb-4">Galaxy Not Found</h1>
                    <p className="text-lg text-gray-200">The selected galaxy does not exist. Please choose a valid galaxy.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen px-8 py-12" style={{backgroundImage: "linear-gradient(88deg, #111d56, #141946, #090c3a)"}}>
            <div className="flex items-center mb-8">
                <Image src={galaxy.logo} alt={galaxy.name} width={48} height={48} />
                <span className="ml-4 text-2xl font-bold text-white">{galaxy.name}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {galaxy.offerings.map((offering, idx) => (
                    <div key={offering.name + idx} className="bg-[#0D1436] rounded-xl shadow-lg p-4 flex flex-col items-stretch justify-between h-full min-h-[420px] border border-slate-500">
                        {/* Logo section */}
                        <div className="flex justify-center items-center mb-4" style={{ minHeight: '90px' }}>
                            <Image src={OFFERING_LOGOS[offering.name] || '/coforge-cosmos.png'} alt={offering.name} width={180} height={40} style={{ objectFit: 'contain', display: 'block', margin: '0 auto', maxHeight: '60px' }} />
                        </div>
                        {/* Key Use Cases section */}
                        <div className="bg-[#232e62] rounded-lg p-3 mb-2 flex-1 flex flex-col justify-between" style={{ minHeight: '120px' }}>
                            <div className="mb-2 flex-1 flex flex-col">
                                <strong className="text-white mb-1">Our Offerings:</strong>
                                <ul className="list-disc list-inside text-gray-200 flex-1">
                                    {offering.keyUseCases.map((uc, i) => <li key={i}>{uc}</li>)}
                                </ul>
                            </div>
                            {/* Customers section */}
                                                        {offering.customerLogos.filter(logo => logo && logo.trim() !== "").length > 0 && (
                                                            <div className="mt-2 flex flex-col flex-1 justify-end" style={{ minHeight: '70px' }}>
                                                                <strong className="text-white mb-1">Customers:</strong>
                                                                <div className="bg-slate-100 rounded-lg p-3 mt-1 flex flex-row flex-wrap gap-2 border border-slate-200 items-center justify-center min-h-[40px]">
                                                                    {offering.customerLogos.filter(logo => logo && logo.trim() !== "").map((logo, i) => (
                                                                        <Image key={i} src={logo} alt="Customer Logo" width={80} height={32} style={{ objectFit: 'contain', maxHeight: '32px' }} />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                        </div>
                    </div>
                ))}
            </div>
            {/* Common Tech Stack */}
            <div className="bg-[#161e3d] rounded-xl shadow-lg p-6 mt-8 border border-slate-500">
                <h2 className="text-2xl font-bold text-white mb-4">Tech Stack</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-6 mb-4">
                    {TECH_STACK.map(ts => (
                        <div key={ts.name} className="flex flex-col items-center">
                            <Image src={ts.logo} alt={ts.name} width={ts.width} height={ts.height} />
                            {/* <span className="text-gray-300 text-xs mt-2">{ts.name}</span> */}
                        </div>
                    ))}
                </div>
            </div>
            {/* Common Cosmos Data Toolkit */}
            <div className="bg-[#161f3d] rounded-xl shadow-lg p-6 mt-8 border border-slate-500">
                <h2 className="text-2xl font-bold text-white mb-4">Cosmos Data Toolkit</h2>
                <ul className="list-disc list-inside text-gray-200">
                    {/* <li>ETL Script Converter</li>
                                        <li>Intelligent Scriptless Ingestion</li>
                                        <li>Agentic DQ Resolver</li>
                                        <li>Data Objects Analyzer</li>
                                        <li>Data Migration Tool</li>
                                        <li>Data Governance Nexus</li>
                                        <li>Report Rationalizer & Converter</li>
                                        <li>Agentic Production Support</li> */}
                </ul>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 mt-6">
                    {(() => {
                        const toolkitIcons = [
                            { file: 'etl.png', label: 'ETL Script Convertor' },
                            { file: 'abc.png', label: 'ABC (Audit, Balance & Control) Framework' },
                            { file: 'agentic-dq-resolver.png', label: 'Agentic DQ Resolver' },
                            { file: 'aps.png', label: 'Agentic Production Support' },
                            { file: 'auto-classifier.png', label: 'Auto Classifier' },
                            { file: 'backlog-analyzer.png', label: 'Backlog Analyzer' },
                            { file: 'code-analyzer.png', label: 'Code Analyzer' },
                            { file: 'data-360.png', label: 'Data 360' },
                            { file: 'data-governance.png', label: 'Data Governance Framework' },
                            { file: 'data-ingestion.png', label: 'Data Ingestion Framework' },
                            { file: 'data-integration.png', label: 'Data Integration Framework' },
                            { file: 'data-migration.png', label: 'Data Migration' },
                            { file: 'data-quality.png', label: 'Data Quality' },
                            { file: 'dg-nexus.png', label: 'Dat Governance Nexus' },
                            { file: 'do-analyzer.png', label: 'Data Objects Analyzer' },
                            { file: 'document-analyzer.png', label: 'Document Analyzer' },
                            { file: 'file-preload-validation.png', label: 'File Preload Validation' },
                            { file: 'intelligent-script-ingestion.png', label: 'Intelligent Scriptless Ingestion' },
                            { file: 'kt-as-service.png', label: 'KT as a Service' },
                            { file: 'llm-router.png', label: 'LLM Router' },
                            { file: 'log-analyzer.png', label: 'Log Analyzer' },
                            { file: 'product-querier.png', label: 'Product Querier' },
                            { file: 'rrc.png', label: 'Report Rationalizer & Converter' },
                            { file: 'stdg.png', label: 'Synthetic Test Data Generator (STDG) ' },
                            { file: 'ticker-analyzer.png', label: 'Ticker Analyzer' },
                        ];
                        return toolkitIcons.map(({ file, label }) => {
                            // Split label into first word and the rest
                            const [first, ...rest] = label.split(' ');
                            const htmlLabel = `<span style='color: #F15B40;'>${first}</span>${rest.length ? ' <span style=\'color: #eeeeee;\'>' + rest.join(' ') + '</span>' : ''}`;
                            return (
                                <div key={file} className="flex flex-col items-center bg-[#0D1436] border border-slate-600 rounded-lg p-4 shadow-md">
                                    <Image src={`/logos/toolkit/${file}`} alt={label} width={48} height={48} />
                                    <span className="text-xs md:text-sm font-bold mt-2 text-center w-full break-words" dangerouslySetInnerHTML={{ __html: htmlLabel }} />
                                </div>
                            );
                        });
                    })()}
                </div>
            </div>
        </main>
    );
}
