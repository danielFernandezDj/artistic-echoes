import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.metmuseum.org",
        pathname: "/CRDImages/**",
      },
    ],
  },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
};

export default nextConfig;
