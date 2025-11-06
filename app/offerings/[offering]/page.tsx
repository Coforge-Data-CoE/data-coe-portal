"use client";
import { useParams } from "next/navigation";
import React from "react";
import { Card } from "antd";

type OfferingContent = { title: string; description: React.ReactNode };
const OFFERING_CONTENT: Record<string, OfferingContent> = {
  supernova: {
    title: "Coforge SUPERNOVA",
    description: (
      <>
        {/* <p className="mb-4">
          <strong>When a star dies and disintegrates, it’s called supernova.</strong> Supernova based technology solutions help enterprises modernize legacy data ecosystems and migrate to the cloud with precision and scale. We combine cloud-native engineering, automation, and governance to reimagine how organizations manage, process, and activate data. We offer 5 specific data engineering solutions to modernize & transform clients’ data ecosystem across hybrid and multi-cloud landscapes.
        </p> */}
        <p className="mb-4 font-semibold">The five Supernovae DE solutions we offer are:</p>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card title={<strong>Data Appliance Decommissioning</strong>} className="text-left comet-cursor">
            Retire costly and inefficient legacy data appliances (such as Teradata, Exadata, Greenplum, Netezza, etc) and migrate the data and workloads securely to hyperscaler environments (Azure, AWS, Google Cloud)
          </Card>
          <Card title={<strong>ETL Modernization</strong>} className="text-left comet-cursor">
            Simplify, optimize, and re-platform legacy ETL (Informatica, DataStage, Ab Initio, etc.) workloads into modular, metadata-driven modern spark-based data pipelines running on cloud at the fraction of compute cost and no license fees.
          </Card>
          <Card title={<strong>Report Modernization</strong>} className="text-left comet-cursor">
            Streamline, rationalize and standardize legacy reporting systems (such as Business Objects, Cognos, Crystal Reports, etc.) to deliver modern, cloud native reporting platform on PowerBI. We even offer Tableau to PowerBI conversion as we see much demand in this due to exorbitant cost of Tableau. PowerBI is offered at fraction of the cost and many time such programs pay for themselves after license cost reduction over 3 to 5 years.
          </Card>
          <Card title={<strong>DBMS Modernization</strong>} className="text-left comet-cursor">
            Migrate, optimize, and refactor on-premise databases such as Sybase, Oracle, SQL Server into open-source PostgreSQL on cloud or cloud-native databases managed services.
          </Card>
          <Card title={<strong>AI/ML Modernization</strong>} className="text-left comet-cursor">
            Reimagine data science and AI workflows through modularized, production-ready, cloud-native machine learning architectures. Under this offering, we modernize SAS, SPSS or R based models into latest Python / Scala models with PySpark or ScalaSpark data prep pipelines.
          </Card>
        </div>
      </>
    )
  },
  nebula: {
    title: "Coforge NEBULA",
    description: (
      <>
        {/* <p className="mb-4">
          <strong>Nebulae are a constant phenomenon in the night sky; they are always there.</strong> Our Nebula based DE solutions focus on the constant demands from clients’ in the data space to deliver modern data strategy, enable trusted data management, and AI-driven insights. With automation at its core and governance built into every layer, Nebula enables enterprises to move from fragmented, reactive data landscape to virtualized, agentic, insight-ready data ecosystems.
        </p> */}
        <p className="mb-2 font-semibold">Under Nebula portfolio, we offer:</p>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card title={<strong>Defining Modern Data Strategy</strong>} className="text-left comet-cursor">
            It’s a fixed 8 weeks Design Thinking led engagement where we deploy a small team of consultants who work with client stakeholders to Define, Design and Operationalize enterprise-wide / BU wise data strategy aimed at business growth, operational efficiency, data monetization, NBO/NBA, compliance, and AI-readiness / Adoption.
          </Card>
          <Card title={<strong>Agentic/AI enabled Data Management</strong>} className="text-left comet-cursor">
            Our proven AI4Data offering leverages the recent GenAI led innovations to enable autonomous, self-healing data ecosystems with AI-driven governance, automated quality monitoring, and unified metadata and catalog services.
          </Card>
          <Card title={<strong>Insight & Decision Support</strong>} className="text-left comet-cursor">
            Integrate semantic layers, knowledge graphs, and decision intelligence-based data solutions to enable dynamic BI dashboards, accelerate Self-service user to transform enterprise data into actionable insights.
          </Card>
          <Card title={<strong>MLOps</strong>} className="text-left comet-cursor">
            Operationalize AI/ML workflows with governed pipelines, version control, and lifecycle automation. This also covers MRM programs that banks must deploy for their ML models in functions such as credit scoring, cross sell/up sell, risk modeling, liquidity assessment, etc.
          </Card>
          <Card title={<strong>Data Governance, Quality & Catalog</strong>} className="text-left comet-cursor">
            Embed data governance, data access right (RBAC) data lineage, and data quality monitoring and self-correction (where possible) into every data modernization layer. This offering also allows automated metadata capture to build technical metadata dictionaries to deliver data catalogs and business glossaries.
          </Card>
        </div>
      </>
    )
  },
  hypernova: {
    title: "Coforge HYPERNOVA",
    description: (
      <>
        {/* <p className="mb-4">
          <strong>When an extremely large star collapses, it creates a massive explosion and develops a black hole in the center and spews out so much material that it gives rise to galaxy, nebulae, new stars & planets, and cosmic dust.</strong> Our Hypernova based solutions portfolio offers greenfield data solutions to enable new business growth or increase operational efficiency based on industry context, modern data architecture, and AI-powered capabilities.
        </p> */}
        <p className="mb-2 font-semibold">Under Hypernova, some offerings we provide are as follows:</p>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card title={<strong>Data Mesh Buildout and Deployment</strong>} className="text-left comet-cursor">
            Build and deploy a DataMesh that is opinionated but standardized for specific HyperScaler’s Cloud data products. Under this offering, we provide three specific DataMesh architectures for Azure, AWS, and GCP.
          </Card>
          <Card title={<strong>Dynamic Data Ingestion Pipelines</strong>} className="text-left comet-cursor">
            Build zero-code / zero ETL, dynamic data ingestion pipelines based on configurations and agentic-AI. The aim is to reduce ETL code and take care of most of data ingestion needs by deploying platform based dynamic data pipelines.
          </Card>
          <Card title={<strong>Greenfield Data Lake / Cloud Warehouse development</strong>} className="text-left comet-cursor">
            We offer greenfield development of cloud data warehouses and data lakes built on Snowflake, Databricks, AWS Redshift, GCP BQ, etc. to enable clients take advantage of these cloud native platforms to develop data solutions with faster time to market. Mostly these solutions are custom build business applications running on cloud based data platforms. We have host of accelerators within the Cosmos Data Toolkit that provide acceleration in such greenfield implementations.
          </Card>
          <Card title={<strong>Development of Advanced Analytics</strong>} className="text-left comet-cursor">
            Develop advanced analytics reports and dashboards for client’s needs. Also offer user sand-boxes to enable self-service and data wrangling for the power users.
          </Card>
          <Card title={<strong>AI/ML model development, training and deployment</strong>} className="text-left comet-cursor">
            Design, develop, train, validate and deploy new AI/ML models on cloud platforms such as AWS SageMaker, AzureML, GCP Vertex or Dataiku, Datakitchen, H2O, etc.
          </Card>
        </div>
      </>
    )
  },
  pulsar: {
    title: "Coforge PULSAR",
    description: (
      <>
        {/* <p className="mb-4">
          <strong>Deliver uninterrupted business performance with intelligent, AI-assisted DataOps.</strong> Pulsar enables enterprises to move from manual troubleshooting to autonomous operations blending observability, analytics, and knowledge automation for faster recovery, reduced downtime, and improved SLAs.
        </p> */}
        <p className="mb-2 font-semibold">What We Offer:</p>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card title={<strong>Agentic L1, L1.5 & L2 Break-Fixes</strong>} className="text-left comet-cursor">
            Automate triage and resolution across support tiers using AI-powered runbooks, contextual knowledge bases, and real-time remediation workflows.
          </Card>
          <Card title={<strong>KT-as-a-Service</strong>} className="text-left comet-cursor">
            Accelerate onboarding and knowledge continuity through on-demand, AI-curated knowledge transfer modules and guided diagnostics.
          </Card>
          <Card title={<strong>System and DB Log Analysis</strong>} className="text-left comet-cursor">
            Identify patterns, anomalies, and failure points instantly using machine learning–driven log analysis for faster root cause isolation.
          </Card>
          <Card title={<strong>Production Ticket Analysis</strong>} className="text-left comet-cursor">
            Optimize operations by using NLP-based insights to classify, prioritize, and resolve repetitive incidents automatically.
          </Card>
          <Card title={<strong>Backlog Analysis</strong>} className="text-left comet-cursor">
            Improve productivity and SLA adherence through predictive analytics that identify blockers, dependencies, and effort hotspots in real time.
          </Card>
        </div>
      </>
    )
  },
  quasar: {
    title: "Coforge QUASAR",
    description:
      "QUASAR enables Gen AI Adoption in Data and Analytics, with Coforge AI Studio, OpenSource, LLM Router, Gen AI Central, Trust AI, Cockpit-Insights, and Document Analyzer."
  }
};

