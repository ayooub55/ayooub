# 🦷 FMDC · S1 — Espace de révision

Portail d’accueil (landing page) pour le **Semestre 1 de la 1ʳᵉ année de Médecine Dentaire — FMDC Casablanca**.
Il présente l’arborescence complète du **Drive officiel du S1** *et* transforme les cours en
**fiches de révision expliquées** : explications simples, tableaux, schémas, points à retenir,
pièges classiques des QCM — avec recherche, suivi de révision, **statistiques** et
**tes propres notes + photos**.

> Source des documents : [Drive S1](https://drive.google.com/drive/folders/1jljGDmCqvwKDAiS-Fa3a1L_I5eqgJkxK).
> Le portail ne copie aucun fichier : chaque lien ouvre le document sur Google Drive.

Site **statique** (HTML / CSS / JS), sans build, sans dépendance, publié sur GitHub Pages.

---

## ✨ Ce que contient le site

| | |
|---|---|
| 📘 **20 fiches de cours expliquées** | Chaque fiche = un cours du Drive, découpé en sections : explications, tableaux comparatifs, schémas en texte, **✅ à retenir** et **⚠️ pièges des QCM**. |
| 🗂️ **Sommaire cliquable** | Dans chaque fiche : navigation par sections, « à retenir », « pièges », notes. |
| 🖍️ **Surlignage** | Sélectionne un passage dans une fiche → bouton **Surligner**. Tes surlignages sont listés et supprimables. |
| ✅ **Statut de révision par fiche** | Non lue · En cours · **Maîtrisée** · À revoir. |
| 📝 **Mes notes & photos** | Sur chaque fiche : tes notes écrites + **tes photos** (tableau, notes manuscrites, diapos). Tout reste **dans ton navigateur**. |
| 📊 **Statistiques** | KPI (documents, fiches, heures de lecture, couverture), graphiques par rubrique, anneau de couverture, tableau détaillé par module et par fiche. |
| 🔍 **Recherche instantanée globale** | Cherche dans les fiches (titre, prof, contenu) **et** les documents du Drive. Raccourci : `/`. |
| 📚 **9 rubriques / 68 documents** | Anatomie & Physiologie · Biologie · Biophysique & Sciences des matériaux · Chimie & Biochimie · IMD · Examens 2025-2026 · Annales 2023/2024 · QCM autres facultés · MTU. |
| ⭐ **Favoris**, ⏱ **« Reprendre la révision »**, ➡️ **fiche suivante**, 🕓 **dossiers vides affichés « à venir »**, 🌗 thème clair/sombre, responsive mobile | |

## 🗂 Structure du dépôt

```
index.html                 page d’accueil (landing) + exploration + fiches + stats
assets/style.css           thème et mise en page
assets/app.js              application (routage, fiches, recherche, statistiques, notes/images)
data/s1.js                 arborescence complète du Drive S1 (9 rubriques, 68 documents)
data/cours-imd.js          fiches de cours IMD & pathologies (10 fiches)
data/cours-sciences.js     fiches Biologie · Biochimie · Chimie · Biophysique · Physiologie (10 fiches)
2024-2025/index.html       ancien portail de la promo 2024-2025
.nojekyll                  désactive Jekyll sur GitHub Pages
.github/workflows/         déploiement automatique sur GitHub Pages
```

## 🚀 Lancer en local

```bash
python3 -m http.server 8000      # puis http://localhost:8000
```

## ✏️ Mettre à jour le contenu

### 1. Ajouter un document du Drive — `data/s1.js`

```js
{ nom: 'Nom du fichier.pdf', id: 'IDENTIFIANT_DRIVE' }
```

Un dossier « en préparation » : `{ nom: 'Pr. X', folder: '…', vide: true }`.

### 2. Ajouter / modifier une fiche de cours

Dans `data/cours-imd.js` ou `data/cours-sciences.js`. Schéma d’une fiche :

```js
{
  id: 'imd-carie',                 // identifiant unique (URL : #/f/imd-carie)
  doc: 'IDENTIFIANT_DRIVE',        // le cours du Drive associé (bouton « Ouvrir le cours »)
  module: 'imd',                   // rubrique (voir data/s1.js)
  emoji: '🦠', duree: 25,           // durée de lecture estimée (minutes)
  titre: 'La carie dentaire',
  prof: 'Pr. Badre',
  sousTitre: 'Phrase d’accroche',
  resume: 'Résumé en 1-2 phrases affiché sur la carte.',
  objectifs: ['…'],                // 🎯 objectifs du cours
  sections: [                      // le corps de la fiche
    { id: 'def', titre: 'Définition', html: `<p>…</p>` }
  ],
  retenir: ['…'],                  // ✅ à retenir absolument
  pieges: ['…']                    // ⚠️ pièges classiques (QCM)
}
```

Dans `html`, les composants prêts à l’emploi :

| Balise | Rendu |
|---|---|
| `<table><tr><th>…</th></tr></table>` | tableau comparatif |
| `<pre class="sch">…</pre>` | schéma / arbre en texte monospace |
| `<div class="keys">…</div>` | encadré « clé » (vert) |
| `<div class="quote">…<span>Auteur</span></div>` | citation (définition du prof) |

### 3. Statistiques

Tout est calculé automatiquement à partir de `data/s1.js` + `data/cours-*.js` et de ta progression locale
(documents cochés, statuts de fiches, notes, photos).

## 🔒 Données personnelles

- Coches « révisé », favoris, statuts, notes écrites et surlignages → `localStorage`
- Photos → **IndexedDB** (stockées comme fichiers dans ton navigateur)
- Aucun serveur, aucun compte, **rien n’est envoyé**.

## 🌐 Déployer sur GitHub Pages

1. Fusionner la branche dans `main`.
2. **Settings → Pages** → Source : **GitHub Actions**.
3. `.github/workflows/pages.yml` publie le site à chaque push sur `main`
   (`https://<utilisateur>.github.io/ayooub/`).

## ⚠️ Rappels

- Les documents appartiennent à leurs auteurs (enseignants de la FMDC) et sont référencés tels quels ;
  ce dépôt n’est qu’un index d’organisation. Les fiches sont des **aides à la révision** : elles ne
  remplacent pas les cours officiels ni les annonces de la faculté.
- Vérifiez que le partage du Drive reste ouvert aux étudiants de la promo.
- Le portail de la promo **2024-2025** reste accessible dans `2024-2025/`.


---

## 🆕 Ajouts & téléchargement (dernière étape)

### Télécharger le site chez soi — 2 formules

**A. Un seul fichier (le plus simple)** — lien « ⬇️ Télécharger en 1 seul fichier (index.html) ».
`tools/make-single.py` fabrique `telecharger/index.html` : HTML + CSS + JS + données **tout dedans** (~265 Ko, zéro dépendance). Tu gardes ce fichier où tu veux, tu le transmets par mail/WhatsApp, tu l'ouvres d'un double-clic. Les boutons « ZIP » / « portail 2024-2025 » sont masqués automatiquement dans cette version (`window.SINGLE_FILE`).

**B. Le site complet** — lien « 🗂️ Télécharger le site complet (ZIP) ».
Un bouton **« ⬇️ Télécharger le site (ZIP) »** est présent dans l'accueil (hero + accès rapide) et dans le pied de page.
Il télécharge `telecharger/site-fmdc-s1.zip`, une copie complète et autonome du site : décompresse le dossier, puis ouvre `index.html` dans ton navigateur (ça marche aussi sans Internet, sauf les liens Google Drive). Voir `LISEZ-MOI.txt` à l'intérieur du ZIP.

> Le ZIP est régénéré par `python3 tools/make-zip.py` (ou toute commande `zip`) après chaque modification du site. Il contient `index.html`, `assets/`, `data/` et l'ancien portail `2024-2025/`, mais **pas** `telecharger/`.

### Ajouter ses propres cours / exercices
Route `#/ajouter` : formulaire (type *cours* ou *exercice*, module, prof, lien Drive, texte libre en mini-markdown `#` titres / `-` puces, photos).
Chaque ajout devient une fiche comme les autres (`#/a/<id>`) : sommaire, contenu, photos avec galerie + zoom, boutons *Modifier / Ouvrir le lien / Supprimer*.
Tout est stocké dans le navigateur : `localStorage` (`fmdc.s1.ajouts`) + IndexedDB (`ajout:<id>` pour les images).

### Exercices / TD / QCM
Route `#/exercices` : détecte automatiquement dans le dataset Drive tous les fichiers d'exercices, TD, QCM et annales (`EXO_RE`), les regroupe par rubrique, et liste en plus **« Mes exercices ajoutés »**.

### Exporter ses données
Bouton **« 💾 Exporter mes données »** (pied de page) → `fmdc-s1-mes-donnees-<date>.json` : révision cochée, favoris, statuts des fiches, notes, surlignages, ajouts et photos (en base64). À garder à côté du site décompressé.
