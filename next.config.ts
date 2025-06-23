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
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  
};

export default nextConfig;
