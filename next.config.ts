import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  reactCompiler: { compilationMode: 'annotation' },
};

export default nextConfig;
