"use client";
import React from "react";
import Image from "next/image";

export interface GalaxyOffering {
  name: string;
  keyUseCases: string[];
  customerLogos: string[]; // array of image paths
  techStack: string[];
  dataToolkit: string[];
}

export interface Galaxy {
  name: string;
  logo: string; // image path
  offerings: GalaxyOffering[];
}

// Sample data structure (replace with your content)
const GALAXIES: Galaxy[] = [
  {
    name: "BFS Galaxy",
    logo: "/galaxy-bfsi.png",
    offerings: [
      {
        name: "Offering 1",
        keyUseCases: ["Use Case 1", "Use Case 2"],
        customerLogos: ["/customer1.png", "/customer2.png"],
        techStack: ["Tech 1", "Tech 2"],
        dataToolkit: ["Toolkit 1", "Toolkit 2"],
      },
      // ...add 4 more offerings
    ],
  },
  // ...add other galaxies
];

export default function GalaxiesPage() {
  return (
    <main className="min-h-screen px-8 py-12">
      <div className="flex items-center mb-8">
        <Image src={"/coforge-logo.svg"} alt="Logo" width={48} height={48} />
        <span className="ml-4 text-2xl font-bold text-white">Industry Galaxies</span>
      </div>
      <div className="grid grid-cols-5 gap-6">
        {GALAXIES.map((galaxy) => (
          <div key={galaxy.name} className="bg-slate-800/60 rounded-xl shadow-lg p-4 flex flex-col items-center">
            <Image src={galaxy.logo} alt={galaxy.name} width={100} height={24} className="mb-2" />
            <h2 className="text-xl font-bold text-white">{galaxy.name}</h2>
            {galaxy.offerings.map((offering, idx) => (
              <div key={offering.name + idx} className="mb-6 w-full">
                <div className="bg-slate-700 rounded-lg p-3 mb-2">
                  <h3 className="text-lg font-semibold text-[#f15840] mb-2">{offering.name}</h3>
                  <div className="mb-2">
                    <strong className="text-white">Our Offerings:</strong>
                    <ul className="list-disc list-inside text-gray-200">
                      {offering.keyUseCases.map((uc, i) => <li key={i}>{uc}</li>)}
                    </ul>
                  </div>
                  <div className="mb-2">
                    <strong className="text-white">Customer:</strong>
                    <div className="flex gap-2 mt-1">
                      {offering.customerLogos.map((logo, i) => (
                        <Image key={i} src={logo} alt="Customer Logo" width={32} height={32} />
                      ))}
                    </div>
                  </div>
                  <div className="mb-2">
                    <strong className="text-white">Tech Stack:</strong>
                    <ul className="list-disc list-inside text-gray-200">
                      {offering.techStack.map((tech, i) => <li key={i}>{tech}</li>)}
                    </ul>
                  </div>
                  <div>
                    <strong className="text-white">Cosmos Data Toolkit:</strong>
                    <ul className="list-disc list-inside text-gray-200">
                      {offering.dataToolkit.map((tool, i) => <li key={i}>{tool}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
