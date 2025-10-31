"use client";
import { useState } from "react";
import Image from "next/image";

const cosmosCards = [
  {
    key: "supernova",
    image: "/coforge-supernova.png",
    alt: "SUPERNOVA",
    title: "Coforge SUPERNOVA",
    subtitle: "Data Modernization & Cloud Migration",
    items: [
      "Data Appliance",
      "Decom",
      "ETL Modernization",
      "Report Modernization",
      "DBMS Modernization",
      "AI/ML Modernization",
      "Data Governance, Quality & Data Catalog"
    ]
  },
  {
    key: "nebula",
    image: "/coforge-nebula.png",
    alt: "NEBULA",
    title: "Coforge NEBULA",
    subtitle: "Core Offerings",
    items: [
      "Modern Data Strategy",
      "Development",
      "Agentic Data Management",
      "MLOps",
      "Insights & Decision Support"
    ]
  },
  {
    key: "hypernova",
    image: "/coforge-hypernova.png",
    alt: "HYPERNOVA",
    title: "Coforge HYPERNOVA",
    subtitle: "Industry Led Data Mesh Solutions",
    items: [
      "Common Data Mesh Architecture",
      "deployable on all 3 Hyperscalers",
      "Prebuilt domain data products for",
      "BFSI",
      "BFS",
      "TTH",
      "Retail",
      "Others"
    ]
  },
  {
    key: "pulsar",
    image: "/coforge-pulsar.png",
    alt: "PULSAR",
    title: "Coforge PULSAR",
    subtitle: "Agentic DataOps Support Platform",
    items: [
      "Agentic L1, L1.5 and L2 Break-Fixes for DataOps Production Support",
      "Log Analyzer",
      "Ticket Analyzer",
      "Backlog Analyzer"
    ]
  },
  {
    key: "quasar",
    image: "/coforge-cosmos.png",
    alt: "QUASAR",
    title: "Coforge QUASAR",
    subtitle: "Gen AI Adoption in Data and Analytics",
    items: [
      "Coforge AI Studio",
      "OpenSource",
      "LLM Router",
      "Gen AI Central",
      "Trust AI",
      "Cockpit-Insights",
      "Document Analyzer"
    ]
  }
];

