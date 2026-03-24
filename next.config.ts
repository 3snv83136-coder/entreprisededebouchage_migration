import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async rewrites() {
    return [
      { source: '/sitemap.xml', destination: '/sitemap-index' },
    ];
  },
  async redirects() {
    return [
      // Variantes courantes vers /nos-prestations/
      { source: '/prestations', destination: '/nos-prestations/', permanent: true },
      { source: '/prestations/', destination: '/nos-prestations/', permanent: true },
      { source: '/services', destination: '/nos-prestations/', permanent: true },
      { source: '/services/', destination: '/nos-prestations/', permanent: true },
      // Variantes courantes vers /nos-tarifs/
      { source: '/tarifs', destination: '/nos-tarifs/', permanent: true },
      { source: '/tarifs/', destination: '/nos-tarifs/', permanent: true },
      { source: '/prix', destination: '/nos-tarifs/', permanent: true },
      { source: '/prix/', destination: '/nos-tarifs/', permanent: true },
      // /var/debouchage-* → /debouchage-*
      { source: '/var/:slug', destination: '/:slug', permanent: true },
      { source: '/var/:slug/', destination: '/:slug/', permanent: true },
      // /zone-dintervention/ et /zones-dintervention/ → /zones-dintervention/
      { source: '/zone-dintervention', destination: '/zones-dintervention/', permanent: true },
      { source: '/zone-dintervention/', destination: '/zones-dintervention/', permanent: true },
      // /zones-dintervention/:slug → /:slug
      { source: '/zones-dintervention/:slug', destination: '/:slug', permanent: true },
      { source: '/zones-dintervention/:slug/', destination: '/:slug/', permanent: true },
      // /zone-dintervention/:slug → /:slug
      { source: '/zone-dintervention/:slug', destination: '/:slug', permanent: true },
      { source: '/zone-dintervention/:slug/', destination: '/:slug/', permanent: true },
    ];
  },
};

export default nextConfig;
