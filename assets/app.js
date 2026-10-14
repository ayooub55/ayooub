/* ------------------------------------------------------------------
   S1 — Espace de révision · FMDC Casablanca
   Application : fiches de cours, recherche, suivi de révision,
   statistiques, notes personnelles & images (IndexedDB).
   Données : data/s1.js · data/cours-imd.js · data/cours-sciences.js
   ------------------------------------------------------------------ */

(() => {
  'use strict';

  const D = window.S1;
  const FICHES = window.FICHES || [];
  const LS = {
    rev: 'fmdc.s1.revised', fav: 'fmdc.s1.favs', theme: 'fmdc.s1.theme',
    statut: 'fmdc.s1.fiche.statut', notes: 'fmdc.s1.fiche.notes',
    sur: 'fmdc.s1.fiche.surlignage', lu: 'fmdc.s1.fiche.lu'
  };

  const fileUrl   = id => `https://drive.google.com/file/d/${id}/view`;
  const folderUrl = id => `https://drive.google.com/drive/folders/${id}`;

  const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
  const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

  const state = {
    revised: new Set(read(LS.rev, [])),
    favs: new Set(read(LS.fav, [])),
    statut: read(LS.statut, {}),      // ficheId -> 'todo'|'encours'|'fait'|'revoir'
    notes: read(LS.notes, {}),        // ficheId -> texte
    sur: read(LS.sur, {}),            // ficheId -> [{texte}]
    lu: read(LS.lu, {}),              // ficheId -> ISO date
    imgCount: {},                     // ficheId -> nombre d'images (cache)
    pending: null,
    openImg: [],
    lbIndex: 0
  };

  /* ------------------------------ INDEX ------------------------------ */
  const index = [];        // fichiers du Drive
  const moduleIndex = {};

  const extOf = n => (n.split('.').pop() || '').toLowerCase();
  const typeOf = (n, force) => {
    if (force) return force;
    const e = extOf(n);
    if (e === 'pdf') return 'pdf';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'heic'].includes(e)) return 'image';
    if (['ppt', 'pptx', 'key'].includes(e)) return 'slides';
    if (['doc', 'docx', 'odt'].includes(e)) return 'doc';
    if (['xls', 'xlsx', 'csv'].includes(e)) return 'sheet';
    if (['txt', 'md'].includes(e)) return 'text';
    return 'file';
  };
  const ICONS = { pdf: '📄', image: '🖼️', slides: '📊', doc: '📝', sheet: '📈', text: '🗒️', file: '📎', fiche: '📘' };
  const TYPE_LABEL = { pdf: 'PDF', image: 'Image', slides: 'Diapositives', doc: 'Document', sheet: 'Tableur', text: 'Texte', file: 'Fichier' };

  const walk = (node, path, mod) => {
    const here = path.concat(node.nom);
    (node.fichiers || []).forEach(f => index.push({
      id: f.id, nom: f.nom.trim(), type: typeOf(f.nom, f.type), path: here.slice(1), module: mod
    }));
    (node.enfants || []).forEach(c => walk(c, here, mod));
  };
  D.modules.forEach(m => { moduleIndex[m.id] = m; walk({ nom: m.nom, enfants: m.enfants }, [], m); });
  D.racine.forEach(f => index.push({ id: f.id, nom: f.nom, type: typeOf(f.nom), path: [], module: null }));

  const ficheIndex = {};
  FICHES.forEach(f => { ficheIndex[f.id] = f; });

  const ficheTexte = f => [f.titre, f.sousTitre, f.prof, f.resume, (f.retenir || []).join(' '),
    (f.pieges || []).join(' '), (f.sections || []).map(s => s.titre + ' ' + s.html).join(' ')].join(' ');

  /* ------------------------------ OUTILS ------------------------------ */
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const countFiles = n => (n.fichiers ? n.fichiers.length : 0) + (n.enfants ? n.enfants.reduce((a, c) => a + countFiles(c), 0) : 0);
  const countFolders = n => (n.enfants ? n.enfants.reduce((a, c) => a + 1 + countFolders(c), 0) : 0);
  const countEmpty = n => (n.vide ? 1 : 0) + (n.enfants ? n.enfants.reduce((a, c) => a + countEmpty(c), 0) : 0);
  const moduleFiles = m => index.filter(f => f.module === m);

  const progressOf = files => {
    const total = files.length;
    const done = files.filter(f => state.revised.has(f.id)).length;
    return { total, done, pct: total ? Math.round(done / total * 100) : 0 };
  };

  const fichesOf = m => FICHES.filter(f => f.module === m.id);
  const moduleOf = f => moduleIndex[f.module] || null;

  const STATUTS = [
    { k: 'todo', l: 'Non lue', ico: '○' },
    { k: 'encours', l: 'En cours', ico: '◐' },
    { k: 'fait', l: 'Maîtrisée', ico: '●' },
    { k: 'revoir', l: 'À revoir', ico: '↻' }
  ];
  const statutOf = id => state.statut[id] || 'todo';

  const profsOf = m => {
    const canon = n => n.replace(/^(Prof|Pr\.?|Prod)\s*/i, '').replace(/^(Khalil|Khlil)\s+/i, '').replace(/^El\s+/i, '').trim();
    const out = [];
    const scan = n => (n.enfants || []).forEach(c => { if (/^(Pr|Prof|Prod)\b/i.test(c.nom)) out.push('Pr. ' + canon(c.nom)); scan(c); });
    scan(m);
    return [...new Set(out)];
  };

  /* ------------------------------ IMAGES (IndexedDB) ------------------------------ */
  const DB = {
    db: null, name: 'fmdc-s1-img', store: 'images',
    open() {
      if (this.db) return Promise.resolve(this.db);
      return new Promise((res, rej) => {
        const r = indexedDB.open(this.name, 1);
        r.onupgradeneeded = () => {
          const db = r.result;
          if (!db.objectStoreNames.contains(this.store)) {
            const s = db.createObjectStore(this.store, { keyPath: 'id' });
            s.createIndex('fiche', 'ficheId', { unique: false });
          }
        };
        r.onsuccess = () => { this.db = r.result; res(this.db); };
        r.onerror = () => rej(r.error);
      });
    },
    async tx(mode) { const db = await this.open(); return db.transaction(this.store, mode).objectStore(this.store); },
    async put(img) { const s = await this.tx('readwrite'); return new Promise((res, rej) => { const q = s.put(img); q.onsuccess = () => res(); q.onerror = () => rej(q.error); }); },
    async del(id) { const s = await this.tx('readwrite'); return new Promise((res, rej) => { const q = s.delete(id); q.onsuccess = () => res(); q.onerror = () => rej(q.error); }); },
    async byFiche(fid) { const s = await this.tx('readonly'); const q = s.index('fiche').getAll(fid); return new Promise((res, rej) => { q.onsuccess = () => res(q.result || []); q.onerror = () => rej(q.error); }); },
    async all() { const s = await this.tx('readonly'); const q = s.getAll(); return new Promise((res, rej) => { q.onsuccess = () => res(q.result || []); q.onerror = () => rej(q.error); }); }
  };

  const urlCache = new Map();
  const imgUrl = img => {
    if (!urlCache.has(img.id)) urlCache.set(img.id, URL.createObjectURL(img.blob));
    return urlCache.get(img.id);
  };

  const refreshImgCounts = async () => {
    try {
      const all = await DB.all();
      state.imgCount = {};
      all.forEach(i => { state.imgCount[i.ficheId] = (state.imgCount[i.ficheId] || 0) + 1; });
      save(false);
      const c = document.getElementById('img-count');
      if (c) c.textContent = all.length;
    } catch (e) { /* IndexedDB indisponible : on continue sans les images */ }
  };

  /* ------------------------------ RENDU : fichiers ------------------------------ */
  const fileRow = (f, pathTxt) => {
    const done = state.revised.has(f.id);
    const fav = state.favs.has(f.id);
    const fiche = FICHES.find(x => x.doc === f.id);
    return `
      <li class="file ${done ? 'done' : ''}" data-fid="${esc(f.id)}">
        <span class="f-ic2">${ICONS[f.type] || '📎'}</span>
        <div class="f-main">
          <div class="f-name">${esc(f.nom)}</div>
          <div class="f-path">${esc(TYPE_LABEL[f.type] || 'Fichier')}${pathTxt ? ' · ' + esc(pathTxt) : ''}${fiche ? ` · <a href="#/f/${fiche.id}" style="color:var(--accent)">📘 fiche de cours</a>` : ''}</div>
        </div>
        <div class="f-actions">
          <button class="mini star ${fav ? 'on' : ''}" data-fav="${esc(f.id)}" title="Ajouter aux favoris">★</button>
          <button class="mini ${done ? 'on' : ''}" data-rev="${esc(f.id)}" title="Marquer comme révisé">✓</button>
          <a class="mini open" href="${fileUrl(f.id)}" target="_blank" rel="noopener" title="Ouvrir sur Drive">↗</a>
        </div>
      </li>`;
  };
  const fileList = (files, pathTxt) => files && files.length
    ? `<ul class="files">${files.map(f => fileRow({ ...f, nom: f.nom.trim(), type: typeOf(f.nom, f.type) }, pathTxt)).join('')}</ul>` : '';

  const subCard = node => {
    const n = countFiles(node);
    const groups = (node.enfants || []).map(c => {
      const cf = c.fichiers || [];
      return `<div style="margin-top:12px">
          <div class="folder-head" style="border:0;padding:2px 0">
            <span class="f-ico">📂</span><h4 style="font-size:13.5px">${esc(c.nom)}</h4>
            <span class="f-count">${cf.length ? cf.length + ' doc' + (cf.length > 1 ? 's' : '') : 'à venir'}</span>
            <a class="f-open" href="${folderUrl(c.folder)}" target="_blank" rel="noopener">Drive ↗</a>
          </div>${cf.length ? fileList(cf) : ''}</div>`;
    }).join('');
    return `<div class="sub ${node.vide ? 'solid' : ''}">
        <div class="sub-head"><span>${node.vide ? '🕓' : '📁'}</span><h4>${esc(node.nom)}</h4>
          <span>${node.vide ? 'à venir' : n + ' doc' + (n > 1 ? 's' : '')}</span></div>
        ${fileList(node.fichiers)}${groups}
        ${node.vide ? `<div class="chip empty" style="margin-top:10px">Bientôt disponible sur le Drive</div>` : ''}</div>`;
  };

  const folderBlock = node => {
    const files = node.fichiers || [], kids = node.enfants || [], bits = [];
    if (node.vide) bits.push('dossier vide pour l’instant');
    else {
      bits.push(files.length ? files.length + ' document' + (files.length > 1 ? 's' : '') : 'aucun document direct');
      if (kids.length) bits.push(kids.length + ' sous-dossier' + (kids.length > 1 ? 's' : ''));
    }
    return `<section class="folder">
        <div class="folder-head">
          <span class="f-ico">${node.vide ? '🕓' : '📂'}</span><h3>${esc(node.nom)}</h3>
          <span class="f-count">${bits.join(' · ')}</span>
          <a class="f-open" href="${folderUrl(node.folder)}" target="_blank" rel="noopener">Ouvrir sur Drive ↗</a>
        </div>${fileList(files, '')}
        ${kids.length ? `<div class="sub-folders">${kids.map(subCard).join('')}</div>` : ''}
        ${node.vide ? `<div class="empty-note">🕓 Ce dossier existe déjà sur le Drive mais son contenu n’a pas encore été déposé.</div>` : ''}
      </section>`;
  };

  /* ------------------------------ RENDU : cartes ------------------------------ */
  const ficheCard = f => {
    const m = moduleOf(f);
    const st = statutOf(f.id);
    const nbImg = state.imgCount[f.id] || 0;
    const nbDoc = index.filter(x => x.module && m && x.module.id === m.id).length;
    return `<a class="fc" href="#/f/${f.id}" style="--c:${m ? m.couleur : 'var(--accent)'}">
        <div class="fc-top">
          <div class="fc-emoji">${f.emoji}</div>
          <div><h3>${esc(f.titre)}</h3><div class="fc-sub">${esc(f.prof)} · ⏱ ${f.duree} min · ${m ? esc(m.court) : ''}</div></div>
        </div>
        <p>${esc(f.resume)}</p>
        <div class="fc-foot">
          <span class="statut-tag st-${st}">${STATUTS.find(s => s.k === st).l}</span>
          <span>${(f.sections || []).length} sections${nbImg ? ` · 🖼 ${nbImg}` : ''}${nbDoc ? '' : ''}</span>
        </div>
      </a>`;
  };

  const moduleCard = m => {
    const files = moduleFiles(m), p = progressOf(files), profs = profsOf(m), empt = countEmpty(m);
    const fiches = fichesOf(m);
    return `<a class="card" href="#/m/${m.id}" style="--c:${m.couleur}">
        <div class="card-top">
          <div class="card-emoji">${m.emoji}</div>
          <div><h3>${esc(m.nom)}</h3>
            <div class="meta">${files.length} document${files.length > 1 ? 's' : ''} · ${countFolders(m)} dossier${countFolders(m) > 1 ? 's' : ''}${empt ? ` · ${empt} à venir` : ''}</div></div>
        </div>
        <p class="desc">${esc(m.desc || '')}</p>
        ${profs.length ? `<div class="chips">${profs.slice(0, 5).map(x => `<span class="chip">${esc(x)}</span>`).join('')}${profs.length > 5 ? `<span class="chip">+${profs.length - 5}</span>` : ''}</div>` : ''}
        <div class="bar"><i style="width:${p.pct}%"></i></div>
        <div class="card-foot">
          <span class="meta">${p.total ? `${p.done}/${p.total} révisé${p.done > 1 ? 's' : ''}` : 'en attente de contenu'}${fiches.length ? ` · 📘 ${fiches.length} fiche${fiches.length > 1 ? 's' : ''}` : ''}</span>
          <span class="go">Explorer →</span>
        </div>
      </a>`;
  };

  /* ------------------------------ STATISTIQUES ------------------------------ */
  const stats = () => {
    const files = index.filter(f => f.module);
    const done = files.filter(f => state.revised.has(f.id)).length;
    const fichesLues = FICHES.filter(f => state.lu[f.id]).length;
    const fichesMaitrisees = FICHES.filter(f => statutOf(f.id) === 'fait').length;
    const fichesEnCours = FICHES.filter(f => ['encours', 'revoir'].includes(statutOf(f.id))).length;
    const minutes = FICHES.reduce((a, f) => a + (f.duree || 0), 0);
    const images = Object.values(state.imgCount).reduce((a, b) => a + b, 0);
    const notes = Object.values(state.notes).filter(t => t && t.trim()).length;
    const surlignages = Object.values(state.sur).reduce((a, l) => a + (l ? l.length : 0), 0);
    const docsAvecFiche = files.filter(f => FICHES.some(x => x.doc === f.id)).length;
    return {
      files: files.length, done, pct: files.length ? Math.round(done / files.length * 100) : 0,
      fiches: FICHES.length, fichesDocs: docsAvecFiche,
      couverture: files.length ? Math.round(docsAvecFiche / files.length * 100) : 0,
      fichesLues, fichesMaitrisees, fichesEnCours, minutes, images, notes, surlignages,
      profs: [...new Set(D.modules.flatMap(profsOf))].length,
      modules: D.modules.length,
      dossiers: D.modules.reduce((a, m) => a + countFolders(m), 0),
      vides: D.modules.reduce((a, m) => a + countEmpty(m), 0),
      annales: (moduleIndex['exams-2025'] ? moduleFiles(moduleIndex['exams-2025']).length : 0) + (moduleIndex['examens-anciens'] ? moduleFiles(moduleIndex['examens-anciens']).length : 0),
      exos: driveExos().length, mesAjouts: ajouts.length, mesExos: mesExos().length, mesCours: mesCours().length
    };
  };

  /* ------------------------------ VUES ------------------------------ */
  const view = document.getElementById('view');
  let renderSeq = 0;   // garde-fou : évite les doubles écouteurs si deux rendus se croisent

  const renderHome = () => {
    const s = stats();
    view.innerHTML = `
      <section class="hero">
        <span class="hero-badge"><span class="dot"></span> Semestre 1 · ${s.fiches} fiches de cours + ${s.files} documents du Drive</span>
        <h1>Tout le <span class="grad">S1</span> est expliqué,<br>fiche par fiche.</h1>
        <p class="lead">Cours du Drive transformés en <b>fiches de révision</b> : explications simples, tableaux, schémas, points à retenir et pièges des QCM. Avec recherche, suivi de révision, statistiques et <b>tes propres notes & photos</b>.</p>
        <div class="cta-row">
          <a class="btn btn-primary" href="#/fiches">📘 Lire les fiches de cours</a>
          <a class="btn btn-ghost" href="#/exercices">🎯 Exercices & TD</a>
          <a class="btn btn-ghost" href="#/ajouter">➕ Ajouter un cours / exercice</a>
          <a class="btn btn-ghost" href="#/stats">📊 Mes statistiques</a>
          <a class="btn btn-ghost" href="telecharger/index.html" data-download-single>⬇️ Télécharger (1 fichier index.html)</a>
          <a class="btn btn-ghost" href="#" data-download-site>🗂️ Site complet (ZIP)</a>
          <a class="btn btn-ghost" href="${D.meta.driveUrl}" target="_blank" rel="noopener">📁 Drive S1 ↗</a>
        </div>

        <div class="stats">
          <div class="stat"><b>${s.fiches}</b><span>fiches de cours expliquées</span></div>
          <div class="stat"><b>${s.files}</b><span>documents référencés</span></div>
          <div class="stat"><b>${s.modules}</b><span>rubriques · ${s.profs} profs</span></div>
          <div class="stat"><b>${s.annales}</b><span>sujets d’examens</span></div>
        </div>

        ${(() => {
          const last = FICHES.filter(f => state.lu[f.id]).sort((a, b) => (state.lu[a.id] < state.lu[b.id] ? 1 : -1))[0];
          return last ? `<div class="notice" style="margin-top:14px;background:color-mix(in srgb, var(--accent) 10%, var(--surface));border-color:color-mix(in srgb, var(--accent) 30%, transparent)">
            <span>${last.emoji}</span><div><b>Reprendre la révision :</b> ${esc(last.titre)} — <a href="#/f/${last.id}" style="color:var(--accent);font-weight:600">continuer →</a></div></div>` : '';
        })()}

        <div class="progress-card">
          <div class="pc-txt">Révision (documents) : <b>${s.done} / ${s.files}</b> · <b>${s.pct} %</b></div>
          <div class="bar"><i style="width:${s.pct}%"></i></div>
          <div class="pc-txt">Fiches maîtrisées : <b>${s.fichesMaitrisees}/${s.fiches}</b></div>
        </div>

        ${s.vides ? `<div class="notice" style="margin-top:14px"><span>🕓</span>
          <div><b>${s.vides} dossiers sont encore vides sur le Drive.</b> Ils apparaissent en pointillés « à venir » — le portail reflète exactement l’état actuel du Drive.</div></div>` : ''}
      </section>

      <section class="section">
        <div class="section-head">
          <div><h2>Fiches de cours</h2><p>Chaque fiche correspond à un cours du Drive : résumé, explications, tableaux et schémas.</p></div>
          <a class="go" href="#/fiches" style="--c:var(--accent)">Toutes les fiches (${s.fiches}) →</a>
        </div>
        <div class="fiche-cards">${FICHES.slice(0, 6).map(ficheCard).join('')}</div>
      </section>

      ${ajouts.length ? `<section class="section">
        <div class="section-head"><div><h2>Mes ajouts (${ajouts.length})</h2><p>Les cours et exercices que tu as ajoutés toi-même.</p></div>
          <a class="go" href="#/ajouter" style="--c:var(--accent)">Ajouter →</a></div>
        <div class="fiche-cards">${ajouts.slice().reverse().slice(0, 3).map(ajoutCard).join('')}</div>
      </section>` : ''}

      <section class="section">
        <div class="section-head"><div><h2>Accès rapide</h2><p>Les raccourcis les plus utiles avant les examens.</p></div></div>
        <div class="quick">
          <a href="#/m/exams-2025"><span class="q-ico">📝</span><b>Examens 2025-2026</b><span>Anatomie, biochimie, biologie, chimie, physiologie</span></a>
          <a href="#/m/examens-anciens"><span class="q-ico">🗂️</span><b>Annales S1</b><span>Sujets des promotions 2023 & 2024</span></a>
          <a href="#/f/imd-carie"><span class="q-ico">🦠</span><b>La carie dentaire</b><span>Fiche complète : biofilm, sucres, diagnostic</span></a>
          <a href="#/f/physio-digestif"><span class="q-ico">🍽️</span><b>Physiologie digestive</b><span>Tous les chiffres et enzymes à retenir</span></a>
          <a href="#/exercices"><span class="q-ico">🎯</span><b>Exercices & TD</b><span>QCM, TD, annales + mes propres exercices</span></a>
          <a href="#/ajouter"><span class="q-ico">➕</span><b>Ajouter</b><span>Nouveau cours, TD ou photos de mes notes</span></a>
          <a href="telecharger/index.html" data-download-single><span class="q-ico">⬇️</span><b>Télécharger en 1 fichier</b><span>Un seul index.html : tout dedans, ça s’ouvre sans Internet</span></a>
          <a href="#" data-download-site><span class="q-ico">🗂️</span><b>Site complet (ZIP)</b><span>Toutes les pages + l’ancien portail, à décompresser</span></a>
          <a href="#/stats"><span class="q-ico">📊</span><b>Statistiques</b><span>Où j’en suis dans ma révision</span></a>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div><h2>Les rubriques du semestre</h2><p>${s.modules} rubriques · ${s.files} documents · ${s.dossiers} dossiers.</p></div>
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
    const files = moduleFiles(m), p = progressOf(files), allDone = p.total && p.done === p.total;
    const fiches = fichesOf(m);
    view.innerHTML = `
      <div class="crumbs"><a href="#/">Accueil</a> <span>›</span> <a href="#/modules">Modules</a> <span>›</span> <span>${esc(m.court || m.nom)}</span></div>

      <header class="module-head" style="--c:${m.couleur}">
        <div class="mh-ico">${m.emoji}</div>
        <div>
          <h1>${esc(m.nom)}</h1>
          <div class="mh-sub">${esc(m.desc || '')}</div>
          <div class="mh-sub">${files.length} document${files.length > 1 ? 's' : ''} · ${p.pct} % révisé${fiches.length ? ` · 📘 ${fiches.length} fiche${fiches.length > 1 ? 's' : ''} de cours` : ''}</div>
        </div>
        <div class="mh-actions">
          <button class="btn btn-ghost" id="toggle-all">${allDone ? '↺ Tout décocher' : '✓ Tout marquer révisé'}</button>
          <a class="btn btn-primary" href="${folderUrl(m.folder)}" target="_blank" rel="noopener">📁 Dossier Drive ↗</a>
        </div>
      </header>

      <div class="bar" style="margin:0 0 8px"><i style="width:${p.pct}%"></i></div>

      ${fiches.length ? `<section class="section" style="margin-top:20px">
        <div class="section-head"><div><h2>📘 Fiches de cours de ce module</h2><p>Le cours expliqué : explications, tableaux, schémas, à retenir.</p></div>
        <a class="go" href="#/fiches" style="--c:var(--accent)">Toutes les fiches →</a></div>
        <div class="fiche-cards">${fiches.map(ficheCard).join('')}</div>
      </section>` : ''}

      ${m.enfants.map(folderBlock).join('')}`;

    const btn = document.getElementById('toggle-all');
    if (btn) btn.addEventListener('click', () => {
      files.forEach(f => allDone ? state.revised.delete(f.id) : state.revised.add(f.id));
      save(); renderModule(id);
    });
  };

  /* ---- liste des fiches ---- */
  const renderFiches = () => {
    const s = stats();
    const byModule = D.modules.map(m => ({ m, f: fichesOf(m) })).filter(x => x.f.length);
    view.innerHTML = `
      <div class="crumbs"><a href="#/">Accueil</a> <span>›</span> <span>Fiches de cours</span></div>
      <section class="section" style="margin-top:14px">
        <div class="section-head">
          <div><h2>Fiches de cours</h2><p>${s.fiches} fiches · ≈ ${Math.round(s.minutes / 60 * 10) / 10} h de lecture · ${s.fichesMaitrisees} maîtrisée${s.fichesMaitrisees > 1 ? 's' : ''}</p></div>
          <a class="go" href="#/stats" style="--c:var(--accent)">Voir les statistiques →</a>
        </div>
        <div class="notice" style="margin-bottom:18px"><span>💡</span>
          <div>Astuce : dans une fiche, <b>sélectionne un passage</b> pour le surligner, mets ton <b>statut de révision</b> et ajoute <b>tes propres notes + photos</b> (prises en cours, tableaux du tableau noir…).</div></div>
        ${byModule.map(({ m, f }) => `
          <section class="folder">
            <div class="folder-head">
              <span class="f-ico">${m.emoji}</span><h3>${esc(m.nom)}</h3>
              <span class="f-count">${f.length} fiche${f.length > 1 ? 's' : ''}</span>
              <a class="f-open" href="#/m/${m.id}">Voir le module →</a>
            </div>
            <div class="fiche-cards" style="margin-top:14px">${f.map(ficheCard).join('')}</div>
          </section>`).join('')}
      </section>`;
  };

  /* ---- fiche détaillée ---- */
  const renderFiche = async id => {
    const token = ++renderSeq;
    const f = ficheIndex[id];
    if (!f) { renderFiches(); return; }
    const m = moduleOf(f);
    const doc = index.find(x => x.id === f.doc);
    const st = statutOf(f.id);

    if (!state.lu[f.id]) { state.lu[f.id] = new Date().toISOString(); save(false); }

    view.innerHTML = `
      <div class="crumbs"><a href="#/">Accueil</a> <span>›</span> <a href="#/fiches">Fiches</a> <span>›</span>
        ${m ? `<a href="#/m/${m.id}">${esc(m.court || m.nom)}</a> <span>›</span> ` : ''}<span>${esc(f.titre)}</span></div>

      <header class="fiche-head" style="--c:${m ? m.couleur : 'var(--accent)'}">
        <div class="fh-ico">${f.emoji}</div>
        <div style="min-width:0">
          <h1>${esc(f.titre)}</h1>
          <div class="fh-sub">${esc(f.sousTitre || '')}</div>
          <div class="fh-meta">
            <span class="chip">👩‍🏫 ${esc(f.prof)}</span>
            <span class="chip">⏱ ${f.duree} min de lecture</span>
            ${m ? `<span class="chip">${m.emoji} ${esc(m.court || m.nom)}</span>` : ''}
            <span class="chip">${(f.sections || []).length} sections</span>
          </div>
        </div>
      </header>

      <p class="lead" style="max-width:820px;color:var(--text-soft);font-size:14.5px">${esc(f.resume)}</p>

      ${(f.objectifs || []).length ? `<div class="keys" style="margin-top:14px">
        <b>🎯 Objectifs du cours</b>
        <ul style="margin:8px 0 0;padding-left:20px">${f.objectifs.map(o => `<li>${esc(o)}</li>`).join('')}</ul>
      </div>` : ''}

      <div class="fiche-actions">
        <div class="statut-group" role="group" aria-label="Statut de révision">
          ${STATUTS.map(s => `<button data-st="${s.k}" class="${st === s.k ? 'on' : ''}">${s.ico} ${s.l}</button>`).join('')}
        </div>
        ${doc ? `<a class="btn btn-ghost" href="${fileUrl(doc.id)}" target="_blank" rel="noopener">📄 Ouvrir le cours (Drive) ↗</a>` : ''}
        <button class="btn btn-ghost" id="print-fiche">🖨️ Imprimer</button>
      </div>

      <div class="fiche-grid">
        <aside class="toc">
          <h4>Sommaire</h4>
          ${(f.sections || []).map((s, i) => `<a href="#sec-${esc(s.id)}" data-jump="${esc(s.id)}">${i + 1}. ${esc(s.titre)}</a>`).join('')}
          <div class="toc-sep"></div>
          <a href="#ret" data-jump="ret">✅ À retenir</a>
          <a href="#pieges" data-jump="pieges">⚠️ Pièges classiques</a>
          <a href="#mesnotes" data-jump="mesnotes">📝 Mes notes & photos</a>
          <div class="toc-sep"></div>
          <h4>Surlignage</h4>
          <div id="hl-list"></div>
        </aside>

        <div class="fiche-body" id="fiche-body">
          ${(f.sections || []).map((s, i) => `
            <section class="fiche-sec" id="sec-${esc(s.id)}">
              <h2><span class="num">${i + 1}</span>${esc(s.titre)}</h2>
              ${s.html}
            </section>`).join('')}

          <div class="box-ret" id="ret" style="scroll-margin-top:84px">
            <h3>✅ À retenir absolument</h3>
            <ul>${(f.retenir || []).map(x => `<li>${esc(x)}</li>`).join('')}</ul>
          </div>
          ${(f.pieges || []).length ? `<div class="box-piege" id="pieges" style="scroll-margin-top:84px">
            <h3>⚠️ Pièges classiques (QCM)</h3>
            <ul>${f.pieges.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
          </div>` : ''}

          <div class="notes-card" id="mesnotes" style="scroll-margin-top:84px">
            <h3>📝 Mes notes sur ce cours</h3>
            <div class="nc-hint">Ce que tu écris et les photos que tu ajoutes restent <b>uniquement dans ton navigateur</b> (aucun envoi).</div>
            <textarea id="note-txt" placeholder="Ex. : le prof a insisté sur… / à revoir avant l’examen…">${esc(state.notes[f.id] || '')}</textarea>
            <div class="nc-row">
              <span class="nc-saved" id="nc-saved"></span>
              <span class="pill" id="nc-count"></span>
            </div>

            <h3 style="margin-top:20px">🖼 Photos de mes notes</h3>
            <div class="nc-hint">Prends en photo le tableau, tes notes manuscrites, les diapos projetées… (JPG, PNG, WebP — plusieurs fichiers possibles).</div>
            <div class="drop" id="drop">📷 Glisse tes photos ici ou <b>clique pour choisir</b> des images</div>
            <input type="file" id="file-input" accept="image/*" multiple hidden>
            <div class="gallery" id="gallery" data-fiche="${esc(f.id)}"></div>
          </div>
        </div>
      </div>

      <div class="lightbox" id="lightbox"><button class="lb-close" id="lb-close">✕</button><img id="lb-img" alt=""></div>

      ${(() => {
        const i = FICHES.indexOf(f);
        const prev = FICHES[i - 1], next = FICHES[i + 1];
        const sameModule = FICHES.filter(x => x.module === f.module && x.id !== f.id).slice(0, 4);
        if (!prev && !next && !sameModule.length) return '';
        return `<section class="section">
          <div class="section-head"><div><h2 style="font-size:18px">Continuer la révision</h2><p>Fiche précédente / suivante et autres cours de la même rubrique.</p></div>
            <a class="go" href="#/stats" style="--c:var(--accent)">Ma progression →</a></div>
          <div class="fiche-cards">
            ${prev ? `<a class="fc" href="#/f/${prev.id}" style="--c:${moduleOf(prev) ? moduleOf(prev).couleur : 'var(--accent)'}">
              <div class="fc-top"><div class="fc-emoji">⬅️</div><div><h3>${esc(prev.titre)}</h3><div class="fc-sub">Fiche précédente · ${esc(prev.prof)}</div></div></div></a>` : ''}
            ${next ? `<a class="fc" href="#/f/${next.id}" style="--c:${moduleOf(next) ? moduleOf(next).couleur : 'var(--accent)'}">
              <div class="fc-top"><div class="fc-emoji">➡️</div><div><h3>${esc(next.titre)}</h3><div class="fc-sub">Fiche suivante · ${esc(next.prof)}</div></div></div></a>` : ''}
          </div>
          ${sameModule.length ? `<div class="section-head" style="margin-top:26px"><div><h2 style="font-size:16px">Dans la même rubrique</h2></div></div>
          <div class="fiche-cards">${sameModule.map(ficheCard).join('')}</div>` : ''}
        </section>`;
      })()}

    `;

    /* statut */
    view.querySelectorAll('.statut-group button').forEach(b => b.addEventListener('click', () => {
      state.statut[f.id] = b.dataset.st; save();
      view.querySelectorAll('.statut-group button').forEach(x => x.classList.toggle('on', x === b));
    }));

    document.getElementById('print-fiche').addEventListener('click', () => window.print());

    /* sommaire : défilement doux */
    view.querySelectorAll('[data-jump]').forEach(a => a.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById(a.dataset.jump)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));

    /* surlignage */
    const body = document.getElementById('fiche-body');
    applyHighlights(body, f.id);
    renderHlList(f.id);

    /* notes */
    const ta = document.getElementById('note-txt');
    let t = null;
    ta.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(() => {
        state.notes[f.id] = ta.value; save(false);
        const s2 = document.getElementById('nc-saved');
        s2.textContent = '✓ enregistré';
        setTimeout(() => s2.textContent = '', 1800);
        updateNcCount(f.id, ta);
      }, 400);
    });
    updateNcCount(f.id, ta);

    /* images */
    await renderGallery(f.id);
    if (token !== renderSeq) return;     // un autre rendu a pris la main
    const drop = document.getElementById('drop');
    const input = document.getElementById('file-input');
    if (!drop || !input) return;
    drop.addEventListener('click', () => input.click());
    ['dragenter', 'dragover'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('over'); }));
    ['dragleave', 'drop'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove('over'); }));
    drop.addEventListener('drop', e => addFiles(f.id, e.dataTransfer.files));
    input.addEventListener('change', () => addFiles(f.id, input.files));
  };

  const updateNcCount = (fid, ta) => {
    const el = document.getElementById('nc-count');
    if (!el) return;
    const n = (state.imgCount[fid] || 0);
    el.textContent = `${ta.value.length} caractères · ${n} photo${n > 1 ? 's' : ''}`;
  };

  const addFiles = async (fid, files) => {
    const arr = [...files].filter(x => x.type.startsWith('image/'));
    for (const file of arr) {
      const img = {
        id: `${fid}__${Date.now()}__${Math.random().toString(36).slice(2, 8)}`,
        ficheId: fid, nom: file.name || 'photo', type: file.type,
        taille: file.size, date: new Date().toISOString(), blob: file
      };
      try { await DB.put(img); }
      catch (e) {
        alert('Impossible d’enregistrer la photo.\n\nCauses possibles :\n• stockage du navigateur plein ;\n• page ouverte directement depuis un fichier local (file://) : certains navigateurs y bloquent le stockage.\n\nEssaie avec Chrome ou Firefox, ou utilise la version ZIP du site.');
        break;
      }
    }
    await refreshImgCounts();
    await renderGallery(fid);
    updateNcCount(fid, document.getElementById('note-txt') || { value: state.notes[fid] || '' });
  };

  const renderGallery = async fid => {
    const gal = document.getElementById('gallery');
    if (!gal) return;
    if (gal.dataset.fiche && gal.dataset.fiche !== fid) return;
    let imgs = [];
    try { imgs = await DB.byFiche(fid); } catch (e) {}
    if (!document.body.contains(gal) || gal.dataset.fiche !== fid) return;  // la page a changé entre-temps
    imgs.sort((a, b) => (a.date < b.date ? -1 : 1));
    gal.innerHTML = imgs.length ? imgs.map(i => `
      <figure class="gal-item" data-open="${esc(i.id)}">
        <img src="${imgUrl(i)}" alt="${esc(i.nom)}" loading="lazy">
        <button class="gal-del" data-del="${esc(i.id)}" title="Supprimer">✕</button>
        <figcaption>${esc(i.nom)} · ${(i.taille / 1024).toFixed(0)} Ko</figcaption>
      </figure>`).join('') : '';
    state.openImg = imgs;

    gal.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', async e => {
      e.stopPropagation();
      if (!confirm('Supprimer cette photo ?')) return;
      await DB.del(b.dataset.del);
      urlCache.delete(b.dataset.del);
      await refreshImgCounts();
      await renderGallery(fid);
    }));
    gal.querySelectorAll('[data-open]').forEach(fig => fig.addEventListener('click', () => {
      const img = imgs.find(x => x.id === fig.dataset.open);
      if (!img) return;
      document.getElementById('lb-img').src = imgUrl(img);
      document.getElementById('lightbox').classList.add('open');
    }));
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    const close = document.getElementById('lb-close');
    if (close) close.onclick = () => lb.classList.remove('open');
    lb.onclick = e => { if (e.target === lb) lb.classList.remove('open'); };
  };

  /* ---- surlignage ---- */
  const applyHighlights = (root, fid) => {
    const list = state.sur[fid] || [];
    if (!list.length) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: n => (n.parentElement.closest('pre, table, textarea, button, .toc') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT)
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    list.forEach(h => {
      if (!h.texte || h.texte.length < 3) return;
      for (const node of nodes) {
        const i = node.nodeValue.indexOf(h.texte);
        if (i >= 0) {
          const range = document.createRange();
          range.setStart(node, i); range.setEnd(node, i + h.texte.length);
          const mk = document.createElement('mark');
          mk.className = 'hl';
          try { range.surroundContents(mk); } catch (e) {}
          break;
        }
      }
    });
  };

  const renderHlList = fid => {
    const el = document.getElementById('hl-list');
    if (!el) return;
    const list = state.sur[fid] || [];
    el.innerHTML = list.length
      ? list.map((h, i) => `<a href="#" data-hl="${i}" title="Supprimer ce surlignage" style="font-size:12px">“${esc(h.texte.slice(0, 46))}${h.texte.length > 46 ? '…' : ''}” ✕</a>`).join('')
      : `<div style="font-size:12px;color:var(--muted);padding:4px 8px">Sélectionne du texte dans la fiche pour le surligner 🖍️</div>`;
    el.querySelectorAll('[data-hl]').forEach(a => a.addEventListener('click', e => {
      e.preventDefault();
      const i = +a.dataset.hl;
      state.sur[fid].splice(i, 1); save(); renderFiche2(fid);
    }));
  };

  /* re-render de la fiche sans recharger la position */
  const renderFiche2 = async fid => {
    const y = window.scrollY;
    await renderFiche(fid);
    window.scrollTo({ top: y });
  };

  /* bouton flottant de surlignage */
  const hlBtn = document.createElement('button');
  hlBtn.id = 'hl-btn';
  hlBtn.textContent = '🖍️ Surligner';
  document.body.appendChild(hlBtn);
  let curSel = '';
  const hideHl = () => { hlBtn.style.display = 'none'; };

  document.addEventListener('selectionchange', () => {
    const sel = window.getSelection();
    const txt = sel ? sel.toString().trim() : '';
    const body = document.getElementById('fiche-body');
    if (!body || !txt || txt.length < 3 || !body.contains(sel.anchorNode)) { hideHl(); return; }
    curSel = txt;
    const r = sel.getRangeAt(0).getBoundingClientRect();
    hlBtn.style.display = 'block';
    hlBtn.style.left = Math.max(8, Math.min(window.innerWidth - 150, r.left + r.width / 2 - 60)) + 'px';
    hlBtn.style.top = Math.max(70, r.top - 44) + 'px';
  });
  document.addEventListener('scroll', hideHl, { passive: true });
  hlBtn.addEventListener('click', () => {
    const fid = location.hash.replace(/^#\/f\//, '');
    if (!fid || !curSel) return;
    state.sur[fid] = state.sur[fid] || [];
    if (!state.sur[fid].some(h => h.texte === curSel)) state.sur[fid].push({ texte: curSel, date: new Date().toISOString() });
    save();
    hideHl();
    window.getSelection().removeAllRanges();
    renderFiche2(fid);
  });

  /* ---- annales ---- */
  const renderAnnales = () => {
    const mods = [moduleIndex['exams-2025'], moduleIndex['examens-anciens'], moduleIndex['autres-facs']].filter(Boolean);
    view.innerHTML = `
      <div class="crumbs"><a href="#/">Accueil</a> <span>›</span> <span>Examens & annales</span></div>
      <section class="section" style="margin-top:14px">
        <div class="section-head"><div><h2>Examens & annales</h2><p>Tous les sujets du S1 disponibles sur le Drive, des promos précédentes aux sessions récentes.</p></div></div>
        ${mods.map(m => {
          const mf = moduleFiles(m);
          return `<section class="folder">
            <div class="folder-head">
              <span class="f-ico">${m.emoji}</span><h3>${esc(m.nom)}</h3>
              <span class="f-count">${mf.length} document${mf.length > 1 ? 's' : ''}</span>
              <a class="f-open" href="#/m/${m.id}">Voir le module →</a>
            </div>
            ${m.enfants.map(n => fileList(n.fichiers, m.court)).join('')}
          </section>`;
        }).join('')}
      </section>`;
  };

  const renderFavoris = () => {
    const favs = index.filter(f => state.favs.has(f.id));
    const favFiches = FICHES.filter(f => state.favs.has(f.doc));
    view.innerHTML = `
      <div class="crumbs"><a href="#/">Accueil</a> <span>›</span> <span>Favoris</span></div>
      <section class="section" style="margin-top:14px">
        <div class="section-head"><div><h2>Mes favoris</h2><p>${favs.length + favFiches.length ? `${favs.length} document(s) et ${favFiches.length} fiche(s) épinglés` : 'Astuce : clique sur ★ à côté d’un document ou d’une fiche pour le retrouver ici.'}</p></div></div>
        ${favFiches.length ? `<div class="fiche-cards" style="margin-bottom:20px">${favFiches.map(ficheCard).join('')}</div>` : ''}
        ${favs.length ? fileList(favs.map(f => ({ nom: f.nom, id: f.id, type: f.type })), '')
          : (favFiches.length ? '' : `<div class="empty-note">Aucun favori pour l’instant.</div>`)}
      </section>`;
  };

  /* ---- mes notes ---- */
  const renderMesNotes = async () => {
    const token = ++renderSeq;
    let imgs = [];
    try { imgs = await DB.all(); } catch (e) {}
    const fichesAvecNotes = FICHES.filter(f => (state.notes[f.id] || '').trim());
    const byFiche = {};
    imgs.forEach(i => { (byFiche[i.ficheId] = byFiche[i.ficheId] || []).push(i); });

    view.innerHTML = `
      <div class="crumbs"><a href="#/">Accueil</a> <span>›</span> <span>Mes notes & photos</span></div>
      <section class="section" style="margin-top:14px">
        <div class="section-head"><div><h2>Mes notes & photos</h2>
          <p>${imgs.length} photo${imgs.length > 1 ? 's' : ''} · ${fichesAvecNotes.length} fiche${fichesAvecNotes.length > 1 ? 's' : ''} annotée${fichesAvecNotes.length > 1 ? 's' : ''} · ${Object.values(state.sur).reduce((a, l) => a + (l ? l.length : 0), 0)} surlignage(s)</p></div></div>
        <div class="notice" style="margin-bottom:18px"><span>🔒</span><div>Tout est stocké <b>dans ton navigateur</b> (notes : localStorage · photos : IndexedDB). Rien n’est envoyé sur Internet. Pense à ne pas vider les données du site si tu veux les garder.</div></div>

        ${fichesAvecNotes.length ? `<h3 style="margin:18px 0 10px;font-size:16px">📝 Mes notes écrites</h3>
          ${fichesAvecNotes.map(f => {
            const m = moduleOf(f);
            return `<div class="notes-card" style="margin-bottom:12px">
              <h3>${f.emoji} <a href="#/f/${f.id}" style="color:var(--accent)">${esc(f.titre)}</a></h3>
              <div class="fc-sub" style="font-size:12px;color:var(--muted)">${esc(f.prof)}${m ? ' · ' + esc(m.court) : ''}</div>
              <p style="white-space:pre-wrap;margin-top:10px;font-size:14px;color:var(--text-soft)">${esc(state.notes[f.id])}</p>
              <div class="nc-row"><a class="link-btn" href="#/f/${f.id}">Modifier →</a></div>
            </div>`;
          }).join('')}` : ''}

        <h3 style="margin:24px 0 10px;font-size:16px">🖼 Toutes mes photos (${imgs.length})</h3>
        ${imgs.length ? D.modules.filter(m => FICHES.some(f => f.module === m.id && byFiche[f.id])).map(m => {
          const fs = FICHES.filter(f => f.module === m.id && byFiche[f.id]);
          return `<section class="folder">
            <div class="folder-head"><span class="f-ico">${m.emoji}</span><h3>${esc(m.court || m.nom)}</h3>
              <span class="f-count">${fs.reduce((a, f) => a + byFiche[f.id].length, 0)} photo(s)</span></div>
            ${fs.map(f => `<div style="margin-top:12px">
                <div style="font-size:13px;font-weight:600;margin-bottom:6px"><a href="#/f/${f.id}" style="color:var(--accent)">${f.emoji} ${esc(f.titre)}</a></div>
                <div class="gallery">${byFiche[f.id].map(i => `<figure class="gal-item" data-allimg="${esc(i.id)}">
                    <img src="${imgUrl(i)}" alt="${esc(i.nom)}" loading="lazy"><figcaption>${esc(i.nom)}</figcaption></figure>`).join('')}</div>
              </div>`).join('')}
          </section>`;
        }).join('') : `<div class="empty-note">Aucune photo pour l’instant. Ouvre une fiche de cours et utilise « 📷 Photos de mes notes ».</div>`}
        <div class="lightbox" id="lightbox"><button class="lb-close" id="lb-close">✕</button><img id="lb-img" alt=""></div>
      </section>`;

    if (token !== renderSeq) return;
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    const close = document.getElementById('lb-close');
    if (close) close.onclick = () => lb.classList.remove('open');
    lb.onclick = e => { if (e.target === lb) lb.classList.remove('open'); };
    view.querySelectorAll('[data-allimg]').forEach(fig => fig.addEventListener('click', () => {
      const img = imgs.find(x => x.id === fig.dataset.allimg);
      if (img) { document.getElementById('lb-img').src = imgUrl(img); lb.classList.add('open'); }
    }));
  };

  /* ---- statistiques ---- */
  const renderStats = () => {
    const s = stats();
    const R = 62, C = 2 * Math.PI * R;
    const dash = `${(s.couverture / 100) * C} ${C}`;
    const rows = D.modules.map(m => {
      const files = moduleFiles(m), p = progressOf(files), fiches = fichesOf(m);
      const docsAvecFiche = files.filter(f => FICHES.some(x => x.doc === f.id)).length;
      return { m, files, p, fiches, docsAvecFiche };
    });
    const maxDocs = Math.max(...rows.map(r => r.files.length), 1);
    const fichesTriees = [...FICHES].sort((a, b) => (statutOf(a.id) === 'fait' ? 1 : 0) - (statutOf(b.id) === 'fait' ? 1 : 0));

    view.innerHTML = `
      <div class="crumbs"><a href="#/">Accueil</a> <span>›</span> <span>Statistiques</span></div>
      <section class="section" style="margin-top:14px">
        <div class="section-head"><div><h2>Statistiques du semestre & de ma révision</h2><p>Ce que contient le Drive, ce qui est expliqué en fiches, et où j’en suis.</p></div></div>

        <div class="kpis">
          <div class="kpi acc"><b>${s.files}</b><span>documents sur le Drive</span><div class="k-sub">${s.dossiers} dossiers · ${s.modules} rubriques</div></div>
          <div class="kpi"><b>${s.fiches}</b><span>fiches de cours</span><div class="k-sub">${s.couverture} % des documents couverts</div></div>
          <div class="kpi"><b>${Math.round(s.minutes / 60 * 10) / 10} h</b><span>de lecture estimée</span><div class="k-sub">soit ${s.minutes} minutes</div></div>
          <div class="kpi ok"><b>${s.fichesMaitrisees}</b><span>fiches maîtrisées</span><div class="k-sub">${s.fichesEnCours} en cours / à revoir</div></div>
          <div class="kpi"><b>${s.fichesLues}</b><span>fiches ouvertes</span><div class="k-sub">sur ${s.fiches}</div></div>
          <div class="kpi"><b>${s.done}</b><span>documents révisés</span><div class="k-sub">${s.pct} % du Drive</div></div>
          <div class="kpi"><b>${s.images}</b><span>photos de mes notes</span><div class="k-sub">${s.notes} fiche(s) annotée(s)</div></div>
          <div class="kpi"><b>${s.surlignages}</b><span>passages surlignés</span><div class="k-sub">${s.annales} sujets d’examens</div></div>
          <div class="kpi"><b>${s.exos}</b><span>exercices / TD / QCM du Drive</span><div class="k-sub">à retrouver dans 🎯 Exercices</div></div>
          <div class="kpi"><b>${s.mesAjouts}</b><span>mes ajouts personnels</span><div class="k-sub">${s.mesCours} cours · ${s.mesExos} exercices</div></div>
        </div>

        <div class="section-head" style="margin-top:34px"><div><h2 style="font-size:18px">Couverture & progression par rubrique</h2>
          <p>Barre pleine = documents du Drive · vert = documents avec fiche · foncé = révisés.</p></div></div>
        <div class="chart">
          ${rows.map(r => `
            <div class="chart-row">
              <div class="c-name" title="${esc(r.m.nom)}">${r.m.emoji} ${esc(r.m.court || r.m.nom)}</div>
              <div class="track" title="${r.p.done}/${r.files.length} révisés · ${r.fiches.length} fiches">
                <i class="t-doc" style="width:${(r.files.length / maxDocs) * 100}%"></i>
                <i class="t-fic" style="width:${(r.docsAvecFiche / maxDocs) * 100}%;margin-left:-${(r.docsAvecFiche / maxDocs) * 100}%"></i>
                <i class="t-rev" style="width:${(r.p.done / maxDocs) * 100}%;margin-left:-${(r.p.done / maxDocs) * 100}%"></i>
              </div>
              <div class="c-val">${r.files.length} doc · ${r.fiches.length} 📘</div>
            </div>`).join('')}
        </div>
        <div class="legend">
          <span><i style="background:color-mix(in srgb, var(--accent) 26%, transparent)"></i>documents</span>
          <span><i style="background:color-mix(in srgb, #22b07d 55%, transparent)"></i>avec fiche de cours</span>
          <span><i style="background:var(--accent)"></i>révisés</span>
        </div>

        <div class="donut-wrap" style="margin-top:34px">
          <svg class="donut" viewBox="0 0 150 150" role="img" aria-label="Couverture des fiches">
            <circle class="d-bg" cx="75" cy="75" r="${R}"></circle>
            <circle class="d-fg" cx="75" cy="75" r="${R}" stroke-dasharray="${dash}"></circle>
            <text x="75" y="72" text-anchor="middle" font-size="24" font-weight="800" fill="var(--text)">${s.couverture}%</text>
            <text x="75" y="92" text-anchor="middle" font-size="10.5" fill="var(--muted)">couvert par les fiches</text>
          </svg>
          <div>
            <h3 style="font-size:16px;margin-bottom:8px">Ma révision en un coup d’œil</h3>
            <div class="pc-txt" style="font-size:13.5px;color:var(--text-soft);margin-bottom:6px">Documents révisés : <b>${s.done}/${s.files}</b> (${s.pct} %)</div>
            <div class="bar" style="max-width:420px"><i style="width:${s.pct}%"></i></div>
            <div class="pc-txt" style="font-size:13.5px;color:var(--text-soft);margin:10px 0 6px">Fiches maîtrisées : <b>${s.fichesMaitrisees}/${s.fiches}</b> (${s.fiches ? Math.round(s.fichesMaitrisees / s.fiches * 100) : 0} %)</div>
            <div class="bar" style="max-width:420px"><i style="width:${s.fiches ? Math.round(s.fichesMaitrisees / s.fiches * 100) : 0}%"></i></div>
            <div class="tag-list">
              <span class="chip">🎓 ${s.profs} intervenants</span>
              <span class="chip">🗂️ ${s.vides} dossiers à venir</span>
              <span class="chip">📝 ${s.annales} sujets d’examens</span>
            </div>
          </div>
        </div>

        <div class="section-head" style="margin-top:34px"><div><h2 style="font-size:18px">Détail par rubrique</h2></div></div>
        <div class="tbl-wrap">
          <table>
            <tr><th>Rubrique</th><th>Documents</th><th>Fiches</th><th>Révisés</th><th>Progression</th><th></th></tr>
            ${rows.map(r => `<tr>
              <td>${r.m.emoji} <b>${esc(r.m.nom)}</b></td>
              <td>${r.files.length}</td>
              <td>${r.fiches.length}</td>
              <td>${r.p.done}/${r.files.length}</td>
              <td><div class="bar" style="min-width:110px"><i style="width:${r.p.pct}%"></i></div></td>
              <td><a href="#/m/${r.m.id}" style="color:var(--accent)">ouvrir →</a></td>
            </tr>`).join('')}
          </table>
        </div>

        <div class="section-head" style="margin-top:34px"><div><h2 style="font-size:18px">Mes fiches</h2><p>Statut de révision, notes et photos par fiche.</p></div></div>
        <div class="tbl-wrap">
          <table>
            <tr><th>Fiche</th><th>Rubrique</th><th>Statut</th><th>Ouverte le</th><th>Notes</th><th>Photos</th><th>Surlignages</th></tr>
            ${fichesTriees.map(f => {
              const m = moduleOf(f), st = statutOf(f.id);
              const nbImg = state.imgCount[f.id] || 0;
              const note = (state.notes[f.id] || '').trim();
              return `<tr>
                <td><a href="#/f/${f.id}" style="color:var(--accent)">${f.emoji} ${esc(f.titre)}</a></td>
                <td>${m ? esc(m.court || m.nom) : '—'}</td>
                <td><span class="statut-tag st-${st}">${STATUTS.find(x => x.k === st).l}</span></td>
                <td>${state.lu[f.id] ? new Date(state.lu[f.id]).toLocaleDateString('fr-FR') : '—'}</td>
                <td>${note ? note.slice(0, 40) + (note.length > 40 ? '…' : '') : '—'}</td>
                <td>${nbImg || '—'}</td>
                <td>${(state.sur[f.id] || []).length || '—'}</td>
              </tr>`;
            }).join('')}
          </table>
        </div>

        <div class="notice" style="margin-top:24px"><span>📈</span>
          <div>Ces statistiques se mettent à jour automatiquement quand tu coches des documents, changes le statut d’une fiche, écris des notes ou ajoutes des photos — <b>tout reste dans ton navigateur</b>.</div></div>
      </section>`;
  };

  const renderAbout = () => {
    const s = stats();
    view.innerHTML = `
      <div class="crumbs"><a href="#/">Accueil</a> <span>›</span> <span>À propos</span></div>
      <section class="section" style="margin-top:14px">
        <div class="section-head"><div><h2>À propos du portail</h2><p>Comment ce site est construit, et d’où viennent les contenus.</p></div></div>
        <div class="cards">
          <div class="card" style="--c:#4f46e5">
            <div class="card-top"><div class="card-emoji">📁</div><div><h3>Source : le Drive S1</h3>
            <div class="meta">${s.files} documents référencés</div></div></div>
            <p class="desc">Le portail affiche l’arborescence du Drive officiel et pointe vers chaque document — aucun fichier n’est copié.</p>
            <a class="btn btn-ghost" href="${D.meta.driveUrl}" target="_blank" rel="noopener">Ouvrir le Drive S1 ↗</a>
          </div>
          <div class="card" style="--c:#22b07d">
            <div class="card-top"><div class="card-emoji">📘</div><div><h3>Fiches de cours</h3>
            <div class="meta">${s.fiches} fiches rédigées à partir des cours</div></div></div>
            <p class="desc">Chaque fiche résume un cours du Drive : explications, tableaux, schémas, points à retenir et pièges classiques des QCM.</p>
          </div>
          <div class="card" style="--c:#12a5d8">
            <div class="card-top"><div class="card-emoji">📝</div><div><h3>Mes notes & photos</h3>
            <div class="meta">${s.images} photos · ${s.notes} notes</div></div></div>
            <p class="desc">Ajoute tes propres notes et tes photos (tableau, notes manuscrites) sur chaque fiche. Stockage local dans ton navigateur uniquement.</p>
            <a class="btn btn-ghost" href="#/mesnotes">Ouvrir mes notes</a>
          </div>
          <div class="card" style="--c:#f0921f">
            <div class="card-top"><div class="card-emoji">🗂️</div><div><h3>Autres espaces</h3>
            <div class="meta">promo 2024-2025</div></div></div>
            <p class="desc">Le portail de la promotion précédente (notes d’examen par professeur, formation S1 → S12, liens utiles).</p>
            <a class="btn btn-ghost" href="2024-2025/index.html">Ouvrir le portail 2024-2025 ↗</a>
          </div>
        </div>
      </section>`;
  };

  /* ====================== MES AJOUTS (cours & exercices perso) ====================== */
  const KEY_AJOUTS = 'fmdc.s1.ajouts';
  const ajouts = read(KEY_AJOUTS, []);
  const saveAjouts = () => write(KEY_AJOUTS, ajouts);
  const ajoutIndex = id => ajouts.find(a => a.id === id);
  const mesCours = () => ajouts.filter(a => a.type === 'cours');
  const mesExos = () => ajouts.filter(a => a.type === 'exercice');

  const EXO_RE = /(qcm|exam|annal|preuve|contr[oô]le|td\b|exercic|mine|r[eé]vision|sujet|corrig|scellement des)/i;
  const driveExos = () => index.filter(f => f.module && EXO_RE.test(f.nom));

  const moduleOptions = sel => D.modules.map(m =>
    `<option value="${m.id}" ${sel === m.id ? 'selected' : ''}>${m.emoji} ${esc(m.court || m.nom)}</option>`).join('');

  const renderTexte = t => String(t || '').split(/\n+/).map(l => {
    l = l.trim();
    if (!l) return '';
    if (/^#\s/.test(l)) return `<h3 style="font-size:15.5px;margin:16px 0 6px">${esc(l.replace(/^#\s*/, ''))}</h3>`;
    if (/^[-•*]\s/.test(l)) return `<li>${esc(l.replace(/^[-•*]\s*/, ''))}</li>`;
    return `<p style="font-size:14.5px;color:var(--text-soft);margin:8px 0">${esc(l)}</p>`;
  }).join('').replace(/(<li>.*?<\/li>)+/gs, m => `<ul style="margin:8px 0;padding-left:22px;font-size:14.5px;color:var(--text-soft)">${m}</ul>`);

  const ajoutCard = a => {
    const m = moduleIndex[a.module];
    const nbImg = state.imgCount['ajout:' + a.id] || 0;
    return `<a class="fc" href="#/a/${a.id}" style="--c:${m ? m.couleur : 'var(--accent)'}">
      <div class="fc-top"><div class="fc-emoji">${a.type === 'exercice' ? '🎯' : '✍️'}</div>
        <div><h3>${esc(a.titre)}</h3><div class="fc-sub">${esc(a.prof || 'Ajout personnel')} · ${m ? esc(m.court || m.nom) : ''} · ${new Date(a.date).toLocaleDateString('fr-FR')}</div></div></div>
      <p>${esc((a.texte || '').slice(0, 130))}${(a.texte || '').length > 130 ? '…' : ''}</p>
      <div class="fc-foot"><span class="chip">${a.type === 'exercice' ? '🎯 Exercice' : '📘 Cours'}</span>
        <span>${nbImg ? '🖼 ' + nbImg : ''}${a.lien ? ' 🔗' : ''}</span></div>
    </a>`;
  };

  const renderExercices = () => {
    const parModule = D.modules.map(m => ({
      m, exos: moduleFiles(m).filter(f => EXO_RE.test(f.nom))
    })).filter(x => x.exos.length);
    const totalDrive = parModule.reduce((a, x) => a + x.exos.length, 0);
    const mine = mesExos();
    view.innerHTML = `
      <div class="crumbs"><a href="#/">Accueil</a> <span>›</span> <span>Exercices & TD</span></div>
      <section class="section" style="margin-top:14px">
        <div class="section-head">
          <div><h2>Exercices, TD, QCM & annales</h2>
            <p>${totalDrive} exercices/sujets trouvés sur le Drive · ${mine.length} ajouté(s) par toi.</p></div>
          <a class="btn btn-primary" href="#/ajouter">➕ Ajouter un exercice</a>
        </div>
        <div class="notice" style="margin-bottom:18px"><span>🎯</span>
          <div>Les profs envoient des exercices et des TD pendant le semestre : ajoute-les ici (<b>texte, lien ou photo</b>) et ils resteront dans ton navigateur, à côté des sujets du Drive.</div></div>

        ${mine.length ? `<section class="folder">
          <div class="folder-head"><span class="f-ico">✍️</span><h3>Mes exercices ajoutés</h3><span class="f-count">${mine.length}</span></div>
          <div class="fiche-cards" style="margin-top:14px">${mine.map(ajoutCard).join('')}</div>
        </section>` : ''}

        ${parModule.map(({ m, exos }) => `
          <section class="folder">
            <div class="folder-head"><span class="f-ico">${m.emoji}</span><h3>${esc(m.nom)}</h3>
              <span class="f-count">${exos.length} exercice(s) / sujet(s)</span>
              <a class="f-open" href="#/m/${m.id}">Voir le module →</a></div>
            ${fileList(exos, m.court || m.nom)}
          </section>`).join('')}
      </section>`;
  };

  const renderAjouter = (editId) => {
    const edit = editId ? ajoutIndex(editId) : null;
    view.innerHTML = `
      <div class="crumbs"><a href="#/">Accueil</a> <span>›</span> <span>Ajouter</span></div>
      <section class="section" style="margin-top:14px">
        <div class="section-head"><div><h2>${edit ? 'Modifier mon ajout' : 'Ajouter un cours ou un exercice'}</h2>
          <p>Nouveau cours, TD, exercice envoyé par le prof, ou tes propres notes de cours — tout reste dans ton navigateur.</p></div></div>

        <div class="notes-card" style="max-width:900px">
          <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px">
            <label class="btn btn-ghost" style="cursor:pointer"><input type="radio" name="atype" value="cours" ${(!edit || edit.type === 'cours') ? 'checked' : ''}> 📘 Cours</label>
            <label class="btn btn-ghost" style="cursor:pointer"><input type="radio" name="atype" value="exercice" ${(edit && edit.type === 'exercice') ? 'checked' : ''}> 🎯 Exercice / TD</label>
          </div>
          <div style="display:grid;gap:10px">
            <input id="a-titre" class="a-input" placeholder="Titre (ex. : Cours 4 — Les tissus épithéliaux)" value="${edit ? esc(edit.titre) : ''}">
            <div style="display:flex;gap:10px;flex-wrap:wrap">
              <select id="a-module" class="a-input" style="flex:1 1 200px">${moduleOptions(edit ? edit.module : null)}</select>
              <input id="a-prof" class="a-input" style="flex:1 1 200px" placeholder="Professeur (ex. : Pr. X)" value="${edit ? esc(edit.prof || '') : ''}">
            </div>
            <input id="a-lien" class="a-input" placeholder="Lien (Drive, PDF, vidéo…) — optionnel" value="${edit ? esc(edit.lien || '') : ''}">
            <textarea id="a-texte" style="min-height:190px" placeholder="Écris ici le contenu : les titres sur une ligne commençant par # , les puces par - ...">${edit ? esc(edit.texte || '') : ''}</textarea>
          </div>
          <div class="nc-hint" style="margin-top:8px">📷 Tu peux aussi ajouter des photos (tableau, énoncé du TD, notes manuscrites) — elles s’ajouteront après l’enregistrement.</div>
          <div class="nc-row">
            <button class="btn btn-primary" id="a-save">💾 ${edit ? 'Enregistrer les modifications' : 'Enregistrer'}</button>
            ${edit ? `<a class="btn btn-ghost" href="#/a/${edit.id}">Annuler</a>` : ''}
            <span class="nc-saved" id="a-msg"></span>
          </div>
        </div>

        ${ajouts.length ? `<section class="folder" style="margin-top:26px">
          <div class="folder-head"><span class="f-ico">🗃️</span><h3>Mes ajouts (${ajouts.length})</h3>
            <a class="f-open" href="#/mesnotes">Voir aussi mes notes →</a></div>
          <div class="fiche-cards" style="margin-top:14px">${ajouts.slice().reverse().map(ajoutCard).join('')}</div>
        </section>` : ''}
      </section>`;

    document.getElementById('a-save').addEventListener('click', () => {
      const titre = document.getElementById('a-titre').value.trim();
      if (!titre) { alert('Donne un titre à ton ajout 🙂'); return; }
      const obj = {
        id: edit ? edit.id : 'aj' + Date.now().toString(36),
        type: document.querySelector('input[name=atype]:checked').value,
        titre, module: document.getElementById('a-module').value,
        prof: document.getElementById('a-prof').value.trim(),
        lien: document.getElementById('a-lien').value.trim(),
        texte: document.getElementById('a-texte').value,
        date: edit ? edit.date : new Date().toISOString()
      };
      if (edit) Object.assign(edit, obj); else ajouts.push(obj);
      saveAjouts();
      document.getElementById('a-msg').textContent = '✓ enregistré';
      location.hash = '#/a/' + obj.id;
    });
  };

  const wirePhotos = fid => {
    const drop = document.getElementById('drop'), input = document.getElementById('file-input');
    if (!drop || !input) return;
    drop.addEventListener('click', () => input.click());
    ['dragenter', 'dragover'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('over'); }));
    ['dragleave', 'drop'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove('over'); }));
    drop.addEventListener('drop', e => addFiles(fid, e.dataTransfer.files));
    input.addEventListener('change', () => addFiles(fid, input.files));
  };

  const renderAjout = async id => {
    const token = ++renderSeq;
    const a = ajoutIndex(id);
    if (!a) { renderAjouter(); return; }
    const m = moduleIndex[a.module], fid = 'ajout:' + a.id;
    if (!state.lu[fid]) { state.lu[fid] = new Date().toISOString(); save(false); }
    view.innerHTML = `
      <div class="crumbs"><a href="#/">Accueil</a> <span>›</span> <a href="#/ajouter">Mes ajouts</a> <span>›</span> <span>${esc(a.titre)}</span></div>
      <header class="fiche-head" style="--c:${m ? m.couleur : 'var(--accent)'}">
        <div class="fh-ico">${a.type === 'exercice' ? '🎯' : '✍️'}</div>
        <div style="min-width:0"><h1>${esc(a.titre)}</h1>
          <div class="fh-sub">${esc(a.prof || 'Ajout personnel')}${m ? ' · ' + esc(m.nom) : ''}</div>
          <div class="fh-meta"><span class="chip">${a.type === 'exercice' ? '🎯 Exercice / TD' : '📘 Cours'}</span>
            <span class="chip">🗓 ${new Date(a.date).toLocaleDateString('fr-FR')}</span></div></div>
      </header>
      <div class="fiche-actions">
        <a class="btn btn-ghost" href="#/ajouter/${a.id}">✏️ Modifier</a>
        ${a.lien ? `<a class="btn btn-ghost" href="${esc(a.lien)}" target="_blank" rel="noopener">🔗 Ouvrir le lien ↗</a>` : ''}
        <button class="btn btn-ghost" id="a-del">🗑️ Supprimer</button>
      </div>
      <div class="fiche-grid">
        <aside class="toc"><h4>Sommaire</h4>
          <a href="#contenu">Contenu</a><a href="#photos">📷 Photos</a>
          <div class="toc-sep"></div><h4>Actions</h4>
          <a href="#/ajouter">➕ Ajouter un autre</a><a href="#/exercices">🎯 Exercices</a></aside>
        <div class="fiche-body">
          <section class="fiche-sec" id="contenu"><h2><span class="num">1</span>Contenu</h2>
            ${renderTexte(a.texte) || '<p style="color:var(--muted)">Aucun texte pour l’instant — clique sur « Modifier » pour en ajouter.</p>'}</section>
          <div class="notes-card" id="photos">
            <h3>📷 Photos</h3>
            <div class="nc-hint">Tableau, énoncé du TD, notes manuscrites…</div>
            <div class="drop" id="drop">📷 Glisse tes photos ici ou <b>clique pour choisir</b></div>
            <input type="file" id="file-input" accept="image/*" multiple hidden>
            <div class="gallery" id="gallery" data-fiche="${esc(fid)}"></div>
          </div>
          <div class="lightbox" id="lightbox"><button class="lb-close" id="lb-close">✕</button><img id="lb-img" alt=""></div>
        </div>
      </div>`;

    document.getElementById('a-del').addEventListener('click', async () => {
      if (!confirm('Supprimer définitivement cet ajout (et ses photos) ?')) return;
      const i = ajouts.findIndex(x => x.id === a.id);
      if (i >= 0) ajouts.splice(i, 1);
      saveAjouts();
      try { const imgs = await DB.byFiche(fid); for (const im of imgs) await DB.del(im.id); } catch (e) {}
      await refreshImgCounts();
      location.hash = '#/ajouter';
    });

    await renderGallery(fid);
    if (token !== renderSeq) return;
    wirePhotos(fid);
  };

  /* ====================== TÉLÉCHARGEMENT & EXPORT ====================== */
  const SITE_ZIP = 'telecharger/site-fmdc-s1.zip';

  const flash = (texte, ms = 3200) => {
    let el = document.getElementById('flash');
    if (!el) {
      el = document.createElement('div');
      el.id = 'flash'; el.className = 'flash';
      document.body.appendChild(el);
    }
    el.textContent = texte;
    el.classList.add('on');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('on'), ms);
  };

  const downloadBlob = (nom, blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = nom;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => { if (URL.revokeObjectURL) URL.revokeObjectURL(url); }, 4000);
  };

  const blobToDataURL = blob => new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result); r.onerror = () => rej(r.error);
    r.readAsDataURL(blob);
  });

  const exporterMesDonnees = async () => {
    const msg = document.getElementById('export-msg');
    if (msg) msg.textContent = '⏳ préparation…';
    let imgs = [];
    try { imgs = await DB.all(); } catch (e) {}
    const data = {
      application: 'FMDC S1 — Espace de révision', version: 1, exporte_le: new Date().toISOString(),
      revision: { documents_revises: [...state.revised], favoris: [...state.favs] },
      fiches: { statuts: state.statut, notes: state.notes, surlignages: state.sur, ouvertes: state.lu },
      mesAjouts: ajouts,
      images: imgs.map(i => ({ id: i.id, ficheId: i.ficheId, nom: i.nom, type: i.type, taille: i.taille, date: i.date }))
    };
    for (let k = 0; k < imgs.length; k++) {
      try { data.images[k].data = await blobToDataURL(imgs[k].blob); } catch (e) {}
    }
    downloadBlob(`fmdc-s1-mes-donnees-${new Date().toISOString().slice(0, 10)}.json`,
      new Blob([JSON.stringify(data, null, 1)], { type: 'application/json' }));
    if (msg) msg.textContent = `✓ export fait (${imgs.length} photo(s))`;
  };

  const FICHIER_UNIQUE = 'telecharger/index.html';

  const telechargerFichierUnique = () => {
    if (window.SINGLE_FILE) { flash('Tu es déjà dans la version 1 seul fichier 👍'); return; }
    const a = document.createElement('a');
    a.href = FICHIER_UNIQUE; a.download = 'index.html';
    document.body.appendChild(a); a.click(); a.remove();
    flash('✓ téléchargement lancé — garde le fichier index.html et ouvre-le quand tu veux');
  };

  const telechargerSite = () => {
    if (window.SINGLE_FILE) { flash('Tu es déjà dans la version 1 seul fichier 👍'); return; }
    const a = document.createElement('a');
    a.href = SITE_ZIP; a.download = 'site-fmdc-s1.zip';
    document.body.appendChild(a); a.click(); a.remove();
    const msg = document.getElementById('export-msg');
    if (msg) msg.textContent = '✓ téléchargement lancé — décompresse puis ouvre index.html';
    flash('✓ téléchargement du ZIP lancé (décompresse puis ouvre index.html)');
  };

  /* ------------------------------ PROGRESSION ------------------------------ */
  const save = (rerender = false) => {
    write(LS.rev, [...state.revised]);
    write(LS.fav, [...state.favs]);
    write(LS.statut, state.statut);
    write(LS.notes, state.notes);
    write(LS.sur, state.sur);
    write(LS.lu, state.lu);
    const c = document.getElementById('fav-count');
    if (c) c.textContent = state.favs.size;
    fillFootStats();
  };

  const fillFootStats = () => {
    const s = stats();
    const el = document.getElementById('foot-stats');
    if (el) el.textContent = `${s.fiches} fiches · ${s.files} documents · ${s.pct} % révisé`;
  };

  /* ------------------------------ ÉVÉNEMENTS ------------------------------ */
  view.addEventListener('click', e => {
    const rev = e.target.closest('[data-rev]');
    if (rev) {
      const id = rev.dataset.rev;
      state.revised.has(id) ? state.revised.delete(id) : state.revised.add(id);
      save(); rerender();
      return;
    }
    const fav = e.target.closest('[data-fav]');
    if (fav) {
      const id = fav.dataset.fav;
      state.favs.has(id) ? state.favs.delete(id) : state.favs.add(id);
      save(); rerender();
      return;
    }
    if (e.target.closest('#reset-progress')) {
      if (confirm('Réinitialiser toute la progression de révision (documents) ?')) { state.revised.clear(); save(); rerender(); }
    }
  });

  /* ------------------------------ RECHERCHE ------------------------------ */
  const input = document.getElementById('search');
  const results = document.getElementById('results');

  const searchAll = q => {
    const n = norm(q);
    if (!n) return { fiches: [], files: [] };
    const fiches = FICHES.map(f => {
      const hay = norm(ficheTexte(f) + ' ' + (moduleOf(f) ? moduleOf(f).nom : ''));
      const at = hay.indexOf(n);
      return at < 0 ? null : { f, score: (norm(f.titre).includes(n) ? 0 : 50) + at };
    }).filter(Boolean).sort((a, b) => a.score - b.score).slice(0, 6).map(x => x.f);

    const fichesDocs = new Set(fiches.map(f => f.doc));
    const files = index.map(f => {
      const hay = norm(f.nom + ' ' + f.path.join(' ') + ' ' + (f.module ? f.module.nom : ''));
      const at = hay.indexOf(n);
      return at < 0 ? null : { f, score: (norm(f.nom).includes(n) ? 0 : 100) + at };
    }).filter(Boolean).sort((a, b) => a.score - b.score).slice(0, 14).map(x => x.f)
      .filter(f => !fichesDocs.has(f.id)).slice(0, 8);

    return { fiches, files };
  };

  const showResults = q => {
    if (!q.trim()) { results.hidden = true; results.innerHTML = ''; return; }
    const { fiches, files } = searchAll(q);
    results.hidden = false;
    const total = fiches.length + files.length;
    results.innerHTML = total
      ? (fiches.length ? `<div class="r-head">📘 Fiches de cours</div>` + fiches.map(f => `
          <div class="result" data-fiche="${esc(f.id)}">
            <span>${f.emoji}</span>
            <div><div class="r-name">${esc(f.titre)}</div>
              <div class="r-path">Fiche de cours · ${esc(f.prof)}${moduleOf(f) ? ' › ' + esc(moduleOf(f).court || moduleOf(f).nom) : ''}</div></div>
            <span class="r-go">lire →</span>
          </div>`).join('') : '')
        + (files.length ? `<div class="r-head">${ICONS.file} Documents du Drive</div>` + files.map(f => `
          <div class="result" data-fid="${esc(f.id)}" data-mod="${f.module ? f.module.id : ''}">
            <span>${ICONS[f.type] || '📎'}</span>
            <div><div class="r-name">${esc(f.nom)}</div>
              <div class="r-path">${esc(f.module ? (f.module.court || f.module.nom) : 'Drive S1')}${f.path.length ? ' › ' + esc(f.path.join(' › ')) : ''}</div></div>
            <span class="r-go">↗</span>
          </div>`).join('') : '')
      : `<div class="r-empty">Aucun résultat pour « ${esc(q)} ».</div>`;
  };

  input.addEventListener('input', () => showResults(input.value));
  input.addEventListener('focus', () => input.value.trim() && showResults(input.value));
  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') { input.blur(); results.hidden = true; }
    if (e.key === 'Enter') { const first = results.querySelector('.result'); if (first) openResult(first); }
  });

  const openResult = el => {
    results.hidden = true;
    if (el.dataset.fiche) {
      input.value = '';
      location.hash = '#/f/' + el.dataset.fiche;
      return;
    }
    const fid = el.dataset.fid;
    const f = index.find(x => x.id === fid);
    if (!f) return;
    window.open(fileUrl(fid), '_blank', 'noopener');
    if (f.module) { input.value = ''; state.pending = fid; location.hash = '#/m/' + f.module.id; }
  };
  results.addEventListener('click', e => { const r = e.target.closest('.result'); if (r) openResult(r); });
  document.addEventListener('click', e => { if (!e.target.closest('#search-box')) results.hidden = true; });
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== input) { e.preventDefault(); input.focus(); showResults(input.value); }
    if (e.key === 'Escape') document.getElementById('lightbox')?.classList.remove('open');
  });

  /* ------------------------------ THÈME & MENU ------------------------------ */
  document.getElementById('theme-btn').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    write(LS.theme, next);
  });
  document.getElementById('menu-btn').addEventListener('click', () => document.getElementById('top-nav').classList.toggle('open'));
  document.querySelectorAll('#top-nav a').forEach(a => a.addEventListener('click', () => document.getElementById('top-nav').classList.remove('open')));

  /* ------------------------------ ROUTAGE ------------------------------ */
  const routes = {
    '': renderHome, 'modules': renderModules, 'fiches': renderFiches,
    'annales': renderAnnales, 'favoris': renderFavoris, 'stats': renderStats,
    'mesnotes': renderMesNotes, 'exercices': renderExercices, 'ajouter': renderAjouter,
    'a-propos': renderAbout
  };

  const rerender = () => route(false);

  const route = async (scroll = true) => {
    renderSeq++;                                  // invalide tout rendu asynchrone en cours
    const h = location.hash.replace(/^#\/?/, '');
    const parts = h.split('/').filter(Boolean);
    hideHl();

    if (parts[0] === 'm' && parts[1] && moduleIndex[parts[1]]) renderModule(parts[1]);
    else if (parts[0] === 'f' && parts[1] && ficheIndex[parts[1]]) await renderFiche(parts[1]);
    else if (parts[0] === 'a' && parts[1] && ajoutIndex(parts[1])) await renderAjout(parts[1]);
    else if (parts[0] === 'ajouter' && parts[1] && ajoutIndex(parts[1])) renderAjouter(parts[1]);
    else if (routes[parts[0] || '']) routes[parts[0] || '']();
    else renderHome();

    document.querySelectorAll('#top-nav a').forEach(a => {
      const k = a.dataset.nav;
      const on =
        (k === 'home' && !parts[0]) ||
        (k === 'modules' && ['modules', 'm'].includes(parts[0])) ||
        (k === 'fiches' && ['fiches', 'f'].includes(parts[0])) ||
        (k === 'annales' && parts[0] === 'annales') ||
        (k === 'stats' && parts[0] === 'stats') ||
        (k === 'mesnotes' && parts[0] === 'mesnotes') ||
        (k === 'exercices' && parts[0] === 'exercices') ||
        (k === 'ajouter' && ['ajouter', 'a'].includes(parts[0])) ||
        (k === 'favoris' && parts[0] === 'favoris');
      a.classList.toggle('active', on);
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

  /* ------------------------------ INIT ------------------------------ */
  const drive = D.meta.driveUrl;
  document.getElementById('drive-btn').href = drive;
  document.getElementById('drive-foot').href = drive;
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('fav-count').textContent = state.favs.size;

  // délégation : les boutons sont recréés à chaque rendu de page
  document.addEventListener('click', e => {
    const one = e.target.closest('[data-download-single]');
    if (one) { e.preventDefault(); telechargerFichierUnique(); return; }
    const d = e.target.closest('[data-download-site]');
    if (d) { e.preventDefault(); telechargerSite(); return; }
    const x = e.target.closest('[data-export-data]');
    if (x) { e.preventDefault(); exporterMesDonnees(); }
  });

  route(false);
  fillFootStats();
  refreshImgCounts();
})();
