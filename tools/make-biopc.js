#!/usr/bin/env node
/* Génère biopc/index.html : UNE SEULE PAGE AUTONOME (CSS+JS inline, ouvrable sans Internet)
   qui explique TOUT le cours biopc.pdf (Pr. Bouzoubaa) dans l'ordre du Drive,
   avec sections détaillées + QCM interactif. Source des contenus : data/cours-sciences.js */
const fs = require('fs');
const path = require('path');
global.window = {};
require(path.join(__dirname, '..', 'data', 'cours-imd.js'));
require(path.join(__dirname, '..', 'data', 'cours-sciences.js'));
const F = global.window.FICHES.find(f => f.id === 'biophy-radiologie');
if (!F) { console.error('fiche introuvable'); process.exit(1); }

const PARTS = [
  { t: 'Partie I — Principes physiques des rayons X', ids: ['historique', 'definition', 'production', 'photo', 'compton'] },
  { t: 'Partie II — Initiation à la radiologie', ids: ['radiodef', 'source', 'objet', 'film', 'dev', 'num', 'geo'] },
  { t: 'Partie III — Radiobiologie & radioprotection', ids: ['rpdef', 'expo', 'doses', 'effets', 'principes', 'regles', 'cabinet', 'patient', 'recap'] }
];
const byId = id => F.sections.find(s => s.id === id);
const num = id => F.sections.indexOf(byId(id)) + 1;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---------- corps : sections groupées par partie ---------- */
let body = '';
const planSec = byId('plan');
body += `<section class="sec intro" id="sec-plan">
  <h2><span class="num">1</span>${esc(planSec.titre)}</h2>
  ${planSec.html}
</section>\n`;

for (const p of PARTS) {
  body += `<div class="part"><h2 class="part-t">${esc(p.t)}</h2></div>\n`;
  for (const id of p.ids) {
    const s = byId(id);
    body += `<section class="sec" id="sec-${esc(s.id)}">
  <h2><span class="num">${num(id)}</span>${esc(s.titre)}</h2>
  ${s.html}
</section>\n`;
  }
}

/* ---------- à retenir / pièges ---------- */
body += `<div class="part"><h2 class="part-t">Synthèse pour la veille de l'examen</h2></div>
<section class="sec" id="sec-retenir">
  <h2><span class="num">✓</span>À retenir absolument (${F.retenir.length} points)</h2>
  <ul class="biglist">${F.retenir.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
</section>
<section class="sec" id="sec-pieges">
  <h2><span class="num warn">!</span>Pièges classiques des QCM (${F.pieges.length})</h2>
  <ul class="biglist pieges">${F.pieges.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
</section>\n`;

/* ---------- QCM ---------- */
body += `<div class="part"><h2 class="part-t">🎯 QCM d'auto-évaluation — ${F.qcm.length} questions</h2></div>
<section class="sec" id="sec-qcm">
  <p class="qcm-hint">Clique sur ta réponse : correction immédiate + explication. Le score se met à jour tout seul.</p>
  <div class="qcm-list">\n`;
F.qcm.forEach((q, i) => {
  body += `    <div class="qcm-q" data-ans="${q.ans}">
      <div class="qcm-qt"><span class="qnum">Q${i + 1}</span>${esc(q.q)}</div>
      <div class="qcm-opts">${q.opts.map((o, j) => `<button class="qcm-opt" data-o="${j}"><b>${String.fromCharCode(65 + j)}.</b> ${esc(o)}</button>`).join('')}</div>
      <div class="qcm-expl" hidden>💡 ${esc(q.expl || '')}</div>
    </div>\n`;
});
body += `  </div>
  <div class="qcm-foot">
    <span class="qcm-score" id="qcm-score">0 / ${F.qcm.length}</span>
    <button class="btn" id="qcm-reset">↺ Recommencer le QCM</button>
  </div>
</section>\n`;

/* ---------- sommaire ---------- */
let toc = `<nav class="toc"><div class="toc-in">
  <div class="toc-col"><h4>📖 Plan & Partie I</h4>
    <a href="#sec-plan">1. ${esc(planSec.titre)}</a>\n`;
