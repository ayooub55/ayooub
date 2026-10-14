/* ================================================================
   FMDC 1A — Espace de révision · application (vanilla JS, sans build)
   ================================================================ */
(function () {
  'use strict';

  const D = window.DRIVE;
  const VIEW = document.getElementById('view');
  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  /* ---------------------------- état local ---------------------------- */
  const LS_SEEN = 'fmdc.seen.v1';
  const LS_FAV  = 'fmdc.fav.v1';
  const LS_THM  = 'fmdc.theme.v1';

  const load = (k) => { try { return JSON.parse(localStorage.getItem(k)) || {}; } catch (e) { return {}; } };
  let seen = load(LS_SEEN);
  let favs = load(LS_FAV);
  const saveSeen = () => localStorage.setItem(LS_SEEN, JSON.stringify(seen));
  const saveFavs = () => localStorage.setItem(LS_FAV, JSON.stringify(favs));

  /* ---------------------------- utilitaires --------------------------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fileUrl   = (id) => `https://drive.google.com/file/d/${id}/view`;
  const folderUrl = (id) => `https://drive.google.com/drive/folders/${id}`;

  const ICONS = [
    [/\.pdf$/i, '📄', 'PDF'], [/\.mp4$|\.mov$|\.avi$/i, '🎬', 'Vidéo'],
    [/\.jpe?g$|\.png$|\.webp$/i, '🖼️', 'Image'], [/\.pptx?$/i, '📊', 'Diapos'],
    [/\.docx?$|\.txt$/i, '📝', 'Texte'], [/\.xlsx?$/i, '📈', 'Tableur'],
    [/\.zip$|\.rar$/i, '🗜️', 'Archive']
  ];
  function kindOf(name) {
    for (const [re, icon, label] of ICONS) if (re.test(name)) return { icon, label };
    return { icon: '📃', label: 'Google Docs' };  // documents créés dans Drive (sans extension)
  }

  /* parcourt récursivement l'arbre d'un module */
  function walk(node, path, out) {
    const here = node.nom ? path.concat(node.nom) : path;
    (node.fichiers || []).forEach(([name, id]) => out.push({ name, id, path: here.slice() }));
    (node.sections || []).forEach(child => walk(child, here, out));
    return out;
  }
  const filesOf = (moduleOrNode) => walk(moduleOrNode, [], []);

  const moduleFiles = (mod) => filesOf({ sections: mod.profs });
  const modStats = (mod) => {
    const files = moduleFiles(mod);
    const done = files.filter(f => seen[f.id]).length;
    return { total: files.length, done, pct: files.length ? Math.round(done * 100 / files.length) : 0 };
  };
  const totalFiles = () => D.modules.reduce((n, m) => n + moduleFiles(m).length, 0);
  const totalSeen  = () => D.modules.reduce((n, m) => n + moduleFiles(m).filter(f => seen[f.id]).length, 0);

  /* ------------------------------ vues ------------------------------- */
  function fileRow(f, showPath) {
    const k = kindOf(f.name);
    const isSeen = !!seen[f.id], isFav = !!favs[f.id];
    return `<li class="${isSeen ? 'seen' : ''}" data-fid="${f.id}">
      <span class="type" title="${esc(k.label)}">${k.icon}</span>
      <span style="min-width:0">
        <a class="name" href="${fileUrl(f.id)}" target="_blank" rel="noopener">${esc(f.name)}</a>
        ${showPath && f.path.length ? `<div class="path">${esc(f.path.join(' › '))}</div>` : ''}
      </span>
      <span class="actions">
        <button class="mini-btn ${isFav ? 'on' : ''}" data-act="fav" title="Ajouter aux favoris">★</button>
        <button class="mini-btn ${isSeen ? 'done' : ''}" data-act="seen" title="Marquer comme révisé">✓</button>
        <button class="mini-btn" data-act="copy" title="Copier le lien">🔗</button>
      </span>
    </li>`;
  }

  function nodeHtml(node, depth) {
    const kids = node.sections || [];
    const files = node.fichiers || [];
    const count = filesOf(node).length;

    if (kids.length && !files.length && node.nom) {           // groupe / professeur
      const open = depth <= 1;
      const inner = kids.map(k => nodeHtml(k, depth + 1)).join('');
      const st = (() => {
        const all = filesOf(node);
        const done = all.filter(f => seen[f.id]).length;
        return all.length ? `${done}/${all.length}` : '';
      })();
      return `<section class="prof-block ${open ? '' : 'closed'}" id="p-${esc(slug(node.nom))}">
        <div class="prof-head" data-toggle>
          <h3>${esc(node.nom)}</h3>
          <span class="tagline">${count} fichier${count > 1 ? 's' : ''}</span>
          <span class="right">
            ${st ? `<span class="count">${st} révisés</span>` : ''}
            ${node.folder ? `<a class="drive-link" href="${folderUrl(node.folder)}" target="_blank" rel="noopener">Drive ↗</a>` : ''}
            <span class="chev">▾</span>
          </span>
        </div>
        <div class="prof-body">${inner}</div>
      </section>`;
    }

    // section terminale (liste de fichiers, éventuellement + sous-groupes)
    const list = files.length
      ? `<ul class="files">${files.map(([name, id]) => fileRow({ name: name, id: id })).join('')}</ul>` : '';
    const nested = kids.map(k => nodeHtml(k, depth + 1)).join('');
    const note = node.note ? `<div class="note">${esc(node.note)}</div>` : '';
    const showHead = depth > 1 || true;
    return `<div class="sect" id="s-${esc(slug((node.nom || '') + '-' + depth))}">
      ${showHead ? `<div class="sect-head" data-toggle>
        <h4>${esc(node.nom || 'Documents')}</h4>
        <span class="count">${count} fichier${count > 1 ? 's' : ''}</span>
        <span class="right">${files.length && node.folder ? `<a class="drive-link" href="${folderUrl(node.folder)}" target="_blank" rel="noopener">Drive ↗</a>` : ''}</span>
      </div>` : ''}
      ${note}${list}${nested}
    </div>`;
  }

  const slug = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  function breadcrumb(parts) {
    return `<div class="breadcrumb">${parts.map((p, i) =>
      i === parts.length - 1 ? `<b>${esc(p.t)}</b>` : `<a href="${p.h}">${esc(p.t)}</a>`).join(' › ')}</div>`;
  }

  function renderHome() {
    const tf = totalFiles(), ts = totalSeen();
    const pct = tf ? Math.round(ts * 100 / tf) : 0;
    VIEW.innerHTML = `
      <section class="hero">
        <h1>Espace de révision — 1<sup>re</sup> année Médecine dentaire</h1>
        <p>${esc(D.meta.faculte)} · Promotion 2024-2025. Tous les cours, TD, TP, résumés, tutorats et annales du
        Drive de la promo, rangés module par module et professeur par professeur — avec les conseils d'examen
        donnés par chaque enseignant.</p>
        <div class="chips">
          <a class="chip" href="#/modules">📚 ${D.modules.length} modules</a>
          <a class="chip" href="#/notes">💡 Notes d'examen par prof</a>
          <a class="chip" href="#/formation">🎓 Formation S1 → S12</a>
          <a class="chip" href="${D.meta.drive}" target="_blank" rel="noopener">📁 Drive d'origine</a>
        </div>
        <div class="dua">${esc(D.message.dua)}</div>
      </section>

      <div class="stats">
        <div class="stat"><b>${tf}</b><span>documents référencés</span></div>
        <div class="stat"><b>${D.modules.length}</b><span>modules du S1</span></div>
        <div class="stat"><b>${ts}</b><span>documents révisés</span></div>
        <div class="stat"><b>${pct} %</b><span>de progression globale</span></div>
      </div>

      <div class="sec-head">
        <h2>Modules du semestre 1</h2>
        <span class="hint">Cliquez sur un module pour ouvrir ses cours par professeur</span>
      </div>
      <div class="grid">${D.modules.map(card).join('')}</div>

      <div class="sec-head"><h2>À ne pas manquer avant l'examen</h2>
        <span class="spacer"></span><a class="chip" href="#/notes">Tout voir</a></div>
      <div class="tips">
        ${D.notes.slice(0, 3).map(n => `
          <div class="tip" style="--accent:${'#2f9e8f'}">
            <h3>${n.emoji} ${esc(n.matiere)}</h3>
            <div class="fmt">Format : ${esc(n.format)}</div>
            ${n.profs.slice(0, 2).map(p => `<div class="item"><div class="who">${esc(p.prof)}</div>
              <p>${esc(p.texte)}</p></div>`).join('')}
          </div>`).join('')}
      </div>

      <div class="sec-head"><h2>Bienvenue dans la promo</h2></div>
      <div class="card" style="--accent:#8b7d3f">
        <p class="desc">${esc(D.message.merci)}</p>
        <div class="meta"><span>📄 Notes Promo 2024-25.txt</span><span>🖼️ PROMO.jpg</span></div>
      </div>`;
  }

  const card = (m) => {
    const s = modStats(m);
    return `<a class="card" style="--accent:${m.couleur}" href="#/m/${m.id}">
      <div class="top"><span class="emo">${m.emoji}</span>
        <div><h3>${esc(m.nom)}</h3><div class="sub">${esc(m.format)}</div></div></div>
      <div class="meta"><span>👤 ${m.profs.length} rubriques</span><span>📄 ${s.total} fichiers</span><span>✅ ${s.done} révisés</span></div>
      <div class="bar"><i style="width:${s.pct}%"></i></div>
    </a>`;
  };

  function renderModules() {
    VIEW.innerHTML = `
      <div class="sec-head"><h2>Tous les modules du S1</h2>
        <span class="hint">${totalFiles()} documents · ${D.modules.length} modules</span></div>
      <div class="grid">${D.modules.map(card).join('')}</div>`;
  }

  function renderModule(id) {
    const m = D.modules.find(x => x.id === id);
    if (!m) { render404(); return; }
    const s = modStats(m);
    const toc = m.profs.map(p =>
      `<button class="chip" data-jump="p-${esc(slug(p.nom))}">${esc(p.nom)}</button>`).join('');
    VIEW.innerHTML = `
      ${breadcrumb([{ t: 'Modules', h: '#/modules' }, { t: m.nom }])}
      <section class="hero" style="--accent:${m.couleur}">
        <h1>${m.emoji} ${esc(m.nom)}</h1>
        <p>Format d'évaluation : ${esc(m.format)} — ${s.total} documents, dont ${s.done} déjà révisés (${s.pct} %).</p>
        <div class="chips">
          <a class="chip" href="${folderUrl(m.folder)}" target="_blank" rel="noopener">📁 Dossier du module sur le Drive</a>
          <a class="chip" href="#/notes">💡 Conseils d'examen de ce module</a>
        </div>
        <div class="bar" style="margin-top:16px"><i style="width:${s.pct}%;background:${m.couleur}"></i></div>
      </section>
      <div class="sec-head" style="margin-top:6px"><h2>Accès rapide</h2>
        <span class="spacer"></span>
        <button class="icon-btn" id="collapse-all">Tout replier</button>
        <button class="icon-btn" id="expand-all">Tout déplier</button>
      </div>
      <div class="chips" style="margin-bottom:16px">${toc}</div>
      ${m.profs.map(p => nodeHtml(p, 1)).join('')}`;

    $('#collapse-all').onclick = () => $$('.prof-block, .sect', VIEW).forEach(el => el.classList.add('closed'));
    $('#expand-all').onclick   = () => $$('.prof-block, .sect', VIEW).forEach(el => el.classList.remove('closed'));
    if (VIEW.scrollIntoView) VIEW.scrollIntoView({ block: 'start' });
  }

  function renderNotes() {
    VIEW.innerHTML = `
      <div class="sec-head"><h2>💡 Notes d'examen — Promo 2024-25</h2>
        <span class="hint">Conseils donnés par les professeurs : chapitres insistés, parties retirées, format d'épreuve</span></div>
      <div class="note" style="margin-bottom:18px">Source : document « Notes Promo 2024-25.txt » du Drive, rédigé et partagé par la promotion.</div>
      <div class="tips">
        ${D.notes.map(n => `
          <div class="tip" style="--accent:#2f9e8f">
            <h3>${n.emoji} ${esc(n.matiere)}</h3>
            <div class="fmt">Format : ${esc(n.format)}</div>
            ${n.profs.map(p => `<div class="item">
              <div class="who">${esc(p.prof)}</div>
              <p>${esc(p.texte)}</p>
              <div class="tags">${(p.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
            </div>`).join('')}
          </div>`).join('')}
      </div>
      <div class="sec-head"><h2>Message de la promo</h2></div>
      <div class="card" style="--accent:#8b7d3f">
        <p class="desc">${esc(D.message.merci)}</p>
        <div class="dua">${esc(D.message.dua)}</div>
      </div>`;
  }

  function renderFavoris() {
    const rows = [];
    D.modules.forEach(m => moduleFiles(m).forEach(f => { if (favs[f.id]) rows.push({ ...f, mod: m }); }));
    VIEW.innerHTML = `
      <div class="sec-head"><h2>⭐ Mes favoris</h2><span class="hint">${rows.length} document(s) — stockés dans ce navigateur</span></div>
      ${rows.length ? `<ul class="results">${rows.map(f => fileRow({ ...f, path: [f.mod.court].concat(f.path) }, true)).join('')}</ul>`
        : `<div class="empty">Aucun favori pour l'instant. Utilisez l'étoile ★ à côté d'un document pour l'ajouter ici.</div>`}
      <div class="sec-head"><h2>✅ Déjà révisés</h2></div>
      <div class="empty">${totalSeen()} document(s) sur ${totalFiles()} marqués comme révisés. La progression se met à jour automatiquement dans le menu.</div>`;
  }

  function renderFormation() {
    VIEW.innerHTML = `
      <div class="sec-head"><h2>🎓 Modules de formation S1 → S12</h2>
        <span class="hint">D'après « Modules De Formation.pdf » (FMDC Casablanca)</span></div>
      <div class="card" style="--accent:#3b82f6; margin-bottom:18px">
        <table class="table">
          <thead><tr><th>Semestre</th><th>Modules disciplinaires (et modules transversaux)</th></tr></thead>
          <tbody>
            ${D.formation.map(f => `<tr><td class="sem">${esc(f.semestre)}</td>
              <td><ul style="margin:0;padding-left:18px">${f.modules.map(x => `<li>${esc(x)}</li>`).join('')}</ul></td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="card" style="--accent:#64748b">
        <h3 style="margin:0 0 6px">Modules capitalisés — 1<sup>re</sup> année 2024-2025</h3>
        <p class="desc">La liste nominative des étudiants concernés et des modules à repasser est disponible dans le
        document « Modules capitalisés_1A_2024-2025.pdf ».</p>
        <a class="chip" href="${fileUrl('1Ao0ZvzfbqdkTIUKDnGB3wIVI2ldo-q_v')}" target="_blank" rel="noopener">Ouvrir le document ↗</a>
      </div>`;
  }

  function renderLiens() {
    const L = D.liens;
    const pl = (urls, title) => urls.length ? `
      <div class="item" style="border-top:1px solid var(--line); padding-top:10px; margin-top:6px">
        <div class="who">${esc(title)}</div>
        <div class="playlist" style="margin-top:8px">
          ${urls.map((u, i) => `<a class="chip" href="${u}" target="_blank" rel="noopener">▶ Vidéo ${i + 1}</a>`).join('')}
        </div>
      </div>` : '';
    VIEW.innerHTML = `
      <div class="sec-head"><h2>🔗 Liens & ressources utiles</h2>
        <span class="hint">Chaînes YouTube, playlists et documents conseillés par la promo</span></div>
      <div class="card" style="--accent:#64748b">
        ${L.chaines.map(c => `<div class="link-row">
          <span class="ic">${c.url.includes('youtube') || c.url.includes('youtu.be') ? '▶️' : '📁'}</span>
          <div><a href="${c.url}" target="_blank" rel="noopener">${esc(c.nom)}</a>
          <div class="desc">${esc(c.desc)}</div></div>
        </div>`).join('')}
        ${pl(L.physioSabry, 'Playlist Physiologie — recommandée par la promo (Pr. Sabry)')}
        ${pl(L.biochimieKhlil, 'Playlist Biochimie — tutorats (Pr. Khlil)')}
        <div class="item" style="border-top:1px solid var(--line); padding-top:10px; margin-top:6px">
          <div class="who">Biologie cellulaire — membrane plasmique</div>
          <div class="playlist" style="margin-top:8px">
            <a class="chip" href="${L.membraneCellulaire}" target="_blank" rel="noopener">📁 Dossier Drive</a>
          </div>
        </div>
      </div>

      <div class="sec-head"><h2>📄 Fichiers à la racine du Drive</h2></div>
      <ul class="results">${D.racine.map(([n, id]) => fileRow({ name: n, id, path: ['Racine du Drive'] })).join('')}</ul>`;
  }

  /* --------------------------- recherche ----------------------------- */
  let INDEX = null;
  function buildIndex() {
    if (INDEX) return INDEX;
    INDEX = [];
    D.modules.forEach(m => {
      walk({ sections: m.profs.map(p => ({ ...p })) }, [], [])
        .forEach(f => INDEX.push({ name: f.name, id: f.id, mod: m, path: [m.court].concat(f.path) }));
    });
    D.racine.forEach(([n, id]) => INDEX.push({ name: n, id, mod: null, path: ['Racine du Drive'] }));
    return INDEX;
  }
  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  function renderSearch(q) {
    const nq = norm(q).trim();
    if (nq.length < 2) { route(); return; }
    const terms = nq.split(/\s+/);
    const hits = buildIndex().filter(f => {
      const hay = norm(f.name + ' ' + f.path.join(' '));
      return terms.every(t => hay.includes(t));
    }).slice(0, 120);
    const byMod = {};
    hits.forEach(h => { const k = h.mod ? h.mod.nom : 'Racine du Drive'; (byMod[k] = byMod[k] || []).push(h); });

    VIEW.innerHTML = `
      <div class="sec-head"><h2>🔍 Résultats pour « ${esc(q)} »</h2>
        <span class="hint">${hits.length} document(s)</span></div>
      ${hits.length ? Object.keys(byMod).map(k => `
        <div class="sec-head"><h2 style="font-size:15px">${esc(k)}</h2></div>
        <ul class="results">${byMod[k].map(f => fileRow(f, true)).join('')}</ul>`).join('')
      : `<div class="empty">Aucun document trouvé. Essayez « rein », « QCM », « résumé », « anatomie »…</div>`}`;
  }

  function render404() { VIEW.innerHTML = `<div class="empty">Page introuvable. <a href="#/">Retour à l'accueil</a></div>`; }

  /* ----------------------------- routeur ----------------------------- */
  function route() {
    const h = location.hash.replace(/^#\/?/, '');
    const parts = h.split('/').filter(Boolean);
    closeNav();

    let active = '';
    if (!parts.length) { renderHome(); active = 'home'; }
    else if (parts[0] === 'modules') { renderModules(); active = 'modules'; }
    else if (parts[0] === 'm' && parts[1]) { renderModule(parts[1]); active = 'modules'; }
    else if (parts[0] === 'notes') { renderNotes(); active = 'notes'; }
    else if (parts[0] === 'favoris') { renderFavoris(); active = 'favoris'; }
    else if (parts[0] === 'formation') { renderFormation(); active = 'formation'; }
    else if (parts[0] === 'liens') { renderLiens(); active = 'liens'; }
    else render404();

    $$('.nav a').forEach(a => a.classList.toggle('active', a.dataset.nav === active));
    $$('.side-mods a').forEach(a => a.classList.toggle('active', h === a.dataset.h));
    if (window.scrollTo) { try { window.scrollTo({ top: 0 }); } catch (e) { /* ignoré */ } }
  }

  /* --------------------------- interactions -------------------------- */
  document.addEventListener('click', (e) => {
    const toggle = e.target.closest('[data-toggle]');
    if (toggle) {
      const block = toggle.closest('.prof-block, .sect');
      if (block) { block.classList.toggle('closed'); return; }
    }
    const jump = e.target.closest('[data-jump]');
    if (jump) {
      const el = document.getElementById(jump.dataset.jump);
      if (el) { el.classList.remove('closed'); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      return;
    }
    const btn = e.target.closest('[data-act]');
    if (btn) {
      const li = btn.closest('li[data-fid]');
      const id = li && li.dataset.fid;
      if (!id) return;
      e.preventDefault();
      const act = btn.dataset.act;
      if (act === 'seen') {
        if (seen[id]) delete seen[id]; else seen[id] = 1;
        saveSeen(); li.classList.toggle('seen', !!seen[id]); btn.classList.toggle('done', !!seen[id]);
        refreshSidebar(); toast(seen[id] ? 'Marqué comme révisé ✓' : 'Marque de révision retirée');
      } else if (act === 'fav') {
        if (favs[id]) delete favs[id]; else favs[id] = 1;
        saveFavs(); btn.classList.toggle('on', !!favs[id]);
        refreshSidebar(); toast(favs[id] ? 'Ajouté aux favoris ★' : 'Retiré des favoris');
        if (location.hash.startsWith('#/favoris')) renderFavoris();
      } else if (act === 'copy') {
        navigator.clipboard?.writeText(fileUrl(id)).then(
          () => toast('Lien du document copié 🔗'),
          () => toast('Copie impossible — ouvrez le document puis copiez l’URL'));
      }
    }
  });

  const search = $('#search');
  let searchTimer = null;
  search.addEventListener('input', () => {
    clearTimeout(searchTimer);
    const q = search.value;
    searchTimer = setTimeout(() => (q.trim().length >= 2 ? renderSearch(q) : route()), 120);
  });
  search.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { search.value = ''; search.blur(); route(); }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== search) { e.preventDefault(); search.focus(); }
  });

  /* thème */
  const applyTheme = (t) => { document.documentElement.dataset.theme = t; localStorage.setItem(LS_THM, t); };
  applyTheme(localStorage.getItem(LS_THM) || 'dark');
  $('#theme-btn').onclick = () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');

  /* navigation mobile */
  const closeNav = () => document.body.classList.remove('nav-open');
  $('#menu-btn').onclick = () => document.body.classList.toggle('nav-open');
  $('#scrim').onclick = closeNav;

  /* progression */
  $('#reset-progress').onclick = (e) => {
    e.preventDefault();
    if (!confirm('Réinitialiser la progression et les repères de révision ?')) return;
    seen = {}; saveSeen(); refreshSidebar(); route(); toast('Progression réinitialisée');
  };

  function refreshSidebar() {
    $('#badge-modules').textContent = D.modules.length;
    $('#badge-favs').textContent = Object.keys(favs).length;
    $('#side-mods').innerHTML = D.modules.map(m => {
      const s = modStats(m);
      return `<a href="#/m/${m.id}" data-h="m/${m.id}">
        <span class="dot" style="background:${m.couleur}"></span>
        <span>${esc(m.court)}</span>
        <span class="mini">${s.done}/${s.total}</span></a>`;
    }).join('');
    const tf = totalFiles(), ts = totalSeen();
    $('#side-progress').textContent = `Progression : ${tf ? Math.round(ts * 100 / tf) : 0} % (${ts}/${tf})`;
  }

  function toast(msg) {
    let t = $('#toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast';
      t.style.cssText = 'position:fixed;left:50%;bottom:26px;transform:translateX(-50%);z-index:100;' +
        'background:var(--panel);border:1px solid var(--line);color:var(--txt);padding:10px 16px;' +
        'border-radius:12px;font-size:13.5px;box-shadow:var(--shadow);opacity:0;transition:opacity .2s';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = '1';
    clearTimeout(t._h);
    t._h = setTimeout(() => { t.style.opacity = '0'; }, 1900);
  }

  /* ------------------------------ init ------------------------------- */
  $('#drive-btn').href = D.meta.drive;
  refreshSidebar();
  window.addEventListener('hashchange', route);
  route();
})();
