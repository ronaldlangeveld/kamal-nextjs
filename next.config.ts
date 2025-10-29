import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  serverExternalPackages: ['sequelize', 'sqlite3'],
};

export default nextConfig;
