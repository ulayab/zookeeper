import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // default route: /out
  images: {
    unoptimized: true,
  },
  basePath: "/zookeeper",
  assetPrefix: '/zookeeper',
};

export default nextConfig;
