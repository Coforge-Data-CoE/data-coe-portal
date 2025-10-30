// components/icons/TabIcons.tsx
// Placeholder icon components for Tabs. Replace the SVG content with your own SVGs as needed.
import React from "react";

export const OverviewIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M3 3v16a2 2 0 0 0 2 2h16m-3-4V9m-5 8V5M8 17v-3"
    />
  </svg>
);

export const TableIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12px"
    height="12px"
    viewBox="0 0 16 16"
  >
    <path
      fill="currentColor"
      d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z"
    />
  </svg>
);

// Primary key icon (small key with "PK" badge)
export const PrimaryKeyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M7 14a3 3 0 1 0 3-3c-.17 0-.34.02-.5.06L14 6l4 4-4.94 4.94A3 3 0 0 0 7 14zM3 21v-3.5a1.5 1.5 0 0 1 1.5-1.5H7v2H5v2H3z"
    />
    <rect x="15" y="3" width="5" height="3" rx="0.5" fill="currentColor" />
    <text
      x="16.2"
      y="5.1"
      fontSize="2.8"
      fill="#fff"
      fontFamily="Arial, Helvetica, sans-serif"
    >
      PK
    </text>
  </svg>
);

// Foreign key icon (link chain with arrow)
export const ForeignKeyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 14l-1.5 1.5a3 3 0 0 1-4.24 0 3 3 0 0 1 0-4.24L8 8"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 10l1.5-1.5a3 3 0 0 1 4.24 0 3 3 0 0 1 0 4.24L16 16"
    />
    <path
      fill="currentColor"
      d="M9.5 12.5l5-5"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
    />
  </svg>
);

export const SchemaSmallIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M4 23v-6h2.5v-2H4V9h2.5V7H4V1h7v6H8.5v2H11v2h3V9h7v6h-7v-2h-3v2H8.5v2H11v6z"
    />
  </svg>
);

export const SchemaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  // <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
  //     {/* TODO: Replace with your Schema SVG */}
  //     <circle cx="12" cy="12" r="8" fill="#90CAF9" />
  // </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M27 19.001A4.006 4.006 0 0 0 23 15H9a2.003 2.003 0 0 1-2-2V9.857A4 4 0 0 0 9.858 7h12.284a4 4 0 1 0 0-2H9.858A3.992 3.992 0 1 0 5 9.858v3.141A4.006 4.006 0 0 0 9.001 17H23a2.003 2.003 0 0 1 2 2.001V22h-3v3H9.858a4 4 0 1 0 0 2H22v3h8v-8h-3ZM26 4a2 2 0 1 1-2 2a2 2 0 0 1 2-2M4 6a2 2 0 1 1 2 2a2 2 0 0 1-2-2m2 22a2 2 0 1 1 2-2a2 2 0 0 1-2 2m22-4v4h-4v-4Z"
    />
  </svg>
);

export const PerformanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
  // <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
  //     {/* TODO: Replace with your Performance SVG */}
  //     <polygon points="12,4 20,20 4,20" fill="#A5D6A7" />
  // </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M16.749 2h4.554l.1.014l.099.028l.06.026q.12.052.219.15l.04.044l.044.057l.054.09l.039.09l.019.064l.014.064l.009.095v4.532a.75.75 0 0 1-1.493.102l-.007-.102V4.559l-6.44 6.44a.75.75 0 0 1-.976.073L13 11L9.97 8.09l-5.69 5.689a.75.75 0 0 1-1.133-.977l.073-.084l6.22-6.22a.75.75 0 0 1 .976-.072l.084.072l3.03 2.91L19.438 3.5h-2.69a.75.75 0 0 1-.742-.648l-.007-.102a.75.75 0 0 1 .648-.743zM3.75 17a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75m5.75-3.25a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0zM13.75 15a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5a.75.75 0 0 1 .75-.75m5.75-4.25a.75.75 0 0 0-1.5 0v10.5a.75.75 0 0 0 1.5 0z"
      stroke-width="0.2"
      stroke="currentColor"
    />
  </svg>
);

export const AIInsightsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
    {/* TODO: Replace with your AI Insights SVG */}
    <ellipse cx="12" cy="12" rx="8" ry="6" fill="#FFD54F" />
  </svg>
);

