import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/datacosmos",
  assetPrefix: "/datacosmos",
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  images: {
    remotePatterns: [
      new URL(
        "https://trialpocstorage.blob.core.windows.net/data-coe-portal/**"
      ),
    ],
  },
};

export default nextConfig;
