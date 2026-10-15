#!/usr/bin/env node
/* Génère biopc/index.html : UNE page autonome reprenant EXACTEMENT le design de la page
   « molécule. » (hero, sommaire cliquable, cards + dialog, mini-labo, quiz, ressources),
   avec le contenu du cours biopc.pdf (Pr. Bouzoubaa) dans l'ordre du Drive.
   Thème : tools/biopc-theme.css · Moteur : tools/biopc-engine.js · Données : data/cours-sciences.js */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
global.window = {};
require(path.join(ROOT, 'data', 'cours-imd.js'));
require(path.join(ROOT, 'data', 'cours-sciences.js'));
const F = global.window.FICHES.find(f => f.id === 'biophy-radiologie');
if (!F) { console.error('fiche biophy-radiologie introuvable'); process.exit(1); }

const CSS = fs.readFileSync(path.join(__dirname, 'biopc-theme.css'), 'utf-8');
const ENGINE = fs.readFileSync(path.join(__dirname, 'biopc-engine.js'), 'utf-8');

const CH = ['Partie I · Principes physiques des RX', 'Partie II · Initiation à la radiologie', 'Partie III · Radiobiologie & radioprotection'];
const PART_OF = {
  plan: 0, historique: 0, definition: 0, production: 0, photo: 0, compton: 0,
  radiodef: 1, source: 1, objet: 1, film: 1, dev: 1, num: 1, geo: 1,
  rpdef: 2, expo: 2, doses: 2, effets: 2, principes: 2, regles: 2, cabinet: 2, patient: 2, recap: 2
};
const META = {
  plan: ['🗺', '3 min', 'Le plan du cours dans l’ordre du Drive / du PDF : les 3 parties du S1 et les chapitres à venir (S3, S6, S8).', 'Situer chaque chapitre du module dans le bon semestre et voir ce que couvre biopc.pdf.', 'plan semestre S1 S3 S6 S8 panoramique cone beam IRM échographie'],
  historique: ['📜', '3 min', '1895 : Röntgen, tube sans air, anode et cathode, film sensibilisé à distance… et le prix Nobel 1901.', 'Retenir les éléments clés de la découverte : vide, film à distance, main, Nobel.', 'röntgen 1895 nobel 1901 découverte main film x rays'],
  definition: ['⚡', '3 min', 'Le rayon X : rayonnement électromagnétique très pénétrant — fréquences, longueurs d’onde, énergie des photons.', 'Situer les RX dans le spectre électromagnétique avec les ordres de grandeur.', 'spectre fréquence longueur d’onde énergie électronvolt pénétrant hertz'],
  production: ['🔌', '4 min', 'Tube de Coolidge : cathode de tungstène chauffée, accélération sous vide, bombardement de l’anode, émission par freinage ; anode tournante.', 'Décrire les 4 étapes de la production des RX dans l’ordre.', 'coolidge tube cathode anode tungstène vide freinage anode tournante piste'],
  photo: ['🎯', '4 min', 'Effet photoélectrique : électron de couche profonde, photon absorbé, photoélectron et ion positif ; effet majeur sous 70 kV.', 'Expliquer pourquoi l’effet photoélectrique crée le contraste radiographique.', 'photoélectrique absorption couche profonde photoélectron 70 kV contraste ion'],
  compton: ['💥', '4 min', 'Effet Compton : électron périphérique « libre », photon diffusé dans une direction aléatoire ; dépend de la densité ; prépondérant au-dessus de 100 kV.', 'Opposer Compton et photoélectrique (électron visé, sort du photon, facteurs, tension).', 'compton diffusion densité électron libre 100 kV voile danger numéro atomique'],
  radiodef: ['🩻', '3 min', 'Définition de la radiographie et schéma général : le patient entre le foyer radiogène et le récepteur ; examen justifié par prescription.', 'Schématiser la triade source → objet → détecteur et citer la règle de justification.', 'radiologie définition triade source objet détecteur prescription schéma'],
  source: ['🎛', '5 min', 'mA, kV, générateur haute fréquence, transformateur, filtration aluminium, temps, long cône, collimation, laser : toute la source.', 'Prédire l’effet de chaque paramètre de la source sur l’image et sur la dose.', 'mA kV générateur transformateur filtration aluminium collimation cône temps laser'],
  objet: ['🦴', '3 min', 'Pourquoi l’os est blanc, les tissus mous gris et l’air noir : coefficients d’absorption et échelle des gris.', 'Expliquer les trois aspects radiographiques par l’absorption des tissus.', 'radio-opaque radio-claire gris os air absorption blanc noir tissus mous'],
  film: ['🎞', '4 min', 'Film argentique : support acétate, gélatine, émulsion AgBr ; emballage papier noir + plomb + plastique ; formats des films.', 'Connaître la composition du film, le rôle de chaque emballage et les dimensions.', 'film argentique AgBr acétate gélatine emballage plomb formats 31x41 occlusal'],
  dev: ['🧪', '5 min', 'Les 5 étapes du développement (révélation, rinçage, fixation, lavage, séchage) + monobain : durées et températures.', 'Remettre les étapes dans l’ordre et expliquer le rôle de chaque bain.', 'développement révélation fixation rinçage lavage séchage monobain 20 °C hyposulfite'],
  num: ['💾', '3 min', 'Numérique : photons → signaux électriques → image ; matrice de pixels, 256 niveaux de gris, détecteurs 2D et 3D.', 'Comparer détection analogique (chimie) et numérique (pixels).', 'numérique pixel matrice 256 gris capteur signal électrique 2D 3D'],
  geo: ['📐', '3 min', 'Image = ombre projetée conique en 2D : déformations, superpositions, perte de profondeur → 2ᵉ vue perpendiculaire.', 'Justifier la nécessité d’une deuxième incidence perpendiculaire.', 'géométrie conique ombre superposition déformation deuxième vue perpendiculaire profondeur'],
  rpdef: ['🛡', '4 min', 'Radioprotection, irradiation vs exposition, radiobiologie ; chronologie des réponses cellulaires (réparation, mutation, mort).', 'Distinguer irradiation (effet voulu) et exposition (effet fortuit).', 'radioprotection irradiation exposition radiobiologie ADN réparation mutation nécrose'],
  expo: ['🌍', '3 min', 'Contamination externe (distance + écran y mettent fin) vs contamination interne (inhalation, ingestion : elle se poursuit).', 'Choisir la mesure de protection adaptée à chaque type d’exposition.', 'contamination externe interne inhalation ingestion blindage distance écran'],
  doses: ['⚖️', '5 min', 'Dose absorbée (Gy, mesurable) vs dose efficace (Sv, calculable) ; Sv = Gy × Wr × Wt ; doses du panoramique ; 2,4 mSv/an.', 'Calculer un Sv à partir d’un Gy et citer les repères (1 Gy = 1 Sv = 100 rads).', 'gray sievert dose absorbée efficace Wr Wt panoramique 2,4 mSv rads'],
  effets: ['☣️', '5 min', 'Lésions moléculaires (ADN, radiolyse de l’eau, radicaux libres) ; effets déterministes vs stochastiques : seuil, gravité, exemples.', 'Classer un effet clinique en déterministe ou stochastique et justifier.', 'déterministes stochastiques aléatoires seuil cancer radicaux libres radiolyse malformations'],
  principes: ['📏', '3 min', 'Justification, optimisation (ALARA), limitation : concepts et applications, dont les 20 mSv/an des travailleurs.', 'Appliquer les 3 principes à une situation clinique donnée.', 'justification optimisation limitation ALARA 20 mSv principes travailleurs'],
  regles: ['🚧', '4 min', 'Protection du personnel : temps, distance, écrans ; blindage des salles ; dispositifs protecteurs ; dosimétrie ; préalables (films D vs E/F vs digital).', 'Citer les 3 leviers de protection du personnel et la dosimétrie comparée.', 'temps distance écran blindage tablier dosimétrie films E/F digital panoramique ancien'],
  cabinet: ['🦷', '4 min', 'Pendant le cliché : sortir de la salle ou cordon ≈ 2 m ; conception : ≥ 3 m, écran ininterrompu ; positions autour du patient (vert/orange/rouge).', 'Ne jamais confondre 2 m (cordon) et 3 m (conception) ; situer les zones favorables.', 'cabinet dentaire 2 m 3 m cordon écran ininterrompu positions zones praticien'],
  patient: ['🤰', '3 min', 'Patient : entretien, tablier plombé, protecteur thyroïdien (enfant +++), tablier avant + arrière au panoramique ; femme enceinte : 0,3 à 1 µSv.', 'Protéger le patient et argumenter sereinement le risque fœtal.', 'patient tablier plombé thyroïde panoramique femme enceinte fœtus µSv IRSN'],
  recap: ['🧠', '3 min', 'Récap final : effets déterministes / aléatoires, les 3 règles, ALARA+++, objectif = NE PAS NUIRE.', 'Réciter la charpente de la radioprotection en cinq lignes.', 'récapitulatif ALARA ne pas nuire synthèse codes réglementaires']
};
const DARIJA = {
  historique: 'B darija : Röntgen ma 7tajch yfssed l-jism — l-film tsejjel bo7do mn b3id, w l-3dam dyal l-yed bano fih. Hadchi 3lach kanet sda9a kbira : chwft l-dakhel bla ma tqssed.',
  source: 'B darija : mA = ch7al mn photon (hiya li kat3ti l-noirceur) ; kV = ch7al qwi kol photon. Zid l-kV → contraste kaynqes walakin l-dose katnqes m3ah. Ma t3kssch !',
  photo: 'B darija : f l-effet photoélectrique l-photon kaytbla3 kamel — l-3dam kaywqef l-RX temma, 3lach hadchi l-3dam kayban abyad f l-cliché.',
  compton: 'B darija : Compton howa l-fogaga dyal l-faisceau : l-photon kaytfrrqech f kol jiha, kayghbbrech l-image w kayzid l-khatar. Kayzid ghir m3a l-kathafa (densité), bla cha’n dyal l-numéro atomique.',
  dev: 'B darija : l-film b7al tsswira : ila ma dkhaltouch l-bains b tartib (révélation → rinçage → fixation → lavage → séchage), l-image katkhreb aw katwli safra m3a l-waqt (voile jaune).',
  doses: 'B darija : Gy = ch7al mn énergie tkatbat f l-kilo ; Sv = ch7al mn khatar 3la l-jism. Nefs l-dose ma3ndch nefs l-khatar f l-thyroïde w f l-peau — 3lach hadchi kayn Wr w Wt.',
  principes: 'B darija : 1) Wach l-examen ghadi ynf3? (justification) · 2) Nqello l-dose b l-ma3qoul (optimisation / ALARA) · 3) Bla ma nfoto l-7doud l-qanouniya (limitation).',
  cabinet: 'B darija : 2 m = l-cordon dyal l-commande ila bqiti f la salle ; 3 m = l-massafa f l-conception bin l-opérateur, l-tube w l-patient. Ma tkhlattchom f l-QCM !',
  patient: 'B darija : l-fœtus kayakhod 0,3-1 µSv mn cliché dentaire — aqal mn li kayakhod kol nhar mn la nature (7 µSv). Walakin l-7tiyat dyalman wajibin.'
};

