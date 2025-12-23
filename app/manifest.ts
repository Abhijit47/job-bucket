import siteMetadata from '@/constants/seo';
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteMetadata.title! as string,
    short_name: siteMetadata.title! as string,
    description: siteMetadata.description!,
    categories: ['Productivity', 'Utilities', 'Business'],
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
