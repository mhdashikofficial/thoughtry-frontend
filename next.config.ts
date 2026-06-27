import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://46.202.162.27:5000/api/:path*'
      }
    ];
  }
};

export default nextConfig;