export default function OfferingPage() {
  const params = useParams();
  const offering = (params.offering as string)?.toLowerCase();
  const OFFERING_LOGOS: Record<string, string> = {
    supernova: '/logos/galaxies/coforge-supernova_white.svg',
    nebula: '/logos/galaxies/coforge-nebula_white.svg',
    hypernova: '/logos/galaxies/coforge-hypernova_white.svg',
    pulsar: '/logos/galaxies/coforge-pulsar_white.svg',
    quasar: '/logos/galaxies/coforge-quasar_white.svg',
  };
  const content = OFFERING_CONTENT[offering] || {
    title: "Offering Not Found",
    description: "The selected offering does not exist. Please choose a valid offering.",
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center px-4 py-16  offerings-bg">
      <div className="w-full bg-slate-800/60 rounded-xl shadow-lg p-8 text-center">
        {OFFERING_LOGOS[offering] ? (
          <div className="flex justify-center mb-6">
            <img src={OFFERING_LOGOS[offering]} alt={content.title} style={{ height: 48, maxWidth: 220, objectFit: 'contain' }} />
          </div>
        ) : (
          <h1 className="text-4xl font-bold text-white mb-6">{content.title}</h1>
        )}
        <div className="text-lg text-gray-200 mb-4">{content.description}</div>
      </div>
    </main>
  );
}
