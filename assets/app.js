/* ------------------------------------------------------------------
   S1 — Espace de révision · FMDC Casablanca
   Application du portail : routage, recherche, progression de révision.
   Données : data/s1.js  (window.S1)
   ------------------------------------------------------------------ */

(() => {
  'use strict';

  const D = window.S1;
  const LS = { rev: 'fmdc.s1.revised', fav: 'fmdc.s1.favs', theme: 'fmdc.s1.theme' };

  const fileUrl   = id => `https://drive.google.com/file/d/${id}/view`;
  const folderUrl = id => `https://drive.google.com/drive/folders/${id}`;

  /* ------------------------------- état ------------------------------- */
  const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
  const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

  const state = {
    revised: new Set(read(LS.rev, [])),
    favs: new Set(read(LS.fav, [])),
    pending: null            // fichier à mettre en évidence après navigation
  };

  /* --------------------------- index complet --------------------------- */
  const index = [];          // tous les fichiers : { id, nom, type, path[], module }
  const moduleIndex = {};    // id module -> module

  const extOf = nom => (nom.split('.').pop() || '').toLowerCase();
  const typeOf = (nom, force) => {
    if (force) return force;
    const e = extOf(nom);
    if (e === 'pdf') return 'pdf';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(e)) return 'image';
    if (['ppt', 'pptx', 'key'].includes(e)) return 'slides';
    if (['doc', 'docx', 'odt'].includes(e)) return 'doc';
    if (['xls', 'xlsx', 'csv'].includes(e)) return 'sheet';
    if (['txt', 'md'].includes(e)) return 'text';
    return 'file';
  };
  const ICONS = { pdf: '📄', image: '🖼️', slides: '📊', doc: '📝', sheet: '📈', text: '🗒️', file: '📎' };
  const TYPE_LABEL = { pdf: 'PDF', image: 'Image', slides: 'Diapositives', doc: 'Document', sheet: 'Tableur', text: 'Texte', file: 'Fichier' };

  const walk = (node, path, mod) => {
    const here = path.concat(node.nom);
    (node.fichiers || []).forEach(f => {
      index.push({
        id: f.id,
        nom: f.nom.trim(),
        type: typeOf(f.nom, f.type),
        path: here.slice(1),          // sans le nom du module
        module: mod
      });
    });
    (node.enfants || []).forEach(c => walk(c, here, mod));
  };

  D.modules.forEach(m => {
    moduleIndex[m.id] = m;
    walk({ nom: m.nom, enfants: m.enfants }, [], m);
  });
  D.racine.forEach(f => index.push({ id: f.id, nom: f.nom, type: typeOf(f.nom), path: [], module: null }));

  /* ------------------------------ utilitaires ------------------------------ */
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const countFiles = node =>
    (node.fichiers ? node.fichiers.length : 0) +
    (node.enfants ? node.enfants.reduce((n, c) => n + countFiles(c), 0) : 0);

  const countFolders = node => (node.enfants ? node.enfants.reduce((n, c) => n + 1 + countFolders(c), 0) : 0);
  const countEmpty = node =>
    (node.vide ? 1 : 0) + (node.enfants ? node.enfants.reduce((n, c) => n + countEmpty(c), 0) : 0);

  const moduleFiles = m => index.filter(f => f.module === m);
  const progressOf = files => {
    const total = files.length;
    const done = files.filter(f => state.revised.has(f.id)).length;
    return { total, done, pct: total ? Math.round(done / total * 100) : 0 };
  };

  const profsOf = m => {
    const canon = n => n
      .replace(/^(Prof|Pr\.?|Prod)\s*/i, '')
      .replace(/^(Khalil|Khlil)\s+/i, '')
      .replace(/^El\s+/i, '')
      .trim();
    const out = [];
    const scan = n => {
      (n.enfants || []).forEach(c => {
        if (/^(Pr|Prof|Prod)\b/i.test(c.nom)) out.push('Pr. ' + canon(c.nom));
        scan(c);
      });
    };
    scan(m);
    return [...new Set(out)];
  };

  /* ------------------------------ rendu fichiers ------------------------------ */
  const fileRow = (f, pathTxt) => {
    const done = state.revised.has(f.id);
    const fav = state.favs.has(f.id);
    return `
      <li class="file ${done ? 'done' : ''}" data-fid="${esc(f.id)}">
        <span class="f-ic2">${ICONS[f.type] || '📎'}</span>
        <div class="f-main">
          <div class="f-name">${esc(f.nom)}</div>
          <div class="f-path">${esc(TYPE_LABEL[f.type] || 'Fichier')}${pathTxt ? ' · ' + esc(pathTxt) : ''}</div>
        </div>
        <div class="f-actions">
          <button class="mini star ${fav ? 'on' : ''}" data-fav="${esc(f.id)}" title="Ajouter aux favoris" aria-label="Favori">★</button>
          <button class="mini ${done ? 'on' : ''}" data-rev="${esc(f.id)}" title="Marquer comme révisé" aria-label="Révisé">✓</button>
          <a class="mini open" href="${fileUrl(f.id)}" target="_blank" rel="noopener" title="Ouvrir sur Drive">↗</a>
        </div>
      </li>`;
  };

  const fileList = (files, pathTxt) => files && files.length
    ? `<ul class="files">${files.map(f => fileRow({ ...f, nom: f.nom.trim(), type: typeOf(f.nom, f.type) }, pathTxt)).join('')}</ul>`
    : '';

  /* ------------------------------ rendu dossiers ------------------------------ */
  const subCard = node => {
    const n = countFiles(node);
    const groups = (node.enfants || []).map(c => {
      const cf = c.fichiers || [];
      return `
        <div style="margin-top:12px">
          <div class="folder-head" style="border:0;padding:2px 0">
            <span class="f-ico">📂</span>
            <h4 style="font-size:13.5px">${esc(c.nom)}</h4>
            <span class="f-count">${cf.length ? cf.length + ' doc' + (cf.length > 1 ? 's' : '') : 'à venir'}</span>
            <a class="f-open" href="${folderUrl(c.folder)}" target="_blank" rel="noopener">Drive ↗</a>
          </div>
          ${cf.length ? fileList(cf) : ''}
        </div>`;
    }).join('');

    return `
      <div class="sub ${node.vide ? 'solid' : ''}">
        <div class="sub-head">
          <span>${node.vide ? '🕓' : '📁'}</span>
          <h4>${esc(node.nom)}</h4>
          <span>${node.vide ? 'à venir' : n + ' doc' + (n > 1 ? 's' : '')}</span>
        </div>
        ${fileList(node.fichiers)}
        ${groups}
        ${node.vide ? `<div class="chip empty" style="margin-top:10px">Bientôt disponible sur le Drive</div>` : ''}
      </div>`;
  };

  const folderBlock = node => {
    const files = node.fichiers || [];
    const kids = node.enfants || [];
    const bits = [];
    if (node.vide) bits.push('dossier vide pour l’instant');
    else {
      bits.push(files.length ? files.length + ' document' + (files.length > 1 ? 's' : '') : 'aucun document direct');
      if (kids.length) bits.push(kids.length + ' sous-dossier' + (kids.length > 1 ? 's' : ''));
    }
    return `
      <section class="folder">
        <div class="folder-head">
          <span class="f-ico">${node.vide ? '🕓' : '📂'}</span>
          <h3>${esc(node.nom)}</h3>
          <span class="f-count">${bits.join(' · ')}</span>
          <a class="f-open" href="${folderUrl(node.folder)}" target="_blank" rel="noopener">Ouvrir sur Drive ↗</a>
        </div>
        ${fileList(files, '')}
        ${kids.length ? `<div class="sub-folders">${kids.map(subCard).join('')}</div>` : ''}
        ${node.vide ? `<div class="empty-note">🕓 Ce dossier existe déjà sur le Drive mais son contenu n’a pas encore été déposé. Reviens plus tard — le portail se met à jour avec le Drive.</div>` : ''}
      </section>`;
  };

  /* ------------------------------ vues ------------------------------ */
  const view = document.getElementById('view');

  const moduleCard = m => {
    const files = moduleFiles(m);
    const p = progressOf(files);
    const profs = profsOf(m);
    const empt = countEmpty(m);
    return `
      <a class="card" href="#/m/${m.id}" style="--c:${m.couleur}">
        <div class="card-top">
          <div class="card-emoji">${m.emoji}</div>
          <div>
            <h3>${esc(m.nom)}</h3>
            <div class="meta">${files.length} document${files.length > 1 ? 's' : ''} · ${countFolders(m)} dossier${countFolders(m) > 1 ? 's' : ''}${empt ? ` · ${empt} à venir` : ''}</div>
          </div>
        </div>
        <p class="desc">${esc(m.desc || '')}</p>
        ${profs.length ? `<div class="chips">${profs.slice(0, 5).map(p2 => `<span class="chip">${esc(p2)}</span>`).join('')}${profs.length > 5 ? `<span class="chip">+${profs.length - 5}</span>` : ''}</div>` : ''}
        <div class="bar"><i style="width:${p.pct}%"></i></div>
        <div class="card-foot">
          <span class="meta">${p.total ? `${p.done}/${p.total} révisé${p.done > 1 ? 's' : ''}` : 'en attente de contenu'}</span>
          <span class="go">Explorer →</span>
        </div>
      </a>`;
  };

  const totalStats = () => {
    const files = index.filter(f => f.module);
    const done = files.filter(f => state.revised.has(f.id)).length;
    const profs = [...new Set(D.modules.flatMap(profsOf))];
    return {
      modules: D.modules.length,
      docs: files.length,
      profs: profs.length,
      annales: (moduleIndex['exams-2025'] ? moduleFiles(moduleIndex['exams-2025']).length : 0) +
               (moduleIndex['examens-anciens'] ? moduleFiles(moduleIndex['examens-anciens']).length : 0),
      done, total: files.length,
      pct: files.length ? Math.round(done / files.length * 100) : 0
    };
  };

  const renderHome = () => {
    const s = totalStats();
    const upcoming = D.modules.reduce((n, m) => n + countEmpty(m), 0);
    view.innerHTML = `
      <section class="hero">
        <span class="hero-badge"><span class="dot"></span> Semestre 1 · contenu synchronisé avec le Drive de la promo</span>
        <h1>Tout le <span class="grad">S1</span> de la 1ʳᵉ année dentaire,<br>au même endroit.</h1>
        <p class="lead">Cours, résumés, QCM, TP, annales et examens des années précédentes — rangés par module puis par professeur, avec le suivi de ta révision. Chaque lien ouvre directement le document sur Google Drive.</p>
        <div class="cta-row">
          <a class="btn btn-primary" href="#/modules">📚 Explorer les modules</a>
          <a class="btn btn-ghost" href="${D.meta.driveUrl}" target="_blank" rel="noopener">📁 Ouvrir le Drive S1 ↗</a>
          <a class="btn btn-ghost" href="#/annales">📝 Examens & annales</a>
        </div>

        <div class="stats">
          <div class="stat"><b>${s.modules}</b><span>rubriques du semestre</span></div>
          <div class="stat"><b>${s.docs}</b><span>documents référencés</span></div>
          <div class="stat"><b>${s.profs}</b><span>professeurs & intervenants</span></div>
          <div class="stat"><b>${s.annales}</b><span>sujets d’examens</span></div>
        </div>

        <div class="progress-card">
          <div class="pc-txt">Ma révision : <b>${s.done} / ${s.total}</b> documents · <b>${s.pct} %</b></div>
          <div class="bar"><i style="width:${s.pct}%"></i></div>
          <button class="link-btn" id="reset-progress">réinitialiser</button>
        </div>

        ${upcoming ? `<div class="notice" style="margin-top:14px">
          <span>🕓</span>
          <div><b>${upcoming} dossiers sont encore vides sur le Drive.</b> Ils apparaissent en pointillés « à venir » — le portail reflète exactement l’état actuel du Drive, rien n’est inventé.</div>
        </div>` : ''}
      </section>

      <section class="section">
        <div class="section-head">
          <div><h2>Accès rapide</h2><p>Les raccourcis les plus utiles avant les examens.</p></div>
        </div>
        <div class="quick">
          <a href="#/m/exams-2025"><span class="q-ico">📝</span><b>Examens 2025-2026</b><span>Anatomie, biochimie, biologie, chimie, physiologie</span></a>
          <a href="#/m/examens-anciens"><span class="q-ico">🗂️</span><b>Annales S1</b><span>Sujets complets des promotions 2023 & 2024</span></a>
          <a href="#/m/autres-facs"><span class="q-ico">🏛️</span><b>QCM autres facultés</b><span>FMDR, UIASS, UIR et UPM</span></a>
          <a href="#/m/imd"><span class="q-ico">🦷</span><b>Initiation (IMD)</b><span>Cours des Pr. Badre & Bensouda + TP</span></a>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div><h2>Les rubriques du semestre</h2><p>${D.modules.length} rubriques · ${s.docs} documents · clique pour ouvrir l’arborescence complète.</p></div>
          <a class="go" href="#/modules" style="--c:var(--accent)">Tout afficher →</a>
        </div>
        <div class="cards">${D.modules.map(moduleCard).join('')}</div>
      </section>

      <section class="section">
        <div class="section-head"><div><h2>À la racine du Drive</h2><p>Documents utiles hors modules.</p></div></div>
        ${fileList(D.racine, 'Drive S1 · racine')}
      </section>`;
  };

  const renderModules = () => {
    view.innerHTML = `
      <div class="crumbs"><a href="#/">Accueil</a> <span>›</span> <span>Modules</span></div>
      <section class="section" style="margin-top:14px">
        <div class="section-head"><div><h2>Toutes les rubriques du S1</h2><p>${D.modules.length} rubriques — cours, résumés, QCM, TP et annales.</p></div></div>
        <div class="cards">${D.modules.map(moduleCard).join('')}</div>
      </section>`;
  };

  const renderModule = id => {
    const m = moduleIndex[id];
    if (!m) { renderModules(); return; }
    const files = moduleFiles(m);
    const p = progressOf(files);
    const allDone = p.total && p.done === p.total;
    view.innerHTML = `
      <div class="crumbs"><a href="#/">Accueil</a> <span>›</span> <a href="#/modules">Modules</a> <span>›</span> <span>${esc(m.court || m.nom)}</span></div>

      <header class="module-head" style="--c:${m.couleur}">
        <div class="mh-ico">${m.emoji}</div>
        <div>
          <h1>${esc(m.nom)}</h1>
          <div class="mh-sub">${esc(m.desc || '')}</div>
          <div class="mh-sub">${files.length} document${files.length > 1 ? 's' : ''} · ${p.pct} % révisé</div>
        </div>
        <div class="mh-actions">
          <button class="btn btn-ghost" id="toggle-all">${allDone ? '↺ Tout décocher' : '✓ Tout marquer révisé'}</button>
          <a class="btn btn-primary" href="${folderUrl(m.folder)}" target="_blank" rel="noopener">📁 Dossier Drive ↗</a>
        </div>
      </header>

      <div class="bar" style="margin:0 0 8px"><i style="width:${p.pct}%"></i></div>

      ${m.enfants.map(folderBlock).join('')}`;

    const btn = document.getElementById('toggle-all');
    if (btn) btn.addEventListener('click', () => {
      files.forEach(f => allDone ? state.revised.delete(f.id) : state.revised.add(f.id));
      save(); renderModule(id);
    });
  };

  const renderAnnales = () => {
    const mods = [moduleIndex['exams-2025'], moduleIndex['examens-anciens'], moduleIndex['autres-facs']].filter(Boolean);
    view.innerHTML = `
      <div class="crumbs"><a href="#/">Accueil</a> <span>›</span> <span>Examens & annales</span></div>
      <section class="section" style="margin-top:14px">
        <div class="section-head"><div><h2>Examens & annales</h2><p>Tous les sujets du S1 disponibles sur le Drive, des promos précédentes aux sessions récentes.</p></div></div>
        ${mods.map(m => `
          <section class="folder">
            <div class="folder-head">
              <span class="f-ico">${m.emoji}</span>
              <h3>${esc(m.nom)}</h3>
              <span class="f-count">${moduleFiles(m).length} document${moduleFiles(m).length > 1 ? 's' : ''}</span>
              <a class="f-open" href="#/m/${m.id}">Voir le module →</a>
            </div>
            ${m.enfants.map(n => fileList(n.fichiers, m.court)).join('')}
          </section>`).join('')}
      </section>`;
  };

  const renderFavoris = () => {
    const favs = index.filter(f => state.favs.has(f.id));
    view.innerHTML = `
      <div class="crumbs"><a href="#/">Accueil</a> <span>›</span> <span>Favoris</span></div>
      <section class="section" style="margin-top:14px">
        <div class="section-head"><div><h2>Mes favoris</h2><p>${favs.length ? favs.length + ' document' + (favs.length > 1 ? 's' : '') + ' épinglé' + (favs.length > 1 ? 's' : '') : 'Astuce : clique sur ★ à côté d’un document pour le retrouver ici.'}</p></div></div>
        ${favs.length
          ? fileList(favs.map(f => ({ nom: f.nom, id: f.id, type: f.type })), '')
          : `<div class="empty-note">Aucun favori pour l’instant. Ouvre un module puis touche l’étoile ★ d’un document.</div>`}
      </section>`;
  };

  const renderAbout = () => {
    const s = totalStats();
    view.innerHTML = `
      <div class="crumbs"><a href="#/">Accueil</a> <span>›</span> <span>À propos</span></div>
      <section class="section" style="margin-top:14px">
        <div class="section-head"><div><h2>À propos du portail</h2><p>Comment ce site est construit, et d’où viennent les documents.</p></div></div>
        <div class="cards">
          <div class="card" style="--c:#4f46e5">
            <div class="card-top"><div class="card-emoji">📁</div><div><h3>Source unique : le Drive S1</h3>
            <div class="meta">${s.docs} documents référencés</div></div></div>
            <p class="desc">Le portail ne copie aucun fichier : il ne fait qu’afficher l’arborescence du Drive officiel de la promo et pointer vers chaque document. Tout ajout sur le Drive peut être reflété ici.</p>
            <a class="btn btn-ghost" href="${D.meta.driveUrl}" target="_blank" rel="noopener">Ouvrir le Drive S1 ↗</a>
          </div>
          <div class="card" style="--c:#22b07d">
            <div class="card-top"><div class="card-emoji">✅</div><div><h3>Ta progression reste chez toi</h3>
            <div class="meta">localStorage · aucun compte</div></div></div>
            <p class="desc">Les cases « révisé », les favoris et le thème sont stockés dans ton navigateur uniquement. Aucun serveur, aucune donnée envoyée, aucune inscription.</p>
          </div>
          <div class="card" style="--c:#12a5d8">
            <div class="card-top"><div class="card-emoji">🕓</div><div><h3>Dossiers « à venir »</h3>
            <div class="meta">${D.modules.reduce((n, m) => n + countEmpty(m), 0)} dossiers encore vides</div></div></div>
            <p class="desc">Certains dossiers existent sur le Drive mais sont encore vides. Ils sont affichés en pointillés pour que tu saches qu’ils arriveront — sans inventer de contenu.</p>
          </div>
          <div class="card" style="--c:#f0921f">
            <div class="card-top"><div class="card-emoji">🗂️</div><div><h3>Autres espaces</h3>
            <div class="meta">promo 2024-2025</div></div></div>
            <p class="desc">Le portail de la promotion précédente (notes d’examen par professeur, formation S1 → S12, liens utiles) reste disponible.</p>
            <a class="btn btn-ghost" href="2024-2025/index.html">Ouvrir le portail 2024-2025 ↗</a>
          </div>
        </div>
      </section>`;
  };

  /* ------------------------------ progression ------------------------------ */
  const save = () => {
    write(LS.rev, [...state.revised]);
    write(LS.fav, [...state.favs]);
    const c = document.getElementById('fav-count');
    if (c) c.textContent = state.favs.size;
    fillFootStats();
  };

  const fillFootStats = () => {
    const s = totalStats();
    const el = document.getElementById('foot-stats');
    if (el) el.textContent = `${s.docs} documents · ${s.modules} rubriques · ${s.pct} % de ta révision`;
  };

  /* ------------------------------ interactions ------------------------------ */
  view.addEventListener('click', e => {
    const rev = e.target.closest('[data-rev]');
    if (rev) {
      const id = rev.dataset.rev;
      state.revised.has(id) ? state.revised.delete(id) : state.revised.add(id);
      save();
      rerender();
      return;
    }
    const fav = e.target.closest('[data-fav]');
    if (fav) {
      const id = fav.dataset.fav;
      state.favs.has(id) ? state.favs.delete(id) : state.favs.add(id);
      save();
      rerender();
      return;
    }
    if (e.target.closest('#reset-progress')) {
      if (confirm('Réinitialiser toute la progression de révision ?')) { state.revised.clear(); save(); rerender(); }
    }
  });

  /* ------------------------------ recherche ------------------------------ */
  const input = document.getElementById('search');
  const results = document.getElementById('results');

  const searchFiles = q => {
    const n = norm(q);
    if (!n) return [];
    return index
      .map(f => {
        const hay = norm(f.nom + ' ' + f.path.join(' ') + ' ' + (f.module ? f.module.nom : ''));
        const at = hay.indexOf(n);
        return at < 0 ? null : { f, score: (norm(f.nom).includes(n) ? 0 : 100) + at };
      })
      .filter(Boolean)
      .sort((a, b) => a.score - b.score)
      .slice(0, 12)
      .map(r => r.f);
  };

  const showResults = q => {
    const found = searchFiles(q);
    if (!q.trim()) { results.hidden = true; results.innerHTML = ''; return; }
    results.hidden = false;
    results.innerHTML = found.length
      ? `<div class="r-head">${found.length} résultat${found.length > 1 ? 's' : ''}</div>` + found.map((f, i) => `
          <div class="result" data-idx="${i}" data-fid="${esc(f.id)}" data-mod="${f.module ? f.module.id : ''}">
            <span>${ICONS[f.type] || '📎'}</span>
            <div>
              <div class="r-name">${esc(f.nom)}</div>
              <div class="r-path">${esc(f.module ? f.module.court : 'Drive S1')}${f.path.length ? ' › ' + esc(f.path.join(' › ')) : ''}</div>
            </div>
            <span class="r-go">↗</span>
          </div>`).join('')
      : `<div class="r-empty">Aucun document ne correspond à « ${esc(q)} ».</div>`;
  };

  input.addEventListener('input', () => showResults(input.value));
  input.addEventListener('focus', () => input.value.trim() && showResults(input.value));
  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') { input.blur(); results.hidden = true; }
    if (e.key === 'Enter') {
      const first = results.querySelector('.result');
      if (first) openResult(first);
    }
  });

  const openResult = el => {
    const fid = el.dataset.fid;
    const f = index.find(x => x.id === fid);
    if (!f) return;
    window.open(fileUrl(fid), '_blank', 'noopener');
    results.hidden = true;
    if (f.module) {
      input.value = '';
      state.pending = fid;
      location.hash = '#/m/' + f.module.id;
    }
  };

  results.addEventListener('click', e => {
    const r = e.target.closest('.result');
    if (r) openResult(r);
  });

  /* bouton « voir dans le module » quand on clique sur le chemin */
  results.addEventListener('contextmenu', e => e.preventDefault());

  document.addEventListener('click', e => {
    if (!e.target.closest('#search-box')) results.hidden = true;
  });

  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== input) { e.preventDefault(); input.focus(); showResults(input.value); }
  });

  /* ------------------------------ thème & menu ------------------------------ */
  const themeBtn = document.getElementById('theme-btn');
  themeBtn.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    write(LS.theme, next);
  });

  document.getElementById('menu-btn').addEventListener('click', () => {
    document.getElementById('top-nav').classList.toggle('open');
  });

  document.querySelectorAll('#top-nav a').forEach(a => a.addEventListener('click', () => {
    document.getElementById('top-nav').classList.remove('open');
  }));

  /* ------------------------------ routage ------------------------------ */
  const routes = {
    '': renderHome,
    'modules': renderModules,
    'annales': renderAnnales,
    'favoris': renderFavoris,
    'a-propos': renderAbout
  };

  const rerender = () => route(false);

  const route = (scroll = true) => {
    const h = location.hash.replace(/^#\/?/, '');
    const parts = h.split('/').filter(Boolean);

    if (parts[0] === 'm' && parts[1] && moduleIndex[parts[1]]) {
      renderModule(parts[1]);
    } else if (routes[parts[0] || '']) {
      routes[parts[0] || '']();
    } else {
      renderHome();
    }

    document.querySelectorAll('#top-nav a').forEach(a => {
      const key = a.dataset.nav;
      a.classList.toggle('active',
        (key === 'home' && (!parts[0] || parts[0] === '')) ||
        (key === 'modules' && (parts[0] === 'modules' || parts[0] === 'm')) ||
        (key === 'annales' && parts[0] === 'annales') ||
        (key === 'favoris' && parts[0] === 'favoris'));
    });

    if (scroll && !state.pending) window.scrollTo({ top: 0, behavior: 'smooth' });

    if (state.pending) {
      const el = view.querySelector(`[data-fid="${CSS.escape(state.pending)}"]`);
      state.pending = null;
      if (el) {
        el.scrollIntoView({ block: 'center', behavior: 'smooth' });
        el.style.transition = 'background .4s';
        el.style.background = 'color-mix(in srgb, var(--accent) 16%, transparent)';
        setTimeout(() => { el.style.background = ''; }, 1600);
      }
    }
    save();
  };

  window.addEventListener('hashchange', () => route(true));

  /* ------------------------------ init ------------------------------ */
  const drive = D.meta.driveUrl;
  document.getElementById('drive-btn').href = drive;
  document.getElementById('drive-foot').href = drive;
  document.getElementById('year').textContent = new Date().getFullYear();

  const fc = document.getElementById('fav-count');
  if (fc) fc.textContent = state.favs.size;

  route(false);
  fillFootStats();
})();
