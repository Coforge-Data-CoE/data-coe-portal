import "@ant-design/v5-patch-for-react-19";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coforge Data Platform",
  description: "data-coe.coforge.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anek+Devanagari:wght@100..800&display=swap"
          rel="stylesheet"
        />
        <script src="/sparkle-cursor.js" defer></script>
        <meta property="og:title" content="Coforge Data Cosmos" />
        <meta property="og:description" content="Coforge Data Cosmos is AI enabled, foundational innovation platform." />
        <meta property="og:image" content="https://coforge-data-cosmos.eastus2.cloudapp.azure.com/logos/galaxies/coforge-cosmos_white.svg" />
        <meta property="og:url" content="https://coforge-data-cosmos.eastus2.cloudapp.azure.com/" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased comet-cursor`}
      >
        <div className="cursor"></div>
        <Header />
        {children}
      </body>
    </html>
  );
}
