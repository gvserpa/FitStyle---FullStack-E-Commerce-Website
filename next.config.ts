import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["files.stripe.com"], // <-- Adicione aqui
  },
};

export default nextConfig;
