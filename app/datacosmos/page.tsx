"use client";
import { useState } from "react";
import Image from "next/image";

const cosmosCards = [
  {
    key: "supernova",
    image: "/logos/galaxies/coforge-supernova_white.svg",
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
    ]
  },
  {
    key: "nebula",
    image: "/logos/galaxies/coforge-nebula_white.svg",
    alt: "NEBULA",
    title: "Coforge NEBULA",
    subtitle: "Core Offerings",
    items: [
      "Defining Modern Data Strategy",
      "Agentic/AI enabled Data Management",
      "Insight & Decision Support",
      "MLOps",
      "Data Governance, Quality & Catalog"
    ]
  },
  {
    key: "hypernova",
    image: "/logos/galaxies/coforge-hypernova_white.svg",
    alt: "HYPERNOVA",
    title: "Coforge HYPERNOVA",
    subtitle: "Industry Led Data Mesh Solutions",
    items: [
      "Data Mesh Buildout and Deployment",
      "Dynamic Data Ingestion Pipelines",
      "Greenfield Data Lake / Cloud Warehouse",
      "Advanced Analytics",
      "AI/ML model development, training and deployment"
    ]
  },
  {
    key: "pulsar",
    image: "/logos/galaxies/coforge-pulsar_white.svg",
    alt: "PULSAR",
    title: "Coforge PULSAR",
    subtitle: "Agentic DataOps Support Platform",
    items: [
      "Agentic L1, L1.5 and L2 Break-Fixes for DataOps Production Support",
      "KT-as-a-Service",
      "System and DB Log Analysis",
      "Production Ticket Analysis",
      "Backlog Analysis"
    ]
  },
  {
    key: "quasar",
    image: "/logos/galaxies/coforge-quasar_white.svg",
    alt: "QUASAR",
    title: "Coforge QUASAR",
    subtitle: "Gen AI Adoption in Data and Analytics",
    items: [
      "Quasar Marketplace",
      "Coforge AI Studio",
      "AgentSphere",
      "LLM Integration & Orchestration",
      "Gen AI Central",
      "Trust AI",
      "Document Insights"
    ]
  }
];