/* conversion du HTML de la fiche vers le markup du thème */
const conv = h => h
  .replace(/<table>/g, '<div class="tablewrap"><table>')
  .replace(/<\/table>/g, '</table></div>')
  .replace(/<pre class="sch">/g, '<figure class="sch"><pre>')
  .replace(/<\/pre>/g, '</pre></figure>')
  .replace(/<div class="keys">/g, '<div class="note"><b>✦ À retenir : </b>')
  .replace(/<div class="quote">/g, '<div class="note">')
  .replace(/<p class="mt">/g, '<p>');

const lessons = F.sections.map((s, i) => {
  const m = META[s.id] || ['📄', '4 min', s.titre, '', s.titre];
  let content = conv(s.html);
  if (DARIJA[s.id]) content += `<div class="note darija"><b>${DARIJA[s.id].split(' : ')[0]} :</b> ${DARIJA[s.id].split(' : ').slice(1).join(' : ')}</div>`;
  return {
    title: s.titre.replace(/^\d-\d\s*·\s*/, '').replace(/^3-\d\/3-\d\s*·\s*/, ''),
    sub: 'biopc.pdf · ' + CH[PART_OF[s.id]].split(' · ')[0],
    chapter: PART_OF[s.id], icon: m[0], time: m[1], keywords: m[4], desc: m[2], goal: m[3],
    content
  };
});

