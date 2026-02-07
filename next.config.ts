import type { NextConfig } from "next";

const backendURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
const IsDEV = backendURL.startsWith("http://localhost");

const config: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: IsDEV,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/uploads/**',
      },
    ]
  },
}

export default config
