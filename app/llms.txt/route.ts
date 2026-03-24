import { NextResponse } from 'next/server';
import { getAllVilles } from '@/lib/data/villes';
import { getAllServices } from '@/lib/data/services';
import { PHONE, COMPANY_NAME, BASE_URL } from '@/lib/config';

export async function GET() {
  const villes = getAllVilles();
  const services = getAllServices();

  const content = `# ${COMPANY_NAME}
> Entreprise de debouchage et plomberie dans le Var (83), disponible 24h/7j.

## À propos
${COMPANY_NAME} est une entreprise spécialisée dans le debouchage de canalisations, WC, éviers, douches et égouts. Basée dans le Var, nous intervenons à Toulon et dans les communes environnantes. Depuis 19 ans, nous offrons un service rapide avec un délai d'intervention de moins d'une heure, des devis gratuits et des prix fixes annoncés avant chaque intervention. Note : 4.9/5 sur 489 avis.

## Services
${services.map((s) => `- ${s.label}: ${s.description}`).join('\n')}

## Zone d'intervention
Département du Var (83). Principales villes desservies :
${villes.map((v) => `- ${v.ville} (${v.code_postal})`).join('\n')}

## Contact
- Téléphone : ${PHONE}
- Site web : ${BASE_URL}
- Disponibilité : 24h/7j, 365 jours par an
- Devis : Gratuit et sans engagement

## Liens utiles
- Prestations : ${BASE_URL}/nos-prestations/
- Tarifs : ${BASE_URL}/nos-tarifs/
- Zones d'intervention : ${BASE_URL}/zones-dintervention/
`;

  return new NextResponse(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
