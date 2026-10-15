/* Moteur de la page biopc/index.html — attend les globales : CH, lessons, questions, flashCards */
const $ = id => document.getElementById(id);
let done = [];
try {
  done = JSON.parse(localStorage.getItem('biopc-progress') || '[]');
  if (!Array.isArray(done)) done = [];
  done = done.filter(i => Number.isInteger(i) && i >= 0 && i < lessons.length);
} catch (e) {}
let filter = 'all';
const normalize = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

function renderCards() {
  const q = normalize($('search').value);
  $('cards').innerHTML = lessons.map((l, i) => ({ ...l, i }))
    .filter(l => (filter === 'all' || +l.chapter === +filter) && normalize(l.title + ' ' + l.desc + ' ' + l.keywords).includes(q))
    .map(l => `<article class="card"><div class="cardtop"><span class="icon" aria-hidden="true">${l.icon}</span><span class="tag">${CH[+l.chapter]} · Section ${String(l.i + 1).padStart(2, '0')}</span></div><h3>${l.title}</h3><p>${l.desc}</p><div class="cardfoot"><span>${done.includes(l.i) ? '✓ Terminée' : l.time + ' de lecture'}</span><button class="read" data-lesson="${l.i}" aria-label="Lire la section ${l.title}">Explorer <span aria-hidden="true">↗</span></button></div></article>`).join('')
    || '<p class="empty">Aucune section trouvée. Essaie « Compton », « Sievert » ou « film ».</p>';
  $('progressText').textContent = `Ton parcours : ${done.length} / ${lessons.length} sections terminées`;
  $('progress').style.width = done.length / lessons.length * 100 + '%';
}
$('cards').addEventListener('click', e => { const b = e.target.closest('[data-lesson]'); if (b) openLesson(+b.dataset.lesson); });
document.querySelector('.toc').addEventListener('click', e => { const b = e.target.closest('[data-lesson]'); if (b) openLesson(+b.dataset.lesson); });

function hydrateFigures() {}
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function openLesson(i) {
  const l = lessons[i];
  $('lessonCategory').textContent = `${CH[l.chapter]} · Section ${String(i + 1).padStart(2, '0')}`;
  $('lessonContent').innerHTML = `<span class="micro">${l.sub} · ${l.time}</span><h2 id="lessonTitle">${l.title}</h2>` +
    (l.goal ? `<div class="learning-goal"><span class="eyebrow">Objectif de la section</span><p>${l.goal}</p></div>` : '') +
    l.content +
    `<div class="lessonend"><span>Sources : biopc.pdf · Pr. BOUZOUBAA Sidi Mohammed<br>FMDC Casablanca · Université Hassan II · S1</span><button class="btn" id="markDone">${done.includes(i) ? '✓ Section terminée' : 'Marquer comme terminée'}</button></div>`;
  hydrateFigures();
  $('markDone').onclick = () => {
    if (!done.includes(i)) done.push(i);
    try { localStorage.setItem('biopc-progress', JSON.stringify(done)); } catch (e) {}
    renderCards(); $('lessonDialog').close();
  };
  $('lessonDialog').showModal();
  $('lessonDialog').scrollTop = 0;
  document.body.style.overflow = 'hidden';
}
$('backToPlan').onclick = () => $('lessonDialog').scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' });
$('lessonContent').addEventListener('click', e => {
  const b = e.target.closest('[data-jump]');
  if (b) $(b.dataset.jump).scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
});
$('closeDialog').onclick = () => $('lessonDialog').close();
$('lessonDialog').addEventListener('close', () => document.body.style.overflow = '');
$('lessonDialog').addEventListener('click', e => {
  if (e.target === $('lessonDialog')) {
    const r = e.target.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) e.target.close();
  }
});
$('search').oninput = renderCards;
document.querySelectorAll('[data-filter]').forEach(b => b.onclick = () => {
  filter = b.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(x => { x.classList.toggle('active', x === b); x.setAttribute('aria-pressed', x === b); });
  renderCards();
});
$('resetProgress').onclick = () => { done = []; try { localStorage.removeItem('biopc-progress'); } catch (e) {} renderCards(); };
renderCards();

