import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "takedi-portfolio.s3.sa-east-1.amazonaws.com",
      "www.lospaghetto.com.br",
    ],
  },
};

export default nextConfig;
