import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/datacosmos',
  assetPrefix: '/datacosmos',
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
};

export default nextConfig;
