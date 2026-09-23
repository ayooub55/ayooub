# 🎓 FMDC Casablanca — S1 2026/27

**L-blast dyal l-qraya** — 441 cartes · 12 decks · répétition espacée · **un prof IA ka-y-chre7 b d-darija** · 0 DH

---

## 🚀 Kifach t-7ellha

### A) Double-clic (a s-sahl)
1. Téléchargi l-dossier `site/` **kamel**
2. **Double-clic** 3la `index.html`

⚠️ Khass **`index.html`** + **`data.js`** + **`contenu.js`** y-kounou f **nafs l-dossier**.

### B) En ligne (GitHub Pages)
Repo → **Settings → Pages** → Source = ta branche → dossier **`/site`** → **Save**.

---

## 📱 Les 8 onglets

| Onglet | Chno fih |
|---|---|
| 🏠 **L-youm** | ⭐ L-iktichaf l-kbir, objectif dyal nhar, routine 2h, l-5 ghalatat |
| ▶️ **Étudier** | Les cartes b **répétition espacée** + bouton **💡 Ma fhemt-ch** |
| 🤖 **L-prof IA** | ⭐ Chat : swel 3la ay 7aja, jawab b **d-darija** |
| 📚 **Decks** | 12 decks + progression + PRIORITÉ 1 / standard |
| 📖 **Cours** | ⭐ L-archive kamla (8 documents) · bouton **« Chre7-li had l-qism »** |
| 🗓️ **Plan** | Les 4 phases · 17 simana · bloc dyal simana · tracker |
| 📊 **Progression** | 3 anneaux · calendrier 12 simanat · par deck · export/import |
| 🆘 **Aide** | Anki troubleshooting · touches · sauvegarde |

---

## 🤖 L-prof IA — kifach khdam

### 🇫🇷 La langue
L-prof ka-y-chre7 lik **b l-français simple** (niveau lycée, zéro jargon) — hada l-défaut.

3 boutons l-fo9 :

| Bouton | Jawab |
|---|---|
| 🇫🇷 **Français** | Explication en français simple + **📌 Mots à retenir** en darija |
| 🇲🇦 **Darija** | Kolchi b d-darija |
| 🇫🇷+🇲🇦 | Français simple **+** résumé court b darija à la fin |

Le choix ka-y-t-7fed f navigateur-k.

### 🖱️ ⭐ **Ma fhemt-ch chi 3ibara ?**
**3LM l-kelma b la souris** f jawab l-prof → bouton jaune **« 💡 Chre7 b darija »** ka-y-ban → clic 3lih.

L-prof ka-y-chre7 lik **l-3ibara b we7d-ha b darija** :
1. la traduction simple
2. une analogie dyal l-7ayat l-youmiya
3. un moyen mnémotechnique
4. les ⚠️ pièges d'examen

⭐ Ka-y-khdem 7tta f **📖 Cours** w f **les réponses dyal les cartes**.

**Wla** kteb l-3ibara f l-champ **« 📌 3ibara ma fhemti-ha »** l-te7t dyal l-chat.

### 📌 **Mots à retenir** (automatique)
Kol jawab français ka-y-khdem m3ah des **chips jaunes** — les mots scientifiques s3ab.
**Clic 3la chi chip → l-prof y-chre7-ha lik b darija.**

### Mode 1 — 🔍 **Recherche locale** (défaut, 0 clé, **offline**)
Moteur **TF-IDF** écrit sur mesure : ka-y-qelleb f **553 morceaux** —
les 441 cartes + l-analyse dyal les examens + l-archive Drive + l-plan + **25 cher7 m-ktubin b d-darija**.

Il renvoie **le morceau ṣ-ṣ7i7** + les cartes li 9rab + les sources cliquables.

### Mode 2 — 🧠 **Vraie IA** (optionnel, **GRATUIT**)
Colli une **clé API Gemini** gratuite → jawab **rédigé rien que pour toi**, court, b l-amthila,
b des **moyens mnémotechniques** w les **pièges d'examen**.

👉 `https://aistudio.google.com/apikey` → « Create API key » → colli-ha f l-onglet 🤖 → **🔌 Tester**.

⚠️ La clé ka-t-bqa f navigateur-k (`localStorage`). Ma ka-t-mchi l 7ta chi blassa okhra.

### Mode 3 — ⚡ **IA locale du navigateur**
Chrome 138+ : `window.LanguageModel` (Gemini Nano) — local, gratuit, offline.

### 💡 Depuis les cartes
Bouton **« 💡 Ma fhemt-ch — explique-moi cette carte »** sous chaque réponse.

### 💡 Depuis les cours
📖 Cours → clic 3la un document → **« 💡 Explique-moi ce passage »** wla **« 🇲🇦 B darija »**.

---

## 🎮 Étudier

- **Espace** → afficher · **1** → ✅ Correct · **2** → 🔁 Encore · **Échap** → sedd l-fenêtre
- Répétition espacée : **1j → 2j → 5j → 12j → 30j → 60j**
- ⭐ **10 cartes jdad max / deck / nhar** — stratégie, machi bug
- **⚡ Réviser tout ce qui est dû** = session mixte cross-deck

---

## 💾 La progression

`localStorage` (clé `fmdc-s1-v1`) : cartes vues, intervalles, **série**, **calendrier**, heures.
📊 Progression → **⬇️ Exporter** / **⬆️ Importer** (fichier `.json`).

---

## 📂 L-structure

```
site/
├── index.html      ← l-page (tout est dedans : CSS + JS)
├── data.js         ← window.DECKS  = 12 decks / 441 cartes
├── contenu.js      ← window.CONTENU = 553 morceaux (base de l'IA)
└── README.md
```

`contenu.js` généré par `_build_contenu.py` (racine du repo) depuis :
`fmdc/BDA-MN-HNA.md` · `programme-17-simana.md` · `analyse-examens.md` · `INDEX-DRIVE.md` ·
`resumes/methodes-p43-lkher.md` · `anki/*.md` · les 12 CSV · 25 cher7 darija.

---

## 🔄 Bach t-zid cartes

`data.js` → `window.DECKS` :

```js
{ "id":"mon-deck", "nom":"🦷 Mon deck", "src":"Examen 2026", "ordre":13,
  "module":"M115", "desc":"…",
  "cards":[ {"q":"question (HTML)","a":"réponse (HTML)","t":"tags"} ] }
```

Puis relance `python3 _build_contenu.py` bach l-IA t-3ref-hom.

---

## ⚠️ Notes

- Khdam **offline** (sauf le mode Gemini)
- **0 tracking · 0 serveur · 0 compte** — les données 3andek ghir nti
- Responsive : ordi + téléphone
- Les CSV Anki originaux : `../fmdc/anki/`

---

*Septembre 2026 · FMDC Casablanca · 15h/semaine · 0 DH*