import Script from "next/script";
import React, { Suspense } from "react";
const GalaxyBackground = React.lazy(() => import("../components/GalaxyBackground"));
import { Carousel } from 'antd';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function DataCosmosPage() {

  const carouselPanels = [
    {
      title: "A Unified Constellation of Data Excellence",
      content: (
        <div className="relative w-screen h-[85vh] flex flex-col items-center justify-center overflow-hidden">
          {/* Background image */}
          <Image
            src="/bg-7.jpg"
            alt="Data Cosmos Background"
            fill
            className="object-cover w-full h-full absolute inset-0 z-0"
            priority
          />
          {/* Blue overlay with less blur */}
          <div className="absolute inset-0 bg-[#0c1b48]/70 z-10" />
          {/* Content above background */}
          <div className="relative z-20 flex flex-col items-center justify-center w-full px-4">
            <div className="mb-8 flex justify-center">
              <Image src="/logos/galaxies/coforge-cosmos_white.svg" alt="Coforge Data Cosmos Logo" width={180} height={36} className="md:w-[320px]  w-[180px]" />
            </div>
            <h1 className="text-3xl md:text-6xl md:text-7xl font-bold text-white mb-10 text-center drop-shadow-lg">A Unified Constellation of Data Excellence</h1>
            <p className="text-base md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 text-center drop-shadow-md">
              {/* The Coforge Data Cosmos integrates technology and business to modernize data, migrate to the cloud, and infuse AI-driven intelligence—accelerating digital transformation across enterprises. */}
              Coforge Data Cosmos is AI enabled, foundational innovation platform; that we use internally to develop cloud native, domain specific solutions that leverage reusable, standard, technology based Solutions consisting of our own IP, Accelerators, Agents, Utilities, Frameworks, Workflows, Capabilities and optional partner products. 
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Powering Transformation with Five Technology Towers",
      content: (
        <div className="relative w-screen h-[85vh] flex flex-col items-center justify-center overflow-hidden">
          {/* Background image for panel 2 */}
          <Image
            src="/bg-2.jpg" //"/bg-6.jpg"
            alt="Panel 2 Background"
            fill
            className="object-cover w-full h-full absolute inset-0 z-0"
            priority
          />
          <div className="absolute inset-0 bg-[#0c1b48]/70 z-10" />
          <div className="relative z-20 flex flex-col items-center justify-center w-full px-4">
            <div className="mb-8 flex justify-center">
              <Image src="/logos/galaxies/coforge-cosmos_white.svg" alt="Coforge Data Cosmos Logo" width={180} height={36} className="md:w-[320px] md:h-[64px] w-[180px] h-[36px]" />
            </div>
            <h1 className="text-xl md:text-5xl md:text-6xl font-bold text-white mb-8 text-center">Powering Transformation with Five Technology Towers</h1>
            <div className="text-base md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8 text-center">
              Our technology-driven offerings
              <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-2 md:gap-4 my-4">
                <div className="flex flex-col items-center md:flex-row md:items-center md:gap-4 w-full">
                  <span className="text-cyan-400 font-bold text-lg md:text-3xl">Supernova</span>
                  <span className="hidden md:inline text-cyan-400 text-2xl">&bull;</span>
                </div>
                <div className="flex flex-col items-center md:flex-row md:items-center md:gap-4 w-full">
                  <span className="text-cyan-400 font-bold text-lg md:text-3xl">Nebula</span>
                  <span className="hidden md:inline text-cyan-400 text-2xl">&bull;</span>
                </div>
                <div className="flex flex-col items-center md:flex-row md:items-center md:gap-4 w-full">
                  <span className="text-cyan-400 font-bold text-lg md:text-3xl">Hypernova</span>
                  <span className="hidden md:inline text-cyan-400 text-2xl">&bull;</span>
                </div>
                <div className="flex flex-col items-center md:flex-row md:items-center md:gap-4 w-full">
                  <span className="text-cyan-400 font-bold text-lg md:text-3xl">Pulsar</span>
                  <span className="hidden md:inline text-cyan-400 text-2xl">&bull;</span>
                </div>
                <div className="flex flex-col items-center md:flex-row md:items-center md:gap-4 w-full">
                  <span className="text-cyan-400 font-bold text-lg md:text-3xl">Quasar</span>
                </div>
              </div>
              help enterprises evolve from legacy to modern ecosystems and unlock the full power of cloud and AI.
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Galaxy Solutions for Every Industry",
      content: (
        <div className="relative w-screen h-[85vh] flex flex-col items-center justify-center overflow-hidden">
          {/* Background image for panel 3 */}
          <Image
            src= "/bg-space.jpg"//"/bg-3.jpg"
            alt="Panel 3 Background"
            fill
            className="object-cover w-full h-full absolute inset-0 z-0"
            priority
          />
          <div className="absolute inset-0 bg-[#0c1b48]/70 z-10" />
          <div className="relative z-20 flex flex-col items-center justify-center w-full px-4">
            <div className="mb-8 flex justify-center">
              <Image src="/logos/galaxies/coforge-cosmos_white.svg" alt="Coforge Data Cosmos Logo" width={180} height={36} className="md:w-[320px] md:h-[64px] w-[180px] h-[36px]" />
            </div>
            <h1 className="text-xl md:text-5xl md:text-6xl font-bold text-white mb-8 text-center">Galaxy Solutions for Every Industry</h1>
            <p className="text-base md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8 text-center">
              From BFS to Insurance, our domain-led Galaxy offerings build on Data Cosmos technologies to bring agility, innovation, and measurable business impact.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      <Script src="/sparkle-cursor-cosmos.js" strategy="afterInteractive" />
      <div className="min-h-screen  relative overflow-hidden">
        {/* Animated background dots (optional, for effect) */}
        <div className="absolute inset-0 pointer-events-none">
          {/* You can add animated dots here if needed */}
        </div>
        {/* Full screen carousel using Ant Design */}
        {/* Full screen carousel using react-slick */}
        <div className="relative z-20 w-full h-[80vh] flex items-center justify-center">
          <div className="w-full mx-auto py-12 flex flex-col items-center justify-center text-center">
            <div className="w-full mx-auto">
              <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              autoplay={true}
              autoplaySpeed={4000}
              arrows={false}
              appendDots={(dots: any) => (
                <div style={{ position: 'absolute', bottom: 24, width: '100%' }}>
                  <ul style={{ margin: 0, display: 'flex', justifyContent: 'center' }}>{dots}</ul>
                </div>
              )}
              customPaging={(i: any) => (
                <button style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: '#86c1ff',
                  border: '2px solid #fff',
                  opacity: 0.7,
                  margin: '2px',
                  cursor: 'pointer'
                }} />
              )}
            >
              {carouselPanels.map((panel, idx) => (
                <div key={idx}>{panel.content}</div>
              ))}
              </Slider>
            </div>
          </div>
        </div>
        <div className="relative z-10 p-6 pt-16" style={{ backgroundImage: "linear-gradient(88deg, #05091a, #162065, #09113a)" }}>
          {/* Galaxy background effect */}
          <Suspense fallback={<div className="w-full h-full bg-[#081433]" />}>
            <GalaxyBackground />
          </Suspense>
          <h1 className="text-xl md:text-4xl font-bold text-center text-white mb-8">Our Offerings</h1>
          <div className=" mx-auto mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left menu ...existing code... */}
              <div className="lg:col-span-1">
                <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-lg p-4 md:w-[98vw] md:max-w-[98vw]">
                  <h3 className="text-white font-semibold mb-4 flex items-center">
                    <i className="ri-building-line mr-2"></i>Industry Galaxies
                  </h3>
                  <div className="space-y-2">
                    <a href="/galaxies/bfsi" className="w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center whitespace-normal text-gray-200 hover:bg-[#12182073] hover:text-white border border-slate-500 hover:border-[#86c1ff]">
                      <i className="ri-bank-line mr-3 text-lg"></i><span className="">Banking & Financial Services</span>
                    </a>
                    <a href="/galaxies/insurance" className="w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center whitespace-normal text-gray-200 hover:bg-[#12182073] hover:text-white border border-slate-500 hover:border-[#86c1ff]">
                      <i className="ri-shield-line mr-3 text-lg"></i><span className="">Insurance</span>
                    </a>
                    <a href="/galaxies/tth" className="w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center whitespace-normal text-gray-200 hover:bg-[#12182073] hover:text-white border border-slate-500 hover:border-[#86c1ff]">
                      <i className="ri-plane-line mr-3 text-lg"></i><span className="">Travel, Transport & Hospitality</span>
                    </a>
                    <a href="/galaxies/retail" className="w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center whitespace-normal text-gray-200 hover:bg-[#12182073] hover:text-white border border-slate-500 hover:border-[#86c1ff]">
                      <i className="ri-shopping-cart-line mr-3 text-lg"></i><span className="">Retail, Manufacturing & Consumer Goods</span>
                    </a>
                    <a href="/galaxies/healthcare" className="w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center whitespace-normal text-gray-200 hover:bg-[#12182073] hover:text-white border border-slate-500 hover:border-[#86c1ff]">
                      <i className="ri-heart-pulse-line mr-3 text-lg"></i><span className="">Healthcare & Life Sciences</span>
                    </a>
                    <a href="/galaxies/energy" className="w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center whitespace-normal text-gray-200 hover:bg-[#12182073] hover:text-white border border-slate-500 hover:border-[#86c1ff]">
                      <i className="ri-government-line mr-3 text-lg"></i><span className="">Public Sector, Energy & Utilities</span>
                    </a>
                  </div>
                </div>
              </div>
              {/* Main cards grid */}
              <div className="lg:col-span-3 max-w-7xl w-full mx-auto px-2 sm:px-4 md:px-6 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-6">
                  {cosmosCards.map(card => (
                    <a
                      key={card.key}
                      href={`/offerings/${card.key}`}
                      className="cosmos-card bg-[#181C2A] backdrop-blur-sm border border-slate-700 rounded-lg p-4 transition-all duration-200 hover:shadow-lg hover:shadow-[#86c1ff]/20 block cursor-pointer group"
                    >
                      <div className="text-center mb-4">
                        <div className="mb-2 flex justify-center">
                          <Image src={card.image} alt={card.alt} width={90} height={22} className="md:w-[160px] w-[120px] " />
                        </div>
                        {/* <h4 className="text-white font-semibold  mb-1">{card.title}</h4> */}
                        <p className="text-xs md:text-base text-blue-300 pt-4 group-hover:text-white transition-colors duration-200">{card.subtitle}</p>
                      </div>
                      <ul className="space-y-1">
                        {card.items.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-xs md:text-base text-cyan-400 mr-1 transition-colors duration-200 group-hover:text-[#86c1ff]">•</span>
                            <span className="text-xs md:text-base text-gray-200 transition-colors duration-200 group-hover:text-[#86c1ff]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </a>
                  ))}
                </div>
                {/* Data Toolkit */}
                <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-500 rounded-lg p-4 mb-6 mt-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold flex items-center">
                      <i className="ri-tools-line mr-2"></i>Cosmos Data Toolkit
                    </h3>
                    {/* <i className="ri-arrow-right-line text-white text-xl"></i> */}
                  </div>
                  {/* <p className="text-gray-200  mt-2">ETL Script Converter, Intelligent Scriptless Ingestion, Agentic DQ Resolver, Data Objects Analyzer, Data Migration Tool, Data Governance Nexus, Report Rationalizer & Converter, Agentic Production Support</p> */}

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
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
                        const htmlLabel = `<span style='color: #F15B40;'>${first}</span>${rest.length ? ' <span style=\'color: white;\'>' + rest.join(' ') + '</span>' : ''}`;
                        return (
                          <div key={file} className="flex flex-col items-center bg-[#0d1436] border border-slate-700 rounded-lg p-4 shadow-md transition-all duration-200 hover:border-[#F15B40]">
                            <Image src={`/logos/toolkit/${file}`} alt={label} width={36} height={36} />
                            <span className="text-xs md:text-sm font-bold mt-2 text-center w-full break-words" dangerouslySetInnerHTML={{ __html: htmlLabel }} />
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
                {/* Data Partners */}
                {(() => {
                  const dataPartners = [
                    { name: "Snowflake", logo: "/logos/snowflake.png" },
                    { name: "Databricks", logo: "/logos/databricks.png" },
                    { name: "Snaplogic", logo: "/logos/snaplogic_white.png" },
                    { name: "dbt", logo: "/logos/dbt.png" },
                    { name: "Qlik", logo: "/logos/qlik.png" },
                    { name: "Matillion", logo: "/logos/matillion.png" },
                    { name: "Coalesce", logo: "/logos/coalesce.png" }
                  ];
                  return (
                    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-500 rounded-lg p-4 mb-6">
                      <h3 className="text-white font-semibold mb-4 flex items-center">
                        <i className="ri-team-line mr-2"></i>Data Partners
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
                        {dataPartners.map(partner => (
                          <div key={partner.name} className="bg-[#12182073] rounded-lg p-3 hover:bg-blue-500/50 border border-slate-500 transition-all duration-200 flex flex-col items-center justify-between h-24">
                            <div className="flex-1 flex items-center justify-center">
                              <Image src={partner.logo} alt={partner.name} width={100} height={32} />
                            </div>
                            {/* <p className=" text-gray-400 mt-2 text-center w-full">{partner.name}</p> */}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
                {/* Cloud Infra */}
                <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-500 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-4 flex items-center">
                    <i className="ri-cloud-line mr-2"></i>Cloud Infra
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#12182073] rounded-lg p-4 text-center hover:bg-[#0b0b20] border border-slate-500 transition-all duration-200 flex flex-col items-center justify-between h-24">
                      <div className="flex-1 flex items-center justify-center">
                        <Image src="/logos/azure.png" alt="Microsoft Azure" width={100} height={32} />
                      </div>
                      {/* <p className=" text-gray-400 mt-2 text-center w-full">Microsoft Azure</p> */}
                    </div>
                    <div className="bg-[#12182073] rounded-lg p-4 text-center hover:bg-[#0b0b20] border border-slate-500 transition-all duration-200  flex flex-col items-center justify-between h-24">
                      <div className="flex-1 flex items-center justify-center">
                        <Image src="/logos/aws.png" alt="AWS" width={60} height={32} />
                      </div>
                      {/* <p className=" text-gray-400 mt-2 text-center w-full">AWS</p> */}
                    </div>
                    <div className="bg-[#12182073] rounded-lg p-4 text-center hover:bg-[#0b0b20] border border-slate-500 transition-all duration-200 flex flex-col items-center justify-between h-24">
                      <div className="flex-1 flex items-center justify-center">
                        <Image src="/logos/google-cloud.png" alt="Google Cloud" width={150} height={32} />
                      </div>
                      {/* <p className=" text-gray-400 mt-2 text-center w-full">Google Cloud</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

