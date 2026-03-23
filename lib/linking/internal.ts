import { InternalLink } from '@/lib/types';
import { getNearbyVilles } from '@/lib/data/villes';
import { getAllServices } from '@/lib/data/services';

export function getRelatedCities(slug: string, max = 3): InternalLink[] {
  return getNearbyVilles(slug, max).map((v) => ({
    href: `/debouchage-${v.slug}/`,
    label: v.ville,
    type: 'city' as const,
  }));
}

export function getRelatedServices(max = 3): InternalLink[] {
  return getAllServices()
    .slice(0, max)
    .map((s) => ({
      href: `/${s.slug}/`,
      label: s.label,
      type: 'service' as const,
    }));
}

export function getBreadcrumbItems(
  type: 'city' | 'service' | 'technique' | 'service-city',
  label: string,
  slug: string,
  extra?: { villeLabel?: string; villeSlug?: string; serviceLabel?: string; serviceSlug?: string }
) {
  const base = [{ name: 'Accueil', href: '/' }];

  if (type === 'city') {
    return [
      ...base,
      { name: 'Zones d\'intervention', href: '/zones-dintervention/' },
      { name: label, href: `/debouchage-${slug}/` },
    ];
  }

  if (type === 'service') {
    return [
      ...base,
      { name: 'Nos prestations', href: '/nos-prestations/' },
      { name: label, href: `/${slug}/` },
    ];
  }

  if (type === 'service-city' && extra) {
    return [
      ...base,
      { name: extra.serviceLabel || label, href: `/${extra.serviceSlug}/` },
      { name: `${extra.serviceLabel} ${extra.villeLabel}`, href: `/${slug}/` },
    ];
  }

  return [
    ...base,
    { name: 'Var', href: '/var/' },
    { name: label, href: `/${slug}/` },
  ];
}
