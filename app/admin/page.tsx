export const maxDuration = 60;

import Link from 'next/link';
import { getAllServices } from '@/lib/data/services';
import { getAllVilles } from '@/lib/data/villes';
import { saveRealisation } from './actions';
import styles from './page.module.css';

const MOIS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
               'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

const DUREES = ['15 min', '30 min', '45 min', '1h', '1h30', '2h', '2h30', '3h', '3h+'];

const INTERVENANTS = ['Olivier', 'Michel', 'Stephane'];

interface Props {
  searchParams: Promise<{ success?: string; error?: string; id?: string; msg?: string }>;
}

export default async function AdminPage({ searchParams }: Props) {
  const { success, error, id, msg } = await searchParams;
  const services = getAllServices();
  const villes = getAllVilles().sort((a, b) => a.ville.localeCompare(b.ville, 'fr'));

  const now = new Date();
  const currentMois = MOIS[now.getMonth()];
  const currentAnnee = now.getFullYear().toString();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Nouvelle realisation</h1>
        <p className={styles.sub}>Remplis les champs et raconte l&apos;intervention — l&apos;IA fait le reste</p>
      </div>

      <div className={styles.navLinks}>
        <Link href="/admin/realisations" className={styles.navLink}>
          Voir toutes les realisations &rarr;
        </Link>
      </div>

      {success && (
        <div className={styles.banner + ' ' + styles.bannerSuccess} id="success-banner">
          Realisation enregistree ! Enrichissement IA en cours...
          <div className={styles.progressBar} style={{ marginTop: '10px' }}>
            <div className={styles.progressFill} id="enrich-progress" style={{ width: '20%' }} />
          </div>
          {id && (
            <div style={{ marginTop: '8px', display: 'none' }} id="pdf-link-container">
              <a
                href={`/api/rapport/${id}`}
                target="_blank"
                className={styles.pdfLink}
              >
                Telecharger le rapport PDF
              </a>
            </div>
          )}
        </div>
      )}
      {success && id && (
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var progress = document.getElementById('enrich-progress');
            var banner = document.getElementById('success-banner');
            var pdfLink = document.getElementById('pdf-link-container');
            progress.style.width = '40%';
            fetch('/api/enrichir/${id}', { method: 'POST' })
              .then(function(r) { return r.json(); })
              .then(function(data) {
                progress.style.width = '100%';
                if (data.status === 'enriched' || data.status === 'already_enriched') {
                  banner.textContent = '';
                  banner.innerHTML = 'Realisation enrichie par IA ! <br/><small>Texte d\\'expertise genere avec succes.</small>';
                  if (pdfLink) {
                    pdfLink.style.display = 'block';
                    banner.appendChild(pdfLink);
                  }
                } else {
                  banner.innerHTML = 'Realisation enregistree. <br/><small>Enrichissement IA : ' + (data.error || 'non disponible') + '</small>';
                  if (pdfLink) { pdfLink.style.display = 'block'; banner.appendChild(pdfLink); }
                }
              })
              .catch(function(err) {
                progress.style.width = '100%';
                banner.innerHTML = 'Realisation enregistree. <br/><small>Enrichissement : ' + err.message + '</small>';
                if (pdfLink) { pdfLink.style.display = 'block'; banner.appendChild(pdfLink); }
              });
          })();
        `}} />
      )}
      {error && (
        <div className={styles.banner + ' ' + styles.bannerError}>
          Erreur lors de l&apos;enregistrement. {msg && <><br /><small>{msg}</small></>}
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
            <label className={styles.label}>Annee *</label>
            <select name="annee" className={styles.select} defaultValue={currentAnnee} required>
              {['2025', '2026', '2027'].map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Durée + Intervenant */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Duree</label>
            <select name="duree" className={styles.select} defaultValue="1h">
              {DUREES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Intervenant *</label>
            <select name="intervenant" className={styles.select} required>
              {INTERVENANTS.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ════ CHAMP UNIQUE — Récit de l'intervention ════ */}
        <div className={styles.field}>
          <label className={styles.label}>Raconte l&apos;intervention *</label>
          <textarea
            name="recit"
            className={styles.textareaLarge}
            placeholder={"Ex: On est arrives chez le client, canalisation bouchee depuis 3 jours. L'eau remontait dans la douche. On a passe la camera, on a trouve un bouchon de graisse a 4m. Hydrocurage 150 bars, tout est reparti. Le client etait content, plus d'odeur."}
            rows={8}
            required
          />
          <span className={styles.fieldNote}>
            Parle naturellement, comme si tu racontais a un collegue. L&apos;IA enrichit le texte, genere la page SEO avec maillage interne, et cree le rapport PDF.
          </span>
        </div>

        {/* Photos */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Photo avant</label>
            <label className={styles.fileLabel} htmlFor="photoAvant">
              Prendre / choisir
              <input
                id="photoAvant"
                className={styles.fileInput}
                type="file"
                name="photoAvant"
                accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                capture="environment"
              />
            </label>
            <span className={styles.fieldNote}>JPG, PNG, WebP, HEIC</span>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Photo apres</label>
            <label className={styles.fileLabel} htmlFor="photoApres">
              Prendre / choisir
              <input
                id="photoApres"
                className={styles.fileInput}
                type="file"
                name="photoApres"
                accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                capture="environment"
              />
            </label>
            <span className={styles.fieldNote}>JPG, PNG, WebP, HEIC</span>
          </div>
        </div>

        <button type="submit" className={styles.btn} id="submit-btn">
          Enregistrer + enrichir avec IA
        </button>
        <div id="progress-container" className={styles.progressContainer} style={{ display: 'none' }}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} id="progress-fill" />
          </div>
          <p className={styles.progressText} id="progress-text">Enregistrement en cours...</p>
        </div>
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

        // Progress bar on submit
        var form = document.querySelector('form');
        var btn = document.getElementById('submit-btn');
        var progressContainer = document.getElementById('progress-container');
        var progressFill = document.getElementById('progress-fill');
        var progressText = document.getElementById('progress-text');
        var steps = [
          { pct: 10, text: 'Enregistrement dans la base...' },
          { pct: 25, text: 'Upload des photos...' },
          { pct: 40, text: 'Conversion WebP...' },
          { pct: 55, text: 'Enrichissement IA en cours...' },
          { pct: 70, text: 'Generation du texte d\\'expertise...' },
          { pct: 82, text: 'Maillage interne et SEO...' },
          { pct: 90, text: 'Finalisation...' },
          { pct: 95, text: 'Presque termine...' },
        ];
        form.addEventListener('submit', function() {
          btn.disabled = true;
          btn.textContent = 'Generation en cours...';
          btn.style.opacity = '0.6';
          progressContainer.style.display = 'block';
          var i = 0;
          function tick() {
            if (i < steps.length) {
              progressFill.style.width = steps[i].pct + '%';
              progressText.textContent = steps[i].text;
              i++;
              setTimeout(tick, 3000 + Math.random() * 4000);
            }
          }
          tick();
        });
      `}} />
    </div>
  );
}