for (const id of PARTS[0].ids) toc += `    <a href="#sec-${id}">${num(id)}. ${esc(byId(id).titre)}</a>\n`;
toc += `  </div>\n  <div class="toc-col"><h4>${esc(PARTS[1].t)}</h4>\n`;
for (const id of PARTS[1].ids) toc += `    <a href="#sec-${id}">${num(id)}. ${esc(byId(id).titre)}</a>\n`;
toc += `  </div>\n  <div class="toc-col"><h4>${esc(PARTS[2].t)}</h4>\n`;
for (const id of PARTS[2].ids) toc += `    <a href="#sec-${id}">${num(id)}. ${esc(byId(id).titre)}</a>\n`;
toc += `  </div>\n  <div class="toc-col"><h4>✍️ Révision</h4>
    <a href="#sec-retenir">✓ À retenir (${F.retenir.length})</a>
    <a href="#sec-pieges">! Pièges (${F.pieges.length})</a>
    <a href="#sec-qcm">🎯 QCM (${F.qcm.length})</a>
  </div>
</div></nav>\n`;

const CSS = `
:root{--ink:#101418;--soft:#4b5563;--bg:#f6f7f9;--card:#fff;--line:#e3e7ec;--acc:#1d4ed8;--acc2:#f5b301;--ok:#15803d;--ko:#dc2626;--rad:14px}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;font:16px/1.65 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;color:var(--ink);background:var(--bg)}
header.top{background:#0b0d10;color:#fff;padding:34px 18px 26px;text-align:center}
header.top .kicker{color:var(--acc2);font-weight:700;letter-spacing:.14em;text-transform:uppercase;font-size:12px}
header.top h1{margin:10px auto 6px;max-width:860px;font-size:clamp(22px,4vw,34px);line-height:1.25}
header.top p{margin:4px auto;max-width:760px;color:#cbd5e1;font-size:14.5px}
header.top .badges{margin-top:14px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
header.top .badges span{background:#1f242b;border:1px solid #333a44;border-radius:999px;padding:4px 12px;font-size:12.5px;color:#e5e7eb}
.wrap{max-width:1020px;margin:0 auto;padding:0 16px 70px}
nav.toc{background:var(--card);border:1px solid var(--line);border-radius:var(--rad);margin:22px 0 8px;padding:16px}
.toc-in{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px}
.toc-col h4{margin:2px 0 8px;font-size:13px;color:var(--acc);text-transform:uppercase;letter-spacing:.05em}
.toc-col a{display:block;padding:4px 8px;border-radius:8px;color:var(--ink);text-decoration:none;font-size:13.5px}
.toc-col a:hover{background:#eef2ff;color:var(--acc)}
.part{margin:44px 0 0}
.part-t{background:#0b0d10;color:var(--acc2);font-size:clamp(17px,2.6vw,22px);padding:12px 18px;border-radius:var(--rad) var(--rad) 0 0;margin:0;border-bottom:3px solid var(--acc2)}
.sec{background:var(--card);border:1px solid var(--line);border-top:0;padding:22px 22px 18px;scroll-margin-top:14px}
.sec.intro{border:1px solid var(--line);border-radius:var(--rad);margin-top:18px}
.sec:last-of-type{border-radius:0 0 var(--rad) var(--rad)}
.sec h2{font-size:19px;margin:2px 0 14px;display:flex;align-items:center;gap:10px;line-height:1.35}
.sec h2 .num{flex:0 0 auto;background:var(--acc);color:#fff;border-radius:8px;font-size:13px;font-weight:700;padding:3px 9px}
.sec h2 .num.warn{background:var(--ko)}
.sec p{margin:10px 0}
.sec ul,.sec ol{margin:10px 0;padding-left:22px}
.sec li{margin:5px 0}
table{width:100%;border-collapse:collapse;margin:12px 0;font-size:14.5px;background:#fff}
th,td{border:1px solid var(--line);padding:8px 10px;text-align:left;vertical-align:top}
th{background:#eef2ff;font-size:13.5px}
tr:nth-child(even) td{background:#fafbfc}
pre.sch{background:#0b0d10;color:#e8eaed;border-radius:10px;padding:14px 16px;overflow-x:auto;font:12.5px/1.55 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;margin:12px 0}
.keys{background:#fff8e1;border:1px solid #f0d47a;border-left:5px solid var(--acc2);border-radius:10px;padding:10px 14px;margin:14px 0;font-size:14.5px}
.quote{background:#eef2ff;border-left:5px solid var(--acc);border-radius:10px;padding:10px 14px;margin:12px 0}
.biglist{columns:1;padding-left:22px}
.biglist li{margin:7px 0}
.biglist.pieges li{color:#7f1d1d}
.qcm-hint{color:var(--soft);font-size:14px}
.qcm-q{border:1px solid var(--line);border-radius:12px;padding:14px;margin:12px 0;background:#fff}
.qcm-qt{font-weight:600;margin-bottom:10px}
.qnum{display:inline-block;background:var(--acc);color:#fff;border-radius:6px;font-size:11px;font-weight:700;padding:1px 7px;margin-right:8px}
.qcm-opts{display:grid;gap:7px}
.qcm-opt{text-align:left;padding:9px 12px;border:1px solid var(--line);background:#fbfcfd;border-radius:9px;font-size:14px;cursor:pointer;color:var(--ink);font-family:inherit;transition:border-color .15s,background .15s}
.qcm-opt:hover:not(:disabled){border-color:var(--acc);background:#f5f8ff}
.qcm-opt:disabled{cursor:default}
.qcm-opt.ok{border-color:var(--ok);background:#ecfdf5}
.qcm-opt.ko{border-color:var(--ko);background:#fef2f2}
.qcm-expl{margin-top:10px;font-size:13.5px;color:var(--soft);background:#f8fafc;border-left:3px solid var(--acc);padding:8px 12px;border-radius:6px}
.qcm-foot{display:flex;align-items:center;gap:14px;margin:16px 0 6px;flex-wrap:wrap}
.qcm-score{font-weight:800;font-size:16px;padding:6px 16px;border-radius:999px;background:#fff;border:2px solid var(--line)}
.qcm-score.full{border-color:var(--ok);color:var(--ok)}
.qcm-score.low{border-color:var(--ko);color:var(--ko)}
.btn{border:1px solid var(--line);background:#fff;border-radius:9px;padding:8px 14px;font-size:14px;cursor:pointer;font-family:inherit}
.btn:hover{border-color:var(--acc);color:var(--acc)}
footer{background:#0b0d10;color:#94a3b8;text-align:center;padding:22px 16px;font-size:13px}
footer b{color:#e2e8f0}
@media print{nav.toc,.qcm-opts,.qcm-foot,.qcm-hint{display:none!important}body{background:#fff}.sec,.part-t{border-color:#bbb}}
@media (max-width:640px){.sec{padding:16px 14px}table{font-size:13px}th,td{padding:6px 7px}}
`;

