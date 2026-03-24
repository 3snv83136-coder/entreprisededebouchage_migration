import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
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
    ];
  },
};

export default nextConfig;