export const RecommendationIcon = (props: React.SVGProps<SVGSVGElement>) => (
  // <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
  //     {/* Lightbulb/recommendation icon */}
  //     <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" fill="#FFA726" />
  // </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 25 24"
  >
    <path
      fill="currentColor"
      d="M9.063 18.045c-.046-1.131-.794-2.194-1.803-3.18a7.5 7.5 0 1 1 10.48 0c-1.041 1.017-1.805 2.117-1.805 3.29v1.595a2.25 2.25 0 0 1-2.25 2.25h-2.373a2.25 2.25 0 0 1-2.25-2.25zM6.5 9.5a5.98 5.98 0 0 0 1.808 4.293c.741.724 1.512 1.633 1.933 2.707h4.518c.421-1.074 1.192-1.984 1.933-2.707A6 6 0 1 0 6.5 9.5m4.063 8.713v1.537c0 .414.335.75.75.75h2.372a.75.75 0 0 0 .75-.75V18h-3.873v.017a4 4 0 0 1 0 .196M1.75 9.5a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75m2.465-5.65a.75.75 0 1 0-.75 1.3l.866.5a.75.75 0 1 0 .75-1.3zM3.19 14.875a.75.75 0 0 1 .275-1.024l.866-.5a.75.75 0 0 1 .75 1.298l-.866.5a.75.75 0 0 1-1.025-.274M21.5 8.75a.75.75 0 0 0 0 1.5h1a.75.75 0 0 0 0-1.5zm-1.855 4.875a.75.75 0 0 1 1.025-.274l.866.5a.75.75 0 1 1-.75 1.298l-.866-.5a.75.75 0 0 1-.275-1.024m.275-9.275a.75.75 0 0 0 .75 1.3l.866-.5a.75.75 0 1 0-.75-1.3z"
      stroke-width="0.2"
      stroke="currentColor"
    />
  </svg>
);

export const DataProfilingIcon = (props: React.SVGProps<SVGSVGElement>) => (
  // <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M27 3H5a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h22a2.003 2.003 0 0 0 2-2V5a2 2 0 0 0-2-2m0 6H17V5h10ZM15 27h-4v-4h4Zm0-6h-4v-4h4Zm-6 0H5v-4h4Zm2-6v-4h10v4Zm0-6V5h4v4Zm12 2h4v4h-4ZM9 5v10H5V5ZM5 23h4v4H5Zm12 4V17h10.001l.001 10Z" /></svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
  >
    <path
      fill="currentColor"
      d="M17 5.5A2.5 2.5 0 0 0 14.5 3h-9A2.5 2.5 0 0 0 3 5.5v3.757a4.5 4.5 0 0 1 1-.23V8h3v1.759a4.5 4.5 0 0 1 1 .913V8h4v4H8.742a4.5 4.5 0 0 1 .23 1H12v3H9.122l1 1H14.5a2.5 2.5 0 0 0 2.5-2.5zM14.5 16H13v-3h3v1.5l-.007.145A1.5 1.5 0 0 1 14.5 16M13 8h3v4h-3zm-1-1H8V4h4zm1-3h1.5l.145.007A1.5 1.5 0 0 1 16 5.5V7h-3zM4 7V5.5l.007-.144A1.5 1.5 0 0 1 5.5 4H7v3zm-2.616 4.905A3.5 3.5 0 0 0 6.6 16.3l2.543 2.558a.5.5 0 0 0 .707-.708L7.3 15.6a3.5 3.5 0 1 0-5.916-3.695m5.194.206a2.5 2.5 0 1 1-4.157 2.778a2.5 2.5 0 0 1 4.157-2.778"
      stroke-width="0.2"
      stroke="currentColor"
    />
  </svg>
);

export const ChatIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M12.252 18.506a10.4 10.4 0 0 0 1.875-.302a5.2 5.2 0 0 0 2.342.151a1 1 0 0 1 .094-.007c.279 0 .645.16 1.179.497v-.554a.54.54 0 0 1 .28-.472q.349-.197.645-.443c.778-.65 1.217-1.518 1.217-2.436c0-.303-.048-.605-.143-.893q.354-.651.564-1.359c.45.665.692 1.45.695 2.252c0 1.248-.588 2.412-1.607 3.263q-.256.213-.535.392v1.298c0 .446-.522.703-.89.437a14 14 0 0 0-1.08-.72a3 3 0 0 0-.332-.165a6.4 6.4 0 0 1-.935.069c-1.27 0-2.445-.377-3.37-1.008m-6.72-2.595C3.927 14.568 3 12.737 3 10.775c0-4.008 3.832-7.213 8.511-7.213c4.68 0 8.513 3.204 8.513 7.213c0 4.008-3.833 7.212-8.513 7.212q-.789 0-1.555-.12c-.22.051-1.102.568-2.372 1.483c-.46.332-1.112.012-1.112-.547V16.59a8 8 0 0 1-.94-.68m4.455.592q.058 0 .117.009q.69.114 1.407.115c3.953 0 7.116-2.645 7.116-5.852c0-3.206-3.163-5.851-7.115-5.851S4.395 7.57 4.395 10.775c0 1.55.74 3.01 2.046 4.103q.494.412 1.076.74a.68.68 0 0 1 .35.589v1.276c1.005-.665 1.666-.98 2.12-.98"
      stroke-width="0.2"
      stroke="currentColor"
    />
    <path
      fill="currentColor"
      d="M8.062 12a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25m3.657 0a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25m3.656 0a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25"
      stroke-width="0.2"
      stroke="currentColor"
    />
  </svg>
);