const questions = F.qcm.map(q => [q.q, q.opts, q.ans, q.expl]);
const flashCards = [
  ['Pourquoi le film noircit-il là où les RX passent ?', 'Les photons sensibilisent les cristaux d’AgBr ; la révélation réduit les Ag⁺ en argent métallique : plus de photons reçus, plus de noir après développement.'],
  ['Différence Gy / Sv en une phrase ?', 'Le Gy mesure l’énergie déposée par kg (physique, mesurable) ; le Sv pondère cette dose par Wr (rayonnement) et Wt (tissu) pour exprimer le risque biologique (calculable, non mesurable).'],
  ['Pourquoi une 2ᵉ vue perpendiculaire ?', 'Le cliché est une ombre conique en 2D : la profondeur et la forme exacte sont perdues (superpositions) → une incidence perpendiculaire les retrouve.'],
  ['Praticien resté dans la salle : quelle distance ?', 'Cordon de commande ≈ 2 m, hors du faisceau direct ; la conception de la pièce exige ≥ 3 m entre l’opérateur, le tube et le sujet.'],
  ['Compton dépend de quoi ?', 'Uniquement de la DENSITÉ du matériel (pas du numéro atomique). Prépondérant > 100 kV : diffusion dans toutes les directions → voile et danger.']
];

