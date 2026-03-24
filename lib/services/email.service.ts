import { Resend } from 'resend';
import { BASE_URL } from '@/lib/config';

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || 'placeholder');
}

interface EmailParams {
  titre: string;
  ville: string;
  type: string;
  slug: string;
  mois: string;
  annee: string;
  duree?: string;
  resultat: string;
}

export async function envoyerEmailInterne(params: EmailParams): Promise<void> {
  const emailInterne = process.env.EMAIL_INTERNE;
  if (!process.env.RESEND_API_KEY || !emailInterne) return;

  const { titre, ville, type, slug, mois, annee, duree, resultat } = params;
  const url = `${BASE_URL}/realisations/${slug}/`;

  await getResend().emails.send({
    from: 'Réalisations <noreply@entreprisededebouchage.com>',
    to: emailInterne,
    subject: `Nouvelle réalisation : ${type} à ${ville}`,
    html: `
      <h2>${titre}</h2>
      <p><strong>Type :</strong> ${type}</p>
      <p><strong>Ville :</strong> ${ville}</p>
      <p><strong>Date :</strong> ${mois} ${annee}</p>
      ${duree ? `<p><strong>Durée :</strong> ${duree}</p>` : ''}
      <p><strong>Résultat :</strong> ${resultat}</p>
      <p><a href="${url}">Voir la réalisation en ligne →</a></p>
    `,
  });
}