export default function DataCosmosPage() {

  const carouselPanels = [
    {
      title: "What is Data Cosmos?",
      content: (
        <>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Coforge Data Cosmos</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-6 text-center">
            Coforge Data Cosmos is an enterprise data platform designed to accelerate data modernization, cloud migration, and analytics transformation. It unifies data, AI, and automation for banking, insurance, retail, healthcare, and public sector industries.
          </p>
        </>
      )
    },
    {
      title: "Our Offerings",
      content: (
        <>
          <h2 className="text-3xl font-bold text-white mb-4">Data Cosmos Offerings</h2>
          <ul className="text-lg text-gray-200 max-w-2xl mx-auto mb-6 list-disc list-inside">
            <li>SUPERNOVA: Data Modernization & Cloud Migration</li>
            <li>NEBULA: Core Data Management & Analytics</li>
            <li>HYPERNOVA: Industry Led Data Mesh Solutions</li>
            <li>PULSAR: Agentic DataOps Support Platform</li>
            <li>QUASAR: Gen AI Adoption in Data and Analytics</li>
          </ul>
        </>
      )
    },
    {
      title: "Why Choose Data Cosmos?",
      content: (
        <>
          <h2 className="text-3xl font-bold text-white mb-4">Why Data Cosmos?</h2>
          <ul className="text-lg text-gray-200 max-w-2xl mx-auto mb-6 list-disc list-inside">
            <li>Accelerate enterprise data transformation</li>
            <li>Unified platform for data, AI, and automation</li>
            <li>Industry-specific solutions and toolkits</li>
            <li>Scalable, secure, and future-ready architecture</li>
          </ul>
        </>
      )
    }
  ];

  const [activePanel, setActivePanel] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background dots (optional, for effect) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* You can add animated dots here if needed */}
      </div>
      {/* Full screen carousel */}
      <div className="relative z-20 w-full h-[60vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="w-full max-w-3xl mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
          {carouselPanels[activePanel].content}
          <div className="flex gap-4 mt-6 justify-center">
            {carouselPanels.map((_, idx) => (
              <button
                key={idx}
                className={`w-4 h-4 rounded-full border-2 ${activePanel === idx ? 'bg-cyan-400 border-cyan-400' : 'bg-slate-700 border-slate-500'} transition-all`}
                onClick={() => setActivePanel(idx)}
                aria-label={`Go to panel ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="relative z-10 p-6">
        <div className=" mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left menu ...existing code... */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-4 flex items-center">
                  <i className="ri-building-line mr-2"></i>Industry Galaxies
                </h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center whitespace-nowrap text-gray-300 hover:bg-slate-700/50 hover:text-white">
                    <i className="ri-bank-line mr-3 text-lg"></i><span className="text-sm">Banking & Financial Services</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center whitespace-nowrap text-gray-300 hover:bg-slate-700/50 hover:text-white">
                    <i className="ri-shield-line mr-3 text-lg"></i><span className="text-sm">Insurance</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center whitespace-nowrap text-gray-300 hover:bg-slate-700/50 hover:text-white">
                    <i className="ri-plane-line mr-3 text-lg"></i><span className="text-sm">Travel, Transport & Hospitality</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center whitespace-nowrap text-gray-300 hover:bg-slate-700/50 hover:text-white">
                    <i className="ri-shopping-cart-line mr-3 text-lg"></i><span className="text-sm">Retail, Manufacturing & Consumer Goods</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center whitespace-nowrap text-gray-300 hover:bg-slate-700/50 hover:text-white">
                    <i className="ri-heart-pulse-line mr-3 text-lg"></i><span className="text-sm">Healthcare & Life Sciences</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center whitespace-nowrap bg-blue-600/50 text-white border border-blue-400/50">
                    <i className="ri-government-line mr-3 text-lg"></i><span className="text-sm">Public Sector, Energy & Utilities</span>
                  </button>
                </div>
              </div>
            </div>
            {/* Main cards grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-6">
                {cosmosCards.map(card => (
                  <div key={card.key} className="bg-slate-800/40 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20">
                    <div className="text-center mb-4">
                      <div className="mb-2 flex justify-center">
                        <Image src={card.image} alt={card.alt} width={120} height={40} />
                      </div>
                      <h4 className="text-white font-semibold text-sm mb-1">{card.title}</h4>
                      <p className="text-gray-400 text-xs">{card.subtitle}</p>
                    </div>
                    <ul className="space-y-1">
                      {card.items.map((item, idx) => (
                        <li key={idx} className="text-gray-300 text-xs flex items-start">
                          <span className="text-cyan-400 mr-1">•</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {/* Data Toolkit */}
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold flex items-center">
                    <i className="ri-tools-line mr-2"></i>Cosmos Data Toolkit
                  </h3>
                  <i className="ri-arrow-right-line text-white text-xl"></i>
                </div>
                <p className="text-gray-400 text-sm mt-2">ETL Script Converter, Intelligent Scriptless Ingestion, Agentic DQ Resolver, Data Objects Analyzer, Data Migration Tool, Data Governance Nexus, Report Rationalizer & Converter, Agentic Production Support</p>
              </div>
              {/* Data Partners */}
              {(() => {
                const dataPartners = [
                  { name: "Snowflake", logo: "/logos/snowflake.png" },
                  { name: "Databricks", logo: "/logos/databricks.png" },
                  { name: "Snaplogic", logo: "/logos/snaplogic.png" },
                  { name: "dbt", logo: "/logos/dbt.png" },
                  { name: "Qlik", logo: "/logos/qlik.png" },
                  { name: "Matillion", logo: "/logos/matillion.png" },
                  { name: "Coalesce", logo: "/logos/coalesce.png" }
                ];
                return (
                  <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4 mb-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center">
                      <i className="ri-team-line mr-2"></i>Data Partners
                    </h3>
                    <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
                      {dataPartners.map(partner => (
                          <div key={partner.name} className="bg-slate-700/50 rounded-lg p-3 hover:bg-slate-600/50 transition-all duration-200 cursor-pointer flex flex-col items-center justify-between h-24">
                            <div className="flex-1 flex items-center justify-center">
                              <Image src={partner.logo} alt={partner.name} width={100} height={32} />
                            </div>
                            {/* <p className="text-xs text-gray-400 mt-2 text-center w-full">{partner.name}</p> */}
                          </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
              {/* Cloud Infra */}
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-4 flex items-center">
                  <i className="ri-cloud-line mr-2"></i>Cloud Infra
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-700/50 rounded-lg p-4 text-center hover:bg-slate-600/50 transition-all duration-200 cursor-pointer flex flex-col items-center justify-between h-24">
                    <div className="flex-1 flex items-center justify-center">
                      <Image src="/logos/azure.png" alt="Microsoft Azure" width={100} height={32} />
                    </div>
                    {/* <p className="text-sm text-gray-400 mt-2 text-center w-full">Microsoft Azure</p> */}
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4 text-center hover:bg-slate-600/50 transition-all duration-200 cursor-pointer flex flex-col items-center justify-between h-24">
                    <div className="flex-1 flex items-center justify-center">
                      <Image src="/logos/aws.png" alt="AWS" width={60} height={32} />
                    </div>
                    {/* <p className="text-sm text-gray-400 mt-2 text-center w-full">AWS</p> */}
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4 text-center hover:bg-slate-600/50 transition-all duration-200 cursor-pointer flex flex-col items-center justify-between h-24">
                    <div className="flex-1 flex items-center justify-center">
                      <Image src="/logos/google-cloud.png" alt="Google Cloud" width={150} height={32} />
                    </div>
                    {/* <p className="text-sm text-gray-400 mt-2 text-center w-full">Google Cloud</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

