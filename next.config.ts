import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    globalNotFound: true,
  },
  typedRoutes: true,
  reactCompiler: { compilationMode: 'annotation' },
};

export default nextConfig;