/* ---- atelier : onglets ---- */
for (const name of ['tube', 'dose']) $('tab-' + name).onclick = () => {
  for (const n of ['tube', 'dose']) {
    $(n).classList.toggle('hidden', n !== name);
    $('tab-' + n).classList.toggle('active', n === name);
    $('tab-' + n).setAttribute('aria-selected', n === name);
  }
};
const fmt = (n, d = 1) => n.toLocaleString('fr-FR', { maximumFractionDigits: d, minimumFractionDigits: d });

/* ---- simulateur 1 : le tube (kV, mA, temps) ---- */
const pPhoto = kV => 1 / (1 + Math.pow(kV / 80, 4));
function drawTube() {
  const kV = +$('kv').value, mA = +$('ma').value, t = +$('tps').value;
  const p = pPhoto(kV);
  $('kvv').textContent = kV + ' kV'; $('mav').textContent = fmt(mA, 1) + ' mA'; $('tpsv').textContent = fmt(t, 2) + ' s';
  const dominant = p > 0.6 ? 'Photoélectrique' : p < 0.4 ? 'Compton' : 'Mixte';
  $('dominant').textContent = dominant;
  const dose = mA * t * Math.pow(kV / 70, 2);
  $('doseidx').textContent = fmt(dose, 2);
  $('contrastNote').textContent = kV < 70
    ? 'Tension faible : contraste ÉLEVÉ mais dose accrue (effet photoélectrique majeur < 70 kV).'
    : kV <= 90
      ? 'Tension moyenne (60-70 kV en dentaire) : bon compromis contraste / dose.'
      : 'Tension élevée : contraste diminué, dose diminuée ; au-delà de 90-100 kV le contraste devient insuffisant (Compton prépondérant > 100 kV).';
  const x = k => 48 + (k - 40) * 4.75, y = s => 235 - s * 211;
  let svg = '';
  for (let n = 0; n <= 100; n += 25) svg += `<path d="M48 ${y(n / 100)}H428" stroke="#e7ece2"/><text x="38" y="${y(n / 100) + 4}" text-anchor="end" font-size="10" fill="#78877c">${n} %</text>`;
  for (let k = 40; k <= 120; k += 20) svg += `<text x="${x(k)}" y="255" text-anchor="middle" font-size="10" fill="#78877c">${k}</text>`;
  svg += '<path d="M48 24V235H435" fill="none" stroke="#afbeaa"/><text x="8" y="16" font-size="11" fill="#537161">part</text><text x="208" y="280" font-size="11" fill="#537161">tension du tube (kV)</text>';
  const path = f => Array.from({ length: 161 }, (_, i) => { const k = 40 + i / 2; return `${i ? 'L' : 'M'}${x(k)},${y(f(k))}`; }).join(' ');
  svg += `<path d="${path(k => 1 - pPhoto(k))}" fill="none" stroke="#b1bcab" stroke-width="2" stroke-dasharray="5 4"/>`;
  svg += `<path d="${path(pPhoto)}" fill="none" stroke="#286d57" stroke-width="3"/>`;
  svg += `<path d="M${x(kV)} 235V${y(p)}H48" fill="none" stroke="#89aa70" stroke-dasharray="4 4"/><circle cx="${x(kV)}" cy="${y(p)}" r="5" fill="#286d57" stroke="white" stroke-width="2"/>`;
  svg += `<text x="300" y="60" font-size="11" fill="#286d57">effet photoélectrique</text><text x="300" y="200" font-size="11" fill="#8d9a88">effet Compton (pointillé)</text>`;
  $('chart').innerHTML = svg;
}
['kv', 'ma', 'tps'].forEach(id => $(id).addEventListener('input', drawTube));
drawTube();

