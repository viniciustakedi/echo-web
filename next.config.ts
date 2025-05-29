import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "echo-app-images.s3.sa-east-1.amazonaws.com",
      "www.lospaghetto.com.br",
      "images.unsplash.com",
      "unsplash.com",
      "randomuser.me",
      "www.estadao.com.br"
    ],
  },
};

export default nextConfig;
