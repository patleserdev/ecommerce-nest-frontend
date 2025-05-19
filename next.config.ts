import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/600x400/**",
      },
    ],
  },
};

export default nextConfig;
