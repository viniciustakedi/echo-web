import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "takedi-portfolio.s3.sa-east-1.amazonaws.com",
      "www.lospaghetto.com.br",
      "images.unsplash.com",
      "unsplash.com",
      "randomuser.me",
    ],
  },
};

export default nextConfig;