/* ---------- sommaire (toc) ---------- */
const tocCols = [0, 1, 2].map(c => {
  const items = lessons.map((l, i) => ({ l, i })).filter(x => x.l.chapter === c);
  return `<div><h4>${['Partie I : Principes physiques des rayons X', 'Partie II : Initiation à la radiologie', 'Partie III : Radiobiologie & radioprotection'][c]}</h4><ul>\n${items.map(x => `<li><button data-lesson="${x.i}">${x.l.title}</button></li>`).join('\n')}</ul></div>`;
}).join('\n');

const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>La radiologie, enfin limpide — cours complet biopc.pdf (Pr. Bouzoubaa)</title>
<meta name="description" content="Tout le cours biopc.pdf du Pr. BOUZOUBAA Sidi Mohammed (FMDC, S1) expliqué dans l'ordre du Drive : principes physiques des rayons X, initiation à la radiologie, radiobiologie & radioprotection — avec simulateurs et QCM.">
<style>
${CSS}</style>
</head>
<body>
<header><nav class="nav" aria-label="Navigation principale"><a href="#" class="brand"><svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M20 6L31 13L28 26L12 26L9 13Z" stroke="#286d57" stroke-width="2"/><circle cx="20" cy="18" r="5" fill="#286d57"/><circle cx="12" cy="28" r="4" fill="#a3bf6e"/><circle cx="28" cy="28" r="4" fill="#286d57"/><path d="M20 23v5M16 27l-3 2M24 27l3 2" stroke="#a3bf6e" stroke-width="2"/></svg>radiologie<span style="color:#789d62">.</span></a><div class="navlinks"><a href="#cours">Les cours</a><a href="#atelier">L’atelier</a><a href="#revision">Se tester</a><a href="#ressources">Ressources ↗</a></div><span class="pill">FMDC · 1ÈRE ANNÉE · S1</span></nav></header>
<main class="wrap">
<div class="hero"><div><div class="eyebrow"><span class="dot"></span> Ton espace de révision · S1</div><h1>La radiologie,<br>enfin <em>limpide.</em></h1><p class="lead">Des rayons X à la radioprotection : comprends comment naît une image radiologique et comment protéger tout le monde. Des explications détaillées, des schémas, un peu de darija et beaucoup de déclics.</p><div class="actions"><a class="btn" href="#cours">Explorer les cours <span>↗</span></a><a class="btn light" href="#revision">Tester mes connaissances</a></div><p class="micro">D’après le support biopc.pdf de Pr. BOUZOUBAA Sidi Mohammed · FMDC</p></div><div class="heroart"><svg viewBox="0 0 460 400" role="img" aria-label="Illustration stylisée d’un tube radiogène : les électrons frappent l’anode et un faisceau conique traverse une dent"><defs><radialGradient id="g" cx="32%" cy="25%"><stop stop-color="#8ab49c"/><stop offset=".6" stop-color="#47806a"/><stop offset="1" stop-color="#24533f"/></radialGradient><radialGradient id="l" cx="28%" cy="20%"><stop stop-color="#f2f7c4"/><stop offset=".6" stop-color="#d2e58c"/><stop offset="1" stop-color="#9eb965"/></radialGradient><filter id="s"><feDropShadow dx="3" dy="12" stdDeviation="8" flood-color="#335735" flood-opacity=".14"/></filter></defs><g fill="none" stroke="#cbd8bd"><ellipse cx="227" cy="210" rx="183" ry="128" transform="rotate(-30 227 210)" stroke-dasharray="4 6"/><circle cx="225" cy="208" r="151"/><path d="M42 306H420M50 100H420" stroke-dasharray="2 8"/></g><g stroke="#73977b" stroke-width="10" stroke-linecap="round"><path d="M96 132L176 176"/><path d="M176 176L300 236" stroke-dasharray="1 14"/><path d="M300 236L352 300"/></g><g filter="url(#s)"><rect x="62" y="102" width="70" height="60" rx="14" fill="url(#g)"/><rect x="160" y="150" width="34" height="52" rx="8" transform="rotate(24 177 176)" fill="url(#l)"/><path d="M282 208c26-10 52 2 54 26 2 22-12 34-16 52-3 14-21 16-27 4-8-16-24-22-27-42-3-18 2-32 16-40z" fill="url(#g)"/><circle cx="352" cy="306" r="26" fill="url(#l)"/></g><g font-family="Georgia" fill="#315344" font-style="italic"><text x="48" y="66" font-size="19">e⁻ → RX (freinage)</text><text x="252" y="120" font-size="15">faisceau conique</text><text x="286" y="368" font-size="15">source → objet → détecteur</text></g></svg><div class="floatlabel f1"><b>Tout commence par un freinage.</b><span class="micro">Les électrons frappent l’anode : les RX naissent.</span></div><div class="floatlabel f2"><b>✦ Bchwiya bchwiya.</b><span class="micro">Une notion à la fois.</span></div></div></div>
<div class="stats"><div class="stat"><strong>03</strong><span>parties<br>du programme S1</span></div><div class="stat"><strong>${lessons.length}</strong><span>sections pour<br>tout relier</span></div><div class="stat"><strong>02</strong><span>simulateurs<br>interactifs</span></div><div class="stat"><strong>${questions.length}</strong><span>questions<br>pour progresser</span></div></div>
<section id="cours"><div class="sectionhead"><div><div class="toc" aria-label="Sommaire du cours"><div class="eyebrow">Sommaire · suit le plan du support de cours</div>
<div class="tocgrid">
${tocCols}
</div>
<p class="tocfoot">Ordre du document Drive (biopc.pdf) : Partie I → II → III. Les incidences (S3, S6, S8) et l’IRM / écho viennent plus tard dans le cursus.</p></div>
<div class="eyebrow">01 / Comprendre</div><h2>Les grandes idées, simplement.</h2><p>Chaque section : les bases du cours pas à pas, avec tableaux et schémas.</p></div><label><span class="sr">Rechercher une notion</span><input class="search" id="search" placeholder="⌕  Rechercher une notion…" type="search"></label></div><div class="filters" aria-label="Filtrer les sections"><button class="chip active" data-filter="all" aria-pressed="true">Tout le programme</button><button class="chip" data-filter="0" aria-pressed="false">Partie I · Physique des RX</button><button class="chip" data-filter="1" aria-pressed="false">Partie II · Initiation à la radiologie</button><button class="chip" data-filter="2" aria-pressed="false">Partie III · Radioprotection</button></div><div class="cards" id="cards"></div><div class="progressline"><span id="progressText">Ton parcours : 0 / ${lessons.length} sections terminées</span><div class="track"><i id="progress"></i></div><button class="reset" id="resetProgress">Réinitialiser</button></div></section>
<section class="lab" id="atelier"><div class="sectionhead"><div><div class="eyebrow">02 / Expérimenter</div><h2>Moins abstrait. Plus interactif.</h2><p>Fais varier les paramètres et observe ce qui change.</p></div><span class="pill">LE MINI-LABO</span></div><div class="tabs" role="tablist" aria-label="Simulateurs"><button id="tab-tube" role="tab" aria-selected="true" aria-controls="tube" class="active">Tube & tension (kV)</button><button id="tab-dose" role="tab" aria-selected="false" aria-controls="dose">Dose Gy → Sv</button></div>
<div id="tube" role="tabpanel" aria-labelledby="tab-tube" class="labgrid"><div><h3>Le tube sous contrôle.</h3><p>La tension (kV) fixe l’énergie des photons et l’effet dominant ; le courant (mA) et le temps fixent le nombre de photons — donc la noirceur et la dose.</p><div class="controls"><div class="control"><label for="kv">Tension du tube <b id="kvv"></b></label><input id="kv" type="range" min="40" max="120" value="65"></div><div class="control"><label for="ma">Courant du tube <b id="mav"></b></label><input id="ma" type="range" min="4" max="8" step="0.5" value="6"></div><div class="control"><label for="tps">Temps d’exposition <b id="tpsv"></b></label><input id="tps" type="range" min="0.05" max="2" step="0.05" value="0.4"></div></div><p id="contrastNote" class="micro"></p></div><div class="chartbox"><svg id="chart" viewBox="0 0 460 290" role="img" aria-label="Part des effets photoélectrique et Compton selon la tension du tube"></svg><div class="metric"><span>Effet dominant<br><strong id="dominant"></strong></span><span>Indice de dose relatif<br><strong id="doseidx"></strong></span></div><p class="micro">Modèle illustratif : part photoélectrique = 1 / (1 + (kV/80)⁴) ; indice de dose = mA × temps × (kV/70)². Repères du cours : photoélectrique majeur &lt; 70 kV · Compton prépondérant &gt; 100 kV.</p></div></div>
<div id="dose" role="tabpanel" aria-labelledby="tab-dose" class="labgrid hidden"><div><h3>Du Gray au Sievert.</h3><p>Une même dose absorbée n’a pas le même risque : on la pondère par la qualité du rayonnement (Wr) et la sensibilité du tissu (Wt).</p><label class="micro" for="wr">Qualité du rayonnement (Wr) <b id="wrv"></b></label><br><select id="wr"><option value="1">Rayons X / gamma · Wr = 1</option><option value="20">Particules alpha · Wr = 20</option></select><div class="control" style="margin-top:14px"><label for="wt">Tissu irradié (Wt) <b id="wtv"></b></label></div><select id="wt"><option value="0.12">Moelle osseuse · Wt = 0,12</option><option value="0.08">Gonades · Wt = 0,08</option><option value="0.04">Thyroïde · Wt = 0,04</option><option value="0.01">Peau · Wt = 0,01</option></select><div class="control"><label for="mgy">Dose absorbée <b id="mgyv"></b></label><input id="mgy" type="range" min="0" max="20" step="0.5" value="2"></div><div id="doseFormula" class="note"></div><p class="micro">Dose efficace illustrative : E = D × Wr × Wt. Le Sv est calculable, jamais mesurable.</p></div><div class="chartbox phresult" aria-live="polite"><span class="micro">DOSE EFFICACE OBTENUE</span><div class="charge" id="svbig"></div><div id="svcompare"></div><div class="phscale"><i id="doseMarker"></i></div><span id="doseExplain" class="micro"></span></div></div></section>
<section id="revision"><div class="quizlayout"><div><div class="eyebrow">03 / Ancrer les notions</div><h2>Un petit test.<br>Un grand déclic.</h2><p class="lead" style="font-size:14px">Pas de pression : chaque réponse vient avec son explication. L’objectif, c’est de comprendre pourquoi.</p><div class="note darija"><b>B darija</b><br>Maشي ghir t7fed : fhem 3lach la réponse s7i7a, w 3awd l-QCM 7tta tjibha kamla.</div><button class="flash" id="flash"><small>CARTE MÉMO · CLIQUE POUR RETOURNER</small><b id="flashText"></b><span id="flashHint">La réponse est de l’autre côté ↻</span></button></div><div class="quizbox" id="quiz" aria-live="polite"></div></div></section>
<section id="ressources"><div class="sectionhead"><div><div class="eyebrow">04 / Aller à la source</div><h2>Les supports, à portée de clic.</h2><p>Retrouve le document du dossier partagé Drive.</p></div></div><div class="resourcegrid"><a class="resource" target="_blank" rel="noopener" href="https://drive.google.com/file/d/1AH0mLhLm0UB1zkc-brafWzA_u-lL3e4Z/view"><span class="pdf">PDF</span><div><b>Cours complet · biopc.pdf ↗</b><small>114 pages · Parties I, II & III</small></div></a><a class="resource" target="_blank" rel="noopener" href="https://drive.google.com/drive/folders/1OWf90LF1M4IL3ZUQfJ2q0eUCSF_E-xNj"><span class="pdf">DRIVE</span><div><b>Dossier du cours ↗</b><small>Biophysique → Pr. Bouzoubaa → Cours</small></div></a><a class="resource" target="_blank" rel="noopener" href="https://ayooub55.github.io/ayooub/#/f/biophy-radiologie"><span class="pdf">WEB</span><div><b>Fiche intégrée au site ↗</b><small>Notes, surlignage & progression</small></div></a></div><p class="source-note">Synthèse pédagogique indépendante du support biopc.pdf de Pr. BOUZOUBAA Sidi Mohammed, Université Hassan II de Casablanca, Faculté de Médecine Dentaire. Ne remplace pas le cours original. Les liens Drive nécessitent une connexion Internet ; le reste fonctionne hors ligne.</p></section>
<footer><a href="#" class="brand" style="font-size:19px">radiologie.</a><span>Comprendre l’image, une notion à la fois.<br>HTML autonome · Français + Darija</span><a href="#">Retour en haut ↑</a></footer>
</main>
<dialog id="lessonDialog" aria-labelledby="lessonTitle"><div class="dialogbar"><span class="eyebrow" id="lessonCategory"></span><div class="reading-tools"><button id="backToPlan">Plan ↑</button><button class="close" id="closeDialog" aria-label="Fermer la section">×</button></div></div><article class="lesson" id="lessonContent"></article></dialog>
<script>
const CH=${JSON.stringify(CH)};
const lessons=${JSON.stringify(lessons)};
const questions=${JSON.stringify(questions)};
const flashCards=${JSON.stringify(flashCards)};
${ENGINE}
</script>
</body>
</html>
`;
const out = path.join(ROOT, 'biopc', 'index.html');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html, 'utf-8');
console.log('OK ->', out, (html.length / 1024).toFixed(0) + ' Ko ·', lessons.length, 'sections ·', questions.length, 'questions');
