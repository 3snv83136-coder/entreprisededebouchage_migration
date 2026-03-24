import Link from 'next/link';
import { getAllServices } from '@/lib/data/services';
import { getAllVilles } from '@/lib/data/villes';
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
  const villes = getAllVilles().sort((a, b) => a.ville.localeCompare(b.ville, 'fr'));

  const now = new Date();
  const currentMois = MOIS[now.getMonth()];
  const currentAnnee = now.getFullYear().toString();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Nouvelle réalisation</h1>
        <p className={styles.sub}>Remplis les champs après l&apos;intervention</p>
      </div>

      <div className={styles.navLinks}>
        <Link href="/admin/realisations" className={styles.navLink}>
          Voir toutes les réalisations →
        </Link>
      </div>

      {success && (
        <div className={styles.banner + ' ' + styles.bannerSuccess}>
          ✓ Réalisation enregistrée et enrichie par IA !
        </div>
      )}
      {error && (
        <div className={styles.banner + ' ' + styles.bannerError}>
          Erreur lors de l&apos;enregistrement. Réessaie.
        </div>
      )}

      <form action={saveRealisation} className={styles.form} encType="multipart/form-data">

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
          <input type="hidden" name="type" id="type-hidden" value={services[0]?.label || ''} />
        </div>

        {/* Ville avec code postal */}
        <div className={styles.field}>
          <label className={styles.label}>Ville * <span className={styles.labelNote}>(code postal auto)</span></label>
          <select
            name="ville_data"
            id="ville-select"
            className={styles.select}
            required
          >
            <option value="">— Choisir une ville —</option>
            {villes.map((v) => (
              <option
                key={v.slug}
                value={`${v.ville}|${v.code_postal}`}
              >
                {v.ville} ({v.code_postal})
              </option>
            ))}
          </select>
          <div className={styles.codePostalDisplay} id="cp-display">
            Code postal : <strong id="cp-value">—</strong>
          </div>
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

        {/* Matériels */}
        <div className={styles.field}>
          <label className={styles.label}>Matériels utilisés</label>
          <input
            type="text"
            name="materiels"
            className={styles.input}
            placeholder="ex: Hydrocureur 200 bars, caméra inspection"
          />
        </div>

        {/* Contexte */}
        <div className={styles.field}>
          <label className={styles.label}>Situation (quelques mots suffisent)</label>
          <textarea
            name="contexte"
            className={styles.textarea}
            placeholder="ex: Canalisation bouchée depuis 2 jours, eau ne s'écoule plus."
            rows={2}
          />
          <span className={styles.fieldNote}>L&apos;IA développe automatiquement</span>
        </div>

        {/* Diagnostic */}
        <div className={styles.field}>
          <label className={styles.label}>Diagnostic (ce qu&apos;on a trouvé)</label>
          <textarea
            name="diagnostic"
            className={styles.textarea}
            placeholder="ex: Accumulation de cheveux et calcaire à 1m du siphon."
            rows={2}
          />
          <span className={styles.fieldNote}>L&apos;IA développe automatiquement</span>
        </div>

        {/* Intervention */}
        <div className={styles.field}>
          <label className={styles.label}>Ce qu&apos;on a fait *</label>
          <textarea
            name="intervention"
            className={styles.textarea}
            placeholder="ex: Hydrocurage haute pression 150 bars sur 8m."
            rows={2}
            required
          />
          <span className={styles.fieldNote}>L&apos;IA développe automatiquement</span>
        </div>

        {/* Résultat */}
        <div className={styles.field}>
          <label className={styles.label}>Résultat *</label>
          <textarea
            name="resultat"
            className={styles.textarea}
            placeholder="ex: Écoulement rétabli à 100%. Aucun retour prévu."
            rows={2}
            required
          />
          <span className={styles.fieldNote}>L&apos;IA développe automatiquement</span>
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

        {/* Photos */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Photo avant</label>
            <label className={styles.fileLabel} htmlFor="photoAvant">
              📷 Prendre / choisir
              <input
                id="photoAvant"
                className={styles.fileInput}
                type="file"
                name="photoAvant"
                accept="image/*"
                capture="environment"
              />
            </label>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Photo après</label>
            <label className={styles.fileLabel} htmlFor="photoApres">
              📷 Prendre / choisir
              <input
                id="photoApres"
                className={styles.fileInput}
                type="file"
                name="photoApres"
                accept="image/*"
                capture="environment"
              />
            </label>
          </div>
        </div>

        <button type="submit" className={styles.btn}>
          Enregistrer + enrichir avec IA
        </button>
      </form>

      <script dangerouslySetInnerHTML={{ __html: `
        // Sync service label → hidden type field
        var sel = document.querySelector('[name="service_slug"]');
        var hidden = document.getElementById('type-hidden');
        function syncType() {
          hidden.value = sel.options[sel.selectedIndex].text.replace(/^[^a-zA-Z\\u00C0-\\u017E]+/, '').trim();
        }
        sel.addEventListener('change', syncType);
        syncType();

        // Sync ville → code postal display
        var villeSelect = document.getElementById('ville-select');
        var cpValue = document.getElementById('cp-value');
        function syncVille() {
          var val = villeSelect.value;
          var parts = val.split('|');
          cpValue.textContent = parts.length > 1 ? parts[1] : '—';
        }
        villeSelect.addEventListener('change', syncVille);

        // Show filename on file input change
        document.querySelectorAll('input[type="file"]').forEach(function(input) {
          input.addEventListener('change', function() {
            var lbl = input.closest('label');
            if (lbl && input.files[0]) {
              lbl.childNodes[0].textContent = '✓ ' + input.files[0].name;
            }
          });
        });
      `}} />
    </div>
  );
}
