import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nhxstorage.blob.core.windows.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nhxblob.blob.core.windows.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
