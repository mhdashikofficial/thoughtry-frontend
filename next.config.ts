import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://infoqio.sbs:5000/api/:path*'
      }
    ];
  }
};

export default nextConfig;
