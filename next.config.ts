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
  experimental: {
    serverActions: {
      bodySizeLimit: '6mb',  // ← Set this slightly above your Multer limit (5 MB) + some buffer for form fields
      // or '10mb' if you want more headroom
    },
  },
}

export default config
