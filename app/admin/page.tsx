import { getAllServices } from '@/lib/data/services';
import { saveRealisation } from './actions';
import styles from './page.module.css';

const MOIS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
               'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

const DUREES = ['15 min', '30 min', '45 min', '1h', '1h30', '2h', '2h30', '3h', '3h+'];

interface Props {
  searchParams: Promise<{ success?: string; error?: string }>;
}

export default async function AdminPage({ searchParams }: Props) {
  const { success, error } = await searchParams;
  const services = getAllServices();

  const now = new Date();
  const currentMois = MOIS[now.getMonth()];
  const currentAnnee = now.getFullYear().toString();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Nouvelle réalisation</h1>
        <p className={styles.sub}>Remplis les champs après l&apos;intervention</p>
      </div>

      {success && (
        <div className={styles.banner + ' ' + styles.bannerSuccess}>
          ✓ Réalisation enregistrée !
        </div>
      )}
      {error && (
        <div className={styles.banner + ' ' + styles.bannerError}>
          Erreur lors de l&apos;enregistrement. Réessaie.
        </div>
      )}

      <form action={saveRealisation} className={styles.form}>

        {/* Service */}
        <div className={styles.field}>
          <label className={styles.label}>Type d&apos;intervention *</label>
          <select name="service_slug" className={styles.select} required>
            {services.map((s) => (
              <option key={s.slug} value={s.slug} data-label={s.label}>
                {s.icon} {s.label}
              </option>
            ))}
          </select>
          {/* Hidden field updated by JS */}
          <input type="hidden" name="type" id="type-hidden" value={services[0]?.label || ''} />
        </div>

        {/* Ville */}
        <div className={styles.field}>
          <label className={styles.label}>Ville *</label>
          <input
            type="text"
            name="ville"
            className={styles.input}
            placeholder="ex: Toulon"
            required
            autoCapitalize="words"
          />
        </div>

        {/* Mois + Année */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Mois *</label>
            <select name="mois" className={styles.select} defaultValue={currentMois} required>
              {MOIS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Année *</label>
            <select name="annee" className={styles.select} defaultValue={currentAnnee} required>
              {['2025', '2026', '2027'].map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Durée */}
        <div className={styles.field}>
          <label className={styles.label}>Durée</label>
          <select name="duree" className={styles.select} defaultValue="1h">
            {DUREES.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Contexte */}
        <div className={styles.field}>
          <label className={styles.label}>Contexte (situation avant)</label>
          <textarea
            name="contexte"
            className={styles.textarea}
            placeholder="ex: Client appelle pour canalisation bouchée depuis 2 jours, eau ne s'écoule plus dans la douche."
            rows={3}
          />
        </div>

        {/* Diagnostic */}
        <div className={styles.field}>
          <label className={styles.label}>Diagnostic (ce qu&apos;on a trouvé)</label>
          <textarea
            name="diagnostic"
            className={styles.textarea}
            placeholder="ex: Accumulation de cheveux et calcaire à 1m du siphon. Tuyau partiellement obstrué."
            rows={3}
          />
        </div>

        {/* Intervention */}
        <div className={styles.field}>
          <label className={styles.label}>Intervention (ce qu&apos;on a fait) *</label>
          <textarea
            name="intervention"
            className={styles.textarea}
            placeholder="ex: Hydrocurage haute pression 150 bars sur 8m. Passage furet mécanique ensuite."
            rows={3}
            required
          />
        </div>

        {/* Résultat */}
        <div className={styles.field}>
          <label className={styles.label}>Résultat *</label>
          <textarea
            name="resultat"
            className={styles.textarea}
            placeholder="ex: Écoulement rétabli à 100%. Canalisation propre et vérifiée. Aucun retour prévu."
            rows={2}
            required
          />
        </div>

        {/* Témoignage */}
        <div className={styles.field}>
          <label className={styles.label}>Témoignage client (optionnel)</label>
          <textarea
            name="temoignage"
            className={styles.textarea}
            placeholder="ex: « Intervention rapide et efficace, merci ! »"
            rows={2}
          />
        </div>

        <button type="submit" className={styles.btn}>
          Enregistrer la réalisation
        </button>
      </form>

      {/* Script pour synchroniser le label du service */}
      <script dangerouslySetInnerHTML={{ __html: `
        const sel = document.querySelector('[name="service_slug"]');
        const hidden = document.getElementById('type-hidden');
        function sync() { hidden.value = sel.options[sel.selectedIndex].text.replace(/^[^a-zA-Z]+/, '').trim(); }
        sel.addEventListener('change', sync);
        sync();
      `}} />
    </div>
  );
}
