import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qqykfjukamekgbltpyrd.supabase.co',
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
      // Pages importantes
      { source: '/zones-dintervention', destination: '/', permanent: true },
      { source: '/contact', destination: '/', permanent: true },
      // Ancien pattern /debouchage-canalisation-xxx → /debouchage-xxx/
      { source: '/debouchage-canalisation-bargeme', destination: '/debouchage-bargeme/', permanent: true },
      { source: '/debouchage-canalisation-la-motte', destination: '/debouchage-la-motte/', permanent: true },
      { source: '/debouchage-canalisation-ollioules', destination: '/debouchage-ollioules/', permanent: true },
      { source: '/debouchage-canalisation-flayosc', destination: '/debouchage-flayosc/', permanent: true },
      { source: '/debouchage-canalisation-pourcieux', destination: '/debouchage-pourcieux/', permanent: true },
      { source: '/debouchage-canalisation-gassin', destination: '/debouchage-gassin/', permanent: true },
      { source: '/debouchage-canalisation-lorgues', destination: '/debouchage-lorgues/', permanent: true },
      { source: '/debouchage-canalisation-roquebrune-sur-argens', destination: '/debouchage-roquebrune-sur-argens/', permanent: true },
      { source: '/debouchage-canalisation-tanneron', destination: '/debouchage-tanneron/', permanent: true },
      { source: '/debouchage-canalisation-la-bastide', destination: '/debouchage-la-bastide/', permanent: true },
      { source: '/debouchage-canalisation-rougiers', destination: '/debouchage-rougiers/', permanent: true },
      { source: '/debouchage-canalisation-carces', destination: '/debouchage-carces/', permanent: true },
      { source: '/debouchage-canalisation-chateaudouble', destination: '/debouchage-chateaudouble/', permanent: true },
      { source: '/debouchage-canalisation-le-luc', destination: '/debouchage-le-luc/', permanent: true },
      { source: '/debouchage-canalisation-cogolin', destination: '/debouchage-cogolin/', permanent: true },
      { source: '/debouchage-canalisation-fayence', destination: '/debouchage-fayence/', permanent: true },
      { source: '/debouchage-canalisation-saint-julien', destination: '/debouchage-saint-julien/', permanent: true },
      { source: '/debouchage-canalisation-callas', destination: '/debouchage-callas/', permanent: true },
      { source: '/debouchage-canalisation-callian', destination: '/debouchage-callian/', permanent: true },
      { source: '/debouchage-canalisation-carqueiranne', destination: '/debouchage-carqueiranne/', permanent: true },
      { source: '/debouchage-canalisation-vinon-sur-verdon', destination: '/debouchage-vinon-sur-verdon/', permanent: true },
      { source: '/debouchage-canalisation-hyeres', destination: '/debouchage-hyeres/', permanent: true },
      { source: '/debouchage-canalisation-pierrefeu-du-var', destination: '/debouchage-pierrefeu-du-var/', permanent: true },
      { source: '/debouchage-canalisation-la-garde', destination: '/debouchage-la-garde/', permanent: true },
      { source: '/debouchage-canalisation-belgentier', destination: '/debouchage-belgentier/', permanent: true },
      { source: '/debouchage-canalisation-entrecasteaux', destination: '/debouchage-entrecasteaux/', permanent: true },
      // Anciennes URLs WordPress cassées
      { source: '/debouchage-de-canalisation-var', destination: '/debouchage-canalisation/', permanent: true },
      { source: '/debouchage-de-canalisation-var/', destination: '/debouchage-canalisation/', permanent: true },
      { source: '/inspection-video-camera-canalisation-dans-le-var', destination: '/nos-prestations/', permanent: true },
      { source: '/inspection-video-camera-canalisation-dans-le-var/', destination: '/nos-prestations/', permanent: true },
      { source: '/top-5-des-bouchons-dans-le-monde', destination: '/blog/', permanent: true },
      { source: '/top-5-des-bouchons-dans-le-monde/', destination: '/blog/', permanent: true },
    ];
  },
};

export default nextConfig;
