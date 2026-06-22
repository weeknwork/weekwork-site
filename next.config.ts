import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "pub-d3948e3c6864410f867311bb74539f4d.r2.dev" },
    ],
  },
};

export default nextConfig;