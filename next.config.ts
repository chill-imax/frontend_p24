import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "abspapel.com.ve",
      },
      {
        protocol: "https",
        hostname: "www.lamina.com.co",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "www.20milproductos.com",
      },
    ],
  },

  reactCompiler: true,
};

export default nextConfig;
