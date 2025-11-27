import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    globalNotFound: true,
    typedEnv: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },
  typedRoutes: true,
  reactCompiler: { compilationMode: 'annotation' },
};

export default nextConfig;
