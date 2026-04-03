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
  searchParams: Promise<{ success?: string; error?: string; id?: string; msg?: string; photo_error?: string }>;
}

export default async function AdminPage({ searchParams }: Props) {
  const { success, error, id, msg, photo_error } = await searchParams;
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
          <div id="enrich-actions" style={{ display: 'none', marginTop: '10px' }}></div>
        </div>
      )}
      {success && id && (
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var progress = document.getElementById('enrich-progress');
            var banner = document.getElementById('success-banner');
            var actions = document.getElementById('enrich-actions');
            var realId = '${id}';

            function doEnrich() {
              progress.style.width = '40%';
              banner.className = banner.className.replace('bannerError', '').replace('bannerWarning', '');
              if (!banner.className.includes('bannerSuccess')) banner.className += ' ${styles.bannerSuccess}';
              banner.childNodes[0].textContent = 'Enrichissement IA en cours...';
              actions.style.display = 'none';

              fetch('/api/enrichir/' + realId, { method: 'POST' })
                .then(function(r) { return r.json(); })
                .then(function(data) {
                  progress.style.width = '100%';
                  if (data.status === 'enriched') {
                    banner.childNodes[0].textContent = '';
                    banner.innerHTML = '<div>Realisation enrichie par IA !</div><small>' + data.word_count + ' mots generes.</small><div class="${styles.progressBar}" style="margin-top:10px"><div class="${styles.progressFill}" style="width:100%"></div></div><div id="enrich-actions" style="margin-top:10px"><a href="/admin/realisations" style="color:#4ade80;text-decoration:underline;font-size:13px">Voir les realisations</a></div>';
                  } else if (data.status === 'already_enriched') {
                    banner.childNodes[0].textContent = '';
                    banner.innerHTML = '<div>Deja enrichie (' + data.word_count + ' mots).</div><div class="${styles.progressBar}" style="margin-top:10px"><div class="${styles.progressFill}" style="width:100%"></div></div><div style="margin-top:10px"><a href="/admin/realisations" style="color:#4ade80;text-decoration:underline;font-size:13px">Voir les realisations</a></div>';
                  } else {
                    showError(data.error || 'Erreur inconnue');
                  }
                })
                .catch(function(err) {
                  progress.style.width = '100%';
                  showError(err.message || 'Erreur reseau');
                });
            }

            function showError(msg) {
              banner.className = banner.className.replace('${styles.bannerSuccess}', '${styles.bannerError}');
              banner.innerHTML = '<div>Enrichissement echoue</div><small>' + msg + '</small><div class="${styles.progressBar}" style="margin-top:10px"><div class="${styles.progressFill}" style="width:100%;background:linear-gradient(90deg,#ef4444,#f87171)"></div></div><div id="enrich-actions" style="margin-top:12px"><button onclick="window.__retryEnrich()" style="background:#f4811f;color:#fff;border:none;padding:10px 20px;border-radius:8px;font-weight:700;cursor:pointer;font-size:14px">Reessayer l\\\'enrichissement</button></div>';
            }

            window.__retryEnrich = doEnrich;
            doEnrich();
          })();
        `}} />
      )}
      {success && photo_error && (
        <div className={styles.banner + ' ' + styles.bannerWarning}>
          Photo {photo_error === 'avant,apres' ? 'avant et apres echouees' : photo_error === 'avant' ? 'avant echouee' : 'apres echouee'} — la realisation est enregistree, tu peux re-uploader les photos depuis la liste admin.
        </div>
      )}
      {error && (
        <div className={styles.banner + ' ' + styles.bannerError}>
          Erreur lors de l&apos;enregistrement. {msg && <><br /><small>{msg}</small></>}
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

        {/* Adresse de l'intervention */}
        <div className={styles.field}>
          <label className={styles.label}>Adresse de l&apos;intervention</label>
          <input
            type="text"
            name="adresse"
            className={styles.input}
            placeholder="Ex: 12 rue de la Republique, 13100 Aix-en-Provence"
          />
          <span className={styles.fieldNote}>
            Optionnel — affiche une carte sur la page de la realisation
          </span>
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

        {/* Photos avec preview + rotation */}
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
              />
            </label>
            <input type="hidden" name="rotationAvant" id="rotationAvant" value="0" />
            <div id="preview-avant" className={styles.photoPreview} style={{ display: 'none' }}>
              <img id="preview-avant-img" className={styles.photoPreviewImg} alt="Preview avant" />
              <div className={styles.photoControls}>
                <button type="button" className={styles.rotateBtn} data-target="avant" data-dir="-90">&#8634;</button>
                <button type="button" className={styles.rotateBtn} data-target="avant" data-dir="90">&#8635;</button>
              </div>
            </div>
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
              />
            </label>
            <input type="hidden" name="rotationApres" id="rotationApres" value="0" />
            <div id="preview-apres" className={styles.photoPreview} style={{ display: 'none' }}>
              <img id="preview-apres-img" className={styles.photoPreviewImg} alt="Preview apres" />
              <div className={styles.photoControls}>
                <button type="button" className={styles.rotateBtn} data-target="apres" data-dir="-90">&#8634;</button>
                <button type="button" className={styles.rotateBtn} data-target="apres" data-dir="90">&#8635;</button>
              </div>
            </div>
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

        // Photo preview + rotation
        var rotations = { avant: 0, apres: 0 };

        function setupPhotoPreview(type) {
          var input = document.getElementById('photo' + type.charAt(0).toUpperCase() + type.slice(1));
          var previewDiv = document.getElementById('preview-' + type);
          var previewImg = document.getElementById('preview-' + type + '-img');
          var rotInput = document.getElementById('rotation' + type.charAt(0).toUpperCase() + type.slice(1));

          input.addEventListener('change', function() {
            var lbl = input.closest('label');
            if (input.files && input.files[0]) {
              if (lbl) lbl.childNodes[0].textContent = input.files[0].name;
              var url = URL.createObjectURL(input.files[0]);
              previewImg.src = url;
              previewDiv.style.display = 'block';
              rotations[type] = 0;
              rotInput.value = '0';
              previewImg.style.transform = 'rotate(0deg)';
            } else {
              previewDiv.style.display = 'none';
            }
          });
        }

        setupPhotoPreview('avant');
        setupPhotoPreview('apres');

        // Rotation buttons
        document.querySelectorAll('[data-target]').forEach(function(btn) {
          btn.addEventListener('click', function(e) {
            e.preventDefault();
            var type = btn.getAttribute('data-target');
            var dir = parseInt(btn.getAttribute('data-dir'));
            rotations[type] = (rotations[type] + dir + 360) % 360;
            var img = document.getElementById('preview-' + type + '-img');
            img.style.transform = 'rotate(' + rotations[type] + 'deg)';
            var rotInput = document.getElementById('rotation' + type.charAt(0).toUpperCase() + type.slice(1));
            rotInput.value = rotations[type].toString();
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
