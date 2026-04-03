import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import VilleSearch from '@/components/common/VilleSearch';
import { COMPANY_NAME, BASE_URL } from '@/lib/config';
import { getAllVilles, getTier1Villes, getVilleBySlug } from '@/lib/data/villes';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Zones d\'intervention dans les Bouches-du-Rhône',
  description: `${COMPANY_NAME} intervient dans les 119 communes des Bouches-du-Rhône, dont Marseille, Aubagne, Aix-en-Provence. Trouvez votre ville et appelez le 24h/7j.`,
  alternates: {
    canonical: '/zones-dintervention/',
  },
  openGraph: {
    title: `Zones d'intervention — ${COMPANY_NAME}`,
    url: `${BASE_URL}/zones-dintervention/`,
  },
};

export default function ZonesDinterventionPage() {
  const villes = getAllVilles();
  const tier1 = getTier1Villes().sort((a, b) => b.population - a.population);
  const marseille = getVilleBySlug('marseille');

  const villesData = villes.map((v) => ({
    ville: v.ville,
    slug: v.slug,
    code_postal: v.code_postal,
    population: v.population,
  }));

  return (
    <article className={styles.page}>
      <div className={`container ${styles.inner}`}>
        <Breadcrumbs
          items={[
            { name: 'Accueil', href: '/' },
            { name: 'Zones d\'intervention', href: '/zones-dintervention/' },
          ]}
        />

        <h1 className={styles.title}>Zones d&apos;intervention dans les Bouches-du-Rhône (13)</h1>
        <p className={styles.lead}>
          Nous déployons des équipes sur <strong style={{ color: 'var(--white)' }}>l&apos;ensemble du département</strong> :
          de Marseille à Arles, du littoral aux communes de l&apos;arrière-pays. Saisissez votre commune ci-dessous pour
          accéder à la page dédiée (tarifs locaux, délais, FAQ).
        </p>

        {marseille && (
          <section className={styles.highlight} aria-labelledby="marseille-title">
            <h2 id="marseille-title">Debouchage à Marseille</h2>
            <p>
              Marseille ({marseille.code_postal}) — plus de 873&nbsp;000 habitants — fait partie de nos zones
              prioritaires. Fil d&apos;ariane : Accueil → Zones d&apos;intervention → page ville.
            </p>
            <Link href="/debouchage-marseille/">
              Voir la page debouchage Marseille →
            </Link>
          </section>
        )}

        <div className={styles.searchBlock}>
          <p className={styles.searchLabel}>Trouver votre commune</p>
          <VilleSearch villes={villesData} />
        </div>

        <h2 className={styles.sectionTitle}>Principales villes desservies</h2>
        <div className={styles.grid}>
          {tier1.map((v) => (
            <Link key={v.slug} href={`/debouchage-${v.slug}/`}>
              {v.ville}
            </Link>
          ))}
        </div>

        <p className={styles.note}>
          Toutes les communes des Bouches-du-Rhône sont couvertes. Si la vôtre n&apos;apparaît pas dans la liste rapide, utilisez la
          recherche ou consultez le{' '}
          <Link href="/sitemap.xml">plan du site</Link>.
        </p>
      </div>
    </article>
  );
}
