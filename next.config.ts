import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["upload.wikimedia.org", "lh3.googleusercontent.com", "avatars.githubusercontent.com"],
  },
  devIndicators: false  
 
};

export default nextConfig;