/* ---- simulateur 2 : Gy → Sv ---- */
function drawDose() {
  const mGy = +$('mgy').value, wr = +$('wr').value, wt = +$('wt').value;
  const mSv = mGy * wr * wt;
  $('mgyv').textContent = fmt(mGy, 1) + ' mGy';
  $('wrv').textContent = '×' + wr; $('wtv').textContent = '×' + wt;
  $('doseFormula').textContent = `Sv = Gy × Wr × Wt → ${fmt(mGy, 1)} mGy × ${wr} × ${wt} = ${mSv < 1 ? fmt(mSv * 1000, 1) + ' µSv' : fmt(mSv, 3) + ' mSv'}`;
  $('svbig').textContent = mSv < 1 ? fmt(mSv * 1000, 1) + ' µSv' : fmt(mSv, 3) + ' mSv';
  $('svcompare').textContent = mSv === 0 ? 'Dose nulle : pas d’effet.' :
    mSv < 0.0024 ? `Inférieure à l’exposition naturelle d’UNE journée (≈ 7 µSv) : ${fmt(mSv / 2.4 * 100, 2)} % de l’année naturelle.` :
      `≈ ${fmt(mSv / 2.4 * 100, 1)} % de l’exposition naturelle annuelle (2,4 mSv/an en France).`;
  $('doseMarker').style.left = `calc(${Math.min(mSv / 2.4, 1) * 100}% - 2px)`;
  $('doseExplain').textContent = 'Échelle : 0 → 2,4 mSv (une année d’exposition naturelle). Le Sievert est calculable, pas mesurable.';
}
['mgy', 'wr', 'wt'].forEach(id => $(id).addEventListener('input', drawDose));
drawDose();

/* ---- quiz ---- */
let qi = 0, score = 0, answered = false;
function quiz() {
  answered = false;
  if (qi === questions.length) {
    $('quiz').innerHTML = `<span class="eyebrow">Session terminée</span><h2>${score} / ${questions.length}</h2><p>${score >= Math.round(questions.length * .8) ? 'Très bien ! Les grandes notions du cours sont en place.' : 'Bien joué d’être allé au bout. Relis les sections puis essaie à nouveau.'}</p><button class="btn" id="restart">Recommencer ↻</button>`;
    $('restart').onclick = () => { qi = 0; score = 0; quiz(); };
    return;
  }
  const q = questions[qi];
  $('quiz').innerHTML = `<span class="eyebrow">Question ${String(qi + 1).padStart(2, '0')} / ${questions.length}</span><h3>${q[0]}</h3><div class="answers">${q[1].map((a, i) => `<button class="answer" data-answer="${i}"><span style="color:#8d9a88;margin-right:12px">${String.fromCharCode(65 + i)}</span>${a}</button>`).join('')}</div><div class="feedback" id="feedback"></div><div class="quizbottom"><span>${score} bonne${score > 1 ? 's' : ''} réponse${score > 1 ? 's' : ''}</span><button class="btn light hidden" id="nextQuestion">${qi === questions.length - 1 ? 'Voir mon résultat' : 'Question suivante'} →</button></div>`;
  document.querySelectorAll('[data-answer]').forEach(b => b.onclick = () => {
    if (answered) return; answered = true;
    const n = +b.dataset.answer;
    if (n === q[2]) score++;
    document.querySelectorAll('[data-answer]').forEach(x => {
      x.disabled = true;
      if (+x.dataset.answer === q[2]) x.classList.add('correct');
      else if (x === b) x.classList.add('wrong');
    });
    $('feedback').textContent = (n === q[2] ? '✓ Exact ! ' : '↳ Pas tout à fait. ') + q[3];
    $('nextQuestion').classList.remove('hidden');
  });
  $('nextQuestion').onclick = () => { qi++; quiz(); };
}
quiz();

/* ---- cartes mémo ---- */
let fi = 0, flipped = false;
function paintFlash() {
  $('flashText').textContent = flipped ? flashCards[fi][1] : flashCards[fi][0];
  $('flashHint').textContent = flipped ? 'Clique pour la carte suivante ↻' : 'La réponse est de l’autre côté ↻';
}
$('flash').onclick = () => { if (flipped) { flipped = false; fi = (fi + 1) % flashCards.length; } else { flipped = true; } paintFlash(); };
paintFlash();