const JS = `
(function(){
  var good=0, total=document.querySelectorAll('.qcm-q').length, done={};
  var score=document.getElementById('qcm-score');
  function upd(){
    score.textContent=good+' / '+total+(good===total?' 🎉':'');
    score.className='qcm-score'+(good===total?' full':(good>0&&good<Math.ceil(total/2)?' low':''));
  }
  document.querySelectorAll('.qcm-q').forEach(function(q,qi){
    var ans=+q.getAttribute('data-ans');
    q.querySelectorAll('.qcm-opt').forEach(function(b){
      b.addEventListener('click',function(){
        if(done[qi])return; done[qi]=true;
        var pick=+b.getAttribute('data-o');
        q.querySelectorAll('.qcm-opt').forEach(function(o){
          var oj=+o.getAttribute('data-o');
          o.disabled=true;
          if(oj===ans)o.classList.add('ok');
          else if(oj===pick)o.classList.add('ko');
        });
        if(pick===ans)good++;
        var ex=q.querySelector('.qcm-expl'); if(ex)ex.hidden=false;
        upd();
      });
    });
  });
  document.getElementById('qcm-reset').addEventListener('click',function(){location.hash='';location.reload();});
  upd();
})();
`;

const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(F.titre)} — cours complet expliqué (biopc.pdf)</title>
<meta name="description" content="${esc(F.sousTitre)}">
<style>${CSS}</style>
</head>
<body>
<header class="top">
  <div class="kicker">FMDC Casablanca · S1 · Biophysique</div>
  <h1>${esc(F.titre)}</h1>
  <p>${esc(F.sousTitre)}</p>
  <p><b style="color:#fff">${esc(F.prof)}</b> — Professeur Agrégé en Odontologie chirurgicale</p>
  <div class="badges">
    <span>📄 Source : Drive → Biophysique → Pr. Bouzoubaa → Cours → biopc.pdf</span>
    <span>🧩 ${F.sections.length} sections dans l'ordre du document</span>
    <span>🎯 ${F.qcm.length} QCM corrigés</span>
    <span>⏱️ ~${F.duree} min de lecture</span>
  </div>
</header>
<div class="wrap">
${toc}
${body}
</div>
<footer>
  <b>Espace de révision FMDC S1</b> — page autonome générée depuis la fiche <i>biophy-radiologie</i> du site.<br>
  Ouvrable sans Internet (CSS & JS inclus) · les liens Drive nécessitent une connexion.
</footer>
<script>${JS}</script>
</body>
</html>
`;

const out = path.join(__dirname, '..', 'biopc', 'index.html');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html, 'utf-8');
console.log('OK ->', out, (html.length / 1024).toFixed(0) + ' Ko');
